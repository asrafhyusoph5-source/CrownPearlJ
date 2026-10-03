import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[#1A2327] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.hero}
          alt="Crown Pearl High Jewelry Collection"
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2327]/90 via-[#1A2327]/60 to-[#1A2327]/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl text-left space-y-6">
          <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-[0.3em] text-[#7FC8C0] font-semibold">
            <Sparkles className="w-4 h-4 text-[#7FC8C0]" />
            <span>Jewelry Shop by Delma · Estd. 2003</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.1]">
            Timeless Pearls. <br />
            <span className="italic font-normal text-[#FAFAF8]">Crafted Since 2003.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#C9D1D3] leading-relaxed max-w-xl font-light">
            Individually hand-knotted on pure silk in our New York atelier. Certified Japanese Akoya, Australian South Sea, and exotic French Polynesian Tahitian pearls.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-[#7FC8C0] hover:bg-[#6ab8b0] text-[#111] font-heading font-semibold uppercase text-xs tracking-widest rounded-lg flex items-center justify-center gap-2"
            >
              <span>Shop Pearls</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/shop?category=bridal"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-heading font-semibold uppercase text-xs tracking-widest rounded-lg flex items-center justify-center"
            >
              Explore Bridal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
