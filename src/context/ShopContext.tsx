import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, MetalType, OrderConfirmation, CurrencyCode } from '../types';
import { PRODUCTS } from '../data/products';
import {
  subscribeProducts,
  addProduct as addProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
  resetProductsToDefault as resetProductsToDefaultService,
} from '../services/productService';
import {
  subscribeStoreSettings,
  updateStoreSettings,
  DEFAULT_STORE_SETTINGS,
  StoreSettings,
} from '../services/storeSettingsService';

interface ShopContextType {
  // Currency & Internationalization
  currency: CurrencyCode;
  currencySymbol: '$' | '₱';
  exchangeRate: number;
  formatPrice: (amountInUSD: number, options?: { showBoth?: boolean; showSymbol?: boolean }) => string;
  formatRawPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
  setCurrency: (c: CurrencyCode) => void;
  setExchangeRate: (rate: number) => void;
  updateStoreCurrency: (currency: CurrencyCode, rate?: number, adminEmail?: string) => Promise<void>;
  cart: CartItem[];
  addToCart: (
    product: Product,
    metal?: MetalType,
    size?: string,
    length?: string,
    quantity?: number,
    giftWrap?: boolean,
    engraving?: string
  ) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  shippingFee: number;
  discountAmount: number;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  orderTotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  isConsultationModalOpen: boolean;
  setIsConsultationModalOpen: (open: boolean) => void;
  isSizeGuideModalOpen: boolean;
  setIsSizeGuideModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Products Catalog (Real-time synced with Firestore)
  products: Product[];
  isProductsLoading: boolean;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  resetProductsToDefault: () => Promise<void>;
  lastOrder: OrderConfirmation | null;
  setLastOrder: (order: OrderConfirmation | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store Settings (Currency $ vs ₱, Exchange Rate) synced in real-time
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);

  useEffect(() => {
    const unsubscribeSettings = subscribeStoreSettings((live) => {
      setStoreSettings(live);
    });
    return () => unsubscribeSettings();
  }, []);

  const currency = storeSettings.currency;
  const exchangeRate = storeSettings.exchangeRate || 58;
  const currencySymbol: '$' | '₱' = currency === 'PHP' ? '₱' : '$';

  const convertPrice = (amountInUSD: number): number => {
    if (typeof amountInUSD !== 'number' || isNaN(amountInUSD)) return 0;
    if (currency === 'PHP') {
      return Math.round(amountInUSD * exchangeRate);
    }
    return amountInUSD;
  };

  const formatRawPrice = (amountInUSD: number): string => {
    const val = convertPrice(amountInUSD);
    return `${currencySymbol}${val.toLocaleString()}`;
  };

  const formatPrice = (amountInUSD: number, options?: { showBoth?: boolean; showSymbol?: boolean }): string => {
    if (typeof amountInUSD !== 'number' || isNaN(amountInUSD)) {
      return `${currencySymbol}0`;
    }
    const val = convertPrice(amountInUSD);
    const primary = `${currencySymbol}${val.toLocaleString()}`;

    if (options?.showBoth) {
      if (currency === 'USD') {
        const phpVal = Math.round(amountInUSD * exchangeRate);
        return `${primary} (≈ ₱${phpVal.toLocaleString()} PHP)`;
      } else {
        return `${primary} (≈ $${amountInUSD.toLocaleString()} USD)`;
      }
    }
    return primary;
  };

  const setCurrency = (c: CurrencyCode) => {
    setStoreSettings((prev) => ({ ...prev, currency: c }));
  };

  const setExchangeRate = (rate: number) => {
    setStoreSettings((prev) => ({ ...prev, exchangeRate: rate }));
  };

  const updateStoreCurrency = async (newCurrency: CurrencyCode, newRate?: number, adminEmail?: string) => {
    const updated = await updateStoreSettings(
      {
        currency: newCurrency,
        exchangeRate: newRate !== undefined ? newRate : exchangeRate,
      },
      adminEmail
    );
    setStoreSettings(updated);
  };

  // Live Products State (from Firestore)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeProducts((liveItems) => {
      if (liveItems && liveItems.length > 0) {
        setProducts(liveItems);
      }
      setIsProductsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addProduct = async (newProd: Product) => {
    await addProductService(newProd);
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    await updateProductService(id, updates);
  };

  const deleteProduct = async (id: string) => {
    await deleteProductService(id);
  };

  const resetProductsToDefault = async () => {
    await resetProductsToDefaultService();
  };

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('crown_pearl_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('crown_pearl_wishlist_v1');
      return saved ? JSON.parse(saved) : ['delma-signature-akoya-choker'];
    } catch {
      return ['delma-signature-akoya-choker'];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => [PRODUCTS[0], PRODUCTS[1]]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('crown_pearl_cart_v1', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('crown_pearl_wishlist_v1', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const addToCart = (
    product: Product,
    metal?: MetalType,
    size?: string,
    length?: string,
    quantity = 1,
    giftWrap = false,
    engraving = ''
  ) => {
    const selectedMetal = metal || product.metal;
    const selectedSize = size || (product.availableSizes ? product.availableSizes[0] : undefined);
    const selectedLength = length || (product.availableLengths ? product.availableLengths[0] : undefined);
    const cartItemId = `${product.id}-${selectedMetal}-${selectedSize || 'none'}-${selectedLength || 'none'}-${giftWrap ? 'gw' : 'ngw'}-${engraving || 'noeng'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedMetal,
          selectedSize,
          selectedLength,
          quantity,
          giftWrap,
          engraving
        }
      ];
    });
    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => [product, ...prev.filter(p => p.id !== product.id)].slice(0, 6));
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setAppliedPromo('WELCOME10');
      setDiscountPercent(0.10);
      return { success: true, message: '10% Heirloom Welcome discount applied!' };
    }
    if (clean === 'DELMA2003') {
      setAppliedPromo('DELMA2003');
      setDiscountPercent(0.15);
      return { success: true, message: '15% Atelier Anniversary discount applied!' };
    }
    return { success: false, message: 'Invalid code. Try WELCOME10' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setDiscountPercent(0);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const discountAmount = Math.round(subtotal * discountPercent);
  const orderTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <ShopContext.Provider
      value={{
        currency,
        currencySymbol,
        exchangeRate,
        formatPrice,
        formatRawPrice,
        convertPrice,
        setCurrency,
        setExchangeRate,
        updateStoreCurrency,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        freeShippingThreshold,
        shippingFee,
        discountAmount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        orderTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        addRecentlyViewed,
        isConsultationModalOpen,
        setIsConsultationModalOpen,
        isSizeGuideModalOpen,
        setIsSizeGuideModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        products,
        isProductsLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        lastOrder,
        setLastOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
