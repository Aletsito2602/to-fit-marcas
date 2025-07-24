import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Menu, Search, Save, Check } from 'lucide-react'
import ToggleSwitch from '../components/ui/ToggleSwitch'
import { useAuthStore } from '../store/authStore'
import { updateUserProfile, getUserProfile } from '../services/userProfileService'
import toast from 'react-hot-toast'

const CentroAsistencia = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [helpSettings, setHelpSettings] = useState({
    reportarProblema: true,
    servicioAyuda: true
  })

  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // ✅ Cargar configuración al inicio
  useEffect(() => {
    const loadHelpSettings = async () => {
      if (!user) return
      
      const userId = user.id || user.uid || user.email
      
      try {
        const result = await getUserProfile(userId)
        if (result.success && result.data.helpSettings) {
          setHelpSettings(result.data.helpSettings)
        }
      } catch (error) {
        console.error('Error loading help settings:', error)
      }
    }
    
    loadHelpSettings()
  }, [user])

  const handleBack = () => {
    navigate(-1)
  }

  const handleToggle = (key) => {
    setHelpSettings(prev => ({
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
        helpSettings: helpSettings
      }
      
      console.log('💾 Guardando configuración de asistencia:', updateData)
      
      const result = await updateUserProfile(userId, updateData)
      
      if (result.success) {
        toast.success('✅ Configuración de asistencia guardada!')
        setHasChanges(false)
        console.log('✅ Configuración de asistencia guardada exitosamente')
      } else {
        toast.error(`Error: ${result.error}`)
        console.error('❌ Error guardando configuración de asistencia:', result.error)
      }
    } catch (error) {
      toast.error(`Error inesperado: ${error.message}`)
      console.error('💥 Error inesperado:', error)
    } finally {
      setSaving(false)
    }
  }

  const helpOptions = [
    { key: 'reportarProblema', label: 'Reportar un problema' },
    { key: 'servicioAyuda', label: 'Servicio de ayuda' }
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
        <h1 className="text-2xl font-semibold text-white mb-8">Centro de Asistencia</h1>

        {/* Sección de Ayuda */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-6">Ayuda</h2>
          
          {/* Lista de Opciones de Ayuda */}
          <div className="space-y-0">
            {helpOptions.map((option, index) => (
              <div key={option.key}>
                <div className="flex items-center justify-between py-4">
                  <span className="text-white font-medium">{option.label}</span>
                  <ToggleSwitch
                    checked={helpSettings[option.key]}
                    onChange={() => handleToggle(option.key)}
                  />
                </div>
                
                {/* Línea divisoria */}
                {index < helpOptions.length - 1 && (
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
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
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
                <span>Guardar Configuración</span>
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

export default CentroAsistencia 