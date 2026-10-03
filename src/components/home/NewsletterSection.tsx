import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const { applyPromoCode } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setDone(true);
      applyPromoCode('WELCOME10');
    }
  };

  return (
    <section className="py-20 bg-[#FAFAF8] border-t border-[#E5E7EB] text-center space-y-4">
      <h2 className="font-serif text-3xl font-semibold text-[#111]">Acquire 10% Off Your First Order</h2>
      <p className="text-xs text-[#3B4A50]">Join the Crown Pearl Society for exclusive collection access.</p>
      {!done ? (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto flex gap-2">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 p-2 text-xs border rounded bg-white"
          />
          <button type="submit" className="px-4 py-2 bg-[#3B4A50] text-white text-xs font-heading uppercase rounded">
            Join
          </button>
        </form>
      ) : (
        <div className="text-xs text-emerald-700">Code WELCOME10 has been applied to your bag!</div>
      )}
    </section>
  );
};
