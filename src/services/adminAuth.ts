import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const ADMIN_STORAGE_KEY = 'crown_pearl_admin_session';

export interface AdminSession {
  isAuthenticated: boolean;
  userEmail: string;
  displayName: string;
  role: 'owner' | 'manager' | 'atelier_staff';
  loginMethod: 'google' | 'email' | 'passcode';
  uid?: string;
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
 * Format Firebase Auth errors into clear, friendly guidance
 */
export function getFriendlyAuthErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) return 'Authentication failed. Please check your credentials.';

  const code = (error as { code?: string }).code || '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password. Please verify your details or use Password Reset.';
    case 'auth/email-already-in-use':
      return 'This email address is already registered. Please sign in or reset your password.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This manager account has been disabled. Please contact the administrator.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completing. Please try again.';
    case 'auth/popup-blocked':
      return 'Pop-up was blocked by your browser. Please allow popups for this site.';
    case 'auth/operation-not-allowed':
      return 'This sign-in provider is not enabled in your Firebase console. Please ensure Email/Password and Google are enabled in Firebase Authentication.';
    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.';
    case 'auth/network-request-failed':
      return 'Network error encountered. Please check your internet connection.';
    default:
      return error.message || 'Authentication encountered an error. Please try again.';
  }
}

/**
 * Sync authenticated user details to Firestore admins collection
 */
async function syncAdminRecord(user: User): Promise<void> {
  if (!user.uid) return;
  try {
    const adminRef = doc(db, 'admins', user.uid);
    const existing = await getDoc(adminRef);
    if (!existing.exists()) {
      await setDoc(adminRef, {
        email: user.email || 'manager@crownpearl.ph',
        displayName: user.displayName || user.email?.split('@')[0] || 'Atelier Staff',
        role: 'owner',
        createdAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    // Non-blocking: admin record sync failure should not interrupt login session
    console.warn('Admin record sync notice:', err);
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
    displayName: user.displayName || user.email?.split('@')[0] || 'Atelier Manager',
    role: 'owner',
    loginMethod: 'google',
    uid: user.uid,
  };

  setAdminSession(session);
  syncAdminRecord(user);
  return session;
}

/**
 * Sign in using Email & Password via Firebase Auth
 */
export async function loginWithEmail(email: string, password: string): Promise<AdminSession> {
  const result = await signInWithEmailAndPassword(auth, email.trim(), password);
  const user = result.user;

  const session: AdminSession = {
    isAuthenticated: true,
    userEmail: user.email || email.trim(),
    displayName: user.displayName || user.email?.split('@')[0] || 'Atelier Manager',
    role: 'owner',
    loginMethod: 'email',
    uid: user.uid,
  };

  setAdminSession(session);
  syncAdminRecord(user);
  return session;
}

/**
 * Create a new manager account with Email & Password via Firebase Auth
 */
export async function registerWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<AdminSession> {
  const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const user = result.user;

  if (displayName?.trim()) {
    try {
      await updateProfile(user, { displayName: displayName.trim() });
    } catch {
      // ignore
    }
  }

  const session: AdminSession = {
    isAuthenticated: true,
    userEmail: user.email || email.trim(),
    displayName: displayName?.trim() || user.displayName || user.email?.split('@')[0] || 'Atelier Manager',
    role: 'owner',
    loginMethod: 'email',
    uid: user.uid,
  };

  setAdminSession(session);
  syncAdminRecord(user);
  return session;
}

/**
 * Send password reset email via Firebase Auth
 */
export async function resetPassword(email: string): Promise<void> {
  if (!email.trim()) {
    throw new Error('Please enter your email address to receive a password reset link.');
  }
  await sendPasswordResetEmail(auth, email.trim());
}

/**
 * Sign in using Atelier Master Passcode / Key (Local fallback)
 */
export async function loginWithPasscode(passcode: string, customEmail?: string): Promise<AdminSession> {
  const clean = passcode.trim().toLowerCase();
  const isValid = MASTER_PASSCODES.includes(clean);

  if (!isValid) {
    throw new Error('Invalid Atelier Master Passcode. Please check with Delma or use your Firebase credentials.');
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
        displayName: user.displayName || user.email?.split('@')[0] || 'Atelier Manager',
        role: 'owner',
        loginMethod: user.providerData?.some((p) => p.providerId === 'google.com') ? 'google' : 'email',
        uid: user.uid,
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
