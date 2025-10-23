export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  stock: number;
  featured: boolean;
  rating?: number;
  reviews?: number;
}

export type Category = 'electronics' | 'clothing' | 'books' | 'home-garden';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export interface CheckoutFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Shipping Address
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // Payment Information (fake)
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CheckoutFormData;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: Date;
  status: 'pending' | 'processing' | 'completed';
}

// Mixedbread integration types
export interface MixedbreadMetadata {
  name?: string;
  description?: string;
  price?: number;
  color?: string;
  style?: string;
  gender?: string;
  season?: string;
  pattern?: string;
  material?: string;
  filename?: string;
  notable_details?: string;
  [key: string]: unknown;
}

export interface MixedbreadSearchChunk {
  text?: string;
  score?: number;
  image_url?: {
    url: string;
  };
  metadata?: MixedbreadMetadata;
  generated_metadata?: MixedbreadMetadata;
}

export interface MixedbreadSearchResponse {
  results: MixedbreadSearchChunk[];
}
