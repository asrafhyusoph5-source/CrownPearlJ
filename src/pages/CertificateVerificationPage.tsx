
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  CheckCircle,
  XCircle,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';

import {
  getCertificate,
  normalizeCertificateNumber,
  type Certificate,
} from '../services/certificateService';

export const CertificateVerificationPage: React.FC = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const number = normalizeCertificateNumber(certificateNumber);

    if (!number) {
      setCertificate(null);
      setSearched(false);
      setError('Please enter a certificate number.');
      return;
    }

    setLoading(true);
    setError('');
    setCertificate(null);
    setSearched(false);

    try {
      const result = await getCertificate(number);
      setCertificate(result);
      setSearched(true);
    } catch {
      setError(
        'We could not connect to the certificate database. Please try again later.',
      );
    } finally {
      setLoading(false);
    }
  };

  const isVerified = certificate?.status === 'verified';
  const isRevoked = certificate?.status === 'revoked';

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#263238]">
      <section className="bg-[#3B4A50] px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#7FC8C0]/60">
              <ShieldCheck className="h-8 w-8 text-[#7FC8C0]" />
            </div>
          </div>

          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#7FC8C0]">
            Crown Pearl
          </p>

          <h1 className="font-serif text-3xl md:text-5xl">
            Certificate Verification
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 md:text-base">
            Verify whether a Crown Pearl certificate is registered in our
            product records using the certificate number provided with
            your purchase.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6">
        <div className="mx-auto max-w-xl">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="certificateNumber"
              className="mb-2 block text-sm font-medium"
            >
              Certificate Number
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="certificateNumber"
                type="text"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                placeholder="Example: CP-2026-00003"
                className="min-w-0 flex-1 rounded-md border border-[#D6DAD8] bg-white px-4 py-3.5 outline-none focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0]"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-md bg-[#3B4A50] px-7 py-3.5 text-white transition-colors hover:bg-[#263238] disabled:opacity-60"
              >
                <Search className="h-4 w-4" />
                {loading ? 'Checking…' : 'Verify'}
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Enter the certificate number exactly as shown on your certificate.
            </p>
          </form>

          {error && (
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-red-200 bg-white p-5 text-sm text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          {searched && certificate && (
            <div className="mt-10 overflow-hidden rounded-xl border border-[#D6DAD8] bg-white shadow-sm">
              <div
                className={`flex items-center gap-3 px-6 py-5 ${
                  isVerified
                    ? 'bg-[#EAF6F4] text-[#238B80]'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {isVerified ? (
                  <CheckCircle className="h-7 w-7 shrink-0" />
                ) : (
                  <XCircle className="h-7 w-7 shrink-0" />
                )}

                <div>
                  <h2 className="font-semibold">
                    {isVerified ? 'Verified Product' : 'Certificate Revoked'}
                  </h2>
                  <p className="mt-1 text-xs">
                    {isVerified
                      ? 'This certificate number is registered in Crown Pearl product records.'
                      : 'This certificate has been marked as revoked. Do not treat it as a valid certificate.'}
                  </p>
                </div>
              </div>

              {certificate.productImage && (
                <div className="bg-[#F4F4F1]">
                  <img
                    src={certificate.productImage}
                    alt={certificate.productName}
                    className="h-[280px] w-full object-cover sm:h-[320px]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="p-6 md:p-8">
                <div className="mb-8 text-center">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                    Registered Product
                  </p>
                  <h2 className="font-serif text-2xl">
                    {certificate.productName}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  <Info label="Certificate Number" value={certificate.certificateNumber} />
                  <Info label="Product ID" value={certificate.productId} />
                  <Info label="Pearl Type" value={certificate.pearlType} />
                  <Info label="Pearl Grade / Quality" value={certificate.pearlGrade || 'Not recorded'} />
                  <Info label="Pearl Color" value={certificate.pearlColor} />
                  <Info label="Pearl Size" value={certificate.pearlSize} />
                  <Info label="Metal" value={certificate.metal} />
                  <Info label="Category" value={certificate.category} />
                  <Info label="Issued" value={certificate.issuedDate} />
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div
                    className={`flex items-center justify-center gap-2 text-center ${
                      isVerified ? 'text-[#238B80]' : 'text-red-700'
                    }`}
                  >
                    <ShieldCheck className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      {isVerified
                        ? 'Registered Crown Pearl Record'
                        : 'Revoked Certificate Record'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {searched && !certificate && !error && (
            <div className="mt-10 rounded-xl border border-red-200 bg-white p-8 text-center">
              <XCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h2 className="text-xl font-semibold">Certificate Not Found</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
                We could not find a registered certificate with this number.
                Check the number or contact Crown Pearl for assistance.
              </p>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#238B80]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Crown Pearl
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 px-6 py-8">
        <p className="mx-auto max-w-2xl text-center text-xs text-gray-500">
          This page checks whether a certificate number is registered and
          whether its record is marked as verified or revoked. Registration
          alone is not an independent gemological appraisal or laboratory
          certification.
        </p>
      </section>
    </main>
  );
};

interface InfoProps {
  label: string;
  value: string;
}

const Info: React.FC<InfoProps> = ({ label, value }) => (
  <div>
    <p className="mb-1 text-[10px] uppercase tracking-[0.15em] text-gray-400">
      {label}
    </p>
    <p className="break-words text-sm font-medium text-gray-800">{value || '—'}</p>
  </div>
);

export default CertificateVerificationPage;
