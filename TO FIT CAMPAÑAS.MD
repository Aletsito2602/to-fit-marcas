# 🚀 TO FIT CAMPAÑAS - ANÁLISIS Y ESTRUCTURA DE DATOS

## 📋 ANÁLISIS DE LA SECCIÓN EXISTENTE

### **🎯 FUNCIONALIDADES IDENTIFICADAS**

#### **1. CampaignsScreen.tsx - Vista Principal**
- **Grid de campañas** disponibles para participar
- **Sistema de búsqueda** por texto
- **Modal de detalles** con información completa
- **Cards con información básica**: Marca, Comisión, Imagen

#### **2. AddCampaignScreen.tsx - Crear Campañas**
- **Formulario completo** para crear nuevas campañas
- **Campos identificados**:
  - Nombre de la campaña
  - Cantidad de afiliados deseados
  - Días de duración
  - Campaña abierta (público/privado)
  - Nombre de ubicación
  - Comisión para afiliados
  - Objetivos de la campaña

#### **3. SelectProductsScreen.tsx - Selección de Productos**
- **Lista de productos** con checkbox
- **Información por producto**: Nombre, Cantidad, Categoría, Tag Color
- **Sistema de búsqueda** por productos
- **Selección múltiple** con estado visual

#### **4. CampaignDetailModal.tsx - Detalles Completos**
- **Sistema de tabs**: Campaña (Productos) y Detalles
- **Grid de productos** asociados a la campaña
- **Información detallada** de cada producto
- **Precios y disponibilidad**

#### **5. CampaignsDetailScreen.tsx - Métricas**
- **Filtros temporales**: Semana, Mes, Año
- **Métricas por campaña**: Revenue, Interactions
- **Estados de campaña**: Active, Inactive, Pending
- **Información de marca** asociada

## 🗄️ ESTRUCTURA DE COLECCIONES FIREBASE PROPUESTA

### **📊 Colección: `campañas`**
```javascript
{
  // Identificación
  id: "camp_001",
  id_marca: "tucci123", // Relación con marcas
  id_creador: "user123", // Usuario que creó la campaña
  
  // Información básica
  nombre: "Campaña Verano 2025",
  descripcion: "Promoción de verano con productos seleccionados",
  objetivos: "Aumentar ventas de productos de verano en un 25%",
  
  // Configuración
  cantidad_afiliados: 50,
  cantidad_afiliados_actuales: 12,
  dias_duracion: 30,
  campaña_abierta: true, // true = pública, false = privada
  ubicacion: "Argentina", // Geografía objetivo
  
  // Comisiones
  comision_tipo: "porcentaje", // "fijo" | "porcentaje" | "mixto"
  comision_valor: 15, // 15% o $15
  comision_fija: null, // Para comisión mixta
  comision_display: "15%", // String para mostrar
  
  // Media
  imagen_principal: "https://...",
  galeria_imagenes: [
    "https://imagen1.jpg",
    "https://imagen2.jpg"
  ],
  
  // Estados y fechas
  estado: "activa", // "borrador" | "activa" | "pausada" | "finalizada" | "cancelada"
  fecha_inicio: timestamp,
  fecha_fin: timestamp,
  fecha_creacion: timestamp,
  fecha_actualizacion: timestamp,
  
  // Productos asociados
  productos_ids: [
    "/productos/prod123",
    "/productos/prod456"
  ],
  
  // Métricas
  metricas: {
    views: 1250,
    clicks: 320,
    conversiones: 45,
    revenue_total: 12500.50,
    revenue_comisiones: 1875.08
  },
  
  // Configuración avanzada
  codigo_promocional: "VERANO25",
  descuento_adicional: 10,
  requisitos_afiliado: {
    min_seguidores: 1000,
    categorias_permitidas: ["moda", "lifestyle"],
    ubicaciones_permitidas: ["AR", "CL", "UY"]
  },
  
  // Configuración de contenido
  hashtags_requeridos: ["#ToFitVerano", "#Moda2025"],
  hashtags_opcionales: ["#Style", "#Fashion"],
  templates_contenido: [
    {
      tipo: "story",
      url: "https://template1.jpg",
      instrucciones: "Usar en stories de Instagram"
    },
    {
      tipo: "post",
      url: "https://template2.jpg", 
      instrucciones: "Para posts de feed"
    }
  ]
}
```

