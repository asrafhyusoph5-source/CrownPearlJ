import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Award, FileText } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'warranty' | 'privacy' | 'terms'>('warranty');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Legal, Privacy & Lifetime Warranty – Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
            Atelier Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#111] font-semibold">
            Lifetime Warranty & Client Rights
          </h1>
          <p className="text-sm text-[#3B4A50] font-light">
            Crown Pearl – Jewelry Shop by Delma, Estd. 2003
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#E5E7EB] bg-white p-2 rounded-xl justify-center gap-4 text-xs font-heading uppercase tracking-wider text-[#3B4A50]">
          <button
            onClick={() => setActiveTab('warranty')}
            className={`py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'warranty'
                ? 'bg-[#3B4A50] text-white font-semibold'
                : 'hover:text-[#111]'
            }`}
          >
            Lifetime Warranty
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'privacy'
                ? 'bg-[#3B4A50] text-white font-semibold'
                : 'hover:text-[#111]'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'terms'
                ? 'bg-[#3B4A50] text-white font-semibold'
                : 'hover:text-[#111]'
            }`}
          >
            Terms of Service
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 shadow-xs text-xs sm:text-sm text-[#3B4A50] leading-relaxed space-y-6">
          {activeTab === 'warranty' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="font-serif text-2xl font-semibold text-[#111]">
                Delma Estd. 2003 Lifetime Authenticity & Craft Guarantee
              </h2>
              <p>
                Every piece of jewelry created by Crown Pearl is guaranteed for life against structural and material defects in precious metals and artisanal stringing.
              </p>
              <h3 className="font-heading uppercase text-xs text-[#111] font-semibold pt-2">
                Included Lifetime Services:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Complimentary annual knotting and silk cord tension inspections at our Palawan workshop in Puerto Princesa.</li>
                <li>One complimentary full restringing on Japanese silk thread every 24 months.</li>
                <li>Ultrasonic examination of diamond pavé mounts and safety clasps.</li>
                <li>Replacement of clasps or safety tongues due to manufacturing flaws.</li>
              </ul>
              <p className="text-gray-500 pt-2">
                Note: Natural organic pearls must be protected from household chemical exposure, swimming pools, and harsh acidic cosmetics as described in our Pearl Care Guide.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="font-serif text-2xl font-semibold text-[#111]">
                Privacy & Client Confidentiality Protocol
              </h2>
              <p>
                Since 2003, Crown Pearl has respected the absolute confidentiality of our patrons. We never sell, lease, or monetize your personal information, address history, or acquisition registry.
              </p>
              <h3 className="font-heading uppercase text-xs text-[#111] font-semibold pt-2">
                Information Safeguarding:
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Payment data is encrypted using end-to-end 256-bit bank-grade SSL standards. Card numbers are never stored in plain text.</li>
                <li>Contact numbers are utilized strictly for courier delivery coordination and concierge updates.</li>
                <li>You may request complete erasure of your registry profile at any moment by contacting our compliance officer.</li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="font-serif text-2xl font-semibold text-[#111]">
                Terms of Atelier Sale
              </h2>
              <p>
                All pearl creations offered by Crown Pearl are subject to strict GIA grading classifications. In the rare event of pricing inaccuracies or harvest lot exhaustions, we reserve the right to contact the client and provide a complimentary grade upgrade or full reimbursement.
              </p>
              <p>
                All sales conducted online are eligible for our 30-day in-home examination period, provided the items remain in pristine condition with certificates and boxes intact.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
