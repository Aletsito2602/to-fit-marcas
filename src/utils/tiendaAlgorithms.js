// Algoritmos y funciones utilitarias para la tienda dinámica

// ========================================
// ALGORITMOS PARA HERO COLLECTIONS
// ========================================

export const processHeroCollections = (publicaciones, marcas) => {
  if (!publicaciones?.length || !marcas?.length) return []
  
  return publicaciones
    .filter(pub => 
      pub.isFeatured && 
      pub.isActive && 
      pub.collaboration_name &&
      pub.imagenes?.length > 0
    )
    .sort((a, b) => {
      // Priorizar por fecha de creación y prioridad
      const priorityDiff = (b.priority || 0) - (a.priority || 0)
      if (priorityDiff !== 0) return priorityDiff
      return new Date(b.created_at) - new Date(a.created_at)
    })
    .slice(0, 5)
    .map(pub => {
      const marca = marcas.find(m => m.id === pub.marca_id)
      return {
        id: pub.id,
        brand: pub.collaboration_name || `${marca?.nombre} Collection`,
        image: pub.imagenes[0] || pub.image_url,
        buttonText: pub.button_text || "Ver Colección",
        marca_id: pub.marca_id,
        marca_name: marca?.nombre,
        drop_date: pub.launch_date,
        story_id: pub.story_associated,
        priority: pub.priority || 0
      }
    })
}

// ========================================
// ALGORITMOS PARA BRAND COLLECTIONS
// ========================================

export const processBrandCollections = (marcas, tiendas, productos) => {
  if (!marcas?.length) return []
  
  return marcas
    .filter(marca => 
      marca.isActive && 
      marca.hasStore &&
      tiendas?.some(tienda => tienda.marca_id === marca.id && tienda.isActive)
    )
    .map(marca => {
      const tienda = tiendas.find(t => t.marca_id === marca.id && t.isActive)
      const marcaProductos = productos?.filter(p => 
        p.marca_id === marca.id && 
        p.isPublished &&
        p.isActive
      ) || []
      
      // Determinar tipo de promoción
      let type = 'collection'
      let featured = marca.latest_collection_name || 'Nueva Colección'
      
      if (marca.current_discount && marca.current_discount > 0) {
        type = 'discount'
        featured = `${marca.current_discount}%`
      } else if (marca.season_collection) {
        type = 'season'
        featured = marca.season_collection.toUpperCase()
      }

      return {
        id: marca.id,
        brand: marca.nombre,
        image: marca.collection_banner || marca.banner_url || tienda?.banner_url,
        icon: marca.logo_url ? null : marca.nombre.charAt(0).toUpperCase(),
        featured,
        type,
        logo_url: marca.logo_url,
        brand_color: marca.brand_color || '#000000',
        product_count: marcaProductos.length,
        latest_products: marcaProductos
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 8),
        story_id: marca.story_id || tienda?.story_id,
        tienda_id: tienda?.id
      }
    })
    .sort((a, b) => {
      // Priorizar marcas con descuentos, luego por número de productos
      if (a.type === 'discount' && b.type !== 'discount') return -1
      if (b.type === 'discount' && a.type !== 'discount') return 1
      return b.product_count - a.product_count
    })
}

// ========================================
// ALGORITMOS PARA CATEGORÍAS DINÁMICAS
// ========================================

export const getLastViewedProductImage = (userId, productos, userHistory) => {
  if (!userId || !userHistory?.length || !productos?.length) return null
  
  const lastViewed = userHistory
    .filter(h => h.user_id === userId && h.action === 'view_product')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]
  
  if (!lastViewed) return null
  
  const producto = productos.find(p => p.id === lastViewed.producto_id)
  return producto?.imagenes?.[0] || null
}

export const isNewArrival = (createdAt, daysThreshold = 7) => {
  if (!createdAt) return false
  const daysDiff = (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24)
  return daysDiff <= daysThreshold
}

