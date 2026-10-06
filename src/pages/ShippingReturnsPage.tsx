import React, { useEffect } from 'react';
import { Truck, RotateCcw, ShieldCheck, Gift, Clock, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ShippingReturnsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Insured Delivery & 30-Day Returns – Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
            Atelier Logistics Guarantee
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#111] font-semibold">
            Insured Shipping & 30-Day In-Home Examination
          </h1>
          <p className="text-sm text-[#3B4A50] font-light">
            Every Crown Pearl creation travels under high-value vault insurance with signature handover.
          </p>
        </div>

        {/* 3 Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <Truck className="w-6 h-6 text-[#7FC8C0]" />
            <h3 className="font-heading uppercase text-xs font-semibold text-[#111]">
              Complimentary Insured Courier
            </h3>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Standard insured courier shipping is 100% complimentary on all orders over $150 across the United States, Canada, the UK, Europe, and Australia.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <RotateCcw className="w-6 h-6 text-[#7FC8C0]" />
            <h3 className="font-heading uppercase text-xs font-semibold text-[#111]">
              30-Day Natural Light Examination
            </h3>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Examine the pearl luster in your own morning daylight. If you are not thoroughly captivated, return it within 30 days for a full refund or exchange.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <PackageCheck className="w-6 h-6 text-[#7FC8C0]" />
            <h3 className="font-heading uppercase text-xs font-semibold text-[#111]">
              Discreet Tamper-Evident Packaging
            </h3>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              For complete security and surprise gift protection, outer parcels bear zero logos or mentions of jewelry. Signature is strictly required upon receipt.
            </p>
          </div>
        </div>

        {/* Full Policy Breakdown */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-[#3B4A50] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-semibold text-[#111]">
              Delivery Transit Schedules
            </h2>
            <p>
              Because every strand is calibrated and hand-knotted by Delma’s master jewelers upon order verification, please allow 1 to 2 business days for atelier inspection prior to courier dispatch.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Complimentary Insured Courier:</strong> 2 to 3 business days in transit (FedEx Priority / UPS Secure Vault).</li>
              <li><strong>Overnight Vault Dispatch ($45):</strong> Dispatched with priority tracking for next-business-day delivery by 10:30 AM.</li>
              <li><strong>Store Pickup & Inspection:</strong> Complimentary in-person pickup available at our store in San Manuel, Puerto Princesa, Palawan.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-6 border-t border-gray-100">
            <h2 className="font-serif text-2xl font-semibold text-[#111]">
              The 30-Day Return & Exchange Process
            </h2>
            <p>
              To initiate a return or exchange:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li>Contact our team at <a href="mailto:delmapearl17@gmail.com" className="text-[#7FC8C0] underline">delmapearl17@gmail.com</a>, via WhatsApp (<a href="https://wa.me/639999910270" className="text-[#7FC8C0] underline">+63 999 991 0270</a>), or on Messenger (<a href="https://m.me/delmapearlonline" className="text-[#7FC8C0] underline">@delmapearlonline</a>) with your order number.</li>
              <li>We will guide you through the insured return courier process.</li>
              <li>Place the creation in its original presentation box along with the Certificate of Authenticity.</li>
              <li>Upon arrival and verification at our Palawan atelier, your exchange or refund is processed promptly within 48 hours.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
