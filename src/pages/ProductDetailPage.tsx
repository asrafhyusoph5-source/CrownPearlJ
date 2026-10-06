import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
  ChevronDown,
  Ruler,
  CheckCircle2,
  Gift,
  Share2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, MetalType } from '../types';
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
    setIsConsultationModalOpen,
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

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string>('specs');

  // Interactive review form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

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

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewAuthor.trim() && reviewText.trim()) {
      setReviewSubmitted(true);
    }
  };

  // Complete the Look and Recommendations
  const completeTheLook = PRODUCTS.find((p) => p.category === 'earrings' && p.id !== product.id) || PRODUCTS[1];
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.pearlType === product.pearlType)).slice(0, 4);

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-10 font-sans pb-28 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-heading uppercase tracking-widest text-[#3B4A50]/70 flex items-center gap-2 mb-8">
          <Link to="/" className="hover:text-[#111]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#111]">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-[#111] capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#111] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Contiguous Purchase Module & Gallery: Section 2.A PDP Contract */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Photo */}
            <div className="relative aspect-[4/3] sm:aspect-square bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#C9D1D3] px-3 py-1.5 text-xs font-heading font-semibold uppercase tracking-widest text-[#3B4A50] rounded">
                  {product.badge}
                </div>
              )}

              <button
                type="button"
                onClick={handleShare}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-[#3B4A50] hover:text-[#111] shadow-xs transition-colors"
                title="Copy share link"
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {isCopied && (
                <div className="absolute top-16 right-4 bg-[#3B4A50] text-white text-[11px] font-heading uppercase tracking-wider py-1 px-3 rounded shadow-md animate-fade-in">
                  Link Copied!
                </div>
              )}
            </div>

            {/* Thumbnails Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 ${
                      activeImageIdx === idx
                        ? 'border-[#7FC8C0] ring-2 ring-[#7FC8C0]/30'
                        : 'border-[#E5E7EB] hover:border-[#C9D1D3]'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail view ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Atelier Craftsmanship Note */}
            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FAFAF8] border border-[#C9D1D3] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[#7FC8C0]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif text-sm font-semibold text-[#111]">
                  Delma Master Jeweler Hand-Knotted
                </h4>
                <p className="text-xs text-[#3B4A50]">
                  Knot-by-knot silk thread tension calibration ensures individual pearl security and sublime contouring against skin.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-sm space-y-6 lg:sticky lg:top-24">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-[#7FC8C0] font-semibold">
                  <span>{product.pearlType} Saltwater Pearl</span>
                  <span>·</span>
                  <span className="text-[#3B4A50]">{product.pearlSize}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#3B4A50]">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-semibold tabular-nums">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#111111] mt-1.5 leading-snug">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#3B4A50] mt-1 font-light">
                {product.tagline}
              </p>
            </div>

            {/* Pricing block */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-[#E5E7EB]">
              <span className="font-heading font-bold text-3xl text-[#111111] tabular-nums">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through tabular-nums">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                Includes Insured Express Delivery
              </span>
            </div>

            {/* Variant 1: Precious Metal */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-heading uppercase tracking-wider text-[#3B4A50] font-semibold">
                  Precious Metal: <strong className="text-[#111]">{selectedMetal}</strong>
                </span>
                <span className="text-[11px] text-gray-400">100% Recycled Fine Gold</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {product.availableMetals.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMetal(m)}
                    className={`py-2 px-3 text-xs font-heading tracking-wide rounded-lg border text-left transition-all ${
                      selectedMetal === m
                        ? 'border-[#7FC8C0] bg-[#FAFAF8] text-[#111] font-semibold ring-1 ring-[#7FC8C0]'
                        : 'border-[#E5E7EB] hover:border-[#C9D1D3] text-[#3B4A50]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant 2: Necklace Length if applicable */}
            {product.availableLengths && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading uppercase tracking-wider text-[#3B4A50] font-semibold">
                    Strand Length: <strong className="text-[#111]">{selectedLength}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideModalOpen(true)}
                    className="text-[#7FC8C0] hover:text-[#3B4A50] flex items-center gap-1 font-heading uppercase text-[11px] font-semibold"
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
                      className={`py-2 px-2 text-xs font-heading tracking-wide rounded-lg border text-center transition-all ${
                        selectedLength === l
                          ? 'border-[#7FC8C0] bg-[#FAFAF8] text-[#111] font-semibold ring-1 ring-[#7FC8C0]'
                          : 'border-[#E5E7EB] hover:border-[#C9D1D3] text-[#3B4A50]'
                      }`}
                    >
                      {l.split(' ')[0]} {l.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant 3: Ring Size if applicable */}
            {product.availableSizes && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading uppercase tracking-wider text-[#3B4A50] font-semibold">
                    Ring Size: <strong className="text-[#111]">Size {selectedSize}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideModalOpen(true)}
                    className="text-[#7FC8C0] hover:text-[#3B4A50] flex items-center gap-1 font-heading uppercase text-[11px] font-semibold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Ring Sizing Chart</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  {product.availableSizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`w-10 h-10 rounded-lg border text-xs font-heading font-semibold transition-all flex items-center justify-center ${
                        selectedSize === s
                          ? 'border-[#7FC8C0] bg-[#FAFAF8] text-[#111] ring-1 ring-[#7FC8C0]'
                          : 'border-[#E5E7EB] hover:border-[#C9D1D3] text-[#3B4A50]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Monogram & Gift Wrap */}
            <div className="pt-2 border-t border-gray-100 space-y-3">
              <div>
                <label className="block text-[11px] font-heading uppercase tracking-wider text-[#3B4A50] mb-1 font-semibold">
                  Complimentary Clasp Monogram / Engraving (Optional)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="e.g. E.V. 2026 or Initials"
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

            {/* Low Stock Urgency Indicator */}
            {product.stockCount <= 5 && (
              <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Limited Atelier Release: Only {product.stockCount} strands remaining in this harvest lot.
                </span>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#C9D1D3] rounded-lg bg-[#FAFAF8]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-xs text-[#3B4A50] hover:text-[#111]"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-heading font-semibold text-[#111] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-xs text-[#3B4A50] hover:text-[#111]"
                    aria-label="Increase quantity"
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
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="p-3.5 border border-[#C9D1D3] hover:border-[#7FC8C0] rounded-lg bg-white text-[#3B4A50] hover:text-[#111] transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-[#7FC8C0] text-[#7FC8C0]' : ''
                    }`}
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3 px-6 bg-[#7FC8C0] hover:bg-[#68b5ad] text-[#111111] font-heading uppercase text-xs tracking-widest font-semibold rounded-lg shadow-sm transition-all text-center"
              >
                Instant Insured Purchase
              </button>
            </div>

            {/* Trust Bulletins */}
            <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-[#3B4A50]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <span>Individually Certified with Delma Estd. 2003 Provenance</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <span>Discreet, fully insured courier dispatch (Signature Required)</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#7FC8C0] shrink-0" />
                <span>30-Day in-home natural daylight examination guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Accordions & GIA Pearl Specs */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 mb-20 shadow-xs space-y-4">
          <h3 className="font-serif text-2xl font-semibold text-[#111] pb-3 border-b border-gray-100">
            Atelier Specifications & Provenance
          </h3>

          {/* Accordion 1: GIA Pearl Specifications */}
          <div className="border-b border-gray-100 pb-3">
            <button
              type="button"
              onClick={() => setOpenAccordion(openAccordion === 'specs' ? '' : 'specs')}
              className="w-full flex items-center justify-between text-left py-2 font-heading font-semibold text-xs uppercase tracking-wider text-[#111]"
            >
              <span>GIA Pearl Grading Classification</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'specs' && (
              <div className="pt-3 pb-2 text-xs text-[#3B4A50] grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                <div className="p-3 bg-[#FAFAF8] rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-heading">Luster Grade</div>
                  <div className="font-semibold text-[#111] mt-0.5">{product.specs.luster}</div>
                </div>
                <div className="p-3 bg-[#FAFAF8] rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-heading">Surface Quality</div>
                  <div className="font-semibold text-[#111] mt-0.5">{product.specs.surface}</div>
                </div>
                <div className="p-3 bg-[#FAFAF8] rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-heading">Symmetry / Shape</div>
                  <div className="font-semibold text-[#111] mt-0.5">{product.specs.shape}</div>
                </div>
                <div className="p-3 bg-[#FAFAF8] rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase font-heading">Nacre Thickness</div>
                  <div className="font-semibold text-[#111] mt-0.5">{product.specs.nacreThickness}</div>
                </div>
                <div className="p-3 bg-[#FAFAF8] rounded-lg sm:col-span-2">
                  <div className="text-[10px] text-gray-400 uppercase font-heading">Harvest Origin & Aquaculture</div>
                  <div className="font-semibold text-[#111] mt-0.5">{product.specs.origin}</div>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Materials & Craft */}
          <div className="border-b border-gray-100 pb-3">
            <button
              type="button"
              onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
              className="w-full flex items-center justify-between text-left py-2 font-heading font-semibold text-xs uppercase tracking-wider text-[#111]"
            >
              <span>Craftsmanship & Story</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'details' && (
              <div className="pt-3 pb-2 text-xs text-[#3B4A50] space-y-3 animate-fade-in leading-relaxed">
                <p>{product.description}</p>
                <p className="italic font-serif text-sm text-[#111]">"{product.story}"</p>
                <ul className="list-disc pl-5 space-y-1">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Accordion 3: Lifetime Care & Re-stringing */}
          <div className="pb-1">
            <button
              type="button"
              onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
              className="w-full flex items-center justify-between text-left py-2 font-heading font-semibold text-xs uppercase tracking-wider text-[#111]"
            >
              <span>Care & Complimentary Restringing Policy</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'care' && (
              <div className="pt-3 pb-2 text-xs text-[#3B4A50] space-y-2 animate-fade-in leading-relaxed">
                <p>
                  As an organic gemstone formed by living mollusks, pearl nacre breathes and requires gentle guardianship:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  {product.care.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
                <div className="pt-2 text-[11px] text-[#7FC8C0] font-heading uppercase font-semibold">
                  Every Crown Pearl piece is entitled to complimentary ultrasonic clasp check & biennial restringing at our Palawan workshop in Puerto Princesa.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Complete the Look Upsell */}
        {completeTheLook && (
          <div className="max-w-4xl mx-auto bg-[#FAFAF8] border border-[#7FC8C0]/50 rounded-2xl p-6 sm:p-8 mb-20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={completeTheLook.images[0]}
                  alt={completeTheLook.name}
                  className="w-20 h-20 object-cover rounded-xl bg-white border border-gray-100 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] text-[#7FC8C0] font-heading uppercase font-semibold">
                    Complete the Look · Harmonious Pairing
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-[#111]">
                    {completeTheLook.name}
                  </h4>
                  <div className="text-xs font-heading font-bold text-[#111] tabular-nums mt-0.5">
                    ${completeTheLook.price.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to={`/product/${completeTheLook.id}`}
                  className="px-4 py-2 bg-white border border-[#C9D1D3] text-xs font-heading uppercase tracking-wider rounded text-[#3B4A50] hover:text-[#111]"
                >
                  View Details
                </Link>
                <button
                  type="button"
                  onClick={() => addToCart(completeTheLook)}
                  className="flex-1 sm:flex-none px-6 py-2 bg-[#3B4A50] hover:bg-[#111] text-white text-xs font-heading uppercase tracking-wider font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#7FC8C0]" />
                  <span>Add Pairing to Bag</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customer Reviews & Interactive Review Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 mb-20 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-[#111]">
                Patron Impressions & Verified Reviews
              </h3>
              <p className="text-xs text-[#3B4A50] mt-0.5">
                Authentic reflections from clients wearing this creation.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-sm text-[#111] tabular-nums">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviewCount} total reviews)</span>
            </div>
          </div>

          {/* Interactive Review Submission Form */}
          <div className="bg-[#FAFAF8] p-5 rounded-xl border border-[#E5E7EB]">
            {!reviewSubmitted ? (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <h4 className="font-heading uppercase text-xs tracking-wider text-[#111] font-semibold">
                  Share Your Experience With This Creation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="Your Name (e.g. Katherine M.)"
                    className="px-3 py-2 bg-white border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                  />
                  <div className="flex items-center gap-2 bg-white border border-[#C9D1D3] rounded px-3 py-1.5">
                    <span className="text-xs text-[#3B4A50]">Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              star <= reviewRating
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <textarea
                  required
                  rows={2}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Describe the luster, feel on the skin, and craftsmanship..."
                  className="w-full px-3 py-2 bg-white border border-[#C9D1D3] rounded text-xs focus:outline-none focus:border-[#7FC8C0]"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3B4A50] hover:bg-[#111] text-white font-heading uppercase text-xs tracking-wider font-semibold rounded transition-colors"
                >
                  Submit Verified Patron Review
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-1 animate-fade-in">
                <CheckCircle2 className="w-6 h-6 text-[#7FC8C0] mx-auto" />
                <h4 className="font-serif text-base text-[#111] font-semibold">
                  Thank You, {reviewAuthor}
                </h4>
                <p className="text-xs text-[#3B4A50]">
                  Your review has been submitted to the Delma Atelier archive for authentication.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div>
              <div className="text-xs font-heading font-semibold uppercase tracking-widest text-[#7FC8C0]">
                Curated Suggestions
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#111]">
                You May Also Admire
              </h3>
            </div>
            <Link
              to="/shop"
              className="text-xs font-heading uppercase tracking-widest text-[#3B4A50] hover:text-[#7FC8C0] font-semibold"
            >
              Explore Full Atelier →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add-To-Cart Bar (Section 7 conversion requirement) */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] p-3 z-30 shadow-lg flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-serif font-semibold text-[#111] truncate max-w-[150px]">
            {product.name}
          </div>
          <div className="font-heading font-bold text-sm text-[#111] tabular-nums">
            ${product.price.toLocaleString()}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 py-2.5 px-4 bg-[#3B4A50] text-white font-heading uppercase text-xs tracking-wider font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#7FC8C0]" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
