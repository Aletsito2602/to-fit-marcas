import { Heart } from 'lucide-react'
import { useState } from 'react'

const ServiceCard = ({ 
  image, 
  avatar, 
  name, 
  verified = false, 
  service, 
  onFavorite, 
  onViewDetails,
  isFavorite = false 
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div className="group relative bg-black rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 w-full">
      {/* Imagen principal */}
      <div className="relative h-40 sm:h-44 md:h-40 lg:h-36 overflow-hidden">
        <img
          src={image}
          alt={`Servicio de ${name}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Botón de favorito */}
        <button
          onClick={onFavorite}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorite 
                ? 'fill-red-500 text-red-500' 
                : 'text-white hover:text-red-400'
            }`} 
          />
        </button>
      </div>

      {/* Contenido */}
      <div className="relative p-4">
        {/* Avatar del profesional */}
        <div className="absolute -top-6 left-4">
          <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
            <img
              src={avatar}
              alt={`Avatar de ${name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Información del profesional */}
        <div className="pt-4 space-y-2">
          <div className="flex items-center space-x-1">
            <h3 className="text-white font-semibold text-xs sm:text-sm leading-tight">
              {name}
            </h3>
            {verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          <p className="text-gray-300 text-xs leading-tight line-clamp-2">
            {service}
          </p>
          
          {/* Botón Ver Detalles */}
          <button
            onClick={onViewDetails}
            className="w-full mt-3 py-2 border border-white/30 text-white text-xs font-medium rounded-lg
                     hover:bg-white/10 hover:border-white/50 transition-all duration-200"
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard 