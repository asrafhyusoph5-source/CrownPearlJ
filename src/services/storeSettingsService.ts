import {
  doc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreError';

export type CurrencyCode = 'USD' | 'PHP';

export interface StoreSettings {
  currency: CurrencyCode;
  exchangeRate: number; // e.g. 58 (1 USD = 58 PHP)
  updatedAt?: string;
  updatedBy?: string;
}

const SETTINGS_DOC_PATH = 'settings/store';
const CACHE_KEY = 'crown_pearl_store_settings_v1';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  currency: 'USD',
  exchangeRate: 58,
};

let currentSettings: StoreSettings = (() => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.currency === 'USD' || parsed.currency === 'PHP')) {
        return {
          currency: parsed.currency,
          exchangeRate: Number(parsed.exchangeRate) || 58,
          updatedAt: parsed.updatedAt,
          updatedBy: parsed.updatedBy,
        };
      }
    }
  } catch {
    // fallback
  }
  return DEFAULT_STORE_SETTINGS;
})();

function saveToCache(settings: StoreSettings) {
  currentSettings = settings;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

/**
 * Subscribe to store settings (currency, exchange rates) in real-time.
 * Immediately invokes callback with current cached settings.
 */
export function subscribeStoreSettings(
  callback: (settings: StoreSettings) => void
): () => void {
  // Emit current cached values immediately for instant rendering without flicker
  callback(currentSettings);

  const docRef = doc(db, 'settings', 'store');

  const unsubscribe = onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const settings: StoreSettings = {
          currency: data.currency === 'PHP' ? 'PHP' : 'USD',
          exchangeRate: typeof data.exchangeRate === 'number' && data.exchangeRate > 0 ? data.exchangeRate : 58,
          updatedAt: data.updatedAt,
          updatedBy: data.updatedBy,
        };
        saveToCache(settings);
        callback(settings);
      } else {
        // Document doesn't exist yet, emit default
        callback(currentSettings);
      }
    },
    (error) => {
      console.warn('Real-time Firestore store settings sync note:', error.message);
      // Fallback to cached memory state
      callback(currentSettings);
      handleFirestoreError(error, OperationType.GET, SETTINGS_DOC_PATH);
    }
  );

  return unsubscribe;
}

/**
 * Save / Update store currency settings in Firestore and local state
 */
export async function updateStoreSettings(
  updates: Partial<StoreSettings>,
  adminEmail?: string
): Promise<StoreSettings> {
  const merged: StoreSettings = {
    currency: updates.currency || currentSettings.currency,
    exchangeRate: typeof updates.exchangeRate === 'number' && updates.exchangeRate > 0
      ? updates.exchangeRate
      : currentSettings.exchangeRate,
    updatedAt: new Date().toISOString(),
    updatedBy: adminEmail || currentSettings.updatedBy || 'Crown Pearl Manager',
  };

  saveToCache(merged);

  try {
    const docRef = doc(db, 'settings', 'store');
    await setDoc(docRef, merged, { merge: true });
  } catch (err) {
    console.warn('Firestore setDoc notice on settings/store, cached locally:', err);
    handleFirestoreError(err, OperationType.WRITE, SETTINGS_DOC_PATH);
  }

  return merged;
}

export function getCurrentStoreSettings(): StoreSettings {
  return currentSettings;
}
