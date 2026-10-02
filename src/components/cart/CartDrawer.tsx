import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Gift, Check, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    shippingFee,
    discountAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    orderTotal,
    addToCart
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isGiftWrapAll, setIsGiftWrapAll] = useState(false);
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const upsellProduct = PRODUCTS.find(p => p.id === 'heirloom-pearl-care-concierge-kit') || PRODUCTS[0];

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsCartDrawerOpen(false)} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAFAF8] shadow-2xl flex flex-col border-l border-[#C9D1D3]/50">
          <div className="p-5 border-b border-[#E5E7EB] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#3B4A50]" />
              <h2 className="font-serif text-lg font-semibold text-[#111111]">
                Atelier Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#3B4A50] hover:text-[#111] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-[#FAFAF8] border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between text-xs text-[#3B4A50] mb-1.5 font-heading uppercase text-[11px] font-semibold">
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#7FC8C0]" />
                  Complimentary Insured Courier Unlocked
                </span>
              ) : (
                <span>Add ${amountToFreeShipping} for Free Courier</span>
              )}
              <span className="tabular-nums text-gray-500">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#7FC8C0] h-full transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 bg-white p-3.5 rounded-xl border border-[#E5E7EB]">
                <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded bg-[#FAFAF8] shrink-0" />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <h4 className="font-serif text-sm font-semibold text-[#111] truncate">{item.product.name}</h4>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[11px] text-[#3B4A50]/80">
                    {item.selectedMetal} {item.selectedLength ? `· ${item.selectedLength}` : ''}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-[#C9D1D3] rounded bg-[#FAFAF8]">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 text-xs">-</button>
                      <span className="px-2 text-xs font-semibold tabular-nums">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 text-xs">+</button>
                    </div>
                    <span className="font-heading font-semibold text-xs text-[#111] tabular-nums">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E5E7EB] space-y-3 shadow-lg">
              <div className="flex justify-between text-base font-serif font-bold text-[#111]">
                <span>Estimated Total</span>
                <span className="font-heading font-bold text-lg">${orderTotal.toLocaleString()}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3.5 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <span>Proceed to Insured Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
