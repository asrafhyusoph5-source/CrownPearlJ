import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../../data/reviews';

export const CustomerReviewsSummary: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-semibold text-center mb-8">Words From Crown Pearl Patrons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="bg-[#FAFAF8] p-6 rounded-xl border border-[#E5E7EB] space-y-2">
              <div className="flex text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h4 className="font-serif font-semibold text-[#111]">"{rev.title}"</h4>
              <p className="text-xs text-[#3B4A50] leading-relaxed">{rev.content}</p>
              <div className="text-[11px] font-heading font-semibold text-[#111] pt-2">{rev.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
