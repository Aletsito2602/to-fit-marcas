# 📱 To Fit Marcas - Documentación Completa del App

## 🏗️ Arquitectura de Navegación

### Estructura Principal de Navegación
1. **App Navigator** (`/src/navigation/AppNavigator.tsx`)
   - Navigator raíz que determina si el usuario ve el flujo de autenticación o la app principal
   - Muestra pantalla de carga durante verificación de autenticación
   - Enruta a `AuthNavigator` o `DrawerNavigator` según estado de autenticación

2. **Flujo de Autenticación** (`/src/navigation/AuthNavigator.tsx`)
   - Stack navigator para pantallas de autenticación
   - Maneja flujo de onboarding para nuevos usuarios
   - Rutas: Welcome → Login/Register → OnboardingQuestions

3. **Flujo Principal** (`/src/navigation/DrawerNavigator.tsx`)
   - Navegación drawer con acceso a todas las pantallas principales
   - Contiene `MainNavigator` (tabs inferiores) más pantallas adicionales
   - Elementos drawer ocultos accesibles programáticamente

4. **Navegación de Tabs Inferiores** (`/src/navigation/MainNavigator.tsx`)
   - 5 tabs principales: Home, Órdenes, Cámara, Productos, Métricas
   - Cada tab tiene su propio navigator para sub-pantallas

---

## 🔐 Pantallas de Autenticación

### 1. WelcomeScreen (`/src/screens/auth/WelcomeScreen.tsx`)
**Propósito**: Pantalla inicial de bienvenida de la app

**Información Mostrada**:
- Logo ToFit prominente
- Imagen de fondo con patrón de marca
- Dos botones principales de acción

**Funcionalidades**:
- Botón "Iniciar sesión" → navega a LoginScreen
- Botón "Registrarse" → navega a OnboardingQuestionsScreen
- Diseño responsive con gradientes

**Interacciones de Usuario**:
- Tap en "Iniciar sesión"
- Tap en "Registrarse"
- Sin formularios o inputs

**Componentes Utilizados**:
- `ToFitLogo`
- `CustomButton`
- `BackgroundPattern`

---

### 2. LoginScreen (`/src/screens/auth/LoginScreen.tsx`)
**Propósito**: Autenticación de usuarios existentes

**Información Mostrada**:
- Formulario de login con campos de email y contraseña
- Enlaces a registro y recuperación de contraseña
- Botones de login social (Google, Facebook)

**Datos Recolectados**:
- Email del usuario
- Contraseña

**Funcionalidades**:
- Validación de formulario
- Integración con Firebase Authentication
- Manejo de errores de autenticación
- Navegación condicional post-login

**Interacciones de Usuario**:
- Ingreso de credenciales en formulario
- Tap en "Iniciar sesión"
- Tap en "¿Olvidaste tu contraseña?"
- Tap en "Crear cuenta"
- Tap en botones de login social

**Validaciones**:
- Formato de email válido
- Contraseña no vacía
- Manejo de errores Firebase

---

### 3. RegisterScreen (`/src/screens/auth/RegisterScreen.tsx`)
**Propósito**: Creación de cuentas para nuevos usuarios

**Información Mostrada**:
- Formulario completo de registro
- Términos y condiciones
- Botones de registro social

**Datos Recolectados**:
- Email
- Nombre completo
- Nombre de usuario
- Contraseña
- Confirmación de contraseña
- Datos de onboarding (si viene del flujo de preguntas)

**Funcionalidades**:
- Validación completa de formulario
- Verificación de contraseñas coincidentes
- Creación de usuario en Firebase
- Integración con datos de onboarding
- Verificación de email único

**Interacciones de Usuario**:
- Completar formulario multi-campo
- Confirmar contraseña
- Aceptar términos y condiciones
- Crear cuenta
- Navegar a login

**Validaciones**:
- Email válido y único
- Contraseñas coincidentes
- Nombre de usuario único
- Campos obligatorios completos

---

### 4. OnboardingQuestionsScreen (`/src/screens/auth/OnboardingQuestionsScreen.tsx`)
**Propósito**: Recolectar información de negocio de nuevos usuarios

**Información Mostrada**:
- Wizard de 2 pasos con preguntas de negocio
- Indicadores de progreso
- Opciones de selección múltiple

**Datos Recolectados**:
**Paso 1 - Estado de Tienda**:
- "Ya tengo tienda online o física"
- "Aún no tengo tienda"

**Paso 2 - Tipos de Productos**:
- Todos
- Ropa
- Calzado
- Accesorios
- Belleza

**Funcionalidades**:
- Interfaz wizard de dos pasos
- Selección múltiple de categorías de productos
- Seguimiento de progreso
- Persistencia de datos a Firebase
- Navegación condicional

**Interacciones de Usuario**:
- Selección de estado de tienda
- Selección múltiple de tipos de productos
- Navegación entre pasos
- Envío de datos

**Flujo de Navegación**:
- Para usuarios autenticados: Actualiza documento de usuario → redirige a app principal
- Para no autenticados: Recolecta datos → navega a RegisterScreen

---

### 5. ForgotPasswordScreen (`/src/screens/auth/ForgotPasswordScreen.tsx`)
**Propósito**: Recuperación de contraseña

**Información Mostrada**:
- Formulario con campo de email
- Instrucciones de recuperación
- Mensaje de confirmación

**Datos Recolectados**:
- Email para recuperación

**Funcionalidades**:
- Integración con Firebase password reset
- Validación de email
- Manejo de errores
- Confirmación de envío

---

## 🏠 Pantallas Principales de la App

### 1. HomeScreen (`/src/screens/main/HomeScreen.tsx`)
**Propósito**: Dashboard principal con métricas clave del negocio

**Información Mostrada**:

**Resumen de Ventas**:
- Ingresos totales del mes
- Número de órdenes
- Tasa de conversión
- Ticket promedio

**Estado Crítico**:
- Nuevas órdenes (últimas 24h)
- Pagos pendientes
- Stock crítico (productos con menos de 5 unidades)
- Campañas activas

