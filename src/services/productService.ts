import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';

const PRODUCTS_COLLECTION = 'products';
const STORAGE_KEY = 'crown_pearl_catalog_cache_v1';

// In-memory product list initialized from localStorage or initial products
let currentProducts: Product[] = (() => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return [...INITIAL_PRODUCTS];
})();

function saveToCache(products: Product[]) {
  currentProducts = products;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // ignore
  }
}

/**
 * Seed initial catalog to Firestore if the collection is currently empty
 */
async function seedCatalogIfEmpty() {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const snap = await getDocs(colRef);
    if (snap.empty) {
      console.log('Seeding initial 16 Crown Pearl products to Firestore...');
      const batch = writeBatch(db);
      for (const prod of INITIAL_PRODUCTS) {
        const docRef = doc(db, PRODUCTS_COLLECTION, prod.id);
        batch.set(docRef, prod);
      }
      await batch.commit();
      console.log('Successfully seeded Crown Pearl catalog.');
    }
  } catch (err) {
    console.warn('Could not seed Firestore products automatically (offline or rules):', err);
  }
}

/**
 * Real-time subscription to products collection.
 * Calls callback immediately with cached products, then updates in real time.
 */
export function subscribeProducts(callback: (products: Product[]) => void): () => void {
  // Emit current memory state immediately
  callback(currentProducts);

  // Trigger seed check in background
  seedCatalogIfEmpty();

  const colRef = collection(db, PRODUCTS_COLLECTION);

  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      if (!snapshot.empty) {
        const items: Product[] = [];
        snapshot.forEach((d) => {
          items.push(d.data() as Product);
        });
        saveToCache(items);
        callback(items);
      } else {
        // If snapshot is empty, fallback to initial and attempt seed
        saveToCache(INITIAL_PRODUCTS);
        callback(INITIAL_PRODUCTS);
      }
    },
    (error) => {
      console.warn('Real-time Firestore products sync notice:', error.message);
      // Still provide working cached data
      callback(currentProducts);
    }
  );

  return unsubscribe;
}

/**
 * Add a new product to Firestore and local state
 */
export async function addProduct(product: Product): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
  try {
    await setDoc(docRef, product);
  } catch (err) {
    console.warn('Firestore setDoc notice, updating local cache:', err);
  }
  const next = [product, ...currentProducts.filter((p) => p.id !== product.id)];
  saveToCache(next);
}

/**
 * Update an existing product
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  try {
    await updateDoc(docRef, updates);
  } catch (err) {
    console.warn('Firestore updateDoc notice, updating local cache:', err);
  }
  const next = currentProducts.map((p) => (p.id === id ? { ...p, ...updates } : p));
  saveToCache(next);
}

/**
 * Delete a product by ID
 */
export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  try {
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore deleteDoc notice, updating local cache:', err);
  }
  const next = currentProducts.filter((p) => p.id !== id);
  saveToCache(next);
}

/**
 * Reset entire catalog back to Crown Pearl's 16 official default heirloom pieces
 */
export async function resetProductsToDefault(): Promise<void> {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const snap = await getDocs(colRef);
    const batch = writeBatch(db);
    snap.forEach((d) => {
      batch.delete(d.ref);
    });
    for (const prod of INITIAL_PRODUCTS) {
      const docRef = doc(db, PRODUCTS_COLLECTION, prod.id);
      batch.set(docRef, prod);
    }
    await batch.commit();
  } catch (err) {
    console.warn('Reset Firestore error:', err);
  }
  saveToCache([...INITIAL_PRODUCTS]);
}

export function getCurrentProducts(): Product[] {
  return currentProducts;
}
