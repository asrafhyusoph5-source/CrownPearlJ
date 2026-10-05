import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, CheckCircle2, Filter } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

export const ReviewsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Verified Patron Reviews – Crown Pearl Atelier';
  }, []);

  const filtered = REVIEWS.filter((rev) => {
    if (selectedType !== 'all' && rev.pearlType !== selectedType) return false;
    if (ratingFilter > 0 && rev.rating !== ratingFilter) return false;
    return true;
  });

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
            The Crown Pearl Community
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#111] font-semibold">
            Patron Reflections & Testimonials
          </h1>
          <p className="text-sm text-[#3B4A50] font-light">
            Genuine experiences from collectors, brides, and gift-givers who wear Delma creations.
          </p>
        </div>

        {/* Aggregate Score Bar */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-xs max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="text-center sm:text-left">
              <div className="font-serif text-5xl font-semibold text-[#111]">4.94</div>
              <div className="flex items-center text-amber-500 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">Overall Patron Satisfaction</div>
            </div>
            <div className="h-14 w-px bg-gray-200 hidden sm:block" />
            <div className="space-y-1 text-xs text-[#3B4A50]">
              <div><strong>100%</strong> of reviewers recommend Crown Pearl</div>
              <div><strong>420+</strong> verified acquisitions documented</div>
              <div><strong>20+ Years</strong> of atelier provenance</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#FAFAF8] border border-[#C9D1D3] text-xs font-heading uppercase tracking-wider rounded px-3 py-2 text-[#3B4A50] focus:outline-none"
            >
              <option value="all">All Pearl Types</option>
              <option value="Akoya">Akoya</option>
              <option value="South Sea">South Sea</option>
              <option value="Tahitian">Tahitian</option>
              <option value="Freshwater">Freshwater</option>
            </select>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#7FC8C0] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#3B4A50]/70 font-heading uppercase tracking-wider">
                    {rev.date}
                  </span>
                </div>

                {rev.productName && (
                  <div className="text-[11px] text-[#7FC8C0] font-heading uppercase tracking-wider font-semibold">
                    Acquired: {rev.productName}
                  </div>
                )}

                <h3 className="font-serif text-base font-semibold text-[#111] leading-snug">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-[#3B4A50] leading-relaxed font-light">
                  {rev.content}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-heading font-semibold text-[#111]">
                    {rev.author}
                  </div>
                  <div className="text-[11px] text-[#3B4A50]/70">{rev.location}</div>
                </div>

                {rev.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-heading font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3 text-[#7FC8C0]" />
                    <span>Verified Buyer</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
