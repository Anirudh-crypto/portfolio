import { NextResponse } from "next/server";
import { FIREBASE_DATABASE_ID, FIREBASE_PROJECT_ID } from "@/firebase/constants";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Best-effort, per-instance rate limiting.
 *
 * This resets on cold start and is not shared between serverless instances, so
 * it slows down casual abuse rather than preventing it. The real ceiling is the
 * field-size validation in `firestore.rules`. Swap in Upstash/Redis if the
 * volume ever justifies it.
 */
const submissions = new Map<string, number[]>();

const isRateLimited = (key: string) => {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const recent = (submissions.get(key) ?? []).filter((timestamp) => timestamp > cutoff);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    submissions.set(key, recent);
    return true;
  }

  recent.push(now);
  submissions.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (submissions.size > 5000) {
    for (const [entryKey, timestamps] of submissions) {
      if (timestamps.every((timestamp) => timestamp <= cutoff)) {
        submissions.delete(entryKey);
      }
    }
  }

  return false;
};

const clientKey = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
};

export async function POST(request: Request) {
  if (!FIREBASE_PROJECT_ID) {
    console.error("Contact form is not configured: NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing.");
    return NextResponse.json({ error: "Contact form is unavailable." }, { status: 503 });
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many messages sent. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;

  try {
    const raw = await request.text();

    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Message is too large." }, { status: 413 });
    }

    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot tripped. Report success so bots get no signal to adapt.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const endpoint =
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}` +
    `/databases/${FIREBASE_DATABASE_ID}/documents/messages`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          name: { stringValue: name },
          email: { stringValue: email },
          message: { stringValue: message },
          createdAt: { timestampValue: new Date().toISOString() },
        },
      }),
    });

    if (!response.ok) {
      console.error(`Firestore message write failed: ${response.status}`, await response.text());
      return NextResponse.json({ error: "Could not send your message." }, { status: 502 });
    }
  } catch (error) {
    console.error("Firestore message write threw.", error);
    return NextResponse.json({ error: "Could not send your message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
