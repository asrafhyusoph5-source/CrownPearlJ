import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreError';

export interface Certificate {
  certificateNumber: string;
  productId: string;
  productName: string;
  productImage: string;
  pearlType: string;
  pearlGrade: string;
  pearlColor: string;
  pearlSize: string;
  metal: string;
  category: string;
  issuedDate: string;
  status: 'verified' | 'revoked';
}

const certificatesRef = collection(db, 'certificates');

export const normalizeCertificateNumber = (value: string) =>
  value.trim().toUpperCase();

export async function getCertificate(number: string) {
  const normalized = normalizeCertificateNumber(number);

  if (!normalized) return null;

  try {
    const snapshot = await getDoc(doc(db, 'certificates', normalized));
    if (!snapshot.exists()) return null;
    return snapshot.data() as Certificate;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `certificates/${normalized}`);
  }
}

export async function createCertificate(certificate: Certificate) {
  const number = normalizeCertificateNumber(certificate.certificateNumber);

  if (!number) throw new Error('Certificate number is required.');

  const reference = doc(db, 'certificates', number);

  try {
    const existing = await getDoc(reference);
    if (existing.exists()) {
      throw new Error('This certificate number is already registered.');
    }

    await setDoc(reference, {
      ...certificate,
      certificateNumber: number,
      productId: certificate.productId.trim(),
      productName: certificate.productName.trim(),
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('already registered')) {
      throw error;
    }
    handleFirestoreError(error, OperationType.CREATE, `certificates/${number}`);
  }
}

export async function deleteCertificate(certificateNumber: string) {
  const normalizedNumber = normalizeCertificateNumber(certificateNumber);

  try {
    await deleteDoc(doc(db, 'certificates', normalizedNumber));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `certificates/${normalizedNumber}`);
  }
}

export async function updateCertificateStatus(
  number: string,
  status: 'verified' | 'revoked'
) {
  const normalized = normalizeCertificateNumber(number);

  try {
    await updateDoc(doc(db, 'certificates', normalized), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `certificates/${normalized}`);
  }
}

export async function getAllCertificates() {
  try {
    const certificateQuery = query(certificatesRef, orderBy('certificateNumber'));
    const snapshot = await getDocs(certificateQuery);
    return snapshot.docs.map((item) => item.data() as Certificate);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'certificates');
  }
}
