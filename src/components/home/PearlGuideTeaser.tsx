import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images';

export const PearlGuideTeaser: React.FC = () => {
  const pearlTypes = [
    {
      name: 'South Sea Pearl',
      origin: 'Philippines & Australia',
    },
    {
      name: 'Akoya Pearl',
      origin: 'Japan · Saltwater',
    },
    {
      name: 'Tahitian Black Pearls',
      origin: 'French Polynesia',
    },
    {
      name: 'Freshwater Pearls',
      origin: 'Lake Aquaculture',
    }
  ];

  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pearl Connoisseurship</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
            The Crown Pearl Guide to Gem Selection
          </h2>
          <p className="text-xs sm:text-sm text-[#3B4A50] max-w-lg mx-auto">
          Every pearl carries a character of its own. Its origin, the waters in which it develops, the mollusk that nurtures it, and the natural process of its formation all contribute to the qualities that make it unique — from its size and shape to its color, surface, and luminous luster.
        </p>
        <p className="text-xs sm:text-sm text-[#3B4A50] max-w-lg mx-auto">
          At Crown Pearl, we believe choosing a pearl is about more than simply finding one that catches the light. It is about understanding what lies behind its beauty. Explore the distinctive qualities of each pearl variety and discover which one best reflects your taste, your style, and the meaning you wish your jewelry to carry.
        </p>
        </div>

        {/* Feature showcase image */}
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E5E7EB] mb-12 aspect-[16/9] max-h-[420px]">
          <img
            src={ASSET_IMAGES.pearlTypes}
            alt="Crown Pearl varieties: South Sea, Tahitian, Akoya, and Freshwater"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white space-y-1">
              <span className="text-[10px] font-heading uppercase tracking-widest text-[#7FC8C0] font-semibold">
                Pearl Essentials
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold">
                Discover what makes every pearl unique.
              </h3>
            </div>
          </div>
        </div>

        {/* 4 Pearl Variety Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pearlTypes.map((type, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#7FC8C0] transition-colors"
            >
              <div>
                <span className="text-[10px] font-heading uppercase tracking-widest text-[#7FC8C0] font-semibold block mb-1">
                  {type.origin}
                </span>
                <h4 className="font-serif text-lg font-semibold text-[#111111]">
                  {type.name}
                </h4>
              </div>

              <div className="space-y-2 text-xs text-[#3B4A50] border-t border-gray-100 pt-3">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-heading">Signature Luster:</span>
                  <span className="font-medium text-[#111]">{type.sheen}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-heading">Color Palette:</span>
                  <span className="font-medium text-[#111]">{type.tones}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-heading">Typical Scale:</span>
                  <span className="font-medium text-[#111] tabular-nums">{type.size}</span>
                </div>
              </div>

              <Link
                to={`/shop?pearlType=${type.name.split(' ')[0]}`}
                className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-[#3B4A50] hover:text-[#7FC8C0] font-semibold pt-1"
              >
                <span>View {type.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* How to Choose CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/pearl-guide"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Read Complete Pearl Education & Care Guide</span>
            <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
