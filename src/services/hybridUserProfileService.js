// Servicio híbrido que combina Supabase con localStorage como fallback
import { supabase, supabaseUtils, supabaseConfig } from '../config/supabase'
import localStorageService from './localStorageService'

class HybridUserProfileService {
  constructor() {
    this.connectionStatus = 'unknown' // 'online', 'offline', 'unknown'
    this.lastConnectionCheck = null
    this.connectionCheckInterval = 30000 // 30 segundos
  }

  // ============================================================================
  // GESTIÓN DE CONEXIÓN
  // ============================================================================

  /**
   * Verificar estado de conexión con Supabase
   */
  async checkConnection() {
    const now = new Date().getTime()
    
    // Si acabamos de verificar, usar resultado cached
    if (this.lastConnectionCheck && (now - this.lastConnectionCheck) < 5000) {
      return this.connectionStatus === 'online'
    }
    
    try {
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection check timeout')), 3000)
      )
      
      const testPromise = supabase
        .from('users')
        .select('id')
        .limit(1)
      
      await Promise.race([testPromise, timeout])
      
      this.connectionStatus = 'online'
      this.lastConnectionCheck = now
      
      if (supabaseConfig.debugMode) {
        console.log('🌐 Conexión Supabase: ONLINE')
      }
      
      return true
    } catch (error) {
      this.connectionStatus = 'offline'
      this.lastConnectionCheck = now
      
      if (supabaseConfig.debugMode) {
        console.log('📴 Conexión Supabase: OFFLINE -', error.message)
      }
      
      return false
    }
  }

  // ============================================================================
  // PERFIL DE USUARIO HÍBRIDO
  // ============================================================================

  /**
   * Obtener perfil de usuario (híbrido: Supabase + localStorage)
   */
  async getUserProfile(userId) {
    if (supabaseConfig.debugMode) {
      console.log('🔄 getUserProfile híbrido iniciado para:', userId)
    }

    // 1. Si estamos en modo offline forzado, usar solo localStorage
    if (localStorageService.isOfflineMode()) {
      if (supabaseConfig.debugMode) {
        console.log('📴 Modo offline activado, usando localStorage')
      }
      return localStorageService.getUserProfile(userId)
    }

    // 2. Intentar obtener desde Supabase primero
    const isOnline = await this.checkConnection()
    
    if (isOnline) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single()
        
        if (error) {
          if (error.code === 'PGRST116') {
            // Usuario no encontrado, intentar cache
            const cachedResult = localStorageService.getUserProfile(userId)
            if (cachedResult.success) {
              if (supabaseConfig.debugMode) {
                console.log('💾 Usuario no encontrado en Supabase, usando cache')
              }
              return cachedResult
            }
            return { success: false, error: 'Usuario no encontrado' }
          }
          throw error
        }
        
        // Éxito: guardar en cache y devolver
        localStorageService.saveUserProfile(userId, data)
        
        if (supabaseConfig.debugMode) {
          console.log('✅ Perfil obtenido de Supabase y guardado en cache')
        }
        
        return { success: true, data, source: 'supabase' }
      } catch (error) {
        console.error('Error obteniendo perfil de Supabase:', error)
        
        // Fallback a localStorage
        const cachedResult = localStorageService.getUserProfile(userId)
        if (cachedResult.success) {
          if (supabaseConfig.debugMode) {
            console.log('💾 Error en Supabase, usando cache como fallback')
          }
          return { ...cachedResult, source: 'cache_fallback' }
        }
        
        return { success: false, error: 'No se pudo obtener el perfil' }
      }
    } else {
      // 3. Sin conexión: usar localStorage
      const cachedResult = localStorageService.getUserProfile(userId)
      if (cachedResult.success) {
        if (supabaseConfig.debugMode) {
          console.log('💾 Sin conexión, usando cache')
        }
        return { ...cachedResult, source: 'offline_cache' }
      }
      
      return { success: false, error: 'Sin conexión y sin datos en cache' }
    }
  }

  /**
   * Actualizar perfil de usuario (híbrido)
   */
  async updateUserProfile(userId, profileData) {
    if (supabaseConfig.debugMode) {
      console.log('🔄 updateUserProfile híbrido iniciado para:', userId)
    }

    // 1. Siempre guardar en localStorage primero (para preview inmediato)
    const localResult = localStorageService.saveUserProfile(userId, {
      id: userId,
      ...profileData,
      updated_at: new Date().toISOString()
    })

    if (!localResult.success) {
      console.error('Error guardando en localStorage:', localResult.error)
    }

    // 2. Si estamos en modo offline, solo agregar a cola de sync
    if (localStorageService.isOfflineMode()) {
      const syncResult = localStorageService.addToSyncQueue({
        type: 'updateUserProfile',
        userId,
        data: profileData
      })
      
      if (supabaseConfig.debugMode) {
        console.log('📴 Modo offline: guardado en localStorage y agregado a cola de sync')
      }
      
      return { 
        success: true, 
        data: { id: userId, ...profileData },
        source: 'offline_queue',
        syncQueued: syncResult.success
      }
    }

    // 3. Intentar guardar en Supabase
    const isOnline = await this.checkConnection()
    
    if (isOnline) {
      try {
        // Mapear datos para Supabase
        const mappedData = {}
        if (profileData.avatar) mappedData.avatar_url = profileData.avatar
        if (profileData.banner) mappedData.banner_url = profileData.banner
        if (profileData.name) mappedData.name = profileData.name
        if (profileData.username) mappedData.username = profileData.username
        if (profileData.bio) mappedData.bio = profileData.bio
        if (profileData.location) mappedData.location = profileData.location
        if (profileData.website) mappedData.website = profileData.website
        
        mappedData.updated_at = new Date().toISOString()
        
        // Timeout configurado desde .env
        const timeoutMs = supabaseConfig.timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error(`Timeout después de ${timeoutMs/1000} segundos`)), timeoutMs)
        )
        
        const upsertPromise = supabase
          .from('users')
          .upsert({
            id: userId,
            ...mappedData
          })
          .select()
          .single()
        
        if (supabaseConfig.debugMode) {
          console.log(`⏱️ Intentando guardar en Supabase (timeout: ${timeoutMs/1000}s)...`)
        }
        
        const result = await Promise.race([upsertPromise, timeoutPromise])
        
        if (result instanceof Error) {
          throw result
        }
        
        const { data, error } = result
        
        if (error) {
          throw error
        }
        
        if (supabaseConfig.debugMode) {
          console.log('✅ Perfil actualizado en Supabase exitosamente')
        }
        
        return { 
          success: true, 
          data, 
          source: 'supabase',
          cachedLocally: localResult.success
        }
      } catch (error) {
        console.error('Error actualizando en Supabase:', error)
        
        // Agregar a cola de sync para intentar más tarde
        const syncResult = localStorageService.addToSyncQueue({
          type: 'updateUserProfile',
          userId,
          data: profileData,
          error: error.message
        })
        
        if (supabaseConfig.debugMode) {
          console.log('💾 Error en Supabase, datos guardados localmente y en cola de sync')
        }
        
        // Retornar éxito porque se guardó localmente
        return { 
          success: true, 
          data: { id: userId, ...profileData },
          source: 'local_with_sync',
          error: error.message,
          syncQueued: syncResult.success
        }
      }
    } else {
      // Sin conexión: agregar a cola de sync
      const syncResult = localStorageService.addToSyncQueue({
        type: 'updateUserProfile',
        userId,
        data: profileData
      })
      
      if (supabaseConfig.debugMode) {
        console.log('📴 Sin conexión: guardado localmente y en cola de sync')
      }
      
      return { 
        success: true, 
        data: { id: userId, ...profileData },
        source: 'offline_local',
        syncQueued: syncResult.success
      }
    }
  }

  // ============================================================================
  // SINCRONIZACIÓN
  // ============================================================================

  /**
   * Sincronizar cola pendiente con Supabase
   */
  async syncPendingOperations() {
    const isOnline = await this.checkConnection()
    
    if (!isOnline) {
      if (supabaseConfig.debugMode) {
        console.log('📴 Sin conexión, no se puede sincronizar')
      }
      return { success: false, error: 'Sin conexión' }
    }
    
    const queue = localStorageService.getSyncQueue()
    
    if (queue.length === 0) {
      if (supabaseConfig.debugMode) {
        console.log('📋 Cola de sincronización vacía')
      }
      return { success: true, synced: 0 }
    }
    
    let syncedCount = 0
    let failedCount = 0
    
    for (const operation of queue) {
      try {
        if (operation.type === 'updateUserProfile') {
          // Re-intentar la actualización
          await this.updateUserProfile(operation.userId, operation.data)
          syncedCount++
        }
      } catch (error) {
        console.error('Error sincronizando operación:', error)
        failedCount++
      }
    }
    
    if (failedCount === 0) {
      localStorageService.clearSyncQueue()
    }
    
    if (supabaseConfig.debugMode) {
      console.log(`📋 Sincronización completada: ${syncedCount} éxito, ${failedCount} fallos`)
    }
    
    return { success: true, synced: syncedCount, failed: failedCount }
  }

  // ============================================================================
  // UTILIDADES
  // ============================================================================

  /**
   * Obtener información de debug del servicio híbrido
   */
  getDebugInfo() {
    return {
      connectionStatus: this.connectionStatus,
      lastConnectionCheck: this.lastConnectionCheck,
      offlineMode: localStorageService.isOfflineMode(),
      cacheInfo: localStorageService.getDebugInfo(),
      config: {
        timeout: supabaseConfig.timeout,
        debugMode: supabaseConfig.debugMode,
        offlineModeEnabled: supabaseConfig.offlineMode
      }
    }
  }
}

// Exportar instancia singleton
export default new HybridUserProfileService()