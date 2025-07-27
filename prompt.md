# To Fit Marcas - React Native E-commerce App

Necesito que me ayudes a crear una aplicación móvil completa de e-commerce para marcas de ropa usando React Native/Expo con TypeScript. La app debe seguir este diseño y funcionalidades específicas:

## 🎯 Descripción General

**"To Fit Marcas"** es una plataforma que permite a las marcas de ropa gestionar su tienda online, campañas de marketing, métricas de ventas, y sistema de afiliados/influencers.

## 🏗️ Arquitectura y Tecnologías

- **Framework**: React Native con Expo
- **Lenguaje**: TypeScript
- **Navegación**: React Navigation v6 (Stack, Tab, Drawer)
- **Base de datos**: Firebase Firestore
- **Autenticación**: Firebase Auth
- **Estado**: React Hooks + Context API
- **Fuentes**: Poppins (Regular, Medium, SemiBold, Bold)
- **Iconos**: Ionicons de Expo
- **Estilo**: StyleSheet nativo (NO usar styled-components)

## 🎨 Diseño Visual

### Colores principales:
- **Fondo**: `#000000` (negro puro)
- **Accent verde**: `#0FFF95` (verde neón)
- **Texto primario**: `#FFFFFF`
- **Texto secundario**: `rgba(255, 255, 255, 0.6)`
- **Cards**: `rgba(255, 255, 255, 0.08)`
- **Bordes**: `rgba(255, 255, 255, 0.15)`

### Tipografía:
- **Títulos grandes**: Poppins-Bold, 32px
- **Títulos sección**: Poppins-SemiBold, 18-20px
- **Texto normal**: Poppins-Medium, 14-16px
- **Texto pequeño**: Poppins-Regular, 12px

### Estilo visual:
- **Diseño**: Moderno, rectilíneo (sin gráficos circulares)
- **Cards**: Bordes redondeados (12px), con sombras sutiles
- **Acentos**: Líneas verticales de color en cards
- **Espaciado**: Generoso, márgenes de 20px
- **Transparencias**: Fondos con alpha para profundidad

## 📱 Estructura de Navegación

```
App
├── AuthStack (Login/Register)
└── DrawerNavigator
    ├── MainTabs (BottomTabNavigator)
    │   ├── Home
    │   ├── Pedidos
    │   ├── Cámara
    │   ├── Productos  
    │   └── Métricas
    ├── Mi Perfil
    ├── Mi Tienda
    ├── Inventario
    ├── Campañas
    ├── Colecciones
    ├── Facturas
    ├── Reportes
    ├── Configuración
    └── Soporte
```

## 🏠 Pantalla Principal (Home)

### Header:
- Menú hamburguesa (izquierda)
- Logo "To FIT MARCAS" (centro)
- Notificaciones + Avatar (derecha)

### Quick Stats (horizontal scroll):
- Cards pequeños con: Ingresos, Pedidos, Conversión, Clientes
- Valores grandes con porcentajes de cambio
- Colores: verde para positivo, rojo para negativo

### Grid de métricas principales:
- 4 cards en formato 2x2
- Ingresos totales, Pedidos, Conversión, Ticket promedio
- Iconos, valores grandes, cambios porcentuales

### Productos populares:
- Lista horizontal con scroll
- Imagen, nombre, ventas, categoría

## 📊 Sección Métricas/Estadísticas

### Tab Bar interno:
- **Rendimiento**: Ventas & KPIs
- **Clientes**: Analytics & Afiliados  
- **Crecimiento**: Campañas & Redes

### Tab Rendimiento:
- Grid de KPIs principales
- Análisis de conversión (3 cards pequeños): No Compraron, Compraron, Abandonaron
- Lista de productos más vendidos

### Tab Clientes:
- Métricas de clientes (nuevos, VIP, retención, valor promedio)
- Top clientes con valores de compra
- Mejores afiliados con ganancias por ventas

### Tab Crecimiento:
- Métricas de crecimiento (seguidores, engagement, alcance, interacciones)
- Lista de campañas activas
- Métricas de redes sociales (Me gusta, comentarios, guardados, clics)

## 👤 Mi Perfil

### Información del usuario:
- Avatar, nombre, ubicación
- Estadísticas: Seguidores, Seguidos, Publicaciones, Likes

