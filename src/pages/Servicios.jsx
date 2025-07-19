import { Truck, Shield, RotateCcw, Headphones, CreditCard, Users } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const Servicios = () => {
  const servicios = [
    {
      icon: Truck,
      title: 'Envío Gratis',
      description: 'Envío gratuito en pedidos superiores a $50',
      color: 'text-accent-success'
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Protección total en todas tus transacciones',
      color: 'text-accent-primary'
    },
    {
      icon: RotateCcw,
      title: 'Devoluciones',
      description: '30 días para devolver cualquier producto',
      color: 'text-accent-warning'
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Atención al cliente disponible siempre',
      color: 'text-accent-error'
    },
    {
      icon: CreditCard,
      title: 'Pagos Flexibles',
      description: 'Múltiples métodos de pago disponibles',
      color: 'text-purple-500'
    },
    {
      icon: Users,
      title: 'Personal Shopper',
      description: 'Asesoramiento personalizado de moda',
      color: 'text-pink-500'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-display font-bold text-text-primary">
          Nuestros Servicios
        </h1>
        <p className="mt-2 text-text-secondary max-w-2xl mx-auto">
          Descubre todos los servicios que ToFit tiene para ofrecerte la mejor experiencia de compra
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicios.map((servicio, index) => {
          const Icon = servicio.icon
          return (
            <Card key={index} hover className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-4 rounded-full bg-background-tertiary ${servicio.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {servicio.title}
                  </h3>
                  <p className="text-text-secondary mt-2">
                    {servicio.description}
                  </p>
                </div>
                
                <Button variant="outline" size="sm">
                  Más Información
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Sección de contacto */}
      <Card className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
            ¿Necesitas Ayuda?
          </h2>
          <p className="text-text-secondary mb-6">
            Nuestro equipo de atención al cliente está aquí para ayudarte con cualquier pregunta
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>
              <Headphones className="w-4 h-4 mr-2" />
              Contactar Soporte
            </Button>
            <Button variant="outline">
              Ver FAQ
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Servicios 