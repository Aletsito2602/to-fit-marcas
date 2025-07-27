# To Fit Marcas - Design System

## 🎨 Paleta de Colores

### Colores Principales
```typescript
const colors = {
  // Fondos principales
  background: {
    primary: '#000000',           // Negro principal
    secondary: 'rgba(41, 41, 41, 1)', // Gris oscuro secundario
    card: '#333333',              // Gris para tarjetas/modales
    overlay: 'rgba(0, 0, 0, 0.8)', // Overlay modales
    transparent: 'rgba(0, 0, 0, 0.3)', // Transparente con opacidad
  },

  // Texto
  text: {
    primary: '#FFFFFF',           // Texto principal (blanco)
    secondary: '#A0A0A0',         // Texto secundario (gris claro)
    muted: '#666666',             // Texto deshabilitado/separadores
    placeholder: '#A0A0A0',       // Placeholder inputs
    inverse: '#000000',           // Texto sobre fondo claro
  },

  // Bordes y separadores
  border: {
    primary: '#FFFFFF',           // Bordes blancos
    secondary: '#666666',         // Bordes grises
    input: '#A0A0A0',            // Bordes de inputs
  },

  // Estados y acciones
  accent: {
    primary: '#007AFF',           // Azul sistema iOS (botones principales)
    secondary: '#FFD700',         // Dorado (flash activo)
    success: '#4CAF50',           // Verde (éxito/en stock)
    warning: '#FF9800',           // Naranja (advertencia/bajo stock)
    error: '#F44336',             // Rojo (error/sin stock)
    destructive: '#FF6B6B',       // Rojo para acciones destructivas
  }
}
```

## 🔤 Tipografía

### Familia de Fuentes
- **Principal**: `Poppins` (Sans-serif moderna)
- **Variantes disponibles**:
  - `Poppins-Regular` (400)
  - `Poppins-Medium` (500)
  - `Poppins-SemiBold` (600)
  - `Poppins-Bold` (700)

### Jerarquía Tipográfica
```typescript
const typography = {
  // Títulos principales
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#FFFFFF'
  },

  // Títulos de sección
  h2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    color: '#FFFFFF'
  },

  // Subtítulos
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: '#FFFFFF'
  },

  // Texto base
  body: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#FFFFFF'
  },

  // Texto pequeño
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#A0A0A0'
  },

  // Etiquetas/labels
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#FFFFFF'
  },

  // Botones
  button: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18,
    color: '#FFFFFF'
  }
}
```

## 🔘 Botones

### Botón Primario
```typescript
const primaryButton = {
  backgroundColor: '#FFFFFF',
  borderRadius: 25,
  paddingHorizontal: 30,
  paddingVertical: 15,
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000000'
  }
}
```

### Botón Secundario
```typescript
const secondaryButton = {
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: '#FFFFFF',
  borderRadius: 15,
  paddingHorizontal: 16,
  paddingVertical: 8,
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFFFFF'
  }
}
```

### Botón de Acción (Accent)
```typescript
const accentButton = {
  backgroundColor: '#007AFF',
  borderRadius: 20,
  paddingHorizontal: 20,
  paddingVertical: 12,
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF'
  }
}
```

### Botón Destructivo
```typescript
const destructiveButton = {
  backgroundColor: '#F44336',
  borderRadius: 15,
  paddingHorizontal: 16,
  paddingVertical: 8,
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF'
  }
}
```

### Botón de Ícono
```typescript
const iconButton = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: 20,
  padding: 8,
  alignItems: 'center',
  justifyContent: 'center'
}
```

## 📱 Componentes UI

### Cards/Tarjetas
```typescript
const card = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: 12,
  padding: 16,
  marginBottom: 8,
  // Sombra sutil
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2
}
```

### Inputs
```typescript
const input = {
  backgroundColor: '#333333',
  borderRadius: 25,
  paddingHorizontal: 16,
  paddingVertical: 12,
  fontFamily: 'Poppins-Regular',
  fontSize: 16,
  color: '#FFFFFF',
  borderWidth: 1,
  borderColor: 'transparent',
  // Focus state
  focusedBorderColor: '#007AFF'
}
```

