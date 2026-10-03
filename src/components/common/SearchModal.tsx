import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.pearlType.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  const handleSelectProduct = (id: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#111111]/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[#FAFAF8] rounded-xl shadow-2xl border border-[#C9D1D3]/50 overflow-hidden">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-[#E5E7EB]">
          <Search className="w-5 h-5 text-[#3B4A50]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Akoya necklaces, South Sea rings, bridal suites..."
            className="w-full bg-transparent text-base focus:outline-none font-sans"
            autoFocus
          />
          <button type="button" onClick={() => setIsSearchOpen(false)} className="text-xs uppercase font-heading text-[#3B4A50]">
            Esc
          </button>
        </form>

        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.id)}
                  className="flex items-center gap-4 p-2.5 rounded-lg hover:bg-white border border-transparent hover:border-[#C9D1D3]/50 cursor-pointer"
                >
                  <img src={product.images[0]} alt={product.name} className="w-14 h-14 object-cover rounded bg-[#F8F9FA] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-[#7FC8C0] font-heading uppercase">{product.pearlType} · {product.category}</div>
                    <div className="text-sm font-serif font-semibold text-[#111] truncate">{product.name}</div>
                    <div className="text-xs text-[#3B4A50] tabular-nums">${product.price.toLocaleString()}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C9D1D3] shrink-0" />
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="py-6 text-center text-xs text-[#3B4A50]">No creations matched "{query}"</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
