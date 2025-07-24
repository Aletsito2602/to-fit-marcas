import { motion } from 'framer-motion'

// Skeleton individual para tarjetas
export const SkeletonCard = ({ className = "" }) => (
  <div className={`bg-white/5 rounded-xl overflow-hidden animate-pulse ${className}`}>
    <div className="w-full h-32 bg-gray-700" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-gray-600 rounded w-3/4" />
      <div className="h-3 bg-gray-700 rounded w-1/2" />
    </div>
  </div>
)

// Skeleton para el Hero Banner
export const HeroBannerSkeleton = () => (
  <motion.section 
    className="w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="overflow-hidden rounded-xl sm:rounded-2xl relative">
      <div className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 bg-gray-700 animate-pulse" />
      
      {/* Skeleton content overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-4 left-4 sm:left-6 md:left-8 lg:left-10 xl:left-12 space-y-3">
        <div className="h-8 sm:h-10 md:h-12 bg-gray-600 rounded w-64 animate-pulse" />
        <div className="h-10 bg-gray-500 rounded w-32 animate-pulse" />
      </div>
    </div>
    
    {/* Skeleton dots */}
    <div className="flex justify-center mt-4 space-x-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
      ))}
    </div>
  </motion.section>
)

// Skeleton para Brand Collections
export const BrandCollectionsSkeleton = () => (
  <motion.section 
    className="w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.1 }}
  >
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 pb-4 min-w-max px-1">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-32 h-44 sm:w-40 sm:h-52 md:w-48 md:h-64 lg:w-52 lg:h-72 xl:w-56 xl:h-80
                       rounded-lg sm:rounded-xl bg-gray-700 animate-pulse relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {/* Skeleton brand icon */}
            <div className="absolute top-2 left-2 w-5 h-5 bg-gray-600 rounded-full animate-pulse" />
            
            {/* Skeleton brand name at bottom */}
            <div className="absolute bottom-2 left-2 right-2 space-y-1">
              <div className="h-3 bg-gray-600 rounded w-3/4 animate-pulse" />
              <div className="h-2 bg-gray-700 rounded w-1/2 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
)

// Skeleton para Categories Grid
export const CategoriesGridSkeleton = () => (
  <motion.section 
    className="w-screen -ml-1 sm:w-full sm:ml-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.2 }}
  >
    <div className="w-full max-w-full px-3 sm:px-0">
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-1 xs:gap-3 sm:grid-cols-2 sm:gap-4 
                      md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-6 w-full">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full h-32 xs:h-36 sm:h-28 md:h-32 lg:h-36 xl:h-40
                       rounded-xl sm:rounded-2xl bg-gray-700 animate-pulse relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Skeleton category text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="space-y-2 text-center">
                <div className="h-4 bg-gray-600 rounded w-24 mx-auto animate-pulse" />
                <div className="h-1 bg-gray-700 rounded w-8 mx-auto animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
)

// Skeleton para Influencer Looks
export const InfluencerLooksSkeleton = () => (
  <motion.section 
    className="w-screen -ml-1 sm:w-full sm:ml-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.3 }}
  >
    <div className="w-full max-w-full px-3 sm:px-0">
      {/* Skeleton title */}
      <div className="mb-6 sm:mb-8">
        <div className="h-6 bg-gray-600 rounded w-96 max-w-full animate-pulse" />
      </div>

      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 pb-4 min-w-max">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-28 h-40 sm:w-32 sm:h-44 md:w-36 md:h-48 
                         lg:w-40 lg:h-52 xl:w-44 xl:h-56 rounded-lg sm:rounded-xl 
                         bg-gray-700 animate-pulse relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Skeleton influencer info at bottom */}
              <div className="absolute bottom-2 left-2 right-2 space-y-1">
                <div className="h-2 bg-gray-600 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-500 rounded w-1/2 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
)

// Skeleton para Featured Stores
export const FeaturedStoresSkeleton = () => (
  <motion.section 
    className="w-screen -ml-1 sm:w-full sm:ml-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.4 }}
  >
    <div className="w-full max-w-full px-3 sm:px-0">
      {/* Skeleton header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="h-8 bg-gray-600 rounded w-48 animate-pulse" />
        <div className="h-6 bg-gray-700 rounded w-20 animate-pulse" />
      </div>

      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 pb-4 min-w-max">
          {/* Hero store skeleton */}
          <motion.div
            className="flex-shrink-0 w-64 h-48 sm:w-72 sm:h-52 md:w-80 md:h-56 
                       lg:w-96 lg:h-64 xl:w-[420px] xl:h-72 rounded-xl sm:rounded-2xl 
                       bg-gray-700 animate-pulse relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="absolute inset-0 flex items-center justify-center space-y-4">
              <div className="text-center space-y-4">
                <div className="h-12 bg-gray-600 rounded w-48 animate-pulse" />
                <div className="h-10 bg-gray-500 rounded w-32 mx-auto animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Secondary stores skeleton */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 
                         lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-xl sm:rounded-2xl 
                         bg-gray-700 animate-pulse relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (i + 1) * 0.1 }}
            >
              <div className="absolute bottom-4 left-4 space-y-2">
                <div className="h-5 bg-gray-600 rounded w-24 animate-pulse" />
                <div className="h-3 bg-gray-700 rounded w-16 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
)