### Modales
```typescript
const modal = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxWidth: 400
  }
}
```

### Tab Bar
```typescript
const tabBar = {
  backgroundColor: '#000000',
  borderTopWidth: 0,
  height: 80,
  paddingBottom: 12,
  paddingTop: 12,
  activeTintColor: '#FFFFFF',
  inactiveTintColor: 'rgba(157, 157, 157, 1)'
}
```

## 📐 Espaciado y Dimensiones

### Sistema de Espaciado (8pt grid)
```typescript
const spacing = {
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 16,   // 16px
  lg: 24,   // 24px
  xl: 32,   // 32px
  xxl: 48,  // 48px
  xxxl: 64  // 64px
}
```

### Border Radius
```typescript
const borderRadius = {
  sm: 6,     // Elementos pequeños
  md: 12,    // Cards, botones medianos
  lg: 20,    // Modales, contenedores grandes
  xl: 25,    // Inputs, botones principales
  round: 50  // Elementos circulares
}
```

### Dimensiones Comunes
```typescript
const dimensions = {
  // Header
  headerHeight: 60,
  headerPaddingTop: 55,

  // Tab Bar
  tabBarHeight: 80,

  // Productos
  productCard: {
    width: 175,
    height: 275,
    borderRadius: 20
  },

  // Categorías
  category: {
    width: 95,
    height: 70,
    borderRadius: 20
  },

  // Banners
  banner: {
    height: 200,
    borderRadius: 12
  },

  // Logos
  logo: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 4
  }
}
```

## 🎯 Estados Interactivos

### Estados de Stock
```typescript
const stockStates = {
  inStock: {
    color: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    text: 'En Stock'
  },
  lowStock: {
    color: '#FF9800',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    text: 'Bajo Stock'
  },
  outOfStock: {
    color: '#F44336',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    text: 'Sin Stock'
  }
}
```

### Estados de Carga
```typescript
const loadingStates = {
  // Skeleton loading
  skeleton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    // Animación shimmer
    shimmerColors: ['transparent', 'rgba(255, 255, 255, 0.1)', 'transparent']
  },

  // Loading indicator
  spinner: {
    color: '#FFFFFF',
    size: 'large'
  }
}
```

### Estados de Touch
```typescript
const touchStates = {
  activeOpacity: 0.7,      // Para TouchableOpacity
  underlayColor: 'rgba(255, 255, 255, 0.1)', // Para TouchableHighlight
  rippleColor: 'rgba(255, 255, 255, 0.3)'    // Para Android ripple
}
```

## 🌟 Efectos Visuales

### Sombras
```typescript
const shadows = {
  // Sombra sutil
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },

  // Sombra media
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4
  },

  // Sombra fuerte
  strong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10
  }
}
```

### Gradientes
```typescript
const gradients = {
  // Overlay de banners
  bannerOverlay: {
    colors: ['rgba(0, 0, 0, 0)', '#000000'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 }
  },

  // Overlay de categorías
  categoryOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
}
```

### Blur y Overlays
```typescript
const overlays = {
  // Overlay modal
  modalOverlay: 'rgba(0, 0, 0, 0.8)',

  // Overlay cámara
  cameraOverlay: 'rgba(0, 0, 0, 0.3)',

  // Overlay categorías
  categoryOverlay: 'rgba(0, 0, 0, 0.8)',

  // Background transparente
  transparentBackground: 'rgba(255, 255, 255, 0.05)'
}
```

## 📱 Responsive Design

### Breakpoints
```typescript
const breakpoints = {
  mobile: 375,    // iPhone SE
  tablet: 768,    // iPad
  desktop: 1024   // Desktop
}
```

