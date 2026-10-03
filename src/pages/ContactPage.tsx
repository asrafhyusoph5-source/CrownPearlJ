import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact & Visit Atelier – Crown Pearl, Estd. 2003';
  }, []);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="font-serif text-4xl font-semibold text-[#111]">Visit Us or Inquire Directly</h1>
          <p className="text-sm text-[#3B4A50]">We welcome private clients by appointment to our Madison Avenue atelier.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB] space-y-4">
            <h2 className="font-serif text-2xl font-semibold">Madison Avenue Atelier</h2>
            <div className="space-y-3 text-xs text-[#3B4A50]">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#7FC8C0]" /> 488 Madison Avenue, Atelier Suite 702, NY 10022</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#7FC8C0]" /> +1 (800) 276-9675</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#7FC8C0]" /> concierge@crownpearl.com</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#7FC8C0]" /> Mon–Sat: 10:00 AM – 7:00 PM EST</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E5E7EB]">
            {!sent ? (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <input required placeholder="Your Name" className="w-full p-2 border rounded text-xs bg-[#FAFAF8]" />
                <input required type="email" placeholder="Email" className="w-full p-2 border rounded text-xs bg-[#FAFAF8]" />
                <textarea required rows={4} placeholder="Your Message" className="w-full p-2 border rounded text-xs bg-[#FAFAF8]" />
                <button type="submit" className="w-full py-3 bg-[#3B4A50] text-white text-xs uppercase font-heading rounded">
                  Send Message
                </button>
              </form>
            ) : (
              <div className="p-8 text-center text-sm font-serif">Thank you! Your message has been sent to Delma.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
