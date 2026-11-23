
import React, { useState } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles
} from 'lucide-react';

const FB_PAGE_USERNAME = 'delmapearlonline';

export const FBMessegerButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickInquiries = [
    'Hello Crown, I would like to inquire about customized necklace lengths.',
    'Could you help me choose between Akoya and South Sea pearl luster for an anniversary gift?',
    'I would like the best South Sea Pearl for my bridal.'
  ];

  const handleSendMessenger = (textToSend: string) => {
    const message =
      textToSend.trim() ||
      'Hello Crown Pearl, I would appreciate your assistance.';

    const messengerUrl =
      `https://m.me/${FB_PAGE_USERNAME}`;

    // Open the Page conversation.
    // The customer can send the message inside Messenger.
    window.open(
      messengerUrl,
      '_blank',
      'noopener,noreferrer'
    );

    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">

      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-[#C9D1D3]/70 overflow-hidden">

          <div className="bg-[#0084FF] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-script text-2xl">
                C
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider">
                  Crown Atelier Concierge
                </h4>
                <p className="text-[11px] text-white/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Messenger Chat
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-[#FAFAF8] space-y-3">

            <div className="bg-white p-3 rounded-lg border text-xs">
              <p className="font-serif italic text-sm text-[#3B4A50]">
                Welcome to Crown Pearl. How may we assist you today?
              </p>
            </div>

            <p className="text-[11px] uppercase tracking-wider">
              Quick Questions
            </p>

            {quickInquiries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessenger(q)}
                className="w-full text-left text-xs p-2 rounded bg-white border hover:border-[#0084FF] text-[#3B4A50]"
              >
                {q}
              </button>
            ))}

            <div className="flex gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your inquiry..."
                className="flex-1 bg-white border rounded px-3 py-2 text-xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessenger(customMsg);
                  }
                }}
              />

              <button
                onClick={() => handleSendMessenger(customMsg)}
                className="p-2 bg-[#0084FF] text-white rounded"
                aria-label="Open Messenger"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-[#0084FF] text-white px-4 py-3 rounded-full shadow-lg"
        aria-label="Chat on Messenger"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-semibold uppercase tracking-widest">
          Chat on Messenger
        </span>
      </button>

    </div>
  );
};
