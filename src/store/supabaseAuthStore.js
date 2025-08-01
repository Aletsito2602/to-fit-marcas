import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import supabaseAuthService from '../services/supabaseAuthService'

export const useSupabaseAuthStore = create(
  persist(
    (set, get) => ({
      // ============================================================================
      // ESTADO
      // ============================================================================
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // ============================================================================
      // ACCIONES DE AUTENTICACIÓN
      // ============================================================================
      
      /**
       * Login con email y password
       */
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await supabaseAuthService.login(email, password)
          
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
       * Registro con email y password
       */
      register: async (userData) => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await supabaseAuthService.register(userData)
          
          if (result.success) {
            set({ 
              user: result.user, 
              isAuthenticated: true, 
              isLoading: false,
              error: null
            })
            return { success: true, needsConfirmation: result.needsConfirmation }
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
       * Logout
       */
      logout: async () => {
        set({ isLoading: true })
        
        try {
          await supabaseAuthService.logout()
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            error: null,
            isLoading: false
          })
        } catch (error) {
          set({ 
            error: error.message,
            isLoading: false
          })
        }
      },
      
      /**
       * Login con Google
       */
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await supabaseAuthService.loginWithGoogle()
          
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
       * Login con Facebook
       */
      loginWithFacebook: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await supabaseAuthService.loginWithFacebook()
          
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
       * Reset password
       */
      resetPassword: async (email) => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await supabaseAuthService.resetPassword(email)
          
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
       * Actualizar usuario
       */
      updateUser: async (userData) => {
        const state = get()
        if (!state.user?.id) return
        
        try {
          const result = await supabaseAuthService.updateUserData(state.user.id, userData)
          
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
      // INICIALIZACIÓN
      // ============================================================================
      
      /**
       * Inicializar listener de autenticación
       */
      initAuthListener: () => {
        return supabaseAuthService.onAuthStateChanged(async (user, event, session) => {
          if (user) {
            // Manejar eventos específicos de Supabase
            if (event) {
              console.log('Supabase auth event:', event)
              
              // Si es un nuevo registro social, crear perfil si no existe
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
              isLoading: false
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
          isAuthenticated: state.isAuthenticated,
          hasUser: !!state.user,
          userId: state.user?.id,
          userEmail: state.user?.email,
          userRole: state.user?.role
        }
      }
    }),
    {
      name: 'tofit-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)