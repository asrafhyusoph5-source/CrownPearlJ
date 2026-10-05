import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, Truck, CreditCard, ChevronRight, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, OrderConfirmation } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, shippingFee, discountAmount, orderTotal, clearCart, setLastOrder, lastOrder } = useShop();
  const navigate = useNavigate();

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

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'priority' | 'white-glove'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Insured Checkout – Crown Pearl Atelier';
  }, []);

  const shippingCost = shippingMethod === 'standard' ? shippingFee : shippingMethod === 'priority' ? 45 : 120;
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
        shippingMethod:
          shippingMethod === 'standard'
            ? 'Complimentary Insured Courier (2-3 Business Days)'
            : shippingMethod === 'priority'
            ? 'Overnight Priority Vault Dispatch (Next Day)'
            : 'White-Glove Hand Courier & In-Home Sizing',
        estimatedDelivery: '3 to 5 business days'
      };

      setLastOrder(confirmation);
      clearCart();
      setIsProcessing(false);
      setOrderConfirmed(true);

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7FC8C0', '#3B4A50', '#C9D1D3', '#F59E0B']
        });
      } catch {
        // ignore
      }
    }, 1800);
  };

  // If order is confirmed, display the receipt view
  if (orderConfirmed && lastOrder) {
    return (
      <div className="bg-[#FAFAF8] min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 shadow-sm space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#7FC8C0]" />
            </div>
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
              Acquisition Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
              Thank You for Your Patronage
            </h1>
            <p className="text-xs sm:text-sm text-[#3B4A50] max-w-md mx-auto">
              Your heirloom order <strong>{lastOrder.orderNumber}</strong> has been transmitted to Delma’s master stringers in our Manhattan workshop.
            </p>
          </div>

          {/* Delivery & Certificate notice */}
          <div className="bg-[#FAFAF8] p-5 rounded-xl border border-[#7FC8C0]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#7FC8C0] shrink-0" />
              <div>
                <h4 className="font-heading uppercase text-xs tracking-wider text-[#111] font-semibold">
                  GIA Certificate & Vault Preparation
                </h4>
                <p className="text-xs text-[#3B4A50]">
                  Your numbered Delma Certificate of Authenticity is being embossed with your name.
                </p>
              </div>
            </div>
            <div className="text-xs font-heading uppercase text-emerald-700 font-semibold shrink-0">
              Estimated: {lastOrder.estimatedDelivery}
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#111] pb-2 border-b border-gray-100">
              Purchased Creations
            </h3>
            <div className="space-y-3">
              {lastOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded bg-[#FAFAF8] border border-gray-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-serif text-sm font-semibold text-[#111]">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-[#3B4A50]/70">
                        {item.selectedMetal} {item.selectedLength ? `· ${item.selectedLength}` : ''} (Qty: {item.quantity})
                      </div>
                    </div>
                  </div>
                  <div className="font-heading font-bold text-[#111] tabular-nums">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100 text-xs">
            <div>
              <h4 className="font-heading uppercase text-[11px] tracking-wider text-[#3B4A50] font-semibold mb-1">
                Insured Dispatch Destination
              </h4>
              <p className="text-[#111] leading-relaxed">
                {lastOrder.address.firstName} {lastOrder.address.lastName}<br />
                {lastOrder.address.addressLine1}<br />
                {lastOrder.address.city}, {lastOrder.address.state} {lastOrder.address.postalCode}<br />
                {lastOrder.address.country}
              </p>
            </div>
            <div>
              <h4 className="font-heading uppercase text-[11px] tracking-wider text-[#3B4A50] font-semibold mb-1">
                Payment & Total
              </h4>
              <p className="text-[#111] leading-relaxed">
                Total Paid: <strong>${lastOrder.total.toLocaleString()}</strong><br />
                Method: Insured Payment Verified<br />
                Confirmation dispatched to: <strong>{lastOrder.address.email}</strong>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg transition-colors"
            >
              Continue Exploring
            </Link>

            <a
              href="https://wa.me/18002769675?text=Hello%20Delma%20Atelier%2C%20I%20just%20placed%20order%20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-wider text-[#7FC8C0] hover:text-[#3B4A50] font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Atelier Concierge via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty and no confirmed order
  if (cart.length === 0) {
    return (
      <div className="bg-[#FAFAF8] min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl text-[#111]">Your bag is currently empty</h2>
          <Link
            to="/shop"
            className="px-6 py-2.5 bg-[#3B4A50] text-white font-heading uppercase text-xs tracking-wider rounded"
          >
            Explore Jewelry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-[#3B4A50]/70 mb-2">
            <Link to="/cart" className="hover:text-[#111]">Bag</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#111] font-semibold">Insured Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
            Express Insured Checkout
          </h1>
          <p className="text-xs text-[#3B4A50] mt-1">
            256-bit bank-grade encryption · Discreet high-value packaging with signature guarantee
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Express Checkout Options (Mock) */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] space-y-3 shadow-xs">
              <span className="block text-[11px] font-heading uppercase tracking-wider text-[#3B4A50] font-semibold text-center">
                Express Digital Wallets
              </span>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                    paymentMethod === 'apple'
                      ? 'border-[#7FC8C0] bg-black text-white'
                      : 'border-[#C9D1D3] bg-[#FAFAF8] hover:bg-black hover:text-white'
                  }`}
                >
                   Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('google')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                    paymentMethod === 'google'
                      ? 'border-[#7FC8C0] bg-white text-[#111] shadow-xs'
                      : 'border-[#C9D1D3] bg-[#FAFAF8] hover:bg-white'
                  }`}
                >
                  G Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                    paymentMethod === 'paypal'
                      ? 'border-[#7FC8C0] bg-[#003087] text-white'
                      : 'border-[#C9D1D3] bg-[#FAFAF8] hover:bg-[#003087] hover:text-white'
                  }`}
                >
                  PayPal
                </button>
              </div>
              <div className="relative text-center pt-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <span className="relative bg-white px-3 text-[10px] uppercase font-heading text-gray-400">
                  Or Guest Checkout with Credit Card
                </span>
              </div>
            </div>

            {/* Client & Address Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#111] pb-2 border-b border-gray-100">
                1. Client Contact & Insured Destination
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.firstName}
                    onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.lastName}
                    onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    Email Address (For Certificate & Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    Phone (Required for Courier Signature) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={address.addressLine1}
                  onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                  placeholder="Street address or suite"
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#111] pb-2 border-b border-gray-100">
                2. Select Insured Courier Service
              </h3>
              <div className="space-y-3">
                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-[#7FC8C0] bg-[#FAFAF8] ring-1 ring-[#7FC8C0]'
                      : 'border-[#E5E7EB] hover:border-[#C9D1D3]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-[#3B4A50]"
                    />
                    <div>
                      <div className="text-xs font-heading font-semibold uppercase tracking-wider text-[#111]">
                        Complimentary Insured Courier (2-3 Business Days)
                      </div>
                      <div className="text-[11px] text-[#3B4A50]/70">
                        Discreet packaging, adult signature required upon handover
                      </div>
                    </div>
                  </div>
                  <span className="font-heading font-semibold text-xs text-[#111]">
                    {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'priority'
                      ? 'border-[#7FC8C0] bg-[#FAFAF8] ring-1 ring-[#7FC8C0]'
                      : 'border-[#E5E7EB] hover:border-[#C9D1D3]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'priority'}
                      onChange={() => setShippingMethod('priority')}
                      className="accent-[#3B4A50]"
                    />
                    <div>
                      <div className="text-xs font-heading font-semibold uppercase tracking-wider text-[#111]">
                        Overnight Priority Vault Dispatch (Next Day by 10:30 AM)
                      </div>
                      <div className="text-[11px] text-[#3B4A50]/70">
                        Armored transit, priority workshop calibration
                      </div>
                    </div>
                  </div>
                  <span className="font-heading font-semibold text-xs text-[#111]">$45</span>
                </label>

                <label
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    shippingMethod === 'white-glove'
                      ? 'border-[#7FC8C0] bg-[#FAFAF8] ring-1 ring-[#7FC8C0]'
                      : 'border-[#E5E7EB] hover:border-[#C9D1D3]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'white-glove'}
                      onChange={() => setShippingMethod('white-glove')}
                      className="accent-[#3B4A50]"
                    />
                    <div>
                      <div className="text-xs font-heading font-semibold uppercase tracking-wider text-[#111]">
                        White-Glove Hand Courier & In-Home Sizing
                      </div>
                      <div className="text-[11px] text-[#3B4A50]/70">
                        Personal atelier courier delivers piece directly to your door
                      </div>
                    </div>
                  </div>
                  <span className="font-heading font-semibold text-xs text-[#111]">$120</span>
                </label>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="font-serif text-lg font-semibold text-[#111]">
                  3. Payment Authorization
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-[#3B4A50] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full pl-10 pr-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs font-mono focus:outline-none focus:border-[#7FC8C0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                      Expiration (MM/YY)
                    </label>
                    <input
                      type="text"
                      defaultValue="12/28"
                      className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs font-mono focus:outline-none focus:border-[#7FC8C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-heading tracking-wider text-[#3B4A50] mb-1">
                      CVV Security Code
                    </label>
                    <input
                      type="password"
                      defaultValue="•••"
                      maxLength={4}
                      className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs font-mono focus:outline-none focus:border-[#7FC8C0]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-6 lg:sticky lg:top-24">
            <h3 className="font-serif text-xl font-semibold text-[#111] pb-3 border-b border-gray-100">
              Order Review ({cart.length} creations)
            </h3>

            {/* Miniature Item Rows */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg bg-[#FAFAF8] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="truncate">
                      <div className="font-serif font-semibold text-[#111] truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-[#3B4A50]/70">
                        {item.selectedMetal} {item.selectedLength ? `· ${item.selectedLength}` : ''}
                      </div>
                    </div>
                  </div>
                  <div className="font-heading font-bold text-[#111] tabular-nums shrink-0">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Costs Breakdown */}
            <div className="space-y-2 text-xs text-[#3B4A50] border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#111] tabular-nums">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Heirloom Savings</span>
                  <span className="tabular-nums">-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Courier Transit</span>
                <span className="tabular-nums font-semibold text-[#111]">
                  {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Certificate & Archival Storage</span>
                <span className="text-emerald-700 font-medium">Included</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#111] pt-3 border-t border-gray-100">
                <span>Total Payment</span>
                <span className="font-heading text-xl tabular-nums">
                  ${finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#3B4A50] hover:bg-[#111] disabled:bg-gray-400 text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authorizing Vault Order...</span>
                </div>
              ) : (
                <>
                  <span>Complete Insured Acquisition</span>
                  <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
                </>
              )}
            </button>

            {/* Trust Assurances */}
            <div className="space-y-2 text-[11px] text-[#3B4A50] pt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <span>Delma Estd. 2003 Authenticity Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <span>30-Day in-home natural daylight examination</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
