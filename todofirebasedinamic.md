# Análisis Firebase - Dinamización React Native

## Resumen Ejecutivo

- **Secciones hardcodeadas encontradas**: 47 componentes con datos estáticos
- **Colecciones Firebase propuestas**: 23 colecciones principales
- **Archivos analizados**: 156+ archivos .ts/.tsx/.js/.jsx
- **Datos hardcodeados identificados**: +500 objetos/arrays/valores estáticos
- **Estimación de tiempo de implementación**: 4-6 semanas (160-240 horas)
- **Infraestructura Firebase existente**: ✅ Completa (Auth, Firestore, Storage)

---

## 1. Arquitectura General

### 1.1 Colecciones Firebase Propuestas

| Colección | Ruta | Propósito | Prioridad |
|-----------|------|-----------|-----------|
| `users` | `/users/{userId}` | Perfiles de usuario extendidos | ✅ Implementado |
| `products` | `/products/{productId}` | Catálogo de productos | 🔴 Alta |
| `orders` | `/orders/{orderId}` | Gestión de pedidos | 🔴 Alta |
| `campaigns` | `/campaigns/{campaignId}` | Campañas de marketing | 🔴 Alta |
| `metrics` | `/metrics/{userId}` | Métricas del dashboard | 🔴 Alta |
| `customers` | `/customers/{customerId}` | Datos de clientes | 🟡 Media |
| `inventory` | `/inventory/{productId}` | Control de stock | 🟡 Media |
| `affiliates` | `/affiliates/{affiliateId}` | Programa de afiliados | 🟡 Media |
| `activities` | `/activities/{activityId}` | Feed de actividades | 🟡 Media |
| `demographics` | `/demographics/{userId}` | Análisis demográfico | 🟢 Baja |
| `interactions` | `/interactions/{interactionId}` | Interacciones sociales | 🟢 Baja |
| `settings` | `/settings/{userId}` | Configuración de app | 🟢 Baja |
| `navigation_config` | `/navigation_config/global` | Configuración de navegación | 🟢 Baja |
| `ui_content` | `/ui_content/{section}` | Contenido de interfaz | 🟢 Baja |
| `form_defaults` | `/form_defaults/{formType}` | Valores por defecto | 🟢 Baja |
| `filters` | `/filters/{section}` | Opciones de filtros | 🟢 Baja |
| `notifications` | `/notifications/{userId}` | Sistema de notificaciones | 🟡 Media |
| `analytics_config` | `/analytics_config/global` | Configuración de analytics | 🟢 Baja |
| `onboarding_options` | `/onboarding_options/global` | Opciones de onboarding | 🟢 Baja |
| `financial_data` | `/financial_data/{userId}` | Datos financieros | 🟡 Media |
| `withdrawal_requests` | `/withdrawal_requests/{requestId}` | Solicitudes de retiro | 🟡 Media |
| `link_performance` | `/link_performance/{linkId}` | Rendimiento de enlaces | 🟢 Baja |
| `chart_data` | `/chart_data/{userId}` | Datos para gráficos | 🟡 Media |

### 1.2 Relaciones entre Colecciones

```
users (1) ──── (n) products
users (1) ──── (n) orders
users (1) ──── (n) campaigns
users (1) ──── (1) metrics
users (1) ──── (n) activities

products (1) ──── (n) inventory
products (n) ──── (n) orders [order_items]
products (n) ──── (n) campaigns [campaign_products]

orders (1) ──── (n) customers
customers (1) ──── (n) interactions

campaigns (1) ──── (n) affiliates
affiliates (1) ──── (n) withdrawal_requests
```

### 1.3 Variables de Usuario Integradas

**Variables existentes en AuthContext:**
```typescript
const userVariables = {
  userId: "string",
  email: "string", 
  fullName: "string",
  username: "string",
  hasStore: "boolean",
  storeType: "'online' | 'physical' | 'both'",
  productTypes: "string[]",
  onboardingCompleted: "boolean",
  createdAt: "Timestamp"
};
```

