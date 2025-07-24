import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import { Edit3, ChevronDown, Heart, MessageCircle, Share, Camera, Plus } from 'lucide-react'
import PostModal from '../components/ui/PostModal'
import CreatePostModal from '../components/ui/CreatePostModal'
import { useAuthStore } from '../store/authStore'
import { 
  getMockUserProfile, 
  getMockUserPosts, 
  getUserProfile, 
  getUserStats, 
  getUserPosts,
  toggleFollowUser,
  isFollowingUser,
  updateUserProfile
} from '../services/userProfileService'
import { likePost, unlikePost, savePost, unsavePost } from '../services/postsService'
import toast from 'react-hot-toast'

const PerfilMarca = () => {
  const navigate = useNavigate()
  const { user: currentUser } = useAuthStore()
  
  // Estados del componente
  const [activeTab, setActiveTab] = useState('publicaciones')
  const [hoveredPost, setHoveredPost] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [postModalOpen, setPostModalOpen] = useState(false)
  
  // Estados dinámicos para Firebase
  const [userProfile, setUserProfile] = useState(null)
  const [userStats, setUserStats] = useState({ posts: 0, followers: 0, following: 0 })
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false)

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const tabs = [
    { id: 'publicaciones', label: 'Publicaciones', active: true },
    { id: 'capsulas', label: 'Cápsulas', hasDropdown: true },
    { id: 'calendario', label: 'Calendario' }
  ]

  // ✅ CARGA COMPLETA DESDE FIREBASE - 100% DINÁMICO
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) return

      try {
        setLoading(true)
        
        const userId = currentUser.id || currentUser.uid || currentUser.email
        
        // ✅ INTENTAR CARGAR PERFIL REAL DESDE FIREBASE PRIMERO
        const existingProfileResult = await getUserProfile(userId)
        
        let profileData;
        
        if (existingProfileResult.success && existingProfileResult.data) {
          // ✅ USAR DATOS REALES DE FIREBASE SI EXISTEN
          const firebaseProfile = existingProfileResult.data
          profileData = {
            id: userId,
            name: firebaseProfile.name || currentUser.name || currentUser.displayName || "Usuario ToFit",
            username: firebaseProfile.username || (currentUser.email ? `@${currentUser.email.split('@')[0]}` : "@usuario"),
            bio: firebaseProfile.bio || "¡Nuevo en ToFit! 🌟 Descubriendo mi estilo personal",
            location: firebaseProfile.location || "Argentina",
            website: firebaseProfile.website || "tofit.com",
            avatar: firebaseProfile.avatar || currentUser.photoURL || currentUser.avatar || "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face",
            banner: firebaseProfile.banner || "https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop",
            verified: firebaseProfile.verified || false,
            isPrivate: firebaseProfile.isPrivate || false,
            createdAt: firebaseProfile.createdAt || new Date(),
            email: currentUser.email
          }
        } else {
          // ✅ CREAR PERFIL INICIAL Y GUARDARLO EN FIREBASE
          profileData = {
            id: userId,
            name: currentUser.name || currentUser.displayName || "Usuario ToFit",
            username: currentUser.email ? `@${currentUser.email.split('@')[0]}` : "@usuario",
            bio: "¡Nuevo en ToFit! 🌟 Descubriendo mi estilo personal",
            location: "Argentina",
            website: "tofit.com",
            avatar: currentUser.photoURL || currentUser.avatar || "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face",
            banner: "https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop",
            verified: false,
            isPrivate: false,
            createdAt: new Date(),
            email: currentUser.email
          }
          
          // ✅ GUARDAR PERFIL INICIAL EN FIREBASE
          await updateUserProfile(userId, profileData)
        }
        
        // ✅ OBTENER ESTADÍSTICAS REALES DE FIREBASE
        const statsResult = await getUserStats(userId)
        const realStats = statsResult.success ? statsResult.data : { posts: 0, followers: 0, following: 0 }
        
        setUserProfile(profileData)
        setUserStats(realStats)
        setIsOwnProfile(true) // Siempre es el propio perfil en esta página
        
        // ✅ CONFIGURAR LISTENER EN TIEMPO REAL PARA POSTS DE FIREBASE - 100% DINÁMICO
        const unsubscribe = getUserPosts(userId, (firebasePosts) => {
          // ✅ SOLO POSTS REALES DE FIREBASE - NO MÁS DATOS MOCK
          setUserPosts(firebasePosts) // Si está vacío, simplemente estará vacío
        })
        
        // Cleanup function
        return () => {
          if (unsubscribe) unsubscribe()
        }
        
      } catch (error) {
        console.error('Error loading user data:', error)
        toast.error('Error cargando datos del perfil')
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [currentUser])

  // Funciones de manejo de eventos
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    if (tabId === 'capsulas') {
      setShowDropdown(!showDropdown)
    } else {
      setShowDropdown(false)
    }
  }

  const handlePostClick = (post) => {
    setSelectedPost(post)
    setPostModalOpen(true)
  }

  const closePostModal = () => {
    setPostModalOpen(false)
    setTimeout(() => setSelectedPost(null), 300)
  }

  const handleEditProfile = () => {
    navigate('/editar-perfil')
  }

  const handleStatClick = (stat) => {
    console.log(`Ver ${stat}`)
    // TODO: Implementar navegación a listas de seguidores/seguidos
  }

  // Función para manejar likes en posts
  const handlePostLike = async (postId, newIsLiked) => {
    if (!currentUser) return

    try {
      // ✅ ACTUALIZAR ESTADO LOCAL INMEDIATAMENTE
      setUserPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                likesCount: newIsLiked ? (post.likesCount || 0) + 1 : Math.max(0, (post.likesCount || 0) - 1),
                isLiked: newIsLiked,
                // ✅ ACTUALIZAR TAMBIÉN likedBy ARRAY
                likedBy: newIsLiked 
                  ? [...(post.likedBy || []), currentUser.id || currentUser.uid]
                  : (post.likedBy || []).filter(id => id !== (currentUser.id || currentUser.uid))
              }
            : post
        )
      )
    } catch (error) {
      console.error('Error updating post like state:', error)
    }
  }

  // Función para manejar seguir/dejar de seguir
  const handleFollowToggle = async () => {
    if (!currentUser || !userProfile || isOwnProfile) return

    try {
      const result = await toggleFollowUser(currentUser.id, userProfile.id)
      if (result.success) {
        setIsFollowing(result.isFollowing)
        setUserStats(prev => ({
          ...prev,
          followers: result.isFollowing ? prev.followers + 1 : prev.followers - 1
        }))
      }
    } catch (error) {
      console.error('Error toggling follow:', error)
    }
  }

  // ✅ FUNCIÓN MEJORADA PARA CAMBIAR FOTO DE PORTADA CON PERSISTENCIA COMPLETA
  const handleCoverPhotoClick = () => {
    if (!isOwnProfile || uploadingPhoto) return // Solo el dueño puede cambiar la portada
    
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        // Validar tamaño del archivo (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error('La imagen debe ser menor a 10MB')
          return
        }

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
          toast.error('Solo se permiten archivos de imagen')
          return
        }

        setUploadingPhoto(true)
        toast.loading('📸 Subiendo foto de portada...', { id: 'cover-upload' })

        try {
          // Convertir a base64 para mostrar preview inmediato
          const reader = new FileReader()
          reader.onload = async (e) => {
            const base64Image = e.target.result
            
            // ✅ ACTUALIZAR PREVIEW INMEDIATAMENTE
            setUserProfile(prev => ({
              ...prev,
              banner: base64Image
            }))

            // Simular upload (en producción aquí iría la subida a storage)
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // ✅ GUARDAR EN FIREBASE CON PERSISTENCIA COMPLETA
            const userId = currentUser.id || currentUser.uid || currentUser.email
            const result = await updateUserProfile(userId, {
              banner: base64Image // En producción sería la URL del storage
            })

            if (result.success) {
              toast.success('✅ Foto de portada actualizada!', { id: 'cover-upload' })
              
              // ✅ RECARGAR PERFIL COMPLETO DESDE FIREBASE PARA CONFIRMAR PERSISTENCIA
              const updatedProfile = await getUserProfile(userId)
              if (updatedProfile.success) {
                setUserProfile(prev => ({
                  ...prev,
                  banner: updatedProfile.data.banner
                }))
              }
              
            } else {
              toast.error('Error al actualizar la portada', { id: 'cover-upload' })
              // Revertir preview en caso de error
              setUserProfile(prev => ({
                ...prev,
                banner: "https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop"
              }))
            }
          }
          reader.readAsDataURL(file)
        } catch (error) {
          console.error('Error uploading cover photo:', error)
          toast.error('Error al subir la imagen', { id: 'cover-upload' })
        } finally {
          setUploadingPhoto(false)
        }
      }
    }
    input.click()
  }

  // ✅ FUNCIÓN PARA CAMBIAR FOTO DE PERFIL CON PERSISTENCIA COMPLETA
  const handleAvatarPhotoClick = () => {
    if (!isOwnProfile || uploadingPhoto) return
    
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        // Validar tamaño del archivo (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error('La imagen debe ser menor a 10MB')
          return
        }

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
          toast.error('Solo se permiten archivos de imagen')
          return
        }

        setUploadingPhoto(true)
        toast.loading('📷 Subiendo foto de perfil...', { id: 'avatar-upload' })

        try {
          const reader = new FileReader()
          reader.onload = async (e) => {
            const base64Image = e.target.result
            
            // ✅ ACTUALIZAR PREVIEW INMEDIATAMENTE
            setUserProfile(prev => ({
              ...prev,
              avatar: base64Image
            }))

            // Simular upload (en producción aquí iría la subida a storage)
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // ✅ GUARDAR EN FIREBASE CON PERSISTENCIA COMPLETA
            const userId = currentUser.id || currentUser.uid || currentUser.email
            const result = await updateUserProfile(userId, {
              avatar: base64Image
            })

            if (result.success) {
              toast.success('✅ Foto de perfil actualizada!', { id: 'avatar-upload' })
              
              // ✅ RECARGAR PERFIL COMPLETO DESDE FIREBASE PARA CONFIRMAR PERSISTENCIA
              const updatedProfile = await getUserProfile(userId)
              if (updatedProfile.success) {
                setUserProfile(prev => ({
                  ...prev,
                  avatar: updatedProfile.data.avatar
                }))
              }
              
            } else {
              toast.error('Error al actualizar la foto de perfil', { id: 'avatar-upload' })
              // Revertir preview en caso de error
              const originalAvatar = currentUser.photoURL || currentUser.avatar || "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face"
              setUserProfile(prev => ({
                ...prev,
                avatar: originalAvatar
              }))
            }
          }
          reader.readAsDataURL(file)
        } catch (error) {
          console.error('Error uploading avatar photo:', error)
          toast.error('Error al subir la imagen', { id: 'avatar-upload' })
        } finally {
          setUploadingPhoto(false)
        }
      }
    }
    input.click()
  }

  // ✅ FUNCIÓN PARA MANEJAR NUEVO POST CREADO
  const handlePostCreated = (newPost) => {
    // Agregar el nuevo post al inicio de la lista
    setUserPosts(prevPosts => [newPost, ...prevPosts])
    
    // Actualizar estadísticas
    setUserStats(prevStats => ({
      ...prevStats,
      posts: prevStats.posts + 1
    }))
    
    toast.success('🎉 ¡Tu publicación ya está en vivo!')
  }

  // ✅ FUNCIÓN PARA ABRIR MODAL DE CREAR POST
  const handleCreateFirstPost = () => {
    setCreatePostModalOpen(true)
  }

  // Formatear números para mostrar (10K, 1M, etc.)
  const formatCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M'
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
  }

  if (loading || !userProfile) {
    return (
      <div className="absolute inset-0 w-full bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando perfil desde Firebase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full bg-black text-white overflow-y-auto" style={{ fontFamily: 'Poppins, sans-serif', scrollBehavior: 'smooth' }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-20">
        
        {/* HEADER DE PERFIL */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative mb-8"
        >
          {/* Banner de Fondo */}
          <div 
            className={`relative h-48 sm:h-56 lg:h-64 rounded-t-2xl overflow-hidden ${
              isOwnProfile ? 'cursor-pointer group' : ''
            }`}
            onClick={handleCoverPhotoClick}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${userProfile.banner})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Overlay de edición para el dueño del perfil */}
            {isOwnProfile && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-white mx-auto mb-2" />
                  <span className="text-white font-medium">
                    {uploadingPhoto ? 'Subiendo...' : 'Cambiar portada'}
                  </span>
                </div>
              </div>
            )}
            
            {/* Botón Editar Perfil o Seguir */}
            <motion.button
              onClick={isOwnProfile ? handleEditProfile : handleFollowToggle}
              className={`absolute top-4 right-4 px-5 py-2.5 border rounded-lg 
                         text-sm font-medium transition-all duration-300 ${
                isOwnProfile 
                  ? 'border-white/80 bg-transparent hover:bg-white hover:text-black text-white'
                  : isFollowing
                    ? 'border-gray-400 bg-transparent hover:bg-gray-400 hover:text-black text-gray-400'
                    : 'border-white bg-white text-black hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit3 className="w-4 h-4 inline mr-2" />
              {isOwnProfile ? 'Editar Perfil' : isFollowing ? 'Siguiendo' : 'Seguir'}
            </motion.button>
          </div>

          {/* Información del Usuario */}
          <div className="relative bg-black rounded-b-2xl pt-16 pb-6 px-6">
            {/* Avatar superpuesto */}
            <motion.div
              className="absolute -top-16 left-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl border-4 border-white overflow-hidden relative ${
                  isOwnProfile ? 'cursor-pointer group' : ''
                }`}
                onClick={handleAvatarPhotoClick}
              >
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay de edición para avatar */}
                {isOwnProfile && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Info del usuario */}
            <div className="pt-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center space-x-2 mb-1"
              >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {userProfile.name}
                </h1>
                {userProfile.verified && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-base text-gray-400 mb-2"
              >
                {userProfile.username}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-sm text-gray-500 mb-3"
              >
                {userProfile.location}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm text-white leading-relaxed max-w-md"
              >
                {userProfile.bio}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ESTADÍSTICAS DE USUARIO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="flex gap-8 sm:gap-12">
            <motion.div
              className="text-center cursor-pointer"
              onClick={() => handleStatClick('seguidores')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-xl sm:text-2xl font-bold text-white">
                {formatCount(userStats.followers)}
              </div>
              <div className="text-sm text-gray-400">Seguidores</div>
            </motion.div>
            
            <motion.div
              className="text-center cursor-pointer"
              onClick={() => handleStatClick('seguidos')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-xl sm:text-2xl font-bold text-white">
                {formatCount(userStats.following)}
              </div>
              <div className="text-sm text-gray-400">Seguidos</div>
            </motion.div>
            
            <motion.div
              className="text-center cursor-pointer"
              onClick={() => handleStatClick('publicaciones')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-xl sm:text-2xl font-bold text-white">
                {formatCount(userStats.posts)}
              </div>
              <div className="text-sm text-gray-400">Publicaciones</div>
            </motion.div>
          </div>
        </motion.div>

        {/* NAVEGACIÓN DE TABS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="flex gap-8 sm:gap-12">
            {tabs.map((tab) => (
              <div key={tab.id} className="relative">
                <motion.button
                  onClick={() => handleTabChange(tab.id)}
                  className={`text-base font-medium transition-all duration-300 relative flex items-center gap-1 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {tab.label}
                  {tab.hasDropdown && (
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        showDropdown ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                </motion.button>
                
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ✅ GRID DE POSTS DINÁMICO - 100% FIREBASE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-8"
        >
          {activeTab === 'publicaciones' && (
            <>
              {userPosts.length > 0 ? (
                <>
                  {/* ✅ Botón flotante para crear nueva publicación */}
                  {isOwnProfile && (
                    <div className="flex justify-end mb-4">
                      <motion.button
                        onClick={handleCreateFirstPost}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="w-4 h-4" />
                        Nueva publicación
                      </motion.button>
                    </div>
                  )}
                  
                                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                     {userPosts.map((post, index) => (
                       <motion.div
                         key={post.id}
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: index * 0.1, duration: 0.4 }}
                         className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg bg-gray-800"
                         onClick={() => handlePostClick(post)}
                         onMouseEnter={() => setHoveredPost(post.id)}
                         onMouseLeave={() => setHoveredPost(null)}
                       >
                         <img
                           src={post.imageUrl}
                           alt={post.caption}
                           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                           loading="lazy"
                         />
                         
                         {/* Overlay con estadísticas al hacer hover */}
                         <AnimatePresence>
                           {hoveredPost === post.id && (
                             <motion.div
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               exit={{ opacity: 0 }}
                               className="absolute inset-0 bg-black/70 flex items-center justify-center"
                             >
                               <div className="flex items-center space-x-4 text-white">
                                 <div className="flex items-center space-x-1">
                                   <Heart className="w-5 h-5" />
                                   <span className="text-sm font-medium">{post.likesCount}</span>
                                 </div>
                                 <div className="flex items-center space-x-1">
                                   <MessageCircle className="w-5 h-5" />
                                   <span className="text-sm font-medium">{post.commentsCount}</span>
                                 </div>
                               </div>
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </motion.div>
                     ))}
                   </div>
                 </>
              ) : (
                // ✅ ESTADO VACÍO ELEGANTE - SIN POSTS MOCK
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                    <Camera className="w-10 h-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Aún no tienes publicaciones
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Comparte tu primer look y comienza a construir tu perfil de moda
                  </p>
                  {isOwnProfile && (
                    <motion.button
                      onClick={handleCreateFirstPost}
                      className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Crear tu primera publicación
                    </motion.button>
                  )}
                </motion.div>
              )}
            </>
          )}
        </motion.div>

      </div>

      {/* Modal de Post */}
      <PostModal
        isOpen={postModalOpen}
        onClose={closePostModal}
        post={selectedPost}
        onLike={handlePostLike}
      />

      {/* ✅ Modal de Crear Post */}
      <CreatePostModal
        isOpen={createPostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  )
}

export default PerfilMarca 