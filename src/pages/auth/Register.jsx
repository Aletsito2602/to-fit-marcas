import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate()
  const { register: registerUser, isLoading, error } = useAuthStore()

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
    
    if (!formData.name) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }
    
    if (!formData.username) {
      newErrors.username = 'El nombre de usuario es requerido'
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Solo letras, números y guiones bajos permitidos'
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const result = await registerUser(formData)
    
    if (result.success) {
      navigate('/home', { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="w-full max-w-[400px] mx-auto">
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-white text-[28px] font-semibold">
            Crea tu cuenta
          </h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Nombre completo */}
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">
              Nombre completo
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="w-full bg-transparent text-white placeholder-gray-500 border-0 border-b border-white focus:border-white focus:outline-none focus:ring-0 py-3 text-base transition-all duration-300"
                style={{ borderBottomWidth: '1px' }}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Nombre de usuario */}
          <div className="space-y-2">
            <label className="block text-white text-sm font-medium">
              Nombre de usuario
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nombre de usuario"
                className="w-full bg-transparent text-white placeholder-gray-500 border-0 border-b border-white focus:border-white focus:outline-none focus:ring-0 py-3 text-base transition-all duration-300"
                style={{ borderBottomWidth: '1px' }}
              />
            </div>
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username}</p>
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

          {/* Texto legal */}
          <div className="mt-4 mb-6">
            <p className="text-[#CCCCCC] text-xs leading-relaxed">
              Al registrarte, aceptas nuestras Políticas de Privacidad y
              los Términos y Condiciones de Uso.
            </p>
          </div>

          {/* Botón de registro */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-black py-3 px-10 rounded-md font-medium transition-all duration-300"
              style={{ borderRadius: '6px', padding: '12px 40px' }}
            >
              {isLoading ? 'Cargando...' : 'Registrarse'}
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
              const { loginWithGoogle } = useAuthStore.getState()
              const result = await loginWithGoogle()
              if (result.success) {
                navigate('/home', { replace: true })
              }
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
              const { loginWithFacebook } = useAuthStore.getState()
              const result = await loginWithFacebook()
              if (result.success) {
                navigate('/home', { replace: true })
              }
            }}
            disabled={isLoading}
            className="w-12 h-12 rounded-full bg-[#333333] hover:bg-[#444444] disabled:opacity-50 transition-colors duration-300 flex items-center justify-center"
          >
            <span className="text-white font-medium text-lg">f</span>
          </button>
        </div>

        {/* Pie con enlace a login */}
        <div className="text-center">
          <p className="text-[#CCCCCC] text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link 
              to="/login"
              className="text-white font-medium hover:text-gray-300 transition-colors duration-300 underline"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register 