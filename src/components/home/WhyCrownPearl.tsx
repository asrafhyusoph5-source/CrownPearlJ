import React from 'react';
import { Award, Compass, HeartHandshake, RefreshCw } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

export const WhyCrownPearl: React.FC = () => {
  return (
    <section className="py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#E5E7EB]">
          <img src={ASSET_IMAGES.workshop} alt="Delma Workshop" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <span className="text-xs font-heading font-semibold uppercase tracking-widest text-[#7FC8C0]">The Delma Standard</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111]">Why Connoisseurs Trust Crown Pearl</h2>
          <p className="text-xs sm:text-sm text-[#3B4A50] leading-relaxed">
            Since 2003, Delma has personally inspected every harvest lot under north-facing studio light, accepting only pearls with deep mirror reflections.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
            <div><strong>Hand-Selected</strong> under studio daylight</div>
            <div><strong>Double Silk Knotted</strong> for lifetime security</div>
            <div><strong>Direct Sourcing</strong> in Japan and Tahiti</div>
            <div><strong>Lifetime Care</strong> with free restringing</div>
          </div>
        </div>
      </div>
    </section>
  );
};
