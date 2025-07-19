import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import ButtonGray from '../../components/ui/ButtonGray'
import InputMinimal from '../../components/ui/InputMinimal'
import SocialAuthButtonsMinimal from '../../components/auth/SocialAuthButtonsMinimal'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading, error } = useAuthStore()
  
  const from = location.state?.from?.pathname || '/home'
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()

  const onSubmit = async (data) => {
    const result = await login(data)
    
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError('root', { message: result.error })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
            Ingresa a tu cuenta
          </h2>
        </div>

        {/* Formulario */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Error general */}
            {(error || errors.root) && (
              <div className="bg-accent-error/10 border border-accent-error/20 rounded-lg p-3">
                <p className="text-sm text-accent-error">
                  {error || errors.root?.message}
                </p>
              </div>
            )}

            {/* Email */}
            <InputMinimal
              label="Email"
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
            />

            {/* Password */}
            <div className="relative">
              <InputMinimal
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="Tu contraseña"
                error={errors.password?.message}
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-8 text-text-muted hover:text-text-primary transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Enlace olvidar contraseña */}
            <div className="flex justify-end">
              <Link 
                to="/forgot-password"
                className="text-sm text-accent-primary hover:text-accent-secondary transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de login */}
            <ButtonGray
              type="submit"
              loading={isLoading}
              className="w-full"
            >
              Iniciar sesión
            </ButtonGray>
          </form>

          {/* Botones sociales */}
          <SocialAuthButtonsMinimal />
        </div>

        {/* Registro */}
        <div className="text-center">
          <p className="text-text-secondary text-sm sm:text-base">
            ¿No tienes cuenta?{' '}
            <Link 
              to="/register"
              className="text-accent-primary hover:text-accent-secondary font-medium transition-colors"
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