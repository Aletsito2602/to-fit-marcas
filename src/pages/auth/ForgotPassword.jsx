import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Mail, ArrowLeft } from 'lucide-react'
import ButtonGray from '../../components/ui/ButtonGray'
import Button from '../../components/ui/Button'
import InputMinimal from '../../components/ui/InputMinimal'

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setEmailSent(true)
    } catch (error) {
      console.error('Error enviando email de recuperación:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-primary px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-accent-success rounded-2xl flex items-center justify-center mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
              Email enviado
            </h2>
            <p className="mt-4 text-text-secondary text-sm sm:text-base">
              Te hemos enviado un enlace de recuperación a{' '}
              <span className="font-medium text-text-primary break-all">
                {getValues('email')}
              </span>
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-center text-text-secondary text-sm sm:text-base">
              Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
            </p>
            
            <div className="space-y-4">
              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="w-full min-h-[48px]"
              >
                Enviar de nuevo
              </Button>
              
              <Link
                to="/login"
                className="block w-full text-center text-accent-primary hover:text-accent-secondary font-medium transition-colors py-2"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-text-primary">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="mt-4 text-text-secondary text-sm sm:text-base">
            Ingresa tu email y te enviaremos un enlace para recuperarla
          </p>
        </div>

        {/* Formulario */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

            {/* Botón enviar */}
            <ButtonGray
              type="submit"
              loading={isLoading}
              className="w-full"
            >
              Enviar
            </ButtonGray>
          </form>
        </div>

        {/* Volver al login */}
        <div className="text-center">
          <Link 
            to="/login"
            className="inline-flex items-center text-accent-primary hover:text-accent-secondary font-medium transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword 