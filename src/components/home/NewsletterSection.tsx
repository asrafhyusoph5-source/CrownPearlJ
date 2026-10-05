import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { applyPromoCode } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
      applyPromoCode('WELCOME10');
    }
  };

  return (
    <section className="py-20 bg-[#FAFAF8] border-t border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#7FC8C0]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Crown Pearl Society</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
            Acquire 10% Off Your First Atelier Commission
          </h2>
          <p className="text-sm text-[#3B4A50] max-w-lg mx-auto font-light leading-relaxed">
            Receive private trunk show access, seasonal harvest allocations, and our comprehensive pearl conservation handbook.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#3B4A50]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal email..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#C9D1D3] rounded-lg text-xs text-[#111] placeholder-[#3B4A50]/50 focus:outline-none focus:border-[#7FC8C0] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Join Guild</span>
              <ArrowRight className="w-4 h-4 text-[#7FC8C0]" />
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto bg-white p-4 rounded-xl border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2 animate-fade-in shadow-xs">
            <Check className="w-4 h-4 text-[#7FC8C0] shrink-0" />
            <span>
              Welcome to the Guild. Your 10% code <strong>WELCOME10</strong> is active and applied.
            </span>
          </div>
        )}

        <p className="text-[11px] text-[#3B4A50]/70 uppercase tracking-widest">
          Respecting your privacy since 2003. We never distribute our client registry.
        </p>
      </div>
    </section>
  );
};
