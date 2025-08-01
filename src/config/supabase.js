import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zfjowsanrhhwioqavpdf.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U'

// Configuración adicional desde variables de entorno
const supabaseTimeout = parseInt(import.meta.env.VITE_SUPABASE_TIMEOUT) || 10000
const debugMode = import.meta.env.VITE_DEBUG_SUPABASE === 'true'
const offlineMode = import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true'

// Debug: verificar configuración
if (debugMode) {
  console.log('🔧 Configuración Supabase:')
  console.log('  - URL:', supabaseUrl)
  console.log('  - Using env vars:', !!import.meta.env.VITE_SUPABASE_URL)
  console.log('  - Timeout configurado:', supabaseTimeout + 'ms')
  console.log('  - Modo offline habilitado:', offlineMode)
}

// Singleton para evitar múltiples instancias
let supabaseInstance = null

// Verificar si ya existe una instancia
if (window.__SUPABASE_CLIENT__) {
  console.log('⚠️ Reutilizando instancia existente de Supabase')
  supabaseInstance = window.__SUPABASE_CLIENT__
}

// Configuración del cliente
const clientConfig = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage,
    storageKey: 'tofit-auth-token'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
}

// Crear cliente de Supabase (singleton)
if (!supabaseInstance) {
  // console.log('🚀 Creando nueva instancia de Supabase')
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, clientConfig)
  // Almacenar en window para evitar múltiples instancias
  window.__SUPABASE_CLIENT__ = supabaseInstance
}

export const supabase = supabaseInstance

// Exportar configuraciones para otros servicios
export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  timeout: supabaseTimeout,
  debugMode,
  offlineMode
}

// Cliente con service role para operaciones admin (NO usar en frontend)
// El service key debe mantenerse solo en el backend por seguridad
// export const supabaseAdmin = ...

// Funciones de utilidad para Supabase
export const supabaseUtils = {
  // Obtener usuario actual
  getCurrentUser: () => supabase.auth.getUser(),
  
  // Obtener sesión actual
  getCurrentSession: () => supabase.auth.getSession(),
  
  // Listener de cambios de auth
  onAuthStateChange: (callback) => supabase.auth.onAuthStateChange(callback),
  
  // Verificar si el usuario está autenticado
  isAuthenticated: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return !!session
  },
  
  // Obtener ID del usuario actual
  getCurrentUserId: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user?.id || null
  },
  
  // Formatear errores de Supabase
  formatError: (error) => {
    if (!error) return null
    
    // Mapear errores comunes
    const errorMessages = {
      'Invalid login credentials': 'Credenciales de login inválidas',
      'Email not confirmed': 'Email no confirmado',
      'User not found': 'Usuario no encontrado',
      'Invalid email': 'Email inválido',
      'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
      'Email already registered': 'Email ya registrado',
      'Token has expired': 'Token expirado',
      'Database error': 'Error de base de datos',
      'Network error': 'Error de conexión'
    }
    
    return errorMessages[error.message] || error.message || 'Error desconocido'
  },
  
  // Función para hacer queries con manejo de errores
  query: async (queryFn) => {
    try {
      const result = await queryFn()
      
      if (result.error) {
        console.error('Supabase query error:', result.error)
        return {
          success: false,
          error: supabaseUtils.formatError(result.error),
          data: null
        }
      }
      
      return {
        success: true,
        data: result.data,
        error: null
      }
    } catch (error) {
      console.error('Supabase query exception:', error)
      return {
        success: false,
        error: supabaseUtils.formatError(error),
        data: null
      }
    }
  },
  
  // Función para subscripciones en tiempo real
  subscribe: (table, options = {}) => {
    const channel = supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: table,
        ...options
      }, (payload) => {
        console.log(`${table} change:`, payload)
        if (options.callback) {
          options.callback(payload)
        }
      })
      .subscribe()
    
    return channel
  },
  
  // Función para obtener la URL de la imagen
  getImageUrl: (bucket, path) => {
    if (!path) return null
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  }
}

export default supabase