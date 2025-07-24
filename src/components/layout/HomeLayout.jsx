import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarHome from './SidebarHome'

const HomeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar móvil overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
        lg:static lg:inset-0 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        flex-shrink-0
      `}
      style={{ width: '240px', minWidth: '240px', maxWidth: '240px' }}>
        <SidebarHome onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Área de contenido principal */}
        <main className="flex-1 bg-black relative overflow-hidden h-full">
          <div className="w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Botón menú hamburguesa */}
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