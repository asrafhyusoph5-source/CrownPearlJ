import React, { useEffect } from 'react';
import { Truck, RotateCcw, PackageCheck } from 'lucide-react';

export const ShippingReturnsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Insured Delivery & 30-Day Returns – Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <h1 className="font-serif text-4xl text-center text-[#111] font-semibold">
          Insured Shipping & 30-Day In-Home Examination
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <Truck className="w-6 h-6 text-[#7FC8C0]" />
            <h3 className="font-heading uppercase text-xs font-semibold text-[#111]">Complimentary Courier</h3>
            <p className="text-xs text-[#3B4A50]">Free insured express delivery on all orders over $150 worldwide.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <RotateCcw className="w-6 h-6 text-[#7FC8C0]" />
            <h3 className="font-heading uppercase text-xs font-semibold text-[#111]">30-Day Returns</h3>
            <p className="text-xs text-[#3B4A50]">Examine your pearl in natural daylight. Full refund if not captivated.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <PackageCheck className="w-6 h-6 text-[#7FC8C0]" />
            <h3 className="font-heading uppercase text-xs font-semibold text-[#111]">Discreet Packaging</h3>
            <p className="text-xs text-[#3B4A50]">Tamper-evident unmarked parcels. Adult signature required.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
