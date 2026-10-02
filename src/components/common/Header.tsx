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

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E5E7EB] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Logo size="md" />

        {/* Desktop Navigation */}
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
                  <Link to={link.path} className="flex items-center gap-1 hover:text-[#111] transition-colors py-2">
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                  </Link>

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
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                to={link.path}
                className="relative py-2 transition-colors hover:text-[#111]"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
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

          <button
            type="button"
            onClick={() => setIsConsultationModalOpen(true)}
            className="hidden md:inline-flex items-center text-xs font-heading font-semibold uppercase tracking-widest px-3.5 py-2 border border-[#3B4A50] text-[#3B4A50] hover:bg-[#3B4A50] hover:text-white rounded transition-colors"
          >
            Book Atelier
          </button>

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
    </header>
  );
};
