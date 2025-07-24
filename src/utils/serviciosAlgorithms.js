import { useMemo } from 'react';

// ==================== PROCESAMIENTO DE DATOS ====================

/**
 * Procesa los datos de profesionales y servicios para la visualización
 */
export const processServiciosData = (profesionales = [], servicios = [], favoritosUser = []) => {
  try {
    // Crear mapa de favoritos para acceso rápido
    const favoritosMap = new Set(favoritosUser.map(fav => fav.servicioId));
    
    // Combinar datos de profesionales con sus servicios
    const serviciosProcessed = servicios.map(servicio => {
      const profesional = profesionales.find(prof => prof.id === servicio.profesionalId);
      
      if (!profesional) {
        console.warn(`Profesional no encontrado para servicio ${servicio.id}`);
        return null;
      }
      
      return {
        id: servicio.id,
        title: servicio.title || servicio.name,
        service: servicio.title || servicio.name,
        price: servicio.price || 0,
        currency: servicio.currency || 'USD',
        rating: servicio.rating || 0,
        reviewCount: servicio.reviewCount || 0,
        category: servicio.categoria || 'general',
        
        // Datos del profesional
        professional: {
          id: profesional.id,
          name: profesional.name,
          avatar: profesional.avatar || profesional.profileImage,
          verified: profesional.isVerified || false,
          rating: profesional.rating || 0,
          reviewCount: profesional.reviewCount || 0
        },
        
        // Datos adicionales para modal
        mainImage: servicio.mainImage || servicio.image,
        image: servicio.mainImage || servicio.image,
        avatar: profesional.avatar || profesional.profileImage,
        name: profesional.name,
        verified: profesional.isVerified || false,
        description: servicio.description || '',
        highlights: servicio.highlights || [],
        portfolio: servicio.portfolio || [],
        paymentMethods: servicio.paymentMethods || [],
        location: servicio.ubicacion || profesional.ubicacion || { city: 'Buenos Aires', neighborhoods: [] },
        reviews: [], // Se cargarán dinámicamente
        
        // Estado de favorito
        isFavorite: favoritosMap.has(servicio.id),
        
        // Métricas
        viewCount: servicio.viewCount || 0,
        favoriteCount: servicio.favoriteCount || 0,
        totalBookings: servicio.totalBookings || 0,
        
        // Metadatos
        createdAt: servicio.createdAt,
        updatedAt: servicio.updatedAt,
        isActive: servicio.isActive
      };
    }).filter(Boolean); // Filtrar servicios sin profesional
    
    return serviciosProcessed;
  } catch (error) {
    console.error('Error processing servicios data:', error);
    return [];
  }
};

/**
 * Filtra servicios según criterios de búsqueda
 */
export const filterServicios = (servicios = [], searchFilters = {}) => {
  try {
    const {
      searchQuery = '',
      categoria = '',
      ubicacion = '',
      precioMin = null,
      precioMax = null,
      rating = null,
      verified = false
    } = searchFilters;
    
    let filtered = [...servicios];
    
    // Filtro por texto de búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(servicio =>
        servicio.title?.toLowerCase().includes(query) ||
        servicio.professional?.name?.toLowerCase().includes(query) ||
        servicio.description?.toLowerCase().includes(query) ||
        servicio.category?.toLowerCase().includes(query)
      );
    }
    
    // Filtro por categoría
    if (categoria) {
      filtered = filtered.filter(servicio => servicio.category === categoria);
    }
    
    // Filtro por ubicación
    if (ubicacion) {
      filtered = filtered.filter(servicio => 
        servicio.location?.city?.toLowerCase().includes(ubicacion.toLowerCase()) ||
        servicio.location?.neighborhoods?.some(neighborhood => 
          neighborhood.toLowerCase().includes(ubicacion.toLowerCase())
        )
      );
    }
    
    // Filtro por rango de precio
    if (precioMin !== null) {
      filtered = filtered.filter(servicio => servicio.price >= precioMin);
    }
    
    if (precioMax !== null) {
      filtered = filtered.filter(servicio => servicio.price <= precioMax);
    }
    
    // Filtro por rating mínimo
    if (rating !== null) {
      filtered = filtered.filter(servicio => servicio.rating >= rating);
    }
    
    // Filtro por profesionales verificados
    if (verified) {
      filtered = filtered.filter(servicio => servicio.professional?.verified);
    }
    
    return filtered;
  } catch (error) {
    console.error('Error filtering servicios:', error);
    return servicios;
  }
};

