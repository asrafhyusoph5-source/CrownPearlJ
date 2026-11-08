import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  ExternalLink,
  LogOut,
  ShoppingBag,
  Sparkles,
  Package,
  Layers,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  X,
  Image as ImageIcon,
  DollarSign,
  ShieldCheck,
  RotateCcw,
  Mail,
  Lock,
  LogIn,
  ArrowLeft,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory, PearlType, MetalType } from '../types';
import {
  getAdminSession,
  logoutAdmin,
  loginWithEmail,
  resetPassword,
  subscribeAdminAuth,
  getFriendlyAuthErrorMessage,
  type AdminSession,
} from '../services/adminAuth';
import { Logo } from '../components/common/Logo';
import { ASSET_IMAGES } from '../assets/images';


const PRESET_IMAGES = [
  { label: 'Palawan Golden Pearl', url: ASSET_IMAGES.pearlTypes },
  { label: 'Signature Strand', url: ASSET_IMAGES.hero },
  { label: 'Lustre Earrings', url: ASSET_IMAGES.earrings },
  { label: 'Bridal High Jewelry', url: ASSET_IMAGES.bridal },
  { label: 'Atelier Workshop Craft', url: ASSET_IMAGES.workshop },
  {
    label: 'Tahitian Peacock Drop',
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
  },
];

const CATEGORIES: { label: string; value: ProductCategory }[] = [
  { label: 'Pearl Necklaces & Strands', value: 'necklaces' },
  { label: 'Earrings & Drops', value: 'earrings' },
  { label: 'Solitaire & Duo Rings', value: 'rings' },
  { label: 'Bracelets & Cuffs', value: 'bracelets' },
  { label: 'Pearl Sets & Bridal Jewelry', value: 'set' },
  { label: "Men's Cufflinks & Accents", value: 'mens' },
  { label: 'Gifts & Care Sets', value: 'gifts' },
];

const PEARL_TYPES: PearlType[] = [
  'South Sea',
  'Akoya',
  'Tahitian',
  'Freshwater',
];

const METALS: MetalType[] = [
  '18k Yellow Gold',
  '18k White Gold',
  '18k Rose Gold',
  'Platinum 950',
  'Sterling Silver 925',
];