**Stock de Productos**:
- Datos dinámicos de la colección Firebase products
- Cálculo automático de stock disponible
- Estados: En stock, Stock bajo, Sin stock

**Campañas Activas**:
- Lista de campañas en curso
- Métricas de rendimiento por campaña
- Acciones rápidas para gestión

**Funcionalidades Clave**:
- Datos en tiempo real desde Firebase
- Pull-to-refresh para actualización
- Tarjetas de métricas responsivas
- Cálculos dinámicos de stock
- Atajos de navegación a otras secciones

**Interacciones de Usuario**:
- Tap en métricas para navegar a pantallas relevantes
- Pull para refrescar datos
- Acceso rápido a órdenes, productos, campañas
- Scroll vertical para ver todas las métricas

**Fuentes de Datos**:
- Colección Firebase products para datos de stock
- Contexto de autenticación de usuario
- Cálculos dinámicos basados en fecha actual
- Hook `useUserProfile` para datos de perfil

---

## 🛍️ Sección de Productos

### Navegación de Productos (`/src/navigation/ProductsNavigator.tsx`)
Stack navigator que maneja:
- ProductsList (lista principal)
- ProductDetail (vista individual del producto)
- AddEditProduct (formularios crear/editar)
- AddVariants (gestión de variantes de producto)

### 1. ProductsListScreen (`/src/screens/products/ProductsListScreen.tsx`)
**Propósito**: Visualizar y gestionar inventario de productos

**Información Mostrada**:
- Lista de productos filtrada por tienda del usuario
- Funcionalidad de búsqueda en tiempo real
- Opciones de filtro (Todos, Activos, Sin stock)
- Estadísticas de productos
- Estado de stock por producto

**Datos Mostrados por Producto**:
- Imagen principal del producto
- Nombre del producto
- Precio y precio de oferta
- Nivel de stock actual
- Estado (Activo/Inactivo)
- Número de variantes
- Fecha de creación

**Funcionalidades**:
- Integración Firebase en tiempo real
- Búsqueda y filtrado dinámico
- Indicadores de estado del producto
- Monitoreo de niveles de stock
- Navegación a detalles de producto
- Creación de nuevos productos

**Interacciones de Usuario**:
- Buscar productos por nombre
- Filtrar por estado de producto
- Navegar a detalles de producto
- Agregar nuevos productos
- Pull-to-refresh
- Scroll infinito para listas grandes

**Fuentes de Datos**:
- Colección Firebase products
- Filtrado por ID de tienda del usuario
- Hook useProducts para gestión de datos

---

### 2. ProductDetailScreen (`/src/screens/products/ProductDetailScreen.tsx`)
**Propósito**: Información detallada del producto y gestión

**Información Mostrada**:
- Galería de imágenes del producto
- Información completa del producto (nombre, descripción, precios)
- Lista de variantes con stock individual
- Historial de ventas del producto
- Métricas de rendimiento

**Funcionalidades**:
- Navegación entre imágenes
- Gestión de variantes
- Seguimiento de stock
- Opciones de editar/eliminar
- Compartir producto
- Ver historial de ventas

**Interacciones de Usuario**:
- Deslizar entre imágenes
- Editar información del producto
- Gestionar variantes
- Actualizar stock
- Eliminar producto
- Compartir producto

**Modales Incluidos**:
- Modal de confirmación de eliminación
- Modal de edición rápida de stock
- Modal de compartir producto

---

### 3. AddEditProductScreen (`/src/screens/products/AddEditProductScreen.tsx`)
**Propósito**: Crear o modificar productos

**Información Mostrada**:
- Formulario completo de producto
- Vista previa de imágenes
- Selector de colección
- Configuración de variantes
- Opciones de publicación

**Datos Recolectados**:
- Nombre del producto (obligatorio)
- Descripción detallada
- Imágenes múltiples (hasta 10)
- Precio base
- Precio de oferta (opcional)
- Colección/categoría
- Información de stock
- Variantes del producto (talla, color, estilo)
- Estado de publicación

**Funcionalidades**:
- Subida de imágenes a Firebase Storage
- Validación completa de formulario
- Gestión de variantes dinámicas
- Selección de colección
- Vista previa en tiempo real
- Guardado como borrador

**Interacciones de Usuario**:
- Seleccionar/tomar fotos
- Completar formulario
- Agregar/eliminar variantes
- Guardar como borrador
- Publicar producto
- Previsualizar producto

**Validaciones**:
- Nombre no vacío
- Al menos una imagen
- Precio válido mayor a 0
- Stock no negativo
- Variantes con valores únicos

---

### 4. AddVariantsScreen (`/src/screens/products/AddVariantsScreen.tsx`)
**Propósito**: Gestionar variantes de producto (talla, color, estilo)

**Información Mostrada**:
- Lista de variantes existentes
- Formulario para nuevas variantes
- Stock individual por variante
- Precios por variante (opcional)

**Datos Recolectados**:
- Tipo de variante (talla/color/estilo)
- Valores de variante
- Stock por variante
- Precio por variante (si difiere del base)
- SKU individual

**Funcionalidades**:
- Creación de variantes múltiples
- Gestión de stock individual
- Precios diferenciados por variante
- Generación automática de SKUs
- Vista previa de combinaciones

---

## 📋 Sección de Órdenes

### Navegación de Órdenes (`/src/navigation/OrdersNavigator.tsx`)
Stack navigator que maneja:
- OrdersList (lista principal de órdenes)
- OrderDetail (vista individual de orden)
- AddEditOrder (crear/editar órdenes)
- SelectProducts (selección de productos para órdenes)

### 1. OrdersListScreen (`/src/screens/orders/OrdersListScreen.tsx`)
**Propósito**: Gestión y seguimiento de órdenes

**Información Mostrada**:
- Lista de órdenes con información del cliente
- Estado de orden y estado de pago
- Capacidades de búsqueda y filtrado
- Información resumida de orden
- Filtros por estado: Todas, Pendientes, En proceso, Entregadas

**Datos Mostrados por Orden**:
- Número de orden único
- Información del cliente (nombre, contacto)
- Productos incluidos (resumen)
- Monto total de la orden
- Estado actual (Pendiente/En proceso/Entregada)
- Estado de pago (Pendiente/Pagado/Fallido)
- Fecha de creación
- Origen de venta (Instagram, WhatsApp, Tienda Online, etc.)

