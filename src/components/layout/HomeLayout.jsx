import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SidebarHome from './SidebarHome'
import HeaderTabs from '../home/HeaderTabs'

const HomeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('siguiendo')
  const location = useLocation()

  // Solo mostrar HeaderTabs en la página Home
  const showHeaderTabs = location.pathname === '/home'

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar móvil overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - MEJORADO RESPONSIVE */}
      <div className={`
        fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
        lg:static lg:inset-0 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-72 sm:w-80 lg:w-72 xl:w-80 2xl:w-[290px]
      `}>
        <SidebarHome onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Contenido principal - RESPONSIVE MEJORADO */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Header Tabs - Solo en Home - RESPONSIVE */}
        {showHeaderTabs && (
          <HeaderTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          />
        )}
        
        {/* Área de contenido principal - PADDING RESPONSIVO */}
        <main className="flex-1 bg-black relative overflow-hidden">
          <div className="h-full w-full">
            <Outlet context={{ activeTab, setActiveTab }} />
          </div>
        </main>
      </div>

      {/* Botón menú hamburguesa - RESPONSIVE MEJORADO */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40 lg:hidden 
                   p-2 sm:p-3 rounded-xl bg-black/80 backdrop-blur-sm 
                   border border-gray-800/50 hover:bg-black/90 
                   transition-all duration-200 hover:scale-105"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  )
}

export default HomeLayout 