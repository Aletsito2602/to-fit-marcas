import { logEvent, setUserProperties } from 'firebase/analytics'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { analytics, db } from '../config/firebase'

// ========================================
// EVENTOS DE TRACKING PARA TIENDA
// ========================================

// Evento base para tracking
const trackEvent = async (eventName, eventData, saveToFirestore = true) => {
  try {
    // Firebase Analytics
    if (analytics) {
      logEvent(analytics, eventName, {
        ...eventData,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        page_url: window.location.href
      })
    }

    // Guardar en Firestore para análisis detallado
    if (saveToFirestore && db) {
      await addDoc(collection(db, 'analytics_events'), {
        event_name: eventName,
        event_data: eventData,
        timestamp: serverTimestamp(),
        user_agent: navigator.userAgent,
        page_url: window.location.href,
        session_id: getSessionId()
      })
    }
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

// Generar session ID único
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('tofit_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('tofit_session_id', sessionId)
  }
  return sessionId
}

// ========================================
// EVENTOS ESPECÍFICOS DE TIENDA
// ========================================

// Hero Banner Events
export const trackHeroBannerClick = (collaboration) => {
  trackEvent('hero_banner_click', {
    section: 'hero_collections',
    collaboration_id: collaboration.id,
    collaboration_name: collaboration.brand,
    marca_id: collaboration.marca_id,
    marca_name: collaboration.marca_name,
    priority: collaboration.priority
  })
}

export const trackHeroBannerView = (collaborations) => {
  trackEvent('hero_banner_view', {
    section: 'hero_collections',
    collaborations_count: collaborations.length,
    collaboration_ids: collaborations.map(c => c.id),
    top_collaboration: collaborations[0]?.brand
  })
}

// Brand Collections Events
export const trackBrandCollectionClick = (marca) => {
  trackEvent('brand_collection_click', {
    section: 'brand_collections',
    marca_id: marca.id,
    marca_name: marca.brand,
    collection_type: marca.type,
    product_count: marca.product_count,
    has_discount: marca.type === 'discount',
    discount_amount: marca.type === 'discount' ? marca.featured : null
  })
}

export const trackBrandCollectionScroll = (visibleBrands) => {
  trackEvent('brand_collection_scroll', {
    section: 'brand_collections',
    visible_brands: visibleBrands.map(b => ({ id: b.id, name: b.brand })),
    scroll_depth: visibleBrands.length
  })
}

// Category Events
export const trackCategoryClick = (category) => {
  trackEvent('category_click', {
    section: 'categories',
    category_id: category.id,
    category_name: category.name,
    category_type: category.id.includes('_') ? 'dynamic' : 'static',
    product_count: category.count || 0
  })
}

// Influencer Look Events
export const trackInfluencerLookClick = (influencer, lookIndex = 0) => {
  trackEvent('influencer_look_click', {
    section: 'influencer_looks',
    influencer_id: influencer.id,
    influencer_username: influencer.username,
    is_verified: influencer.isVerified,
    look_price: influencer.total_price,
    look_index: lookIndex,
    followers_count: influencer.followers_count,
    engagement_rate: influencer.engagement_rate
  })
}

// Featured Store Events
export const trackFeaturedStoreClick = (store) => {
  trackEvent('featured_store_click', {
    section: 'featured_stores',
    store_id: store.store_id,
    store_name: store.name,
    marca_id: store.marca_id,
    marca_name: store.marca_name,
    is_featured: store.featured,
    priority: store.priority,
    has_discount: !!store.discount
  })
}

// Product Events
export const trackProductClick = (producto, section = 'suggestions') => {
  trackEvent('product_click', {
    section: section,
    producto_id: producto.id,
    producto_name: producto.nombre,
    marca_id: producto.marca?.nombre,
    precio_actual: producto.precioActual,
    has_discount: !!producto.precioAnterior,
    discount_percentage: producto.descuento,
    categoria_id: producto.categoria_id,
    recommendation_score: producto.recommendationScore
  })
}

export const trackProductFavorite = (producto, isFavorited, section = 'suggestions') => {
  trackEvent('product_favorite', {
    section: section,
    action: isFavorited ? 'add_favorite' : 'remove_favorite',
    producto_id: producto.id,
    producto_name: producto.nombre,
    marca_name: producto.marca?.nombre,
    precio_actual: producto.precioActual
  })
}

export const trackProductShare = (producto, section = 'suggestions') => {
  trackEvent('product_share', {
    section: section,
    producto_id: producto.id,
    producto_name: producto.nombre,
    marca_name: producto.marca?.nombre,
    precio_actual: producto.precioActual
  })
}

// Section View Events
export const trackSectionView = (sectionName, itemCount, loadTime) => {
  trackEvent('section_view', {
    section_name: sectionName,
    item_count: itemCount,
    load_time_ms: loadTime,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight
  })
}

// Search and Filter Events
export const trackSearch = (query, resultsCount, section = 'general') => {
  trackEvent('search', {
    search_query: query,
    results_count: resultsCount,
    section: section,
    query_length: query.length
  })
}

export const trackFilter = (filterType, filterValue, resultsCount) => {
  trackEvent('filter_applied', {
    filter_type: filterType,
    filter_value: filterValue,
    results_count: resultsCount
  })
}

// User Journey Events
export const trackPageView = (pageName, additionalData = {}) => {
  trackEvent('page_view', {
    page_name: pageName,
    referrer: document.referrer,
    ...additionalData
  })
}

export const trackUserSession = (sessionData) => {
  trackEvent('session_data', {
    session_duration: sessionData.duration,
    pages_visited: sessionData.pages,
    interactions_count: sessionData.interactions,
    device_type: sessionData.deviceType
  })
}

// ========================================
// ANALYTICS PARA RECOMENDACIONES
// ========================================

export const trackRecommendationImpression = (productos, algorithmType = 'personalized') => {
  trackEvent('recommendation_impression', {
    algorithm_type: algorithmType,
    products_count: productos.length,
    product_ids: productos.map(p => p.id),
    avg_score: productos.reduce((sum, p) => sum + (p.recommendationScore || 0), 0) / productos.length
  })
}

export const trackRecommendationClick = (producto, position, algorithmType = 'personalized') => {
  trackEvent('recommendation_click', {
    algorithm_type: algorithmType,
    producto_id: producto.id,
    position: position,
    recommendation_score: producto.recommendationScore || 0,
    click_through_rate: position > 0 ? 1/position : 1
  })
}

// ========================================
// ANALYTICS DE PERFORMANCE
// ========================================

export const trackLoadTime = (section, startTime) => {
  const endTime = performance.now()
  const loadTime = endTime - startTime
  
  trackEvent('section_load_time', {
    section: section,
    load_time_ms: Math.round(loadTime),
    performance_rating: loadTime < 1000 ? 'excellent' : loadTime < 2000 ? 'good' : 'needs_improvement'
  })
}

export const trackError = (errorType, errorMessage, section = null) => {
  trackEvent('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    section: section,
    stack_trace: new Error().stack?.substring(0, 500) // Limitar tamaño
  })
}

