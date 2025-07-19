import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import HomeLayout from './components/layout/HomeLayout'
import ProtectedRoute from './components/common/ProtectedRoute'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

// Main Pages
import Home from './pages/Home'
import Tienda from './pages/Tienda'
import MiCuenta from './pages/MiCuenta'
import PerfilMarca from './pages/PerfilMarca'
import Servicios from './pages/Servicios'
import MiStatus from './pages/MiStatus'

function App() {
  return (
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
            <Route path="perfil-marca" element={<PerfilMarca />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="mi-status" element={<MiStatus />} />
          </Route>
          
          {/* Ruta de fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
