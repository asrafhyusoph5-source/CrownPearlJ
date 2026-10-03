import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShieldCheck, Gift, Check, Tag, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    freeShippingThreshold,
    shippingFee,
    discountAmount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    orderTotal
  } = useShop();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [giftWrapping, setGiftWrapping] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Shopping Bag – Crown Pearl Atelier';
  }, []);

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCodeInput.trim()) {
      applyPromoCode(promoCodeInput);
      setPromoCodeInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#FAFAF8] min-h-[75vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl border border-[#E5E7EB] text-center space-y-5 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FAFAF8] border border-[#C9D1D3] flex items-center justify-center mx-auto text-[#3B4A50]">
            <ShoppingBag className="w-8 h-8 opacity-40" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-[#111]">
            Your Shopping Bag is Empty
          </h1>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-colors"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs font-heading uppercase tracking-widest text-[#3B4A50] hover:text-[#7FC8C0] mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#111] font-semibold">
            Atelier Shopping Bag ({cart.length} creations)
          </h1>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] mb-8 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#3B4A50] mb-1.5">
            <span className="font-heading uppercase tracking-wider font-semibold">
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <Check className="w-4 h-4 text-[#7FC8C0]" />
                  Complimentary Insured Courier Delivery Unlocked
                </span>
              ) : (
                <span>Add ${amountToFreeShipping} more to qualify for Free Courier</span>
              )}
            </span>
            <span className="tabular-nums font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#FAFAF8] border border-gray-200 h-2 rounded-full overflow-hidden">
            <div className="bg-[#7FC8C0] h-full transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4 min-w-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl bg-[#FAFAF8] border border-gray-100 shrink-0" />
                    <div className="min-w-0 space-y-1">
                      <div className="text-[10px] text-[#7FC8C0] font-heading uppercase tracking-widest font-semibold">
                        {item.product.pearlType} Pearl · {item.product.pearlSize}
                      </div>
                      <Link to={`/product/${item.product.id}`} className="font-serif text-lg font-semibold text-[#111] block truncate">
                        {item.product.name}
                      </Link>
                      <div className="text-xs text-[#3B4A50]/80">
                        Metal: <strong className="text-[#111]">{item.selectedMetal}</strong> {item.selectedLength ? `· ${item.selectedLength}` : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="flex items-center border border-[#C9D1D3] rounded-lg bg-[#FAFAF8]">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-xs text-[#3B4A50]">-</button>
                      <span className="px-3 text-xs font-heading font-semibold text-[#111] tabular-nums">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-xs text-[#3B4A50]">+</button>
                    </div>

                    <div className="font-heading font-bold text-base sm:text-lg text-[#111] tabular-nums">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-rose-500 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-[#7FC8C0]" />
                <div>
                  <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-[#111]">
                    Crown Pearl Signature Gift Boxing & Wax Seal
                  </h4>
                  <p className="text-xs text-[#3B4A50]/80">
                    Bespoke teal lacquer presentation box with hand-stamped wax crest.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={giftWrapping}
                onChange={(e) => setGiftWrapping(e.target.checked)}
                className="w-5 h-5 accent-[#3B4A50] rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-semibold text-[#111] pb-3 border-b border-gray-100">
              Acquisition Summary
            </h3>

            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Code (e.g. WELCOME10)"
                  className="w-full px-3 py-2 text-xs bg-[#FAFAF8] border border-[#C9D1D3] rounded focus:outline-none focus:border-[#7FC8C0]"
                />
                <button type="submit" className="px-4 py-2 bg-[#3B4A50] text-white text-xs font-heading uppercase rounded">
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded flex justify-between">
                  <span>Code <strong>{appliedPromo}</strong> active</span>
                  <button type="button" onClick={removePromoCode} className="underline text-[11px]">Remove</button>
                </div>
              )}
            </form>

            <div className="space-y-3 text-xs text-[#3B4A50] border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#111] tabular-nums">${subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Heirloom Savings</span>
                  <span className="tabular-nums">-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Global Courier</span>
                <span className="tabular-nums font-medium text-[#111]">
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#111] pt-3 border-t border-gray-100">
                <span>Estimated Total</span>
                <span className="font-heading text-xl tabular-nums">${orderTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Insured Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
