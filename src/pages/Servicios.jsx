import { useState, useEffect, useMemo } from 'react'
import { Search, Calendar, MapPin } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Tabs from '../components/ui/Tabs'
import ServiceCard from '../components/ui/ServiceCard'
import ServiceDetailModal from '../components/ui/ServiceDetailModal'
import { useServiciosData } from '../hooks/useFirestore'
import { useAuthStore } from '../store/authStore'
import { 
  ServiciosCompleteSkeleton,
  ServicesEmptyState,
  ServicesGridSkeleton,
  ServicesSearchSkeleton,
  ServicesTabsSkeleton
} from '../components/ui/SkeletonLoaders'
import { 
  useProcessedServicios,
  useServiceRecommendations,
  calculateServicesMetrics
} from '../utils/serviciosAlgorithms'
import { 
  toggleFavoriteService,
  incrementServiceView,
  trackServiceView,
  trackServiceContact,
  searchServicios
} from '../services/serviciosService'

const Servicios = () => {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('servicios')
  const [searchQuery, setSearchQuery] = useState('')
  const [startDate, setStartDate] = useState('20/05/25')
  const [endDate, setEndDate] = useState('21/05/25')
  const [location, setLocation] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState('rating')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Obtener datos dinámicos de Firebase
  const serviciosData = useServiciosData(user)
  const { 
    profesionales = [], 
    servicios = [], 
    favoritosUser = [],
    reservasUser = [],
    isLoading,
    hasError
  } = serviciosData

  // Definir tabs dinámicamente
  const tabs = [
    { id: 'servicios', label: 'Servicios' },
    { id: 'favoritos', label: `Favoritos (${favoritosUser.length})` },
    { id: 'reservas', label: `Mis reservas (${reservasUser.filter(r => r.status !== 'cancelada').length})` }
  ]

  // Filtros de búsqueda
  const searchFilters = useMemo(() => ({
    searchQuery,
    ubicacion: location,
    // Podríamos agregar más filtros aquí como categoria, precio, etc.
  }), [searchQuery, location])

  // Procesar datos con algoritmos
  const processedData = useProcessedServicios(
    { profesionales, servicios, favoritosUser },
    searchFilters,
    sortBy
  )

  // Obtener recomendaciones personalizadas
  const recommendations = useServiceRecommendations(
    processedData.servicios,
    reservasUser,
    user?.preferences || {}
  )

  // Calcular métricas para analytics
  const metrics = useMemo(() => 
    calculateServicesMetrics(processedData.servicios, reservasUser),
    [processedData.servicios, reservasUser]
  )

  // Determinar qué servicios mostrar según el tab activo
  const serviciosToShow = useMemo(() => {
    if (isSearching && searchResults.length > 0) {
      return searchResults
    }

    switch (activeTab) {
      case 'servicios':
        return recommendations.length > 0 ? recommendations : processedData.servicios
      
      case 'favoritos':
        return processedData.servicios.filter(servicio => servicio.isFavorite)
      
      case 'reservas':
        // Mapear reservas a servicios
        const reservedServiceIds = reservasUser
          .filter(r => r.status !== 'cancelada')
          .map(r => r.servicioId)
        return processedData.servicios.filter(servicio => 
          reservedServiceIds.includes(servicio.id)
        )
      
      default:
        return processedData.servicios
    }
  }, [activeTab, processedData.servicios, recommendations, reservasUser, isSearching, searchResults])

  // Handlers para interacciones
  const handleFavorite = async (serviceId) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar favoritos')
      return
    }

    try {
      const result = await toggleFavoriteService(user.id, serviceId)
      
      if (result.success) {
        toast.success(
          result.action === 'added' 
            ? 'Servicio agregado a favoritos' 
            : 'Servicio removido de favoritos'
        )
        
        // Los datos se actualizarán automáticamente por los hooks de Firebase
      } else {
        toast.error('Error al actualizar favoritos')
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error('Error al actualizar favoritos')
    }
  }

  const handleViewDetails = async (serviceId) => {
    const service = serviciosToShow.find(s => s.id === serviceId)
    if (service) {
      // Incrementar contador de vistas
      await incrementServiceView(serviceId)
      
      // Track analytics
      if (user) {
        await trackServiceView(user.id, serviceId, service.professional?.id)
      }
      
      setSelectedService(service)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!searchQuery.trim() && !location.trim()) {
      setIsSearching(false)
      setSearchResults([])
      return
    }

    try {
      setIsSearching(true)
      
      const searchParams = {
        query: searchQuery,
        ubicacion: location,
        fechaInicio: startDate,
        fechaFin: endDate
      }
      
      const result = await searchServicios(searchParams)
      
      if (result.success) {
        setSearchResults(result.data || [])
      } else {
        toast.error('Error en la búsqueda')
        setSearchResults([])
      }
    } catch (error) {
      console.error('Error searching services:', error)
      toast.error('Error en la búsqueda')
      setSearchResults([])
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setLocation('')
    setIsSearching(false)
    setSearchResults([])
  }

  // Estados de carga y error
  if (isLoading) {
    return <ServiciosCompleteSkeleton />
  }

  if (hasError) {
    return (
      <div className="w-full bg-black text-white pb-8">
        <div className="w-full px-2 sm:px-4 lg:px-6 py-6">
          <ServicesEmptyState 
            type="error" 
            title="Error al cargar servicios"
            description="Hubo un problema al cargar los servicios. Intenta recargar la página."
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-black text-white pb-8">
      <div className="w-full px-2 sm:px-4 lg:px-6 py-6">
        {/* Navegación por tabs */}
        <div className="flex justify-center mb-8">
          <Tabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Barra de búsqueda */}
        <div className="max-w-5xl mx-auto mb-8 px-2">
          <form onSubmit={handleSearch} className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            {/* Campo de búsqueda principal */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar servicio"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20"
              />
            </div>

            {/* Campos de fecha y ubicación */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {/* Rango de fechas */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={`${startDate} - ${endDate}`}
                  readOnly
                  className="w-full pl-12 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-white cursor-pointer focus:outline-none focus:border-white/40"
                />
              </div>

              {/* Ubicación */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ubicación"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/60 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20"
                />
              </div>

              {/* Botón buscar */}
              <div className="flex space-x-2 sm:col-span-2 md:col-span-1">
                <button
                  type="submit"
                  className="flex-1 bg-white text-black font-medium py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  disabled={isSearching}
                >
                  {isSearching ? 'Buscando...' : 'Buscar'}
                </button>
                
                {(isSearching || searchQuery || location) && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-colors duration-200"
                  >
                    Limpiar
                  </button>
                )}
              </div>
            </div>

            {/* Indicador de resultados de búsqueda */}
            {isSearching && (
              <div className="text-sm text-gray-400">
                {searchResults.length > 0 
                  ? `${searchResults.length} resultados encontrados`
                  : 'Buscando...'
                }
              </div>
            )}
          </form>
        </div>

        {/* Indicador de recomendaciones para tab servicios */}
        {activeTab === 'servicios' && !isSearching && recommendations.length > 0 && (
          <div className="max-w-5xl mx-auto mb-4 px-2">
            <div className="text-center text-gray-400 text-sm">
              ✨ Recomendaciones personalizadas basadas en tu historial
            </div>
          </div>
        )}

        {/* Grid de servicios */}
        <div className="w-full">
          {serviciosToShow.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12 px-2 sm:px-4 lg:px-6">
              {serviciosToShow.map((servicio) => (
                <ServiceCard
                  key={servicio.id}
                  image={servicio.image}
                  avatar={servicio.avatar}
                  name={servicio.name}
                  verified={servicio.verified}
                  service={servicio.service}
                  isFavorite={servicio.isFavorite}
                  onFavorite={() => handleFavorite(servicio.id)}
                  onViewDetails={() => handleViewDetails(servicio.id)}
                />
              ))}
            </div>
          ) : (
            <ServicesEmptyState 
              type={isSearching ? 'busqueda' : activeTab} 
            />
          )}
        </div>

        {/* Información de métricas para debugging en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <div className="max-w-5xl mx-auto mt-8 px-2">
            <div className="bg-gray-900/50 rounded-lg p-4 text-xs text-gray-400">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="font-semibold">Total Servicios</div>
                  <div>{metrics.totalServices}</div>
                </div>
                <div>
                  <div className="font-semibold">Rating Promedio</div>
                  <div>{metrics.averageRating.toFixed(1)}</div>
                </div>
                <div>
                  <div className="font-semibold">Total Reservas</div>
                  <div>{metrics.totalBookings}</div>
                </div>
                <div>
                  <div className="font-semibold">Verificados</div>
                  <div>{metrics.professionalStats.verified}/{metrics.professionalStats.total}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de detalles del servicio */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Servicios 