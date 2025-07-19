import { NavLink } from 'react-router-dom'
import { 
  Home, 
  Store, 
  Star, 
  Menu as MenuIcon,
  Search,
  Bell,
  User,
  X
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const SidebarHome = ({ onClose }) => {
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
      name: 'Servicios',
      href: '/servicios',
      icon: Star,
    },
    {
      name: 'Menú',
      href: '/menu',
      icon: MenuIcon,
    },
    {
      name: 'Mi Status',
      href: '/mi-status',
      icon: Star,
    },
  ]

  return (
    <div className="flex flex-col h-full border-2 bg-black shadow-2xl border-white" 
         style={{ 
           width: '290px',
           borderTopRightRadius: '54px',
           borderBottomRightRadius: '54px',
           borderTopLeftRadius: '0px',
           borderBottomLeftRadius: '0px',
           fontFamily: 'Poppins, sans-serif'
         }}>
      
      {/* Logo Section */}
      <div className="pt-16 pb-12 px-6 flex justify-center">
        <div className="flex items-center">
          <svg width="115" height="58" viewBox="0 0 115 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.912 42.2C5.632 42.2 4.576 42.024 3.744 41.672C2.912 41.32 2.224 40.856 1.68 40.28C1.008 39.416 0.672 38.392 0.672 37.208C0.672 35.96 1.008 34.68 1.68 33.368C2.384 32.024 3.328 30.808 4.512 29.72C6.016 28.312 7.744 27.176 9.696 26.312C11.648 25.448 13.76 25.016 16.032 25.016C16.736 25.016 17.472 25.064 18.24 25.16C18.624 25.256 18.816 25.336 18.816 25.4C18.816 25.496 18.672 25.544 18.384 25.544C18.16 25.544 17.92 25.528 17.664 25.496C17.44 25.464 17.2 25.448 16.944 25.448C15.632 25.448 14.288 25.704 12.912 26.216C11.568 26.696 10.288 27.352 9.072 28.184C7.856 29.016 6.784 29.912 5.856 30.872C5.152 31.64 4.464 32.568 3.792 33.656C3.152 34.744 2.72 35.928 2.496 37.208C2.464 37.336 2.448 37.464 2.448 37.592C2.448 37.72 2.448 37.848 2.448 37.976C2.448 38.936 2.752 39.752 3.36 40.424C3.968 41.064 4.96 41.384 6.336 41.384C7.744 41.384 9.056 41.032 10.272 40.328C11.52 39.592 12.688 38.696 13.776 37.64C14.864 36.552 15.872 35.48 16.8 34.424C17.984 33.08 19.296 31.352 20.736 29.24C22.176 27.128 23.68 25.032 25.248 22.952C26.304 21.544 27.456 20.168 28.704 18.824C29.984 17.448 31.136 16.408 32.16 15.704C30.784 15.544 29.408 15.368 28.032 15.176C26.656 14.984 25.232 14.872 23.76 14.84C23.472 14.84 23.184 14.84 22.896 14.84C22.608 14.808 22.336 14.792 22.08 14.792C19.936 14.792 17.904 15.032 15.984 15.512C14.096 15.992 12.64 16.92 11.616 18.296C11.328 18.68 11.12 19.064 10.992 19.448C10.864 19.832 10.8 20.2 10.8 20.552C10.8 21 10.912 21.416 11.136 21.8C11.264 21.928 11.408 22.072 11.568 22.232C11.728 22.36 11.872 22.424 12 22.424C11.872 22.552 11.696 22.616 11.472 22.616C11.248 22.616 11.024 22.568 10.8 22.472C10.608 22.344 10.448 22.216 10.32 22.088C10 21.736 9.76 21.336 9.6 20.888C9.44 20.408 9.36 19.944 9.36 19.496C9.36 18.6 9.584 17.848 10.032 17.24C11.76 14.872 14.672 13.688 18.768 13.688C19.024 13.688 19.28 13.688 19.536 13.688C19.824 13.688 20.096 13.704 20.352 13.736C22.72 13.864 25.056 14.104 27.36 14.456C29.696 14.808 32.144 14.984 34.704 14.984C36.112 14.984 37.376 14.92 38.496 14.792C39.648 14.632 40.416 14.36 40.8 13.976H40.896C41.024 13.976 41.136 14.024 41.232 14.12C41.36 14.184 41.424 14.312 41.424 14.504C41.424 15.048 41.12 15.464 40.512 15.752C39.904 16.008 39.28 16.152 38.64 16.184C37.648 16.184 36.672 16.152 35.712 16.088C34.752 16.024 33.808 15.928 32.88 15.8C32.08 16.312 31.088 17.208 29.904 18.488C28.752 19.768 27.632 21.352 26.544 23.24C25.296 25.384 24 27.576 22.656 29.816C21.344 32.056 19.92 34.104 18.384 35.96C16.88 37.816 15.184 39.32 13.296 40.472C11.44 41.624 9.312 42.2 6.912 42.2ZM26.622 41.24C25.694 41.24 25.038 41.016 24.654 40.568C24.238 40.088 24.03 39.496 24.03 38.792C24.03 37.896 24.286 36.84 24.798 35.624C25.342 34.408 26.062 33.176 26.958 31.928C27.854 30.68 28.862 29.528 29.982 28.472C31.102 27.384 32.238 26.52 33.39 25.88C34.574 25.208 35.71 24.872 36.798 24.872C37.598 24.872 38.174 25.08 38.526 25.496C38.878 25.912 39.054 26.456 39.054 27.128C39.054 28.024 38.798 29.096 38.286 30.344C37.774 31.56 37.07 32.808 36.174 34.088C35.31 35.336 34.334 36.504 33.246 37.592C32.19 38.68 31.086 39.56 29.934 40.232C28.782 40.904 27.678 41.24 26.622 41.24ZM27.198 40.328C27.87 40.328 28.67 39.992 29.598 39.32C30.558 38.616 31.534 37.72 32.526 36.632C33.518 35.544 34.43 34.392 35.262 33.176C36.126 31.928 36.814 30.76 37.326 29.672C37.87 28.552 38.142 27.64 38.142 26.936C38.142 26.168 37.774 25.784 37.038 25.784C36.43 25.784 35.662 26.152 34.734 26.888C33.838 27.592 32.894 28.504 31.902 29.624C30.942 30.744 30.03 31.928 29.166 33.176C28.302 34.424 27.598 35.608 27.054 36.728C26.542 37.848 26.286 38.728 26.286 39.368C26.286 40.008 26.59 40.328 27.198 40.328Z" fill="white"/>
            <path d="M63.2812 41.5H49.875V40.2812H53.625V14.5938H49.875V13.375H71.4844L71.7188 21.8125H70.7812L70.125 19.6094C70.0938 19.4844 70.0469 19.3281 69.9844 19.1406C69.0156 16.1094 67.4062 14.5938 65.1562 14.5938H57.6562V26.3125H67.3125V27.6719H57.6562V40.2812H63.2812V41.5ZM85.5469 41.5H74.0625V40.2812H77.8125V14.5938H74.0625V13.375H85.5469V14.5938H81.8438V40.2812H84.3281C84.4844 40.2812 84.6406 40.2969 84.7969 40.3281C85.2969 40.4219 85.5469 40.8125 85.5469 41.5ZM107.203 41.5H94.3125V40.2812H98.7656V14.5938H96.2344C93.8281 14.7812 92.125 16.4062 91.125 19.4688L90.375 22.6094H89.0625L89.2969 13.375H112.453L112.688 22.6094H111.375L110.625 19.4688C110.594 19.4062 110.578 19.3125 110.578 19.1875C109.734 16.125 108.047 14.5938 105.516 14.5938H102.797V40.2812H105.984C106.141 40.2812 106.297 40.2969 106.453 40.3281C106.953 40.4219 107.203 40.8125 107.203 41.5Z" fill="white"/>
          </svg>
        </div>
      </div>
      
      {/* Barra de búsqueda */}
      <div className="px-8 mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-900/40 border border-gray-800/50 rounded-full pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600/50 focus:bg-gray-900/60 transition-all duration-200 text-sm"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}
          />
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="flex-1 px-6 flex flex-col justify-center">
        <div className="space-y-4">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-6 py-5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-gray-800/40 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-900/30'
                  }`
                }
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Icon className="w-6 h-6 mr-6 flex-shrink-0" />
                <span className="font-medium text-lg">{item.name}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>

      {/* Footer - Íconos inferiores */}
      <div className="px-8 pb-10">
        <div className="flex items-center justify-center space-x-10">
          {/* Icono de notificaciones */}
          <button className="w-14 h-14 bg-gray-800/30 hover:bg-gray-700/40 rounded-full flex items-center justify-center transition-all duration-200 group">
            <Bell className="w-6 h-6 text-gray-400 group-hover:text-white" />
          </button>
          
          {/* Icono de perfil */}
          <NavLink 
            to="/perfil-marca"
            onClick={onClose}
            className="w-14 h-14 bg-gray-800/30 hover:bg-gray-700/40 rounded-full flex items-center justify-center transition-all duration-200 group overflow-hidden"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </NavLink>
        </div>
      </div>

      {/* Botón cerrar en móvil */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
      >
        <X className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  )
}

export default SidebarHome 