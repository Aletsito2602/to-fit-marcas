// ==================== PLACEHOLDER PARA MIGRACIÓN COMPLETA ====================
// Funciones temporales para evitar errores mientras se migra completamente

console.log('⚠️ userActivityService.js está deshabilitado temporalmente')

/**
 * Función temporal para getUserActivityStats - deshabilitada
 */
export const getUserActivityStats = async (userId) => {
  console.log('📊 getUserActivityStats deshabilitado temporalmente para:', userId)
  return {
    success: true,
    data: {
      likesGiven: 0,
      commentsWritten: 0,
      postsSaved: 0,
      postsCreated: 0,
      likesReceived: 0,
      commentsReceived: 0,
      totalActivity: 0,
      engagementReceived: 0,
      averageLikesPerPost: 0
    }
  }
}

/**
 * Función temporal para getUserLikedPosts - deshabilitada
 */
export const getUserLikedPosts = (userId, callback) => {
  console.log('❤️ getUserLikedPosts deshabilitado temporalmente para:', userId)
  callback([])
  return () => {} // unsubscribe function
}

/**
 * Función temporal para getUserSavedPosts - deshabilitada
 */
export const getUserSavedPosts = (userId, callback) => {
  console.log('💾 getUserSavedPosts deshabilitado temporalmente para:', userId)
  callback([])
  return () => {} // unsubscribe function
}

/**
 * Función temporal para updateUserActivityMetrics - deshabilitada
 */
export const updateUserActivityMetrics = async (userId) => {
  console.log('📈 updateUserActivityMetrics deshabilitado temporalmente para:', userId)
  return { success: true }
}

/**
 * Función temporal para getUserRecentActivity - deshabilitada
 */
export const getUserRecentActivity = async (userId, limitCount = 50) => {
  console.log('📝 getUserRecentActivity deshabilitado temporalmente para:', userId)
  return {
    success: true,
    data: []
  }
}

/**
 * Función temporal para syncUserActivityOnAction - deshabilitada (IMPORTANTE)
 */
export const syncUserActivityOnAction = async (userId, actionType) => {
  console.log('🔄 syncUserActivityOnAction deshabilitado temporalmente:', userId, actionType)
  return { success: true }
} 