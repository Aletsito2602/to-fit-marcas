# 📱 Guía Completa de Posteos - ToFit Marcas

## 📋 Tabla de Contenidos

1. [Introducción](#-introducción)
2. [Tipos de Posteos](#-tipos-de-posteos)
3. [Estructura de Firebase](#-estructura-de-firebase)
4. [Guías Específicas por Tipo](#-guías-específicas-por-tipo)
5. [Esquemas de Datos](#-esquemas-de-datos)
6. [Ejemplos Prácticos](#-ejemplos-prácticos)
7. [Mejores Prácticas](#-mejores-prácticas)
8. [Flujo de Moderación](#-flujo-de-moderación)
9. [Analytics y Métricas](#-analytics-y-métricas)

---

## 🎯 Introducción

**ToFit Marcas** es la plataforma que permite a las marcas de moda crear contenido dinámico que aparece automáticamente en la sección **Tienda** de la app ToFit. Esta guía explica cómo realizar diferentes tipos de posteos para maximizar la visibilidad y engagement.

### 🌟 Características Principales
- **Sistema Dinámico**: Todo el contenido se actualiza en tiempo real
- **Múltiples Formatos**: Colaboraciones, productos, promociones y posts sociales
- **Algoritmos Inteligentes**: Priorización automática basada en engagement
- **Analytics Completos**: Métricas detalladas de performance
- **Moderación Automática**: Sistema de aprobación integrado

---

## 🎨 Tipos de Posteos

### 1. 🎯 **Hero Collections** (Banner Principal)
Colaboraciones destacadas que aparecen en el carousel principal de la tienda.

**Casos de Uso:**
- Colaboraciones exclusivas (ej: "Supreme x Louis Vuitton")
- Lanzamientos de colecciones premium
- Drops limitados y eventos especiales
- Partnerships con influencers top

### 2. 🏪 **Brand Collections** (Marcas Scrollables)
Presencia de marca en la sección horizontal de marcas.

**Casos de Uso:**
- Nuevas colecciones de temporada
- Descuentos y promociones especiales
- Expansión de catálogo de productos
- Rebranding o actualizaciones de imagen

### 3. 🎁 **Featured Stores** (Tiendas Destacadas)
Promociones especiales que destacan tu tienda sobre las demás.

**Casos de Uso:**
- Flash sales y ofertas limitadas
- Eventos especiales (Black Friday, rebajas)
- Lanzamientos de nuevas líneas
- Promociones por temporada

### 4. 📸 **Posts Sociales** (Feed de Influencers)
Contenido estilo Instagram que aparece en el feed social.

**Casos de Uso:**
- Lookbooks y outfits styling
- Behind the scenes del proceso creativo
- User generated content de clientes
- Tendencias y styling tips

---

## 🔥 Estructura de Firebase

### 📊 Colecciones Principales

```
to-fit (Proyecto Firebase)
├── marcas/                    # Información de marcas registradas
├── productos/                 # Catálogo de productos
├── publicaciones/             # Hero Collections y colaboraciones
├── tiendas/                   # Información de tiendas asociadas
├── shop_general_promotions/   # Promociones y Featured Stores
├── posts/                     # Contenido social y looks
├── categorias_tienda/         # Categorías de productos
└── analytics_events/          # Tracking de métricas
```

### 🔑 Permisos y Roles

```javascript
// Roles en la colección 'users'
{
  role: "marca",           // Marca verificada
  status: "active",        // Estado activo
  isVerified: true,        // Verificación oficial
  permissions: [           // Permisos específicos
    "create_products",
    "create_publications", 
    "create_promotions",
    "view_analytics"
  ]
}
```

---

## 📝 Guías Específicas por Tipo

### 1. 🎯 **Hero Collections** - Colaboraciones Destacadas

#### Cuando Usar
- Lanzamientos de colaboraciones exclusivas
- Colecciones premium o de edición limitada
- Partnerships estratégicos con otras marcas
- Eventos especiales y drops importantes

#### Cómo Aparece en la App
- **Ubicación**: Banner principal rotating carousel
- **Prioridad**: Máxima visibilidad (primera sección)
- **Duración**: Configurable, recomendado 7-14 días
- **Formato**: Cards grandes con imagen hero y CTA

#### Proceso de Creación

**Paso 1: Preparar Assets**
```javascript
// Assets requeridos
{
  imagenes: [
    "url_imagen_principal.jpg",    // 1200x600px mínimo
    "url_imagen_secundaria.jpg",   // Opcional para stories
    "url_imagen_mobile.jpg"        // 800x400px para móvil
  ],
  video_url: "url_video.mp4",      // Opcional, max 30 segundos
  brand_logo: "url_logo.png"       // Logo en alta resolución
}
```

**Paso 2: Configurar Metadata**
```javascript
{
  collaboration_name: "Supreme x ToFit Limited",
  button_text: "Ver Colección Exclusiva",
  launch_date: "2024-02-15T00:00:00Z",
  end_date: "2024-03-01T23:59:59Z",
  story_associated: "story_id_123",
  target_audience: ["streetwear", "luxury", "collectors"]
}
```

**Paso 3: Configurar Prioridad**
```javascript
{
  priority: 10,                    // 1-10, donde 10 es máxima prioridad
  isFeatured: true,               // Debe estar en true para Hero
  isActive: true,                 // Estado activo
  region_targeting: ["AR", "CL", "UY"],  // Opcional: segmentación
  age_targeting: [18, 35]         // Opcional: rango de edad
}
```

---

### 2. 🏪 **Brand Collections** - Presencia de Marca

#### Cuando Usar
- Actualizar catálogo de productos regularmente
- Comunicar descuentos y promociones
- Mostrar nuevas líneas o colecciones
- Mantener presencia constante en la tienda

#### Cómo Aparece en la App
- **Ubicación**: Scroll horizontal de marcas
- **Algoritmo**: Ordenado por descuentos > productos > engagement
- **Actualización**: Automática basada en productos activos
- **Formato**: Cards medianas con logo y badge promocional

#### Configuración de Marca

**Información Básica**
```javascript
// Colección: marcas/{marca_id}
{
  nombre: "Zara",
  logo_url: "https://...",
  banner_url: "https://...",
  brand_color: "#000000",
  hasStore: true,                 // Requerido para aparecer
  isActive: true,                 // Estado activo
  latest_collection_name: "Spring 2024",
  season_collection: "primavera"
}
```

**Promociones Automáticas**
```javascript
{
  current_discount: 30,           // % de descuento actual
  discount_expires: "2024-02-28T23:59:59Z",
  promotion_badge: "SALE",        // Badge personalizado
  featured_products: [            // IDs de productos destacados
    "prod_123", "prod_456"
  ]
}
```

**Tienda Asociada**
```javascript
// Colección: tiendas/{tienda_id}
{
  marca_id: "marca_123",
  nombre: "Zara Official Store",
  banner_url: "https://...",
  isActive: true,
  story_id: "story_tienda_123"    // Para stories de tienda
}
```

---

### 3. 🎁 **Featured Stores** - Promociones Destacadas

#### Cuando Usar
- Eventos especiales (Black Friday, Cyber Monday)
- Flash sales y ofertas por tiempo limitado
- Lanzamientos de nuevas tiendas o expansiones
- Promociones estacionales o por fechas especiales

#### Cómo Aparece en la App
- **Ubicación**: Sección "Explora Tiendas" - scroll horizontal
- **Prioridad**: Ordenado por priority > fecha de expiración
- **Máximo**: 4 tiendas destacadas simultáneamente
- **Formato**: Cards grandes con imagen promocional

#### Crear Promoción Destacada

**Información Básica**
```javascript
// Colección: shop_general_promotions/{promo_id}
{
  type: "store_promotion",
  store_id: "tienda_123",
  title: "Mega Sale - Hasta 70% OFF",
  subtitle: "APROVECHÁ AHORA",
  promotion_text: "¡Solo por 48 horas!",
  
  banner_url: "https://...",      // Imagen promocional 800x400px
  priority: 8,                    // 1-10, mayor número = mayor prioridad
  
  isActive: true,
  created_at: "timestamp",
  expires_at: "2024-02-20T23:59:59Z"
}
```

**Configuración Avanzada**
```javascript
{
  discount_percentage: 50,         // % de descuento
  min_purchase_amount: 5000,       // Monto mínimo de compra
  max_discount_amount: 10000,      // Descuento máximo en pesos
  
  target_categories: [             // Categorías aplicables
    "ropa-mujer", "calzado", "accesorios"
  ],
  
  promocode: "MEGA50",             // Código promocional opcional
  terms_and_conditions: "...",     // Términos y condiciones
  
  story_id: "promo_story_123",     // Story asociada opcional
  analytics_tag: "black_friday_2024"  // Tag para tracking
}
```

---

### 4. 📸 **Posts Sociales** - Contenido de Feed

#### Cuando Usar
- Mostrar productos en uso real (lookbooks)
- Compartir behind the scenes
- Crear contenido aspiracional
- Generar engagement con la comunidad

#### Cómo Aparece en la App
- **Ubicación**: Feed principal y sección influencers
- **Algoritmo**: Ordenado por engagement_score
- **Formato**: Posts estilo Instagram con interacciones

#### Crear Post Social

**Post Básico**
```javascript
// Colección: posts/{post_id}
{
  user_id: "marca_user_id",
  type: "look",                    // o "brand_content"
  
  image_url: "https://...",        // Imagen principal
  images: [                        // Múltiples imágenes opcional
    "https://image1.jpg",
    "https://image2.jpg"
  ],
  
  caption: "Nuevo look primavera 🌸 ¿Qué te parece?",
  hashtags: ["#ToFit", "#SpringLook", "#Fashion"],
  
  isActive: true,
  created_at: "timestamp"
}
```

**Post con Productos Etiquetados**
```javascript
{
  products_tagged: [               // IDs de productos etiquetados
    "prod_123", "prod_456", "prod_789"
  ],
  
  product_positions: [             // Posiciones en la imagen
    { product_id: "prod_123", x: 0.3, y: 0.6 },
    { product_id: "prod_456", x: 0.7, y: 0.4 }
  ],
  
  total_look_price: 15000,         // Precio total calculado
  commission_rate: 0.15            // % de comisión para influencer
}
```

**Métricas de Engagement**
```javascript
{
  likes_count: 0,
  comments_count: 0,
  shares_count: 0,
  saves_count: 0,
  
  engagement_score: 0,             // Calculado automáticamente
  reach: 0,                        // Alcance estimado
  impressions: 0                   // Impresiones totales
}
```

---

## 📋 Esquemas de Datos

### 🏷️ Marca (marcas)

```javascript
{
  // Información básica
  id: "auto_generated_id",
  nombre: "Nombre de la Marca",
  descripcion: "Descripción de la marca...",
  
  // Assets visuales
  logo_url: "https://storage.url/logo.png",
  banner_url: "https://storage.url/banner.jpg",
  collection_banner: "https://storage.url/collection.jpg",
  brand_color: "#FF5733",
  
  // Estados y configuración
  isActive: true,
  hasStore: true,
  isVerified: true,
  
  // Información comercial
  current_discount: 20,            // % descuento actual
  discount_expires: "timestamp",
  latest_collection_name: "Verano 2024",
  season_collection: "verano",
  
  // Metadata
  created_at: "timestamp",
  updated_at: "timestamp",
  user_id: "usuario_propietario",
  
  // SEO y categorización
  category: "fashion",
  subcategory: "streetwear",
  keywords: ["urbano", "juvenil", "trendy"],
  
  // Contacto y social
  website: "https://marca.com",
  instagram: "@marca_oficial",
  contact_email: "contacto@marca.com",
  
  // Analytics
  total_products: 0,               // Calculado automáticamente
  avg_rating: 0,                   // Rating promedio
  total_sales: 0                   // Ventas totales
}
```

### 📦 Producto (productos)

```javascript
{
  // Información básica
  id: "auto_generated_id",
  nombre: "Nombre del Producto",
  descripcion: "Descripción detallada...",
  
  // Relaciones
  marca_id: "marca_123",
  categoria_id: "categoria_456",
  tienda_id: "tienda_789",
  
  // Imágenes y multimedia
  imagenes: [
    "https://storage.url/imagen1.jpg",
    "https://storage.url/imagen2.jpg",
    "https://storage.url/imagen3.jpg"
  ],
  image_url: "https://storage.url/principal.jpg",  // Imagen principal
  video_url: "https://storage.url/video.mp4",      // Opcional
  
  // Precios
  precio: 9999,                    // Precio actual en centavos
  precio_actual: 9999,
  precio_anterior: 12999,          // Precio anterior para mostrar descuento
  precio_original: 12999,
  moneda: "ARS",
  
  // Inventario y variaciones
  stock: 50,
  tallas_disponibles: ["S", "M", "L", "XL"],
  colores_disponibles: [
    { nombre: "Negro", hex: "#000000" },
    { nombre: "Blanco", hex: "#FFFFFF" }
  ],
  
  // Estados
  isPublished: true,
  isActive: true,
  isFeatured: false,
  isOnSale: true,
  
  // Características
  material: "100% Algodón",
  care_instructions: "Lavar a máquina 30°C",
  gender: "unisex",               // "hombre", "mujer", "unisex"
  age_group: "adulto",            // "adulto", "joven", "niño"
  
  // SEO
  slug: "remera-basica-negra",
  keywords: ["remera", "básica", "algodón"],
  
  // Métricas
  likes_count: 0,
  saves_count: 0,
  shares_count: 0,
  views_count: 0,
  purchases_count: 0,
  
  // Metadata
  created_at: "timestamp",
  updated_at: "timestamp",
  created_by: "user_id"
}
```

### 🎯 Publicación (publicaciones)

```javascript
{
  // Información básica
  id: "auto_generated_id",
  marca_id: "marca_123",
  
  // Contenido
  collaboration_name: "Supreme x ToFit Exclusive",
  titulo: "Colaboración Exclusiva",
  descripcion: "Una colaboración única...",
  button_text: "Ver Colección",
  
  // Multimedia
  imagenes: [
    "https://storage.url/hero1.jpg",    // 1200x600px mínimo
    "https://storage.url/hero2.jpg"
  ],
  image_url: "https://storage.url/principal.jpg",
  video_url: "https://storage.url/video.mp4",
  
  // Configuración de campaña
  priority: 10,                    // 1-10, prioridad de mostrado
  isFeatured: true,               // Aparece en Hero Banner
  isActive: true,
  
  // Fechas
  launch_date: "timestamp",        // Fecha de lanzamiento
  end_date: "timestamp",          // Fecha de finalización
  created_at: "timestamp",
  updated_at: "timestamp",
  
  // Targeting
  target_audience: ["streetwear", "luxury"],
  region_targeting: ["AR", "CL", "UY"],
  age_targeting: [18, 35],
  
  // Asociaciones
  story_associated: "story_id_123",
  products_featured: [             // Productos destacados
    "prod_123", "prod_456"
  ],
  
  // Analytics
  impressions: 0,
  clicks: 0,
  engagement_rate: 0.0,
  
  // Metadata de moderación
  status: "approved",              // "pending", "approved", "rejected"
  moderated_by: "admin_user_id",
  moderation_notes: ""
}
```

### 🎁 Promoción (shop_general_promotions)

```javascript
{
  // Información básica
  id: "auto_generated_id",
  type: "store_promotion",         // "store_promotion", "category_promotion"
  store_id: "tienda_123",
  
  // Contenido promocional
  title: "Mega Sale - Hasta 70% OFF",
  subtitle: "APROVECHÁ AHORA",
  promotion_text: "¡Solo por 48 horas!",
  description: "Descripción detallada de la promoción...",
  
  // Visual
  banner_url: "https://storage.url/promo-banner.jpg",
  
  // Configuración
  priority: 8,                     // 1-10, mayor número = mayor prioridad
  discount_percentage: 50,
  min_purchase_amount: 5000,       // En centavos
  max_discount_amount: 10000,      // En centavos
  
  // Aplicabilidad
  target_categories: [
    "ropa-mujer", "calzado", "accesorios"
  ],
  target_products: [               // Productos específicos (opcional)
    "prod_123", "prod_456"
  ],
  
  // Código promocional
  promocode: "MEGA50",
  promocode_usage_limit: 1000,     // Límite de usos
  promocode_used_count: 0,         // Usos actuales
  
  // Estados y fechas
  isActive: true,
  created_at: "timestamp",
  starts_at: "timestamp",
  expires_at: "timestamp",
  
  // Términos y condiciones
  terms_and_conditions: "Promoción válida...",
  
  // Asociaciones
  story_id: "promo_story_123",
  
  // Analytics
  analytics_tag: "black_friday_2024",
  impressions: 0,
  clicks: 0,
  conversions: 0,
  revenue_generated: 0,
  
  // Targeting
  target_audience: ["premium", "sale_hunters"],
  region_targeting: ["AR"],
  
  // Metadata
  created_by: "user_id",
  approved_by: "admin_id",
  approval_date: "timestamp"
}
```

### 📸 Post Social (posts)

```javascript
{
  // Información básica
  id: "auto_generated_id",
  user_id: "marca_user_id",
  type: "look",                    // "look", "brand_content", "tutorial"
  
  // Contenido
  caption: "Nuevo look primavera 🌸 ¿Qué te parece?",
  hashtags: ["#ToFit", "#SpringLook", "#Fashion"],
  
  // Multimedia
  image_url: "https://storage.url/post.jpg",
  images: [
    "https://storage.url/post1.jpg",
    "https://storage.url/post2.jpg"
  ],
  video_url: "https://storage.url/video.mp4",
  
  // Productos etiquetados
  products_tagged: [
    "prod_123", "prod_456", "prod_789"
  ],
  product_positions: [
    { 
      product_id: "prod_123", 
      x: 0.3,                      // Posición X (0-1)
      y: 0.6,                      // Posición Y (0-1)
      label: "Remera básica"       // Texto del tag
    }
  ],
  
  // Pricing del look
  total_look_price: 15000,         // Suma de productos etiquetados
  currency: "ARS",
  
  // Configuración
  isActive: true,
  isPromoted: false,               // Si es contenido promocionado
  
  // Engagement
  likes_count: 0,
  comments_count: 0,
  shares_count: 0,
  saves_count: 0,
  
  // Métricas calculadas
  engagement_score: 0.0,           // Calculado por algoritmo
  reach: 0,
  impressions: 0,
  
  // Metadata
  created_at: "timestamp",
  updated_at: "timestamp",
  
  // Moderación
  status: "approved",              // "pending", "approved", "rejected"
  moderated_by: "admin_user_id",
  
  // Comercial (para influencers)
  commission_rate: 0.15,           // % de comisión
  affiliate_link: "https://...",   // Link de afiliado
  
  // Analytics específicas
  click_through_rate: 0.0,
  conversion_rate: 0.0,
  revenue_generated: 0
}
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Colaboración Exclusiva para Hero Banner

```javascript
// Caso: Lanzamiento Supreme x ToFit
const heroCollectionData = {
  // Información básica
  marca_id: "supreme_tofit_id",
  collaboration_name: "Supreme x ToFit Limited Edition",
  titulo: "Colaboración Exclusiva",
  button_text: "Comprar Ahora",
  
  // Visual hero
  imagenes: [
    "https://cdn.tofit.com/hero/supreme-tofit-1.jpg",  // 1200x600px
    "https://cdn.tofit.com/hero/supreme-tofit-2.jpg"
  ],
  
  // Configuración de campaña
  priority: 10,                    // Máxima prioridad
  isFeatured: true,
  isActive: true,
  
  // Timing estratégico
  launch_date: "2024-02-14T00:00:00Z",  // San Valentín
  end_date: "2024-02-21T23:59:59Z",     // 7 días
  
  // Targeting premium
  target_audience: ["streetwear", "luxury", "collectors"],
  region_targeting: ["AR", "CL", "UY"],
  age_targeting: [16, 30],
  
  // Asociaciones
  story_associated: "supreme_tofit_story",
  products_featured: [
    "supreme_hoodie_001",
    "supreme_tshirt_002", 
    "supreme_cap_003"
  ]
}

// Resultado: Aparece inmediatamente en el carousel principal
// con máxima visibilidad durante 7 días
```

### Ejemplo 2: Promoción Flash Sale

```javascript
// Caso: Black Friday de Zara
const promoData = {
  type: "store_promotion",
  store_id: "zara_store_official",
  
  // Messaging impactante
  title: "BLACK FRIDAY - Hasta 70% OFF",
  subtitle: "¡ÚLTIMAS HORAS!",
  promotion_text: "Solo hasta medianoche",
  
  // Visual llamativo
  banner_url: "https://cdn.zara.com/blackfriday-banner.jpg",
  
  // Configuración comercial
  priority: 9,                     // Alta prioridad
  discount_percentage: 70,
  min_purchase_amount: 3000,       // $30.00 mínimo
  
  // Timing urgente
  starts_at: "2024-11-24T00:00:00Z",
  expires_at: "2024-11-24T23:59:59Z",  // Solo 24 horas
  
  // Categorías aplicables
  target_categories: [
    "ropa-mujer", "ropa-hombre", "accesorios"
  ],
  
  // Código especial
  promocode: "BLACKFRIDAY70",
  promocode_usage_limit: 5000,
  
  // Analytics
  analytics_tag: "black_friday_2024_zara"
}

// Resultado: Aparece en Featured Stores por 24 horas
// con alta prioridad y tracking específico
```

### Ejemplo 3: Post Social con Productos

```javascript
// Caso: Look de invierno con múltiples productos
const socialPostData = {
  user_id: "zara_brand_account",
  type: "look",
  
  // Contenido aspiracional
  caption: "El look perfecto para el invierno porteño ❄️ Cómodo, elegante y súper trendy. ¿Cuál es tu favorito? 🤔",
  hashtags: [
    "#ZaraStyle", "#WinterLook", "#BuenosAires", 
    "#ToFitStyle", "#OOTD", "#Fashion"
  ],
  
  // Visual de alta calidad
  image_url: "https://cdn.zara.com/looks/winter-2024-01.jpg",
  
  // Productos etiquetados estratégicamente
  products_tagged: [
    "zara_coat_winter_001",        // Abrigo principal
    "zara_sweater_cashmere_002",   // Sweater
    "zara_jeans_skinny_003",       // Jeans
    "zara_boots_leather_004"       // Botas
  ],
  
  // Tags posicionados en la imagen
  product_positions: [
    { 
      product_id: "zara_coat_winter_001", 
      x: 0.5, y: 0.3,              // Centro-arriba (abrigo)
      label: "Abrigo Wool Blend"
    },
    { 
      product_id: "zara_sweater_cashmere_002", 
      x: 0.5, y: 0.5,              // Centro (sweater)
      label: "Sweater Cashmere"
    },
    { 
      product_id: "zara_jeans_skinny_003", 
      x: 0.4, y: 0.7,              // Izquierda-abajo (jeans)
      label: "Jeans Skinny Fit"
    },
    { 
      product_id: "zara_boots_leather_004", 
      x: 0.5, y: 0.9,              // Centro-abajo (botas)
      label: "Botas Cuero"
    }
  ],
  
  // Precio calculado automáticamente
  total_look_price: 45900,         // $459.00 total
  
  // Estados
  isActive: true,
  isPromoted: true,                // Contenido promocionado
  
  // Comisión para afiliados
  commission_rate: 0.08,           // 8% comisión
  
  // Analytics
  analytics_tag: "winter_collection_2024"
}

// Resultado: Post aparece en feed de influencers con productos
// etiquetados, precios visibles y tracking de conversión
```

### Ejemplo 4: Nueva Marca Entrando al Mercado

```javascript
// Caso: Marca emergente argentina
const nuevaMarcaData = {
  // Información de la marca
  marca: {
    nombre: "Alma Porteña",
    descripcion: "Moda sustentable inspirada en Buenos Aires",
    logo_url: "https://cdn.almportena.com/logo.png",
    banner_url: "https://cdn.almportena.com/banner.jpg",
    brand_color: "#2D5A27",        // Verde sustentable
    
    // Estados iniciales
    isActive: true,
    hasStore: true,
    isVerified: false,             // Pendiente de verificación
    
    // Información comercial
    latest_collection_name: "Primavera Sustentable",
    season_collection: "primavera",
    category: "fashion",
    subcategory: "sustainable",
    
    // Contact y social
    website: "https://almportena.com",
    instagram: "@alma_portena",
    contact_email: "hola@almportena.com"
  },
  
  // Tienda asociada
  tienda: {
    marca_id: "alma_portena_id",
    nombre: "Alma Porteña - Tienda Oficial",
    banner_url: "https://cdn.almportena.com/store-banner.jpg",
    isActive: true
  },
  
  // Productos iniciales
  productos: [
    {
      nombre: "Remera Eco Buenos Aires",
      descripcion: "Remera de algodón orgánico con estampa de BA",
      imagenes: ["https://cdn.almportena.com/remera-ba-1.jpg"],
      precio: 3500,               // $35.00
      stock: 100,
      tallas_disponibles: ["XS", "S", "M", "L", "XL"],
      material: "100% Algodón Orgánico",
      isPublished: true,
      isActive: true
    },
    {
      nombre: "Totebag Reciclado",
      descripcion: "Bolsa ecológica de materiales reciclados",
      imagenes: ["https://cdn.almportena.com/totebag-1.jpg"],
      precio: 1800,               // $18.00
      stock: 50,
      material: "100% Poliéster Reciclado",
      isPublished: true,
      isActive: true
    }
  ],
  
  // Primera promoción de lanzamiento
  promocion_lanzamiento: {
    type: "store_promotion",
    title: "¡Nueva Marca! Alma Porteña",
    subtitle: "20% OFF LANZAMIENTO",
    promotion_text: "Moda sustentable argentina",
    priority: 6,                 // Prioridad media-alta
    discount_percentage: 20,
    promocode: "ALMAPORTENA20",
    expires_at: "2024-03-01T23:59:59Z",  // 30 días
    analytics_tag: "new_brand_launch_alma_portena"
  }
}

// Resultado: Marca aparece en Brand Collections, promoción
// en Featured Stores, y productos listos para compra
```

---

## 🎯 Mejores Prácticas

### 📸 **Calidad Visual**

#### Imágenes Hero Collections
- **Resolución mínima**: 1200x600px (desktop), 800x400px (mobile)
- **Formato**: JPG optimizado o PNG si necesita transparencia
- **Tamaño máximo**: 2MB por imagen
- **Aspectos visuales**: Alto contraste, texto legible, branding claro

#### Banners de Promoción
- **Resolución**: 800x400px estándar
- **Elementos**: Título, % descuento, urgencia, branding
- **Colores**: Contrasten con el fondo oscuro de la app
- **Texto**: Máximo 3-4 palabras por línea

#### Posts Sociales
- **Resolución**: 1080x1080px (cuadrado) o 1080x1350px (vertical)
- **Calidad**: Alta resolución, buena iluminación
- **Composición**: Productos claramente visibles
- **Estilo**: Consistente con la identidad de marca

### 📝 **Copywriting Efectivo**

#### Títulos Impactantes
```javascript
// ✅ Bueno
"Supreme x ToFit - Edición Limitada"
"Black Friday - Hasta 70% OFF"
"Nueva Colección Primavera"

// ❌ Evitar
"Productos nuevos disponibles"
"Oferta especial en tienda"
"Mira nuestros items"
```

#### Calls to Action
```javascript
// ✅ Accionables
"Comprar Ahora"
"Ver Colección"
"Aprovechá 50% OFF"
"Solo por 24hs"

// ❌ Genéricos
"Más información"
"Click aquí"
"Ver más"
```

#### Hashtags Estratégicos
```javascript
// Mix ideal para posts
const hashtagStrategy = [
  // Branded (2-3)
  "#ZaraStyle", "#NikeAir",
  
  // Tendencias (3-4)
  "#OOTD", "#StreetStyle", "#WinterLooks",
  
  // Locales (1-2)
  "#BuenosAires", "#ArgentinaFashion",
  
  // Genéricos (2-3)
  "#Fashion", "#Style", "#ToFitCommunity"
]
```

### ⏰ **Timing Estratégico**

#### Publicación de Contenido
```javascript
const timingOptimo = {
  // Hero Collections
  hero_collections: {
    duracion: "7-14 días",
    momento_lanzamiento: "Lunes 9 AM",
    pre_comunicacion: "48 horas antes"
  },
  
  // Promociones
  promociones: {
    flash_sales: "24-48 horas máximo",
    black_friday: "3-5 días",
    fin_de_semana: "Viernes 6 PM - Domingo 11 PM"
  },
  
  // Posts sociales
  posts_sociales: {
    mejor_horario: "18:00-22:00 hs",
    frecuencia: "2-3 posts por semana",
    dias_optimos: ["Martes", "Miércoles", "Sábado"]
  }
}
```

#### Estacionalidad
```javascript
const calendarioMarketing = {
  enero: "Rebajas post-navidad, Back to work",
  febrero: "San Valentín, vuelta a clases",
  marzo: "Otoño, new collections",
  abril: "Pascuas, mid-season sales",
  mayo: "Día de la madre, winter previews",
  junio: "Invierno, día del padre",
  julio: "Winter sales, vacaciones",
  agosto: "Día del niño, spring previews",
  septiembre: "Primavera, new season",
  octubre: "Halloween, spring collections",
  noviembre: "Black Friday, Cyber Monday",
  diciembre: "Navidad, summer previews"
}
```

### 📊 **Optimización de Performance**

#### Priorización de Contenido
```javascript
const prioridadOptima = {
  hero_collections: {
    colaboraciones_exclusivas: 10,
    nuevas_colecciones: 8,
    ediciones_limitadas: 9,
    contenido_regular: 6
  },
  
  promociones: {
    black_friday: 10,
    flash_sales: 9,
    fin_de_semana: 7,
    promociones_regulares: 5
  }
}
```

#### A/B Testing
```javascript
// Elementos a testear
const elementsToTest = [
  "titulo_promocion",             // "50% OFF" vs "MEGA SALE"
  "color_boton_cta",             // Rojo vs Verde vs Azul
  "duracion_promocion",          // 24hs vs 48hs vs 7 días
  "imagen_principal",            // Producto vs Model vs Lifestyle
  "copy_urgencia"                // "¡Solo hoy!" vs "¡Últimas horas!"
]
```

### 🎯 **Segmentación de Audiencia**

#### Por Demografía
```javascript
const segmentacionDemografica = {
  edad_18_25: ["streetwear", "fast_fashion", "trends"],
  edad_26_35: ["premium", "quality", "professional"],
  edad_36_45: ["comfort", "family", "practical"],
  
  genero_mujer: ["fashion", "accessories", "beauty"],
  genero_hombre: ["casual", "sports", "tech"],
  genero_unisex: ["streetwear", "basics", "sustainable"]
}
```

#### Por Comportamiento
```javascript
const segmentacionComportamental = {
  high_spenders: {
    min_purchase: 10000,          // +$100 por compra
    targeting: ["premium", "luxury", "exclusive"]
  },
  
  frequent_buyers: {
    purchases_per_month: 3,
    targeting: ["new_arrivals", "member_exclusive"]
  },
  
  sale_hunters: {
    only_buys_on_sale: true,
    targeting: ["discounts", "flash_sales", "clearance"]
  }
}
```

---

## ✅ Flujo de Moderación

### 🔍 **Proceso de Aprobación**

#### Estados de Contenido
```javascript
const estadosModeracion = {
  pending: "Pendiente de revisión",
  approved: "Aprobado y activo",
  rejected: "Rechazado",
  requires_changes: "Requiere modificaciones",
  scheduled: "Programado para publicar"
}
```

#### Criterios de Aprobación

**Hero Collections**
- ✅ Imágenes de alta calidad (min 1200x600px)
- ✅ Colaboración real y verificada
- ✅ Contenido apropiado y familiar
- ✅ No competencia directa simultánea
- ✅ Fechas de campaña válidas

**Promociones**
- ✅ Descuentos reales y verificables
- ✅ Términos y condiciones claros
- ✅ Fechas de vigencia correctas
- ✅ No promociones engañosas
- ✅ Cumplimiento con regulaciones locales

**Posts Sociales**
- ✅ Productos etiquetados correctamente
- ✅ Precios actualizados y exactos
- ✅ Contenido apropiado (sin desnudos, violencia, etc.)
- ✅ No spam o contenido repetitivo
- ✅ Hashtags relevantes y apropiados

#### Proceso Automatizado
```javascript
const autoModerationRules = {
  // Auto-aprobación
  auto_approve: {
    marca_verificada: true,
    historial_positivo: ">= 90%",
    contenido_similar_aprobado: true
  },
  
  // Auto-rechazo
  auto_reject: {
    imagenes_inapropiadas: true,
    spam_detectado: true,
    precios_invalidos: true,
    marca_suspendida: true
  },
  
  // Revisión manual
  manual_review: {
    primera_publicacion: true,
    contenido_sensible: true,
    precios_muy_altos: "> $50,000",
    promociones_extremas: "> 80% descuento"
  }
}
```

### ⏱️ **Tiempos de Revisión**

```javascript
const tiemposRevision = {
  hero_collections: {
    promedio: "2-4 horas laborales",
    urgente: "30 minutos",
    maximo: "24 horas"
  },
  
  promociones: {
    promedio: "1-2 horas laborales",
    flash_sales: "15 minutos",
    maximo: "12 horas"
  },
  
  posts_sociales: {
    promedio: "30 minutos",
    auto_aprobado: "Inmediato",
    maximo: "4 horas"
  }
}
```

---

## 📈 Analytics y Métricas

### 📊 **KPIs Principales**

#### Por Tipo de Contenido
```javascript
const kpisContent = {
  hero_collections: {
    impresiones: "Veces que aparece en pantalla",
    clicks: "Clicks en 'Ver Colección'",
    ctr: "Click Through Rate %",
    conversiones: "Compras generadas",
    revenue: "Ingresos atribuidos"
  },
  
  brand_collections: {
    apariciones: "Veces que aparece en scroll",
    clicks_marca: "Clicks en la marca",
    productos_vistos: "Productos clickeados",
    tiempo_en_tienda: "Tiempo promedio en tienda",
    bounce_rate: "% de rebote"
  },
  
  promociones: {
    impresiones: "Visualizaciones de la promoción",
    clicks: "Clicks en la promoción",
    uso_codigo: "Usos del código promocional",
    conversiones: "Compras con descuento",
    roi: "Return on Investment"
  },
  
  posts_sociales: {
    alcance: "Usuarios únicos que vieron",
    engagement: "Likes + comentarios + shares",
    saves: "Veces guardado",
    clicks_productos: "Clicks en productos etiquetados",
    conversion_rate: "% de clicks que compraron"
  }
}
```

### 📱 **Dashboard de Marca**

#### Métricas en Tiempo Real
```javascript
const dashboardRealTime = {
  // Resumen del día
  today: {
    impresiones_totales: 15420,
    clicks_totales: 1236,
    conversiones: 45,
    revenue: 127300,            // $1,273.00
    ctr_promedio: 8.01          // %
  },
  
  // Performance por contenido
  content_performance: [
    {
      tipo: "hero_collection",
      nombre: "Supreme x ToFit",
      impresiones: 8500,
      clicks: 680,
      ctr: 8.0,
      conversiones: 25,
      revenue: 87500
    },
    {
      tipo: "promocion",
      nombre: "Black Friday Sale",
      impresiones: 4200,
      clicks: 420,
      ctr: 10.0,
      conversiones: 15,
      revenue: 32500
    }
  ],
  
  // Trending products
  productos_trending: [
    {
      id: "prod_123",
      nombre: "Hoodie Supreme Limited",
      visualizaciones: 2340,
      clicks: 234,
      conversiones: 12,
      revenue: 42000
    }
  ]
}
```

#### Reportes Semanales/Mensuales
```javascript
const reportesMensuales = {
  resumen_ejecutivo: {
    impresiones_totales: 450000,
    reach_unico: 125000,
    engagement_rate: 6.8,
    conversion_rate: 3.2,
    revenue_total: 2340000,      // $23,400.00
    crecimiento_vs_mes_anterior: "+15.3%"
  },
  
  top_content: [
    {
      tipo: "hero_collection",
      nombre: "Collaboration Winter 2024",
      performance_score: 95,
      roi: 450                   // %
    }
  ],
  
  audiencia: {
    edad_predominante: "25-34 años",
    genero_distribution: { mujer: 65, hombre: 35 },
    ubicacion_top: ["CABA", "Córdoba", "Rosario"],
    device_usage: { mobile: 78, desktop: 22 }
  },
  
  recomendaciones: [
    "Incrementar contenido para audiencia 18-24",
    "Optimizar imágenes para mobile",
    "Probar promociones de fin de semana"
  ]
}
```

### 🎯 **Alertas y Notificaciones**

```javascript
const sistemAlertas = {
  // Alertas de performance
  performance_alerts: {
    ctr_bajo: "< 2% por 24 horas",
    conversion_drop: "< 50% vs promedio",
    error_tracking: "Fallos en analytics",
    competencia: "Nueva campaña de competidor"
  },
  
  // Alertas de moderación
  moderation_alerts: {
    contenido_rechazado: "Inmediato",
    revision_pendiente: "> 4 horas",
    limite_promociones: "Máximo mensual alcanzado"
  },
  
  // Oportunidades
  opportunities: {
    trending_hashtag: "Hashtag trending relacionado",
    seasonal_trend: "Tendencia estacional detectada",
    competitor_gap: "Oportunidad vs competencia"
  }
}
```

---

## 🚀 Conclusión y Próximos Pasos

### 🎯 **Resumen Ejecutivo**

Esta guía completa te proporciona todo lo necesario para dominar el sistema de posteos de **ToFit Marcas**:

- ✅ **4 tipos principales** de contenido con casos específicos
- ✅ **Esquemas detallados** de Firebase con todos los campos
- ✅ **Ejemplos prácticos** reales listos para implementar
- ✅ **Mejores prácticas** probadas para maximizar engagement
- ✅ **Sistema completo** de analytics y métricas

### 📈 **Optimización Continua**

#### Estrategia de Crecimiento
```javascript
const estrategiaCrecimiento = {
  mes_1: {
    objetivo: "Establecer presencia",
    acciones: [
      "Configurar marca y tienda",
      "Subir productos principales",
      "Primera promoción de lanzamiento"
    ]
  },
  
  mes_2_3: {
    objetivo: "Aumentar visibilidad",
    acciones: [
      "Hero collection primera colaboración",
      "Content social regular (2-3 posts/semana)",
      "Promociones estacionales"
    ]
  },
  
  mes_4_6: {
    objetivo: "Dominar algoritmos",
    acciones: [
      "A/B testing sistemático",
      "Colaboraciones con influencers",
      "Optimización basada en analytics"
    ]
  }
}
```

### 🔧 **Herramientas Recomendadas**

```javascript
const herramientasRecomendadas = {
  // Diseño y visual
  diseño: ["Canva Pro", "Adobe Creative Suite", "Figma"],
  
  // Fotografía de producto
  fotografia: ["Lightroom", "VSCO", "Snapseed"],
  
  // Planning y calendario
  planning: ["Later", "Hootsuite", "Google Calendar"],
  
  // Analytics adicionales
  analytics: ["Google Analytics", "Facebook Pixel", "Hotjar"],
  
  // Gestión de contenido
  content: ["Notion", "Airtable", "Monday.com"]
}
```

### 📞 **Soporte y Recursos**

#### Contactos Clave
- **Soporte Técnico**: soporte@tofit.com
- **Partnership**: marcas@tofit.com  
- **Moderación**: moderacion@tofit.com
- **Analytics**: analytics@tofit.com

#### Recursos Adicionales
- 📚 **Knowledge Base**: help.tofit.com
- 🎥 **Video Tutoriales**: academy.tofit.com
- 💬 **Comunidad**: community.tofit.com
- 📊 **Dashboard**: marcas.tofit.com

---

**¡Estás listo para dominar ToFit Marcas! 🚀**

Con esta guía completa, tienes todas las herramientas para crear contenido que impacte, genere engagement y convierta en ventas. ¡Comienza hoy mismo y lleva tu marca al siguiente nivel! ✨ 