// Skeleton para Sugerencias Para Ti
export const SugerenciasSkeleton = () => (
  <motion.section 
    className="w-screen -ml-1 sm:w-full sm:ml-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3, delay: 0.5 }}
  >
    <div className="w-full max-w-full px-3 sm:px-0">
      {/* Skeleton header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="h-8 bg-gray-600 rounded w-56 animate-pulse" />
        <div className="h-6 bg-gray-700 rounded w-20 animate-pulse" />
      </div>

      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 sm:gap-5 md:gap-6 pb-4 min-w-max">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-48 sm:w-52 md:w-56 lg:w-60 xl:w-64"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Skeleton product image */}
              <div className="relative w-full aspect-[4/5] mb-3 rounded-2xl bg-gray-700 animate-pulse overflow-hidden">
                {/* Skeleton brand badge */}
                <div className="absolute bottom-3 left-3 bg-gray-600 rounded-lg px-3 py-1.5 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-500 rounded-full animate-pulse" />
                    <div className="w-12 h-3 bg-gray-500 rounded animate-pulse" />
                  </div>
                </div>

                {/* Skeleton action buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse" />
                  <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse" />
                </div>
              </div>
              
              {/* Skeleton product info */}
              <div className="px-1 space-y-2">
                <div className="h-4 bg-gray-600 rounded w-3/4 animate-pulse" />
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-gray-500 rounded w-16 animate-pulse" />
                  <div className="h-3 bg-gray-700 rounded w-12 animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
)

// Skeleton completo para toda la tienda
export const TiendaCompleteSkeleton = () => (
  <div className="w-full h-full bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full px-2 sm:px-3 md:px-4 py-3 sm:py-4 space-y-4 sm:space-y-6 pb-20">
        <HeroBannerSkeleton />
        <BrandCollectionsSkeleton />
        <CategoriesGridSkeleton />
        <InfluencerLooksSkeleton />
        <FeaturedStoresSkeleton />
        <SugerenciasSkeleton />
      </div>
    </div>
  </div>
)

// Estados vacíos elegantes
export const EmptyState = ({ type, title, message, icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-16 text-gray-500"
  >
    {Icon && <Icon className="w-16 h-16 mb-4 text-gray-400" />}
    <h3 className="text-lg font-medium mb-2 text-gray-300">
      {title}
    </h3>
    <p className="text-sm text-center max-w-sm text-gray-500">
      {message}
    </p>
  </motion.div>
)

// Estados vacíos específicos por sección
export const HeroEmptyState = () => (
  <EmptyState
    type="hero"
    title="Próximamente colaboraciones exclusivas"
    message="Las marcas podrán destacar sus colecciones más exclusivas aquí"
  />
)

export const BrandsEmptyState = () => (
  <EmptyState
    type="brands"
    title="Las marcas aparecerán aquí"
    message="Cuando las marcas se registren y activen sus tiendas, aparecerán en esta sección"
  />
)

export const CategoriesEmptyState = () => (
  <EmptyState
    type="categories"
    title="Categorías disponibles pronto"
    message="Las categorías se configurarán desde el panel de administración"
  />
)

export const InfluencersEmptyState = () => (
  <EmptyState
    type="influencers"
    title="Influencers verificados próximamente"
    message="Los influencers podrán mostrar sus looks y outfits curados aquí"
  />
)

export const ProductsEmptyState = () => (
  <EmptyState
    type="products"
    title="Productos disponibles pronto"
    message="Los productos aparecerán cuando las marcas suban su catálogo"
  />
) 

// ==================== SERVICIOS SKELETONS ====================

// Skeleton para una tarjeta de servicio individual
export const ServiceCardSkeleton = () => (
  <div className="group relative bg-black rounded-xl overflow-hidden animate-pulse">
    {/* Imagen principal */}
    <div className="relative h-40 sm:h-44 md:h-40 lg:h-36 bg-gray-700" />
    
    {/* Contenido */}
    <div className="relative p-4">
      {/* Avatar del profesional */}
      <div className="absolute -top-6 left-4">
        <div className="w-8 h-8 rounded-full bg-gray-600" />
      </div>
      
      {/* Nombre del profesional */}
      <div className="pt-4 mb-2">
        <div className="h-4 bg-gray-600 rounded w-20" />
      </div>
      
      {/* Título del servicio */}
      <div className="mb-2">
        <div className="h-3 bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-700 rounded w-3/4 mt-1" />
      </div>
      
      {/* Rating y precio */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-600 rounded" />
          ))}
        </div>
        <div className="h-4 bg-gray-600 rounded w-12" />
      </div>
    </div>
  </div>
)

