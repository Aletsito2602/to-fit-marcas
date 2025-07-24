import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import authService from '../services/authService'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Acciones
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await authService.login(credentials.email, credentials.password)
          
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

      register: async (userData) => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await authService.register(userData)
          
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

      logout: async () => {
        set({ isLoading: true })
        
        try {
          await authService.logout()
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

      clearError: () => {
        set({ error: null })
      },

      updateUser: async (userData) => {
        const state = get()
        if (state.user?.id) {
          try {
            await authService.updateUserData(state.user.id, userData)
            set((state) => ({ 
              user: { ...state.user, ...userData } 
            }))
          } catch (error) {
            console.error('Error updating user:', error)
            set({ error: error.message })
          }
        }
      },

      // Nuevas acciones para autenticación social
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await authService.loginWithGoogle()
          
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

      loginWithFacebook: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await authService.loginWithFacebook()
          
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

      resetPassword: async (email) => {
        set({ isLoading: true, error: null })
        
        try {
          const result = await authService.resetPassword(email)
          
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

      // Inicializar listener de autenticación
      initAuthListener: () => {
        return authService.onAuthStateChanged(async (firebaseUser) => {
          if (firebaseUser) {
            // Usuario autenticado - obtener datos completos
            const userDoc = await authService.getUserData(firebaseUser.uid)
            const user = {
              id: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || userDoc?.name || 'Usuario ToFit',
              username: userDoc?.username || '',
              avatar: firebaseUser.photoURL || userDoc?.avatar || null,
              role: userDoc?.role || 'user',
              emailVerified: firebaseUser.emailVerified
            }
            
            set({ 
              user, 
              isAuthenticated: true,
              isLoading: false
            })
          } else {
            // Usuario no autenticado
            set({ 
              user: null, 
              isAuthenticated: false,
              isLoading: false
            })
          }
        })
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