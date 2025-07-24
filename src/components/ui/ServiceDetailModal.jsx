import { useState, useEffect } from 'react'
import { X, Star, Heart } from 'lucide-react'

const ServiceDetailModal = ({ service, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('detalle')
  const [activeSubTab, setActiveSubTab] = useState('portfolio')
  const [isFavorite, setIsFavorite] = useState(false)

  const tabs = [
    { id: 'detalle', label: 'Detalle' },
    { id: 'trabajos', label: 'Trabajos' },
    { id: 'resenas', label: 'Reseñas' }
  ]

  const trabajosSubTabs = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'formas-pago', label: 'Formas de pago' },
    { id: 'ubicacion', label: 'Ubicación' }
  ]

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !service) return null

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
      />
    ))
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'detalle':
        return <DetalleTab service={service} />
      case 'trabajos':
        return <TrabajosTab service={service} activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} trabajosSubTabs={trabajosSubTabs} />
      case 'resenas':
        return <ResenasTab service={service} />
      default:
        return <DetalleTab service={service} />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Cerrar al hacer clic fuera */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-black border border-white/20 rounded-2xl max-w-4xl w-full max-h-[85vh] md:max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Layout principal - Responsive */}
        <div className="flex flex-col md:flex-row h-auto md:h-[600px] max-h-[85vh] md:max-h-[90vh]">
          {/* Imagen del servicio */}
          <div className="w-full md:w-80 h-64 md:h-full md:flex-shrink-0 relative">
            <img
              src={service.mainImage}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Información del servicio */}
          <div className="flex-1 p-4 md:p-6 flex flex-col overflow-y-auto">
            {/* Header del servicio */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 md:mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-start space-x-3 flex-1">
                <img
                  src={service.professional.avatar}
                  alt={service.professional.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-semibold text-base md:text-lg truncate">
                      {service.professional.name}
                    </h3>
                    {service.professional.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h2 className="text-white font-bold text-lg md:text-xl mb-2 leading-tight">
                    {service.title}
                  </h2>
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(service.rating)}
                    </div>
                    <span className="text-white font-medium text-sm">{service.rating}</span>
                  </div>
                  <p className="text-white font-medium text-sm md:text-base">
                    Precio <span className="font-bold">${service.price}{service.currency}</span>
                  </p>
                </div>
              </div>
              
              {/* Botón Reservar */}
              <button className="bg-white text-black px-4 md:px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm md:text-base w-full sm:w-auto flex-shrink-0">
                Reservar
              </button>
            </div>

            {/* Tabs de navegación */}
            <div className="flex space-x-2 md:space-x-4 mb-4 md:mb-6 border-b border-white/10 pb-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 md:px-4 py-2 rounded-full font-medium text-xs md:text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-white text-black'
                      : 'bg-transparent text-white border border-white/30 hover:border-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Contenido del tab */}
            <div className="flex-1 overflow-y-auto max-h-60 md:max-h-80">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para el tab "Detalle"
const DetalleTab = ({ service }) => (
  <div className="space-y-3 md:space-y-4">
    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
      {service.description}
    </p>
    
    <div className="space-y-2 md:space-y-3">
      {service.highlights.map((highlight, index) => (
        <p key={index} className="text-gray-300 text-sm md:text-base flex items-start leading-relaxed">
          <span className="mr-2 flex-shrink-0">
            {highlight.includes('Disponible') && '✨'}
            {highlight.includes('Zona') && '📍'}
            {highlight.includes('Consulta') && '💬'}
          </span>
          <span className="flex-1">{highlight}</span>
        </p>
      ))}
    </div>
  </div>
)

// Componente para el tab "Trabajos"
const TrabajosTab = ({ service, activeSubTab, setActiveSubTab, trabajosSubTabs }) => (
  <div className="space-y-4">
    {/* Sub-tabs */}
    <div className="flex space-x-2 md:space-x-3 overflow-x-auto pb-2">
      {trabajosSubTabs.map((subTab) => (
        <button
          key={subTab.id}
          onClick={() => setActiveSubTab(subTab.id)}
          className={`px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
            activeSubTab === subTab.id
              ? 'bg-white text-black'
              : 'bg-transparent text-white border border-white/30 hover:border-white/50'
          }`}
        >
          {subTab.label}
        </button>
      ))}
    </div>

    {/* Contenido del sub-tab */}
    <div className="mt-4 md:mt-6">
      {activeSubTab === 'portfolio' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-full md:max-w-md">
          {service.portfolio.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Trabajo ${index + 1}`}
              className="w-full h-20 md:h-24 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
      
      {activeSubTab === 'formas-pago' && (
        <div className="space-y-2 md:space-y-3">
          {service.paymentMethods.map((method, index) => (
            <div key={index} className="text-gray-300 text-sm md:text-base">
              {method}
            </div>
          ))}
        </div>
      )}
      
      {activeSubTab === 'ubicacion' && (
        <div className="space-y-3 md:space-y-4">
          <p className="text-gray-300 text-sm md:text-base">
            <strong>Ciudad:</strong> {service.location.city}
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            <strong>Barrios:</strong> {service.location.neighborhoods.join(', ')}.
          </p>
        </div>
      )}
    </div>
  </div>
)

// Componente para el tab "Reseñas"
const ResenasTab = ({ service }) => (
  <div className="space-y-3 md:space-y-4 max-h-64 md:max-h-80 overflow-y-auto">
    {service.reviews.map((review) => (
      <div key={review.id} className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={review.avatar}
            alt={review.client}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium text-sm md:text-base truncate">{review.client}</h4>
              <div className="flex items-center space-x-1 flex-shrink-0">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                  />
                ))}
                <span className="text-white text-xs md:text-sm ml-1">{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs">{review.timeAgo}</p>
          </div>
        </div>
        
        <p className="text-gray-300 text-xs md:text-sm mb-3 leading-relaxed">
          {review.comment}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-400 space-y-1 sm:space-y-0">
          <span>Precio: {review.price}</span>
          <span>Duración: {review.duration}</span>
        </div>
      </div>
    ))}
  </div>
)

export default ServiceDetailModal 