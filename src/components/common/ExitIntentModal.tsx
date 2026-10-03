import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { applyPromoCode } = useShop();

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('crown_pearl_exit_seen');
    if (hasSeen) return;

    let hasTriggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasTriggered) {
        hasTriggered = true;
        sessionStorage.setItem('crown_pearl_exit_seen', 'true');
        setIsOpen(true);
      }
    };

    const dwellTimer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 12000);

    return () => {
      clearTimeout(dwellTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
      applyPromoCode('WELCOME10');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('WELCOME10');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FAFAF8] rounded-2xl shadow-2xl border border-[#C9D1D3] p-6 sm:p-8">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-[#3B4A50] hover:text-[#111] p-1.5 rounded-full hover:bg-black/5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#7FC8C0]/20 text-[#3B4A50] mx-auto">
            <Sparkles className="w-6 h-6 text-[#7FC8C0]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-heading tracking-[0.25em] text-[#7FC8C0] font-semibold">
              Before You Leave The Atelier
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#111111] font-semibold">
              Enjoy 10% Off Your First Acquisition
            </h3>
            <p className="text-xs sm:text-sm text-[#3B4A50] max-w-md mx-auto">
              Join the Crown Pearl Collector’s Guild to receive bespoke care guides and immediate savings.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal email address..."
                className="w-full px-4 py-3 bg-white border border-[#C9D1D3] rounded-lg text-sm text-[#111] focus:outline-none focus:border-[#7FC8C0]"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-md flex items-center justify-center gap-2"
              >
                <span>Claim 10% Heirloom Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="bg-white p-5 rounded-xl border border-[#7FC8C0]/40 space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-xs uppercase font-heading tracking-widest text-[#7FC8C0] font-semibold">
                <Check className="w-4 h-4" />
                <span>Code Applied to Your Cart</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-[#FAFAF8] py-2.5 px-4 rounded border border-[#E5E7EB]">
                <code className="font-mono text-lg font-bold tracking-widest text-[#111]">WELCOME10</code>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-xs font-heading uppercase text-[#3B4A50] hover:text-[#7FC8C0] ml-2 underline"
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