**Funcionalidades**:
- Bottom sheet para detalles de orden
- Filtrado por estado
- Visualización de información del cliente
- Cálculos de monto de orden
- Búsqueda por cliente o número de orden
- Actualización de estados en tiempo real

**Interacciones de Usuario**:
- Buscar órdenes por cliente/número
- Filtrar por estado usando tabs
- Ver detalles de orden en bottom sheet
- Navegar a pantalla de detalle completo
- Actualizar estado de orden
- Marcar pago como recibido

**Bottom Sheet Incluido**:
- **OrderDetailBottomSheet**: Vista rápida de detalles de orden
  - Información completa del cliente
  - Lista de productos con cantidades
  - Información de pago
  - Botones de acción rápida
  - Opción de ver detalle completo

---

### 2. OrderDetailScreen (`/src/screens/orders/OrderDetailScreen.tsx`)
**Propósito**: Información completa de orden y gestión

**Información Mostrada**:
- Detalles completos del cliente
- Desglose de artículos de la orden
- Información de pago y facturación
- Historial de estado de la orden
- Información de envío
- Notas y comunicaciones

**Datos Mostrados**:
- **Cliente**: Nombre, email, teléfono, dirección
- **Productos**: Lista detallada con imágenes, cantidades, precios
- **Pagos**: Método, estado, fechas, montos
- **Envío**: Dirección, método, tracking
- **Historial**: Cambios de estado con timestamps

**Funcionalidades**:
- Actualización de estado de orden
- Gestión de pagos
- Generación de etiquetas de envío
- Comunicación con cliente
- Notas internas
- Exportar información de orden

**Interacciones de Usuario**:
- Actualizar estado de orden
- Marcar como pagado/entregado
- Agregar notas
- Contactar cliente
- Generar factura
- Programar envío

**Modales Incluidos**:
- Modal de actualización de estado
- Modal de confirmación de acciones
- Modal de comunicación con cliente

---

### 3. AddEditOrderScreen (`/src/screens/orders/AddEditOrderScreen.tsx`)
**Propósito**: Crear o modificar órdenes manualmente

**Información Mostrada**:
- Formulario de información del cliente
- Selector de productos
- Calculadora de precios
- Opciones de pago y envío
- Resumen de orden

**Datos Recolectados**:
- **Cliente**: Nombre, email, teléfono, dirección completa
- **Productos**: Productos seleccionados con cantidades
- **Precios**: Subtotal, descuentos, impuestos, envío
- **Pago**: Método de pago, estado inicial
- **Envío**: Método, dirección, instrucciones especiales
- **Estado**: Estado inicial de la orden

**Funcionalidades**:
- Búsqueda y selección de productos
- Cálculo automático de totales
- Aplicación de descuentos
- Validación de stock disponible
- Generación automática de número de orden
- Envío de confirmación por email

**Interacciones de Usuario**:
- Completar información del cliente
- Buscar y seleccionar productos
- Ajustar cantidades
- Aplicar descuentos
- Seleccionar método de pago
- Configurar envío
- Crear orden

---

### 4. SelectProductsScreen (`/src/screens/campaigns/SelectProductsScreen.tsx`)
**Propósito**: Seleccionar productos para órdenes o campañas

**Información Mostrada**:
- Lista de productos disponibles
- Filtros de búsqueda y categoría
- Productos seleccionados
- Stock disponible por producto

**Funcionalidades**:
- Selección múltiple de productos
- Filtrado y búsqueda de productos
- Verificación de stock
- Cantidad por producto
- Vista previa de selección

---

## 📊 Sección de Métricas

### Navegación de Métricas (`/src/navigation/MetricsNavigator.tsx`)
Stack navigator con múltiples pantallas de detalle de métricas:
- MetricsDashboard (métricas principales)
- StatusDetail, DemographicsDetail, SalesAffiliateDetail
- CampaignsDetail, InteractionsDetail, InteractionPhotos

### 1. MetricsDashboardScreen (`/src/screens/metrics/MetricsDashboardScreen.tsx`)
**Propósito**: Dashboard completo de analíticas de negocio

**Información Mostrada**:

**Tab "Estado"**:
- Órdenes por estado (Pendientes, En proceso, Entregadas)
- Pagos por estado (Pendientes, Completados, Fallidos)
- Productos más vendidos
- Stock crítico

**Tab "Demográficas"**:
- Distribución por edad de clientes
- Distribución geográfica
- Género de clientes
- Preferencias de productos por demografía

**Tab "Afiliados y Ventas"**:
- Rendimiento por canal de venta
- Comisiones de afiliados
- Ventas por vendedor
- ROI por canal

**Tab "Campañas"**:
- Rendimiento de campañas activas
- CTR y conversiones
- Engagement por campaña
- Costos por adquisición

**Tab "Interacciones"**:
- Métricas de redes sociales
- Engagement rate
- Crecimiento de seguidores
- Interacciones por contenido

**Funcionalidades**:
- Interfaz con tabs para diferentes categorías de métricas
- Actualizaciones de datos en tiempo real
- Gráficos interactivos
- Funcionalidad pull-to-refresh
- Filtros de fecha personalizables
- Exportación de reportes

**Interacciones de Usuario**:
- Navegación entre tabs de métricas
- Drill-down en métricas específicas
- Refrescar datos
- Navegar a pantallas de métricas detalladas
- Filtrar por fechas
- Exportar reportes

**Componentes de Métricas Utilizados**:
- `ModernTabBar`: Navegación entre secciones
- `ModernMetricCard`: Tarjetas individuales de métricas
- `QuickStatsBar`: Barra de estadísticas rápidas
- `EnhancedMetricCard`: Tarjetas avanzadas con gráficos
- `FilterSection`: Interfaz de filtrado
- `LoadingSkeleton`: Estados de carga

---

### 2. Pantallas de Métricas Detalladas

