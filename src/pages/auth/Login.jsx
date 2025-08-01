import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useSupabaseAuthStore } from '../../store/supabaseAuthStore'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loginWithGoogle, loginWithFacebook, isLoading, error } = useSupabaseAuthStore()
  
  const from = location.state?.from?.pathname || '/home'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="w-full max-w-[400px] mx-auto">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-white text-[28px] font-semibold">
            Ingresa a tu cuenta
          </h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error general */}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                                 className="w-full bg-transparent text-white placeholder-gray-500 border-0 border-b border-white focus:border-white focus:outline-none focus:ring-0 py-3 text-base transition-all duration-300"
                style={{ borderBottomWidth: '1px' }}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                                 className="w-full bg-transparent text-white placeholder-gray-500 border-0 border-b border-white focus:border-white focus:outline-none focus:ring-0 py-3 pr-10 text-base transition-all duration-300"
                style={{ borderBottomWidth: '1px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-gray-400 hover:text-white transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Link olvidar contraseña */}
          <div className="text-right mt-4">
            <Link 
              to="/forgot-password"
              className="text-[#CCCCCC] text-sm hover:text-white transition-colors duration-300"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón de login */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#333333] hover:bg-[#444444] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-10 rounded-md font-medium transition-all duration-300"
              style={{ borderRadius: '6px', padding: '12px 40px' }}
            >
              {isLoading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>

        {/* Separador con texto */}
        <div className="mt-8 mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#333333]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-[#CCCCCC]">
                o inicia sesión con
              </span>
            </div>
          </div>
        </div>

        {/* Botones sociales */}
        <div className="flex justify-center space-x-4 mb-8">
          {/* Botón Google */}
          <button
            type="button"
            onClick={async () => {
              const result = await loginWithGoogle()
              if (result.success && !result.redirecting) {
                navigate(from, { replace: true })
              }
              // Si result.redirecting es true, la navegación se hará en el callback
            }}
            disabled={isLoading}
            className="w-12 h-12 rounded-full bg-[#333333] hover:bg-[#444444] disabled:opacity-50 transition-colors duration-300 flex items-center justify-center"
          >
            <span className="text-white font-medium text-lg">G</span>
          </button>

          {/* Botón Facebook */}
          <button
            type="button"
            onClick={async () => {
              const result = await loginWithFacebook()
              if (result.success && !result.redirecting) {
                navigate(from, { replace: true })
              }
              // Si result.redirecting es true, la navegación se hará en el callback
            }}
            disabled={isLoading}
            className="w-12 h-12 rounded-full bg-[#333333] hover:bg-[#444444] disabled:opacity-50 transition-colors duration-300 flex items-center justify-center"
          >
            <span className="text-white font-medium text-lg">f</span>
          </button>
        </div>

        {/* Enlace a registro */}
        <div className="text-center">
          <p className="text-[#CCCCCC] text-sm">
            ¿No tienes cuenta?{' '}
            <Link 
              to="/register"
              className="text-white font-medium hover:underline transition-all duration-300"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login 