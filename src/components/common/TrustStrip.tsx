import React from 'react';
import { Award, ShieldCheck, Gift, Lock, RefreshCw } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      icon: Award,
      title: 'Authentic Pearls',
      subtitle: 'Ethically harvested 100% natural luster'
    },
    {
      icon: ShieldCheck,
      title: 'GIA Certified Quality',
      subtitle: 'Graded AAA with individual certificate'
    },
    {
      icon: Gift,
      title: 'Complimentary Gift Box',
      subtitle: 'Signature teal box & silk presentation pouch'
    },
    {
      icon: Lock,
      title: 'Secure Checkout',
      subtitle: '256-bit encrypted banking security'
    },
    {
      icon: RefreshCw,
      title: '30-Day In-Home Returns',
      subtitle: 'Insured return shipping covered'
    }
  ];

  return (
    <section aria-label="Crown Pearl Quality Guarantees" className="border-b border-[#E5E7EB] bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#C9D1D3]/40 flex items-center justify-center shrink-0 group-hover:border-[#7FC8C0] transition-colors">
                  <Icon className="w-5 h-5 text-[#3B4A50] group-hover:text-[#7FC8C0] transition-colors" />
                </div>
                <div>
                  <h4 className="font-heading uppercase text-xs tracking-wider font-semibold text-[#111111] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#3B4A50]/80 leading-normal mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
