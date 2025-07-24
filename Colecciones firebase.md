# Colecciones Firebase - ToFit App

## Colección: `users`

### Estructura de Documentos de Usuario

**Ruta:** `/users/{userId}`

```javascript
{
  // Identificación básica
  uid: "string", // ID único de Firebase Auth
  email: "string", // Email del usuario
  display_name: "string", // Nombre para mostrar
  nombre_completo: "string", // Nombre completo
  alias: "string", // @username (ej: "@ellocoale")
  
  // Perfil público
  descripcion: "string", // Biografía del usuario (ej: "Fanatic de la moda")
  photo_url: "string", // URL de foto de perfil en Firebase Storage
  portada: "string", // URL de imagen de portada en Firebase Storage
  enlaces: "string", // Enlaces adicionales (ej: "whapy.com/soyale")
  
  // Configuración de cuenta
  perfil_influencer: "boolean", // Si es perfil de influencer
  pin_code: "number", // PIN de seguridad (ej: 2020)
  
  // Metadata
  created_time: "timestamp", // Fecha de creación de la cuenta
  updated_at: "timestamp" // Última actualización
}
```

### Ejemplo de Documento Real

```javascript
{
  uid: "42KN92buJigbd4Qyx8jJtM9ds8D2",
  email: "aletsdesignn@gmail.com",
  display_name: "Alejandro",
  nombre_completo: "Alejandro", 
  alias: "@ellocoale",
  descripcion: "Fanatic de la moda",
  photo_url: "https://firebasestorage.googleapis.com/v0/b/to-fit.firebasestorage.app/o/users%2F42KN92buJigbd4Qyx8jJtM9ds8D2%2Fuploads%2F1743531523638000.png?alt=media&token=9ff7d789-a846-4e78-a896-3e4f41ae8c53",
  portada: "https://firebasestorage.googleapis.com/v0/b/to-fit.firebasestorage.app/o/users%2F42KN92buJigbd4Qyx8jJtM9ds8D2%2Fuploads%2F1743531538656000.png?alt=media&token=399aeac1-450b-4081-8c1f-7817c11b38df",
  enlaces: "whapy.com/soyale",
  perfil_influencer: true,
  pin_code: 2020,
  created_time: "2025-01-28T09:19:20.000Z"
}
```

---

## Notas de Implementación

### Campos Identificados
- ✅ **Perfil básico**: uid, email, nombres, alias
- ✅ **Contenido visual**: photo_url, portada (ambos en Firebase Storage)
- ✅ **Configuración social**: descripcion, enlaces, perfil_influencer
- ✅ **Seguridad**: pin_code para verificación
- ✅ **Timestamps**: created_time para auditoría

### Patrones de Storage
```
users/{userId}/uploads/{timestamp}.png
```

### Próximas Colecciones por Agregar
- `products` - Catálogo de productos del usuario
- `orders` - Pedidos y transacciones
- `campaigns` - Campañas de marketing
- `metrics` - Métricas del usuario
- `followers` - Sistema de seguimiento social

---

## Colección: `productos`

### Estructura de Documentos de Producto

**Ruta:** `/productos/{productoId}`

```javascript
{
  // Información básica del producto
  nombre: "string", // Nombre del producto (ej: "Skort Accademia Black")
  descripcion: "string", // Descripción detallada del producto
  categoria: "string", // Categoría del producto (ej: "Falda")
  precio: "string", // Precio del producto (ej: "$185.000")
  
  // Información de la tienda
  tienda: "string", // Nombre de la tienda (ej: "NERATTA")
  id_tienda: "string", // ID único de la tienda (ej: "neratta123")
  logo_tienda: "string", // URL del logo de la tienda
  
  // Variantes del producto
  color: "string[]", // Array de colores disponibles
  talles: "string[]", // Array de talles disponibles
  
  // Media principal
  portada: "string", // Imagen principal del producto
  
  // Interacciones sociales
  likes: "reference[]", // Array de referencias a usuarios que dieron like
  
  // Metadata
  fecha_creado: "timestamp" // Fecha de creación del producto
}
```

