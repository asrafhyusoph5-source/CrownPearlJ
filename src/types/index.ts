export type PearlType = 'Akoya' | 'South Sea' | 'Tahitian' | 'Freshwater' | 'Keshi';

export type MetalType = '18k Yellow Gold' | '18k White Gold' | '18k Rose Gold' | 'Platinum 950' | 'Sterling Silver 925';

export type ProductCategory = 
  | 'necklaces' 
  | 'earrings' 
  | 'rings' 
  | 'bracelets' 
  | 'bridal' 
  | 'gifts' 
  | 'mens';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  pearlType: PearlType;
  pearlColor: string;
  pearlSize: string;
  metal: MetalType;
  availableMetals: MetalType[];
  availableSizes?: string[];
  availableLengths?: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: 'Bestseller' | 'New' | 'Limited Stock' | 'Heritage Selection';
  images: string[];
  description: string;
  story: string;
  details: string[];
  materials: string[];
  specs: {
    luster: string;
    surface: string;
    shape: string;
    nacreThickness: string;
    origin: string;
  };
  care: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedMetal: MetalType;
  selectedSize?: string;
  selectedLength?: string;
  quantity: number;
  giftWrap?: boolean;
  engraving?: string;
}

export interface CustomerReview {
  id: string;
  productId?: string;
  productName?: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  pearlType?: PearlType;
  photoUrl?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  address: ShippingAddress;
  shippingMethod: string;
  estimatedDelivery: string;
}
