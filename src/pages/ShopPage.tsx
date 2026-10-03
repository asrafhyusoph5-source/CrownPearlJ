import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List, X, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCategory, PearlType, MetalType } from '../types';
import { ProductCard } from '../components/product/ProductCard';
import { useShop } from '../context/ShopContext';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist, isInWishlist } = useShop();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const pearlTypeParam = searchParams.get('pearlType') as PearlType | null;
  const searchParam = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedPearlType, setSelectedPearlType] = useState<string>(pearlTypeParam || 'all');
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('popular');

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (pearlTypeParam) setSelectedPearlType(pearlTypeParam);
  }, [categoryParam, pearlTypeParam]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Shop All Fine Pearl Jewelry – Crown Pearl Atelier';
  }, []);

  const categories = [
    { label: 'All Collections', value: 'all' },
    { label: 'Pearl Necklaces', value: 'necklaces' },
    { label: 'Earrings & Drops', value: 'earrings' },
    { label: 'Solitaire Rings', value: 'rings' },
    { label: 'Bracelets & Cuffs', value: 'bracelets' },
    { label: 'Bridal High Jewelry', value: 'bridal' },
    { label: 'Men’s Accents', value: 'mens' },
    { label: 'Gifts & Care', value: 'gifts' },
  ];

  const pearlTypes = ['all', 'Akoya', 'South Sea', 'Tahitian', 'Freshwater', 'Keshi'];

  const metalTypes = [
    'all',
    '18k White Gold',
    '18k Yellow Gold',
    '18k Rose Gold',
    'Platinum 950',
    'Sterling Silver 925'
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (filterParam === 'wishlist' && !isInWishlist(product.id)) return false;

      if (searchParam) {
        const query = searchParam.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesType = product.pearlType.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesType && !matchesCat && !matchesDesc) return false;
      }

      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (selectedPearlType !== 'all' && product.pearlType !== selectedPearlType) return false;
      if (selectedMetal !== 'all' && !product.availableMetals.includes(selectedMetal as MetalType)) return false;
      if (product.price > maxPrice) return false;
      if (onlyInStock && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0);
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [
    selectedCategory,
    selectedPearlType,
    selectedMetal,
    maxPrice,
    onlyInStock,
    sortBy,
    searchParam,
    filterParam,
    wishlist
  ]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPearlType('all');
    setSelectedMetal('all');
    setMaxPrice(3500);
    setOnlyInStock(false);
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedPearlType !== 'all' ||
    selectedMetal !== 'all' ||
    maxPrice < 3500 ||
    onlyInStock ||
    !!searchParam ||
    filterParam === 'wishlist';

  return (
    <div className="bg-[#FAFAF8] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="text-xs font-heading uppercase tracking-widest text-[#3B4A50]/70 flex items-center gap-2 mb-2">
            <Link to="/" className="hover:text-[#111]">Home</Link>
            <span>/</span>
            <span className="text-[#111] font-semibold">
              {filterParam === 'wishlist' ? 'Your Saved Wishlist' : 'Jewelry Collection'}
            </span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-semibold">
                {filterParam === 'wishlist'
                  ? 'Curated Wishlist'
                  : selectedCategory !== 'all'
                  ? `${categories.find((c) => c.value === selectedCategory)?.label}`
                  : 'All Pearl Jewelry Creations'}
              </h1>
              <p className="text-xs sm:text-sm text-[#3B4A50] mt-1 font-light">
                {filterParam === 'wishlist'
                  ? `You have saved ${filteredProducts.length} heirlooms to your atelier wishlist.`
                  : 'Certified Japanese Akoya, Australian South Sea, and Tahitian saltwater pearls.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-[#3B4A50]">
                <span className="hidden sm:inline font-heading uppercase text-[11px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#C9D1D3] rounded px-3 py-1.5 text-xs font-heading uppercase tracking-wider text-[#111] focus:outline-none focus:border-[#7FC8C0]"
                >
                  <option value="popular">Most Desired</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>

              <div className="hidden sm:flex items-center border border-[#C9D1D3] rounded bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-[#3B4A50] text-white' : 'text-[#3B4A50] hover:text-[#111]'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-[#3B4A50] text-white' : 'text-[#3B4A50] hover:text-[#111]'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#C9D1D3] rounded text-xs font-heading uppercase tracking-wider text-[#3B4A50]"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-xl border border-[#E5E7EB]">
            <span className="text-[11px] font-heading uppercase tracking-wider text-[#3B4A50]/70 font-semibold mr-1">
              Active Filters:
            </span>

            {searchParam && (
              <span className="inline-flex items-center gap-1 text-xs bg-[#FAFAF8] border border-[#C9D1D3] px-2.5 py-1 rounded text-[#111]">
                Search: "{searchParam}"
                <button onClick={() => setSearchParams({})} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-[#FAFAF8] border border-[#C9D1D3] px-2.5 py-1 rounded text-[#111]">
                {categories.find((c) => c.value === selectedCategory)?.label}
                <button onClick={() => setSelectedCategory('all')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedPearlType !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-[#FAFAF8] border border-[#C9D1D3] px-2.5 py-1 rounded text-[#111]">
                {selectedPearlType} Pearl
                <button onClick={() => setSelectedPearlType('all')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedMetal !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-[#FAFAF8] border border-[#C9D1D3] px-2.5 py-1 rounded text-[#111]">
                {selectedMetal}
                <button onClick={() => setSelectedMetal('all')} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-[#7FC8C0] hover:text-[#3B4A50] font-heading uppercase tracking-wider font-semibold ml-auto flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6`}>
            <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="font-heading font-semibold uppercase text-xs tracking-wider text-[#111]">
                  Filter Catalog
                </span>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-[11px] text-[#7FC8C0] font-heading uppercase hover:underline">
                    Reset
                  </button>
                )}
              </div>

              <div>
                <h4 className="text-xs font-heading uppercase tracking-wider text-[#3B4A50] font-semibold mb-2">
                  Category
                </h4>
                <div className="space-y-1.5">
                  {categories.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setSelectedCategory(c.value)}
                      className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                        selectedCategory === c.value
                          ? 'bg-[#FAFAF8] text-[#111] font-semibold border-l-2 border-[#7FC8C0]'
                          : 'text-[#3B4A50] hover:text-[#111]'
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="text-[10px] text-gray-400">
                        {c.value === 'all'
                          ? PRODUCTS.length
                          : PRODUCTS.filter((p) => p.category === c.value).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-heading uppercase tracking-wider text-[#3B4A50] font-semibold mb-2">
                  Pearl Variety
                </h4>
                <div className="space-y-1.5">
                  {pearlTypes.map((pt) => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => setSelectedPearlType(pt)}
                      className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                        selectedPearlType === pt
                          ? 'bg-[#FAFAF8] text-[#111] font-semibold border-l-2 border-[#7FC8C0]'
                          : 'text-[#3B4A50] hover:text-[#111]'
                      }`}
                    >
                      <span>{pt === 'all' ? 'All Pearl Types' : `${pt} Pearls`}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-heading uppercase tracking-wider text-[#3B4A50] font-semibold mb-2">
                  Precious Metal
                </h4>
                <div className="space-y-1.5">
                  {metalTypes.map((mt) => (
                    <button
                      key={mt}
                      type="button"
                      onClick={() => setSelectedMetal(mt)}
                      className={`w-full text-left text-xs py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                        selectedMetal === mt
                          ? 'bg-[#FAFAF8] text-[#111] font-semibold border-l-2 border-[#7FC8C0]'
                          : 'text-[#3B4A50] hover:text-[#111]'
                      }`}
                    >
                      <span>{mt === 'all' ? 'Any Metal Setting' : mt}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-heading uppercase tracking-wider text-[#3B4A50] font-semibold">
                    Maximum Price
                  </h4>
                  <span className="text-xs font-heading font-bold text-[#111] tabular-nums">
                    ${maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={3500}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#3B4A50] cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-heading uppercase tracking-wider text-[#3B4A50] font-semibold">
                  In Stock Only
                </span>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 accent-[#3B4A50] rounded cursor-pointer"
                />
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAFAF8] border border-[#C9D1D3] flex items-center justify-center mx-auto text-[#3B4A50]">
                  <SlidersHorizontal className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif text-2xl text-[#111]">No creations match your filters</h3>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#3B4A50] text-white font-heading uppercase text-xs tracking-wider rounded font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-[#E5E7EB] p-4 flex flex-col sm:flex-row gap-5 items-center shadow-xs"
                  >
                    <Link to={`/product/${product.id}`} className="w-full sm:w-44 aspect-square rounded-lg overflow-hidden bg-[#FAFAF8] shrink-0">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="text-[11px] font-heading uppercase tracking-widest text-[#7FC8C0] font-semibold">
                        {product.pearlType} Pearl · {product.pearlSize}
                      </div>
                      <Link to={`/product/${product.id}`} className="block">
                        <h3 className="font-serif text-xl font-semibold text-[#111]">{product.name}</h3>
                      </Link>
                      <p className="text-xs text-[#3B4A50] line-clamp-2">{product.description}</p>
                    </div>
                    <div className="sm:border-l sm:border-gray-100 sm:pl-5 flex flex-col items-center sm:items-end gap-3 shrink-0">
                      <div className="font-heading font-bold text-xl text-[#111] tabular-nums">
                        ${product.price.toLocaleString()}
                      </div>
                      <Link
                        to={`/product/${product.id}`}
                        className="px-5 py-2 bg-[#3B4A50] text-white font-heading uppercase text-xs tracking-wider rounded font-semibold"
                      >
                        Inspect Piece
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
