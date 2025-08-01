import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSupabaseAuthStore } from '../store/supabaseAuthStore'
import { supabase } from '../config/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { initAuthListener } = useSupabaseAuthStore()
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        setStatus('processing')

        // Obtener la sesión actual de la URL
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Error obteniendo sesión:', sessionError)
          setError('Error de autenticación')
          setStatus('error')
          return
        }

        if (!session) {
          console.log('No hay sesión activa')
          setError('No se pudo completar la autenticación')
          setStatus('error')
          return
        }

        // La sesión existe, el listener debería manejar el resto
        setStatus('success')
        
        // Esperar un momento para que el listener procese
        setTimeout(() => {
          navigate('/', { replace: true })
        }, 1500)

      } catch (error) {
        console.error('Error en callback de autenticación:', error)
        setError('Error inesperado en la autenticación')
        setStatus('error')
      }
    }

    // Inicializar el listener
    initAuthListener()

    // Manejar el callback
    handleAuthCallback()
  }, [navigate, initAuthListener])

  const handleRetry = () => {
    setStatus('loading')
    setError(null)
    window.location.reload()
  }

  const handleGoHome = () => {
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">ToFit</h1>
        </div>

        {/* Estado de carga */}
        {status === 'loading' && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <h2 className="text-xl font-semibold">Iniciando sesión...</h2>
            <p className="text-gray-400">
              Procesando tu autenticación
            </p>
          </div>
        )}

        {/* Estado de procesamiento */}
        {status === 'processing' && (
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-12 w-12 bg-white rounded-full mx-auto flex items-center justify-center">
                <svg 
                  className="h-6 w-6 text-black" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold">Configurando tu perfil...</h2>
            <p className="text-gray-400">
              Casi terminamos
            </p>
          </div>
        )}

        {/* Estado de éxito */}
        {status === 'success' && (
          <div className="space-y-4">
            <div className="h-12 w-12 bg-green-500 rounded-full mx-auto flex items-center justify-center">
              <svg 
                className="h-6 w-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-400">¡Bienvenido a ToFit!</h2>
            <p className="text-gray-400">
              Redirigiendo al inicio...
            </p>
          </div>
        )}

        {/* Estado de error */}
        {status === 'error' && (
          <div className="space-y-4">
            <div className="h-12 w-12 bg-red-500 rounded-full mx-auto flex items-center justify-center">
              <svg 
                className="h-6 w-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-400">Error de autenticación</h2>
            <p className="text-gray-400">
              {error || 'Ha ocurrido un error inesperado'}
            </p>
            
            <div className="space-y-3 pt-4">
              <button
                onClick={handleRetry}
                className="w-full bg-white text-black py-3 px-4 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                Reintentar
              </button>
              <button
                onClick={handleGoHome}
                className="w-full border border-white/20 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Ir al inicio
              </button>
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500">
            Si continúas teniendo problemas, contacta a nuestro soporte
          </p>
        </div>
      </div>
    </div>
  )
}