### Grid System
```typescript
const grid = {
  // Productos
  productColumns: 2,
  productGap: 8,

  // Categorías
  categorySnapInterval: 101, // 95 + 6 gap

  // Padding horizontal estándar
  horizontalPadding: 25,

  // Contenido
  contentPadding: {
    top: 120,    // Para evitar header
    bottom: 100, // Para evitar tab bar
    horizontal: 25
  }
}
```

## 🎨 Iconografía

### Iconos Principales (Ionicons)
```typescript
const icons = {
  // Navegación
  home: 'home',
  camera: 'camera-outline',
  orders: 'receipt-outline',
  products: 'bag-outline',
  metrics: 'analytics-outline',

  // Acciones
  edit: 'create-outline',
  delete: 'trash-outline',
  add: 'add',
  close: 'close',
  back: 'arrow-back',
  forward: 'chevron-forward',

  // Estados
  flash: 'flash',
  flashOff: 'flash-off',
  cameraReverse: 'camera-reverse',

  // Información
  cube: 'cube-outline',
  search: 'search',
  images: 'images',

  // Social
  heart: 'heart-outline',
  heartFilled: 'heart',
  bookmark: 'bookmark-outline',
  bookmarkFilled: 'bookmark'
}
```

## 🎭 Animaciones

### Duraciones
```typescript
const animations = {
  // Duraciones estándar
  fast: 150,      // Para micro-interacciones
  normal: 300,    // Para transiciones normales
  slow: 500,      // Para transiciones complejas

  // Easing curves
  easeInOut: 'ease-in-out',
  easeOut: 'ease-out',
  spring: {
    tension: 50,
    friction: 7
  }
}
```

### Transiciones Comunes
```typescript
const transitions = {
  // Fade in/out
  fade: {
    opacity: {
      from: 0,
      to: 1,
      duration: 300
    }
  },

  // Scale
  scale: {
    transform: {
      from: 0.8,
      to: 1,
      duration: 300
    }
  },

  // Slide
  slide: {
    translateY: {
      from: 50,
      to: 0,
      duration: 300
    }
  }
}
```

## 📋 Componentes Específicos

### Header
```typescript
const header = {
  height: 60,
  backgroundColor: 'transparent',
  position: 'absolute',
  top: 0,
  zIndex: 1000,
  paddingTop: 55
}
```

### BottomTabBar
```typescript
const bottomTabBar = {
  backgroundColor: '#000000',
  borderTopWidth: 0,
  height: 80,
  paddingBottom: 12,
  paddingTop: 12,
  position: 'absolute',
  bottom: 0
}
```

### ProductCard
```typescript
const productCard = {
  width: 175,
  height: 275,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: 20,
  marginBottom: 16,
  overflow: 'hidden'
}
```

### MetricCard
```typescript
const metricCard = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: 16,
  padding: 20,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.1)'
}
```

## 🔧 Utilidades CSS-in-JS

### Layout Helpers
```typescript
const layout = {
  // Flexbox utilities
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  flexBetween: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  flexRow: {
    flexDirection: 'row'
  },

  flexColumn: {
    flexDirection: 'column'
  },

  // Position utilities
  absoluteFill: StyleSheet.absoluteFillObject,
  
  absolute: {
    position: 'absolute'
  },

  relative: {
    position: 'relative'
  }
}
```

---

## 🎯 Guías de Uso

### ✅ Buenas Prácticas
- Usar siempre la paleta de colores definida
- Mantener consistencia en el espaciado (8pt grid)
- Usar la jerarquía tipográfica apropiada
- Aplicar estados interactivos consistentes
- Respetar las dimensiones de componentes

### ❌ Evitar
- Colores arbitrarios fuera de la paleta
- Espaciado inconsistente
- Mezclar familias de fuentes
- Botones sin estados interactivos
- Componentes sin border radius

### 📝 Notas
- Este design system está optimizado para tema oscuro
- Todos los componentes siguen el patrón de React Native
- Las animaciones usan `useNativeDriver: true` cuando es posible
- Los iconos son de la librería `@expo/vector-icons` (Ionicons)