### Subcolección: `galeria_fotos`

**Ruta:** `/productos/{productoId}/galeria_fotos/{fotoId}`

```javascript
{
  foto: "string", // URL de la imagen en Firebase Storage
  orden: "number", // Orden de visualización
  es_portada: "boolean", // Si es la imagen principal
  fecha_subida: "timestamp" // Fecha de subida
}
```

### Ejemplo de Documento Real

```javascript
// Documento principal: /productos/{productoId}
{
  nombre: "Skort Accademia Black",
  descripcion: "La Skort Accademia Black de Neratta combina la elegancia de una falda con la comodidad de un short. Diseñada para ofrecer estilo y libertad de movimiento, esta pieza versátil es ideal para cualquier ocasión, desde looks casuales hasta atuendos más sofisticados. Su color negro clásico y su ajuste favorecedor la convierten en un imprescindible en tu armario.",
  categoria: "Falda",
  precio: "$185.000",
  tienda: "NERATTA",
  id_tienda: "neratta123",
  logo_tienda: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeXDnWYsE5sszGlwovNl6mfs2PRt9ffXaTAA&s",
  color: ["Blanco", "Azul"],
  talles: ["XXL"],
  portada: "https://acdn-us.mitiendanube.com/stores/001/616/477/products/n-ec-1150-b82a0bc4520ecc2afc17259930958273-1024-1024.webp",
  likes: ["/users/bCrFwOZYw6aYwXr8V9bjIP5BDJq2"],
  fecha_creado: "2025-03-23T17:02:00.000Z"
}

// Subcolección: /productos/{productoId}/galeria_fotos/{fotoId}
{
  foto: "https://acdn-us.mitiendanube.com/stores/001/616/477/products/n-ec-1346-5a35811630759744c117259930956406-640-0.webp",
  orden: 1,
  es_portada: false,
  fecha_subida: "2025-03-23T17:02:00.000Z"
}
```

---

## Notas de Implementación - Productos

### Campos Identificados
- ✅ **Información básica**: nombre, descripcion, categoria, precio
- ✅ **Datos de tienda**: tienda, id_tienda, logo_tienda
- ✅ **Variantes**: color[] y talles[] como arrays
- ✅ **Media**: portada principal + subcolección galeria_fotos
- ✅ **Interacciones**: likes como array de referencias a users
- ✅ **Timestamps**: fecha_creado

### Estructura de Referencias
```javascript
// Like de usuario
likes: ["/users/{userId}"]

// Subcolección de fotos
/productos/{productoId}/galeria_fotos/{fotoId}
```

### Patrones Identificados
- **Precios como strings** (incluye símbolo de moneda)
- **Colores y talles como arrays** (múltiples opciones)
- **Sistema de likes** con referencias a usuarios
- **Galería separada** en subcolección para optimización

### Próximas Colecciones por Agregar
- `orders` - Pedidos que incluyen estos productos
- `campaigns` - Campañas que promocionan productos
- `inventory` - Control de stock por variante
- `reviews` - Reseñas y calificaciones

---

## Colección: `tiendas`

### Estructura de Documentos de Tienda

**Ruta:** `/tiendas/{tiendaId}`

```javascript
{
  // Identificación de la tienda
  id_tienda: "string", // ID único de la tienda (ej: "tucci123")
  alias_tienda: "string", // Alias/handle de la tienda (ej: "tucci123")
  nombre: "string", // Nombre comercial de la tienda (ej: "Tucci")
  
  // Media y branding
  logo_tienda: "string", // URL del logo de la tienda
  portada_tienda: "string", // Imagen de portada principal
  portada_minimal: "string", // Portada minimalista/alternativa
  portada_venta_tienda: "string" // Imagen específica para sección de ventas
}
```

### Ejemplo de Documento Real