### **👥 Colección: `campañas_afiliados`**
```javascript
{
  // Identificación
  id: "camp_001_user456",
  id_campaña: "camp_001",
  id_afiliado: "user456",
  
  // Estado de participación
  estado: "activo", // "solicitado" | "activo" | "pausado" | "rechazado" | "finalizado"
  fecha_solicitud: timestamp,
  fecha_aprobacion: timestamp,
  fecha_finalizacion: timestamp,
  
  // Métricas individuales
  metricas_afiliado: {
    contenido_creado: 8,
    views_generados: 15000,
    clicks_generados: 450,
    ventas_generadas: 12,
    revenue_generado: 2400.00,
    comision_ganada: 360.00,
    comision_pagada: 200.00,
    comision_pendiente: 160.00
  },
  
  // Contenido generado
  contenido_ids: [
    "/contenido_campañas/cont_001",
    "/contenido_campañas/cont_002"
  ],
  
  // Código de tracking único
  codigo_tracking: "VERANO25_USER456",
  link_afiliado: "https://tofit.com/c/VERANO25_USER456",
  
  // Notas y feedback
  notas_marca: "Excelente engagement",
  rating_afiliado: 4.8,
  comentarios_afiliado: "Muy buena campaña, productos de calidad"
}
```

### **📝 Colección: `contenido_campañas`**
```javascript
{
  // Identificación
  id: "cont_001",
  id_campaña: "camp_001",
  id_afiliado: "user456",
  
  // Información del contenido
  tipo: "instagram_post", // "instagram_story" | "tiktok" | "youtube" | "blog"
  titulo: "Look veraniego con ToFit",
  descripcion: "Outfit completo para el verano",
  
  // Enlaces y media
  url_contenido: "https://instagram.com/p/ABC123",
  imagenes: ["https://image1.jpg", "https://image2.jpg"],
  video_url: "https://video.mp4",
  
  // Estado y aprobación
  estado: "aprobado", // "borrador" | "pendiente" | "aprobado" | "rechazado"
  fecha_publicacion: timestamp,
  fecha_revision: timestamp,
  
  // Métricas del contenido
  metricas_contenido: {
    likes: 1250,
    comentarios: 45,
    shares: 32,
    saves: 89,
    reach: 8500,
    impressions: 12000,
    clicks_link: 156
  },
  
  // Compliance y validación
  hashtags_usados: ["#ToFitVerano", "#Moda2025", "#Style"],
  productos_mostrados: ["/productos/prod123"],
  cumple_requisitos: true,
  notas_revision: "Excelente contenido, muy orgánico"
}
```

### **📈 Colección: `metricas_campañas`**
```javascript
{
  // Identificación
  id: "metricas_camp_001_2025_07",
  id_campaña: "camp_001",
  año: 2025,
  mes: 7,
  semana: 29, // Semana del año
  dia: "2025-07-22",
  
  // Métricas diarias/agregadas
  metricas_dia: {
    afiliados_nuevos: 3,
    contenido_nuevo: 8,
    views_totales: 25000,
    clicks_totales: 680,
    conversiones: 15,
    revenue: 3200.50,
    comisiones_generadas: 480.08
  },
  
  // Top performers
  top_afiliados: [
    {
      id_afiliado: "user456",
      revenue_generado: 1200.00,
      contenido_creado: 3
    }
  ],
  
  // Productos más exitosos
  productos_top: [
    {
      id_producto: "prod123",
      ventas: 8,
      revenue: 1600.00
    }
  ]
}
```

### **🎨 Colección: `templates_campañas`**
```javascript
{
  // Identificación  
  id: "template_001",
  id_marca: "tucci123",
  
  // Información del template
  nombre: "Story Template Verano",
  descripcion: "Template para stories de Instagram",
  tipo: "instagram_story", // "instagram_post" | "tiktok" | "youtube_thumbnail"
  
  // Media
  imagen_template: "https://template.jpg",
  imagen_preview: "https://preview.jpg",
  
  // Configuración
  texto_sugerido: "¡Nuevo look de verano con @marca! 🌞",
  hashtags_sugeridos: ["#VeranoStyle", "#ToFit"],
  instrucciones: "Coloca el producto en el centro de la imagen",
  
  // Uso
  veces_usado: 45,
  rating_promedio: 4.6,
  estado: "activo" // "activo" | "inactivo"
}
```

## 🔄 RELACIONES ENTRE COLECCIONES

### **🔗 Esquema de Relaciones:**

```
Marcas (1) ←→ (N) Campañas
Campañas (1) ←→ (N) Campañas_Afiliados  
Campañas (1) ←→ (N) Contenido_Campañas
Usuarios (1) ←→ (N) Campañas_Afiliados
Productos (N) ←→ (N) Campañas (relación muchos a muchos)
Campañas (1) ←→ (N) Metricas_Campañas
```

## 🎯 CASOS DE USO PRINCIPALES

### **👑 Para Marcas:**
1. **Crear campañas** con productos específicos
2. **Establecer comisiones** y requisitos
3. **Aprobar/rechazar afiliados**
4. **Revisar contenido** generado
5. **Ver métricas** y performance
6. **Gestionar pagos** de comisiones

