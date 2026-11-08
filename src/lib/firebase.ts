
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCrownPearlMockDevKeyForPreviewMode',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'crown-pearl-app.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'crown-pearl-app',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'crown-pearl-app.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789012:web:abcdef123456789',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);

export const ADMIN_UID = (import.meta.env.VITE_ADMIN_UID as string) || '';

