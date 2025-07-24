import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState('')
  const { resetPassword, isLoading } = useAuthStore()

  const validateEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email) {
      setError('El email es requerido')
      return
    }
    
    if (!validateEmail(email)) {
      setError('Email inválido')
      return
    }
    
    const result = await resetPassword(email)
    
    if (result.success) {
      setEmailSent(true)
    } else {
      setError(result.error)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="w-full max-w-[400px] mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-white text-[24px] font-semibold mb-4">
              Email enviado
            </h1>
            <p className="text-[#CCCCCC] text-sm">
              Te hemos enviado un enlace de recuperación a{' '}
              <span className="text-white font-medium">{email}</span>
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setEmailSent(false)}
              className="w-full bg-[#333333] hover:bg-[#444444] text-white py-3 px-10 rounded-md font-medium transition-all duration-300"
              style={{ borderRadius: '6px', padding: '12px 40px' }}
            >
              Enviar de nuevo
            </button>
            
            <Link
              to="/login"
              className="block text-[#CCCCCC] hover:text-white transition-colors duration-300 text-sm"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="w-full max-w-[400px] mx-auto">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-white text-[24px] font-semibold">
            ¿Olvidaste tu contraseña?
          </h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error */}
          {error && (
            <div className="text-red-400 text-sm text-center mb-4">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                                 className="w-full bg-transparent text-white placeholder-gray-500 border-0 border-b border-white focus:border-white focus:outline-none focus:ring-0 py-3 text-base transition-all duration-300"
                style={{ borderBottomWidth: '1px' }}
              />
            </div>
          </div>

          {/* Botón enviar */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#333333] hover:bg-[#444444] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-10 rounded-md font-medium transition-all duration-300"
              style={{ borderRadius: '6px', padding: '12px 40px' }}
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword 