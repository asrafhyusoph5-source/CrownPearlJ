import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

export const PearlGuideTeaser: React.FC = () => {

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pearl Connoisseurship</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
            The Crown Pearl Guide to Gem Selection
          </h2>
          <p className="text-xs sm:text-sm text-[#3B4A50] max-w-lg mx-auto">
          Every pearl carries a character of its own. Its origin, the waters in which it develops, the mollusk that nurtures it, and the natural process of its formation all contribute to the qualities that make it unique — from its size and shape to its color, surface, and luminous luster.
        </p>
        <p className="text-xs sm:text-sm text-[#3B4A50] max-w-lg mx-auto">
          At Crown Pearl, we believe choosing a pearl is about more than simply finding one that catches the light. It is about understanding what lies behind its beauty. Explore the distinctive qualities of each pearl variety and discover which one best reflects your taste, your style, and the meaning you wish your jewelry to carry.
        </p>
        </div>

        {/* Feature showcase image */}
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E5E7EB] mb-12 aspect-[16/9] max-h-[420px]">
          <img
            src={ASSET_IMAGES.pearlTypes}
            alt="Crown Pearl varieties: South Sea, Tahitian, Akoya, and Freshwater"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white space-y-1">
              <span className="text-[10px] font-heading uppercase tracking-widest text-[#7FC8C0] font-semibold">
                Pearl Essentials
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold">
                Discover what makes every pearl unique.
              </h3>
            </div>
          </div>
        </div>

        {/* 4 Pearl Variety Cards */}

        {/* How to Choose CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/pearl-guide"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Read Complete Pearl Education & Care Guide</span>
            <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