#### StatusDetailScreen (`/src/screens/metrics/StatusDetailScreen.tsx`)
**Propósito**: Análisis detallado de estados de órdenes y cumplimiento
**Información Mostrada**:
- Gráficos de distribución de estados
- Tendencias temporales de estados
- Tiempo promedio por estado
- Métricas de eficiencia operativa

#### DemographicsDetailScreen (`/src/screens/metrics/DemographicsDetailScreen.tsx`)
**Propósito**: Desglose demográfico detallado de clientes
**Información Mostrada**:
- Distribución por edad con gráficos
- Mapa de distribución geográfica
- Análisis de género
- Segmentación de clientes
- Preferencias por demografía

#### SalesAffiliateDetailScreen (`/src/screens/metrics/SalesAffiliateDetailScreen.tsx`)
**Propósito**: Rendimiento de afiliados y ventas
**Información Mostrada**:
- Ranking de afiliados por rendimiento
- Comisiones pagadas y pendientes
- Conversiones por afiliado
- ROI por canal de afiliación

#### CampaignsDetailScreen (`/src/screens/metrics/CampaignsDetailScreen.tsx`)
**Propósito**: Métricas detalladas de rendimiento de campañas
**Información Mostrada**:
- Lista de campañas con métricas individuales
- CTR (Click-through rate) por campaña
- Conversiones y ventas generadas
- Costo por adquisición
- ROI por campaña

#### InteractionsDetailScreen (`/src/screens/metrics/InteractionsDetailScreen.tsx`)
**Propósito**: Análisis de interacciones en redes sociales
**Información Mostrada**:
- Métricas de engagement por plataforma
- Crecimiento de seguidores
- Alcance e impresiones
- Interacciones por tipo de contenido

#### InteractionPhotosScreen (`/src/screens/metrics/InteractionPhotosScreen.tsx`)
**Propósito**: Métricas específicas de interacciones con fotos
**Información Mostrada**:
- Rendimiento individual de fotos
- Likes, comentarios, shares por foto
- Fotos con mejor rendimiento
- Análisis de contenido visual

---

## 📸 Sección de Cámara

### Navegación de Cámara (`/src/navigation/CameraNavigator.tsx`)
Stack navigator para creación de contenido:
- Camara (interfaz de cámara)
- PreviewFoto (vista previa de foto)
- GaleriaFotos (galería de fotos)
- EditorFoto (edición de fotos)
- PublicarContenido (publicación de contenido)

### 1. CamaraScreen (`/src/screens/camera/CamaraScreen.tsx`)
**Propósito**: Interfaz nativa de cámara para tomar fotos

**Información Mostrada**:
- Vista de cámara en tiempo real
- Controles de cámara (flash, voltear cámara)
- Indicadores de modo de captura
- Galería rápida de fotos recientes

**Funcionalidades**:
- Captura de fotos en alta resolución
- Cambio entre cámara frontal y trasera
- Control de flash
- Zoom digital
- Enfoque táctil
- Captura múltiple

**Interacciones de Usuario**:
- Tap para tomar foto
- Tap para enfocar
- Pinch para zoom
- Swipe para cambiar modos
- Tap en galería para ver fotos

---

### 2. PreviewFotoScreen (`/src/screens/camera/PreviewFotoScreen.tsx`)
**Propósito**: Revisar y confirmar foto antes de editar

**Información Mostrada**:
- Vista previa de la foto tomada
- Opciones de confirmación o retomar
- Información básica de la foto

**Funcionalidades**:
- Vista previa a pantalla completa
- Opción de retomar foto
- Navegación a editor
- Descarte de foto

**Interacciones de Usuario**:
- Confirmar foto para continuar
- Retomar foto
- Descartar foto
- Navegar a editor

---

### 3. GaleriaFotosScreen (`/src/screens/camera/GaleriaFotosScreen.tsx`)
**Propósito**: Galería de fotos tomadas y gestionadas

**Información Mostrada**:
- Grid de fotos organizadas por fecha
- Filtros de fotos (Todas, Editadas, Publicadas)
- Opciones de selección múltiple
- Información de cada foto

**Funcionalidades**:
- Visualización en grid
- Selección múltiple
- Filtrado por estado
- Organización por fecha
- Vista previa rápida
- Eliminación masiva

**Interacciones de Usuario**:
- Tap para ver foto
- Long press para seleccionar múltiple
- Filtrar fotos
- Eliminar fotos
- Compartir fotos
- Editar fotos

---

### 4. EditorFotoScreen (`/src/screens/camera/EditorFotoScreen.tsx`)
**Propósito**: Capacidades de edición de fotos

**Información Mostrada**:
- Foto en modo de edición
- Herramientas de edición
- Vista previa de cambios
- Opciones de guardado

**Funcionalidades**:
- Filtros predefinidos
- Ajustes de brillo, contraste, saturación
- Recorte y rotación
- Texto y stickers
- Marcos y bordes
- Ajustes de color

**Interacciones de Usuario**:
- Aplicar filtros
- Ajustar configuraciones
- Agregar texto/stickers
- Recortar imagen
- Guardar cambios
- Deshacer/rehacer

---

### 5. PublicarContenidoScreen (`/src/screens/camera/PublicarContenidoScreen.tsx`)
**Propósito**: Publicar contenido a campañas/redes sociales

**Información Mostrada**:
- Vista previa del contenido
- Formulario de publicación
- Opciones de plataformas
- Programación de publicación

**Datos Recolectados**:
- Descripción del contenido
- Hashtags
- Ubicación
- Fecha de publicación
- Plataformas objetivo
- Campaña asociada

**Funcionalidades**:
- Programación de publicaciones
- Selección de múltiples plataformas
- Asociación con campañas
- Análisis de hashtags
- Vista previa por plataforma

---

## 🎯 Sección de Campañas

### 1. CampaignsScreen (`/src/screens/campaigns/CampaignsScreen.tsx`)
**Propósito**: Gestión y creación de campañas de marketing

**Información Mostrada**:
- Lista de campañas activas con datos dinámicos de Firebase
- Métricas de rendimiento por campaña
- Estados de campañas (Activa, Pausada, Finalizada)
- Información de influencers participantes

