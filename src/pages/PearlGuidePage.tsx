import React, { useEffect } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images';

export const PearlGuidePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Pearl Education & Care Guide – Crown Pearl Atelier';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.3em] text-[#7FC8C0]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Delma Gemological Academy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] font-semibold">
            The Connoisseur’s Guide to Cultured Pearls
          </h1>
          <p className="text-sm text-[#3B4A50]">
            Understanding the four major pearl varieties and the GIA grading benchmarks: Luster, Surface, Shape, and Nacre Thickness.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden aspect-[16/9] max-h-[440px] border border-[#E5E7EB]">
          <img src={ASSET_IMAGES.pearlTypes} alt="Crown Pearl varieties" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-serif text-xl font-semibold text-[#111]">Japanese Akoya Pearls</h3>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Renowned for the sharpest, most mirror-like luster of any pearl variety in existence, paired with iconic rose and silver overtones.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-serif text-xl font-semibold text-[#111]">South Sea Pearls</h3>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Formed along the Kimberley coastline of Australia. Famous for grand scale, thick nacre, and satiny golden or platinum luster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
