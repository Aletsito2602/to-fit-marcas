import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Menu, Search } from 'lucide-react'
import MenuItem, { MenuItemWithToggle, MenuSection } from '../components/ui/MenuItem'
import { menuStructure, defaultUserSettings } from '../data/menuData'
import { useSupabaseAuthStore } from '../store/supabaseAuthStore'
import UserAvatar from '../components/ui/UserAvatar'
import toast from 'react-hot-toast'

const MenuView = () => {
  const navigate = useNavigate()
  const { user: currentUser, logout, updateUser } = useSupabaseAuthStore()
  const [userSettings, setUserSettings] = useState(defaultUserSettings)
  const [userProfile, setUserProfile] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  // ✅ CARGAR DATOS REALES DEL USUARIO DESDE SUPABASE
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) {
        navigate('/login')
        return
      }

      setLoading(true)
      try {
        // En Supabase, el usuario ya viene con todos los datos necesarios
        setUserProfile({
          name: currentUser.name || 'Usuario ToFit',
          handle: currentUser.username ? `@${currentUser.username}` : (currentUser.email ? `@${currentUser.email.split('@')[0]}` : '@usuario'),
          avatar: currentUser.avatar,
          email: currentUser.email,
          isVerified: currentUser.emailVerified || false
        })
        
        // Cargar configuraciones guardadas (si las hay en los settings del usuario)
        if (currentUser.settings) {
          setUserSettings({ ...defaultUserSettings, ...currentUser.settings })
        }

        // También intentar cargar desde localStorage como backup
        const savedSettings = localStorage.getItem(`userSettings_${currentUser.id}`)
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings)
          setUserSettings(prev => ({ ...prev, ...parsed }))
        }
      } catch (error) {
        console.error('Error loading user data:', error)
        toast.error('Error al cargar datos del usuario')
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [currentUser, navigate])

  // ✅ GUARDAR CONFIGURACIONES EN SUPABASE Y LOCALSTORAGE
  const saveUserSettings = async (newSettings) => {
    if (!currentUser) return

    setUserSettings(newSettings)
    
    try {
      // Guardar en Supabase
      await updateUser({
        settings: newSettings
      })
      
      // Backup en localStorage
      localStorage.setItem(`userSettings_${currentUser.id}`, JSON.stringify(newSettings))
      
      toast.success('Configuración guardada')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Error al guardar configuración')
    }
  }

  // ✅ MANEJAR TOGGLE DE NOTIFICACIONES CON PERSISTENCIA
  const handleNotificationToggle = async (enabled) => {
    const newSettings = {
      ...userSettings,
      pushNotifications: enabled,
      notificationsEnabled: enabled
    }
    
    // Intentar solicitar permisos de notificación si se activan
    if (enabled && 'Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        toast.error('Permisos de notificación denegados')
        return
      }
    }
    
    await saveUserSettings(newSettings)
    toast.success(enabled ? 'Notificaciones activadas' : 'Notificaciones desactivadas')
  }

  // ✅ MANEJAR NAVEGACIÓN CON VALIDACIÓN
  const handleNavigation = (route) => {
    if (!route) return
    
    // Verificar si la ruta requiere autenticación
    const protectedRoutes = ['/purchases', '/favorites', '/mi-cuenta', '/mi-perfil']
    if (protectedRoutes.includes(route) && !currentUser) {
      toast.error('Necesitas iniciar sesión')
      navigate('/login')
      return
    }
    
    navigate(route)
  }

  // ✅ ACCIONES ESPECIALES MEJORADAS
  const handleAction = async (actionType) => {
    switch (actionType) {
      case 'rate':
        handleRateApp()
        break
      case 'share':
        await handleShareApp()
        break
      case 'social':
        handleSocialLinks()
        break
      case 'logout':
        await handleLogout()
        break
      default:
        console.log('Acción no reconocida:', actionType)
    }
  }

  // ✅ FUNCIÓN PARA CALIFICAR APP
  const handleRateApp = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    let storeUrl = 'https://tofit.app'
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      storeUrl = 'https://apps.apple.com/app/tofit'
    } else if (/android/.test(userAgent)) {
      storeUrl = 'https://play.google.com/store/apps/details?id=com.tofit'
    }
    
    window.open(storeUrl, '_blank')
    toast.success('¡Gracias por calificar ToFit!')
  }

  // ✅ FUNCIÓN PARA COMPARTIR APP
  const handleShareApp = async () => {
    const shareData = {
      title: 'ToFit - Tu plataforma de moda favorita',
      text: '¡Descubre ToFit y transforma tu estilo personal!',
      url: 'https://tofit.app'
    }
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        toast.success('¡Aplicación compartida!')
      } catch (err) {
        if (err.name !== 'AbortError') {
          await fallbackShare(shareData.url)
        }
      }
    } else {
      await fallbackShare(shareData.url)
    }
  }

  // Función auxiliar para compartir
  const fallbackShare = async (url) => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Link copiado al portapapeles')
    } catch (err) {
      console.error('Error copying to clipboard:', err)
      toast.error('No se pudo copiar el link')
    }
  }

  // ✅ FUNCIÓN PARA REDES SOCIALES
  const handleSocialLinks = () => {
    const socialMenu = [
      { name: 'Instagram', url: 'https://instagram.com/tofit' },
      { name: 'Twitter', url: 'https://twitter.com/tofit' },
      { name: 'TikTok', url: 'https://tiktok.com/@tofit' },
      { name: 'LinkedIn', url: 'https://linkedin.com/company/tofit' }
    ]
    
    // Abrir Instagram por defecto
    window.open(socialMenu[0].url, '_blank')
    toast.success('¡Síguenos en redes sociales!')
  }

  // ✅ FUNCIÓN PARA CERRAR SESIÓN
  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Sesión cerrada exitosamente')
      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
      toast.error('Error al cerrar sesión')
    }
  }

  // Manejar click en item de menú
  const handleMenuItemClick = (item) => {
    switch (item.type) {
      case 'navigation':
        handleNavigation(item.route)
        break
      case 'action':
        handleAction(item.action)
        break
      default:
        console.log('Tipo de item no reconocido:', item.type)
    }
  }

  // ✅ MANEJAR BÚSQUEDA CON FUNCIONALIDAD REAL
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navegar a página de búsqueda con query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando menú...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-black text-white min-h-screen flex flex-col">
      {/* Header superior con navegación - Fijo */}
      <div className="bg-black border-b border-white/5 flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Volver"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <div className="flex items-center space-x-6">
            <button 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Menú"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <button 
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Buscar"
            >
              <Search className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal - Scrollable */}
      <div 
        className="flex-1 overflow-y-auto menu-scrollable"
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="w-full px-5 py-6">

        {/* ✅ HEADER DEL USUARIO CON DATOS REALES MEJORADOS */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <UserAvatar 
              user={userProfile} 
              size="xl"
              className="border-2 border-white/20 ring-2 ring-blue-500/30"
            />
            {/* Indicador de estado online */}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white text-xl font-bold leading-tight truncate">
              {userProfile?.name || currentUser?.name || currentUser?.displayName || 'Usuario ToFit'}
            </h2>
            <p className="text-gray-300 text-sm mt-1 truncate">
              {userProfile?.handle || (currentUser?.email ? `@${currentUser.email.split('@')[0]}` : '@usuario')}
            </p>
            {(userProfile?.email || currentUser?.email) && (
              <p className="text-gray-500 text-xs mt-1 truncate">
                {userProfile?.email || currentUser?.email}
              </p>
            )}
            {/* Badge de verificación si el usuario está verificado */}
            {currentUser?.emailVerified && (
              <div className="flex items-center mt-2">
                <div className="flex items-center space-x-1 bg-blue-600/20 px-2 py-1 rounded-full">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-300 text-xs font-medium">Verificado</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ✅ BARRA DE BÚSQUEDA FUNCIONAL MEJORADA */}
        <div className="mb-10">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Buscar productos, marcas, servicios, usuarios..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="
                  w-full h-12 pl-12 pr-12
                  bg-gray-800/60 border border-gray-700/50 rounded-xl
                  text-white placeholder-gray-400 text-base
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
                  focus:bg-gray-800/80
                  hover:bg-gray-800/70
                  transition-all duration-200
                "
              />
              {/* Botón de limpiar búsqueda */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {/* Sugerencias de búsqueda rápida */}
            {!searchQuery && (
              <div className="flex flex-wrap gap-2 mt-3">
                {['Zara', 'H&M', 'Maquillaje', 'Estilistas', 'Tendencias'].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-3 py-1.5 bg-gray-700/50 text-gray-300 text-sm rounded-full hover:bg-gray-600/50 hover:text-white transition-all duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Secciones del menú con espaciado mejorado */}
        <div className="space-y-8">
          {/* Sección Notificaciones */}
          <MenuSection title={menuStructure.notificaciones.title}>
            {menuStructure.notificaciones.items.map((item) => (
              <MenuItemWithToggle
                key={item.id}
                text={item.text}
                isActive={userSettings[item.key]}
                onToggle={handleNotificationToggle}
              />
            ))}
          </MenuSection>

          {/* Sección Afiliados */}
          <MenuSection title={menuStructure.afiliados.title}>
            {menuStructure.afiliados.items.map((item) => (
              <MenuItem
                key={item.id}
                text={item.text}
                onClick={() => handleMenuItemClick(item)}
                showChevron={true}
              />
            ))}
          </MenuSection>

          {/* Sección Actividad */}
          <MenuSection title={menuStructure.actividad.title}>
            {menuStructure.actividad.items.map((item) => (
              <MenuItem
                key={item.id}
                text={item.text}
                onClick={() => handleMenuItemClick(item)}
                showChevron={true}
              />
            ))}
          </MenuSection>

          {/* Sección Más */}
          <MenuSection title={menuStructure.mas.title}>
            {menuStructure.mas.items.map((item) => (
              <MenuItem
                key={item.id}
                text={item.text}
                onClick={() => handleMenuItemClick(item)}
                showChevron={true}
              />
            ))}
          </MenuSection>
        </div>

          {/* Espacio adicional al final para scroll */}
          <div className="h-20" />
        </div>
      </div>
    </div>
  )
}

export default MenuView 