import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Sparkles, MessageCircle, Instagram, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A2327] text-[#FAFAF8] border-t border-[#3B4A50]/50 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" isLightMode={true} />
            <p className="text-sm text-[#C9D1D3] leading-relaxed max-w-sm mt-3">
              Founded in 2003 by Delma in Palawan, Crown Pearl is a family jewelry house specializing in certified natural South Sea pearls and fine jewelry. Built on dedication, perseverance, and a mother's dream.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#7FC8C0] font-heading uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Over Two Decades of Family Trust · Palawan 2003–2026</span>
            </div>

            {/* Social Channels */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com/delmapearlonline"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-[#0084FF] text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider"
                title="Follow Crown Pearl on Facebook"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href="https://www.instagram.com/crown.pearljewelry?stkn=MWNzZ3pyOWs1ZjF2Mw=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-[#E1306C] text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider"
                title="Follow Crown Pearl on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href="https://m.me/delmapearlonline"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 hover:bg-[#0084FF] text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider"
                title="Chat on Messenger"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Messenger</span>
              </a>
            </div>
          </div>

          {/* Client Atelier & Care Column */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.25em] text-[#7FC8C0]">
              Atelier & Community
            </h4>
            <ul className="space-y-2 text-xs font-heading tracking-wider uppercase text-[#C9D1D3]">
              <li>
                <Link to="/our-story" className="hover:text-white transition-colors">
                  Our Story (Delma, Estd. 2003)
                </Link>
              </li>
              <li>
                <Link to="/live" className="text-red-400 hover:text-white transition-colors font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>Facebook Live Stream</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/delmapearlonline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-[#7FC8C0] flex items-center gap-1"
                >
                  <span>Facebook: @delmapearlonline</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/crown.pearljewelry?stkn=MWNzZ3pyOWs1ZjF2Mw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-pink-300 flex items-center gap-1"
                >
                  <span>Instagram: @crown.pearljewelry</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/pearl-guide" className="hover:text-white transition-colors">
                  Pearl Guide & 5 Quality Factors
                </Link>
              </li>
              <li>
                <Link to="/pearl-guide#care" className="hover:text-white transition-colors">
                  Care & Restringing Service
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-white transition-colors">
                  Verified Client Reviews
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-white transition-colors">
                  Shipping & 30-Day Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Location & Official Contact */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.25em] text-[#7FC8C0]">
              Store Location & Contact
            </h4>
            <div className="space-y-3 text-xs text-[#C9D1D3]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7FC8C0] shrink-0 mt-0.5" />
                <div>
                  <a
                    href="https://maps.app.goo.gl/EQPD2tW2Su5iQhFK8?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline block leading-relaxed"
                  >
                    National Highway, Brgy. San Manuel, Puerto Princesa, Philippines, 5300 ↗
                  </a>
                  <span className="text-[10px] text-[#7FC8C0] font-heading uppercase tracking-wider block mt-0.5">
                    Click to view Google Maps Location
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase">WhatsApp & Call</span>
                  <a href="https://wa.me/639999910270" target="_blank" rel="noopener noreferrer" className="hover:text-white font-mono">
                    +63 999 991 0270
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase">Official Email</span>
                  <a href="mailto:delmapearl17@gmail.com" className="hover:text-white font-mono">
                    delmapearl17@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#7FC8C0] shrink-0 mt-0.5" />
                <div>
                  <div>Monday–Sunday: 9:00 AM – 9:00 PM (PHT)</div>
                  <div className="text-[11px] text-emerald-400">Live Selling: Wed & Sat 7:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#C9D1D3]/80">
          <div className="flex items-center gap-2">
            <span>© 2003–2026 Crown Pearl & Jewelry Shop. Puerto Princesa, Palawan. All rights reserved.</span>
          </div>

          {/* Secure Payment & Guarantees */}
          <div className="flex items-center gap-4 text-white/70">
            <span className="flex items-center gap-1 text-[11px] text-[#7FC8C0]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Genuine Palawan & South Sea Pearls</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
