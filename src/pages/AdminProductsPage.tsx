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
  X,
  Image as ImageIcon,
  DollarSign,
  ShieldCheck,
  RotateCcw,
  Copy
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory, PearlType, MetalType } from '../types';
import { getAdminSession, logoutAdmin } from '../services/adminAuth';
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
  { label: 'Bridal High Jewelry', value: 'bridal' },
  { label: 'Men\'s Cufflinks & Accents', value: 'mens' },
  { label: 'Gifts & Care Sets', value: 'gifts' },
];

const PEARL_TYPES: PearlType[] = ['South Sea', 'Akoya', 'Tahitian', 'Freshwater', 'Keshi'];

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

  const [session, setSession] = useState(getAdminSession());
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

  // Auth Guard
  useEffect(() => {
    const currentSession = getAdminSession();
    if (!currentSession || !currentSession.isAuthenticated) {
      navigate('/admin/login', { replace: true });
    } else {
      setSession(currentSession);
    }
  }, [navigate]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
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

          <div className="flex items-center gap-3">
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
                            <div className="relative shrink-0">
                              <img
                                src={primaryImg}
                                alt={product.name}
                                className="w-14 h-14 rounded-lg object-cover bg-gray-100 border border-gray-200"
                              />
                              {product.images && product.images.length > 1 && (
                                <div className="absolute -bottom-1 -right-1 flex -space-x-1.5" title={`${product.images.length} photos registered`}>
                                  {product.images.slice(1, 3).map((extraImg, idx) => (
                                    <img
                                      key={idx}
                                      src={extraImg}
                                      alt=""
                                      className="w-5 h-5 rounded-full object-cover border-2 border-white shadow-xs bg-gray-100"
                                      title={`Photo ${idx + 2}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
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
  
  // 3 Independent Product Images
  const [image1, setImage1] = useState(initialData?.images?.[0] || ASSET_IMAGES.pearlTypes);
  const [image2, setImage2] = useState(initialData?.images?.[1] || ASSET_IMAGES.hero);
  const [image3, setImage3] = useState(initialData?.images?.[2] || ASSET_IMAGES.workshop);
  const [selectedImageTab, setSelectedImageTab] = useState<1 | 2 | 3>(1);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a product name.');
      return;
    }

    if (!image1.trim()) {
      alert('Please provide at least the primary product image URL.');
      return;
    }

    const finalSku = (sku.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).toLowerCase();

    // Assemble all 3 images with graceful fallbacks
    const img1 = image1.trim();
    const img2 = image2.trim() || img1;
    const img3 = image3.trim() || img2 || img1;
    const finalImages: string[] = [img1, img2, img3];

    const productPayload: Product = {
      id: finalSku,
      name: name.trim(),
      tagline: tagline.trim() || `${pearlType} pearl jewelry by Delma`,
      price: Number(price) || 0,
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      category,
      pearlType,
      pearlColor: pearlColor.trim() || 'Natural Luster',
      pearlSize: pearlSize.trim() || '10 - 11 mm',
      metal,
      availableMetals: [metal],
      availableLengths: category === 'necklaces' ? ['16 inch (Choker)', '18 inch (Princess)', '20 inch (Matinee)'] : undefined,
      availableSizes: category === 'rings' ? ['5', '6', '7', '8', '9'] : undefined,
      rating: initialData?.rating ?? 4.95,
      reviewCount: initialData?.reviewCount ?? 12,
      inStock,
      stockCount: Number(stockCount) || 0,
      badge: badge === 'none' ? undefined : (badge as any),
      images: finalImages,
      description: description.trim(),
      story:
        initialData?.story ||
        'Handcrafted in Delma’s Puerto Princesa atelier using certified natural South Sea pearls harvested in Palawan lagoons.',
      details: initialData?.details || [
        'Certified genuine cultured pearl from Palawan waters',
        'Includes Crown Pearl Estd. 2003 Certificate of Authenticity',
        'Hand-knotted on pure high-tensile silk cord',
        'Complimentary signature velvet presentation box',
      ],
      materials: initialData?.materials || [
        `${pearlType} Cultured Pearl`,
        metal,
        'Double-Spun Silk Cord',
      ],
      specs: initialData?.specs || {
        luster: 'Superior High Silk Glow',
        surface: 'Clean (95%+ blemish free)',
        shape: 'Round',
        nacreThickness: 'Thick (1.5mm+)',
        origin: 'Palawan, Philippines',
      },
      care: initialData?.care || [
        'Last on, first off: apply cosmetics and perfumes prior to wearing.',
        'Wipe with lint-free microfiber cloth after every wear.',
      ],
      isFeatured: initialData?.isFeatured ?? true,
      isBestseller: badge === 'Bestseller',
    };

    onSave(productPayload);
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

          {/* Section 5: Product Image Gallery (3 Images) */}
          <div className="p-4 rounded-xl bg-[#FAFAF8] border border-gray-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-gray-200">
              <div>
                <h4 className="text-xs font-heading uppercase tracking-wider text-gray-900 font-bold flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#238B80]" />
                  <span>Product Photo Gallery (3 Photos)</span>
                </h4>
                <p className="text-[11px] text-gray-500">
                  Customers can swipe and zoom through all 3 images on the product page.
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 shadow-2xs self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setSelectedImageTab(1)}
                  className={`px-3 py-1 rounded text-xs font-heading uppercase tracking-wider transition-colors flex items-center gap-1 ${
                    selectedImageTab === 1
                      ? 'bg-[#3B4A50] text-white font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>1. Cover</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImageTab(2)}
                  className={`px-3 py-1 rounded text-xs font-heading uppercase tracking-wider transition-colors flex items-center gap-1 ${
                    selectedImageTab === 2
                      ? 'bg-[#3B4A50] text-white font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>2. Detail</span>
                  {image2 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedImageTab(3)}
                  className={`px-3 py-1 rounded text-xs font-heading uppercase tracking-wider transition-colors flex items-center gap-1 ${
                    selectedImageTab === 3
                      ? 'bg-[#3B4A50] text-white font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>3. Lifestyle</span>
                  {image3 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                </button>
              </div>
            </div>

            {/* TAB 1: PRIMARY COVER IMAGE */}
            {selectedImageTab === 1 && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading uppercase tracking-wider text-gray-800 font-semibold flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#3B4A50] text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span>1st Photo: Primary Cover Image *</span>
                  </label>
                  <span className="text-[10px] text-gray-500 font-mono">Main photo on shop cards & cover</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-300 shrink-0 shadow-2xs">
                    {image1 ? (
                      <img src={image1} alt="Cover Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <input
                    type="url"
                    required
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                    placeholder="Enter main product photo URL..."
                    className="flex-1 bg-white border border-gray-300 px-3.5 py-2.5 rounded-lg text-xs font-mono text-gray-900 outline-none focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-heading uppercase tracking-wider text-gray-400">
                    Quick Presets:
                  </span>
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setImage1(preset.url)}
                      className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 text-gray-700 text-[10px] font-heading uppercase tracking-wider border border-gray-200 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: SECOND IMAGE (DETAIL / ANGLE) */}
            {selectedImageTab === 2 && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading uppercase tracking-wider text-gray-800 font-semibold flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#238B80] text-white flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <span>2nd Photo: Close-Up / Luster Detail</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setImage2(image1)}
                    className="text-[11px] text-[#238B80] hover:underline flex items-center gap-1 font-heading uppercase tracking-wider"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy 1st Photo</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-300 shrink-0 shadow-2xs">
                    {image2 ? (
                      <img src={image2} alt="Detail Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <input
                    type="url"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    placeholder="Enter second photo URL (or click Copy 1st Photo)..."
                    className="flex-1 bg-white border border-gray-300 px-3.5 py-2.5 rounded-lg text-xs font-mono text-gray-900 outline-none focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0]"
                  />
                  {image2 && (
                    <button
                      type="button"
                      onClick={() => setImage2('')}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
                      title="Clear second image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-heading uppercase tracking-wider text-gray-400">
                    Quick Presets:
                  </span>
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setImage2(preset.url)}
                      className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 text-gray-700 text-[10px] font-heading uppercase tracking-wider border border-gray-200 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: THIRD IMAGE (LIFESTYLE / WORKSHOP / SCALE) */}
            {selectedImageTab === 3 && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading uppercase tracking-wider text-gray-800 font-semibold flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#3B4A50] text-white flex items-center justify-center text-[10px]">
                      3
                    </span>
                    <span>3rd Photo: Lifestyle / On-Model / Workshop</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setImage3(image1)}
                    className="text-[11px] text-[#238B80] hover:underline flex items-center gap-1 font-heading uppercase tracking-wider"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy 1st Photo</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-300 shrink-0 shadow-2xs">
                    {image3 ? (
                      <img src={image3} alt="Lifestyle Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <input
                    type="url"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    placeholder="Enter third photo URL (or click Copy 1st Photo)..."
                    className="flex-1 bg-white border border-gray-300 px-3.5 py-2.5 rounded-lg text-xs font-mono text-gray-900 outline-none focus:border-[#7FC8C0] focus:ring-1 focus:ring-[#7FC8C0]"
                  />
                  {image3 && (
                    <button
                      type="button"
                      onClick={() => setImage3('')}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
                      title="Clear third image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-heading uppercase tracking-wider text-gray-400">
                    Quick Presets:
                  </span>
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setImage3(preset.url)}
                      className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 text-gray-700 text-[10px] font-heading uppercase tracking-wider border border-gray-200 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Overview Strip (shows all 3 thumbnails side-by-side) */}
            <div className="pt-3 border-t border-gray-200">
              <span className="text-[10px] font-heading uppercase tracking-wider text-gray-500 block mb-2">
                Gallery Preview in Customer Store:
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div
                  onClick={() => setSelectedImageTab(1)}
                  className={`cursor-pointer rounded-lg p-2 border transition-all ${
                    selectedImageTab === 1
                      ? 'border-[#238B80] bg-[#EAF6F4]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-heading uppercase tracking-wider text-gray-600 mb-1">
                    <span className="font-bold">1. Cover</span>
                    <span className="text-[#238B80]">Primary</span>
                  </div>
                  <img
                    src={image1 || ASSET_IMAGES.pearlTypes}
                    alt="Cover thumbnail"
                    className="w-full h-16 rounded object-cover bg-gray-100 border border-gray-200"
                  />
                </div>

                <div
                  onClick={() => setSelectedImageTab(2)}
                  className={`cursor-pointer rounded-lg p-2 border transition-all ${
                    selectedImageTab === 2
                      ? 'border-[#238B80] bg-[#EAF6F4]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-heading uppercase tracking-wider text-gray-600 mb-1">
                    <span className="font-bold">2. Detail</span>
                    <span className="text-gray-400">{image2 ? 'Set' : 'Empty'}</span>
                  </div>
                  <img
                    src={image2 || image1 || ASSET_IMAGES.hero}
                    alt="Detail thumbnail"
                    className="w-full h-16 rounded object-cover bg-gray-100 border border-gray-200"
                  />
                </div>

                <div
                  onClick={() => setSelectedImageTab(3)}
                  className={`cursor-pointer rounded-lg p-2 border transition-all ${
                    selectedImageTab === 3
                      ? 'border-[#238B80] bg-[#EAF6F4]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-heading uppercase tracking-wider text-gray-600 mb-1">
                    <span className="font-bold">3. Lifestyle</span>
                    <span className="text-gray-400">{image3 ? 'Set' : 'Empty'}</span>
                  </div>
                  <img
                    src={image3 || image2 || image1 || ASSET_IMAGES.workshop}
                    alt="Lifestyle thumbnail"
                    className="w-full h-16 rounded object-cover bg-gray-100 border border-gray-200"
                  />
                </div>
              </div>
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
