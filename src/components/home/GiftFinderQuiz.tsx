import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Link } from 'react-router-dom';

export const GiftFinderQuiz: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <section className="py-20 bg-[#FAFAF8] border-b border-[#E5E7EB]">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl border border-[#E5E7EB] text-center space-y-4">
        <span className="text-xs font-heading uppercase tracking-widest text-[#7FC8C0]">Concierge Tool</span>
        <h3 className="font-serif text-2xl font-semibold text-[#111]">Crown Pearl Gift Finder</h3>
        <p className="text-xs text-[#3B4A50]">Looking for an anniversary gift, bridal treasure, or everyday luxury?</p>
        <Link to="/shop" className="inline-block px-6 py-2.5 bg-[#3B4A50] text-white text-xs font-heading uppercase rounded">
          Discover Recommendations
        </Link>
      </div>
    </section>
  );
};