// ========================================
// ANALYTICS DE BUSINESS METRICS
// ========================================

export const trackConversionFunnel = (step, additionalData = {}) => {
  trackEvent('conversion_funnel', {
    funnel_step: step,
    ...additionalData
  })
}

export const trackRevenueEvent = (eventType, amount, currency = 'USD', additionalData = {}) => {
  trackEvent('revenue_event', {
    event_type: eventType, // 'purchase', 'add_to_cart', 'view_item', etc.
    value: amount,
    currency: currency,
    ...additionalData
  })
}

// ========================================
// USER PROPERTIES
// ========================================

export const setUserAnalyticsProperties = (user, additionalProperties = {}) => {
  try {
    if (analytics) {
      setUserProperties(analytics, {
        user_id: user.id,
        user_type: user.role || 'user',
        registration_date: user.created_at,
        is_verified: user.isVerified || false,
        preferred_categories: user.preferredCategories?.join(',') || '',
        total_purchases: user.totalPurchases || 0,
        lifetime_value: user.lifetimeValue || 0,
        ...additionalProperties
      })
    }
  } catch (error) {
    console.error('Error setting user properties:', error)
  }
}

// ========================================
// BATCH ANALYTICS
// ========================================

export const trackBatch = async (events) => {
  try {
    const batch = events.map(event => ({
      ...event,
      timestamp: serverTimestamp(),
      session_id: getSessionId(),
      batch_id: `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }))

    // Enviar en lotes a Firestore
    const promises = batch.map(event => 
      addDoc(collection(db, 'analytics_events'), event)
    )
    
    await Promise.all(promises)
  } catch (error) {
    console.error('Error tracking batch events:', error)
  }
}

// ========================================
// REAL-TIME METRICS
// ========================================

export const trackRealTimeMetric = (metricName, value, additionalData = {}) => {
  trackEvent('realtime_metric', {
    metric_name: metricName,
    metric_value: value,
    ...additionalData
  }, false) // No guardar en Firestore, solo Analytics
}

// ========================================
// UTILIDADES DE ANALYTICS
// ========================================

export const getDeviceType = () => {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export const getConnectionSpeed = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  return connection?.effectiveType || 'unknown'
}

export const getBrowserInfo = () => {
  const ua = navigator.userAgent
  const browser = ua.includes('Chrome') ? 'chrome' : 
                 ua.includes('Firefox') ? 'firefox' : 
                 ua.includes('Safari') ? 'safari' : 
                 ua.includes('Edge') ? 'edge' : 'other'
  
  return {
    browser,
    language: navigator.language,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine
  }
}

// Inicializar analytics automáticamente
export const initializeAnalytics = (user = null) => {
  // Establecer propiedades básicas
  if (user) {
    setUserAnalyticsProperties(user, {
      device_type: getDeviceType(),
      connection_speed: getConnectionSpeed(),
      ...getBrowserInfo()
    })
  }

  // Track page view inicial
  trackPageView('tienda', {
    device_type: getDeviceType(),
    ...getBrowserInfo()
  })
}

// Hook para tracking automático
export const useAnalytics = () => {
  return {
    trackHeroBannerClick,
    trackHeroBannerView,
    trackBrandCollectionClick,
    trackCategoryClick,
    trackInfluencerLookClick,
    trackFeaturedStoreClick,
    trackProductClick,
    trackProductFavorite,
    trackProductShare,
    trackSectionView,
    trackLoadTime,
    trackError,
    trackRecommendationImpression,
    trackRecommendationClick
  }
} 