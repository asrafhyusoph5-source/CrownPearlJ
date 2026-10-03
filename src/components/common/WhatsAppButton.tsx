import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickInquiries = [
    'Hello Delma Atelier, I would like to inquire about customized necklace lengths.',
    'Could you help me choose between Akoya and South Sea pearl luster for an anniversary gift?',
    'I would like to book a private bespoke bridal appointment.'
  ];

  const handleSendWhatsApp = (textToSend: string) => {
    const encoded = encodeURIComponent(textToSend || 'Hello Delma Atelier, I am browsing Crown Pearl and would appreciate concierge assistance.');
    window.open(`https://wa.me/18002769675?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#C9D1D3]/70 overflow-hidden animate-fade-in">
          <div className="bg-[#3B4A50] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#7FC8C0]/30 border border-[#7FC8C0] flex items-center justify-center font-script text-2xl text-white">
                  D
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#3B4A50]"></span>
              </div>
              <div>
                <h4 className="font-heading text-xs font-semibold uppercase tracking-wider">
                  Delma Atelier Concierge
                </h4>
                <p className="text-[11px] text-[#C9D1D3] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#7FC8C0]" />
                  <span>Online · Estd. 2003</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#C9D1D3] hover:text-white p-1 rounded transition-colors"
              aria-label="Close concierge chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-[#FAFAF8] space-y-3">
            <div className="bg-white p-3 rounded-lg border border-[#E5E7EB] text-xs text-[#111111] leading-relaxed shadow-sm">
              <p className="font-serif italic text-sm text-[#3B4A50] mb-1">
                "Welcome to Crown Pearl. I am delighted to assist with pearl selections, bespoke lengths, or wedding styling."
              </p>
              <span className="text-[10px] text-[#3B4A50]/70 font-heading uppercase tracking-widest">
                — Delma, Master Jeweler
              </span>
            </div>

            <div className="text-[11px] font-heading uppercase tracking-wider text-[#3B4A50]/80">
              Quick Inquiries
            </div>
            <div className="space-y-1.5">
              {quickInquiries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendWhatsApp(q)}
                  className="w-full text-left text-xs p-2 rounded bg-white hover:bg-[#7FC8C0]/10 border border-[#E5E7EB] hover:border-[#7FC8C0] text-[#3B4A50] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-white border border-[#C9D1D3] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#7FC8C0]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendWhatsApp(customMsg);
                }}
              />
              <button
                type="button"
                onClick={() => handleSendWhatsApp(customMsg)}
                className="p-2 bg-[#7FC8C0] text-[#111111] hover:bg-[#68b5ad] rounded transition-colors"
                aria-label="Send WhatsApp message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Delma Atelier on WhatsApp"
        className="flex items-center gap-2.5 bg-[#3B4A50] hover:bg-[#111111] text-white px-4 py-3 rounded-full shadow-lg border border-[#7FC8C0]/50 transition-all duration-300 hover:scale-105 group"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-[#7FC8C0]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
        </div>
        <span className="font-heading text-xs font-semibold uppercase tracking-widest hidden sm:inline">
          Boutique Concierge
        </span>
      </button>
    </div>
  );
};
