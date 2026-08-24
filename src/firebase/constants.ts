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
 * The only account allowed to manage projects. This gates the admin UI; the
 * matching check in `firestore.rules` is what actually enforces it.
 */
export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "ani.josh01@gmail.com";