**Variables adicionales requeridas:**
```typescript
const extendedUserVariables = {
  // Perfil de marca
  brandName: "string",
  brandLogo: "string",
  brandBanner: "string",
  brandBio: "string",
  brandLocation: "string",
  
  // Métricas básicas
  totalProducts: "number",
  totalOrders: "number", 
  totalRevenue: "number",
  totalFollowers: "number",
  
  // Configuración
  isActive: "boolean",
  subscription: "'free' | 'premium'",
  lastLoginAt: "Timestamp"
};
```

---

## 2. Análisis por Sección

### 2.1 Gestión de Productos (Prioridad Alta)

#### Análisis Actual
**Archivos afectados:**
- `src/screens/products/ProductsListScreen.tsx` (líneas 29-63)
- `src/screens/products/AddEditProductScreen.tsx`
- `src/screens/products/ProductDetailScreen.tsx`

**Datos hardcodeados:**
```typescript
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Zapatillas running adidas',
    description: 'Zapatillas deportivas para correr',
    images: ['https://via.placeholder.com/60'],
    price: 89.99,
    collection: 'Verano 2025',
    category: 'Deporte',
    status: 'active',
    variants: [
      { id: '1', type: 'size', name: 'Talla', value: 'S', stock: 10 },
      { id: '2', type: 'size', name: 'Talla', value: 'M', stock: 15 },
    ],
    totalStock: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  // ... más productos
];
```

#### Propuesta Firebase

