import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Link } from 'react-router-dom';

interface PurchaseEvent {
  city: string;
  state: string;
  product: typeof PRODUCTS[0];
  timeAgo: string;
}

const RECENT_PURCHASES: PurchaseEvent[] = [
  { city: 'Seattle', state: 'WA', product: PRODUCTS[0], timeAgo: '4 minutes ago' },
  { city: 'Manhattan', state: 'NY', product: PRODUCTS[1], timeAgo: '12 minutes ago' },
  { city: 'Palm Beach', state: 'FL', product: PRODUCTS[2], timeAgo: '28 minutes ago' }
];

export const SocialProofToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const initialTimer = setTimeout(() => setIsVisible(true), 7000);
    const intervalTimer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true);
      }, 1000);
    }, 18000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;
  const current = RECENT_PURCHASES[currentIndex];

  return (
    <div
      role="status"
      className="fixed bottom-6 left-6 z-40 max-w-sm bg-white/95 backdrop-blur-md rounded-lg p-3.5 shadow-xl border border-[#C9D1D3]/70 transition-all duration-500 animate-slide-up"
    >
      <div className="flex items-start gap-3">
        <Link to={`/product/${current.product.id}`} className="shrink-0">
          <img
            src={current.product.images[0]}
            alt={current.product.name}
            className="w-12 h-12 object-cover rounded bg-[#FAFAF8] border border-gray-100"
          />
        </Link>
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 text-[10px] font-heading uppercase tracking-wider text-[#3B4A50]">
            <CheckCircle2 className="w-3 h-3 text-[#7FC8C0]" />
            <span>Someone in {current.city}, {current.state}</span>
          </div>
          <Link
            to={`/product/${current.product.id}`}
            className="block text-xs font-serif font-semibold text-[#111111] hover:text-[#7FC8C0] truncate mt-0.5"
          >
            Acquired {current.product.name}
          </Link>
          <div className="text-[10px] text-[#3B4A50]/70 tabular-nums mt-0.5">
            {current.timeAgo} · Verified Client
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="text-gray-400 hover:text-gray-600 p-0.5 -mt-1 -mr-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