/**
 * Ordena servicios según criterio seleccionado
 */
export const sortServicios = (servicios = [], sortBy = 'rating') => {
  try {
    const sorted = [...servicios];
    
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      
      case 'price_asc':
        return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      
      case 'price_desc':
        return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      
      case 'reviews':
        return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      
      case 'popularity':
        return sorted.sort((a, b) => (b.totalBookings || 0) - (a.totalBookings || 0));
      
      case 'newest':
        return sorted.sort((a, b) => 
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
      
      case 'name':
        return sorted.sort((a, b) => 
          (a.professional?.name || '').localeCompare(b.professional?.name || '')
        );
      
      default:
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  } catch (error) {
    console.error('Error sorting servicios:', error);
    return servicios;
  }
};

// ==================== ALGORITMOS DE RECOMENDACIÓN ====================

/**
 * Algoritmo principal de recomendaciones personalizadas
 */
export const generateServiceRecommendations = (servicios = [], userHistory = [], userPreferences = {}) => {
  try {
    if (!servicios.length) return [];
    
    // Analizar historial del usuario
    const userAnalysis = analyzeUserServiceHistory(userHistory);
    
    // Calcular score de recomendación para cada servicio
    const scoredServices = servicios.map(servicio => ({
      ...servicio,
      recommendationScore: calculateRecommendationScore(servicio, userAnalysis, userPreferences),
      recommendationReason: getRecommendationReason(servicio, userAnalysis)
    }));
    
    // Ordenar por score y tomar los mejores
    const recommended = scoredServices
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 8);
    
    return recommended;
  } catch (error) {
    console.error('Error generating service recommendations:', error);
    return servicios.slice(0, 8);
  }
};

/**
 * Analiza el historial de servicios del usuario
 */
const analyzeUserServiceHistory = (userHistory = []) => {
  const analysis = {
    categoriesFrequency: {},
    averagePrice: 0,
    preferredLocations: {},
    totalSpent: 0,
    totalServices: userHistory.length
  };
  
  if (!userHistory.length) return analysis;
  
  let totalPrice = 0;
  
  userHistory.forEach(reserva => {
    // Contar categorías
    const categoria = reserva.categoria || 'general';
    analysis.categoriesFrequency[categoria] = (analysis.categoriesFrequency[categoria] || 0) + 1;
    
    // Sumar precios
    const price = reserva.price || 0;
    totalPrice += price;
    
    // Contar ubicaciones
    const location = reserva.ubicacion?.city || 'Unknown';
    analysis.preferredLocations[location] = (analysis.preferredLocations[location] || 0) + 1;
  });
  
  analysis.averagePrice = totalPrice / userHistory.length;
  analysis.totalSpent = totalPrice;
  
  return analysis;
};

/**
 * Calcula score de recomendación para un servicio
 */
const calculateRecommendationScore = (servicio, userAnalysis, userPreferences) => {
  let score = 0;
  
  // Base score por rating y reviews
  score += (servicio.rating || 0) * 10;
  score += Math.min(servicio.reviewCount || 0, 50) * 0.5;
  
  // Bonus por categoría preferida
  const categoryFreq = userAnalysis.categoriesFrequency[servicio.category] || 0;
  score += categoryFreq * 15;
  
  // Bonus por rango de precio similar al histórico
  if (userAnalysis.averagePrice > 0) {
    const priceDiff = Math.abs(servicio.price - userAnalysis.averagePrice);
    const priceScore = Math.max(0, 20 - (priceDiff / userAnalysis.averagePrice) * 20);
    score += priceScore;
  }
  
  // Bonus por ubicación preferida
  const locationFreq = userAnalysis.preferredLocations[servicio.location?.city] || 0;
  score += locationFreq * 10;
  
  // Bonus por profesional verificado
  if (servicio.professional?.verified) {
    score += 5;
  }
  
  // Bonus por popularidad
  score += Math.min(servicio.totalBookings || 0, 100) * 0.1;
  
  // Penalización por servicios muy nuevos sin reviews
  if (servicio.reviewCount === 0) {
    score -= 10;
  }
  
  return Math.max(0, score);
};