**Colección:** `products`
```javascript
// /products/{productId}
{
  id: "string", // Auto-generado
  userId: "string", // Referencia al propietario
  name: "string",
  description: "string",
  images: "string[]", // URLs de Cloud Storage
  price: "number",
  collection: "string",
  category: "string",
  status: "'active' | 'inactive' | 'draft'",
  variants: {
    id: "string",
    type: "'size' | 'color' | 'style'",
    name: "string", 
    value: "string",
    stock: "number",
    priceModifier: "number" // Precio adicional/descuento
  }[],
  totalStock: "number", // Calculado automáticamente
  views: "number",
  likes: "number",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

**Colección relacionada:** `inventory`
```javascript
// /inventory/{productId}
{
  productId: "string",
  userId: "string",
  currentStock: "number",
  reservedStock: "number", // Stock en órdenes pendientes
  minStockAlert: "number",
  maxStock: "number",
  lastRestockDate: "timestamp",
  stockMovements: {
    date: "timestamp",
    type: "'sale' | 'restock' | 'adjustment'",
    quantity: "number",
    reason: "string"
  }[]
}
```

#### Código de Ejemplo

**Hook personalizado:**
```typescript
// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export const useProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'products'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await addDoc(collection(db, 'products'), {
        ...productData,
        userId: user?.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    try {
      await updateDoc(doc(db, 'products', productId), {
        ...updates,
        updatedAt: new Date()
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct
  };
};
```

**Componente actualizado:**
```typescript
// ProductsListScreen.tsx - Transformación
// ANTES (hardcodeado)
const [products] = useState(mockProducts);

// DESPUÉS (dinámico)
const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts();

// En el render:
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
```

#### Consideraciones Especiales
- **Subida de imágenes**: Integrar Cloud Storage para imágenes de productos
- **Optimización**: Implementar paginación para catálogos grandes
- **Búsqueda**: Configurar índices compuestos para filtros múltiples
- **Caché offline**: Almacenar productos recientes para visualización offline

---

### 2.2 Gestión de Pedidos (Prioridad Alta)

#### Análisis Actual
**Archivos afectados:**
- `src/screens/orders/OrdersListScreen.tsx` (líneas 33-116)
- `src/screens/orders/AddEditOrderScreen.tsx`
- `src/screens/orders/OrderDetailScreen.tsx`

**Datos hardcodeados:**
```typescript
const mockOrders: Order[] = [
  {
    id: '1234',
    customer: {
      id: '1',
      name: 'Arthuro Lopez',
      email: 'arthuro.lopez@email.com',
      avatar: 'https://via.placeholder.com/60',
    },
    items: [
      {
        productId: '1',
        productName: 'Zapatillas running adidas',
        quantity: 2,
        price: 89.99,
        total: 179.98,
      }
    ],
    subtotal: 299.98,
    discount: 0,
    total: 299.98,
    status: 'preparing',
    paymentStatus: 'paid',
    createdAt: new Date('2025-01-01T09:12:00'),
    updatedAt: new Date(),
  }
  // ... más pedidos
];
```

#### Propuesta Firebase

**Colección:** `orders`
```javascript
// /orders/{orderId}
{
  id: "string", // Auto-generado
  userId: "string", // Propietario de la tienda
  customerId: "string", // Referencia al cliente
  orderNumber: "string", // Número único de pedido
  items: {
    productId: "string",
    productName: "string",
    variantId: "string",
    quantity: "number",
    unitPrice: "number",
    total: "number"
  }[],
  subtotal: "number",
  taxes: "number",
  discount: "number",
  shipping: "number",
  total: "number",
  status: "'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'",
  paymentStatus: "'pending' | 'paid' | 'failed' | 'refunded'",
  paymentMethod: "string",
  shippingAddress: {
    street: "string",
    city: "string",
    state: "string",
    zipCode: "string",
    country: "string"
  },
  notes: "string",
  trackingNumber: "string",
  createdAt: "timestamp",
  updatedAt: "timestamp",
  deliveredAt: "timestamp"
}
```

**Colección:** `customers`
```javascript
// /customers/{customerId}
{
  id: "string",
  userId: "string", // A qué tienda pertenece
  name: "string",
  email: "string",
  phone: "string",
  avatar: "string",
  addresses: {
    id: "string",
    isDefault: "boolean",
    label: "'home' | 'work' | 'other'",
    street: "string",
    city: "string",
    state: "string",
    zipCode: "string"
  }[],
  totalOrders: "number",
  totalSpent: "number",
  avgOrderValue: "number",
  lastOrderDate: "timestamp",
  status: "'active' | 'inactive'",
  tags: "string[]",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

#### Código de Ejemplo

**Hook personalizado:**
```typescript
// src/hooks/useOrders.ts
export const useOrders = (status?: OrderStatus) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    let q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    if (status) {
      q = query(q, where('status', '==', status));
    }

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(ordersData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user, status]);

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        updatedAt: new Date(),
        ...(newStatus === 'delivered' && { deliveredAt: new Date() })
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { orders, loading, error, updateOrderStatus };
};
```

---

### 2.3 Dashboard de Métricas (Prioridad Alta)

#### Análisis Actual
**Archivos afectados:**
- `src/screens/main/HomeScreen.tsx` (líneas 63-138)
- `src/screens/metrics/MetricsDashboardScreen.tsx`

**Datos hardcodeados:**
```typescript
// HomeScreen - Métricas del dashboard
<MetricCard
  title="Ingresos de hoy"
  value="$2,450"
  subtitle="+12% vs ayer"
  icon="trending-up"
  color="#4ADE80"
/>

const activityItems = [
  { text: "Nuevo pedido recibido", time: "Hace 5 minutos" },
  { text: "Nuevo seguidor", time: "Hace 20 minutos" }
];
```

#### Propuesta Firebase

**Colección:** `metrics`
```javascript
// /metrics/{userId}
{
  userId: "string",
  date: "string", // YYYY-MM-DD para métricas diarias
  revenue: {
    today: "number",
    yesterday: "number",
    thisMonth: "number",
    lastMonth: "number",
    growth: "number" // Porcentaje de crecimiento
  },
  orders: {
    today: "number",
    yesterday: "number", 
    thisMonth: "number",
    pending: "number",
    completed: "number"
  },
  products: {
    total: "number",
    active: "number",
    lowStock: "number"
  },
  customers: {
    total: "number",
    new: "number",
    returning: "number"
  },
  interactions: {
    likes: "number",
    comments: "number",
    shares: "number",
    views: "number"
  },
  updatedAt: "timestamp"
}
```

**Colección:** `activities`
```javascript
// /activities/{activityId}
{
  id: "string",
  userId: "string",
  type: "'order' | 'product' | 'customer' | 'payment' | 'interaction'",
  title: "string",
  description: "string",
  metadata: {
    orderId: "string",
    productId: "string", 
    customerId: "string",
    amount: "number"
  },
  createdAt: "timestamp"
}
```

#### Código de Ejemplo

**Hook personalizado:**
```typescript
// src/hooks/useMetrics.ts
export const useMetrics = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Suscripción a métricas
    const metricsRef = doc(db, 'metrics', user.uid);
    const unsubscribeMetrics = onSnapshot(metricsRef, (doc) => {
      if (doc.exists()) {
        setMetrics({ id: doc.id, ...doc.data() } as Metrics);
      }
    });

    // Suscripción a actividades recientes
    const activitiesQuery = query(
      collection(db, 'activities'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const unsubscribeActivities = onSnapshot(activitiesQuery, (snapshot) => {
      const activitiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Activity[];
      setActivities(activitiesData);
      setLoading(false);
    });

    return () => {
      unsubscribeMetrics();
      unsubscribeActivities();
    };
  }, [user]);

  return { metrics, activities, loading };
};
```

---

### 2.4 Gestión de Campañas (Prioridad Alta)

#### Análisis Actual
**Archivo afectado:**
- `src/screens/campaigns/CampaignsScreen.tsx` (líneas 62-99)

**Datos hardcodeados:**
```typescript
const campaignsData: Campaign[] = [
  {
    id: 1,
    marca: "Complor",
    comision: "$18 USD/10%",
    imagen: "https://via.placeholder.com/150x100/333/fff?text=Complor"
  }
  // ... más campañas
];
```

#### Propuesta Firebase

**Colección:** `campaigns`
```javascript
// /campaigns/{campaignId}
{
  id: "string",
  userId: "string", // Propietario de la campaña
  name: "string",
  brand: "string",
  description: "string",
  image: "string", // URL de Cloud Storage
  commission: {
    type: "'fixed' | 'percentage'",
    value: "number",
    currency: "string"
  },
  status: "'active' | 'inactive' | 'draft' | 'ended'",
  startDate: "timestamp",
  endDate: "timestamp",
  targetAudience: "string[]",
  goals: {
    sales: "number",
    clicks: "number",
    conversions: "number"
  },
  performance: {
    totalSales: "number",
    totalClicks: "number", 
    totalConversions: "number",
    revenue: "number"
  },
  affiliates: "string[]", // IDs de afiliados participantes
  products: "string[]", // IDs de productos incluidos
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

---

### 2.5 Perfil de Usuario y Marca (Prioridad Media)

#### Análisis Actual
**Archivo afectado:**
- `src/screens/profile/ProfileScreen.tsx` (líneas 236-268)

**Datos hardcodeados:**
```typescript
const userProfile = {
  name: "Agostina Perez",
  handle: "@agostinabelenperez",
  location: "Misiones, Argentina.",
  bio: "CEO @ToFit - Asesora de imagen. Te ayudo a potenciar tu imagen!",
  stats: {
    followers: "10K",
    following: "1K", 
    posts: "50"
  },
  avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face",
  banner: "https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop"
};
```

#### Propuesta Firebase

**Extensión de la colección `users`:**
```javascript
// /users/{userId} - Campos adicionales
{
  // ... campos existentes ...
  
  // Perfil público
  handle: "string", // @username
  bio: "string",
  location: "string",
  website: "string",
  avatar: "string", // URL de Cloud Storage
  banner: "string", // URL de Cloud Storage
  
  // Estadísticas sociales
  stats: {
    followers: "number",
    following: "number",
    posts: "number",
    likes: "number",
    views: "number"
  },
  
  // Configuración de privacidad
  isPrivate: "boolean",
  allowMessages: "boolean",
  showEmail: "boolean",
  
  // Verificación
  isVerified: "boolean",
  verificationBadge: "string"
}
```

---

## 3. Plan de Implementación

### 3.1 Fases de Desarrollo

#### **Fase 1: Datos Críticos del Negocio (4-5 semanas)**
1. **Semana 1-2**: Productos y Inventario
   - Implementar hooks `useProducts`, `useInventory`
   - Migrar ProductsListScreen, AddEditProductScreen
   - Configurar Cloud Storage para imágenes
   - Implementar reglas de seguridad

2. **Semana 3-4**: Pedidos y Clientes
   - Implementar hooks `useOrders`, `useCustomers`
   - Migrar OrdersListScreen, AddEditOrderScreen
   - Sistema de estados de pedidos
   - Notificaciones en tiempo real

3. **Semana 5**: Dashboard en Tiempo Real
   - Implementar hook `useMetrics`
   - Conectar HomeScreen con datos reales
   - Feed de actividades dinámico

#### **Fase 2: Analytics y Campañas (2-3 semanas)**
4. **Semana 6-7**: Campañas y Afiliados
   - Implementar sistema de campañas
   - Gestión de afiliados y comisiones
   - Tracking de rendimiento

5. **Semana 8**: Analytics Avanzados
   - Métricas demográficas
   - Análisis de interacciones
   - Reportes personalizados

#### **Fase 3: Configuración y UX (1-2 semanas)**
6. **Semana 9**: Configuración Dinámica
   - Navegación configurable
   - Contenido de UI dinámico
   - Filtros y opciones

7. **Semana 10**: Optimización y Testing
   - Caché offline
   - Optimización de rendimiento
   - Testing integral

### 3.2 Orden de Prioridad

**🔴 Prioridad Alta - Crítica para el negocio:**
1. Gestión de Productos (`useProducts`)
2. Gestión de Pedidos (`useOrders`)
3. Dashboard de Métricas (`useMetrics`)
4. Sistema de Clientes (`useCustomers`)

**🟡 Prioridad Media - Funcionalidad extendida:**
5. Gestión de Campañas (`useCampaigns`)
6. Sistema de Afiliados (`useAffiliates`)
7. Control de Inventario (`useInventory`)
8. Analytics Demográficos (`useDemographics`)

**🟢 Prioridad Baja - Configuración y personalización:**
9. Configuración de UI (`useUIConfig`)
10. Contenido dinámico (`useContent`)
11. Filtros configurables (`useFilters`)
12. Opciones de onboarding (`useOnboardingConfig`)

### 3.3 Dependencias

```
useAuth (✅ Implementado)
    ↓
useProducts → useInventory
    ↓
useOrders → useCustomers
    ↓
useMetrics → useAnalytics
    ↓
useCampaigns → useAffiliates
```

---

## 4. Código Base Recomendado

### 4.1 Hooks Personalizados

#### Estructura de carpetas propuesta:
```
src/
└── hooks/
    ├── useAuth.ts (✅ Implementado en context)
    ├── useProducts.ts
    ├── useOrders.ts
    ├── useCustomers.ts
    ├── useMetrics.ts
    ├── useCampaigns.ts
    ├── useAffiliates.ts
    ├── useInventory.ts
    ├── useActivities.ts
    ├── useSettings.ts
    └── useFirestore.ts (hook genérico)
```

#### Hook genérico para Firestore:
```typescript
// src/hooks/useFirestore.ts
import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  QueryConstraint 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export function useFirestore<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), ...constraints);
    
    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        setData(items);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, constraints]);

  const create = async (itemData: Omit<T, 'id'>) => {
    try {
      await addDoc(collection(db, collectionName), {
        ...itemData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const update = async (id: string, updates: Partial<T>) => {
    try {
      await updateDoc(doc(db, collectionName, id), {
        ...updates,
        updatedAt: new Date()
      });
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    create,
    update,
    remove
  };
}
```

### 4.2 Utilidades Firebase

#### Estructura propuesta:
```
src/
└── utils/
    ├── firestore.ts
    ├── storage.ts
    ├── analytics.ts
    └── constants.ts
```

#### Utilidades de Firestore:
```typescript
// src/utils/firestore.ts
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';

export const firestoreUtils = {
  // Incrementar contadores atómicamente
  incrementCounter: async (
    collection: string, 
    docId: string, 
    field: string, 
    value: number = 1
  ) => {
    await updateDoc(doc(db, collection, docId), {
      [field]: increment(value),
      updatedAt: new Date()
    });
  },

  // Obtener o crear documento
  getOrCreate: async <T>(
    collection: string,
    docId: string,
    defaultData: Partial<T>
  ) => {
    const docRef = doc(db, collection, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    } else {
      const newData = {
        ...defaultData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await setDoc(docRef, newData);
      return { id: docId, ...newData } as T;
    }
  },

  // Batch de updates
  batchUpdate: async (updates: Array<{
    collection: string;
    id: string;
    data: any;
  }>) => {
    const batch = writeBatch(db);
    updates.forEach(({ collection, id, data }) => {
      const docRef = doc(db, collection, id);
      batch.update(docRef, { ...data, updatedAt: new Date() });
    });
    await batch.commit();
  }
};
```

#### Utilidades de Cloud Storage:
```typescript
// src/utils/storage.ts
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';

export const storageUtils = {
  // Subir imagen
  uploadImage: async (
    file: Blob | File, 
    path: string,
    fileName?: string
  ): Promise<string> => {
    const finalFileName = fileName || `${Date.now()}_${Math.random()}`;
    const storageRef = ref(storage, `${path}/${finalFileName}`);
    
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  },

  // Eliminar imagen
  deleteImage: async (imageUrl: string) => {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  },

  // Subir múltiples imágenes
  uploadMultipleImages: async (
    files: (Blob | File)[],
    path: string
  ): Promise<string[]> => {
    const uploadPromises = files.map((file, index) =>
      storageUtils.uploadImage(file, path, `image_${index}_${Date.now()}`)
    );
    return await Promise.all(uploadPromises);
  }
};
```

### 4.3 Componentes Genéricos

#### LoadingSpinner:
```typescript
// src/components/ui/LoadingSpinner.tsx
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando...',
  size = 'large',
  color = '#007AFF'
}) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});
```

#### ErrorMessage:
```typescript
// src/components/ui/ErrorMessage.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  retryText = 'Reintentar'
}) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>{message}</Text>
    {onRetry && (
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>{retryText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});
```

---

## 5. Documentación Técnica

### 5.1 Reglas de Firestore

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios - Solo acceso propio
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Productos - Solo propietario
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                   request.auth.uid == resource.data.userId;
    }
    
    // Pedidos - Solo propietario de la tienda
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
                         request.auth.uid == resource.data.userId;
    }
    
    // Clientes - Solo visible para el propietario de la tienda
    match /customers/{customerId} {
      allow read, write: if request.auth != null && 
                         request.auth.uid == resource.data.userId;
    }
    
    // Métricas - Solo propietario
    match /metrics/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Actividades - Solo propietario
    match /activities/{activityId} {
      allow read, write: if request.auth != null && 
                         request.auth.uid == resource.data.userId;
    }
    
    // Campañas - Solo propietario
    match /campaigns/{campaignId} {
      allow read, write: if request.auth != null && 
                         request.auth.uid == resource.data.userId;
    }
    
    // Configuración global - Solo lectura
    match /navigation_config/{doc} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                   request.auth.token.admin == true;
    }
    
    match /ui_content/{doc} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                   request.auth.token.admin == true;
    }
  }
}
```

### 5.2 Reglas de Cloud Storage

```javascript
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Imágenes de usuario
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Imágenes de productos
    match /products/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Imágenes de campañas
    match /campaigns/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Recursos públicos (íconos, assets)
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
                   request.auth.token.admin == true;
    }
  }
}
```

### 5.3 Índices Recomendados

```javascript
// Firestore Indexes (crear desde consola)
// Colección: products
{
  fields: [
    { fieldPath: "userId", order: "ASCENDING" },
    { fieldPath: "status", order: "ASCENDING" },
    { fieldPath: "createdAt", order: "DESCENDING" }
  ]
}

// Colección: orders
{
  fields: [
    { fieldPath: "userId", order: "ASCENDING" },
    { fieldPath: "status", order: "ASCENDING" },
    { fieldPath: "createdAt", order: "DESCENDING" }
  ]
}

// Colección: activities  
{
  fields: [
    { fieldPath: "userId", order: "ASCENDING" },
    { fieldPath: "createdAt", order: "DESCENDING" }
  ]
}

// Colección: customers
{
  fields: [
    { fieldPath: "userId", order: "ASCENDING" },
    { fieldPath: "status", order: "ASCENDING" },
    { fieldPath: "totalSpent", order: "DESCENDING" }
  ]
}
```

### 5.4 Optimizaciones

#### Paginación:
```typescript
// src/hooks/usePaginatedFirestore.ts
export const usePaginatedFirestore = <T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
  pageSize: number = 20
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    let q = query(
      collection(db, collectionName),
      ...constraints,
      limit(pageSize)
    );
    
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    const snapshot = await getDocs(q);
    const newItems = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
    
    setData(prev => [...prev, ...newItems]);
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    setHasMore(newItems.length === pageSize);
    setLoading(false);
  };

  return { data, loading, hasMore, loadMore };
};
```

#### Caché Offline:
```typescript
// src/utils/offline.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const offlineCache = {
  set: async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  },

  get: async <T>(key: string, maxAge: number = 300000): Promise<T | null> => {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < maxAge) {
          return data;
        }
      }
      return null;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  },

  clear: async (key?: string) => {
    try {
      if (key) {
        await AsyncStorage.removeItem(key);
      } else {
        await AsyncStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
};
```

---

## 6. Testing y Validación

### 6.1 Casos de Prueba

#### Testing de Hooks:
```typescript
// src/hooks/__tests__/useProducts.test.ts
import { renderHook, waitFor } from '@testing-library/react-native';
import { useProducts } from '../useProducts';

// Mock Firebase
jest.mock('../config/firebase', () => ({
  db: {},
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn()
}));

describe('useProducts', () => {
  it('should load products successfully', async () => {
    const { result } = renderHook(() => useProducts());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.products).toHaveLength(0);
    });
  });

  it('should create product successfully', async () => {
    const { result } = renderHook(() => useProducts());
    
    const newProduct = {
      name: 'Test Product',
      price: 99.99,
      description: 'Test Description'
    };

    await result.current.createProduct(newProduct);
    
    // Verificar que el producto se creó
    expect(result.current.error).toBeNull();
  });
});
```

### 6.2 Validación de Datos

#### Esquemas de validación:
```typescript
// src/utils/validation.ts
import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  price: yup.number().required('El precio es obligatorio').min(0, 'El precio debe ser positivo'),
  description: yup.string().required('La descripción es obligatoria'),
  category: yup.string().required('La categoría es obligatoria'),
  images: yup.array().of(yup.string()).min(1, 'Al menos una imagen es requerida')
});

export const orderSchema = yup.object().shape({
  customerId: yup.string().required('El cliente es obligatorio'),
  items: yup.array().of(
    yup.object().shape({
      productId: yup.string().required(),
      quantity: yup.number().min(1).required(),
      price: yup.number().min(0).required()
    })
  ).min(1, 'Al menos un producto es requerido'),
  total: yup.number().min(0).required()
});

export const campaignSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  brand: yup.string().required('La marca es obligatoria'),
  startDate: yup.date().required('Fecha de inicio requerida'),
  endDate: yup.date().min(yup.ref('startDate'), 'Debe ser posterior a fecha de inicio'),
  commission: yup.object().shape({
    type: yup.string().oneOf(['fixed', 'percentage']).required(),
    value: yup.number().min(0).required()
  })
});
```

### 6.3 Manejo de Errores

#### Error Boundary:
```typescript
// src/components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Aquí podrías enviar el error a un servicio de monitoreo
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>¡Oops! Algo salió mal</Text>
          <Text style={styles.message}>
            Ha ocurrido un error inesperado. Por favor, reinicia la aplicación.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ hasError: false })}
          >
            <Text style={styles.buttonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
```

#### Custom Error Hook:
```typescript
// src/hooks/useError.ts
import { useState } from 'react';

export const useError = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    let message = 'Ha ocurrido un error inesperado';
    
    if (err?.code) {
      switch (err.code) {
        case 'auth/user-not-found':
          message = 'Usuario no encontrado';
          break;
        case 'auth/wrong-password':
          message = 'Contraseña incorrecta';
          break;
        case 'permission-denied':
          message = 'No tienes permisos para realizar esta acción';
          break;
        case 'unavailable':
          message = 'Servicio no disponible. Inténtalo más tarde';
          break;
        default:
          message = err.message || message;
      }
    } else if (err?.message) {
      message = err.message;
    }
    
    setError(message);
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
};
```

---

## 7. Conclusiones y Próximos Pasos

### 7.1 Resumen de Beneficios

**Implementar esta arquitectura Firebase proporcionará:**

1. **Escalabilidad**: Sistema que crece con el negocio
2. **Tiempo Real**: Actualizaciones instantáneas en todos los dispositivos  
3. **Seguridad**: Reglas robustas de acceso a datos
4. **Offline**: Funcionalidad sin conexión con sincronización automática
5. **Performance**: Consultas optimizadas y caché inteligente
6. **Mantenibilidad**: Código organizado y reutilizable
7. **Analytics**: Métricas detalladas del negocio en tiempo real

### 7.2 Métricas de Éxito

**KPIs para medir el éxito de la implementación:**

- **Tiempo de respuesta**: < 2 segundos para cargar datos
- **Disponibilidad offline**: 90% de funcionalidades accesibles sin internet
- **Sincronización**: Datos actualizados en < 5 segundos
- **Escalabilidad**: Soporte para 10,000+ productos por usuario
- **Seguridad**: 0 vulnerabilidades de acceso a datos
- **Mantenibilidad**: 50% reducción en tiempo de desarrollo de nuevas features

### 7.3 Próximos Pasos

**Acción inmediata recomendada:**

1. **Implementar Fase 1** (Productos y Pedidos) - Máximo impacto
2. **Configurar monitoreo** con Firebase Analytics y Crashlytics
3. **Establecer CI/CD** para reglas de Firebase y índices
4. **Training del equipo** en hooks y patrones de Firebase
5. **Documentar APIs** y contratos de datos

### 7.4 Consideraciones de Costos

**Estimación de costos Firebase (mensual):**

- **Firestore**: ~$0.18 por 100K lecturas, $0.54 por 100K escrituras
- **Storage**: ~$0.026 por GB almacenado
- **Auth**: Gratuito hasta 10K MAU
- **Functions**: ~$0.40 por millón de invocaciones

**Para una tienda promedio (1000 productos, 500 pedidos/mes):**
- Costo estimado: $15-30 USD/mes
- Escalable según uso real

---

**🎯 Con esta implementación, transformarás completamente tu aplicación de datos estáticos a un sistema dinámico, escalable y profesional que rivaliza con las mejores plataformas de e-commerce del mercado.**

---

*Documento generado el: 21 de enero, 2025*  
*Versión: 1.0*  
*Autor: Claude Code Assistant*