import { supabase, supabaseUtils } from '../config/supabase'

class SupabaseAuthService {
  
  // ============================================================================
  // MÉTODOS DE AUTENTICACIÓN
  // ============================================================================
  
  /**
   * Login con email y password
   */
  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        console.error('Error en login Supabase:', error)
        return {
          success: false,
          error: supabaseUtils.formatError(error)
        }
      }
      
      // Obtener datos adicionales del usuario
      let userData = await this.getUserData(data.user.id)
      
      // Si no existe el perfil, crearlo automáticamente
      if (!userData) {
        console.log('⚠️ Perfil no encontrado en login, creando...')
        const profileResult = await this.createUserProfile(data.user.id, {
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Usuario ToFit',
          username: data.user.email?.split('@')[0] || `user_${data.user.id.slice(0, 8)}`,
          avatar_url: data.user.user_metadata?.avatar_url || null,
          role: 'user',
          provider: 'email'
        })
        
        if (profileResult.success) {
          userData = profileResult.data
        } else if (!profileResult.error?.includes('duplicate key') && !profileResult.error?.includes('already exists')) {
          console.error('❌ Error creando perfil en login:', profileResult.error)
        }
        
        // Si sigue sin userData, intentar obtenerlo de nuevo
        if (!userData) {
          userData = await this.getUserData(data.user.id)
        }
      }
      
      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: userData?.name || data.user.user_metadata?.name || 'Usuario ToFit',
          username: userData?.username || '',
          avatar: userData?.avatar_url || data.user.user_metadata?.avatar_url || null,
          role: userData?.role || 'user',
          emailVerified: data.user.email_confirmed_at !== null,
          isActive: userData?.is_active ?? true
        },
        session: data.session
      }
    } catch (error) {
      console.error('Error inesperado en login:', error)
      return {
        success: false,
        error: 'Error de conexión. Intenta nuevamente.'
      }
    }
  }
  
  /**
   * Registro con email y password
   */
  async register(userData) {
    try {
      const { email, password, name, username } = userData
      
      // Crear usuario en Supabase Auth (versión súper básica)
      const { data, error } = await supabase.auth.signUp({
        email,
        password
        // Sin metadata por ahora para evitar errores
      })
      
      if (error) {
        console.error('Error en registro Supabase:', error)
        return {
          success: false,
          error: supabaseUtils.formatError(error)
        }
      }
      
      // Si el usuario se creó exitosamente, crear perfil en la tabla users
      if (data.user) {
        console.log('✅ Usuario creado en Auth, creando perfil en tabla users...')
        const profileResult = await this.createUserProfile(data.user.id, {
          email,
          name,
          username,
          avatar_url: null,
          role: 'user',
          provider: 'email'
        })
        
        if (!profileResult.success) {
          // Si es error de duplicado, está bien (el perfil ya existe)
          if (profileResult.error?.includes('duplicate key') || profileResult.error?.includes('already exists')) {
            console.log('ℹ️ Perfil ya existe, continuando...')
          } else {
            console.error('❌ Error creando perfil de usuario:', profileResult.error)
          }
        } else {
          console.log('✅ Perfil creado exitosamente:', profileResult.data)
        }
      }
      
      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: name,
          username: username,
          avatar: null,
          role: 'user',
          emailVerified: data.user.email_confirmed_at !== null
        },
        session: data.session,
        needsConfirmation: !data.session // Si no hay sesión, necesita confirmación por email
      }
    } catch (error) {
      console.error('Error inesperado en registro:', error)
      return {
        success: false,
        error: 'Error de conexión. Intenta nuevamente.'
      }
    }
  }
  
  /**
   * Login con Google
   */
  async loginWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (error) {
        console.error('Error en login con Google:', error)
        return {
          success: false,
          error: supabaseUtils.formatError(error)
        }
      }
      
      // El redirect manejará el callback
      return {
        success: true,
        redirecting: true
      }
    } catch (error) {
      console.error('Error inesperado en login con Google:', error)
      return {
        success: false,
        error: 'Error de conexión. Intenta nuevamente.'
      }
    }
  }
  
  /**
   * Login con Facebook
   */
  async loginWithFacebook() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (error) {
        console.error('Error en login con Facebook:', error)
        return {
          success: false,
          error: supabaseUtils.formatError(error)
        }
      }
      
      return {
        success: true,
        redirecting: true
      }
    } catch (error) {
      console.error('Error inesperado en login con Facebook:', error)
      return {
        success: false,
        error: 'Error de conexión. Intenta nuevamente.'
      }
    }
  }
  
  /**
   * Logout
   */
  async logout() {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Error en logout:', error)
        return {
          success: false,
          error: supabaseUtils.formatError(error)
        }
      }
      
      return { success: true }
    } catch (error) {
      console.error('Error inesperado en logout:', error)
      return {
        success: false,
        error: 'Error de conexión. Intenta nuevamente.'
      }
    }
  }
  
  /**
   * Restablecer contraseña
   */
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })
      
      if (error) {
        console.error('Error al enviar email de restablecimiento:', error)
        return {
          success: false,
          error: supabaseUtils.formatError(error)
        }
      }
      
      return { success: true }
    } catch (error) {
      console.error('Error inesperado en reset password:', error)
      return {
        success: false,
        error: 'Error de conexión. Intenta nuevamente.'
      }
    }
  }
  
  // ============================================================================
  // MÉTODOS DE USUARIO
  // ============================================================================
  
  /**
   * Obtener datos del usuario desde la tabla users
   */
  async getUserData(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') { // No rows returned
          return null // Usuario no encontrado, esto es normal
        }
        console.error('Error obteniendo datos del usuario:', error)
        return null
      }
      
      return data
    } catch (error) {
      console.error('Error inesperado obteniendo datos del usuario:', error)
      return null
    }
  }
  
  /**
   * Crear perfil de usuario en la tabla users
   */
  async createUserProfile(userId, userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: userId,
          ...userData
        })
        .select()
        .single()
      
      if (error) {
        console.error('Error creando perfil de usuario:', error)
        return {
          success: false,
          error: supabaseUtils.formatError(error)
        }
      }
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error inesperado creando perfil:', error)
      return {
        success: false,
        error: 'Error de conexión. Intenta nuevamente.'
      }
    }
  }
  
  /**
   * Actualizar datos del usuario
   */
  async updateUserData(userId, userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', userId)
        .select()
        .single()
      
      if (error) {
        console.error('Error actualizando datos del usuario:', error)
        return {
          success: false,
          error: supabaseUtils.formatError(error)
        }
      }
      
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error inesperado actualizando usuario:', error)
      return {
        success: false,
        error: 'Error de conexión. Intenta nuevamente.'
      }
    }
  }
  
  // ============================================================================
  // MÉTODOS DE ESTADO
  // ============================================================================
  
  /**
   * Observer de estado de autenticación
   */
  onAuthStateChanged(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      let user = null;
      
      if (session?.user) {
        // Obtener datos completos del usuario
        let userData = await this.getUserData(session.user.id)
        
        // Si no existe el perfil, crearlo automáticamente
        if (!userData && event === 'SIGNED_IN') {
          console.log('⚠️ Perfil no encontrado en onAuthStateChanged, creando...')
          const profileResult = await this.createUserProfile(session.user.id, {
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Usuario ToFit',
            username: session.user.email?.split('@')[0] || `user_${session.user.id.slice(0, 8)}`,
            avatar_url: session.user.user_metadata?.avatar_url || null,
            role: 'user',
            provider: session.user.app_metadata?.provider || 'email'
          })
          
          if (profileResult.success) {
            userData = profileResult.data
          }
        }
        
        user = {
          id: session.user.id,
          email: session.user.email,
          name: userData?.name || session.user.user_metadata?.name || 'Usuario ToFit',
          username: userData?.username || '',
          avatar: userData?.avatar_url || session.user.user_metadata?.avatar_url || null,
          role: userData?.role || 'user',
          emailVerified: session.user.email_confirmed_at !== null,
          isActive: userData?.is_active ?? true
        }
      }
      
      callback(user, event, session)
    })
    
    // Devolver función de limpieza
    return () => subscription.unsubscribe()
  }
  
  /**
   * Obtener usuario actual
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        return null
      }
      
      let userData = await this.getUserData(user.id)
      
      // Si no existe el perfil, crearlo automáticamente
      if (!userData) {
        console.log('⚠️ Perfil no encontrado, creando automáticamente...')
        const profileResult = await this.createUserProfile(user.id, {
          email: user.email,
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario ToFit',
          username: user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`,
          avatar_url: user.user_metadata?.avatar_url || null,
          role: 'user',
          provider: user.app_metadata?.provider || 'email'
        })
        
        if (profileResult.success) {
          userData = profileResult.data
        }
      }
      
      return {
        id: user.id,
        email: user.email,
        name: userData?.name || user.user_metadata?.name || 'Usuario ToFit',
        username: userData?.username || '',
        avatar: userData?.avatar_url || user.user_metadata?.avatar_url || null,
        role: userData?.role || 'user',
        emailVerified: user.email_confirmed_at !== null,
        isActive: userData?.is_active ?? true
      }
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error)
      return null
    }
  }
  
  /**
   * Obtener sesión actual
   */
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error obteniendo sesión:', error)
        return null
      }
      
      return session
    } catch (error) {
      console.error('Error inesperado obteniendo sesión:', error)
      return null
    }
  }
  
  // ============================================================================
  // MÉTODOS DE MIGRACIÓN (Para transición desde Firebase)
  // ============================================================================
  
  /**
   * Migrar usuario desde Firebase
   */
  async migrateFromFirebase(firebaseUser, firebaseUserData) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await this.getUserData(firebaseUser.uid)
      if (existingUser) {
        return { success: true, data: existingUser }
      }
      
      // Crear perfil de usuario con datos de Firebase
      const userData = {
        firebase_uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUserData?.name || firebaseUser.displayName || 'Usuario ToFit',
        username: firebaseUserData?.username || '',
        avatar_url: firebaseUserData?.avatar || firebaseUser.photoURL || null,
        role: firebaseUserData?.role || 'user',
        provider: firebaseUserData?.provider || 'email',
        is_verified: firebaseUser.emailVerified || false,
        settings: firebaseUserData?.settings || {},
        help_settings: firebaseUserData?.helpSettings || {},
        affiliate_stats: firebaseUserData?.affiliateStats || {},
        is_affiliate: firebaseUserData?.isAffiliate || false
      }
      
      return await this.createUserProfile(firebaseUser.uid, userData)
    } catch (error) {
      console.error('Error migrando usuario desde Firebase:', error)
      return {
        success: false,
        error: 'Error en migración de usuario'
      }
    }
  }
  
  // ============================================================================
  // UTILIDADES
  // ============================================================================
  
  /**
   * Verificar si el email está disponible
   */
  async isEmailAvailable(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .limit(1)
      
      if (error) {
        console.error('Error verificando disponibilidad de email:', error)
        return false
      }
      
      return data.length === 0
    } catch (error) {
      console.error('Error inesperado verificando email:', error)
      return false
    }
  }
  
  /**
   * Verificar si el username está disponible
   */
  async isUsernameAvailable(username) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .limit(1)
      
      if (error) {
        console.error('Error verificando disponibilidad de username:', error)
        return false
      }
      
      return data.length === 0
    } catch (error) {
      console.error('Error inesperado verificando username:', error)
      return false
    }
  }
}

export default new SupabaseAuthService()