/**
 * Obtiene la razón de recomendación para un servicio
 */
const getRecommendationReason = (servicio, userAnalysis) => {
  const reasons = [];
  
  // Razón por categoría
  const categoryFreq = userAnalysis.categoriesFrequency[servicio.category] || 0;
  if (categoryFreq > 0) {
    reasons.push(`Te gusta ${servicio.category}`);
  }
  
  // Razón por rating alto
  if (servicio.rating >= 4.5) {
    reasons.push('Altamente calificado');
  }
  
  // Razón por popularidad
  if (servicio.totalBookings >= 50) {
    reasons.push('Muy solicitado');
  }
  
  // Razón por profesional verificado
  if (servicio.professional?.verified) {
    reasons.push('Profesional verificado');
  }
  
  // Razón por ubicación
  const locationFreq = userAnalysis.preferredLocations[servicio.location?.city] || 0;
  if (locationFreq > 0) {
    reasons.push(`En ${servicio.location?.city}`);
  }
  
  return reasons.length > 0 ? reasons[0] : 'Recomendado para ti';
};

// ==================== MÉTRICAS Y ANALYTICS ====================

/**
 * Calcula métricas de rendimiento de la página
 */
export const calculateServicesMetrics = (servicios = [], reservas = []) => {
  const metrics = {
    totalServices: servicios.length,
    activeServices: servicios.filter(s => s.isActive).length,
    averageRating: 0,
    totalBookings: 0,
    conversionRate: 0,
    topCategories: [],
    professionalStats: {
      total: 0,
      verified: 0,
      verificationRate: 0
    }
  };
  
  if (!servicios.length) return metrics;
  
  // Calcular rating promedio
  const ratingsSum = servicios.reduce((sum, s) => sum + (s.rating || 0), 0);
  metrics.averageRating = ratingsSum / servicios.length;
  
  // Calcular total de reservas
  metrics.totalBookings = servicios.reduce((sum, s) => sum + (s.totalBookings || 0), 0);
  
  // Calcular tasa de conversión (estimada)
  const totalViews = servicios.reduce((sum, s) => sum + (s.viewCount || 0), 0);
  metrics.conversionRate = totalViews > 0 ? (metrics.totalBookings / totalViews) * 100 : 0;
  
  // Top categorías
  const categoriesCount = {};
  servicios.forEach(s => {
    const cat = s.category || 'general';
    categoriesCount[cat] = (categoriesCount[cat] || 0) + 1;
  });
  
  metrics.topCategories = Object.entries(categoriesCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }));
  
  // Estadísticas de profesionales
  const uniqueProfessionals = new Set(servicios.map(s => s.professional?.id)).size;
  const verifiedCount = servicios.filter(s => s.professional?.verified).length;
  
  metrics.professionalStats = {
    total: uniqueProfessionals,
    verified: verifiedCount,
    verificationRate: uniqueProfessionals > 0 ? (verifiedCount / uniqueProfessionals) * 100 : 0
  };
  
  return metrics;
};

// ==================== HOOKS PERSONALIZADOS ====================

/**
 * Hook para manejo completo de servicios con filtros y ordenamiento
 */
export const useProcessedServicios = (rawData, searchFilters, sortBy) => {
  return useMemo(() => {
    const { profesionales = [], servicios = [], favoritosUser = [] } = rawData;
    
    // Procesar datos
    const processed = processServiciosData(profesionales, servicios, favoritosUser);
    
    // Aplicar filtros
    const filtered = filterServicios(processed, searchFilters);
    
    // Aplicar ordenamiento
    const sorted = sortServicios(filtered, sortBy);
    
    return {
      servicios: sorted,
      totalCount: processed.length,
      filteredCount: filtered.length,
      hasFilters: Object.values(searchFilters).some(value => 
        value !== null && value !== undefined && value !== ''
      )
    };
  }, [rawData, searchFilters, sortBy]);
};

/**
 * Hook para recomendaciones de servicios
 */
export const useServiceRecommendations = (servicios, userHistory, userPreferences) => {
  return useMemo(() => {
    return generateServiceRecommendations(servicios, userHistory, userPreferences);
  }, [servicios, userHistory, userPreferences]);
}; 