**Datos Mostrados por Campaña**:
- Nombre de la marca/campaña
- Imagen principal de la campaña
- Porcentaje de comisión
- Fecha de inicio y fin
- Estado actual
- Número de influencers participantes
- Métricas básicas (alcance, engagement)

**Funcionalidades**:
- Integración completa con Firebase Firestore
- Estados de carga y error manejados
- Pull-to-refresh para datos actualizados
- Navegación a detalles de campaña
- Creación de nuevas campañas
- Filtrado por estado de campaña

**Interacciones de Usuario**:
- Ver detalles de campaña específica
- Crear nueva campaña
- Pausar/reactivar campañas
- Filtrar campañas por estado
- Refrescar lista de campañas

**Fuentes de Datos**:
- Colección Firebase `campaigns`
- Hook `useCampaigns` para gestión de datos
- Filtrado por usuario actual

---

### 2. AddCampaignScreen (`/src/screens/campaigns/AddCampaignScreen.tsx`)
**Propósito**: Crear nuevas campañas de marketing con formulario completo

**Información Mostrada**:
- Formulario completo de creación de campaña
- Vista previa de campaña
- Selector de productos para incluir
- Configuración de comisiones e influencers

**Datos Recolectados**:
- **Información Básica**:
  - Nombre de la campaña
  - Descripción detallada
  - Imagen principal de la campaña
  - Fechas de inicio y fin

- **Configuración Comercial**:
  - Porcentaje de comisión para influencers
  - Presupuesto total de la campaña
  - Mercado objetivo
  - Público objetivo detallado

- **Productos y Contenido**:
  - Productos incluidos en la campaña
  - Tipos de contenido requerido (historia, post, video)
  - Links de afiliación y duración
  - Materiales promocionales

- **Reglas y Seguimiento**:
  - Reglas específicas para influencers
  - Métricas de seguimiento
  - Objetivos de la campaña
  - Criterios de éxito

**Funcionalidades**:
- Subida de imágenes a Firebase Storage
- Integración completa con Firebase Firestore
- Validación de formulario en tiempo real
- Selección múltiple de productos
- Configuración avanzada de targeting
- Vista previa de campaña antes de crear

**Interacciones de Usuario**:
- Completar formulario paso a paso
- Subir imagen de campaña
- Seleccionar productos incluidos
- Configurar comisiones
- Establecer fechas y presupuesto
- Crear y publicar campaña

**Validaciones**:
- Nombre de campaña único
- Fechas válidas (inicio < fin)
- Porcentaje de comisión válido (0-100%)
- Al menos un producto seleccionado
- Imagen de campaña obligatoria

---

### 3. SelectProductsScreen (`/src/screens/campaigns/SelectProductsScreen.tsx`)
**Propósito**: Seleccionar productos específicos para incluir en campañas

**Información Mostrada**:
- Lista completa de productos disponibles
- Filtros por categoría y disponibilidad
- Productos ya seleccionados
- Stock disponible por producto
- Información de precios y comisiones

**Funcionalidades**:
- Selección múltiple de productos
- Filtrado por categoría, precio, stock
- Búsqueda por nombre de producto
- Verificación de stock disponible
- Cálculo de comisiones por producto
- Vista previa de productos seleccionados

**Interacciones de Usuario**:
- Buscar productos por nombre
- Filtrar por categorías
- Seleccionar/deseleccionar productos
- Ver detalles de producto
- Confirmar selección
- Configurar cantidad por producto

**Datos Mostrados por Producto**:
- Imagen del producto
- Nombre y descripción
- Precio actual
- Stock disponible
- Comisión aplicable
- Estado de disponibilidad

---

## 🏪 Sección de Tienda y Pantallas Adicionales

### 1. StoreScreen (`/src/screens/store/StoreScreen.tsx`)
**Propósito**: Vista pública de la tienda y gestión de la misma

**Información Mostrada**:
- Frente de tienda para clientes
- Catálogo de productos disponibles
- Información de marca y branding
- Opciones de personalización de tienda

**Funcionalidades**:
- Vista previa de tienda pública
- Gestión de productos mostrados
- Configuración de branding
- Análisis de visitas a la tienda
- Opciones de compartir tienda

**Interacciones de Usuario**:
- Configurar apariencia de tienda
- Gestionar productos mostrados
- Ver estadísticas de tienda
- Compartir enlace de tienda
- Personalizar información de contacto

---

### 2. MiTiendaScreen (`/src/screens/store/MiTiendaScreen.tsx`)
**Propósito**: Gestión personal de la tienda con componentes modulares

**Información Mostrada**:
- Perfil de marca con imágenes editables
- Categorías de productos en scroll horizontal
- Grid de productos destacados
- Sugerencias personalizadas
- Banner de colección especial
- Sección de más productos

**Componentes Principales**:
- **PerfilMarca**: Perfil editable con banner y logo
- **CategoriasScroll**: Categorías horizontales
- **ProductGrid**: Grid responsive de productos
- **SeccionTitulo**: Títulos de sección con acciones
- **BannerColeccion**: Banner promocional de colecciones

**Funcionalidades**:
- Gestión de configuración de tienda
- Edición de perfil de marca
- Organización de productos por secciones
- Análisis de rendimiento de tienda
- Personalización de apariencia
- Estados de carga y error manejados

**Interacciones de Usuario**:
- Editar perfil de marca
- Organizar productos por categorías
- Ver estadísticas de tienda
- Personalizar secciones
- Pull-to-refresh para actualizar

**Fuentes de Datos**:
- Hook `useMiTienda` para gestión de datos
- Productos filtrados por secciones
- Datos de tienda del contexto de usuario

---

### 3. ProfileScreen (`/src/screens/profile/ProfileScreen.tsx`)
**Propósito**: Gestión completa del perfil de usuario con múltiples tabs

**Información Mostrada**:

**Header de Perfil**:
- Banner personalizable de usuario
- Avatar/foto de perfil
- Información básica (nombre, handle)
- Estadísticas (seguidores, seguidos, publicaciones)

**Tab "Publicaciones"**:
- Grid de publicaciones del usuario
- Métricas por publicación (likes, comentarios)
- Estados de publicación

