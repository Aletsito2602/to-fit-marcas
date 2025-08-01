// Servicio de localStorage para cache y modo offline
import { supabaseConfig } from '../config/supabase'

class LocalStorageService {
  constructor() {
    this.prefix = 'tofit_'
    this.profileKey = this.prefix + 'user_profile_'
    this.cacheExpiryKey = this.prefix + 'cache_expiry_'
    this.offlineModeKey = this.prefix + 'offline_mode'
    
    // Configuración de cache (1 hora por defecto)
    this.cacheExpiry = 60 * 60 * 1000 // 1 hora en ms
  }

  // ============================================================================
  // MÉTODOS DE PERFIL DE USUARIO
  // ============================================================================

  /**
   * Guardar perfil de usuario en localStorage
   */
  saveUserProfile(userId, profileData) {
    try {
      const key = this.profileKey + userId
      const cacheKey = this.cacheExpiryKey + userId
      
      const dataToStore = {
        ...profileData,
        lastUpdated: new Date().toISOString(),
        source: 'localStorage'
      }
      
      localStorage.setItem(key, JSON.stringify(dataToStore))
      localStorage.setItem(cacheKey, new Date().getTime().toString())
      
      if (supabaseConfig.debugMode) {
        console.log('💾 Perfil guardado en localStorage:', userId)
      }
      
      return { success: true }
    } catch (error) {
      console.error('Error guardando perfil en localStorage:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Obtener perfil de usuario desde localStorage
   */
  getUserProfile(userId) {
    try {
      const key = this.profileKey + userId
      const cacheKey = this.cacheExpiryKey + userId
      
      const cached = localStorage.getItem(key)
      const cacheTime = localStorage.getItem(cacheKey)
      
      if (!cached) {
        return { success: false, error: 'No data in cache' }
      }
      
      // Verificar si el cache ha expirado
      if (cacheTime) {
        const age = new Date().getTime() - parseInt(cacheTime)
        if (age > this.cacheExpiry) {
          if (supabaseConfig.debugMode) {
            console.log('💾 Cache expirado para usuario:', userId)
          }
          return { success: false, error: 'Cache expired' }
        }
      }
      
      const profileData = JSON.parse(cached)
      
      if (supabaseConfig.debugMode) {
        console.log('💾 Perfil recuperado de localStorage:', userId)
      }
      
      return { success: true, data: profileData }
    } catch (error) {
      console.error('Error recuperando perfil de localStorage:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Verificar si hay datos en cache para un usuario
   */
  hasUserProfile(userId) {
    const key = this.profileKey + userId
    return localStorage.getItem(key) !== null
  }

  /**
   * Limpiar cache de perfil de usuario
   */
  clearUserProfile(userId) {
    try {
      const key = this.profileKey + userId
      const cacheKey = this.cacheExpiryKey + userId
      
      localStorage.removeItem(key)
      localStorage.removeItem(cacheKey)
      
      return { success: true }
    } catch (error) {
      console.error('Error limpiando cache de perfil:', error)
      return { success: false, error: error.message }
    }
  }

  // ============================================================================
  // MODO OFFLINE
  // ============================================================================

  /**
   * Activar modo offline
   */
  setOfflineMode(enabled = true) {
    try {
      localStorage.setItem(this.offlineModeKey, enabled.toString())
      
      if (supabaseConfig.debugMode) {
        console.log('📴 Modo offline:', enabled ? 'ACTIVADO' : 'DESACTIVADO')
      }
      
      return { success: true }
    } catch (error) {
      console.error('Error configurando modo offline:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Verificar si está en modo offline
   */
  isOfflineMode() {
    try {
      const offline = localStorage.getItem(this.offlineModeKey)
      return offline === 'true'
    } catch (error) {
      console.error('Error verificando modo offline:', error)
      return false
    }
  }

  // ============================================================================
  // COLA DE SINCRONIZACIÓN (para cuando vuelva la conexión)
  // ============================================================================

  /**
   * Agregar operación a la cola de sincronización
   */
  addToSyncQueue(operation) {
    try {
      const queueKey = this.prefix + 'sync_queue'
      const existing = localStorage.getItem(queueKey)
      const queue = existing ? JSON.parse(existing) : []
      
      const operationWithId = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        ...operation
      }
      
      queue.push(operationWithId)
      localStorage.setItem(queueKey, JSON.stringify(queue))
      
      if (supabaseConfig.debugMode) {
        console.log('📋 Operación agregada a cola de sync:', operationWithId.type)
      }
      
      return { success: true, operationId: operationWithId.id }
    } catch (error) {
      console.error('Error agregando a cola de sync:', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Obtener cola de sincronización
   */
  getSyncQueue() {
    try {
      const queueKey = this.prefix + 'sync_queue'
      const queue = localStorage.getItem(queueKey)
      return queue ? JSON.parse(queue) : []
    } catch (error) {
      console.error('Error obteniendo cola de sync:', error)
      return []
    }
  }

  /**
   * Limpiar cola de sincronización
   */
  clearSyncQueue() {
    try {
      const queueKey = this.prefix + 'sync_queue'
      localStorage.removeItem(queueKey)
      
      if (supabaseConfig.debugMode) {
        console.log('📋 Cola de sincronización limpiada')
      }
      
      return { success: true }
    } catch (error) {
      console.error('Error limpiando cola de sync:', error)
      return { success: false, error: error.message }
    }
  }

  // ============================================================================
  // UTILIDADES
  // ============================================================================

  /**
   * Obtener información de debug del cache
   */
  getDebugInfo() {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix))
      const totalSize = keys.reduce((size, key) => {
        return size + (localStorage.getItem(key)?.length || 0)
      }, 0)
      
      return {
        totalKeys: keys.length,
        totalSize: totalSize + ' chars',
        offlineMode: this.isOfflineMode(),
        syncQueueSize: this.getSyncQueue().length
      }
    } catch (error) {
      console.error('Error obteniendo debug info:', error)
      return null
    }
  }

  /**
   * Limpiar todo el cache de ToFit
   */
  clearAllCache() {
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith(this.prefix))
      keys.forEach(key => localStorage.removeItem(key))
      
      if (supabaseConfig.debugMode) {
        console.log('💾 Todo el cache de ToFit limpiado')
      }
      
      return { success: true, keysRemoved: keys.length }
    } catch (error) {
      console.error('Error limpiando cache:', error)
      return { success: false, error: error.message }
    }
  }
}

// Exportar instancia singleton
export default new LocalStorageService()