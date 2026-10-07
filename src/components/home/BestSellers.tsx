import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const BestSellers: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestseller || p.badge === 'Bestseller').slice(0, 10);
  const [filterType, setFilterType] = useState<'south-sea' | 'akoya' | 'tahitian' | 'freshwater' | 'baroque' | 'keshi' | 'all'>('all');

  const filteredProducts = bestSellers.filter((p) => {
    if (filterType === 'south-sea') return p.pearlType === 'South Sea';
    if (filterType === 'akoya') return p.pearlType === 'Akoya';
    if (filterType === 'tahitian') return p.pearlType === 'Tahitian';
    if (filterType === 'freshwater') return p.pearlType === 'Freshwater';
    if (filterType === 'baroque') return p.pearlType === 'Baroque';
    if (filterType === 'keshi') return p.pearlType === 'Keshi';
    if (filterType === 'all') return true;
    return true;
  });

  return (
    <section className="py-20 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E5E7EB]">
          <div>
            <div className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0] mb-2">
              Crown Pearl Benchmarks
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
              Atelier Best Sellers
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 mt-4 md:mt-0 p-1 bg-[#FAFAF8] rounded-lg border border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setFilterType('south-sea')}
              className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider rounded transition-colors ${
                filterType === 'south-sea'
                  ? 'bg-white text-[#111] shadow-xs font-semibold'
                  : 'text-[#3B4A50] hover:text-[#111]'
              }`}
            >
              South Sea
            </button>
            <button
              type="button"
              onClick={() => setFilterType('akoya')}
              className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider rounded transition-colors ${
                filterType === 'akoya'
                  ? 'bg-white text-[#111] shadow-xs font-semibold'
                  : 'text-[#3B4A50] hover:text-[#111]'
              }`}
            >
              Akoya
            </button>
            <button
              type="button"
              onClick={() => setFilterType('tahitian')}
              className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider rounded transition-colors ${
                filterType === 'tahitian'
                  ? 'bg-white text-[#111] shadow-xs font-semibold'
                  : 'text-[#3B4A50] hover:text-[#111]'
              }`}
            >
              Tahitian
            </button>
            <button
              type="button"
              onClick={() => setFilterType('freshwater')}
              className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider rounded transition-colors ${
                filterType === 'freshwater'
                  ? 'bg-white text-[#111] shadow-xs font-semibold'
                  : 'text-[#3B4A50] hover:text-[#111]'
              }`}
            >
              Freshwater
            </button>
            <button
              type="button"
              onClick={() => setFilterType('baroque')}
              className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider rounded transition-colors ${
                filterType === 'baroque'
                  ? 'bg-white text-[#111] shadow-xs font-semibold'
                  : 'text-[#3B4A50] hover:text-[#111]'
              }`}
            >
              Baroque
            </button>
            <button
              type="button"
              onClick={() => setFilterType('keshi')}
              className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider rounded transition-colors ${
                filterType === 'keshi'
                  ? 'bg-white text-[#111] shadow-xs font-semibold'
                  : 'text-[#3B4A50] hover:text-[#111]'
              }`}
            >
              Keshi
            </button>
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider rounded transition-colors ${
                filterType === 'all'
                  ? 'bg-white text-[#111] shadow-xs font-semibold'
                  : 'text-[#3B4A50] hover:text-[#111]'
              }`}
            >
              All Varieties
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 2} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3B4A50] hover:bg-[#111111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Explore Complete Pearl Catalog ({PRODUCTS.length} Creations)</span>
            <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
