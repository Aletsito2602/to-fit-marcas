# 🔥 Firebase Architecture - ToFit Marcas

## 📋 Índice
1. [Configuración General](#configuración-general)
2. [Autenticación y Contexto de Usuario](#autenticación-y-contexto-de-usuario)
3. [Manejo de Productos](#manejo-de-productos)
4. [Sistema de Tiendas](#sistema-de-tiendas)
5. [Estructura de Datos Firestore](#estructura-de-datos-firestore)
6. [Patrones de Consulta y Filtrado](#patrones-de-consulta-y-filtrado)
7. [Suscripciones en Tiempo Real](#suscripciones-en-tiempo-real)
8. [Manejo de Errores](#manejo-de-errores)
9. [Optimizaciones y Rendimiento](#optimizaciones-y-rendimiento)

---

## 🔧 Configuración General

### Archivo: `src/config/firebase.ts`

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyAcFn-pv2TQquSoBjainZ6kIfX4OSwxcK0",
  authDomain: "to-fit.firebaseapp.com",
  projectId: "to-fit",
  storageBucket: "to-fit.firebasestorage.app",
  messagingSenderId: "159172611530",
  appId: "1:159172611530:ios:4ccb54ba040ae3bc815333",
  databaseURL: "https://to-fit-default-rtdb.firebaseio.com"
};
```

### Servicios Inicializados:
- **Auth**: `initializeAuth()` con persistencia AsyncStorage para React Native
- **Firestore**: `getFirestore()` para base de datos NoSQL
- **Storage**: `getStorage()` para almacenamiento de archivos

**Características clave:**
- Persistencia de autenticación offline con AsyncStorage
- Configuración optimizada para React Native
- Soporte para múltiples servicios Firebase

---

## 👤 Autenticación y Contexto de Usuario

### Archivo: `src/contexts/AuthContext.tsx`

### Funcionamiento del AuthContext:

#### 1. **Estado del Usuario**
```typescript
const [user, setUser] = useState<any | null>(null);
const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
```

#### 2. **Carga de Datos del Usuario**
```typescript
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // 1. Obtener datos adicionales desde Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      // 2. Combinar datos de Auth + Firestore
      const userWithDefaults = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        ...userData,
        // URLs por defecto si no existen
        photo_url: userData.photo_url || 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face',
        portada: userData.portada || 'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop',
        onboardingCompleted: userData.onboardingCompleted !== false,
      };
    }
  });
}, []);
```

#### 3. **Funciones de Autenticación**
- `signIn()`: Login con email/password
- `signUp()`: Registro con datos adicionales en Firestore
- `logout()`: Cierre de sesión

**Características importantes:**
- **Datos híbridos**: Combina Firebase Auth + Firestore Users
- **URLs por defecto**: Asigna imágenes placeholder automáticamente
- **Persistencia**: Mantiene sesión entre reinicios de app
- **Fallback**: Crea usuarios básicos si no existen en Firestore

---

## 📦 Manejo de Productos

### Archivo: `src/hooks/useProducts.ts`

### Interfaz FirebaseProduct:
```typescript
export interface FirebaseProduct {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: string;
  tienda: string;
  id_tienda: string;    // ← Campo clave para filtrado
  logo_tienda: string;
  color: string[];
  talles: string[];
  portada: string;
  likes: string[];
  fecha_creado: any;
}
```

### Consultas de Productos:

#### 1. **Filtrado por Tienda**
```typescript
// Cuando userIdTienda está presente
productsQuery = query(
  collection(db, 'productos'),
  where('id_tienda', '==', userIdTienda),
  orderBy('fecha_creado', 'desc'),
  limit(100)
);
```

#### 2. **Todos los Productos**
```typescript
// Cuando userIdTienda es null/undefined
productsQuery = query(
  collection(db, 'productos'),
  orderBy('fecha_creado', 'desc'),
  limit(100)
);
```

### Suscripción en Tiempo Real:
```typescript
const unsubscribe = onSnapshot(productsQuery,
  (snapshot) => {
    const productsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseProduct[];
    
    setProducts(productsData);
    // Calcular estadísticas automáticamente
    const stats = {
      total: productsData.length,
      active: productsData.length,
      outOfStock: 0
    };
    setProductStats(stats);
  }
);
```

### Manejo de Fallback para Índices:
```typescript
// Si el error es por índice en construcción
if (err.message && err.message.includes('index is currently building')) {
  // Cargar todos los productos y filtrar en cliente
  const fallbackQuery = query(
    collection(db, 'productos'),
    orderBy('fecha_creado', 'desc'),
    limit(100)
  );
  
  // Filtrar en cliente si tenemos userIdTienda
  if (userIdTienda) {
    fallbackData = fallbackData.filter(product => product.id_tienda === userIdTienda);
  }
}
```

### Función de Filtrado:
```typescript
const filterProducts = (products: FirebaseProduct[], searchText: string, filter: string) => {
  return products.filter(product => {
    const nombre = product.nombre || '';
    const descripcion = product.descripcion || '';
    const tienda = product.tienda || '';
    
    const matchesSearch = nombre.toLowerCase().includes(searchText.toLowerCase()) ||
                        descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
                        tienda.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFilter = filter === 'Todos' || 
      (filter === 'Activos') || 
      (filter === 'Sin stock');
    
    return matchesSearch && matchesFilter;
  });
};
```

---

## 🏪 Sistema de Tiendas

### 1. Hook de Tienda Actual: `src/hooks/useTiendaActual.ts`

```typescript
export interface TiendaData {
  id: string;
  alias_marca: string;
  id_marca: string;
  logo: string;
  nombre: string;
  seguidores: string[];
}
```

#### Flujo de Carga:
```typescript
const cargarTienda = async () => {
  // 1. Obtener id_tienda del usuario autenticado
  const userIdTienda = user?.id_tienda || null;
  
  // 2. Buscar marca que coincida con id_tienda
  const marcasRef = collection(db, 'marcas');
  const q = query(marcasRef, where('id_marca', '==', userIdTienda));
  
  // 3. Obtener datos de la marca
  const querySnapshot = await getDocs(q);
  const marcaData = {
    id: marcaDoc.id,
    ...marcaDoc.data()
  } as TiendaData;
};
```

### 2. Hook Mi Tienda: `src/screens/store/hooks/useMiTienda.ts`

#### Integración de Hooks:
```typescript
// Combina useProducts + useTiendaActual
const { 
  products: productos, 
  loading: loadingProductos, 
  error: errorProductos,
  refreshProducts 
} = useProducts(userIdTienda);

const { 
  tienda, 
  loading: loadingTienda, 
  error: errorTienda,
  refreshTienda 
} = useTiendaActual();
```

#### Transformación de Datos:
```typescript
const convertirProducto = (producto: FirebaseProduct) => ({
  id: producto.id,
  nombre: producto.nombre,
  precio: parseFloat(producto.precio?.toString().replace(/[^0-9.,]/g, '').replace(',', '.')) || 0,
  imagen: producto.portada || 'https://via.placeholder.com/175x210',
  categoria: producto.categoria,
  likes: producto.likes || [],
  disponible: true,
  stock: 10 // Mock stock
});
```

#### Categorización Automática:
```typescript
const productosDestacados = productos.slice(0, 2);
const productosSugeridos = productos.slice(2, 6);
const productosGeneral = productos.slice(6);
```

---

## 🗄️ Estructura de Datos Firestore

### Colecciones Principales:

#### 1. **users** (Usuarios)
```typescript
{
  id: string,                    // UID de Firebase Auth
  email: string,
  fullName: string,
  username: string,
  photo_url: string,             // URL imagen perfil
  portada: string,               // URL imagen portada
  id_tienda: string,             // ← Relación con marcas
  onboardingCompleted: boolean,
  createdAt: Timestamp
}
```

#### 2. **productos** (Productos)
```typescript
{
  id: string,
  nombre: string,
  descripcion: string,
  categoria: string,
  precio: string,
  tienda: string,                // Nombre de la tienda
  id_tienda: string,             // ← Campo para filtrado
  logo_tienda: string,
  color: string[],               // Array de colores
  talles: string[],              // Array de talles
  portada: string,               // URL imagen principal
  likes: string[],               // Array de UIDs que dieron like
  fecha_creado: Timestamp
}
```

#### 3. **marcas** (Tiendas/Marcas)
```typescript
{
  id: string,
  alias_marca: string,
  id_marca: string,              // ← Relación con users.id_tienda
  logo: string,
  nombre: string,
  seguidores: string[]           // Array de UIDs seguidores
}
```

### Relaciones Clave:
- `users.id_tienda` → `marcas.id_marca`
- `productos.id_tienda` → `marcas.id_marca`
- `productos.likes[]` → `users.id`
- `marcas.seguidores[]` → `users.id`

---

## 🔍 Patrones de Consulta y Filtrado

### 1. **Filtrado por Usuario/Tienda**
```typescript
// Productos de la tienda del usuario autenticado
query(
  collection(db, 'productos'),
  where('id_tienda', '==', user.id_tienda),
  orderBy('fecha_creado', 'desc')
)
```

### 2. **Búsqueda de Tienda por Usuario**
```typescript
// Encontrar marca asociada al usuario
query(
  collection(db, 'marcas'),
  where('id_marca', '==', user.id_tienda)
)
```

### 3. **Limitación y Paginación**
```typescript
// Limitar resultados para rendimiento
query(
  collection(db, 'productos'),
  orderBy('fecha_creado', 'desc'),
  limit(100)
)
```

### 4. **Búsqueda en Cliente**
```typescript
// Filtro combinado: texto + estado
products.filter(product => {
  const matchesSearch = product.nombre.toLowerCase().includes(searchText.toLowerCase());
  const matchesFilter = filter === 'Todos' || filter === 'Activos';
  return matchesSearch && matchesFilter;
});
```

---

## ⚡ Suscripciones en Tiempo Real

### Patrón onSnapshot:
```typescript
const unsubscribe = onSnapshot(
  query(collection(db, 'productos'), where('id_tienda', '==', userIdTienda)),
  (snapshot) => {
    // Procesar cambios en tiempo real
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(products);
  },
  (error) => {
    // Manejo de errores
    console.error('Error en suscripción:', error);
  }
);

// Limpieza al desmontar componente
return () => unsubscribe();
```

### Ventajas:
- **Tiempo Real**: Cambios instantáneos sin refresh
- **Eficiencia**: Solo datos modificados
- **Automático**: No requiere polling manual

---

## ❌ Manejo de Errores

### 1. **Error de Índices en Construcción**
```typescript
if (err.message && err.message.includes('index is currently building')) {
  // Usar consulta fallback sin filtro WHERE
  // Filtrar resultados en cliente temporalmente
}
```

### 2. **Datos Faltantes**
```typescript
// Validación defensiva
const nombre = product.nombre || '';
const color = Array.isArray(product.color) ? product.color : [];
const portada = product.portada || 'https://via.placeholder.com/175x210';
```

### 3. **Estados de Carga**
```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// En cada operación
setLoading(true);
setError(null);
try {
  // Operación Firebase
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
```

### 4. **URLs por Defecto**
```typescript
// En AuthContext para imágenes
photo_url: userData.photo_url || 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face',
portada: userData.portada || 'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop'
```

---

## 🚀 Optimizaciones y Rendimiento

### 1. **Límites de Consulta**
- Máximo 100 productos por consulta
- Paginación implícita con `limit()`

### 2. **Índices Requeridos**
```
productos: id_tienda (ASC), fecha_creado (DESC)
marcas: id_marca (ASC)
```

### 3. **Suscripciones Eficientes**
- Una suscripción por hook
- Cleanup automático en useEffect
- Evitar múltiples listeners simultáneos

### 4. **Caché Local**
- AsyncStorage para persistencia Auth
- Estado local para reducir consultas
- Fallback a datos cached en errores

### 5. **Transformación de Datos**
```typescript
// Transformar solo cuando sea necesario
const convertirProducto = useCallback((producto: FirebaseProduct) => ({
  // ... transformación
}), []);
```

---

## 📁 Arquitectura de Archivos

```
src/
├── config/
│   └── firebase.ts              # Configuración y servicios
├── contexts/
│   └── AuthContext.tsx          # Contexto de autenticación
├── hooks/
│   ├── useProducts.ts           # Hook productos globales
│   └── useTiendaActual.ts       # Hook tienda del usuario
└── screens/store/hooks/
    └── useMiTienda.ts           # Hook específico Mi Tienda
```

### Responsabilidades:

- **firebase.ts**: Inicialización y configuración
- **AuthContext.tsx**: Gestión de usuarios y autenticación
- **useProducts.ts**: CRUD y filtrado de productos
- **useTiendaActual.ts**: Datos de marca/tienda del usuario
- **useMiTienda.ts**: Lógica específica de pantalla Mi Tienda

---

## 🔑 Puntos Clave de la Implementación

1. **Filtrado Basado en Usuario**: Todo el contenido se filtra por `id_tienda` del usuario autenticado
2. **Datos Híbridos**: Combinación de Firebase Auth + Firestore para perfiles completos
3. **Tiempo Real**: Suscripciones onSnapshot para actualizaciones instantáneas
4. **Fallbacks Inteligentes**: Manejo de errores de índices y datos faltantes
5. **Transformación de Datos**: Conversión entre formatos Firebase y UI
6. **Reutilización de Hooks**: Composición de hooks especializados
7. **Persistencia Offline**: AsyncStorage para autenticación y datos críticos

---

## 📊 Métricas y Debug

### Logs Implementados:
```typescript
console.log('=== FILTRO POR TIENDA ===');
console.log('ID de tienda del usuario:', userIdTienda);
console.log(`Total productos encontrados: ${productsData.length}`);
console.log('Usuario cargado desde Firestore:', userData);
```

### Información de Debug:
- Estado de filtros aplicados
- Número de productos cargados
- Estructura de datos de productos
- Errores de índices y fallbacks

Esta documentación cubre toda la implementación actual de Firebase en la aplicación ToFit Marcas, desde la configuración básica hasta los patrones avanzados de consulta y manejo de errores.