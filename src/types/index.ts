// Tipos de usuario
export interface User {
  id: string;
  email: string;
  fullName: string;
  username: string;
  hasStore: boolean;
  storeType?: 'online' | 'physical' | 'both';
  productTypes: string[];
  onboardingCompleted?: boolean;
  createdAt: Date;
}

// Tipos de productos
export interface ProductVariant {
  id: string;
  type: 'size' | 'color' | 'style';
  name: string;
  value: string;
  stock: number;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  salePrice?: number;
  collection: string;
  category: string;
  status: 'active' | 'inactive' | 'archived';
  variants: ProductVariant[];
  totalStock: number;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de pedidos
export interface OrderItem {
  productId: string;
  productName: string;
  variantId?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  origenVenta?: 'tienda_online' | 'instagram' | 'whatsapp' | 'marketplace' | 'fisico';
  createdAt: Date;
  updatedAt: Date;
}

// Tipos de métricas
export interface Metrics {
  monthlyInteractions: {
    likes: number;
    comments: number;
    shares: number;
  };
  weeklyRevenue: number;
  stockChanges: number;
  recentOrders: number;
  activeCampaigns: number;
  followersGrowth: number;
}

export interface MetricCard {
  id: string;
  type: 'chart' | 'number' | 'messages' | 'conversion' | 'stock' | 'category';
  title: string;
  value?: string | number;
  subtitle?: string;
  percentage?: number;
  trend?: 'up' | 'down' | 'neutral';
  chartData?: ChartData;
  items?: any[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }[];
}

export interface DemographicData {
  country: string;
  flag: string;
  totalUsers: number;
  provinces: ProvinceData[];
}

export interface ProvinceData {
  name: string;
  users: number;
  cities: CityData[];
}

export interface CityData {
  name: string;
  users: number;
}

export interface Campaign {
  id: string;
  name: string;
  brand: string;
  status: 'active' | 'inactive' | 'pending';
  image: string;
  revenue?: number;
  interactions?: number;
}

export interface Interaction {
  id: string;
  image: string;
  count: number;
  type: 'like' | 'comment' | 'share';
}

export interface StatusMetric {
  id: string;
  name: string;
  avatar: string;
  label: string;
  value: number;
  chartData: ChartData;
}

// Tipos de navegación
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OnboardingQuestions: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Orders: undefined;
  Camera: undefined;
  Products: undefined;
  Metrics: undefined;
};

export type ProductsStackParamList = {
  ProductsList: undefined;
  ProductDetail: { productId: string };
  AddEditProduct: { productId?: string };
  AddVariants: { productId?: string; onVariantsAdded: (variants: ProductVariant[]) => void };
};

export type OrdersStackParamList = {
  OrdersList: undefined;
  OrderDetail: { orderId: string };
  AddEditOrder: { orderId?: string };
  SelectProducts: { selectedProducts?: OrderItem[]; onProductsSelected: (products: OrderItem[]) => void };
};

export type MetricsStackParamList = {
  MetricsDashboard: undefined;
  StatusDetail: undefined;
  DemographicsDetail: undefined;
  SalesAffiliateDetail: undefined;
  CampaignsDetail: undefined;
  InteractionsDetail: undefined;
  InteractionPhotos: undefined;
  InteractionDetail: { photo?: any; photoId?: number };
};

export type CameraStackParamList = {
  Camara: undefined;
  PreviewFoto: {
    photoPath: string;
    photoData: any;
    fromGallery?: boolean;
  };
  GaleriaFotos: undefined;
  EditorFoto: {
    photoPath: string;
    photoData: any;
  };
  PublicarContenido: {
    photoPath: string;
    photoData: any;
  };
};