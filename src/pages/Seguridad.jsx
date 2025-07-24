import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Menu, Search, Save, Check } from 'lucide-react'
import ToggleSwitch from '../components/ui/ToggleSwitch'
import { useAuthStore } from '../store/authStore'
import { updateUserProfile, getUserProfile } from '../services/userProfileService'
import toast from 'react-hot-toast'

const Seguridad = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [securitySettings, setSecuritySettings] = useState({
    alertasInicioSesion: true,
    guardarDatosInicioSesion: true
  })

  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // ✅ Cargar configuración al inicio
  useEffect(() => {
    const loadSecuritySettings = async () => {
      if (!user) return
      
      const userId = user.id || user.uid || user.email
      
      try {
        const result = await getUserProfile(userId)
        if (result.success && result.data.securitySettings) {
          setSecuritySettings(result.data.securitySettings)
        }
      } catch (error) {
        console.error('Error loading security settings:', error)
      }
    }
    
    loadSecuritySettings()
  }, [user])

  const handleBack = () => {
    navigate(-1)
  }

  const handleToggle = (key) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    setHasChanges(true)
  }

  // ✅ Función para guardar configuración
  const handleSave = async () => {
    if (!user || !hasChanges) return
    
    const userId = user.id || user.uid || user.email
    setSaving(true)
    
    try {
      const updateData = {
        securitySettings: securitySettings
      }
      
      console.log('💾 Guardando configuración de seguridad:', updateData)
      
      const result = await updateUserProfile(userId, updateData)
      
      if (result.success) {
        toast.success('✅ Configuración de seguridad guardada!')
        setHasChanges(false)
        console.log('✅ Configuración de seguridad guardada exitosamente')
      } else {
        toast.error(`Error: ${result.error}`)
        console.error('❌ Error guardando configuración de seguridad:', result.error)
      }
    } catch (error) {
      toast.error(`Error inesperado: ${error.message}`)
      console.error('💥 Error inesperado:', error)
    } finally {
      setSaving(false)
    }
  }

  const securityOptions = [
    { key: 'alertasInicioSesion', label: 'Alertas de inicio de sesión' },
    { key: 'guardarDatosInicioSesion', label: 'Guardar datos de inicio de sesión' }
  ]

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
        <h1 className="text-2xl font-semibold text-white mb-8">Seguridad</h1>

        {/* Sección de Seguridad */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-6">Seguridad</h2>
          
          {/* Lista de Opciones de Seguridad */}
          <div className="space-y-0">
            {securityOptions.map((option, index) => (
              <div key={option.key}>
                <div className="flex items-center justify-between py-4">
                  <span className="text-white font-medium">{option.label}</span>
                  <ToggleSwitch
                    checked={securitySettings[option.key]}
                    onChange={() => handleToggle(option.key)}
                  />
                </div>
                
                {/* Línea divisoria */}
                {index < securityOptions.length - 1 && (
                  <div className="border-b border-gray-800"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Botón de Guardar */}
        <div className="sticky bottom-0 bg-black pt-6 pb-4">
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-3 ${
              hasChanges && !saving
                ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
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
                <span>Guardar Seguridad</span>
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

export default Seguridad 