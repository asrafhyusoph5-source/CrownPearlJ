import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

export const FeaturedCollectionBanner: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[350px]">
            <img src={ASSET_IMAGES.bridal} alt="Bridal Pearls" className="w-full h-full object-cover" />
          </div>
          <div className="p-8 sm:p-12 flex flex-col justify-center space-y-4">
            <span className="text-xs font-heading uppercase tracking-widest text-[#7FC8C0] font-semibold">Featured Focus</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111]">The Bridal Pearl Suite</h2>
            <p className="text-xs sm:text-sm text-[#3B4A50] leading-relaxed">
              Individually knotted on double silk for fluid drape against the neckline. Solid platinum and 18k white gold clasps.
            </p>
            <Link to="/shop?category=bridal" className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-widest font-semibold text-[#111] hover:text-[#7FC8C0]">
              <span>Explore Bridal Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
