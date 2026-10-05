import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../../data/reviews';

export const CustomerReviewsSummary: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Aggregate Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E7EB]">
          <div>
            <div className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0] mb-2">
              Generations of Connoisseurs
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
              Words From Crown Pearl Patrons
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4 bg-[#FAFAF8] px-4 py-2.5 rounded-xl border border-[#E5E7EB]">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs text-[#3B4A50]">
              <strong className="text-[#111] font-semibold font-heading">4.94 / 5.0</strong> based on 420+ verified acquisitions
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAFAF8] p-6 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between space-y-4 hover:border-[#7FC8C0] transition-colors"
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

                <h4 className="font-serif text-base font-semibold text-[#111111] leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-[#3B4A50] leading-relaxed font-light">
                  {rev.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB]/80 flex items-center justify-between">
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

        {/* Link to all reviews */}
        <div className="mt-10 text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-[#3B4A50] hover:text-[#7FC8C0] font-semibold"
          >
            <span>Read All 420+ Client Stories & Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
