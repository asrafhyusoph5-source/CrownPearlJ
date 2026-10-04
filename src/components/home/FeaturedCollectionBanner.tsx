import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

export const FeaturedCollectionBanner: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2">
          {/* Visual Column */}
          <div className="relative min-h-[380px] lg:min-h-[500px] bg-[#F3F4F6] overflow-hidden">
            <img
              src={ASSET_IMAGES.bridal}
              alt="Bridal Fine Pearl Jewelry Collection"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#C9D1D3]/80 px-3 py-1.5 rounded text-[10px] font-heading font-semibold uppercase tracking-widest text-[#3B4A50]">
              The Delma Atelier Bridal Suite
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Atelier Focus</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold leading-tight">
                The Bridal Pearl Suite: Pure Grace for a Lifetime
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#3B4A50] leading-relaxed font-sans font-light">
              Pearls have illuminated wedding ceremonies for centuries, symbolizing enduring devotion, quiet strength, and luminous purity. Crafted upon commission, our bridal chokers, hair combs, and solitaire drops are balanced to drape effortlessly with heirloom bridal couture.
            </p>

            <div className="space-y-3 pt-1">
              {[
                'Individually knotted on Japanese double silk for fluid neck contouring',
                'Solid platinum and 18k white gold settings with conflict-free diamonds',
                'Complimentary bespoke sizing & bridal concierge consultation'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-[#7FC8C0] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/shop?category=bridal"
                className="px-7 py-3.5 bg-[#3B4A50] hover:bg-[#111111] text-white font-heading font-semibold uppercase text-xs tracking-widest rounded-lg shadow-sm transition-colors flex items-center gap-2"
              >
                <span>Explore Bridal Creations</span>
                <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
              </Link>
              <Link
                to="/contact"
                className="text-xs font-heading font-semibold uppercase tracking-widest text-[#3B4A50] hover:text-[#7FC8C0] py-2 transition-colors"
              >
                Book Bridal Consultation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