export const AdminProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, resetProductsToDefault } = useShop();

  const [session, setSession] = useState<AdminSession | null>(getAdminSession());
  const [authLoading, setAuthLoading] = useState(true);

  // In-page Manager Sign In form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [pearlTypeFilter, setPearlTypeFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Status feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auth Subscription
  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((curr) => {
      setSession(curr);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleManagerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setLoginError('Please enter your manager email address.');
      return;
    }
    if (!loginPassword) {
      setLoginError('Please enter your password.');
      return;
    }

    setIsLoginLoading(true);
    setLoginError(null);
    setLoginSuccess(null);

    try {
      const s = await loginWithEmail(loginEmail, loginPassword);
      setSession(s);
      showToast('Welcome back! Signed in to Crown Pearl Atelier.');
    } catch (err) {
      setLoginError(getFriendlyAuthErrorMessage(err));
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!loginEmail.trim()) {
      setLoginError('Please enter your manager email above first, then click "Forgot Password?".');
      return;
    }
    setIsLoginLoading(true);
    setLoginError(null);
    setLoginSuccess(null);

    try {
      await resetPassword(loginEmail);
      setLoginSuccess(`Password reset link sent to ${loginEmail.trim()}. Please check your inbox.`);
    } catch (err) {
      setLoginError(getFriendlyAuthErrorMessage(err));
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setSession(null);
    showToast('Signed out of Atelier Portal.');
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      if (pearlTypeFilter !== 'all' && item.pearlType !== pearlTypeFilter) return false;
      if (stockFilter === 'in_stock' && !item.inStock) return false;
      if (stockFilter === 'out_of_stock' && item.inStock) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesType = item.pearlType.toLowerCase().includes(q);
        const matchesSku = item.id.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesType && !matchesSku && !matchesDesc) return false;
      }
      return true;
    });
  }, [products, categoryFilter, pearlTypeFilter, stockFilter, searchQuery]);

  // Statistics
  const totalItems = products.length;
  const inStockCount = products.filter((p) => p.inStock && p.stockCount > 0).length;
  const outOfStockCount = totalItems - inStockCount;
  const totalValue = products.reduce((acc, p) => acc + p.price * (p.stockCount || 1), 0);

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#1A2327] flex items-center justify-center p-10 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#7FC8C0] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-heading tracking-wider uppercase text-white/70">
            Verifying Atelier Credentials…
          </p>
        </div>
      </main>
    );
  }

  // If not authenticated as Admin, show the in-place Manager Sign In form
  if (!session || !session.isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1A2327] text-white flex flex-col justify-between selection:bg-[#7FC8C0]/30 selection:text-white">
        {/* Top Bar */}
        <div className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Crown Pearl Store</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-[#7FC8C0] font-heading uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorized Staff Only</span>
          </div>
        </div>

        {/* Main Login Card */}
        <div className="max-w-md w-full mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="lg" isLightMode={true} />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#7FC8C0]/15 text-[#7FC8C0] text-[11px] font-heading font-semibold uppercase tracking-[0.25em] border border-[#7FC8C0]/30 mb-3">
              Atelier Management Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-serif text-white">
              Manager Sign In
            </h1>
            <p className="text-xs text-white/60 mt-2 max-w-sm mx-auto leading-relaxed">
              Enter your Crown Pearl staff credentials to manage jewelry inventory, catalog pricing, and certificates.
            </p>
          </div>

          <div className="bg-[#242E33] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative backdrop-blur-md">
            {loginError && (
              <div className="mb-5 p-3.5 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            {loginSuccess && (
              <div className="mb-5 p-3.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                <span>{loginSuccess}</span>
              </div>
            )}

            <form onSubmit={handleManagerLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-heading uppercase tracking-wider text-white/80 mb-1.5">
                  Manager Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="manager@crownpearl.ph"
                    className="w-full bg-[#1A2327] border border-white/15 px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0] outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-white/30 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-heading uppercase tracking-wider text-white/80">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-[11px] text-[#7FC8C0] hover:underline transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#1A2327] border border-white/15 px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/30 focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0] outline-none font-mono transition-colors"
                  />
                  <Lock className="w-4 h-4 text-white/30 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoginLoading}
                className="w-full mt-3 py-3 bg-[#7FC8C0] hover:bg-[#68B6AE] text-[#1A2327] font-heading font-semibold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isLoginLoading ? (
                  <div className="w-4 h-4 border-2 border-[#1A2327] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Manager Portal</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-white/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7FC8C0]" />
              <span>Encrypted Firebase Authentication · Crown Pearl Palawan</span>
            </div>
          </div>
        </div>

        <div className="text-center py-6 text-xs text-white/40">
          Crown Pearl Jewelry Atelier · Puerto Princesa, Palawan, Philippines · Estd. 2003
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#1A2327]">
      {/* Top Admin Navigation Header */}
      <header className="bg-[#1A2327] text-white border-b border-[#3B4A50]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7FC8C0]/20 border border-[#7FC8C0]/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#7FC8C0]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg md:text-xl font-semibold tracking-wide text-white">
                  Crown Pearl Atelier
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-heading uppercase tracking-widest bg-[#7FC8C0] text-[#1A2327] font-bold">
                  Manager Portal
                </span>
              </div>
              <p className="text-xs text-white/60">
                Puerto Princesa Store · {session?.userEmail || 'delmapearl17@gmail.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to="/certificate-import"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#7FC8C0] hover:bg-[#68B6AE] text-[#1A2327] text-xs font-heading uppercase tracking-wider font-semibold transition-all shadow-sm"
              title="Open Certificate Import Page"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certificate Import</span>
            </Link>

            <Link
              to="/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-heading uppercase tracking-wider transition-colors border border-white/10"
              title="Preview changes in live customer store"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Store</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-heading uppercase tracking-wider transition-colors border border-red-500/30"
              title="Log out from atelier manager"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>


      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toast alert */}
        {toastMessage && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-900 border border-emerald-500/40 text-emerald-100 flex items-center justify-between shadow-lg animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-sm font-medium">{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-heading uppercase tracking-wider">Total Products</span>
              <Package className="w-4 h-4 text-[#238B80]" />
            </div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-gray-900">{totalItems}</div>
            <p className="text-[11px] text-gray-500 mt-1">Live in store catalog</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-heading uppercase tracking-wider">In Stock</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-emerald-700">{inStockCount}</div>
            <p className="text-[11px] text-gray-500 mt-1">Ready for fulfillment</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-heading uppercase tracking-wider">Out of Stock</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-amber-700">{outOfStockCount}</div>
            <p className="text-[11px] text-gray-500 mt-1">Requires restringing/harvest</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-heading uppercase tracking-wider">Est. Catalog Value</span>
              <DollarSign className="w-4 h-4 text-[#238B80]" />
            </div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
              ${totalValue.toLocaleString()}
            </div>
            <p className="text-[11px] text-gray-500 mt-1">~₱{(totalValue * 58).toLocaleString()} PHP</p>
          </div>
        </div>

        {/* Action Controls & Filters Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product name, pearl type, SKU, or description..."
              className="w-full bg-[#FAFAF8] border border-gray-200 pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#FAFAF8] border border-gray-200 px-3 py-2.5 rounded-lg text-xs font-heading uppercase tracking-wider text-gray-700 outline-none focus:border-[#7FC8C0]"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>

            <select
              value={pearlTypeFilter}
              onChange={(e) => setPearlTypeFilter(e.target.value)}
              className="bg-[#FAFAF8] border border-gray-200 px-3 py-2.5 rounded-lg text-xs font-heading uppercase tracking-wider text-gray-700 outline-none focus:border-[#7FC8C0]"
            >
              <option value="all">All Pearls</option>
              {PEARL_TYPES.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="bg-[#FAFAF8] border border-gray-200 px-3 py-2.5 rounded-lg text-xs font-heading uppercase tracking-wider text-gray-700 outline-none focus:border-[#7FC8C0]"
            >
              <option value="all">All Stock Status</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-[#3B4A50] hover:bg-[#263238] text-white rounded-lg text-xs font-heading uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-[#7FC8C0]" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Product Inventory Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-gray-200 text-[11px] font-heading font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-4 px-4 sm:px-6">Product & SKU</th>
                  <th className="py-4 px-4">Pearl & Metal</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Stock</th>
                  <th className="py-4 px-4">Badge</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500">
                      <Package className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                      <p className="font-serif text-base text-gray-700">No jewelry items found</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Try adjusting your search criteria or add a new creation.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const primaryImg = product.images?.[0] || ASSET_IMAGES.hero;
                    return (
                      <tr key={product.id} className="hover:bg-[#FAFAF8] transition-colors">
                        {/* Product Title & Image */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={primaryImg}
                              alt={product.name}
                              className="w-14 h-14 rounded-lg object-cover bg-gray-100 border border-gray-200 shrink-0"
                            />
                            <div>
                              <Link
                                to={`/product/${product.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-serif font-medium text-gray-900 hover:text-[#238B80] transition-colors block text-base"
                              >
                                {product.name}
                              </Link>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-mono text-[11px] text-gray-400">
                                  {product.id}
                                </span>
                                <span className="text-[10px] font-heading uppercase tracking-wider text-[#238B80] bg-[#EAF6F4] px-2 py-0.5 rounded">
                                  {product.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Pearl & Metal */}
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-800 text-xs">
                            {product.pearlType} ({product.pearlSize})
                          </div>
                          <div className="text-[11px] text-gray-500">{product.metal}</div>
                          <div className="text-[10px] text-gray-400">{product.pearlColor}</div>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-4">
                          <div className="font-semibold text-gray-900">
                            ${product.price.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-gray-500 font-mono">
                            ₱{(product.price * 58).toLocaleString()} PHP
                          </div>
                          {product.originalPrice && (
                            <div className="text-[10px] text-gray-400 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="py-4 px-4">
                          {product.inStock && product.stockCount > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span>{product.stockCount} in stock</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                              <span>Out of stock</span>
                            </span>
                          )}
                        </td>

                        {/* Badge */}
                        <td className="py-4 px-4">
                          {product.badge ? (
                            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-heading uppercase tracking-wider font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                              {product.badge}
                            </span>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/product/${product.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View in Customer Store"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => setEditingProduct(product)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingProduct(product)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="bg-[#F8F9FA] px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
            <div>
              Showing {filteredProducts.length} of {products.length} registered jewelry creations
            </div>
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-700 font-heading uppercase tracking-wider transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Catalog to Delma 16 Defaults</span>
            </button>
          </div>
        </div>
      </main>

      {/* ================= ADD PRODUCT MODAL ================= */}
      {isAddModalOpen && (
        <ProductFormModal
          isOpen={isAddModalOpen}
          title="Add New Jewelry Creation"
          initialData={null}
          onClose={() => setIsAddModalOpen(false)}
          onSave={async (newProd) => {
            setIsSubmitting(true);
            try {
              await addProduct(newProd);
              showToast(`"${newProd.name}" was successfully added to your store!`);
              setIsAddModalOpen(false);
            } catch (err) {
              alert('Error adding product: ' + (err instanceof Error ? err.message : String(err)));
            } finally {
              setIsSubmitting(false);
            }
          }}
          isSubmitting={isSubmitting}
        />
      )}

      {/* ================= EDIT PRODUCT MODAL ================= */}
      {editingProduct && (
        <ProductFormModal
          isOpen={Boolean(editingProduct)}
          title={`Edit Product: ${editingProduct.name}`}
          initialData={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={async (updatedProd) => {
            setIsSubmitting(true);
            try {
              await updateProduct(updatedProd.id, updatedProd);
              showToast(`Changes to "${updatedProd.name}" were saved and are now live!`);
              setEditingProduct(null);
            } catch (err) {
              alert('Error saving changes: ' + (err instanceof Error ? err.message : String(err)));
            } finally {
              setIsSubmitting(false);
            }
          }}
          isSubmitting={isSubmitting}
        />
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-gray-900">
              Delete Product?
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-gray-900">"{deletingProduct.name}"</span>? This will immediately remove it from the public shop catalog and search results.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2.5 rounded-lg border border-gray-300 text-xs font-heading uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await deleteProduct(deletingProduct.id);
                    showToast(`Product "${deletingProduct.name}" has been deleted.`);
                    setDeletingProduct(null);
                  } catch (err) {
                    alert('Error deleting product: ' + (err instanceof Error ? err.message : String(err)));
                  }
                }}
                className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-heading uppercase tracking-wider font-semibold transition-colors shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RESET CATALOG CONFIRMATION ================= */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-gray-900">
              Restore Default Catalog?
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              This will restore Crown Pearl's original 16 flagship pieces (The Delma Signature Akoya Choker, Lustre South Sea Drops, Aurora Bridal Suite, etc.) and reset any custom modifications.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2.5 rounded-lg border border-gray-300 text-xs font-heading uppercase tracking-wider text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await resetProductsToDefault();
                    showToast('Catalog restored to original 16 Crown Pearl masterworks.');
                    setIsResetConfirmOpen(false);
                  } catch (err) {
                    alert('Reset error: ' + (err instanceof Error ? err.message : String(err)));
                  }
                }}
                className="px-4 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-heading uppercase tracking-wider font-semibold shadow-sm"
              >
                Yes, Restore Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= REUSABLE PRODUCT ADD / EDIT MODAL ================= */

interface ProductFormModalProps {
  isOpen: boolean;
  title: string;
  initialData: Product | null;
  onClose: () => void;
  onSave: (product: Product) => Promise<void>;
  isSubmitting: boolean;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  title,
  initialData,
  onClose,
  onSave,
  isSubmitting,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [sku, setSku] = useState(initialData?.id || '');
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [price, setPrice] = useState<number>(initialData?.price || 950);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(initialData?.originalPrice);
  const [category, setCategory] = useState<ProductCategory>(initialData?.category || 'necklaces');
  const [pearlType, setPearlType] = useState<PearlType>(initialData?.pearlType || 'South Sea');
  const [pearlColor, setPearlColor] = useState(initialData?.pearlColor || 'Deep 24k Champagne Gold');
  const [pearlSize, setPearlSize] = useState(initialData?.pearlSize || '11.0 - 12.0 mm');
  const [metal, setMetal] = useState<MetalType>(initialData?.metal || '18k Yellow Gold');
  const [inStock, setInStock] = useState(initialData ? initialData.inStock : true);
  const [stockCount, setStockCount] = useState<number>(initialData?.stockCount ?? 5);
  const [badge, setBadge] = useState<string>(initialData?.badge || 'New');
  const [imageUrl, setImageUrl] = useState(initialData?.images?.[0] || ASSET_IMAGES.pearlTypes);
  const [description, setDescription] = useState(
    initialData?.description ||
      'Handcrafted in Puerto Princesa, Palawan. Formed by natural ocean currents and individually knotted on double-spun silk cord.'
  );

  // Auto-generate SKU from name if empty
  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialData && !sku) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSku(generated);
    }
  };


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!name.trim()) {
    alert('Please enter a product name.');
    return;
  }

  if (!imageUrl.trim()) {
    alert('Please provide a product image URL.');
    return;
  }

  const finalSku = (
    sku.trim() ||
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  ).toLowerCase();

  if (!finalSku) {
    alert('Please provide a valid product SKU.');
    return;
  }

  const finalStockCount = Math.max(0, Number(stockCount) || 0);

  // Preserve existing product gallery images.
  const existingImages = initialData?.images ?? [];

  const updatedImages = initialData
    ? [
        imageUrl.trim(),
        ...existingImages.slice(1),
      ]
    : [
        imageUrl.trim(),
        ASSET_IMAGES.hero,
        ASSET_IMAGES.workshop,
      ];

  // Preserve existing product variations.
  const availableMetals = Array.from(
    new Set([
      ...(initialData?.availableMetals ?? []),
      metal,
    ])
  );

  const availableLengths =
    initialData?.availableLengths ??
    (category === 'necklaces'
      ? [
          '16 inch (Choker)',
          '18 inch (Princess)',
          '20 inch (Matinee)',
        ]
      : undefined);

  const availableSizes =
    initialData?.availableSizes ??
    (category === 'rings'
      ? ['5', '6', '7', '8', '9']
      : undefined);

  const productPayload: Product = {
    // Preserve all existing product information.
    ...(initialData ?? {} as Product),

    id: finalSku,
    name: name.trim(),

    tagline:
      tagline.trim() ||
      `${pearlType} pearl jewelry by Delma`,

    price: Math.max(0, Number(price) || 0),

    originalPrice:
      originalPrice !== undefined &&
      Number(originalPrice) > 0
        ? Number(originalPrice)
        : undefined,

    category,
    pearlType,
    pearlColor: pearlColor.trim() || 'Natural Luster',
    pearlSize: pearlSize.trim() || '10 - 11 mm',
    metal,

    availableMetals,
    availableLengths,
    availableSizes,

    // Preserve existing reviews.
    rating: initialData?.rating ?? 4.95,
    reviewCount: initialData?.reviewCount ?? 12,

    // Keep stock status consistent.
    inStock: inStock && finalStockCount > 0,
    stockCount: finalStockCount,

    badge:
      badge === 'none'
        ? undefined
        : badge as Product['badge'],

    images: updatedImages,

    description: description.trim(),

    // Preserve existing detailed product content.
    story:
      initialData?.story ||
      'Handcrafted in Delma’s Puerto Princesa atelier using carefully selected cultured pearls.',

    details: initialData?.details ?? [
      'Certified genuine cultured pearl',
      'Includes Crown Pearl Certificate of Authenticity',
      'Carefully crafted jewelry',
      'Complimentary presentation box',
    ],

    materials: initialData?.materials ?? [
      `${pearlType} Cultured Pearl`,
      metal,
    ],

    specs: initialData?.specs ?? {
      luster: 'High Natural Luster',
      surface: 'Clean',
      shape: 'Round',
      nacreThickness: 'Thick',
      origin: 'Philippines',
    },

    care: initialData?.care ?? [
      'Keep away from chemicals and perfumes.',
      'Wipe with a soft microfiber cloth after wearing.',
      'Store separately in a jewelry box.',
    ],

    isFeatured: initialData?.isFeatured ?? true,
    isBestseller: badge === 'Bestseller',
  };

  void onSave(productPayload);
};

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-gray-200 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-[#238B80] font-semibold">
              Atelier Inventory Control
            </span>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900 mt-0.5">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Section 1: Basic Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Palawan Imperial Golden Pearl Pendant"
                className="w-full bg-[#FAFAF8] border border-gray-300 px-3.5 py-2.5 rounded-lg text-sm text-gray-900 focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Product SKU / Identifier Slug
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                disabled={Boolean(initialData)}
                placeholder="palawan-imperial-golden-pearl"
                className="w-full bg-[#FAFAF8] border border-gray-300 px-3.5 py-2.5 rounded-lg text-sm font-mono text-gray-800 focus:border-[#7FC8C0] outline-none disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
              Short Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Hand-selected 12mm golden South Sea pearl on 18k solid gold bail"
              className="w-full bg-[#FAFAF8] border border-gray-300 px-3.5 py-2.5 rounded-lg text-sm text-gray-900 focus:border-[#7FC8C0] outline-none"
            />
          </div>

          {/* Section 2: Classification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full bg-[#FAFAF8] border border-gray-300 px-3.5 py-2.5 rounded-lg text-xs font-heading uppercase tracking-wider text-gray-800 outline-none focus:border-[#7FC8C0]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Pearl Variety
              </label>
              <select
                value={pearlType}
                onChange={(e) => setPearlType(e.target.value as PearlType)}
                className="w-full bg-[#FAFAF8] border border-gray-300 px-3.5 py-2.5 rounded-lg text-xs font-heading uppercase tracking-wider text-gray-800 outline-none focus:border-[#7FC8C0]"
              >
                {PEARL_TYPES.map((pt) => (
                  <option key={pt} value={pt}>
                    {pt} Pearls
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Primary Metal
              </label>
              <select
                value={metal}
                onChange={(e) => setMetal(e.target.value as MetalType)}
                className="w-full bg-[#FAFAF8] border border-gray-300 px-3.5 py-2.5 rounded-lg text-xs font-heading uppercase tracking-wider text-gray-800 outline-none focus:border-[#7FC8C0]"
              >
                {METALS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: Pricing & Inventory */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAFAF8] border border-gray-200">
            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Price (USD $) *
              </label>
              <input
                type="number"
                required
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-white border border-gray-300 px-3.5 py-2 rounded-lg text-sm font-semibold text-gray-900 outline-none focus:border-[#7FC8C0]"
              />
              <span className="text-[10px] text-gray-500 block mt-1">
                ≈ ₱{(price * 58).toLocaleString()} PHP
              </span>
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Original Price (USD $)
              </label>
              <input
                type="number"
                min={0}
                value={originalPrice ?? ''}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Optional sale mark"
                className="w-full bg-white border border-gray-300 px-3.5 py-2 rounded-lg text-sm text-gray-900 outline-none focus:border-[#7FC8C0]"
              />
              <span className="text-[10px] text-gray-400 block mt-1">Shows strike-through</span>
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Stock Count
              </label>
              <input
                type="number"
                min={0}
                value={stockCount}
                onChange={(e) => setStockCount(Number(e.target.value))}
                className="w-full bg-white border border-gray-300 px-3.5 py-2 rounded-lg text-sm text-gray-900 outline-none focus:border-[#7FC8C0]"
              />
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Stock Status
              </label>
              <button
                type="button"
                onClick={() => setInStock(!inStock)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-heading uppercase tracking-wider font-semibold border transition-colors flex items-center justify-center gap-1.5 ${
                  inStock
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-red-50 text-red-800 border-red-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <span>{inStock ? 'In Stock' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>

          {/* Section 4: Pearl Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Pearl Color & Overtone
              </label>
              <input
                type="text"
                value={pearlColor}
                onChange={(e) => setPearlColor(e.target.value)}
                placeholder="e.g. Deep 24k Champagne Gold"
                className="w-full bg-[#FAFAF8] border border-gray-300 px-3.5 py-2 rounded-lg text-sm text-gray-900 outline-none focus:border-[#7FC8C0]"
              />
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Pearl Diameter / Size
              </label>
              <input
                type="text"
                value={pearlSize}
                onChange={(e) => setPearlSize(e.target.value)}
                placeholder="e.g. 11.0 - 12.0 mm"
                className="w-full bg-[#FAFAF8] border border-gray-300 px-3.5 py-2 rounded-lg text-sm text-gray-900 outline-none focus:border-[#7FC8C0]"
              />
            </div>

            <div>
              <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
                Showcase Badge
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-[#FAFAF8] border border-gray-300 px-3.5 py-2 rounded-lg text-xs font-heading uppercase tracking-wider text-gray-800 outline-none focus:border-[#7FC8C0]"
              >
                <option value="none">No Badge</option>
                <option value="Bestseller">Bestseller</option>
                <option value="New">New</option>
                <option value="Limited Stock">Limited Stock</option>
                <option value="Heritage Selection">Heritage Selection</option>
              </select>
            </div>
          </div>

          {/* Section 5: Image URL & Quick Presets */}
          <div>
            <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5 flex items-center justify-between">
              <span>Primary Product Image URL</span>
              <span className="text-[11px] text-[#238B80] normal-case">Supports web image link or presets below</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 bg-[#FAFAF8] border border-gray-300 px-3.5 py-2.5 rounded-lg text-xs font-mono text-gray-900 outline-none focus:border-[#7FC8C0]"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                />
              )}
            </div>

            {/* Quick Presets */}
            <div className="mt-2.5 flex flex-wrap gap-2">
              <span className="text-[10px] font-heading uppercase tracking-wider text-gray-400 self-center">
                Presets:
              </span>
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className="px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-heading uppercase tracking-wider transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 6: Description */}
          <div>
            <label className="block text-xs font-heading uppercase tracking-wider text-gray-700 font-semibold mb-1.5">
              Atelier Product Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the luster, provenance, craftsmanship, and aesthetic presence of this piece..."
              className="w-full bg-[#FAFAF8] border border-gray-300 p-3 rounded-lg text-sm text-gray-900 outline-none focus:border-[#7FC8C0]"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-xs font-heading uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-[#3B4A50] hover:bg-[#263238] text-white text-xs font-heading uppercase tracking-widest font-semibold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#7FC8C0]" />
                  <span>Save Creation to Store</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
