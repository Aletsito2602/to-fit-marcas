import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './providers/AuthProvider'
import ProtectedRoute from './components/common/ProtectedRoute'
import HomeLayout from './components/layout/HomeLayout'

// Páginas de autenticación
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

// Páginas principales
import Home from './pages/Home'
import Tienda from './pages/Tienda'
import MiCuenta from './pages/MiCuenta'
import PerfilMarca from './pages/PerfilMarca'
import Servicios from './pages/Servicios'
import MiStatus from './pages/MiStatus'
import MenuView from './pages/MenuView'
import Purchases from './pages/Purchases'
import Favorites from './pages/Favorites'

// Páginas de configuración del perfil
import EditarPerfil from './pages/EditarPerfil'
import Configuracion from './pages/Configuracion'
import Notificaciones from './pages/Notificaciones'
import PrivacidadDatos from './pages/PrivacidadDatos'
import Seguridad from './pages/Seguridad'
import CentroAsistencia from './pages/CentroAsistencia'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background-primary">
        <Routes>
          {/* Rutas públicas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Todas las rutas protegidas usan HomeLayout con SidebarHome */}
          <Route path="/" element={
            <ProtectedRoute>
              <HomeLayout />
            </ProtectedRoute>
          }>
            {/* Redirigir / a /home */}
            <Route index element={<Navigate to="/home" replace />} />
            
            {/* Páginas principales con HomeLayout y SidebarHome */}
            <Route path="home" element={<Home />} />
            <Route path="tienda" element={<Tienda />} />
            <Route path="mi-cuenta" element={<MiCuenta />} />
            <Route path="mi-perfil" element={<PerfilMarca />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="mi-status" element={<MiStatus />} />
            <Route path="menu" element={<MenuView />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="favorites" element={<Favorites />} />
            
            {/* Páginas de configuración del perfil */}
            <Route path="editar-perfil" element={<EditarPerfil />} />
            <Route path="configuracion" element={<Configuracion />} />
            <Route path="notificaciones" element={<Notificaciones />} />
            <Route path="privacidad-datos" element={<PrivacidadDatos />} />
            <Route path="seguridad" element={<Seguridad />} />
            <Route path="centro-asistencia" element={<CentroAsistencia />} />
            <Route path="politica-privacidad" element={<PoliticaPrivacidad />} />
          </Route>
          
          {/* Ruta de fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        </div>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  )
}

export default App