### Tab Bar interno:
- **Publicaciones**: Grid de fotos 2x2
- **Cápsulas**: Productos destacados
- **Calendario**: Eventos y fechas importantes

### Sección Calendario:
- Calendario interactivo estilo Shadcn
- Navegación mensual con flechas
- Indicadores de eventos por fecha (dots de colores)
- Lista de próximos eventos
- Eventos anteriores en formato cards

## 🏪 Mi Tienda

### Banner de marca:
- Imagen de fondo, logo, información básica
- Altura: 200px, bordes redondeados

### Categorías horizontales:
- Scroll horizontal de categorías
- Cards con imagen y nombre

### Productos:
- Grid 2x2 de productos destacados
- Secciones: "Sugerencias para ti", "Más productos"
- Banner de colección especial

## 🎯 Campañas

### Lista de campañas:
- Cards con imagen de marca
- Información: Marca, comisión, descripción
- Modal de detalles al hacer tap

### Funciones:
- Buscador en tiempo real
- Botón "Agregar" nueva campaña
- Modal con detalles completos de campaña

## 📈 Características Técnicas

### Componentes reutilizables:
- **ModernMetricCard**: Cards de métricas con diferentes tamaños
- **MetricsList**: Listas con avatares y valores  
- **ModernTabBar**: Navegación por tabs personalizada
- **LoadingSkeleton**: Animaciones de carga con shimmer
- **ModernCalendar**: Calendario interactivo
- **BottomTabBar**: Navegación inferior

### Hooks personalizados:
- **useMetricsData**: Generación dinámica de datos de métricas
- **useUserProfile**: Gestión de perfil de usuario
- **useTiendaActual**: Datos de la tienda actual

### Sistema de navegación:
- Drawer menu lateral con todas las secciones
- Tab navigator principal para funciones core
- Stack navigators para flujos específicos

## 📋 Datos de Ejemplo

### Métricas:
- Ingresos: $17,800 (+30%)
- Pedidos: 234 (+12%)
- Conversión: 10.8% (+2.1%)
- Ticket promedio: $76 (+5%)
- Clientes nuevos: 47 (+15%)
- Engagement: 8.5% (+1.5%)

### Productos:
- Remera Básica Blanca (45 vendidas)
- Jean Clásico Azul (32 vendidas)
- Buzo Oversize Negro (28 vendidas)

### Eventos de calendario:
- New Drop Classic (Lanzamiento)
- 10K Adidas (Evento deportivo)
- Summer Collection (Preview)
- Adidas x Creators (Colaboración)

## 🔧 Implementación

### Estructura de archivos:
```
src/
├── components/
│   ├── metrics/
│   ├── navigation/
│   └── ui/
├── screens/
│   ├── auth/
│   ├── home/
│   ├── metrics/
│   ├── profile/
│   ├── store/
│   └── campaigns/
├── hooks/
├── contexts/
├── navigation/
└── types/
```

### Prioridades de desarrollo:
1. Configurar navegación y estructura base
2. Implementar autenticación con Firebase
3. Crear sistema de componentes reutilizables
4. Desarrollar pantalla Home con métricas
5. Implementar sección de métricas completa
6. Crear Mi Perfil con calendario
7. Desarrollar Mi Tienda
8. Implementar sistema de campañas

### Animaciones y UX:
- Loading skeletons con shimmer effect
- Transiciones suaves entre pantallas
- Pull-to-refresh en listas
- Animaciones de carga para datos
- Navegación fluida entre tabs

### Responsive design:
- Cálculos dinámicos de ancho para cards
- Adaptación a diferentes tamaños de pantalla
- Spacing consistente usando Dimensions API

## 📝 Notas Importantes

- **NO usar gráficos circulares** - Solo diseño rectilíneo
- **Todos los valores con loading states** - Simular carga de datos
- **Tipografía Poppins** obligatoria en todo el proyecto
- **Colores exactos** según especificación
- **Navegación coherente** - BottomTabBar en pantallas principales
- **Firebase setup** completo con autenticación
- **TypeScript estricto** - Interfaces para todos los datos

Crea este proyecto completo siguiendo exactamente estas especificaciones de diseño y funcionalidad.