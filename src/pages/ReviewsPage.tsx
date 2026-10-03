import React, { useEffect } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

export const ReviewsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Verified Patron Reviews – Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="font-serif text-4xl sm:text-5xl text-[#111] font-semibold">
            Patron Reflections & Testimonials
          </h1>
          <p className="text-sm text-[#3B4A50]">
            Genuine experiences from collectors and brides who wear Delma creations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-3">
              <div className="flex items-center text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <h3 className="font-serif text-base font-semibold text-[#111]">"{rev.title}"</h3>
              <p className="text-xs text-[#3B4A50] leading-relaxed">{rev.content}</p>
              <div className="pt-2 text-xs font-heading font-semibold text-[#111]">
                {rev.author} · {rev.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
