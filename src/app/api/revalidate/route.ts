import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { ADMIN_EMAIL } from "@/firebase/constants";

export const runtime = "nodejs";

/**
 * Clears the cached project list after an admin edit.
 *
 * Public pages are cached for an hour, so without this a change made in the
 * admin panel would not appear until the window expired.
 *
 * Authorisation: the caller sends their Firebase ID token, which we hand to
 * Google's Identity Toolkit for verification. That endpoint rejects forged or
 * expired tokens, so a valid response is proof of identity — we then check the
 * returned email against the owner. This avoids pulling in `firebase-admin`
 * (and a service-account key) just to verify one token.
 */
const verifyIdToken = async (idToken: string) => {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_FIREBASE_API_KEY is not set.");
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    users?: { email?: string; emailVerified?: boolean }[];
  };

  return payload.users?.[0] ?? null;
};

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization") ?? "";
  const idToken = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";

  if (!idToken) {
    return NextResponse.json({ error: "Missing credentials." }, { status: 401 });
  }

  let user: { email?: string; emailVerified?: boolean } | null;

  try {
    user = await verifyIdToken(idToken);
  } catch (error) {
    console.error("Token verification failed.", error);
    return NextResponse.json({ error: "Unable to verify credentials." }, { status: 500 });
  }

  if (!user?.email || !user.emailVerified || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  revalidateTag("projects");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true, revalidatedAt: new Date().toISOString() });
}
