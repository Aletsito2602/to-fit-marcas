import { Package, Truck, CheckCircle, Clock, CreditCard, MapPin } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const MiStatus = () => {
  const pedidos = [
    {
      id: 'ORD-001',
      fecha: '2024-01-15',
      total: 189.99,
      estado: 'enviado',
      productos: [
        { nombre: 'Vestido Negro', cantidad: 1, precio: 129.99 },
        { nombre: 'Zapatos Rojos', cantidad: 1, precio: 59.99 }
      ],
      tracking: 'TRK-123456789'
    },
    {
      id: 'ORD-002',
      fecha: '2024-01-10',
      total: 89.99,
      estado: 'entregado',
      productos: [
        { nombre: 'Chaqueta Azul', cantidad: 1, precio: 89.99 }
      ]
    },
    {
      id: 'ORD-003',
      fecha: '2024-01-08',
      total: 149.99,
      estado: 'procesando',
      productos: [
        { nombre: 'Pantalón Negro', cantidad: 2, precio: 74.99 }
      ]
    }
  ]

  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'procesando':
        return <Clock className="w-5 h-5 text-accent-warning" />
      case 'enviado':
        return <Truck className="w-5 h-5 text-accent-primary" />
      case 'entregado':
        return <CheckCircle className="w-5 h-5 text-accent-success" />
      default:
        return <Package className="w-5 h-5 text-text-muted" />
    }
  }

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'procesando':
        return 'bg-accent-warning/10 text-accent-warning'
      case 'enviado':
        return 'bg-accent-primary/10 text-accent-primary'
      case 'entregado':
        return 'bg-accent-success/10 text-accent-success'
      default:
        return 'bg-background-tertiary text-text-muted'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary">
          Mi Status
        </h1>
        <p className="mt-2 text-text-secondary">
          Rastrea tus pedidos y revisa tu actividad
        </p>
      </div>

      {/* Resumen de estado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-accent-warning/10 rounded-full">
              <Clock className="w-6 h-6 text-accent-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">1</p>
              <p className="text-sm text-text-secondary">En Proceso</p>
            </div>
          </div>
        </Card>
        
        <Card className="text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-accent-primary/10 rounded-full">
              <Truck className="w-6 h-6 text-accent-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">1</p>
              <p className="text-sm text-text-secondary">En Camino</p>
            </div>
          </div>
        </Card>
        
        <Card className="text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-accent-success/10 rounded-full">
              <CheckCircle className="w-6 h-6 text-accent-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">1</p>
              <p className="text-sm text-text-secondary">Entregado</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Lista de pedidos */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">
          Historial de Pedidos
        </h2>
        
        {pedidos.map((pedido) => (
          <Card key={pedido.id}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-start space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(pedido.estado)}
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      Pedido #{pedido.id}
                    </h3>
                    <p className="text-sm text-text-muted">
                      {new Date(pedido.fecha).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="space-y-1">
                    {pedido.productos.map((producto, index) => (
                      <p key={index} className="text-sm text-text-secondary">
                        {producto.cantidad}x {producto.nombre} - ${producto.precio}
                      </p>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pedido.estado)}`}>
                      {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                    </span>
                    
                    <span className="text-sm font-semibold text-text-primary">
                      Total: ${pedido.total}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {pedido.tracking && (
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    Rastrear
                  </Button>
                )}
                
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Actividad reciente */}
      <Card>
        <Card.Header>
          <Card.Title>Actividad Reciente</Card.Title>
        </Card.Header>
        
        <Card.Content>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-text-primary">
                  Pedido #ORD-002 entregado exitosamente
                </p>
                <p className="text-xs text-text-muted">Hace 2 días</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-text-primary">
                  Pedido #ORD-001 enviado - Tracking disponible
                </p>
                <p className="text-xs text-text-muted">Hace 3 días</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-warning rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-text-primary">
                  Pedido #ORD-003 confirmado y en procesamiento
                </p>
                <p className="text-xs text-text-muted">Hace 5 días</p>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default MiStatus 