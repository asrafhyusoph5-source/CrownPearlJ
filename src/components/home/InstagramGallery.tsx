import React from 'react';
import { ASSET_IMAGES } from '../../assets/images';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-semibold text-center mb-6">Worn Across Generations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[ASSET_IMAGES.hero, ASSET_IMAGES.bridal, ASSET_IMAGES.workshop, ASSET_IMAGES.earrings].map((img, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden border border-[#E5E7EB]">
              <img src={img} alt="Crown Pearl Atelier" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