### **🌟 Para Afiliados:**
1. **Explorar campañas** disponibles
2. **Solicitar participación** en campañas
3. **Crear contenido** siguiendo guidelines
4. **Trackear métricas** personales
5. **Ver ganancias** y comisiones
6. **Descargar templates** y recursos

### **📊 Para Administradores:**
1. **Moderar campañas** y contenido
2. **Resolver disputas** entre partes
3. **Generar reportes** globales
4. **Gestionar pagos** masivos
5. **Analizar tendencias** del mercado

## 🚀 HOOKS Y FUNCIONES PROPUESTAS

### **📱 Hooks para Campañas:**

```javascript
// Hook principal para listar campañas
export const useCampañas = (filtros?) => {
  // Cargar campañas con filtros
  // Estados: loading, error, campañas
  // Funciones: refreshCampañas, filtrarCampañas
}

// Hook para crear/editar campaña
export const useCampañaForm = (campañaId?) => {
  // Manejo del formulario completo
  // Estados: formData, loading, saving
  // Funciones: updateField, saveOrUpdate, addProducto
}

// Hook para métricas de campaña
export const useCampañaMetricas = (campañaId) => {
  // Métricas específicas de una campaña
  // Estados: metricas, loading, timeframe
  // Funciones: cambiarPeriodo, exportarDatos
}

// Hook para gestión de afiliados
export const useCampañaAfiliados = (campañaId) => {
  // Lista y gestión de afiliados
  // Estados: afiliados, solicitudes, loading
  // Funciones: aprobarAfiliado, rechazarAfiliado
}
```

## 🎨 COMPONENTES SUGERIDOS

### **🧩 Componentes Reutilizables:**

```javascript
// Card para mostrar campaña
<CampañaCard 
  campaña={campaña} 
  onPress={handleSelect}
  showMetrics={true}
/>

// Formulario de campaña
<CampañaForm 
  initialData={data}
  onSubmit={handleSubmit}
  loading={saving}
/>

// Selector de productos para campaña
<ProductSelector 
  productos={productos}
  selectedIds={selected}
  onSelectionChange={handleChange}
/>

// Métricas dashboard
<CampañaMetrics 
  campañaId={id}
  timeframe="month"
  showDetails={true}
/>

// Lista de afiliados
<AfiliadosList 
  campañaId={id}
  onAprobar={handleAprobar}
  onRechazar={handleRechazar}
/>
```

## 📋 ESTADOS DE CAMPAÑA SUGERIDOS

### **🔄 Flujo de Estados:**

```
BORRADOR → ACTIVA → PAUSADA → FINALIZADA
    ↓         ↓        ↓
CANCELADA ← CANCELADA ← CANCELADA
```

### **📊 Estados Detallados:**

- **`borrador`**: Campaña en creación, no visible para afiliados
- **`activa`**: Campaña publicada y disponible para participación  
- **`pausada`**: Temporalmente inactiva, se puede reactivar
- **`finalizada`**: Completada exitosamente, en proceso de pagos
- **`cancelada`**: Terminada antes de tiempo, requiere gestión manual

## 🎯 PRÓXIMOS PASOS RECOMENDADOS

### **🚀 Fase 1 - MVP:**
1. **Implementar colecciones** básicas en Firebase
2. **Crear hooks** fundamentales (useCampañas, useCampañaForm)
3. **Actualizar pantallas** existentes con datos dinámicos
4. **Sistema básico** de métricas

### **🚀 Fase 2 - Funcionalidades Avanzadas:**
1. **Sistema de aprobación** de afiliados
2. **Templates** y recursos para afiliados
3. **Dashboard de métricas** avanzadas
4. **Sistema de pagos** automatizado

### **🚀 Fase 3 - Optimización:**
1. **Notificaciones push** para eventos importantes
2. **Sistema de rating** y reviews
3. **IA para recomendación** de campañas
4. **Exportación** de reportes

## 💡 CONSIDERACIONES ADICIONALES

### **🔒 Seguridad:**
- **Validación de permisos** por rol (marca/afiliado)
- **Códigos de tracking** únicos por afiliado
- **Auditoria** de cambios en campañas importantes

### **📊 Performance:**
- **Indexación** en campos de búsqueda frecuente
- **Paginación** en listados largos
- **Cache** de métricas calculadas
- **Agregación** de datos históricos

### **🎯 UX/UI:**
- **Filtros avanzados** por categoría, comisión, ubicación
- **Búsqueda inteligente** con autocompletado
- **Notificaciones** de nuevas oportunidades
- **Dashboard personalizado** por tipo de usuario

---

**📝 NOTA:** Este documento representa una propuesta completa basada en el análisis del código existente. La implementación puede adaptarse según necesidades específicas del negocio y feedback de usuarios.