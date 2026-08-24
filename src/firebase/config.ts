import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { initializeFirestore, type Firestore } from "firebase/firestore";
import { FIREBASE_DATABASE_ID } from "@/firebase/constants";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/*
 * Everything below is initialised lazily, on first use.
 *
 * `getAuth()` throws when the API key is missing, and the admin page is
 * prerendered at build time — so initialising at module scope made the whole
 * build fail whenever the Firebase env vars were absent (a fresh clone, or CI).
 * Deferring it means the SDK only ever spins up in the browser, where the
 * config actually exists.
 */
let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let firestoreInstance: Firestore | undefined;

const getFirebaseApp = () => {
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }

  return app;
};

export const getFirebaseAuth = () => {
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp());
  }

  return authInstance;
};

export const getDb = () => {
  if (!firestoreInstance) {
    firestoreInstance = initializeFirestore(
      getFirebaseApp(),
      { experimentalForceLongPolling: false },
      FIREBASE_DATABASE_ID
    );
  }

  return firestoreInstance;
};

/** Stateless config object — safe to construct without an initialised app. */
export const googleProvider = new GoogleAuthProvider();
