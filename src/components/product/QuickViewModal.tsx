import React, { useState } from 'react';
import { X, Star, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { MetalType } from '../../types';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsCartDrawerOpen } = useShop();

  const [selectedMetal, setSelectedMetal] = useState<MetalType>(
    quickViewProduct ? quickViewProduct.metal : '18k White Gold'
  );
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedMetal, undefined, undefined, quantity);
    setQuickViewProduct(null);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#FAFAF8] rounded-2xl shadow-2xl border border-[#C9D1D3] overflow-hidden max-h-[92vh] flex flex-col md:flex-row">
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 text-[#3B4A50] hover:text-[#111]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 bg-white flex items-center justify-center p-6">
          <img src={quickViewProduct.images[0]} alt={quickViewProduct.name} className="w-full max-h-80 object-contain" />
        </div>

        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-4">
          <div>
            <div className="text-xs font-heading uppercase text-[#7FC8C0] font-semibold">
              {quickViewProduct.pearlType} Pearl · {quickViewProduct.pearlSize}
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#111] mt-1">{quickViewProduct.name}</h3>
            <div className="font-heading font-bold text-2xl text-[#111] tabular-nums mt-2">
              ${quickViewProduct.price.toLocaleString()}
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-wider font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#7FC8C0]" />
              <span>Add to Shopping Bag</span>
            </button>
          </div>

          <Link
            to={`/product/${quickViewProduct.id}`}
            onClick={() => setQuickViewProduct(null)}
            className="block text-center text-xs font-heading uppercase tracking-widest text-[#3B4A50] hover:text-[#7FC8C0]"
          >
            View Full Atelier Details →
          </Link>
        </div>
      </div>
    </div>
  );
};
