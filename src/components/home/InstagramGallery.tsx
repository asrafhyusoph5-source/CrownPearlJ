import React from 'react';
import { ASSET_IMAGES } from '../../assets/images';
import { Sparkles } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  const images = [
    { src: ASSET_IMAGES.hero, caption: 'Atelier evening wear pairing' },
    { src: ASSET_IMAGES.bridal, caption: 'Handmade bridal suite on ivory silk' },
    { src: ASSET_IMAGES.workshop, caption: 'Silk knotting by Delma' },
    { src: ASSET_IMAGES.earrings, caption: 'Teardrop South Sea drop earrings' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E5E7EB]">
          <div>
            <div className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0] mb-2">
              The Living Atelier
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold">
              Worn Across Generations
            </h2>
          </div>
          <div className="mt-2 sm:mt-0 text-xs font-heading font-medium tracking-widest uppercase text-[#3B4A50] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#7FC8C0]" />
            <span>Tag #CrownPearlDelma to be featured</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#E5E7EB] shadow-xs"
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-xs font-heading tracking-wide">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
