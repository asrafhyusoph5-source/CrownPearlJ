import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { isInWishlist, toggleWishlist, addToCart, setQuickViewProduct } = useShop();
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div className="group relative flex flex-col bg-white border border-[#E5E7EB] hover:border-[#7FC8C0]/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/3] sm:aspect-square bg-[#FAFAF8] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#FAFAF8]/95 backdrop-blur-sm border border-[#C9D1D3]/70 px-2.5 py-1 text-[10px] font-heading font-semibold uppercase tracking-widest text-[#3B4A50] rounded">
            {product.badge}
          </div>
        )}

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? `Remove from wishlist` : `Add to wishlist`}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#3B4A50] hover:text-[#111] shadow-sm transition-all z-10"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#7FC8C0] text-[#7FC8C0]' : 'text-[#3B4A50]'}`} />
        </button>

        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={handleQuickView}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#3B4A50] hover:text-[#111] text-[11px] font-heading uppercase tracking-wider font-semibold rounded shadow-md border border-[#C9D1D3]/50 flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="py-2 px-3 bg-[#3B4A50] hover:bg-[#111] text-white text-[11px] font-heading uppercase tracking-wider font-semibold rounded shadow-md flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#7FC8C0]" />
            <span>Add</span>
          </button>
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-heading uppercase tracking-widest text-[#7FC8C0] font-semibold mb-1">
            <span>{product.pearlType} Pearl</span>
            <span className="text-gray-300">·</span>
            <span className="text-[#3B4A50]/80">{product.specs.shape}</span>
          </div>

          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-serif text-base font-semibold text-[#111] line-clamp-1">{product.name}</h3>
          </Link>
          <p className="text-xs text-[#3B4A50]/80 line-clamp-1 mt-0.5">{product.tagline}</p>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#3B4A50]">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="font-medium tabular-nums">{product.rating}</span>
            <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
          </div>

          <span className="font-heading font-bold text-sm md:text-base text-[#111] tabular-nums">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
