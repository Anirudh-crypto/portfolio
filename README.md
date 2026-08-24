# Portfolio — Anirudh Prahlad Joshi

Personal portfolio site. Public pages are server-rendered from Firestore; an
authenticated admin panel at `/admin` manages the project list without a
redeploy.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v3 ·
Framer Motion · Firebase (Auth + Firestore) · deployed on Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the Firebase values
npm run dev
```

The site runs at http://localhost:3000.

| Script            | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Dev server (Turbopack)                   |
| `npm run build`   | Production build                         |
| `npm start`       | Serve a production build                 |
| `npm run lint`    | ESLint                                   |
| `npm run typecheck` | `tsc --noEmit`                         |

## Environment variables

All values come from the Firebase console under **Project settings → General →
Your apps → SDK setup and configuration**. They are `NEXT_PUBLIC_*` by design —
Firebase web config is not a secret, and `firestore.rules` is what protects the
data.

| Variable | Notes |
| --- | --- |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Also used for the Firestore REST reads |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | |
| `NEXT_PUBLIC_FIREBASE_DATABASE_ID` | Defaults to `portfolio-admin` |
| `NEXT_PUBLIC_ADMIN_EMAIL` | The one Google account allowed into `/admin` |
| `NEXT_PUBLIC_SITE_URL` | Absolute production URL for canonicals, OG tags, sitemap |

`NEXT_PUBLIC_SITE_URL` falls back to the Vercel project URL, then to
`http://localhost:3000`. Set it explicitly in production so canonical links and
social cards point at the real domain.

## Firestore

The project uses a **named** database, `portfolio-admin` — not `(default)`.

### `projects`

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | Required; also the source of the URL slug |
| `description` | string | Card and meta description |
| `details` | string[] | Bullet points |
| `tech` | string[] | Drives the tag filter on `/projects` |
| `link` | string? | Live project URL |
| `repoUrl` | string? | Source repository |
| `imageUrl` | string? | `/local/path.jpg` or an absolute URL |
| `order` | number? | Lower sorts first; unset sorts last |
| `createdAt` | timestamp | Tie-breaker, newest first |

### `messages`

Contact-form submissions: `name`, `email`, `message`, `createdAt`. Anyone may
create one; only the owner can read them.

### Deploying rules

`firestore.rules` is the real access boundary — the sign-in check on `/admin`
only decides what the UI renders.

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

Test them locally with `firebase emulators:start --only firestore`.

The owner email is hard-coded in `firestore.rules`; keep it in sync with
`NEXT_PUBLIC_ADMIN_EMAIL`.

## Admin panel

Go to `/admin` and sign in with Google as the account in
`NEXT_PUBLIC_ADMIN_EMAIL`. Any other account gets a "not authorized" screen, and
Firestore rejects its writes regardless.

From there you can add, edit, reorder, and delete projects. On the first visit,
while the collection is empty, a **Seed starter projects** button imports the
three original portfolio entries that used to be hard-coded in the source.

Every write also calls `/api/revalidate`, which clears the cached public pages
so changes appear immediately rather than after the one-hour window.

## How rendering works

- Public pages are **server components**. They read Firestore over its REST API
  (`src/lib/projects-server.ts`) through Next's fetch cache, tagged `projects`
  and revalidated hourly. Project content is therefore in the initial HTML —
  crawlable, and no live listener per visitor.
- The **admin panel** is the only place that uses the Firebase web SDK's
  `onSnapshot`, where live updates are actually wanted.
- `/projects/[slug]` renders on demand so newly added projects are reachable
  without a rebuild.

## Dependency notes

`package.json` pins `sharp` and `postcss` through `overrides`. Both are
transitive dependencies of Next, and the versions Next 15 resolves to carry
known advisories (libvips CVEs in sharp, source-map path traversal in postcss).
The overrides pull the patched releases; `npm audit` reports clean with them in
place. They can be dropped once the project moves to Next 16, which ships the
fixed versions itself.

## Deployment

Deploys to Vercel from `main`. Set every variable from the table above in the
Vercel project settings, then deploy the Firestore rules separately with the
Firebase CLI — Vercel does not manage those.
