import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Menu, Search, Save, Check } from 'lucide-react'
import ToggleSwitch from '../components/ui/ToggleSwitch'
import { useAuthStore } from '../store/authStore'
import { updateUserProfile, getUserProfile } from '../services/userProfileService'
import toast from 'react-hot-toast'

const PrivacidadDatos = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  
  const [privacySettings, setPrivacySettings] = useState({
    cuentaPrivada: false
  })

  const [userInfo, setUserInfo] = useState({
    password: '',
    email: '',
    phone: '',
    address: ''
  })

  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // ✅ Cargar datos al inicio
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return
      
      const userId = user.id || user.uid || user.email
      
      try {
        const result = await getUserProfile(userId)
        if (result.success) {
          const data = result.data
          setPrivacySettings({
            cuentaPrivada: data.isPrivate || false
          })
          setUserInfo({
            password: '••••••••••••••••••••',
            email: data.email || user.email || '',
            phone: data.phone || '',
            address: data.address || ''
          })
        } else {
          // Usar datos del usuario autenticado como fallback
          setUserInfo({
            password: '••••••••••••••••••••',
            email: user.email || '',
            phone: '',
            address: ''
          })
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }
    
    loadUserData()
  }, [user])

  const handleBack = () => {
    navigate(-1)
  }

  const handlePrivacyToggle = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    setHasChanges(true)
  }

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }))
    setHasChanges(true)
  }

  // ✅ Función para guardar cambios
  const handleSave = async () => {
    if (!user || !hasChanges) return
    
    const userId = user.id || user.uid || user.email
    setSaving(true)
    
    try {
      const updateData = {
        isPrivate: privacySettings.cuentaPrivada,
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
        // Solo actualizar contraseña si no es la máscara
        ...(userInfo.password !== '••••••••••••••••••••' && { password: userInfo.password })
      }
      
      console.log('💾 Guardando configuración de privacidad:', updateData)
      
      const result = await updateUserProfile(userId, updateData)
      
      if (result.success) {
        toast.success('✅ Configuración guardada!')
        setHasChanges(false)
        console.log('✅ Configuración de privacidad guardada exitosamente')
      } else {
        toast.error(`Error: ${result.error}`)
        console.error('❌ Error guardando configuración:', result.error)
      }
    } catch (error) {
      toast.error(`Error inesperado: ${error.message}`)
      console.error('💥 Error inesperado:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="w-full max-w-md mx-auto px-4 py-6">
        
        {/* Título */}
        <h1 className="text-2xl font-semibold text-white mb-8">Privacidad y Datos</h1>

        {/* Sección Privacidad */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-white mb-6">Privacidad</h2>
          
          <div className="flex items-center justify-between py-4">
            <span className="text-white font-medium">Cuenta privada</span>
            <ToggleSwitch
              checked={privacySettings.cuentaPrivada}
              onChange={() => handlePrivacyToggle('cuentaPrivada')}
            />
          </div>
        </div>

        {/* Sección Contraseña */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-white mb-4">Contraseña</h2>
          
          <div className="mb-4">
            <label className="block text-white font-medium mb-2">Contraseña</label>
            <input
              type="password"
              value={userInfo.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-none outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contraseña"
            />
          </div>
        </div>

        {/* Sección Información de pago */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-white mb-4">Información de pago</h2>
          
          <div className="py-4">
            <span className="text-gray-400">Tarjetas de crédito o débito</span>
          </div>
        </div>

        {/* Sección Información de envíos */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-white mb-4">Información de envíos</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Correo electrónico</label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-none outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Correo electrónico"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Número de teléfono</label>
              <input
                type="tel"
                value={userInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-none outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Número de teléfono"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Dirección</label>
              <input
                type="text"
                value={userInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-none outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dirección"
              />
            </div>
          </div>
        </div>

        {/* ✅ Botón de Guardar */}
        <div className="sticky bottom-0 bg-black pt-6 pb-4">
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-3 ${
              hasChanges && !saving
                ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Guardando...</span>
              </>
            ) : hasChanges ? (
              <>
                <Save className="w-5 h-5" />
                <span>Guardar Cambios</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>Todo Guardado</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PrivacidadDatos 