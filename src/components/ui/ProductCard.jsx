import { useState } from 'react'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const ProductCard = ({ 
  product, 
  onFavoriteToggle, 
  onClick,
  index = 0 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(product.isFavorito || false)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    onFavoriteToggle?.(product.id, !isFavorite)
  }

  const handleCardClick = () => {
    onClick?.(product)
  }

  return (
        <div
      onClick={handleCardClick}
      className="group relative cursor-pointer w-full bg-white/5 rounded-lg overflow-hidden
                 hover:scale-[1.02] hover:bg-white/10 
                 transition-all duration-300 ease-out
                 flex flex-col h-48"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Imagen del producto */}
      <div className="relative w-full h-32 overflow-hidden">
        <img
          src={product.imagen}
          alt={product.nombre}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ borderRadius: '8px 8px 0 0' }}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse" 
               style={{ borderRadius: '8px 8px 0 0' }} />
        )}

        {/* Badge de marca */}
        <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-sm rounded-lg 
                        flex items-center gap-1 px-2 py-1 pointer-events-none">
          <div 
            className="w-3 h-3 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: product.marca.color }}
          >
            {product.marca.icono}
          </div>
          <span className="text-white text-xs font-medium capitalize">
            {product.marca.nombre}
          </span>
        </div>

        {/* Botón favorito */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full 
                     flex items-center justify-center hover:bg-black/80 hover:scale-110 
                     transition-all duration-200"
        >
          <Heart 
            className={`w-3 h-3 transition-all duration-200 ${
              isFavorite 
                ? 'fill-red-500 text-red-500' 
                : 'text-white hover:text-red-400'
            }`}
          />
        </button>
      </div>

      {/* Área de información */}
      <div className="p-3 flex flex-col justify-between flex-1">
        {/* Nombre del producto */}
        <h3 className="text-white font-medium text-sm leading-tight line-clamp-2 mb-2
                       group-hover:text-gray-100 transition-colors duration-200">
          {product.nombre}
        </h3>

        {/* Sección de precios */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-white font-bold text-sm
                           group-hover:text-gray-100 transition-colors duration-200">
            {product.precioActual}
          </span>
          {product.precioAnterior && (
            <span className="text-gray-400 line-through text-xs
                             group-hover:text-gray-300 transition-colors duration-200">
              {product.precioAnterior}
            </span>
          )}
        </div>
      </div>
     </div>
  )
}

export default ProductCard 