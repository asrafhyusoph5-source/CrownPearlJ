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
        referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for contrast per Section 1.F */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2327]/90 via-[#1A2327]/60 to-[#1A2327]/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1A2327]/20 to-[#1A2327]/80" />
      </div>

      {/* Floating Pearl Specular Ambient Orb */}
      <div className="absolute top-1/4 right-10 lg:right-1/4 w-72 h-72 rounded-full bg-[#7FC8C0]/15 blur-3xl pointer-events-none animate-pearl-glow" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl text-left space-y-6">
          {/* Eyebrow / Heritage Kicker: Zero-Pill text */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-heading uppercase tracking-[0.3em] text-[#7FC8C0] font-semibold">
            <Sparkles className="w-4 h-4 text-[#7FC8C0]" />
            <span>Jewelry Shop by Delma · Estd. 2003</span>
          </div>

          {/* Headline with text-wrap: balance */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.1] [text-wrap:balance]">
            Timeless Pearls. <br />
            <span className="italic font-normal text-[#FAFAF8]">Crafted Since 2003.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#C9D1D3] leading-relaxed max-w-xl font-light">
            Individually hand-knotted on pure silk in our Palawan atelier, each piece is thoughtfully crafted to preserve the natural beauty of every pearl for generations to come.
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

          {/* Heritage Trust Badges */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-[#C9D1D3]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7FC8C0]" />
              <span>GIA AAA Grading Standards</span>
            </div>
            <span className="text-white/30">·</span>
            <div className="flex items-center gap-2">
              <span className="text-[#7FC8C0] font-heading font-bold">20+</span>
              <span>Years of Atelier Craft</span>
            </div>
            <span className="text-white/30">·</span>
            <div>
              <span>Complimentary Worldwide Courier</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