**Tab "Cápsulas"**:
- Colecciones de contenido agrupado
- Vista de cápsulas con múltiples imágenes
- Organización por temas/categorías

**Tab "Calendario"**:
- Calendario moderno con eventos
- Próximos eventos programados
- Historial de eventos anteriores
- **Modal de Creación de Eventos**

**Funcionalidades**:
- Sistema de tabs dinámico
- Integración con Firebase para datos de perfil
- Gestión de publicaciones y contenido
- Sistema de calendario con eventos
- Modals interactivos para detalles

**Modal de Creación de Eventos** (Completamente Implementado):
**Datos Recolectados**:
- Título del evento
- Descripción detallada
- Fecha del evento (con DateTimePicker)
- Ubicación
- Tipo de evento (Lanzamiento, Colaboración, Evento, Competencia)
- Imagen de portada (subida a Firebase Storage)
- Logo de marca (subida a Firebase Storage)

**Funcionalidades del Modal**:
- Formulario completo con validación
- DateTimePicker integrado para selección de fecha
- Subida de imágenes a Firebase Storage
- Selector de tipo de evento con botones
- Validación de campos obligatorios
- Gestión de estados de carga durante subida

**Interacciones de Usuario**:
- Navegar entre tabs de perfil
- Crear nuevos eventos desde calendario
- Editar información de perfil
- Ver publicaciones en detalle
- Gestionar cápsulas de contenido
- Programar eventos futuros

**Modales Incluidos**:
- **Modal de Publicación**: Vista detallada de publicaciones con bottom sheet
- **Modal de Cápsula**: Vista de colecciones con navegación de imágenes
- **Modal de Creación de Eventos**: Formulario completo para crear eventos
- **Modal de Imagen**: Vista ampliada de imágenes

---

### 4. Pantallas Adicionales

#### CollectionsScreen (`/src/screens/collections/CollectionsScreen.tsx`)
**Propósito**: Gestión de colecciones de productos
**Funcionalidades**:
- Crear y editar colecciones
- Organizar productos por colecciones
- Configurar colecciones destacadas

#### InvoicesScreen (`/src/screens/invoices/InvoicesScreen.tsx`)
**Propósito**: Generación y gestión de facturas
**Funcionalidades**:
- Generar facturas automáticas
- Gestionar estados de facturación
- Exportar facturas en PDF

#### ReportsScreen (`/src/screens/reports/ReportsScreen.tsx`)
**Propósito**: Reportes de negocio
**Funcionalidades**:
- Generar reportes personalizados
- Exportar datos
- Análisis de tendencias

#### SettingsScreen (`/src/screens/settings/SettingsScreen.tsx`)
**Propósito**: Configuración de la aplicación
**Funcionalidades**:
- Configuración de cuenta
- Preferencias de notificaciones
- Configuración de privacidad

#### SupportScreen (`/src/screens/support/SupportScreen.tsx`)
**Propósito**: Ayuda y soporte al cliente
**Funcionalidades**:
- Centro de ayuda
- Chat de soporte
- FAQ y documentación

#### InventoryScreen (`/src/screens/main/InventoryScreen.tsx`)
**Propósito**: Interfaz de gestión de stock e inventario
**Información Mostrada**:
- Lista de productos con niveles de stock
- Filtros por disponibilidad
- Alertas de stock bajo
- Historial de movimientos de inventario

**Funcionalidades**:
- Control de stock en tiempo real
- Alertas automáticas de stock bajo
- Historial de movimientos
- Ajustes de inventario

---

## 🧩 Componentes Principales

### Componentes de UI Base

#### 1. Header (`/src/components/Header.tsx`)
**Propósito**: Header principal de la aplicación
**Funcionalidades**:
- Navegación con drawer
- Información de usuario
- Notificaciones
- Búsqueda global

#### 2. CustomButton (`/src/components/CustomButton.tsx`)
**Propósito**: Botón estandarizado para toda la app
**Variantes**:
- Primary, Secondary, Outline
- Diferentes tamaños
- Estados de carga
- Iconos integrados

#### 3. CustomTextInput (`/src/components/CustomTextInput.tsx`)
**Propósito**: Input de texto personalizado
**Funcionalidades**:
- Validación integrada
- Diferentes tipos (email, password, number)
- Estados de error
- Iconos y placeholders

#### 4. BackgroundPattern (`/src/components/BackgroundPattern.tsx`)
**Propósito**: Patrón de fondo consistente
**Funcionalidades**:
- Opacidad configurable
- Diferentes patrones
- Responsive design

#### 5. ToFitLogo (`/src/components/ToFitLogo.tsx`)
**Propósito**: Componente de logo de marca
**Variantes**:
- Diferentes tamaños
- Modos claro y oscuro
- Animaciones opcionales

#### 6. BottomTabBar (`/src/components/BottomTabBar.tsx`)
**Propósito**: Navegación de tabs inferiores personalizada
**Funcionalidades**:
- 5 tabs principales
- Indicadores de estado
- Animaciones de transición
- Badges de notificación

#### 7. DrawerMenu (`/src/components/DrawerMenu.tsx`)
**Propósito**: Menú lateral de navegación
**Funcionalidades**:
- Perfil de usuario
- Enlaces a todas las secciones
- Submenús expandibles
- Estados activos

---

### Componentes de Métricas (`/src/components/metrics/`)

#### 1. ModernMetricCard (`/src/components/metrics/ModernMetricCard.tsx`)
**Propósito**: Tarjetas individuales de métricas con diseño moderno
**Funcionalidades**:
- Visualización de métricas con iconos
- Indicadores de tendencia
- Colores configurables
- Animaciones de carga

#### 2. MetricsList (`/src/components/metrics/MetricsList.tsx`)
**Propósito**: Lista de métricas con acciones
**Funcionalidades**:
- Lista scrollable de métricas
- Acciones rápidas por métrica
- Filtrado y búsqueda
- Agrupación por categorías

#### 3. QuickStatsBar (`/src/components/metrics/QuickStatsBar.tsx`)
**Propósito**: Barra de estadísticas rápidas
**Funcionalidades**:
- Métricas clave en formato compacto
- Scroll horizontal
- Actualización en tiempo real
- Navegación a detalles

