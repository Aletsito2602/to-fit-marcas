import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import ButtonGray from '../../components/ui/ButtonGray'
import InputMinimal from '../../components/ui/InputMinimal'
import SocialAuthButtonsMinimal from '../../components/auth/SocialAuthButtonsMinimal'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { register: registerUser, isLoading, error } = useAuthStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()

  const onSubmit = async (data) => {
    const result = await registerUser(data)
    
    if (result.success) {
      navigate('/home', { replace: true })
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
            Crea tu cuenta
          </h2>
        </div>

        {/* Formulario */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Nombre completo */}
            <InputMinimal
              label="Nombre completo"
              type="text"
              placeholder="Tu nombre completo"
              error={errors.name?.message}
              {...register('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres'
                }
              })}
            />

            {/* Nombre de usuario */}
            <InputMinimal
              label="Nombre de usuario"
              type="text"
              placeholder="Tu nombre de usuario"
              error={errors.username?.message}
              {...register('username', {
                required: 'El nombre de usuario es requerido',
                minLength: {
                  value: 3,
                  message: 'El nombre de usuario debe tener al menos 3 caracteres'
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: 'Solo letras, números y guiones bajos permitidos'
                }
              })}
            />

            {/* Password */}
            <div className="relative">
              <InputMinimal
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                placeholder="Crea una contraseña segura"
                error={errors.password?.message}
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Debe contener al menos una mayúscula, una minúscula y un número'
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

            {/* Términos y condiciones simplificados */}
            <div className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Al registrarte, aceptas nuestras{' '}
              <Link to="/privacy" className="text-accent-primary hover:text-accent-secondary transition-colors">
                Políticas de Privacidad
              </Link>
              {' '}y los{' '}
              <Link to="/terms" className="text-accent-primary hover:text-accent-secondary transition-colors">
                Términos y Condiciones de Uso
              </Link>
              .
            </div>

            {/* Botón de registro */}
            <ButtonGray
              type="submit"
              loading={isLoading}
              className="w-full"
            >
              Registrarse
            </ButtonGray>
          </form>

          {/* Botones sociales */}
          <SocialAuthButtonsMinimal />
        </div>

        {/* Login */}
        <div className="text-center">
          <p className="text-text-secondary text-sm sm:text-base">
            ¿Ya tienes una cuenta?{' '}
            <Link 
              to="/login"
              className="text-accent-primary hover:text-accent-secondary font-medium transition-colors"
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