export const calculateTrendingProducts = (productos, lookPosts, userInteractions) => {
  if (!productos?.length) return []
  
  return productos
    .map(producto => {
      let trendingScore = 0
      
      // Score basado en menciones en posts de influencers
      const mentions = lookPosts?.filter(post => 
        post.products_tagged?.includes(producto.id)
      ).length || 0
      trendingScore += mentions * 10
      
      // Score basado en interacciones recientes (últimos 7 días)
      const recentInteractions = userInteractions?.filter(interaction => 
        interaction.producto_id === producto.id &&
        interaction.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length || 0
      trendingScore += recentInteractions * 2
      
      // Score basado en engagement del producto
      trendingScore += (producto.likes_count || 0) * 0.5
      trendingScore += (producto.shares_count || 0) * 1
      trendingScore += (producto.saves_count || 0) * 3
      
      return {
        ...producto,
        trendingScore
      }
    })
    .filter(producto => producto.trendingScore > 0)
    .sort((a, b) => b.trendingScore - a.trendingScore)
}

export const processCategories = (categorias, productos, currentUser, userHistory, lookPosts, userInteractions) => {
  const baseCategories = []
  
  // Categoría: Lo último que viste
  if (currentUser?.id) {
    const recentlyViewed = userHistory
      ?.filter(h => 
        h.user_id === currentUser.id && 
        h.action === 'view_product'
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10)
      .map(h => productos?.find(p => p.id === h.producto_id))
      .filter(Boolean) || []
    
    if (recentlyViewed.length > 0) {
      baseCategories.push({
        id: 'recently_viewed',
        name: 'Lo último que viste',
        image: recentlyViewed[0]?.imagenes?.[0] || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
        products: recentlyViewed,
        count: recentlyViewed.length
      })
    }
  }
  
  // Categoría: Novedades
  const newArrivals = productos?.filter(p => 
    p.isPublished && 
    p.isActive && 
    isNewArrival(p.created_at)
  ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) || []
  
  if (newArrivals.length > 0) {
    baseCategories.push({
      id: 'new_arrivals',
      name: 'Novedades',
      image: newArrivals[0]?.imagenes?.[0] || "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop",
      products: newArrivals,
      count: newArrivals.length
    })
  }
  
  // Categoría: Tendencias
  const trendingProducts = calculateTrendingProducts(productos, lookPosts, userInteractions)
  if (trendingProducts.length > 0) {
    baseCategories.push({
      id: 'trending',
      name: 'Tendencias',
      image: trendingProducts[0]?.imagenes?.[0] || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=250&fit=crop",
      products: trendingProducts.slice(0, 20),
      count: trendingProducts.length
    })
  }
  
  // Categorías de Firebase
  const firebaseCategories = categorias?.filter(cat => cat.isActive).map(cat => {
    const categoryProducts = productos?.filter(p => 
      p.categoria_id === cat.id && 
      p.isPublished && 
      p.isActive
    ) || []
    
    return {
      id: cat.id,
      name: cat.nombre,
      image: cat.image_url || categoryProducts[0]?.imagenes?.[0] || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      products: categoryProducts,
      count: categoryProducts.length,
      order: cat.orden || 999
    }
  }).filter(cat => cat.count > 0) || []
  
  return [
    ...baseCategories,
    ...firebaseCategories.sort((a, b) => a.order - b.order)
  ].slice(0, 5) // Máximo 5 categorías
}

// ========================================
// ALGORITMOS PARA INFLUENCER LOOKS
// ========================================

export const processInfluencerLooks = (influencers, lookPosts, productos, marcas) => {
  if (!influencers?.length || !lookPosts?.length) return []
  
  return influencers
    .map(influencer => {
      const influencerPosts = lookPosts
        .filter(post => 
          post.user_id === influencer.id && 
          post.type === 'look' && 
          post.isActive &&
          post.products_tagged?.length > 0
        )
        .sort((a, b) => (b.engagement_score || 0) - (a.engagement_score || 0))
        .slice(0, 3) // Máximo 3 looks por influencer
      
      if (influencerPosts.length === 0) return null
      
      // Calcular precio total del look principal
      const mainLook = influencerPosts[0]
      const lookPrice = mainLook.products_tagged?.reduce((total, productId) => {
        const producto = productos?.find(p => p.id === productId)
        const price = producto?.precio_actual || producto?.precio || 0
        return total + parseFloat(price.toString().replace(/[^0-9.]/g, ''))
      }, 0) || 0
      
      return {
        id: influencer.id,
        username: influencer.username,
        handle: `@${influencer.username}`,
        avatar: influencer.profile_image || influencer.avatar,
        isVerified: influencer.isVerified,
        looks: influencerPosts.map(post => ({
          id: post.id,
          image: post.imagenes?.[0] || post.image_url,
          engagement_score: post.engagement_score || 0,
          products_tagged: post.products_tagged || [],
          description: post.description || post.caption
        })),
        main_look_image: influencerPosts[0]?.imagenes?.[0] || influencerPosts[0]?.image_url,
        total_price: `$${Math.round(lookPrice)}`,
        commission_rate: influencer.commission_rate || 0.15,
        story_id: influencer.story_id,
        followers_count: influencer.followers_count || 0,
        engagement_rate: influencer.engagement_rate || 0
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Priorizar por verificación, luego por engagement, luego por seguidores
      if (a.isVerified && !b.isVerified) return -1
      if (b.isVerified && !a.isVerified) return 1
      
      const aEngagement = a.looks.reduce((sum, look) => sum + look.engagement_score, 0)
      const bEngagement = b.looks.reduce((sum, look) => sum + look.engagement_score, 0)
      
      if (bEngagement !== aEngagement) return bEngagement - aEngagement
      return b.followers_count - a.followers_count
    })
    .slice(0, 7) // Máximo 7 influencers
}

// ========================================
// ALGORITMOS PARA FEATURED STORES
// ========================================

export const processFeaturedStores = (promotions, tiendas, marcas) => {
  if (!promotions?.length || !tiendas?.length || !marcas?.length) return []
  
  return promotions
    .filter(promo => 
      promo.type === 'store_promotion' && 
      promo.isActive &&
      new Date(promo.expires_at) > new Date()
    )
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .slice(0, 4) // Máximo 4 tiendas destacadas
    .map(promo => {
      const tienda = tiendas.find(t => t.id === promo.store_id)
      const marca = marcas.find(m => m.id === tienda?.marca_id)
      
      return {
        id: promo.id,
        store_id: tienda?.id,
        name: promo.title || tienda?.nombre || 'Nueva Colección',
        subtitle: promo.promotion_text || promo.subtitle || "VER AHORA",
        image: promo.banner_url || tienda?.banner_url || marca?.banner_url,
        marca_name: marca?.nombre,
        marca_id: marca?.id,
        priority: promo.priority || 0,
        expires_at: promo.expires_at,
        featured: promo.priority >= 10, // Prioridad alta = featured
        discount: promo.discount_percentage,
        story_id: promo.story_id || tienda?.story_id
      }
    })
}

// ========================================
// ALGORITMOS DE RECOMENDACIÓN PERSONALIZADA
// ========================================

export const calculateFavoriteCategories = (userPurchases, viewedProducts, productos) => {
  const categoryCount = {}
  
  // Analizar compras históricas
  userPurchases?.forEach(purchase => {
    purchase.productos?.forEach(item => {
      const producto = productos?.find(p => p.id === item.producto_id)
      if (producto?.categoria_id) {
        categoryCount[producto.categoria_id] = (categoryCount[producto.categoria_id] || 0) + 3
      }
    })
  })
  
  // Analizar productos vistos (menos peso)
  viewedProducts?.forEach(productId => {
    const producto = productos?.find(p => p.id === productId)
    if (producto?.categoria_id) {
      categoryCount[producto.categoria_id] = (categoryCount[producto.categoria_id] || 0) + 1
    }
  })
  
  return Object.entries(categoryCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([categoryId]) => categoryId)
}

export const calculateRecommendationScore = (producto, currentUser, userPurchases, viewedProducts, userInteractions) => {
  let score = 0
  
  // Score base por popularidad del producto
  score += (producto.likes_count || 0) * 0.1
  score += (producto.saves_count || 0) * 0.3
  score += (producto.purchases_count || 0) * 0.5
  
  // Bonus por novedad (últimos 30 días)
  if (isNewArrival(producto.created_at, 30)) {
    score += 2
  }
  
  // Bonus por marca preferida del usuario
  const userBrandPurchases = userPurchases?.filter(purchase =>
    purchase.productos?.some(item => {
      const p = item.producto_id // Assuming we'd need to resolve this
      return p === producto.id || item.marca_id === producto.marca_id
    })
  ).length || 0
  
  score += userBrandPurchases * 1.5
  
  // Bonus por categoría favorita
  const favoriteCategories = calculateFavoriteCategories(userPurchases, viewedProducts, [producto])
  if (favoriteCategories.includes(producto.categoria_id)) {
    score += 3
  }
  
  // Penalty por productos ya vistos recientemente
  const recentlyViewed = viewedProducts?.slice(-20) || []
  if (recentlyViewed.includes(producto.id)) {
    score -= 2
  }
  
  // Bonus por rango de precio preferido del usuario
  const userPriceHistory = userPurchases?.flatMap(p => 
    p.productos?.map(item => parseFloat(item.precio?.toString().replace(/[^0-9.]/g, '') || 0))
  ).filter(Boolean) || []
  
  if (userPriceHistory.length > 0) {
    const avgPrice = userPriceHistory.reduce((a, b) => a + b, 0) / userPriceHistory.length
    const productPrice = parseFloat(producto.precio_actual?.toString().replace(/[^0-9.]/g, '') || 0)
    const priceDiff = Math.abs(productPrice - avgPrice) / avgPrice
    
    if (priceDiff < 0.3) { // Dentro del 30% del rango habitual
      score += 1
    }
  }
  
  return score
}

export const processPersonalizedSuggestions = (productos, marcas, currentUser, userPedidos, userInteractions, viewedProducts) => {
  if (!productos?.length || !marcas?.length || !currentUser) {
    // Fallback a productos populares
    return productos?.filter(p => p.isPublished && p.isActive)
      .sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0))
      .slice(0, 10)
      .map(producto => formatProductForSuggestions(producto, marcas)) || []
  }
  
  // Obtener historial de compras del usuario
  const userPurchases = userPedidos?.filter(pedido => 
    pedido.user_id === currentUser.id && 
    pedido.status === 'completed'
  ) || []
  
  // Productos ya comprados (para excluir)
  const purchasedProductIds = new Set(
    userPurchases.flatMap(pedido => 
      pedido.productos?.map(item => item.producto_id) || []
    )
  )
  
  // Calcular score de recomendación para cada producto
  const recommendedProducts = productos
    .filter(producto => 
      producto.isPublished && 
      producto.isActive &&
      !purchasedProductIds.has(producto.id) // No sugerir productos ya comprados
    )
    .map(producto => ({
      ...producto,
      recommendationScore: calculateRecommendationScore(
        producto, 
        currentUser, 
        userPurchases, 
        viewedProducts, 
        userInteractions
      )
    }))
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 10) // Top 10 recomendaciones
  
  return recommendedProducts.map(producto => formatProductForSuggestions(producto, marcas))
}

