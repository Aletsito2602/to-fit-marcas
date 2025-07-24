import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Store, 
  User, 
  Building2, 
  Settings, 
  Activity,
  LogOut,
  X
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const Sidebar = ({ onClose }) => {
  const { logout, user } = useAuthStore()

  const navigationItems = [
    {
      name: 'Home',
      href: '/home',
      icon: Home,
    },
    {
      name: 'Tienda',
      href: '/tienda',
      icon: Store,
    },
    {
      name: 'Mi Cuenta',
      href: '/mi-cuenta',
      icon: User,
    },
    {
      name: 'Mi Perfil',
      href: '/mi-perfil',
      icon: User,
    },
    {
      name: 'Servicios',
      href: '/servicios',
      icon: Settings,
    },
    {
      name: 'Mi Status',
      href: '/mi-status',
      icon: Activity,
    },
  ]

  const handleLogout = () => {
    logout()
    onClose?.()
  }

  return (
    <div className="flex flex-col h-full bg-background-secondary border-r border-border-primary">
      {/* Header del sidebar */}
      <div className="flex items-center justify-between p-4 border-b border-border-primary">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-xl font-display font-semibold text-text-primary">
            ToFit
          </span>
        </div>
        
        {/* Botón cerrar en móvil */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-background-tertiary transition-colors"
        >
          <X className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link group ${isActive ? 'active' : ''}`
              }
            >
              <Icon className="w-5 h-5 mr-3 transition-colors group-hover:text-accent-primary" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Información del usuario y logout */}
      <div className="p-4 border-t border-border-primary">
        {/* Info del usuario */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {user?.name || 'Usuario'}
            </p>
            <p className="text-xs text-text-secondary truncate">
              {user?.email || 'user@tofit.com'}
            </p>
          </div>
        </div>

        {/* Botón logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-background-tertiary rounded-lg transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 mr-3 transition-colors group-hover:text-accent-primary" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar 