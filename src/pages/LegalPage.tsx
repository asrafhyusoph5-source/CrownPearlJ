import React, { useEffect } from 'react';

export const LegalPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Legal & Lifetime Warranty – Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="font-serif text-4xl text-center text-[#111] font-semibold">
          Lifetime Warranty & Client Rights
        </h1>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 space-y-4 text-xs sm:text-sm text-[#3B4A50] leading-relaxed">
          <h2 className="font-serif text-xl font-semibold text-[#111]">Delma Estd. 2003 Lifetime Authenticity Guarantee</h2>
          <p>
            Every piece created by Crown Pearl is guaranteed for life against structural and material defects in precious metals and artisanal stringing.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Complimentary annual knotting inspections at our Manhattan Atelier.</li>
            <li>One complimentary restringing on Japanese silk thread every 24 months.</li>
            <li>Ultrasonic inspection of diamond pavé mounts and safety clasps.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
