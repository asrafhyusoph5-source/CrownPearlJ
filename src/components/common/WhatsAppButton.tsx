import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

// Your Facebook Page username
const FB_PAGE_USERNAME = 'shoponlineph';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickInquiries = [
    'Hello Crown Pearl, I would like to inquire about customized necklace lengths.',
    'Could you help me choose between Akoya and South Sea pearl luster for an anniversary gift?',
    'I would like to book a private bespoke bridal appointment.',
  ];

  const handleSendMessenger = (message?: string) => {
    // Open your Facebook Messenger Page
    window.open(
      `https://m.me/${FB_PAGE_USERNAME}`,
      '_blank',
      'noopener,noreferrer'
    );

    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#C9D1D3]/70 overflow-hidden animate-fade-in">

          {/* Header */}
          <div className="bg-[#0084FF] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white flex items-center justify-center font-script text-2xl text-white">
                  D
                </div>

                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0084FF]" />
              </div>

              <div>
                <h4 className="font-heading text-xs font-semibold uppercase tracking-wider">
                  Crown Pearl Concierge
                </h4>

                <p className="text-[11px] text-white/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>Messenger Chat</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded transition-colors"
              aria-label="Close concierge chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAFAF8] space-y-3">

            {/* Welcome message */}
            <div className="bg-white p-3 rounded-lg border border-[#E5E7EB] text-xs text-[#111111] leading-relaxed shadow-sm">
              <p className="font-serif italic text-sm text-[#3B4A50] mb-1">
                "Welcome to Crown Pearl. Click below to message us directly on Facebook Messenger."
              </p>

              <span className="text-[10px] text-[#3B4A50]/70 font-heading uppercase tracking-widest">
                — Crown Pearl Concierge
              </span>
            </div>

            {/* Quick Questions */}
            <div className="text-[11px] font-heading uppercase tracking-wider text-[#3B4A50]/80">
              Quick Questions
            </div>

            <div className="space-y-1.5">
              {quickInquiries.map((question, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessenger(question)}
                  className="w-full text-left text-xs p-2 rounded bg-white hover:bg-[#0084FF]/10 border border-[#E5E7EB] hover:border-[#0084FF] text-[#3B4A50] transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Custom message */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white border border-[#C9D1D3] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0084FF]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessenger(customMsg);
                  }
                }}
              />

              <button
                type="button"
                onClick={() => handleSendMessenger(customMsg)}
                className="p-2 bg-[#0084FF] hover:bg-[#0073e6] text-white rounded transition-colors"
                aria-label="Open Messenger"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Crown Pearl on Facebook Messenger"
        className="flex items-center gap-2.5 bg-[#0084FF] hover:bg-[#0073e6] text-white px-4 py-3 rounded-full shadow-lg border border-white/20 transition-all duration-300 hover:scale-105 group"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
        </div>

        <span className="font-heading text-xs font-semibold uppercase tracking-widest hidden sm:inline">
          Chat on Messenger
        </span>
      </button>
    </div>
  );
};
