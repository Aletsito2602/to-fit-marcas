import { useEffect } from 'react'
import { useSupabaseAuthStore } from '../store/supabaseAuthStore'

const AuthProvider = ({ children }) => {
  const initAuthListener = useSupabaseAuthStore(state => state.initAuthListener)

  useEffect(() => {
    // Inicializar el listener de autenticación de Supabase
    const unsubscribe = initAuthListener()
    
    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [initAuthListener])

  return children
}

export default AuthProvider 