#### 4. FilterSection (`/src/components/metrics/FilterSection.tsx`)
**Propósito**: Interfaz de filtrado para métricas
**Funcionalidades**:
- Filtros de fecha
- Filtros por categoría
- Filtros personalizados
- Aplicación en tiempo real

#### 5. LoadingSkeleton (`/src/components/metrics/LoadingSkeleton.tsx`)
**Propósito**: Estados de carga para componentes de métricas
**Funcionalidades**:
- Skeletons animados
- Diferentes tamaños y formas
- Placeholder realista
- Transiciones suaves

#### 6. ModernCalendar (`/src/components/metrics/ModernCalendar.tsx`)
**Propósito**: Calendario moderno para selección de fechas y eventos
**Funcionalidades**:
- Vista mensual con eventos
- Selección de fechas
- Eventos destacados
- Navegación entre meses

#### 7. EnhancedMetricCard (`/src/components/metrics/EnhancedMetricCard.tsx`)
**Propósito**: Tarjetas avanzadas de métricas con gráficos
**Funcionalidades**:
- Gráficos integrados
- Múltiples métricas por tarjeta
- Comparaciones temporales
- Drill-down en datos

#### 8. ModernTabBar (`/src/components/metrics/ModernTabBar.tsx`)
**Propósito**: Navegación por tabs para secciones de métricas
**Funcionalidades**:
- Tabs deslizables
- Indicadores animados
- Estados activos/inactivos
- Badges de información

#### 9. UrgentMetricCard (`/src/components/metrics/UrgentMetricCard.tsx`)
**Propósito**: Tarjetas de métricas para alertas urgentes
**Funcionalidades**:
- Diseño llamativo para alertas
- Colores de urgencia
- Acciones rápidas
- Notificaciones push

---

### Componentes de Productos (`/src/components/products/`)

#### 1. ProductItem (`/src/components/products/ProductItem.tsx`)
**Propósito**: Item individual en listas de productos
**Información Mostrada**:
- Imagen del producto
- Nombre y precio
- Estado de stock
- Indicadores de estado

**Funcionalidades**:
- Navegación a detalles
- Acciones rápidas
- Estados de carga
- Animaciones de interacción

#### 2. ProductHeader (`/src/components/products/ProductHeader.tsx`)
**Propósito**: Header para pantallas de detalle de producto
**Funcionalidades**:
- Información destacada del producto
- Acciones de producto
- Navegación contextual
- Estados dinámicos

---

### Componentes de Órdenes (`/src/components/orders/`)

#### 1. OrderItem (`/src/components/orders/OrderItem.tsx`)
**Propósito**: Item individual en listas de órdenes
**Información Mostrada**:
- Número de orden y fecha
- Cliente y información de contacto
- Productos incluidos (resumen)
- Estado actual y pago
- Monto total
- Origen de venta con iconos (Instagram, WhatsApp, etc.)

**Funcionalidades**:
- Navegación a detalles de orden
- Indicadores de estado visual
- Acciones rápidas (marcar como pagado, etc.)
- Bottom sheet para vista rápida
- Iconos dinámicos según origen de venta

#### 2. PaymentCard (`/src/components/orders/PaymentCard.tsx`)
**Propósito**: Visualización de información de pago
**Funcionalidades**:
- Estados de pago visual
- Información de método de pago
- Historial de transacciones
- Acciones de pago

---

### Componentes de Tienda (`/src/components/store/`)

#### 1. PerfilMarca (`/src/screens/store/components/PerfilMarca.tsx`)
**Propósito**: Componente de perfil de marca editable
**Información Mostrada**:
- Banner de fondo personalizable
- Logo circular de marca
- Nombre de la marca
- Botón de edición

**Funcionalidades**:
- Edición de banner e imágenes
- Subida a Firebase Storage
- Estados de carga durante subida
- Modal para vista ampliada de imágenes
- Modo de edición toggle

**Interacciones de Usuario**:
- Long press para activar modo edición
- Tap para ver imágenes en pantalla completa
- Editar banner y logo
- Guardar cambios automáticamente

---

## 🔥 Fuentes de Datos Firebase

### Colecciones Firestore

#### 1. Colección `users`
**Propósito**: Perfiles de usuario y datos de autenticación
**Estructura de Datos**:
```typescript
{
  uid: string,
  email: string,
  display_name: string,
  photo_url?: string,
  store_id?: string,
  onboarding_completed: boolean,
  created_at: Timestamp,
  updated_at: Timestamp
}
```

#### 2. Colección `products`
**Propósito**: Catálogo de productos con imágenes, precios, variantes
**Estructura de Datos**:
```typescript
{
  id: string,
  nombre: string,
  descripcion?: string,
  precio: number,
  precio_oferta?: number,
  imagenes: string[],
  coleccion?: string,
  categoria: string,
  stock: number,
  variantes?: Variant[],
  estado: 'activo' | 'inactivo',
  store_id: string,
  created_at: Timestamp
}
```

#### 3. Colección `orders`
**Propósito**: Gestión de órdenes y seguimiento
**Estructura de Datos**:
```typescript
{
  id: string,
  numero_orden: string,
  cliente: {
    nombre: string,
    email: string,
    telefono: string,
    direccion: Address
  },
  productos: OrderItem[],
  subtotal: number,
  impuestos: number,
  envío: number,
  total: number,
  estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado',
  estado_pago: 'pendiente' | 'pagado' | 'fallido',
  origen_venta: 'instagram' | 'whatsapp' | 'tienda' | 'web',
  created_at: Timestamp
}
```

#### 4. Colección `campaigns`
**Propósito**: Datos de campañas de marketing
**Estructura de Datos**:
```typescript
{
  id: string,
  marca: string,
  imagen: string,
  comision: string,
  descripcion: string,
  fecha_inicio: Timestamp,
  fecha_fin?: Timestamp,
  objetivo: string,
  publico_objetivo: string,
  productos: Product[],
  materiales: Material[],
  status: 'active' | 'inactive' | 'pending' | 'completed',
  created_by: string,
  created_at: Timestamp
}
```

