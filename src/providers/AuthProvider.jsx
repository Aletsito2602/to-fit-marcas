import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'

const AuthProvider = ({ children }) => {
  const initAuthListener = useAuthStore(state => state.initAuthListener)

  useEffect(() => {
    // Inicializar el listener de autenticación de Firebase
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