```javascript
// Documento: /tiendas/tucci123
{
  id_tienda: "tucci123",
  alias_tienda: "tucci123",
  nombre: "Tucci",
  logo_tienda: "https://promosdelbanco.com/wp-content/uploads/2019/11/TUCCI-min.png",
  portada_tienda: "https://getthelookar.vtexassets.com/arquivos/ids/181931/241178_set-tucci-nero-edp-100ml-body-splash-75-ml_imagen-1.jpg?v=638588238439830000",
  portada_minimal: "https://www.tucciweb.com/uploads/picture/image/28458/sabana_TTI25MT03699-2.jpg",
  portada_venta_tienda: "https://scontent.fcor11-1.fna.fbcdn.net/v/t39.30808-6/297434449_10158913078310906_5091892674333706773_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeHyS3fUAxeAE_zl2TpBSe_2VeDrf4efCsJV4Ot_h58KwnXt3oU69WMnbIiA1nbDXG-AaBdML8N6yUEQSx4qSoZy&_nc_ohc=3GWq-SJOl1wQ7kNvgEpTbAs&_nc_oc=AdhhbE_hLbdFMh5Rgu-vf2OXUlIrXNsBf6F1EGIVL7eWyvNo5tqS44D5kfR7aAdLqhSbHMqoW5dKIZTAIifSQ1vT&_nc_zt=23&_nc_ht=scontent.fcor11-1.fna&_nc_gid=6EQ-U5XAq75lu-BVX-MM0A&oh=00_AYE1HghxEL71MWPqH6s0Ttv92sXdV2i-ea6t_L8C8W3efg&oe=67DE4416"
}
```

---

## Notas de Implementación - Tiendas

### Campos Identificados
- ✅ **Identificación única**: id_tienda y alias_tienda (mismo valor)
- ✅ **Branding básico**: nombre, logo_tienda
- ✅ **Sistema de portadas múltiples**: 3 tipos diferentes de imágenes de portada
  - `portada_tienda`: Imagen principal de la tienda
  - `portada_minimal`: Versión minimalista
  - `portada_venta_tienda`: Específica para sección de ventas

### Patrones Identificados
- **ID y alias coinciden** (mismo valor para identificación)
- **Sistema de portadas múltiples** para diferentes contextos de uso
- **URLs externas** para imágenes (no Firebase Storage en este caso)

### Relaciones con Otras Colecciones
```javascript
// Referencia desde productos
productos.id_tienda -> tiendas.id_tienda
productos.tienda -> tiendas.nombre
productos.logo_tienda -> tiendas.logo_tienda
```

### Próximas Colecciones por Agregar
- `orders` - Pedidos realizados a tiendas
- `campaigns` - Campañas por tienda
- `tienda_stats` - Estadísticas de performance por tienda
- `tienda_config` - Configuración específica por tienda

---

## Colección: `posts`

### Estructura de Documentos de Post

**Ruta:** `/posts/{postId}`

```javascript
{
  // Identificación del post
  id_posts: "string", // ID único del post
  id_autor_post: "string", // ID del autor/tienda que creó el post
  
  // Información básica
  nombre: "string", // Nombre de la tienda/autor
  perfil_alias: "string", // Alias del perfil (ej: "@tucci")
  info: "string", // Descripción o información del post
  
  // Media del post
  logo: "string", // URL del logo de la tienda/autor
  portada: "string", // Imagen principal del post
  
  // Interacciones sociales
  likes: "reference[]", // Array de referencias a usuarios que dieron like
  
  // Referencias a contenido guardado
  guardados_capsulas: "reference[]" // Referencias a cápsulas guardadas
}
```

### Subcolección: `comentarios_posts`

**Ruta:** `/posts/{postId}/comentarios_posts/{comentarioId}`

```javascript
{
  // Información del autor del comentario
  autor: "string", // Nombre del usuario que comentó
  alias_autor: "string", // Email o alias del autor
  foto_autor: "string", // URL de la foto de perfil del autor
  id_post: "string", // Referencia al post comentado
  
  // Contenido del comentario
  comentario: "string", // Texto del comentario
  fecha: "timestamp", // Fecha y hora del comentario
  
  // Interacciones del comentario
  likes: "reference[]" // Array de referencias a usuarios que dieron like al comentario
}
```

### Subcolección: `detalles_producto`

