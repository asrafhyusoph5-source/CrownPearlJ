import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from 'lucide-react';

interface Certificate {
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

/*
|--------------------------------------------------------------------------
| CROWN PEARL CERTIFICATE DATABASE
|--------------------------------------------------------------------------
| Add your certificates here.
|
| IMPORTANT:
| The certificate number must be unique.
|--------------------------------------------------------------------------
*/

const CERTIFICATES: Certificate[] = [
  {
    certificateNumber: 'CP-2026-00001',
    productId: 'CP-NK-0001',
    productName: 'Delma Signature Akoya Choker',

    // Replace this with your actual product image URL later.
    productImage:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85',

    pearlType: 'Akoya',
    pearlColor: 'White',
    pearlSize: '7.5–8.0 mm',
    metal: '18K Yellow Gold',
    category: 'Necklace',
    issuedDate: 'October 3, 2026',
    status: 'verified',
  },

  {
    certificateNumber: 'CP-2026-00002',
    productId: 'CP-ER-0001',
    productName: 'Lustre Drop South Sea Earrings',

    productImage:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',

    pearlType: 'South Sea',
    pearlColor: 'White',
    pearlSize: '10–11 mm',
    metal: '18K White Gold',
    category: 'Earrings',
    issuedDate: 'October 3, 2026',
    status: 'verified',
  },
];

/*
|--------------------------------------------------------------------------
| Verification Page
|--------------------------------------------------------------------------
*/

export const CertificateVerificationPage: React.FC = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  const verifyCertificate = () => {
    const searchNumber = certificateNumber.trim().toUpperCase();

    if (!searchNumber) {
      setCertificate(null);
      setSearched(false);
      return;
    }

    const found = CERTIFICATES.find(
      (item) =>
        item.certificateNumber.toUpperCase() === searchNumber
    );

    setCertificate(found || null);
    setSearched(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    verifyCertificate();
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#263238]">

      {/* Header */}
      <section className="bg-[#3B4A50] text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full border border-[#7FC8C0]/60 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#7FC8C0]" />
            </div>
          </div>

          <p className="text-[#7FC8C0] text-xs tracking-[0.3em] uppercase mb-3">
            Crown Pearl
          </p>

          <h1 className="text-3xl md:text-5xl font-serif">
            Certificate Verification
          </h1>

          <p className="text-white/70 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Verify the authenticity of a Crown Pearl product using
            the certificate number provided with your purchase.
          </p>

        </div>
      </section>

      {/* Search */}
      <section className="px-6 py-12">
        <div className="max-w-xl mx-auto">

          <form onSubmit={handleSubmit}>

            <label
              htmlFor="certificateNumber"
              className="block text-sm font-medium mb-2"
            >
              Certificate Number
            </label>

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                id="certificateNumber"
                type="text"
                value={certificateNumber}
                onChange={(e) =>
                  setCertificateNumber(e.target.value)
                }
                placeholder="Example: CP-2026-00001"
                className="flex-1 border border-[#D6DAD8] bg-white px-4 py-3.5 rounded-md outline-none focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0]"
              />

              <button
                type="submit"
                className="bg-[#3B4A50] text-white px-7 py-3.5 rounded-md flex items-center justify-center gap-2 hover:bg-[#263238] transition-colors"
              >
                <Search className="w-4 h-4" />
                Verify
              </button>

            </div>

            <p className="text-xs text-gray-500 mt-3">
              Enter the certificate number exactly as shown on your
              Crown Pearl certificate.
            </p>

          </form>

          {/* Result */}
          {searched && (
            <div className="mt-10">

              {certificate ? (

                /* VERIFIED */
                <div className="bg-white border border-[#D6DAD8] rounded-xl overflow-hidden shadow-sm">

                  <div className="bg-[#EAF6F4] px-6 py-5 flex items-center gap-3">
                    <CheckCircle className="w-7 h-7 text-[#238B80]" />

                    <div>
                      <h2 className="font-semibold text-[#238B80]">
                        Verified Product
                      </h2>

                      <p className="text-xs text-[#238B80]/80">
                        This certificate is registered in the
                        Crown Pearl product records.
                      </p>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="bg-[#F4F4F1]">
                    <img
                      src={certificate.productImage}
                      alt={certificate.productName}
                      className="w-full h-[320px] object-cover"
                    />
                  </div>

                  <div className="p-6 md:p-8">

                    <div className="text-center mb-8">

                      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                        Registered Product
                      </p>

                      <h2 className="text-2xl font-serif">
                        {certificate.productName}
                      </h2>

                    </div>

                    {/* Certificate information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">

                      <Info
                        label="Certificate Number"
                        value={certificate.certificateNumber}
                      />

                      <Info
                        label="Product ID"
                        value={certificate.productId}
                      />

                      <Info
                        label="Pearl Type"
                        value={certificate.pearlType}
                      />

                      <Info
                        label="Pearl Color"
                        value={certificate.pearlColor}
                      />

                      <Info
                        label="Pearl Size"
                        value={certificate.pearlSize}
                      />

                      <Info
                        label="Metal"
                        value={certificate.metal}
                      />

                      <Info
                        label="Category"
                        value={certificate.category}
                      />

                      <Info
                        label="Issued"
                        value={certificate.issuedDate}
                      />

                    </div>

                    {/* Status */}
                    <div className="mt-8 pt-6 border-t border-gray-200">

                      <div className="flex items-center justify-center gap-2 text-[#238B80]">

                        <ShieldCheck className="w-5 h-5" />

                        <span className="font-semibold text-sm uppercase tracking-wider">
                          Authentic Crown Pearl Record
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              ) : (

                /* NOT FOUND */
                <div className="bg-white border border-red-200 rounded-xl p-8 text-center">

                  <div className="flex justify-center mb-4">
                    <XCircle className="w-12 h-12 text-red-500" />
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800">
                    Certificate Not Found
                  </h2>

                  <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto">
                    We could not find a registered Crown Pearl
                    certificate with this number.
                  </p>

                  <p className="text-xs text-gray-400 mt-3">
                    Please check the certificate number and try again.
                  </p>

                </div>

              )}

            </div>
          )}

          {/* Back */}
          <div className="text-center mt-10">

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#238B80]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Crown Pearl
            </Link>

          </div>

        </div>
      </section>

      {/* Footer notice */}
      <section className="border-t border-gray-200 py-8 px-6">
        <p className="text-center text-xs text-gray-500 max-w-2xl mx-auto">
          This verification page confirms whether the certificate
          number is registered in Crown Pearl's product records.
          If you have questions about a certificate, please contact
          Crown Pearl directly.
        </p>
      </section>

    </main>
  );
};

/*
|--------------------------------------------------------------------------
| Information Field
|--------------------------------------------------------------------------
*/

interface InfoProps {
  label: string;
  value: string;
}

const Info: React.FC<InfoProps> = ({ label, value }) => {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.15em] text-gray-400 mb-1">
        {label}
      </p>

      <p className="text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
};
