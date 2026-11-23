
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  reload,
  User,
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Only this Firebase account is authorized to administer Crown Pearl.
const ADMIN_UID = 'EZymoDyHyuTH5wPxl3JoCE4OuUw1';
const ADMIN_EMAIL = 'delmapearl17@gmail.com';

export interface AdminSession {
  isAuthenticated: boolean;
  userEmail: string;
  displayName: string;
  role: 'owner' | 'manager' | 'atelier_staff';
  loginMethod: 'google' | 'email' | 'passcode';
  uid?: string;
}

/**
 * Do not use localStorage as proof of administrator identity.
 * Firebase Authentication is the source of truth.
 */
export function getAdminSession(): AdminSession | null {
  return null;
}

export function setAdminSession(_session: AdminSession | null): void {
  // Intentionally disabled. Admin sessions come from Firebase Auth.
}

export function getFriendlyAuthErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return 'Authentication failed. Please check your credentials.';
  }

  const code = (error as { code?: string }).code || '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password. Please check your login details.';

    case 'auth/email-already-in-use':
      return 'This email address is already registered. Please sign in instead.';

    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';

    case 'auth/invalid-email':
      return 'Please enter a valid email address.';

    case 'auth/user-disabled':
      return 'This account has been disabled.';

    case 'auth/popup-closed-by-user':
      return 'Google sign-in was closed before completing. Please try again.';

    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in popup. Please allow popups.';

    case 'auth/operation-not-allowed':
      return 'This sign-in provider is not enabled in Firebase Authentication.';

    case 'auth/too-many-requests':
      return 'Too many unsuccessful attempts. Please try again later.';

    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';

    default:
      return error.message || 'Authentication failed. Please try again.';
  }
}

/**
 * Verify the actual Firebase user, not a browser-stored session.
 */

async function verifyAdminUser(user: User): Promise<AdminSession> {
  const currentUser = auth.currentUser;

  if (
    !currentUser ||
    currentUser.uid !== ADMIN_UID ||
    currentUser.email?.toLowerCase() !== ADMIN_EMAIL
  ) {
    await signOut(auth);

    throw new Error(
      'This Firebase account is not authorized to access Crown Pearl administration.'
    );
  }

  return {
    isAuthenticated: true,
    userEmail: ADMIN_EMAIL,
    displayName: currentUser.displayName || 'Crown Pearl Owner',
    role: 'owner',
    loginMethod: currentUser.providerData.some(
      (provider) => provider.providerId === 'google.com'
    ) ? 'google' : 'email',
    uid: currentUser.uid,
  };
}

/**
 * Optional admin profile record.
 * Firestore rules must independently authorize this write.
 */
async function syncAdminRecord(user: User): Promise<void> {
  if (user.uid !== ADMIN_UID) return;

  try {
    await setDoc(
      doc(db, 'admins', ADMIN_UID),
      {
        email: ADMIN_EMAIL,
        displayName: user.displayName || 'Crown Pearl Owner',
        role: 'owner',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    console.warn('Admin profile sync notice:', error);
  }
}

/**
 * Sign in using Google.
 */
export async function loginWithGoogle(): Promise<AdminSession> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  const result = await signInWithPopup(auth, provider);
  const session = await verifyAdminUser(result.user);

  await syncAdminRecord(result.user);
  return session;
}

/**
 * Sign in using Email and Password.
 */
export async function loginWithEmail(
  email: string,
  password: string
): Promise<AdminSession> {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
    throw new Error(
      'This email address is not authorized to access Crown Pearl administration.'
    );
  }

  const result = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  const session = await verifyAdminUser(result.user);

  await syncAdminRecord(result.user);
  return session;
}

/**
 * Public registration is disabled.
 * The existing administrator account remains unchanged.
 */
export async function registerWithEmail(
  _email: string,
  _password: string,
  _displayName?: string
): Promise<AdminSession> {
  throw new Error(
    'New administrator registration is disabled. Contact the Crown Pearl owner.'
  );
}

/**
 * Send password reset email.
 */
export async function resetPassword(email: string): Promise<void> {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
    throw new Error(
      'Password reset is available only for the authorized administrator account.'
    );
  }

  await sendPasswordResetEmail(auth, ADMIN_EMAIL);
}

/**
 * Passcode login is permanently disabled.
 */
export async function loginWithPasscode(
  _passcode: string,
  _customEmail?: string
): Promise<AdminSession> {
  throw new Error(
    'Passcode login has been disabled. Please use your Firebase email and password.'
  );
}

/**
 * Sign out.
 */
export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

/**
 * Synchronous UI convenience check only.
 * Firestore Security Rules remain the actual security boundary.
 */
export function isCurrentlyAdmin(): boolean {
  const user = auth.currentUser;

  return Boolean(
    user &&
      user.uid === ADMIN_UID &&
      user.email?.toLowerCase() === ADMIN_EMAIL &&
      user.emailVerified
  );
}

/**
 * Listen for Firebase authentication changes.
 */
export function subscribeAdminAuth(
  callback: (session: AdminSession | null) => void
): () => void {
  let active = true;

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      if (active) callback(null);
      return;
    }

    try {
      const session = await verifyAdminUser(user);

      if (active) {
        await syncAdminRecord(user);
        callback(session);
      }
    } catch {
      if (active) callback(null);
    }
  });

  return () => {
    active = false;
    unsubscribe();
  };
}
