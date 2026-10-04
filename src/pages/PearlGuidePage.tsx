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
            Pearls may look similar at first glance, but each type has its own story.
            The water where it grows, the mollusk that produces it, and the way the pearl develops all influence its size, shape, color, surface, and luster.
          </p>
          <p className="text-sm text-[#3B4A50]">
            Understanding these differences can help you choose a pearl that matches your taste, style, and budget.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden aspect-[16/9] max-h-[440px] border border-[#E5E7EB]">
          <img src={ASSET_IMAGES.pearlTypes} alt="Crown Pearl varieties" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-serif text-xl font-semibold text-[#111]">South Sea Pearls</h3>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Cultivated in large saltwater oysters, particularly the Pinctada maxima. They are associated with the warm waters of regions such as the Philippines, Indonesia, and Australia.
            </p>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
            They are among the largest cultured pearls and are admired for their naturally soft, luxurious luster. They can appear in beautiful white, silver, cream, and golden tones.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2">
            <h3 className="font-serif text-xl font-semibold text-[#111]">Akoya Pearls</h3>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
              Cultured in saltwater oysters, primarily associated with Japan and other parts of Asia. They are generally smaller than South Sea Pearls but are especially valued for their bright, sharp luster and classic appearance.
            </p>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
            Akoya Pearls are commonly round and are often found in white and cream shades, sometimes with delicate pink or silver overtones.
            </p>
            <b>
              Why choose Akoya?
            </b>
            <p className="text-xs text-[#3B4A50] leading-relaxed">
             A wonderful choice for customers who love the classic, refined look of a traditional round pearl with brilliant shine.
            </p>



          </div>


          

        </div>
      </div>
    </div>
  );
};
