import { useState } from 'react'
import { 
  Menu, 
  Search, 
  Bell, 
  Settings,
  User
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const Header = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const { user } = useAuthStore()

  const handleSearch = (e) => {
    e.preventDefault()
    // Aquí iría la lógica de búsqueda
    console.log('Buscar:', searchQuery)
  }

  return (
    <header className="bg-background-secondary border-b border-border-primary shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Lado izquierdo - Menú hamburguesa + Búsqueda */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Botón menú hamburguesa (solo móvil) */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-background-tertiary transition-colors"
          >
            <Menu className="w-6 h-6 text-text-secondary" />
          </button>

          {/* Barra de búsqueda */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Buscar productos, marcas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base pl-10 pr-4 w-full"
              />
            </div>
          </form>
        </div>

        {/* Lado derecho - Notificaciones + Avatar */}
        <div className="flex items-center space-x-3">
          {/* Notificaciones */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-background-tertiary transition-colors relative"
            >
              <Bell className="w-5 h-5 text-text-secondary" />
              {/* Badge de notificaciones */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-primary text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Dropdown de notificaciones */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-background-secondary border border-border-primary rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border-primary">
                  <h3 className="text-sm font-semibold text-text-primary">
                    Notificaciones
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {/* Notificaciones de ejemplo */}
                  <div className="p-3 hover:bg-background-tertiary transition-colors">
                    <p className="text-sm text-text-primary">
                      Nuevo producto añadido a tu lista de deseos
                    </p>
                    <p className="text-xs text-text-muted mt-1">Hace 2 horas</p>
                  </div>
                  <div className="p-3 hover:bg-background-tertiary transition-colors">
                    <p className="text-sm text-text-primary">
                      Tu pedido #1234 ha sido enviado
                    </p>
                    <p className="text-xs text-text-muted mt-1">Hace 1 día</p>
                  </div>
                  <div className="p-3 hover:bg-background-tertiary transition-colors">
                    <p className="text-sm text-text-primary">
                      Oferta especial: 20% de descuento
                    </p>
                    <p className="text-xs text-text-muted mt-1">Hace 3 días</p>
                  </div>
                </div>
                <div className="p-3 border-t border-border-primary">
                  <button className="text-sm text-accent-primary hover:text-accent-secondary transition-colors">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Configuración */}
          <button className="p-2 rounded-lg hover:bg-background-tertiary transition-colors">
            <Settings className="w-5 h-5 text-text-secondary" />
          </button>

          {/* Avatar del usuario */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-text-primary">
                {user?.name || 'Usuario'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cerrar dropdown al hacer clic fuera */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </header>
  )
}

export default Header 