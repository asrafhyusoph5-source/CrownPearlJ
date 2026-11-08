import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './firebase';

const ADMIN_STORAGE_KEY = 'crown_pearl_admin_session';

export interface AdminSession {
  isAuthenticated: boolean;
  userEmail: string;
  displayName: string;
  role: 'owner' | 'manager' | 'atelier_staff';
  loginMethod: 'google' | 'passcode';
}

const MASTER_PASSCODES = ['delma2003', 'crownpearl', 'admin2026', 'palawan'];

export function getAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return null;
}

export function setAdminSession(session: AdminSession | null) {
  if (session) {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }
}

/**
 * Sign in using Google OAuth via Firebase Auth
 */
export async function loginWithGoogle(): Promise<AdminSession> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const session: AdminSession = {
    isAuthenticated: true,
    userEmail: user.email || 'manager@crownpearl.ph',
    displayName: user.displayName || 'Atelier Manager',
    role: 'owner',
    loginMethod: 'google',
  };

  setAdminSession(session);
  return session;
}

/**
 * Sign in using Atelier Master Passcode / Key
 */
export async function loginWithPasscode(passcode: string, customEmail?: string): Promise<AdminSession> {
  const clean = passcode.trim().toLowerCase();
  const isValid = MASTER_PASSCODES.includes(clean);

  if (!isValid) {
    throw new Error('Invalid Atelier Master Passcode. Please check with Delma or use the official manager passcode.');
  }

  const session: AdminSession = {
    isAuthenticated: true,
    userEmail: customEmail?.trim() || 'delmapearl17@gmail.com',
    displayName: 'Delma (Palawan Atelier Founder)',
    role: 'owner',
    loginMethod: 'passcode',
  };

  setAdminSession(session);
  return session;
}

/**
 * Log out current admin
 */
export async function logoutAdmin(): Promise<void> {
  try {
    await signOut(auth);
  } catch {
    // ignore
  }
  setAdminSession(null);
}

/**
 * Check if current user is logged in as Admin
 */
export function isCurrentlyAdmin(): boolean {
  const session = getAdminSession();
  if (session && session.isAuthenticated) return true;
  if (auth.currentUser) return true;
  return false;
}

export function subscribeAdminAuth(callback: (session: AdminSession | null) => void): () => void {
  // Check initial
  callback(getAdminSession());

  const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      const session: AdminSession = {
        isAuthenticated: true,
        userEmail: user.email || 'manager@crownpearl.ph',
        displayName: user.displayName || 'Atelier Manager',
        role: 'owner',
        loginMethod: 'google',
      };
      setAdminSession(session);
      callback(session);
    } else {
      const existing = getAdminSession();
      if (existing && existing.loginMethod === 'passcode') {
        callback(existing);
      } else {
        callback(null);
      }
    }
  });

  return unsubscribe;
}
