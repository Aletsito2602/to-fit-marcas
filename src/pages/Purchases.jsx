import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, Calendar, CreditCard, Truck, CheckCircle, Clock } from 'lucide-react'
import Card from '../components/ui/Card'

const Purchases = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')

  // Mock data para mostrar la funcionalidad
  const mockPurchases = [
    {
      id: '1',
      date: '2024-01-15',
      status: 'delivered',
      total: 89.99,
      items: [
        { name: 'Conjunto Urbano Supreme', brand: 'Supreme', price: 67.50, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop' },
        { name: 'Accesorios Fashion', brand: 'ToFit', price: 22.49, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop' }
      ]
    },
    {
      id: '2', 
      date: '2024-01-10',
      status: 'shipped',
      total: 156.00,
      items: [
        { name: 'Look Balenciaga x Gucci', brand: 'Balenciaga', price: 156.00, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop' }
      ]
    },
    {
      id: '3',
      date: '2024-01-05', 
      status: 'processing',
      total: 74.25,
      items: [
        { name: 'Outfit Casual Zara', brand: 'Zara', price: 74.25, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop' }
      ]
    }
  ]

  const getStatusInfo = (status) => {
    const statusMap = {
      'delivered': { icon: CheckCircle, text: 'Entregado', color: 'text-green-400' },
      'shipped': { icon: Truck, text: 'Enviado', color: 'text-blue-400' },
      'processing': { icon: Clock, text: 'Procesando', color: 'text-yellow-400' }
    }
    return statusMap[status] || statusMap.processing
  }

  const tabs = [
    { id: 'all', label: 'Todas', count: mockPurchases.length },
    { id: 'delivered', label: 'Entregadas', count: mockPurchases.filter(p => p.status === 'delivered').length },
    { id: 'shipped', label: 'Enviadas', count: mockPurchases.filter(p => p.status === 'shipped').length },
    { id: 'processing', label: 'Procesando', count: mockPurchases.filter(p => p.status === 'processing').length }
  ]

  const filteredPurchases = activeTab === 'all' 
    ? mockPurchases 
    : mockPurchases.filter(p => p.status === activeTab)

  return (
    <div className="w-full bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Mis Compras
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto space-x-1 mb-6 bg-gray-900 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-4 rounded-md font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Purchase List */}
        {filteredPurchases.length > 0 ? (
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => {
              const statusInfo = getStatusInfo(purchase.status)
              const StatusIcon = statusInfo.icon
              
              return (
                <Card key={purchase.id} className="bg-gray-900 border-gray-700">
                  <div className="p-6">
                    {/* Header de la compra */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-400">Pedido #{purchase.id}</div>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(purchase.date).toLocaleDateString('es-ES')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`flex items-center space-x-2 ${statusInfo.color} mb-1`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">{statusInfo.text}</span>
                        </div>
                        <div className="text-white font-bold">${purchase.total}</div>
                      </div>
                    </div>

                    {/* Items de la compra */}
                    <div className="space-y-3">
                      {purchase.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="text-white font-medium">{item.name}</h3>
                            <p className="text-gray-400 text-sm">{item.brand}</p>
                          </div>
                          <div className="text-white font-medium">${item.price}</div>
                        </div>
                      ))}
                    </div>

                    {/* Acciones */}
                    <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-700">
                      <button className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                        Ver Detalles
                      </button>
                      {purchase.status === 'delivered' && (
                        <button className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                          Reordenar
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {activeTab === 'all' ? 'Sin compras aún' : `Sin compras ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}`}
            </h3>
            <p className="text-gray-400 mb-6">
              {activeTab === 'all' 
                ? 'Explora nuestra tienda y encuentra productos increíbles'
                : 'No tienes compras en esta categoría'}
            </p>
            <button
              onClick={() => navigate('/tienda')}
              className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Ir a la Tienda
            </button>
          </div>
        )}

        {/* Estadísticas */}
        {mockPurchases.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-gray-700">
              <div className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  ${mockPurchases.reduce((sum, p) => sum + p.total, 0).toFixed(2)}
                </div>
                <div className="text-gray-400 text-sm">Total Gastado</div>
              </div>
            </Card>
            
            <Card className="bg-gray-900 border-gray-700">
              <div className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {mockPurchases.reduce((sum, p) => sum + p.items.length, 0)}
                </div>
                <div className="text-gray-400 text-sm">Items Comprados</div>
              </div>
            </Card>
            
            <Card className="bg-gray-900 border-gray-700">
              <div className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {mockPurchases.length}
                </div>
                <div className="text-gray-400 text-sm">Órdenes Totales</div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default Purchases 