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
  const [selectedLength, setSelectedLength] = useState<string>(
    quickViewProduct?.availableLengths ? quickViewProduct.availableLengths[0] : ''
  );
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedMetal, undefined, selectedLength || undefined, quantity);
    setQuickViewProduct(null);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#FAFAF8] rounded-2xl shadow-2xl border border-[#C9D1D3] overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view for ${quickViewProduct.name}`}
      >
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#3B4A50] hover:text-[#111] transition-colors"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Column */}
        <div className="md:w-1/2 bg-white flex items-center justify-center p-6 relative">
          <img
            src={quickViewProduct.images[0]}
            alt={quickViewProduct.name}
            className="w-full max-h-80 md:max-h-96 object-contain"
            referrerPolicy="no-referrer"
          />
          {quickViewProduct.badge && (
            <div className="absolute top-4 left-4 bg-[#FAFAF8] border border-[#C9D1D3] px-2.5 py-1 text-[10px] font-heading font-semibold uppercase tracking-widest text-[#3B4A50] rounded">
              {quickViewProduct.badge}
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-[#7FC8C0] font-semibold">
                <span>{quickViewProduct.pearlType} Pearl</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#3B4A50]">{quickViewProduct.pearlSize}</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#111111] mt-1">
                {quickViewProduct.name}
              </h3>
              <p className="text-xs text-[#3B4A50] mt-1">
                {quickViewProduct.tagline}
              </p>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-bold text-2xl text-[#111] tabular-nums">
                  ${quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs text-gray-400 line-through tabular-nums">
                    ${quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-[#3B4A50]">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="font-medium tabular-nums">{quickViewProduct.rating}</span>
                <span className="text-gray-400">({quickViewProduct.reviewCount})</span>
              </div>
            </div>

            {/* Metal Selector */}
            {quickViewProduct.availableMetals.length > 1 && (
              <div>
                <label className="block text-[11px] font-heading uppercase tracking-wider text-[#3B4A50] mb-1.5 font-semibold">
                  Precious Metal: <span className="text-[#111] font-normal">{selectedMetal}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.availableMetals.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedMetal(m)}
                      className={`text-xs px-2.5 py-1.5 rounded border transition-colors ${
                        selectedMetal === m
                          ? 'border-[#7FC8C0] bg-white text-[#111] ring-1 ring-[#7FC8C0]'
                          : 'border-[#C9D1D3] bg-[#FAFAF8] text-[#3B4A50] hover:bg-white'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Length Selector if available */}
            {quickViewProduct.availableLengths && (
              <div>
                <label className="block text-[11px] font-heading uppercase tracking-wider text-[#3B4A50] mb-1.5 font-semibold">
                  Strand Length: <span className="text-[#111] font-normal">{selectedLength}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.availableLengths.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setSelectedLength(l)}
                      className={`text-xs px-2.5 py-1.5 rounded border transition-colors ${
                        selectedLength === l
                          ? 'border-[#7FC8C0] bg-white text-[#111] ring-1 ring-[#7FC8C0]'
                          : 'border-[#C9D1D3] bg-[#FAFAF8] text-[#3B4A50] hover:bg-white'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock status indicator */}
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#7FC8C0]" />
              <span>In Atelier Stock · Ready for Immediate Insured Dispatch</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#C9D1D3] rounded bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs text-[#3B4A50] hover:text-[#111]"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-2 text-xs font-heading font-semibold text-[#111] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs text-[#3B4A50] hover:text-[#111]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-2.5 px-4 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-wider font-semibold rounded flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#7FC8C0]" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            <Link
              to={`/product/${quickViewProduct.id}`}
              onClick={() => setQuickViewProduct(null)}
              className="block text-center text-xs font-heading uppercase tracking-widest text-[#3B4A50] hover:text-[#7FC8C0] py-1 transition-colors"
            >
              <span className="inline-flex items-center gap-1">
                <span>View Full Atelier Details, GIA Specs & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
