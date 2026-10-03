import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const BestSellers: React.FC = () => {
  const bestSellers = PRODUCTS.slice(0, 4);

  return (
    <section className="py-20 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0] mb-2">Crown Pearl Benchmarks</div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111] font-semibold">Atelier Best Sellers</h2>
          </div>
          <Link to="/shop" className="text-xs uppercase font-heading font-semibold text-[#3B4A50] hover:text-[#7FC8C0]">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
