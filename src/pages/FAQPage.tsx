import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { Link } from 'react-router-dom';

export const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Frequently Asked Questions – Crown Pearl Atelier';
  }, []);

  const categories = [
    'all',
    'Pearl Care & Quality',
    'Orders & Shipping',
    'Bespoke & Sizing',
    'Authenticity & Guarantee'
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
            Client Guidance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#111] font-semibold">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[#3B4A50] font-light max-w-lg mx-auto">
            Guidance on pearl conservation, international insured courier transit, custom strand lengths, and lifetime atelier guarantees.
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#3B4A50] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by topic (e.g. restringing, Akoya, return policy)..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#C9D1D3] rounded-xl text-xs text-[#111] placeholder-[#3B4A50]/50 focus:outline-none focus:border-[#7FC8C0] shadow-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#E5E7EB] rounded-xl">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-heading uppercase tracking-wider transition-colors ${
                  selectedCategory === c
                    ? 'bg-[#3B4A50] text-white font-semibold'
                    : 'text-[#3B4A50] hover:text-[#111]'
                }`}
              >
                {c === 'all' ? 'All Questions' : c}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] divide-y divide-gray-100 shadow-xs overflow-hidden">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center text-[#3B4A50]">
              <p className="font-serif text-lg">No matching questions found.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                className="mt-2 text-xs text-[#7FC8C0] uppercase font-heading underline"
              >
                Reset search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="p-6">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-serif text-lg font-semibold text-[#111] hover:text-[#7FC8C0] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#3B4A50] shrink-0 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#7FC8C0]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-[#3B4A50] leading-relaxed animate-fade-in space-y-2">
                      <p>{faq.answer}</p>
                      <div className="text-[10px] font-heading uppercase tracking-wider text-[#7FC8C0] pt-1">
                        Category: {faq.category}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions banner */}
        <div className="bg-[#FAFAF8] border border-[#7FC8C0]/50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#111]">
              Have a specific sizing or custom strand request?
            </h3>
            <p className="text-xs text-[#3B4A50] mt-0.5">
              Delma and our master pearl gemologists are available for direct consultation.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-2.5 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-wider rounded font-semibold shrink-0 transition-colors"
          >
            Inquire With Delma
          </Link>
        </div>
      </div>
    </div>
  );
};
