/**
 * Firebase identifiers that both client and server code need.
 *
 * Kept separate from `config.ts` so server components can import them without
 * pulling the Firebase web SDK into the server bundle.
 */

/** The project uses a *named* Firestore database, not `(default)`. */
export const FIREBASE_DATABASE_ID =
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID ?? "portfolio-admin";

export const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

/**
 * The required Firebase web-config variables, and which are currently unset.
 *
 * `getAuth()` throws `auth/invalid-api-key` when the key is missing, so the
 * admin panel checks this first and shows setup instructions rather than
 * letting the throw reach the error boundary as "Something went wrong".
 *
 * These are `NEXT_PUBLIC_*`, so the values are inlined at build time and the
 * check is accurate in the browser.
 */
export const missingFirebaseEnvVars = Object.entries({
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
})
  .filter(([, value]) => !value)
  .map(([name]) => name);

export const isFirebaseConfigured = missingFirebaseEnvVars.length === 0;

/**
 * The only account allowed to manage projects. This gates the admin UI; the
 * matching check in `firestore.rules` is what actually enforces it.
 */
export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "ani.josh01@gmail.com";
