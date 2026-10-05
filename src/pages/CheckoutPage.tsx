import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ArrowRight, Truck, ChevronRight, Sparkles, MessageCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, OrderConfirmation } from '../types';

// 👇 1. REPLACE THIS WITH YOUR FACEBOOK PAGE USERNAME OR ID
const FB_PAGE_USERNAME = 'shoponlineph'; // e.g. from facebook.com/yourpage

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, shippingFee, discountAmount, clearCart, setLastOrder, lastOrder } = useShop();
  const navigate = useNavigate();

  const [address, setAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Philippines' // Or 'United States'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'priority' | 'white-glove'>('standard');
  const [preferredPayment, setPreferredPayment] = useState<'bank_transfer' | 'gcash' | 'paypal_invoice' | 'cod'>('bank_transfer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Order via Messenger – Crown Pearl Atelier';
  }, []);

  const shippingCost = shippingMethod === 'standard' ? shippingFee : shippingMethod === 'priority' ? 45 : 120;
  const finalTotal = subtotal - discountAmount + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderNum = `CP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Format item list for Messenger
    const itemsList = cart.map(item => 
      `• ${item.quantity}x ${item.product.name} (${item.selectedMetal}${item.selectedLength ? `, ${item.selectedLength}` : ''}) - $${(item.product.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const paymentLabel = {
      bank_transfer: 'Bank Transfer (BDO / BPI / Wire)',
      gcash: 'GCash / Maya',
      paypal_invoice: 'PayPal / Credit Card Invoice',
      cod: 'Cash on Delivery / In-Person Sizing'
    }[preferredPayment];

    // Build the Messenger Message
    const orderMessage = `👑 NEW ORDER: ${orderNum}
-----------------------------
PATRON DETAILS:
Name: ${address.firstName} ${address.lastName}
Email: ${address.email}
Phone: ${address.phone}

DELIVERY ADDRESS:
${address.addressLine1}
${address.city}, ${address.state} ${address.postalCode}
${address.country}

ORDER ITEMS:
${itemsList}

SUBTOTAL: $${subtotal.toLocaleString()}
SHIPPING: ${shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
TOTAL DUE: $${finalTotal.toLocaleString()}
PREFERRED PAYMENT: ${paymentLabel}
-----------------------------
Hello Delma Atelier, please confirm my order and send the payment details!`;

    const encodedMessage = encodeURIComponent(orderMessage);

    setTimeout(() => {
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

      // Open Facebook Messenger with pre-filled order!
      window.open(`https://m.me/${FB_PAGE_USERNAME}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7FC8C0', '#3B4A50', '#C9D1D3', '#0084FF']
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  // If order is confirmed, display the receipt view
  if (orderConfirmed && lastOrder) {
    return (
      <div className="bg-[#FAFAF8] min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 shadow-sm space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 bg-blue-50 text-[#0084FF] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#0084FF]" />
            </div>
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#0084FF]">
              Order Transmitted to Messenger
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-[#3B4A50] max-w-md mx-auto">
              Your order <strong>{lastOrder.orderNumber}</strong> has been transmitted. If your Messenger window did not open, click the button below.
            </p>
          </div>

          {/* Messenger Re-open button */}
          <div className="text-center">
            <a
              href={`https://m.me/${FB_PAGE_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0084FF] hover:bg-[#0073e6] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on Messenger with Atelier</span>
            </a>
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
                Total Amount Due
              </h4>
              <p className="text-[#111] leading-relaxed">
                Total: <strong>${lastOrder.total.toLocaleString()}</strong><br />
                Method: Direct Atelier Invoice / Wire<br />
                Confirmation Email: <strong>{lastOrder.address.email}</strong>
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg transition-colors"
            >
              Continue Exploring
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty
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
            <span className="text-[#111] font-semibold">Complete Order</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
            Order via Facebook Messenger
          </h1>
          <p className="text-xs text-[#3B4A50] mt-1">
            Fill in your delivery details below. Clicking "Submit Order" will transmit your acquisition directly to Delma's atelier on Messenger.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Client & Address Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#111] pb-2 border-b border-gray-100">
                1. Delivery & Contact Details
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
                    Email Address *
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
                    Phone / Contact Number *
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
                  Street Address & House / Unit # *
                </label>
                <input
                  type="text"
                  required
                  value={address.addressLine1}
                  onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
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
                    Province / State *
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

            {/* Preferred Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-semibold text-[#111] pb-2 border-b border-gray-100">
                2. How Would You Prefer to Pay?
              </h3>
              <p className="text-xs text-[#3B4A50]">
                We will send payment account details / link to your Messenger chat upon confirmation.
              </p>

              <div className="space-y-2 pt-2">
                {[
                  { id: 'bank_transfer', title: 'Bank Transfer / Wire', desc: 'Direct deposit (BDO, BPI, UnionBank, or International Wire)' },
                  { id: 'gcash', title: 'E-Wallet (GCash / Maya)', desc: 'Fast QR code transfer or mobile number payment' },
                  { id: 'paypal_invoice', title: 'Credit Card / PayPal Invoice', desc: 'Secure online card payment link sent via Messenger' },
                  { id: 'cod', title: 'Cash on Delivery (COD)', desc: 'Available for selected locations upon verification' }
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      preferredPayment === m.id
                        ? 'border-[#0084FF] bg-blue-50/30 ring-1 ring-[#0084FF]'
                        : 'border-[#E5E7EB] hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={preferredPayment === m.id}
                      onChange={() => setPreferredPayment(m.id as any)}
                      className="accent-[#0084FF] mt-1"
                    />
                    <div>
                      <div className="text-xs font-heading font-semibold uppercase tracking-wider text-[#111]">
                        {m.title}
                      </div>
                      <div className="text-[11px] text-[#3B4A50]/80">
                        {m.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-6 lg:sticky lg:top-24">
            <h3 className="font-serif text-xl font-semibold text-[#111] pb-3 border-b border-gray-100">
              Order Summary ({cart.length} items)
            </h3>

            {/* Item Rows */}
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
                  <span>Discount</span>
                  <span className="tabular-nums">-${discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Courier Delivery</span>
                <span className="tabular-nums font-semibold text-[#111]">
                  {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#111] pt-3 border-t border-gray-100">
                <span>Total Payment</span>
                <span className="font-heading text-xl tabular-nums text-[#0084FF]">
                  ${finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#0084FF] hover:bg-[#0073e6] disabled:bg-gray-400 text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Transmitting Order...</span>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to Facebook Messenger</span>
                </>
              )}
            </button>

            {/* Trust Assurances */}
            <div className="space-y-2 text-[11px] text-[#3B4A50] pt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <span>Direct consultation & verified stock before payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <span>Insured courier dispatch with tracking number</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
