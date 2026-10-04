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
          Understanding the Different Types of Pearls
Pearls may look similar at first glance, but each type has its own story. The water where it grows, the mollusk that produces it, and the way the pearl develops all influence its size, shape, color, surface, and luster.
Understanding these differences can help you choose a pearl that matches your taste, style, and budget.
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
