export type Locale = 'es' | 'en' | 'fr' | 'zh';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  bio?: string;
  location?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export type Category =
  | 'bags'
  | 'shoes'
  | 'clothing'
  | 'accessories'
  | 'jewelry'
  | 'watches';

export type Condition = 'new' | 'excellent' | 'good' | 'fair';

export type ProductStatus = 'draft' | 'pending' | 'active' | 'sold' | 'rejected';

export interface Product {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  brand: string;
  category: Category;
  condition: Condition;
  status: ProductStatus;
  price: number;
  original_price?: number;
  size?: string;
  color?: string;
  material?: string;
  year?: number;
  images: string[];
  main_image: string;
  authenticity_verified: boolean;
  authenticity_certificate_url?: string;
  views: number;
  favorites: number;
  created_at: string;
  updated_at: string;
  seller?: User;
}

export interface Favorite {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface Offer {
  id: string;
  product_id: string;
  buyer_id: string;
  amount: number;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  expires_at: string;
  created_at: string;
  updated_at: string;
  buyer?: User;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read: boolean;
  created_at: string;
  sender?: User;
}

export interface Conversation {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  last_message?: string;
  last_message_at?: string;
  unread_count: number;
  created_at: string;
  product?: Product;
  buyer?: User;
  seller?: User;
}

export interface Order {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  stripe_payment_intent_id: string;
  stripe_transfer_id?: string;
  status:
    | 'pending'
    | 'payment_processing'
    | 'paid'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';
  shipping_address: ShippingAddress;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
  product?: Product;
  buyer?: User;
  seller?: User;
}

export interface ShippingAddress {
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
}

export interface SearchFilters {
  category?: Category;
  condition?: Condition[];
  minPrice?: number;
  maxPrice?: number;
  brand?: string[];
  size?: string[];
  color?: string[];
  verified?: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export type SortBy =
  | 'recent'
  | 'price_asc'
  | 'price_desc'
  | 'popular'
  | 'relevant';
