import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images';

export const OurStoryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Our Story – Delma, Estd. 2003 | Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-[#7FC8C0]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Provenance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111111] font-semibold leading-tight">
            Twenty-Three Years of Slow Luxury and Living Nacre
          </h1>
          <p className="text-base sm:text-lg text-[#3B4A50] font-light leading-relaxed">
            Founded by Delma in autumn 2003, Crown Pearl was born out of reverence for the singular gem on Earth that emerges complete and glowing from the sea.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#E5E7EB] aspect-[4/3]">
            <img src={ASSET_IMAGES.workshop} alt="Delma knotting pearls in workshop" className="w-full h-full object-cover" />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-heading font-semibold uppercase tracking-wider text-[#7FC8C0]">
              The Early Years · 2003
            </span>
            <h2 className="font-serif text-3xl text-[#111] font-semibold">
              Rejecting Mass Production for Generational Integrity
            </h2>
            <p className="text-sm text-[#3B4A50] leading-relaxed">
              When Delma opened the atelier doors on Madison Avenue in 2003, commercial jewelry was rapidly transitioning to synthetic filaments and glued composite pearls. Delma chose the harder path: establishing direct relationships with multi-generational pearl farmers in Ago Bay, Japan, and the coral lagoons of French Polynesia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
