import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
  ChevronDown,
  Ruler,
  Gift,
  Share2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { MetalType } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    setIsSizeGuideModalOpen,
    addRecentlyViewed
  } = useShop();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product.metal);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.availableSizes ? product.availableSizes[0] : ''
  );
  const [selectedLength, setSelectedLength] = useState<string>(
    product.availableLengths ? product.availableLengths[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [engraving, setEngraving] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>('specs');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      document.title = `${product.name} – Crown Pearl Atelier`;
      addRecentlyViewed(product);
      setSelectedMetal(product.metal);
      if (product.availableSizes) setSelectedSize(product.availableSizes[0]);
      if (product.availableLengths) setSelectedLength(product.availableLengths[0]);
      setActiveImageIdx(0);
    }
  }, [id, product]);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedMetal,
      selectedSize || undefined,
      selectedLength || undefined,
      quantity,
      giftWrap,
      engraving
    );
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      selectedMetal,
      selectedSize || undefined,
      selectedLength || undefined,
      quantity,
      giftWrap,
      engraving
    );
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-10 font-sans pb-28 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs font-heading uppercase tracking-widest text-[#3B4A50]/70 flex items-center gap-2 mb-8">
          <Link to="/" className="hover:text-[#111]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#111]">Shop</Link>
          <span>/</span>
          <span className="text-[#111] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-square bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <button
                type="button"
                onClick={handleShare}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 text-[#3B4A50] hover:text-[#111] shadow-xs"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {isCopied && (
                <div className="absolute top-16 right-4 bg-[#3B4A50] text-white text-[11px] font-heading uppercase py-1 px-3 rounded shadow-md">
                  Link Copied!
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 ${
                      activeImageIdx === idx ? 'border-[#7FC8C0]' : 'border-[#E5E7EB]'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-sm space-y-6 lg:sticky lg:top-24">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-xs font-heading uppercase tracking-widest text-[#7FC8C0] font-semibold">
                  {product.pearlType} Saltwater Pearl · {product.pearlSize}
                </div>
                <div className="flex items-center gap-1 text-xs text-[#3B4A50]">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-semibold tabular-nums">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount})</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111] mt-1.5 leading-snug">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#3B4A50] mt-1 font-light">
                {product.tagline}
              </p>
            </div>

            <div className="flex items-baseline gap-3 pb-4 border-b border-[#E5E7EB]">
              <span className="font-heading font-bold text-3xl text-[#111111] tabular-nums">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through tabular-nums">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-heading uppercase tracking-wider text-[#3B4A50] font-semibold block">
                Precious Metal: <strong className="text-[#111]">{selectedMetal}</strong>
              </span>
              <div className="grid grid-cols-2 gap-2">
                {product.availableMetals.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMetal(m)}
                    className={`py-2 px-3 text-xs font-heading tracking-wide rounded-lg border text-left ${
                      selectedMetal === m
                        ? 'border-[#7FC8C0] bg-[#FAFAF8] text-[#111] font-semibold ring-1 ring-[#7FC8C0]'
                        : 'border-[#E5E7EB] text-[#3B4A50]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {product.availableLengths && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading uppercase tracking-wider text-[#3B4A50] font-semibold">
                    Strand Length: <strong className="text-[#111]">{selectedLength}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideModalOpen(true)}
                    className="text-[#7FC8C0] flex items-center gap-1 font-heading uppercase text-[11px] font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Length Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.availableLengths.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setSelectedLength(l)}
                      className={`py-2 px-2 text-xs font-heading tracking-wide rounded-lg border text-center ${
                        selectedLength === l
                          ? 'border-[#7FC8C0] bg-[#FAFAF8] text-[#111] font-semibold ring-1 ring-[#7FC8C0]'
                          : 'border-[#E5E7EB] text-[#3B4A50]'
                      }`}
                    >
                      {l.split(' ')[0]} {l.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100 space-y-3">
              <div>
                <label className="block text-[11px] font-heading uppercase tracking-wider text-[#3B4A50] mb-1 font-semibold">
                  Clasp Monogram / Engraving (Optional)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="e.g. E.V. 2026"
                  className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 accent-[#3B4A50] rounded"
                />
                <span className="text-xs text-[#3B4A50] flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#7FC8C0]" />
                  <span>Complimentary signature teal gift box & silk presentation pouch</span>
                </span>
              </label>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#C9D1D3] rounded-lg bg-[#FAFAF8]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-xs text-[#3B4A50]"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-heading font-semibold text-[#111] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-xs text-[#3B4A50]"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#7FC8C0]" />
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className="p-3.5 border border-[#C9D1D3] rounded-lg bg-white text-[#3B4A50]"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#7FC8C0] text-[#7FC8C0]' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3 px-6 bg-[#7FC8C0] hover:bg-[#68b5ad] text-[#111111] font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm"
              >
                Instant Insured Purchase
              </button>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-[#3B4A50]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <span>Individually Certified with Delma Estd. 2003 Provenance</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <span>Discreet insured courier dispatch (Signature Required)</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <span>30-Day in-home natural daylight examination guarantee</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 mb-20 shadow-xs space-y-4">
          <h3 className="font-serif text-2xl font-semibold text-[#111] pb-3 border-b border-gray-100">
            Atelier Specifications & Provenance
          </h3>

          <div className="border-b border-gray-100 pb-3">
            <button
              type="button"
              onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
              className="w-full flex items-center justify-between text-left py-2 font-heading font-semibold text-xs uppercase tracking-wider text-[#111]"
            >
              <span>GIA Pearl Grading Classification</span>
              <ChevronDown className={`w-4 h-4 transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'specs' && (
              <div className="pt-3 pb-2 text-xs text-[#3B4A50] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-[#FAFAF8] rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-heading">Luster Grade</div>
                  <div className="font-semibold text-[#111]">{product.specs.luster}</div>
                </div>
                <div className="p-3 bg-[#FAFAF8] rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-heading">Surface Quality</div>
                  <div className="font-semibold text-[#111]">{product.specs.surface}</div>
                </div>
                <div className="p-3 bg-[#FAFAF8] rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-heading">Symmetry / Shape</div>
                  <div className="font-semibold text-[#111]">{product.specs.shape}</div>
                </div>
                <div className="p-3 bg-[#FAFAF8] rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-heading">Nacre Thickness</div>
                  <div className="font-semibold text-[#111]">{product.specs.nacreThickness}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-semibold text-[#111]">
            You May Also Admire
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
