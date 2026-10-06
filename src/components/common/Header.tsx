import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { useShop } from '../../context/ShopContext';

export const Header: React.FC = () => {
  const { cartCount, wishlist, setIsCartDrawerOpen, setIsSearchOpen, setIsConsultationModalOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Shop All', path: '/shop' },
    {
      label: 'Collections',
      path: '/shop',
      isDropdown: true,
      subItems: [
        { label: 'Pearl Necklaces & Strands', path: '/shop?category=necklaces' },
        { label: 'Earrings & Drops', path: '/shop?category=earrings' },
        { label: 'Solitaire & Toi et Moi Rings', path: '/shop?category=rings' },
        { label: 'Bracelets & Bangles', path: '/shop?category=bracelets' },
        { label: 'Bridal High Jewelry', path: '/shop?category=bridal' },
        { label: 'Men\'s Cufflinks & Accents', path: '/shop?category=mens' },
        { label: 'Gifts & Care Sets', path: '/shop?category=gifts' },
      ],
    },
    { label: 'Bridal', path: '/shop?category=bridal' },
    
    { label: 'Our Story', path: '/our-story' },
    { label: 'Pearl Guide', path: '/pearl-guide' },
    { label: 'Reviews', path: '/reviews' },
  ];

  const isActive = (path: string) => {
    if (path === '/shop' && location.pathname === '/shop' && !location.search) return true;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E5E7EB] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark / Logo */}
        <div className="flex items-center">
          <Logo size="md" />
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-heading font-medium tracking-widest uppercase text-[#3B4A50]">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative group py-6"
                  onMouseEnter={() => setCollectionsDropdownOpen(true)}
                  onMouseLeave={() => setCollectionsDropdownOpen(false)}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-1 hover:text-[#111] transition-colors py-2"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                  </Link>

                  {/* Dropdown Menu */}
                  {collectionsDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white border border-[#C9D1D3]/50 rounded-lg shadow-xl py-3 px-2 z-50 animate-fade-in">
                      <div className="text-[10px] tracking-[0.2em] font-heading font-semibold text-[#7FC8C0] px-3 py-1.5 uppercase border-b border-gray-100">
                        Curated Categories
                      </div>
                      {link.subItems?.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          onClick={() => setCollectionsDropdownOpen(false)}
                          className="block px-3 py-2 text-xs font-heading tracking-wider uppercase text-[#3B4A50] hover:text-[#111] hover:bg-[#FAFAF8] rounded transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                      <div className="mt-2 pt-2 border-t border-gray-100 px-3">
                        <Link
                          to="/pearl-guide"
                          onClick={() => setCollectionsDropdownOpen(false)}
                          className="flex items-center gap-1.5 text-[11px] font-heading text-[#7FC8C0] hover:text-[#3B4A50] uppercase tracking-wide"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>The 5 Pearl Grading Factors</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              
            );
          })}
        </nav>

        {/* Zone 3: Actions (Search, Wishlist, Cart Drawer, Consultation CTA) */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search dialog"
            className="p-2 text-[#3B4A50] hover:text-[#111] rounded-full hover:bg-black/5 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            to="/shop?filter=wishlist"
            aria-label="View wishlist"
            className="relative p-2 text-[#3B4A50] hover:text-[#111] rounded-full hover:bg-black/5 transition-colors"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#7FC8C0] text-[#111] font-heading font-bold text-[10px] rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label={`View shopping bag with ${cartCount} items`}
            className="relative p-2 text-[#3B4A50] hover:text-[#111] rounded-full hover:bg-black/5 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#111111] text-white font-heading font-bold text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#3B4A50] hover:text-[#111] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAFAF8] border-b border-[#E5E7EB] px-6 py-6 space-y-4 animate-fade-in shadow-xl">
          <nav className="flex flex-col space-y-3 font-heading uppercase text-sm tracking-wider text-[#3B4A50]">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-gray-100 hover:text-[#111]"
            >
              Shop All Jewelry
            </Link>
            <div className="pt-1 pb-1">
              <span className="text-[11px] font-semibold text-[#7FC8C0] tracking-widest">
                Collections
              </span>
              <div className="pl-3 mt-2 space-y-2 text-xs">
                <Link
                  to="/shop?category=necklaces"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#111]"
                >
                  Pearl Necklaces
                </Link>
                <Link
                  to="/shop?category=earrings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#111]"
                >
                  Earrings & Drops
                </Link>
                <Link
                  to="/shop?category=rings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#111]"
                >
                  Solitaire Rings
                </Link>
                <Link
                  to="/shop?category=bracelets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#111]"
                >
                  Bracelets
                </Link>
                <Link
                  to="/shop?category=bridal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#111]"
                >
                  Bridal Suites
                </Link>
                <Link
                  to="/shop?category=mens"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#111]"
                >
                  Men's Pearl Accents
                </Link>
              </div>
            </div>
            <Link
              to="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-gray-100 hover:text-[#111]"
            >
              Our Story (Since 2003)
            </Link>
            <Link
              to="/live"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-gray-100 text-red-600 font-semibold flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span>🔴 Facebook Live Stream</span>
            </Link>
            <Link
              to="/pearl-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-gray-100 hover:text-[#111]"
            >
              Pearl Education & Care
            </Link>
            <Link
              to="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-gray-100 hover:text-[#111]"
            >
              Client Reviews
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 border-b border-gray-100 hover:text-[#111]"
            >
              Visit Atelier & Contact
            </Link>
          </nav>

          <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">
            
            <a
              href="https://m.me/delmapearlonline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs text-[#0084FF] font-heading uppercase tracking-wider font-semibold hover:underline"
            >
              Chat on Messenger (@delmapearlonline)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
