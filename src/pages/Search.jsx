import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search, ArrowLeft, Filter, Grid, List } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'Todo' },
    { id: 'products', label: 'Productos' },
    { id: 'brands', label: 'Marcas' },
    { id: 'users', label: 'Usuarios' },
    { id: 'posts', label: 'Posts' }
  ]

  useEffect(() => {
    const searchQuery = searchParams.get('q')
    if (searchQuery) {
      setQuery(searchQuery)
      performSearch(searchQuery)
    }
  }, [searchParams])

  const performSearch = async (searchTerm) => {
    if (!searchTerm.trim()) return

    setLoading(true)
    try {
      // Simular búsqueda - aquí iría la integración con Firebase
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Resultados mock
      const mockResults = [
        {
          id: '1',
          type: 'product',
          title: 'Remera Básica Nike',
          description: 'Remera de algodón 100%',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
          price: '$15.999',
          brand: 'Nike'
        },
        {
          id: '2',
          type: 'user',
          title: 'María González',
          description: '@mariagonzalez - Influencer de moda',
          image: 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=300&h=300&fit=crop',
          followers: '10.5K'
        },
        {
          id: '3',
          type: 'brand',
          title: 'Zara',
          description: 'Marca de moda internacional',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
          products: '156 productos'
        }
      ]

      setResults(mockResults)
      toast.success(`Se encontraron ${mockResults.length} resultados`)
    } catch (error) {
      console.error('Error searching:', error)
      toast.error('Error al realizar búsqueda')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const filteredResults = activeFilter === 'all' 
    ? results 
    : results.filter(result => result.type === activeFilter.slice(0, -1))

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos, marcas, usuarios..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-600"
                autoFocus
              />
            </div>
          </form>
        </div>

        {/* Filtros */}
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-3 gap-4' : 'space-y-4'}>
            {filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-gray-600 transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'flex items-center gap-4' : ''
                }`}
              >
                <img
                  src={result.image}
                  alt={result.title}
                  className={`rounded-lg object-cover ${
                    viewMode === 'grid' ? 'w-full aspect-square mb-3' : 'w-16 h-16'
                  }`}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{result.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{result.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 capitalize">{result.type}</span>
                    {result.price && <span className="text-sm font-medium text-white">{result.price}</span>}
                    {result.followers && <span className="text-sm text-gray-400">{result.followers}</span>}
                    {result.products && <span className="text-sm text-gray-400">{result.products}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sin resultados</h3>
            <p className="text-gray-400">No se encontraron resultados para "{query}"</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Buscar en ToFit</h3>
            <p className="text-gray-400">Encuentra productos, marcas y usuarios</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage 