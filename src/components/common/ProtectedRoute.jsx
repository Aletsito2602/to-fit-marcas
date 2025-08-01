import { Navigate, useLocation } from 'react-router-dom'
import { useSupabaseAuthStore } from '../../store/supabaseAuthStore'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSupabaseAuthStore()
  const location = useLocation()
  
  if (!isAuthenticated) {
    // Redirigir a login manteniendo la ruta actual para redirección posterior
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}

export default ProtectedRoute 