import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Menu, Search, Save, Check } from 'lucide-react'
import ToggleSwitch from '../components/ui/ToggleSwitch'
import { useAuthStore } from '../store/authStore'
import { updateUserProfile, getUserProfile } from '../services/userProfileService'
import toast from 'react-hot-toast'

const Notificaciones = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const [notificationSettings, setNotificationSettings] = useState({
    pausarTodas: false,
    meGusta: true,
    comentarios: true,
    publicacionesSugeridas: true,
    meGustaHistorias: true,
    invitacionesEventos: true,
    respuestasInvitaciones: true,
    seguidores: true,
    compras: true,
    tiendasQueSigues: true
  })

  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // ✅ Cargar configuración al inicio
  useEffect(() => {
    const loadNotificationSettings = async () => {
      if (!user) return
      
      const userId = user.id || user.uid || user.email
      
      try {
        const result = await getUserProfile(userId)
        if (result.success && result.data.notificationSettings) {
          setNotificationSettings(result.data.notificationSettings)
        }
      } catch (error) {
        console.error('Error loading notification settings:', error)
      }
    }
    
    loadNotificationSettings()
  }, [user])

  const handleBack = () => {
    navigate(-1)
  }

  const handleToggle = (key) => {
    setNotificationSettings(prev => ({
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
        notificationSettings: notificationSettings
      }
      
      console.log('💾 Guardando configuración de notificaciones:', updateData)
      
      const result = await updateUserProfile(userId, updateData)
      
      if (result.success) {
        toast.success('✅ Notificaciones guardadas!')
        setHasChanges(false)
        console.log('✅ Configuración de notificaciones guardada exitosamente')
      } else {
        toast.error(`Error: ${result.error}`)
        console.error('❌ Error guardando notificaciones:', result.error)
      }
    } catch (error) {
      toast.error(`Error inesperado: ${error.message}`)
      console.error('💥 Error inesperado:', error)
    } finally {
      setSaving(false)
    }
  }

  const notificationOptions = [
    { key: 'pausarTodas', label: 'Pausar todas' },
    { key: 'meGusta', label: 'Me gusta' },
    { key: 'comentarios', label: 'Comentarios' },
    { key: 'publicacionesSugeridas', label: 'Publicaciones sugeridas' },
    { key: 'meGustaHistorias', label: 'Me gusta de historias' },
    { key: 'invitacionesEventos', label: 'Invitaciones a eventos' },
    { key: 'respuestasInvitaciones', label: 'Respuestas de invitaciones' },
    { key: 'seguidores', label: 'Seguidores' },
    { key: 'compras', label: 'Compras' },
    { key: 'tiendasQueSigues', label: 'Tiendas que sigues' }
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
        <h1 className="text-2xl font-semibold text-white mb-8">Notificaciones</h1>

        {/* Sección de Notificaciones Push */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-6">Notificaciones push</h2>
          
          {/* Lista de Opciones de Notificación */}
          <div className="space-y-0">
            {notificationOptions.map((option, index) => (
              <div key={option.key}>
                <div className="flex items-center justify-between py-4">
                  <span className="text-white font-medium">{option.label}</span>
                  <ToggleSwitch
                    checked={notificationSettings[option.key]}
                    onChange={() => handleToggle(option.key)}
                  />
                </div>
                
                {/* Línea divisoria */}
                {index < notificationOptions.length - 1 && (
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
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
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
                <span>Guardar Notificaciones</span>
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

export default Notificaciones 