**Ruta:** `/posts/{postId}/detalles_producto/{detalleId}`

```javascript
{
  nombre: "string", // Nombre del producto
  info: "string", // Información adicional del producto
  portada: "string" // Imagen del producto
}
```

### Ejemplo de Documento Real

```javascript
// Documento principal: /posts/{postId}
{
  id_posts: "tucci123",
  id_autor_post: "tucci123",
  nombre: "Tucci",
  perfil_alias: "@tucci",
  info: "sdasdsd",
  logo: "https://media.licdn.com/dms/image/v2/C4D0BAQHx6-aERgDVkw/company-logo_200_200/company-logo_200_200/0/1654529071743/tucci_logo?e=2147483647&v=beta&t=QNlL6vMEnt4kRpZlgRQNl5MRXbnY54CzbVkxmBVzJS0",
  portada: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2024%2F08%2F26%2Fnike-women-yoon-collection-naomi-osaka-campaign-release-info-1.jpg?q=75&w=800&cbr=1&fit=max",
  likes: [
    "/users/zQYLiUVsLvTIykiVns7T2RxI2ln2",
    "/users/bCrFwOZYw6aYwXr8V9bjIP5BDJq2"
  ],
  guardados_capsulas: [
    "/capsulas_user/liUI92uZWtmUnYG9KcjH"
  ]
}

// Subcolección: /posts/{postId}/comentarios_posts/{comentarioId}
{
  autor: "Agostina",
  alias_autor: "agos.belen@gmail.com",
  foto_autor: "https://firebasestorage.googleapis.com/v0/b/to-fit.firebasestorage.app/o/users%2FzQYLiUVsLvTIykiVns7T2RxI2ln2%2Fuploads%2F1739009878491441.jpg?alt=media&token=9a098d87-eabd-47bc-9378-64c62f593f99",
  id_post: "@soyagos",
  comentario: "me encanta la aplicacion 🤩🤩",
  fecha: "2025-02-08T10:40:11.000Z",
  likes: [
    "/users/bCrFwOZYw6aYwXr8V9bjIP5BDJq2"
  ]
}

// Subcolección: /posts/{postId}/detalles_producto/{detalleId}
{
  nombre: "asdasd",
  info: "asdasd",
  portada: "https://www.tucciweb.com/uploads/picture/image/24193/TTV25MV0221C-1aaa__1_.jpg"
}
```

---

## Notas de Implementación - Posts

### Campos Identificados
- ✅ **Identificación**: id_posts, id_autor_post
- ✅ **Perfil del autor**: nombre, perfil_alias, logo
- ✅ **Contenido**: info (descripción), portada (imagen principal)
- ✅ **Interacciones sociales**: likes como array de referencias
- ✅ **Referencias externas**: guardados_capsulas

### Subcolecciones Identificadas
1. **comentarios_posts**: Sistema completo de comentarios con:
   - Información del autor del comentario
   - Contenido y timestamp
   - Sistema de likes por comentario

2. **detalles_producto**: Información de productos relacionados con el post:
   - Nombre, info y portada del producto

### Patrones Identificados
- **Sistema de likes anidado**: Tanto posts como comentarios tienen likes
- **Referencias a otras colecciones**: guardados_capsulas apunta a `/capsulas_user/`
- **Estructura jerárquica**: Post principal con subcolecciones organizadas
- **Timestamps**: Fecha completa en comentarios para ordenamiento

### Relaciones con Otras Colecciones
```javascript
// Referencias desde posts
posts.guardados_capsulas -> /capsulas_user/{capsulaId}
posts.likes -> /users/{userId}

// Referencias desde comentarios
comentarios_posts.likes -> /users/{userId}
comentarios_posts.foto_autor -> Firebase Storage (users)

// Referencia desde autor del post  
posts.id_autor_post -> tiendas.id_tienda
```

### Próximas Colecciones por Agregar
- `capsulas_user` - Cápsulas guardadas por usuarios
- `post_analytics` - Estadísticas de rendimiento de posts
- `post_reports` - Sistema de reportes de contenido

---

*Última actualización: 28 de enero, 2025*