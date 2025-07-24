import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Menu, Search } from 'lucide-react'
import MenuItem, { MenuItemWithToggle, MenuSection } from '../components/ui/MenuItem'
import { userData, menuStructure, menuActions, defaultUserSettings } from '../data/menuData'

const MenuView = () => {
  const navigate = useNavigate()
  const [userSettings, setUserSettings] = useState(defaultUserSettings)
  const [user, setUser] = useState(userData)
  const [searchQuery, setSearchQuery] = useState('')

  // Cargar configuraciones del usuario al montar el componente
  useEffect(() => {
    // Aquí se cargarían las configuraciones reales del usuario desde una API
    const savedSettings = localStorage.getItem('userSettings')
    if (savedSettings) {
      setUserSettings({ ...defaultUserSettings, ...JSON.parse(savedSettings) })
    }
  }, [])

  // Guardar configuraciones cuando cambien
  const saveUserSettings = (newSettings) => {
    setUserSettings(newSettings)
    localStorage.setItem('userSettings', JSON.stringify(newSettings))
  }

  // Manejar toggle de notificaciones
  const handleNotificationToggle = (enabled) => {
    const newSettings = {
      ...userSettings,
      pushNotifications: enabled,
      notificationsEnabled: enabled
    }
    saveUserSettings(newSettings)
    
    // Mostrar feedback al usuario
    console.log(enabled ? 'Notificaciones activadas' : 'Notificaciones desactivadas')
  }

  // Manejar navegación
  const handleNavigation = (route) => {
    if (route) {
      navigate(route)
    }
  }

  // Manejar acciones especiales
  const handleAction = (actionType) => {
    if (menuActions[actionType]) {
      menuActions[actionType]()
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

  // Manejar búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="w-full bg-black text-white min-h-screen overflow-y-auto">
      {/* Header superior con navegación */}
      <div className="bg-black border-b border-white/5">
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

      {/* Contenido principal */}
      <div className="w-full px-5 py-6">
        {/* Logo To FIT con tipografía cursiva elegante */}
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold italic tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            To FIT
          </h1>
        </div>

        {/* Header del usuario */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover border border-white/10"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white text-lg font-semibold leading-tight">
              {user.name}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {user.handle}
            </p>
          </div>
        </div>

        {/* Barra de búsqueda con diseño específico */}
        <div className="mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={handleSearchChange}
              className="
                w-full h-11 pl-12 pr-4 
                bg-gray-800 border-0 rounded-lg
                text-white placeholder-gray-400 text-base
                focus:outline-none focus:ring-2 focus:ring-white/20
                transition-all duration-200
              "
            />
          </div>
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
  )
}

export default MenuView 