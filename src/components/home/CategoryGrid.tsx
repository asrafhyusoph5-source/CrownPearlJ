import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

const CATEGORIES = [
  { title: 'Pearl Necklaces & Chokers', count: '8 Designs', path: '/shop?category=necklaces', image: ASSET_IMAGES.hero, aspect: 'md:col-span-2' },
  { title: 'Earrings & Drops', count: '6 Designs', path: '/shop?category=earrings', image: ASSET_IMAGES.earrings, aspect: 'col-span-1' },
  { title: 'Solitaire & Toi et Moi Rings', count: '4 Designs', path: '/shop?category=rings', image: ASSET_IMAGES.pearlTypes, aspect: 'col-span-1' },
  { title: 'Bridal High Jewelry', count: '5 Designs', path: '/shop?category=bridal', image: ASSET_IMAGES.bridal, aspect: 'md:col-span-2' }
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#111] font-semibold mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              className={`group relative overflow-hidden rounded-xl bg-white border border-[#E5E7EB] h-80 flex flex-col justify-end p-6 ${cat.aspect}`}
            >
              <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="text-xs text-[#7FC8C0] font-heading uppercase">{cat.count}</span>
                <h3 className="font-serif text-2xl font-semibold">{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
