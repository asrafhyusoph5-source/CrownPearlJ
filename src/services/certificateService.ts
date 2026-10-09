import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  orderBy,
} from 'firebase/firestore';

import { db } from '../lib/firebase';

export interface Certificate {
  certificateNumber: string;
  productId: string;
  productName: string;
  productImage: string;
  pearlType: string;
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

  const snapshot = await getDoc(doc(db, 'certificates', normalized));

  if (!snapshot.exists()) return null;

  return snapshot.data() as Certificate;
}

export async function createCertificate(certificate: Certificate) {
  const number = normalizeCertificateNumber(certificate.certificateNumber);

  if (!number) throw new Error('Certificate number is required.');

  const reference = doc(db, 'certificates', number);
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
}

export async function updateCertificateStatus(
  number: string,
  status: 'verified' | 'revoked',
) {
  const normalized = normalizeCertificateNumber(number);

  await updateDoc(doc(db, 'certificates', normalized), { status });
}

export async function getAllCertificates() {
  const certificateQuery = query(
    certificatesRef,
    orderBy('certificateNumber'),
  );

  const snapshot = await getDocs(certificateQuery);

  return snapshot.docs.map((item) => item.data() as Certificate);
}
