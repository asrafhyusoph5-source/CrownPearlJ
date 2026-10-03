import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Sparkles } from 'lucide-react';
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
              Founded in 2003 by Delma, Crown Pearl is an artisanal fine jewelry house specializing in certified natural saltwater Akoya, South Sea, and Tahitian pearls. Handcrafted with generational silk-knotting discipline in our New York atelier.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#7FC8C0] font-heading uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Over Two Decades of Connoisseur Trust · 2003–2026</span>
            </div>
          </div>

          {/* Collections Column */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.25em] text-[#7FC8C0]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs font-heading tracking-wider uppercase text-[#C9D1D3]">
              <li><Link to="/shop?category=necklaces" className="hover:text-white transition-colors">Pearl Necklaces & Strands</Link></li>
              <li><Link to="/shop?category=earrings" className="hover:text-white transition-colors">Earrings & Teardrops</Link></li>
              <li><Link to="/shop?category=rings" className="hover:text-white transition-colors">Solitaire & Toi et Moi Rings</Link></li>
              <li><Link to="/shop?category=bracelets" className="hover:text-white transition-colors">Bracelets & Cuffs</Link></li>
              <li><Link to="/shop?category=bridal" className="hover:text-white transition-colors">Bridal High Jewelry</Link></li>
              <li><Link to="/shop?category=mens" className="hover:text-white transition-colors">Men’s Cufflinks & Accents</Link></li>
              <li><Link to="/shop?category=gifts" className="hover:text-white transition-colors">Heirloom Care & Gifts</Link></li>
            </ul>
          </div>

          {/* Client Atelier & Care Column */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.25em] text-[#7FC8C0]">
              Atelier & Education
            </h4>
            <ul className="space-y-2 text-xs font-heading tracking-wider uppercase text-[#C9D1D3]">
              <li><Link to="/our-story" className="hover:text-white transition-colors">Our Story (Delma, Estd. 2003)</Link></li>
              <li><Link to="/pearl-guide" className="hover:text-white transition-colors">Pearl Guide & 5 Quality Factors</Link></li>
              <li><Link to="/pearl-guide#care" className="hover:text-white transition-colors">Care & Restringing Service</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Verified Client Reviews</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-white transition-colors">Shipping & 30-Day Returns</Link></li>
              <li><Link to="/legal" className="hover:text-white transition-colors">Certificate & Lifetime Warranty</Link></li>
            </ul>
          </div>

          {/* Atelier Contact & Boutique Hours */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.25em] text-[#7FC8C0]">
              Visit The Atelier
            </h4>
            <div className="space-y-2.5 text-xs text-[#C9D1D3]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#7FC8C0] shrink-0 mt-0.5" />
                <span>488 Madison Avenue, Atelier Suite 702, New York, NY 10022</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <a href="tel:+18002769675" className="hover:text-white">+1 (800) 276-9675</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <a href="mailto:concierge@crownpearl.com" className="hover:text-white">concierge@crownpearl.com</a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#7FC8C0] shrink-0 mt-0.5" />
                <div>
                  <div>Mon–Sat: 10:00 AM – 7:00 PM EST</div>
                  <div>Sunday: By Private Atelier Appointment</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#C9D1D3]/80">
          <div>© 2003–2026 Crown Pearl. Jewelry Shop by Delma. All rights reserved.</div>
          <div className="flex items-center gap-4 text-white/70">
            <span className="flex items-center gap-1 text-[11px] text-[#7FC8C0]">
              <ShieldCheck className="w-4 h-4" />
              <span>GIA Standards & 256-Bit SSL</span>
            </span>
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider">
              <span className="px-2 py-0.5 bg-white/10 rounded">VISA</span>
              <span className="px-2 py-0.5 bg-white/10 rounded">MC</span>
              <span className="px-2 py-0.5 bg-white/10 rounded">AMEX</span>
              <span className="px-2 py-0.5 bg-white/10 rounded">APPLE PAY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
