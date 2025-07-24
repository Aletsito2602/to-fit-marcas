import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Menu, Search } from 'lucide-react'

const PoliticaPrivacidad = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
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
        <h1 className="text-2xl font-semibold text-white mb-8">Política de privacidad</h1>

        {/* Contenido de la Política */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-6">Política de privacidad</h2>
          
          {/* Aquí iría el contenido de la política de privacidad */}
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              En ToFit, nos comprometemos a proteger tu privacidad y garantizar que tu información personal esté segura. 
              Esta política de privacidad explica cómo recopilamos, usamos y protegemos tu información.
            </p>
            
            <p>
              <strong className="text-white">Información que recopilamos:</strong><br />
              • Información de perfil (nombre, email, ubicación)<br />
              • Datos de actividad en la aplicación<br />
              • Información de compras y transacciones<br />
              • Datos de interacción con contenido
            </p>
            
            <p>
              <strong className="text-white">Cómo usamos tu información:</strong><br />
              • Personalizar tu experiencia en la aplicación<br />
              • Procesar pedidos y transacciones<br />
              • Enviarte notificaciones relevantes<br />
              • Mejorar nuestros servicios
            </p>
            
            <p>
              <strong className="text-white">Protección de datos:</strong><br />
              Implementamos medidas de seguridad avanzadas para proteger tu información personal 
              y cumplimos con las regulaciones de privacidad aplicables.
            </p>
            
            <p>
              Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través 
              de nuestro centro de asistencia.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoliticaPrivacidad 