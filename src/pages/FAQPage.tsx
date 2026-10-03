import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/faqs';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Frequently Asked Questions – Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="font-serif text-4xl text-center text-[#111] font-semibold">
          Frequently Asked Questions
        </h1>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] divide-y divide-gray-100 overflow-hidden shadow-xs">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-6">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-serif text-lg font-semibold text-[#111]"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#3B4A50] transform ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIdx === idx && (
                <div className="mt-3 text-xs sm:text-sm text-[#3B4A50] leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
