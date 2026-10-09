import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.AIzaSyBysk1sKhYcs3p2XvQA25RpdJKW6QyLs7k,
  authDomain: import.meta.env.crown-pearl.firebaseapp.com,
  projectId: import.meta.env.crown-pearl,
  storageBucket: import.meta.env.crown-pearl.firebasestorage.app,
  messagingSenderId: import.meta.env.547635712010,
  appId: import.meta.env.1:547635712010:web:e2e50d45c5f1aaf582cff3,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const ADMIN_UID = import.meta.env.W5yUSeIRnWeLiBskKPzDTA18puE2 as string;
