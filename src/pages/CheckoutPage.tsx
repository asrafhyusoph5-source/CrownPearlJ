import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, Truck, CreditCard, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, OrderConfirmation } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, shippingFee, discountAmount, clearCart, setLastOrder, lastOrder } = useShop();

  const [address, setAddress] = useState<ShippingAddress>({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 234-8901',
    addressLine1: '740 Park Avenue, Apt 14B',
    addressLine2: '',
    city: 'New York',
    state: 'NY',
    postalCode: '10021',
    country: 'United States'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'priority'>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Insured Checkout – Crown Pearl Atelier';
  }, []);

  const shippingCost = shippingMethod === 'standard' ? shippingFee : 45;
  const finalTotal = subtotal - discountAmount + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNum = `CP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const confirmation: OrderConfirmation = {
        orderNumber: orderNum,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        subtotal,
        discount: discountAmount,
        shippingFee: shippingCost,
        total: finalTotal,
        address,
        shippingMethod: 'Complimentary Insured Courier (2-3 Business Days)',
        estimatedDelivery: '3 to 5 business days'
      };

      setLastOrder(confirmation);
      clearCart();
      setIsProcessing(false);
      setOrderConfirmed(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7FC8C0', '#3B4A50', '#C9D1D3', '#F59E0B']
        });
      } catch {}
    }, 1800);
  };

  if (orderConfirmed && lastOrder) {
    return (
      <div className="bg-[#FAFAF8] min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 shadow-sm space-y-8 animate-fade-in">
          <div className="text-center space-y-3 pb-6 border-b border-gray-100">
            <CheckCircle2 className="w-12 h-12 text-[#7FC8C0] mx-auto" />
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
              Acquisition Confirmed: {lastOrder.orderNumber}
            </h1>
            <p className="text-xs sm:text-sm text-[#3B4A50]">
              Your order has been transmitted to Delma’s master stringers in our Manhattan workshop.
            </p>
          </div>

          <div className="space-y-3">
            {lastOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div>
                  <strong>{item.product.name}</strong> - {item.selectedMetal} (Qty: {item.quantity})
                </div>
                <div className="tabular-nums font-bold">
                  ${(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link to="/shop" className="px-6 py-3 bg-[#3B4A50] text-white text-xs font-heading uppercase tracking-widest rounded-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="font-serif text-2xl">Your bag is empty</h2>
        <Link to="/shop" className="mt-4 inline-block px-6 py-2 bg-[#3B4A50] text-white rounded text-xs font-heading uppercase">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-semibold mb-6">Insured Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-4">
            <h3 className="font-serif text-lg font-semibold">1. Client Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={address.firstName}
                onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                placeholder="First Name"
                className="p-2 border rounded text-xs bg-[#FAFAF8]"
              />
              <input
                type="text"
                required
                value={address.lastName}
                onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                placeholder="Last Name"
                className="p-2 border rounded text-xs bg-[#FAFAF8]"
              />
            </div>
            <input
              type="email"
              required
              value={address.email}
              onChange={(e) => setAddress({ ...address, email: e.target.value })}
              placeholder="Email"
              className="w-full p-2 border rounded text-xs bg-[#FAFAF8]"
            />
            <input
              type="text"
              required
              value={address.addressLine1}
              onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
              placeholder="Address"
              className="w-full p-2 border rounded text-xs bg-[#FAFAF8]"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                required
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                placeholder="City"
                className="p-2 border rounded text-xs bg-[#FAFAF8]"
              />
              <input
                type="text"
                required
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                placeholder="State"
                className="p-2 border rounded text-xs bg-[#FAFAF8]"
              />
              <input
                type="text"
                required
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                placeholder="Zip"
                className="p-2 border rounded text-xs bg-[#FAFAF8]"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-4">
            <h3 className="font-serif text-xl font-semibold">Summary</h3>
            <div className="flex justify-between text-sm">
              <span>Total Payment</span>
              <span className="font-heading font-bold text-lg">${finalTotal.toLocaleString()}</span>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg"
            >
              {isProcessing ? 'Authorizing Order...' : 'Complete Insured Acquisition'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