#### 5. Colección `metrics`
**Propósito**: Datos de analíticas de negocio
**Estructura de Datos**:
```typescript
{
  user_id: string,
  fecha: Timestamp,
  ventas: {
    total: number,
    ordenes: number,
    conversion_rate: number
  },
  productos: {
    mas_vendidos: Product[],
    stock_critico: Product[]
  },
  demograficos: {
    edad: AgeDistribution,
    ubicacion: LocationData,
    genero: GenderData
  }
}
```

#### 6. Colección `marcas` (Tiendas)
**Propósito**: Información de tiendas/marcas
**Estructura de Datos**:
```typescript
{
  id: string,
  nombre: string,
  logo: string,
  portada?: string,
  descripcion?: string,
  owner_id: string,
  configuracion: StoreConfig,
  estadisticas: StoreStats,
  created_at: Timestamp
}
```

---

### Firebase Storage
**Estructura de Almacenamiento**:
```
/users/{userId}/
  - profile_images/
  - content/

/productos/{storeId}/
  - product_images/
  - variant_images/

/campañas/{campaignId}/
  - banner_images/
  - material_assets/

/tiendas/{storeId}/
  - logos/
  - banners/
  - branding/

/eventos/{eventId}/
  - cover_images/
  - brand_logos/
```

---

### Firebase Authentication
**Funcionalidades**:
- Autenticación email/contraseña
- Recuperación de contraseña
- Gestión de sesiones
- Estados de autenticación
- Integración con Firestore para perfiles

---

## 🔧 Hooks Personalizados

### 1. `useUserProfile` (`/src/hooks/useUserProfile.ts`)
**Propósito**: Gestión del perfil de usuario
**Funcionalidades**:
- Datos de perfil en tiempo real
- Actualización de perfil
- Manejo de estados de carga

### 2. `useProducts` (`/src/hooks/useProducts.ts`)
**Propósito**: Gestión de productos
**Funcionalidades**:
- Lista de productos filtrada
- CRUD de productos
- Estados de stock
- Filtrado y búsqueda

### 3. `useCampaigns` (`/src/hooks/useCampaigns.ts`)
**Propósito**: Gestión de campañas
**Funcionalidades**:
- Lista de campañas activas
- Crear y editar campañas
- Métricas de rendimiento

### 4. `useTiendaActual` (`/src/hooks/useTiendaActual.ts`)
**Propósito**: Datos de la tienda actual
**Funcionalidades**:
- Información de tienda
- Configuración de tienda
- Estadísticas de rendimiento

### 5. `useMiTienda` (`/src/screens/store/hooks/useMiTienda.ts`)
**Propósito**: Hook específico para MiTiendaScreen
**Funcionalidades**:
- Datos de tienda organizados por sección
- Productos destacados y sugeridos
- Estados de carga y error
- Funcionalidad de refresh

---

## 📱 Funcionalidades Clave de la App

### Gestión de Datos
- Sincronización Firebase en tiempo real
- Persistencia de datos offline
- Funcionalidad pull-to-refresh
- Estados de carga y manejo de errores
- Validación de formularios

### Experiencia de Usuario
- Navegación drawer con acceso rápido
- Navegación por tabs inferiores para funciones principales
- Interfaces modal para interacciones detalladas
- Búsqueda y filtrado en toda la app
- Diseño responsive y accesible

### Inteligencia de Negocio
- Métricas y analíticas en tiempo real
- Seguimiento de rendimiento de campañas
- Monitoreo de niveles de stock
- Analíticas de ventas e ingresos
- Dashboards personalizables

### Gestión de Contenido
- Gestión de catálogo de productos
- Subida y gestión de imágenes
- Creación de contenido para campañas
- Preparación para integración con redes sociales
- Sistema de calendario con eventos

### Características Específicas
- **Sistema de Órdenes Completo**: Desde creación hasta entrega
- **Gestión de Campañas**: Para marketing con influencers
- **Analíticas Avanzadas**: Con múltiples dimensiones de datos
- **Gestión de Inventario**: Control de stock en tiempo real
- **Perfil de Marca**: Personalización completa de tienda
- **Sistema de Eventos**: Programación y seguimiento de eventos

---

## 🎯 Flujos de Usuario Principales

### 1. Flujo de Registro e Onboarding
1. WelcomeScreen → Seleccionar "Registrarse"
2. OnboardingQuestionsScreen → Responder preguntas de negocio
3. RegisterScreen → Crear cuenta con datos recolectados
4. Verificación → Confirmación por email
5. HomeScreen → Acceso a dashboard principal

### 2. Flujo de Gestión de Productos
1. ProductsListScreen → Ver catálogo
2. AddEditProductScreen → Crear/editar producto
3. AddVariantsScreen → Configurar variantes
4. ProductDetailScreen → Ver producto completo
5. InventoryScreen → Gestionar stock

### 3. Flujo de Órdenes
1. OrdersListScreen → Ver órdenes existentes
2. AddEditOrderScreen → Crear nueva orden
3. SelectProductsScreen → Seleccionar productos
4. OrderDetailScreen → Gestionar orden específica
5. Actualización de estados → Seguimiento completo

### 4. Flujo de Campañas
1. CampaignsScreen → Ver campañas activas
2. AddCampaignScreen → Crear nueva campaña
3. SelectProductsScreen → Seleccionar productos para campaña
4. Configuración → Establecer parámetros
5. Seguimiento → Métricas y rendimiento

### 5. Flujo de Contenido
1. CamaraScreen → Capturar contenido
2. PreviewFotoScreen → Revisar captura
3. EditorFotoScreen → Editar contenido
4. PublicarContenidoScreen → Configurar publicación
5. GaleriaFotosScreen → Gestionar biblioteca

---

Esta documentación completa cubre todos los aspectos del app To Fit Marcas, desde la arquitectura de navegación hasta los detalles específicos de cada pantalla, componente y funcionalidad. La app está diseñada como una plataforma integral para gestión de marcas e influencer marketing, con énfasis en análticas, gestión de productos y campañas de marketing.