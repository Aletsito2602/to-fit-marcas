import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQSection = ({ className = '' }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(2) // Segunda pregunta expandida por defecto

  const faqs = [
    {
      id: 1,
      question: "¿Cómo funciona el sistema de puntos y cuánto valen?",
      answer: "Cada compra suma puntos por cada $1000 que gastes, ganas 1 punto. Por ejemplo, si compras por $50,000, recibes 100 puntos cada punto equivale a $50 de descuento que puedes canjear."
    },
    {
      id: 2,
      question: "¿Cómo subo de nivel en la app?",
      answer: `Para subir de nivel necesitas completar el 100% del objetivo de tu nivel actual. Esto se divide en dos partes:
      • El 50% se logra interactuando en la app (reseñas, seguir marcas, invitar amigos, etc.)
      • El otro 50% depende de la cantidad de compras mensuales, que varía según el nivel.`
    },
    {
      id: 3,
      question: "¿Qué pasa con los puntos si no los uso?",
      answer: "Los puntos tienen vencimiento: • Nivel 1: vencen a los 3 meses • Nivel 2: 6 meses • Niveles 3 y 4: 8 meses. Si no los usas dentro de ese plazo, se pierden."
    },
    {
      id: 4,
      question: "¿Cuáles son los beneficios de subir de nivel?",
      answer: "A medida que subes de nivel mantienes el 10% de descuento y ganas beneficios extra como: participación en sorteos, premios exclusivos, drops especiales, acceso anticipado y más."
    },
    {
      id: 5,
      question: "¿Qué es el Nivel 4 - Secreto y cómo se accede?",
      answer: "El Nivel 4 es exclusivo y no se alcanza por compras o interacciones. Es un reconocimiento que otorga el equipo de la app a los usuarios más destacados."
    }
  ]

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden ${className}`}>
      {/* Header de la sección */}
      <div className="bg-gray-700 px-6 py-4">
        <h3 className="text-white text-lg font-semibold">Preguntas Frecuentes</h3>
      </div>

      {/* Lista de preguntas */}
      <div className="divide-y divide-gray-700">
        {faqs.map((faq) => (
          <div key={faq.id} className="overflow-hidden">
            {/* Pregunta */}
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-750 transition-colors duration-200"
            >
              <span className="text-white font-medium text-sm sm:text-base pr-4">
                {faq.id}. {faq.question}
              </span>
              {expandedFAQ === faq.id ? (
                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>

            {/* Respuesta expandible */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                expandedFAQ === faq.id 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4">
                <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQSection 