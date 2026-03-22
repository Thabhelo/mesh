import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredFirebaseKeys: Array<keyof typeof firebaseConfig> = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];

export const isFirebaseConfigured = requiredFirebaseKeys.every((key) =>
  Boolean(firebaseConfig[key]),
);

let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  dbInstance = getFirestore(app);
  authInstance = getAuth(app);
} else {
  console.warn(
    "Firebase configuration is missing. Set VITE_FIREBASE_* variables in .env to enable auth and Firestore.",
  );
}

export const db = dbInstance;

// Auth
export const auth = authInstance;
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Auth helpers
const ensureAuth = () => {
  if (!auth) {
    throw new Error(
      "Firebase Auth is not configured. Add VITE_FIREBASE_* variables to .env.",
    );
  }
  return auth;
};

export const signInWithGoogle = () =>
  signInWithPopup(ensureAuth(), googleProvider);
export const signInWithGithub = () =>
  signInWithPopup(ensureAuth(), githubProvider);
export const signOut = () => firebaseSignOut(ensureAuth());
export { onAuthStateChanged };
export type { User };