// ========================================
// FUNCIONES AUXILIARES
// ========================================

export const formatProductForSuggestions = (producto, marcas) => {
  const marca = marcas?.find(m => m.id === producto.marca_id) || {}
  
  const precioActual = producto.precio_actual || producto.precio || 0
  const precioAnterior = producto.precio_anterior || producto.precio_original || null
  
  return {
    id: producto.id,
    nombre: producto.nombre || producto.titulo,
    marca: {
      nombre: marca.nombre || 'Marca',
      icono: marca.logo_url ? null : (marca.nombre?.charAt(0).toUpperCase() || 'M'),
      logo_url: marca.logo_url,
      color: marca.brand_color || '#000000'
    },
    imagen: producto.imagenes?.[0] || producto.image_url,
    imagenes: producto.imagenes || [producto.image_url].filter(Boolean),
    precioActual: formatPrice(precioActual),
    precioAnterior: precioAnterior ? formatPrice(precioAnterior) : null,
    descuento: precioAnterior ? calculateDiscountPercentage(precioAnterior, precioActual) : null,
    isFavorito: producto.isFavorito || false,
    categoria_id: producto.categoria_id,
    likes_count: producto.likes_count || 0,
    saves_count: producto.saves_count || 0,
    recommendationScore: producto.recommendationScore || 0
  }
}

export const formatPrice = (price) => {
  if (!price) return '$0'
  const numericPrice = parseFloat(price.toString().replace(/[^0-9.]/g, ''))
  return `$${numericPrice.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export const calculateDiscountPercentage = (originalPrice, currentPrice) => {
  const original = parseFloat(originalPrice.toString().replace(/[^0-9.]/g, ''))
  const current = parseFloat(currentPrice.toString().replace(/[^0-9.]/g, ''))
  
  if (original <= current) return null
  
  const discount = Math.round(((original - current) / original) * 100)
  return discount > 0 ? `${discount}%` : null
}

export const calculateLookPrice = (productIds, productos) => {
  if (!productIds?.length || !productos?.length) return '$0'
  
  const totalPrice = productIds.reduce((total, productId) => {
    const producto = productos.find(p => p.id === productId)
    const price = parseFloat(producto?.precio_actual?.toString().replace(/[^0-9.]/g, '') || 0)
    return total + price
  }, 0)
  
  return formatPrice(totalPrice)
}

// Función para verificar si un producto está en favoritos del usuario
export const checkIfFavorited = (productId, userId, userFavorites) => {
  if (!userId || !userFavorites) return false
  return userFavorites.some(fav => fav.producto_id === productId && fav.user_id === userId)
} 