// Skeleton para el grid completo de servicios
export const ServicesGridSkeleton = ({ itemCount = 8 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 px-2 sm:px-4 lg:px-6"
  >
    {[...Array(itemCount)].map((_, index) => (
      <ServiceCardSkeleton key={index} />
    ))}
  </motion.div>
)

// Skeleton para la barra de búsqueda de servicios
export const ServicesSearchSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="max-w-5xl mx-auto mb-8 px-2"
  >
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 animate-pulse">
      {/* Campo de búsqueda principal */}
      <div className="relative mb-4">
        <div className="h-12 bg-gray-700 rounded-xl" />
      </div>

      {/* Campos de fecha y ubicación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="h-12 bg-gray-700 rounded-xl" />
        <div className="h-12 bg-gray-700 rounded-xl" />
        <div className="h-12 bg-gray-700 rounded-xl sm:col-span-2 md:col-span-1" />
      </div>
    </div>
  </motion.div>
)

// Skeleton para el modal de detalles del servicio
export const ServiceDetailModalSkeleton = () => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="relative bg-black border border-white/20 rounded-2xl max-w-4xl w-full max-h-[85vh] md:max-h-[90vh] overflow-hidden shadow-2xl animate-pulse">
      {/* Layout principal */}
      <div className="flex flex-col md:flex-row h-auto md:h-[600px] max-h-[85vh] md:max-h-[90vh]">
        {/* Imagen del servicio */}
        <div className="w-full md:w-80 h-64 md:h-full md:flex-shrink-0 relative bg-gray-700" />

        {/* Contenido del modal */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 space-y-4">
            <div className="h-6 bg-gray-600 rounded w-3/4" />
            <div className="h-4 bg-gray-700 rounded w-1/2" />
            <div className="flex items-center space-x-4">
              <div className="h-4 bg-gray-600 rounded w-16" />
              <div className="h-4 bg-gray-600 rounded w-20" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-1 p-4">
                <div className="h-4 bg-gray-700 rounded w-full" />
              </div>
            ))}
          </div>

          {/* Contenido del tab */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-4/5" />
            <div className="h-4 bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Skeleton para tabs de servicios
export const ServicesTabsSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="flex justify-center mb-8"
  >
    <div className="flex space-x-1 bg-black/40 rounded-lg p-1 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-10 bg-gray-700 rounded w-24" />
      ))}
    </div>
  </motion.div>
)

// Skeleton completo para la página de servicios
export const ServiciosCompleteSkeleton = () => (
  <div className="w-full bg-black text-white pb-8">
    <div className="w-full px-2 sm:px-4 lg:px-6 py-6">
      {/* Skeleton para tabs */}
      <ServicesTabsSkeleton />
      
      {/* Skeleton para búsqueda */}
      <ServicesSearchSkeleton />
      
      {/* Skeleton para grid de servicios */}
      <ServicesGridSkeleton />
    </div>
  </div>
)

// Estados vacíos para servicios
export const ServicesEmptyState = ({ type = 'servicios' }) => {
  const messages = {
    servicios: {
      title: "No hay servicios disponibles",
      description: "No se encontraron profesionales en tu área. Intenta expandir tu búsqueda.",
      icon: "🔍"
    },
    favoritos: {
      title: "No tienes servicios favoritos",
      description: "Agrega servicios a favoritos para encontrarlos fácilmente más tarde.",
      icon: "💝"
    },
    reservas: {
      title: "No tienes reservas activas",
      description: "Cuando reserves un servicio, aparecerá aquí.",
      icon: "📅"
    },
    busqueda: {
      title: "No se encontraron resultados",
      description: "Intenta modificar tus filtros de búsqueda.",
      icon: "🔎"
    }
  }

  const config = messages[type] || messages.servicios

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-16 px-4"
    >
      <div className="text-6xl mb-4">{config.icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{config.title}</h3>
      <p className="text-gray-400 text-lg max-w-md mx-auto">{config.description}</p>
    </motion.div>
  )
} 