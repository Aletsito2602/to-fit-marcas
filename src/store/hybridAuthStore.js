import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import authService from '../services/authService' // Firebase
import supabaseAuthService from '../services/supabaseAuthService' // Supabase

// Flag para controlar qué backend usar
const USE_SUPABASE = true // Usando únicamente Supabase

export const useHybridAuthStore = create(
  persist(
    (set, get) => ({
      // ============================================================================
      // ESTADO
      // ============================================================================
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      migrationStatus: null, // null, 'pending', 'completed', 'failed'
      
      // ============================================================================
      // CONFIGURACIÓN
      // ============================================================================
      isUsingSupabase: USE_SUPABASE,
      
      // ============================================================================
      // ACCIONES DE AUTENTICACIÓN
      // ============================================================================
      
      /**
       * Login adaptativo (Firebase o Supabase)
       */
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        
        try {
          const authProvider = get().isUsingSupabase ? supabaseAuthService : authService
          const result = await authProvider.login(credentials.email, credentials.password)
          
          if (result.success) {
            // Si estamos usando Firebase y la migración está habilitada, intentar migrar
            if (!get().isUsingSupabase && get().shouldAttemptMigration()) {
              await get().attemptMigration(result.user)
            }
            
            set({ 
              user: result.user, 
              isAuthenticated: true, 
              isLoading: false,
              error: null
            })
            return { success: true }
          } else {
            set({ 
              error: result.error, 
              isLoading: false 
            })
            return { success: false, error: result.error }
          }
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          })
          return { success: false, error: error.message }
        }
      },
      
      /**
       * Registro adaptativo
       */
      register: async (userData) => {
        set({ isLoading: true, error: null })
        
        try {
          const authProvider = get().isUsingSupabase ? supabaseAuthService : authService
          const result = await authProvider.register(userData)
          
          if (result.success) {
            set({ 
              user: result.user, 
              isAuthenticated: true, 
              isLoading: false,
              error: null
            })
            return { success: true }
          } else {
            set({ 
              error: result.error, 
              isLoading: false 
            })
            return { success: false, error: result.error }
          }
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          })
          return { success: false, error: error.message }
        }
      },
      
      /**
       * Logout adaptativo
       */
      logout: async () => {
        set({ isLoading: true })
        
        try {
          const authProvider = get().isUsingSupabase ? supabaseAuthService : authService
          await authProvider.logout()
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            error: null,
            isLoading: false,
            migrationStatus: null
          })
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false
          })
        }
      },
      
      /**
       * Login con Google adaptativo
       */
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const authProvider = get().isUsingSupabase ? supabaseAuthService : authService
          const result = await authProvider.loginWithGoogle()
          
          if (result.success) {
            if (result.redirecting) {
              // Para OAuth, el estado se actualizará en el callback
              return { success: true, redirecting: true }
            }
            
            set({ 
              user: result.user, 
              isAuthenticated: true, 
              isLoading: false,
              error: null
            })
            return { success: true }
          } else {
            set({ 
              error: result.error, 
              isLoading: false 
            })
            return { success: false, error: result.error }
          }
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          })
          return { success: false, error: error.message }
        }
      },
      
      /**
       * Login con Facebook adaptativo
       */
      loginWithFacebook: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const authProvider = get().isUsingSupabase ? supabaseAuthService : authService
          const result = await authProvider.loginWithFacebook()
          
          if (result.success) {
            if (result.redirecting) {
              return { success: true, redirecting: true }
            }
            
            set({ 
              user: result.user, 
              isAuthenticated: true, 
              isLoading: false,
              error: null
            })
            return { success: true }
          } else {
            set({ 
              error: result.error, 
              isLoading: false 
            })
            return { success: false, error: result.error }
          }
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          })
          return { success: false, error: error.message }
        }
      },
      
      /**
       * Reset password adaptativo
       */
      resetPassword: async (email) => {
        set({ isLoading: true, error: null })
        
        try {
          const authProvider = get().isUsingSupabase ? supabaseAuthService : authService
          const result = await authProvider.resetPassword(email)
          
          set({ isLoading: false })
          
          if (result.success) {
            return { success: true }
          } else {
            set({ error: result.error })
            return { success: false, error: result.error }
          }
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          })
          return { success: false, error: error.message }
        }
      },
      
      // ============================================================================
      // ACCIONES DE USUARIO
      // ============================================================================
      
      /**
       * Actualizar usuario adaptativo
       */
      updateUser: async (userData) => {
        const state = get()
        if (!state.user?.id) return
        
        try {
          const authProvider = state.isUsingSupabase ? supabaseAuthService : authService
          const result = await authProvider.updateUserData(state.user.id, userData)
          
          if (result.success) {
            set((state) => ({ 
              user: { ...state.user, ...userData } 
            }))
          } else {
            console.error('Error updating user:', result.error)
            set({ error: result.error })
          }
        } catch (error) {
          console.error('Error updating user:', error)
          set({ error: error.message })
        }
      },
      
      /**
       * Limpiar errores
       */
      clearError: () => {
        set({ error: null })
      },
      
      // ============================================================================
      // FUNCIONES DE MIGRACIÓN
      // ============================================================================
      
      /**
       * Verificar si se debe intentar migración
       */
      shouldAttemptMigration: () => {
        const state = get()
        return !state.isUsingSupabase && 
               state.migrationStatus !== 'completed' && 
               state.migrationStatus !== 'failed'
      },
      
      /**
       * Intentar migración de usuario a Supabase
       */
      attemptMigration: async (firebaseUser) => {
        set({ migrationStatus: 'pending' })
        
        try {
          // Obtener datos completos del usuario desde Firebase
          const firebaseUserData = await authService.getUserData(firebaseUser.id)
          
          // Migrar a Supabase
          const result = await supabaseAuthService.migrateFromFirebase(
            firebaseUser, 
            firebaseUserData
          )
          
          if (result.success) {
            set({ migrationStatus: 'completed' })
            console.log('✅ Usuario migrado exitosamente a Supabase')
          } else {
            set({ migrationStatus: 'failed' })
            console.error('❌ Error en migración:', result.error)
          }
        } catch (error) {
          set({ migrationStatus: 'failed' })
          console.error('❌ Error inesperado en migración:', error)
        }
      },
      
      /**
       * Cambiar a Supabase completamente
       */
      switchToSupabase: async () => {
        const state = get()
        
        if (state.isUsingSupabase) {
          console.log('Ya estás usando Supabase')
          return { success: true }
        }
        
        try {
          // Verificar que la migración esté completada
          if (state.migrationStatus !== 'completed') {
            if (state.user) {
              await state.attemptMigration(state.user)
            }
          }
          
          // Cambiar el flag
          set({ isUsingSupabase: true })
          
          // Reinicializar el listener de auth
          await state.initAuthListener()
          
          console.log('✅ Cambiado a Supabase exitosamente')
          return { success: true }
        } catch (error) {
          console.error('❌ Error cambiando a Supabase:', error)
          return { success: false, error: error.message }
        }
      },
      
      // ============================================================================
      // INICIALIZACIÓN
      // ============================================================================
      
      /**
       * Inicializar listener de autenticación
       */
      initAuthListener: () => {
        const state = get()
        const authProvider = state.isUsingSupabase ? supabaseAuthService : authService
        
        return authProvider.onAuthStateChanged(async (user, event, session) => {
          if (user) {
            // Para Supabase, manejar eventos específicos
            if (state.isUsingSupabase && event) {
              console.log('Supabase auth event:', event)
              
              // Si es un nuevo registro social, crear perfil
              if (event === 'SIGNED_IN' && session?.user && !user.username) {
                const profileResult = await supabaseAuthService.createUserProfile(
                  session.user.id,
                  {
                    email: session.user.email,
                    name: session.user.user_metadata?.name || 'Usuario ToFit',
                    username: '',
                    avatar_url: session.user.user_metadata?.avatar_url || null,
                    role: 'user',
                    provider: session.user.app_metadata?.provider || 'email'
                  }
                )
                
                if (profileResult.success) {
                  user = { ...user, ...profileResult.data }
                }
              }
            }
            
            set({ 
              user, 
              isAuthenticated: true,
              isLoading: false
            })
          } else {
            set({ 
              user: null, 
              isAuthenticated: false,
              isLoading: false,
              migrationStatus: null
            })
          }
        })
      },
      
      // ============================================================================
      // UTILIDADES
      // ============================================================================
      
      /**
       * Obtener información del estado actual
       */
      getDebugInfo: () => {
        const state = get()
        return {
          isUsingSupabase: state.isUsingSupabase,
          isAuthenticated: state.isAuthenticated,
          migrationStatus: state.migrationStatus,
          hasUser: !!state.user,
          userId: state.user?.id,
          userEmail: state.user?.email
        }
      }
    }),
    {
      name: 'tofit-hybrid-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        isUsingSupabase: state.isUsingSupabase,
        migrationStatus: state.migrationStatus
      })
    }
  )
)