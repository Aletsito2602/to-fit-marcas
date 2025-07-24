import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, ShoppingCart, Menu, Search } from 'lucide-react'

const Configuracion = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const configurationOptions = [
    { id: 'admin', label: 'Administración de la cuenta', route: '/admin-cuenta' },
    { id: 'notifications', label: 'Notificaciones', route: '/notificaciones' },
    { id: 'privacy', label: 'Privacidad y datos', route: '/privacidad-datos' },
    { id: 'security', label: 'Seguridad', route: '/seguridad' },
    { id: 'support', label: 'Centro de asistencia', route: '/centro-asistencia' },
    { id: 'privacyPolicy', label: 'Política de privacidad', route: '/politica-privacidad' },
    { id: 'deactivate', label: 'Desactivar mi cuenta', route: '/desactivar-cuenta' }
  ]

  const handleOptionClick = (route) => {
    navigate(route)
  }

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="w-full max-w-md mx-auto px-4 py-6">
        
        {/* Título */}
        <h1 className="text-2xl font-semibold text-white mb-8">Configuración</h1>

        {/* Lista de Opciones */}
        <div className="space-y-0">
          {configurationOptions.map((option, index) => (
            <div key={option.id}>
              <button
                onClick={() => handleOptionClick(option.route)}
                className="w-full py-4 px-0 hover:bg-gray-900/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-left">{option.label}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
              
              {/* Línea divisoria */}
              {index < configurationOptions.length - 1 && (
                <div className="border-b border-gray-800"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Configuracion 