import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

const CATEGORIES = [
  {
    title: 'Pearl Necklaces & Chokers',
    count: '8 Designs',
    path: '/shop?category=necklaces',
    image: ASSET_IMAGES.MariNecklace2,
    aspect: 'col-span-1 md:col-span-2 lg:col-span-2',
    desc: 'Classic South Sea Pearls.'
  },
  {
    title: 'Earrings & Drops',
    count: '6 Designs',
    path: '/shop?category=earrings',
    image: ASSET_IMAGES.DangleEarring1,
    aspect: 'col-span-1',
    desc: 'Luminous teardrop South Sea earrings and everyday Akoya studs.'
  },
  {
    title: 'Solitaire & Toi et Moi Rings',
    count: '4 Designs',
    path: '/shop?category=rings',
    image: ASSET_IMAGES.GoldRing,
    aspect: 'col-span-1',
    desc: 'High-jewelry cathedral mounts in 18k recycled gold and platinum.'
  },
  {
    title: 'Set High Jewelry',
    count: '5 Designs',
    path: '/shop?category=set',
    image: ASSET_IMAGES.hero,
    aspect: 'col-span-1 md:col-span-2 lg:col-span-2',
    desc: 'Regal tiara combs, multi-strand suites, and heirloom wedding day treasures.'
  },
  {
    title: 'Bracelets & Cuffs',
    count: '5 Designs',
    path: '/shop?category=bracelets',
    image: ASSET_IMAGES.BraceletGold,
    aspect: 'col-span-1',
    desc: 'Hand-knotted silk bracelets and forged 18k golden station bangles.'
  },
  {
    title: 'Men’s Pearl Accents',
    count: '3 Designs',
    path: '/shop?category=mens',
    image: ASSET_IMAGES.MensBracelet,
    aspect: 'col-span-1',
    desc: 'Engine-turned sterling silver cufflinks and matte onyx bead bracelets.'
  }
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E5E7EB]">
          <div>
            <div className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0] mb-2">
              Curated Ateliers
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 text-xs font-heading font-semibold uppercase tracking-widest text-[#3B4A50] hover:text-[#7FC8C0] flex items-center gap-1 transition-colors"
          >
            <span>View All Jewelry</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Category Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              className={`group relative overflow-hidden rounded-xl bg-white border border-[#E5E7EB] hover:border-[#7FC8C0]/70 shadow-sm hover:shadow-lg transition-all duration-500 h-80 flex flex-col justify-end p-6 ${cat.aspect}`}
            >
              {/* Image with zoom on hover */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/40 to-transparent" />
              </div>

              {/* Text content */}
              <div className="relative z-10 space-y-1">
                <div className="flex items-center justify-between text-xs text-[#7FC8C0] font-heading uppercase tracking-widest">
                  <span>{cat.count}</span>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#C9D1D3] line-clamp-1 opacity-90 font-light">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
