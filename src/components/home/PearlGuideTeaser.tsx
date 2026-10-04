import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

export const PearlGuideTeaser: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111]">The Crown Pearl Guide to Gem Selection</h2>
        <p className="text-xs sm:text-sm text-[#3B4A50] max-w-lg mx-auto">
          Every pearl carries a character of its own. Its origin, the waters in which it develops, the mollusk that nurtures it, and the natural process of its formation all contribute to the qualities that make it unique — from its size and shape to its color, surface, and luminous luster.
        </p>
        <p className="text-xs sm:text-sm text-[#3B4A50] max-w-lg mx-auto">
          At Crown Pearl, we believe choosing a pearl is about more than simply finding one that catches the light. It is about understanding what lies behind its beauty. Explore the distinctive qualities of each pearl variety and discover which one best reflects your taste, your style, and the meaning you wish your jewelry to carry.
        </p>
        <div className="max-w-3xl mx-auto rounded-xl overflow-hidden border border-[#E5E7EB] aspect-[16/9]">
          <img src={ASSET_IMAGES.pearlTypes} alt="Pearl Types" className="w-full h-full object-cover" />
        </div>
        <Link to="/pearl-guide" className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B4A50] text-white text-xs font-heading uppercase rounded">
          <span>Read Full Pearl Guide</span>
          <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
        </Link>
      </div>
    </section>
  );
};
