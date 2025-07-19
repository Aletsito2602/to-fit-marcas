import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
          // Simulación de llamada a API
          // En producción, aquí irá la llamada real al backend
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          if (credentials.email === 'admin@tofit.com' && credentials.password === 'admin123') {
            const user = {
              id: 1,
              email: credentials.email,
              name: 'Usuario ToFit',
              username: 'admin',
              avatar: null,
              role: 'user'
            }
            
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false 
            })
            
            return { success: true }
          } else {
            throw new Error('Credenciales inválidas')
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
          // Simulación de registro
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const user = {
            id: Date.now(),
            email: userData.email,
            name: userData.name,
            username: userData.username,
            avatar: null,
            role: 'user'
          }
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          })
          
          return { success: true }
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          })
          return { success: false, error: error.message }
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        })
      },

      clearError: () => {
        set({ error: null })
      },

      updateUser: (userData) => {
        set((state) => ({ 
          user: { ...state.user, ...userData } 
        }))
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