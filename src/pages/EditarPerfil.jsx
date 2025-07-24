import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Menu, Search, Check, Copy, Edit2, Activity, Heart, MessageCircle, Bookmark, Image } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { updateUserProfile, getUserProfile } from '../services/userProfileService'
import { getUserActivityStats, updateUserActivityMetrics } from '../services/userActivityService'
import toast from 'react-hot-toast'

const EditarPerfil = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [linkCopied, setLinkCopied] = useState(false)
  const [isEditing, setIsEditing] = useState({})
  const [editValues, setEditValues] = useState({})
  const [saving, setSaving] = useState(false)

  // ✅ Estado local para datos del perfil con actualizaciones inmediatas
  const [localProfileData, setLocalProfileData] = useState({})
  const [activityStats, setActivityStats] = useState(null)
  const [loadingStats, setLoadingStats] = useState(true)
  
  // ✅ Datos dinámicos del perfil desde el usuario autenticado
  const profileData = {
    name: localProfileData.name || user?.name || user?.displayName || "Usuario ToFit",
    username: localProfileData.username || (user?.email ? `@${user.email.split('@')[0]}` : "@usuario"),
    description: localProfileData.description || "¡Nuevo en ToFit! 🌟 Descubriendo mi estilo personal",
    location: localProfileData.location || "Argentina",
    links: localProfileData.links || "Enlace",
    avatar: localProfileData.avatar || user?.photoURL || user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face",
    profileUrl: `https://tofit.app/${user?.email?.split('@')[0] || 'usuario'}`
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileData.profileUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error('Error copying link:', err)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // ✅ CARGAR ESTADÍSTICAS DE ACTIVIDAD
  useEffect(() => {
    const loadActivityStats = async () => {
      if (!user) return

      const userId = user.id || user.uid || user.email
      setLoadingStats(true)

      try {
        // Actualizar métricas primero
        await updateUserActivityMetrics(userId)
        
        // Obtener estadísticas actualizadas
        const statsResult = await getUserActivityStats(userId)
        if (statsResult.success) {
          setActivityStats(statsResult.data)
        }
      } catch (error) {
        console.error('Error loading activity stats:', error)
      } finally {
        setLoadingStats(false)
      }
    }

    loadActivityStats()
  }, [user])

  const handleConfiguration = () => {
    navigate('/configuracion')
  }

  const handleAffiliate = () => {
    navigate('/afiliado')
  }

  const handleAvatarClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        // Validar tamaño del archivo (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error('La imagen debe ser menor a 5MB')
          return
        }

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
          toast.error('Solo se permiten archivos de imagen')
          return
        }

        setSaving(true)
        toast.loading('📸 Subiendo foto de perfil...', { id: 'avatar-upload' })

        try {
          // Convertir a base64 para mostrar preview inmediato
          const reader = new FileReader()
          reader.onload = async (e) => {
            const base64Image = e.target.result
            
            // Actualizar preview inmediatamente
            setLocalProfileData(prev => ({
              ...prev,
              avatar: base64Image
            }))

            // Simular upload (en producción aquí iría la subida a storage)
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // Guardar en Firebase (en producción guardarías la URL del storage)
            const userId = user?.id || user?.uid || user?.email
            const result = await updateUserProfile(userId, {
              avatar: base64Image // En producción sería la URL del storage
            })

            if (result.success) {
              toast.success('✅ Foto de perfil actualizada!', { id: 'avatar-upload' })
              
              // Actualizar el store del usuario
              const { updateUser } = useAuthStore.getState()
              await updateUser({ photoURL: base64Image })
            } else {
              toast.error('Error al actualizar la foto', { id: 'avatar-upload' })
              // Revertir preview en caso de error
              setLocalProfileData(prev => ({
                ...prev,
                avatar: user?.photoURL || user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face"
              }))
            }
          }
          reader.readAsDataURL(file)
        } catch (error) {
          console.error('Error uploading avatar:', error)
          toast.error('Error al subir la imagen', { id: 'avatar-upload' })
        } finally {
          setSaving(false)
        }
      }
    }
    input.click()
  }

  // ✅ Cargar datos del perfil al inicio
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) return
      
      const userId = user.id || user.uid || user.email
      console.log('🔍 Cargando datos del perfil para:', userId)
      
      try {
        const result = await getUserProfile(userId)
        if (result.success) {
          console.log('📥 Datos cargados desde Firebase:', result.data)
          setLocalProfileData(result.data)
        } else {
          console.log('ℹ️ No hay datos del perfil en Firebase, usando datos por defecto')
        }
      } catch (error) {
        console.error('❌ Error cargando perfil:', error)
      }
    }
    
    loadProfileData()
  }, [user])

  // ✅ Nuevas funciones para edición dinámica
  const startEditing = (field) => {
    setIsEditing({ ...isEditing, [field]: true })
    setEditValues({ ...editValues, [field]: profileData[field] })
  }

  const cancelEditing = (field) => {
    setIsEditing({ ...isEditing, [field]: false })
    setEditValues({ ...editValues, [field]: profileData[field] })
  }

  const saveField = async (field) => {
    const userId = user?.id || user?.uid || user?.email
    
    if (!userId) {
      toast.error('Error: Usuario no identificado')
      return
    }
    
    console.log('💾 Guardando campo:', field, 'para usuario:', userId)
    console.log('📝 Valor:', editValues[field])
    
    setSaving(true)
    try {
      const updateData = { [field]: editValues[field] }
      
      // ✅ Actualizar en Firebase usando userProfileService
      console.log('🔥 Actualizando en Firebase...')
      const result = await updateUserProfile(userId, updateData)
      
      if (result.success) {
        console.log('✅ Firebase actualizado exitosamente')
        
        // ✅ Actualizar inmediatamente los datos locales para UI instantánea
        setLocalProfileData(prev => ({
          ...prev,
          [field]: editValues[field]
        }))
        
        // ✅ Actualizar el store del usuario
        const { updateUser } = useAuthStore.getState()
        console.log('🔄 Actualizando store local...')
        await updateUser(updateData)
        
        setIsEditing({ ...isEditing, [field]: false })
        toast.success(`✅ ${field} actualizado!`)
        
        console.log('🎉 Guardado completo!')
      } else {
        console.error('❌ Error en Firebase:', result.error)
        toast.error(`Error al guardar ${field}: ${result.error}`)
      }
    } catch (error) {
      console.error('💥 Error inesperado:', error)
      toast.error(`Error inesperado: ${error.message}`)
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
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Avatar y Información Principal */}
        <div className="text-center mb-8">
          <div 
            className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-700 relative group cursor-pointer"
            onClick={handleAvatarClick}
          >
            <img 
              src={profileData.avatar} 
              alt={profileData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Edit2 className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-xl font-semibold text-white">{profileData.name}</h1>
              {user?.emailVerified && <Check className="w-5 h-5 text-blue-500" />}
            </div>
            
            <p className="text-gray-400 text-base">{profileData.username}</p>
            
            {/* Debug Info - Remover en producción */}
            <div className="text-xs text-gray-600 mt-2">
              ID: {user?.id || user?.uid || user?.email || 'No disponible'}
              {saving && ' | Guardando...'}
              <button 
                onClick={() => {
                  console.log('👤 USUARIO COMPLETO:', user)
                  console.log('🏠 DATOS LOCALES:', localProfileData)
                  toast.success('📝 Revisa la consola para ver los datos')
                }}
                className="ml-2 text-blue-400 hover:text-blue-300"
              >
                [Debug]
              </button>
            </div>
          </div>
        </div>

        {/* Secciones de Información Editables */}
        <div className="space-y-6 max-w-2xl mx-auto">
          
          {/* Nombre */}
          <div className="border-b border-gray-800 pb-6 hover:bg-gray-900/20 transition-colors duration-200 rounded-lg px-2 py-2">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Nombre</span>
                             {isEditing.name ? (
                <div className="flex items-center space-x-2 flex-1 ml-4">
                  <input
                    type="text"
                    value={editValues.name || ''}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    className="bg-gray-700 text-white px-3 py-2 rounded text-sm flex-1 min-w-[200px]"
                    placeholder="Tu nombre completo"
                    autoFocus
                  />
                  <button 
                    onClick={() => saveField('name')}
                    disabled={saving}
                    className="text-green-500 hover:text-green-400"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => cancelEditing('name')}
                    className="text-gray-500 hover:text-gray-400"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">{profileData.name}</span>
                  <button 
                    onClick={() => startEditing('name')}
                    className="text-gray-500 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* User */}
          <div className="border-b border-gray-800 pb-6 hover:bg-gray-900/20 transition-colors duration-200 rounded-lg px-2 py-2">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">User</span>
              {isEditing.username ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={editValues.username || ''}
                    onChange={(e) => setEditValues({ ...editValues, username: e.target.value })}
                    className="bg-gray-700 text-white px-3 py-2 rounded text-sm min-w-[200px]"
                    placeholder="@usuario"
                    autoFocus
                  />
                  <button 
                    onClick={() => saveField('username')}
                    disabled={saving}
                    className="text-green-500 hover:text-green-400"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => cancelEditing('username')}
                    className="text-gray-500 hover:text-gray-400"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">{profileData.username}</span>
                  <button 
                    onClick={() => startEditing('username')}
                    className="text-gray-500 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div className="border-b border-gray-800 pb-6 hover:bg-gray-900/20 transition-colors duration-200 rounded-lg px-2 py-2">
            <div className="flex justify-between items-start">
              <span className="text-white font-medium">Descripción</span>
              {isEditing.description ? (
                                 <div className="text-right flex-1 ml-4">
                  <textarea
                    value={editValues.description || ''}
                    onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm resize-none"
                    rows={4}
                    placeholder="Cuéntanos sobre ti..."
                    autoFocus
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button 
                      onClick={() => saveField('description')}
                      disabled={saving}
                      className="text-green-500 hover:text-green-400"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => cancelEditing('description')}
                      className="text-gray-500 hover:text-gray-400"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-right flex-1 ml-4">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {profileData.description}
                  </p>
                  <button 
                    onClick={() => startEditing('description')}
                    className="text-gray-500 hover:text-white mt-1"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Ubicación */}
          <div className="border-b border-gray-800 pb-6 hover:bg-gray-900/20 transition-colors duration-200 rounded-lg px-2 py-2">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Ubicación</span>
                             {isEditing.location ? (
                <div className="flex items-center space-x-2 flex-1 ml-4">
                  <input
                    type="text"
                    value={editValues.location || ''}
                    onChange={(e) => setEditValues({ ...editValues, location: e.target.value })}
                    className="bg-gray-700 text-white px-3 py-2 rounded text-sm flex-1 min-w-[200px]"
                    placeholder="Ciudad, País"
                    autoFocus
                  />
                  <button 
                    onClick={() => saveField('location')}
                    disabled={saving}
                    className="text-green-500 hover:text-green-400"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => cancelEditing('location')}
                    className="text-gray-500 hover:text-gray-400"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">{profileData.location}</span>
                  <button 
                    onClick={() => startEditing('location')}
                    className="text-gray-500 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Enlaces */}
          <div className="border-b border-gray-800 pb-6 hover:bg-gray-900/20 transition-colors duration-200 rounded-lg px-2 py-2">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">Enlaces</span>
              {isEditing.links ? (
                <div className="flex items-center space-x-2 flex-1 ml-4">
                  <input
                    type="text"
                    value={editValues.links || ''}
                    onChange={(e) => setEditValues({ ...editValues, links: e.target.value })}
                    className="bg-gray-700 text-white px-3 py-2 rounded text-sm flex-1 min-w-[200px]"
                    placeholder="https://..."
                    autoFocus
                  />
                  <button 
                    onClick={() => saveField('links')}
                    disabled={saving}
                    className="text-green-500 hover:text-green-400"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => cancelEditing('links')}
                    className="text-gray-500 hover:text-gray-400"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">{profileData.links}</span>
                  <button 
                    onClick={() => startEditing('links')}
                    className="text-gray-500 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Botón Copiar Link */}
          <div className="py-6">
            <button
              onClick={handleCopyLink}
              className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              {linkCopied ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span>¡Enlace copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>

          {/* ✅ ESTADÍSTICAS DE ACTIVIDAD */}
          <div className="border-b border-gray-800 pb-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium text-lg">Actividad</span>
            </div>
            
            {loadingStats ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            ) : activityStats ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <Heart className="w-5 h-5 text-red-500 mx-auto mb-2" />
                    <p className="text-xl font-bold text-white">{activityStats.likesGiven}</p>
                    <p className="text-xs text-gray-400">Likes Dados</p>
                  </div>
                  
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <MessageCircle className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                    <p className="text-xl font-bold text-white">{activityStats.commentsWritten}</p>
                    <p className="text-xs text-gray-400">Comentarios</p>
                  </div>
                  
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <Bookmark className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                    <p className="text-xl font-bold text-white">{activityStats.postsSaved}</p>
                    <p className="text-xs text-gray-400">Guardados</p>
                  </div>
                  
                  <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                    <Image className="w-5 h-5 text-green-500 mx-auto mb-2" />
                    <p className="text-xl font-bold text-white">{activityStats.postsCreated}</p>
                    <p className="text-xs text-gray-400">Posts</p>
                  </div>
                </div>
                
                <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Actividad Total:</span>
                    <span className="font-semibold text-white">{activityStats.totalActivity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-300">Engagement Recibido:</span>
                    <span className="font-semibold text-white">{activityStats.engagementReceived}</span>
                  </div>
                  {activityStats.postsCreated > 0 && (
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-300">Promedio likes/post:</span>
                      <span className="font-semibold text-white">{activityStats.averageLikesPerPost}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">No se pudieron cargar las estadísticas</p>
            )}
          </div>

          {/* Configuración */}
          <div className="border-b border-gray-800 pb-4">
            <button 
              onClick={handleConfiguration}
              className="w-full text-left hover:bg-gray-800/30 transition-colors duration-200 rounded-lg px-2 py-1"
            >
              <div className="flex justify-between items-center py-3">
                <span className="text-white font-medium text-lg">Configuración</span>
                <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </button>
          </div>

          {/* Cerrar Sesión */}
          <div className="border-b border-gray-800 pb-4">
            <button 
              onClick={handleLogout}
              className="w-full text-left hover:bg-red-900/20 transition-colors duration-200 rounded-lg px-2 py-1"
            >
              <div className="flex justify-between items-center py-3">
                <span className="text-red-400 font-medium text-lg">Cerrar Sesión</span>
              </div>
            </button>
          </div>

          {/* Convertite en Afiliado */}
          <div className="py-6">
            <button 
              onClick={handleAffiliate}
              className="w-full text-left hover:bg-blue-900/20 transition-colors duration-200 rounded-lg px-2 py-1"
            >
              <div className="py-3">
                <span className="text-blue-400 font-medium text-lg">🎉 Convertite en Afiliado</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditarPerfil 