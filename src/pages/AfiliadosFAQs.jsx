import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Menu, Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import Card from '../components/ui/Card'

const AfiliadosFAQs = () => {
  const navigate = useNavigate()
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  const faqs = [
    {
      id: 1,
      question: "¿Cómo funciona el programa de afiliados de ToFit?",
      answer: "Nuestro programa de afiliados te permite ganar comisiones por cada venta que generes a través de tu enlace de referido único. Cuando alguien hace una compra usando tu enlace, recibes un porcentaje de la venta como comisión."
    },
    {
      id: 2,
      question: "¿Cuánto puedo ganar como afiliado?",
      answer: "Las comisiones varían según tu rango de afiliado: Beginner (5%), Rising (8%), Influencer (12%), y Ambassador (15%). Tu rango se determina por el número de referidos exitosos que hayas generado."
    },
    {
      id: 3,
      question: "¿Cuáles son los requisitos para unirse?",
      answer: "Solo necesitas tener una cuenta activa en ToFit y aceitar nuestros términos del programa de afiliados. No hay requisitos de seguidores mínimos o experiencia previa necesaria."
    },
    {
      id: 4,
      question: "¿Cómo y cuándo recibo mis pagos?",
      answer: "Los pagos se procesan mensualmente para comisiones superiores a $50. Puedes elegir recibir tus pagos vía transferencia bancaria, PayPal o Stripe. Los pagos se realizan entre los días 1-5 de cada mes."
    },
    {
      id: 5,
      question: "¿Puedo promocionar productos específicos?",
      answer: "Sí, puedes promocionar cualquier producto disponible en ToFit. También proporcionamos materiales de marketing, banners y contenido creativo para ayudarte en tus promociones."
    },
    {
      id: 6,
      question: "¿Cómo puedo rastrear mi rendimiento?",
      answer: "Tu dashboard de afiliado te muestra estadísticas en tiempo real incluyendo clicks, conversiones, comisiones ganadas y tu progreso hacia el siguiente rango."
    },
    {
      id: 7,
      question: "¿Hay restricciones en cómo puedo promocionar?",
      answer: "Debes seguir nuestras pautas de marca y no usar métodos de spam. No está permitido el uso de publicidad pagada con marca registrada sin autorización previa."
    },
    {
      id: 8,
      question: "¿Puedo referir a otros afiliados?",
      answer: "Actualmente, el programa se enfoca en referir clientes finales. Sin embargo, estamos desarrollando un programa de afiliados de segundo nivel que se lanzará próximamente."
    },
    {
      id: 9,
      question: "¿Qué sucede si un cliente devuelve un producto?",
      answer: "Si un cliente devuelve un producto que referiste, la comisión correspondiente será deducida de tus ganancias futuras. Esto es estándar en la industria."
    },
    {
      id: 10,
      question: "¿Necesito declarar estos ingresos en mis impuestos?",
      answer: "Sí, las comisiones de afiliado son consideradas ingresos y deben ser declaradas según las leyes fiscales de tu país. Te recomendamos consultar con un contador."
    },
    {
      id: 11,
      question: "¿Puedo usar mi enlace de afiliado en mis propias compras?",
      answer: "No, no está permitido usar tu propio enlace de afiliado para obtener comisiones en tus compras personales. Esto resulta en la suspensión del programa."
    },
    {
      id: 12,
      question: "¿Cómo puedo mejorar mi rango de afiliado?",
      answer: "Tu rango mejora automáticamente basado en el número de referidos exitosos. Enfócate en crear contenido de calidad y construir confianza con tu audiencia para generar más conversiones."
    }
  ]

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
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

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-full">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">FAQs del Programa de Afiliados</h1>
          <p className="text-xl text-gray-300">
            Encuentra respuestas a las preguntas más frecuentes sobre nuestro programa de afiliados
          </p>
        </div>

        {/* Navegación rápida */}
        <div className="mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Navegación Rápida</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                onClick={() => navigate('/affiliates')}
                className="text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="text-blue-400 font-medium">Programa Principal</div>
                <div className="text-sm text-gray-400">Información y dashboard</div>
              </button>
              <button
                onClick={() => setExpandedFAQ(4)}
                className="text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="text-green-400 font-medium">Pagos</div>
                <div className="text-sm text-gray-400">Cómo y cuándo cobrar</div>
              </button>
              <button
                onClick={() => setExpandedFAQ(2)}
                className="text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="text-purple-400 font-medium">Comisiones</div>
                <div className="text-sm text-gray-400">Cuánto puedes ganar</div>
              </button>
            </div>
          </div>
        </div>

        {/* Lista de FAQs */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="bg-gray-900 border-gray-700 overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 text-left hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>
              
              {expandedFAQ === faq.id && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Contacto y Soporte */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">¿No encontraste tu respuesta?</h3>
              <p className="text-gray-300 mb-6">
                Nuestro equipo de soporte está aquí para ayudarte con cualquier pregunta específica sobre el programa de afiliados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open('mailto:afiliados@tofit.com', '_blank')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Contactar Soporte
                </button>
                <button
                  onClick={() => navigate('/centro-asistencia')}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Centro de Ayuda
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Estadísticas del Programa */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Estadísticas del Programa</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
              <div className="text-gray-400">Afiliados Activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$50K+</div>
              <div className="text-gray-400">Pagado en Comisiones</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">15%</div>
              <div className="text-gray-400">Comisión Máxima</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-400">Soporte Disponible</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AfiliadosFAQs