import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { Camera, X, Hash, MapPin, Tag, Send, ImageIcon, Smile } from 'lucide-react'
import { createPost } from '../../services/postsService'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const { user } = useAuthStore()
  const fileInputRef = useRef()

  // ✅ FUNCIÓN PARA OBTENER AVATAR DEL USUARIO ACTUAL
  const getCurrentUserAvatar = () => {
    if (!user) return "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=40&h=40&fit=crop&crop=face"
    
    // Prioridad: photoURL > avatar > imagen generada por iniciales > imagen por defecto
    return user.photoURL || 
           user.avatar || 
           (user.email ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.email)}&backgroundColor=6366f1&textColor=ffffff` : null) ||
           "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=40&h=40&fit=crop&crop=face"
  }
  
  // Estados del formulario
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [location, setLocation] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  // Animaciones del modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 50,
      transition: { duration: 0.2 }
    }
  }

  // Manejar selección de imagen
  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validar tamaño (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('La imagen debe ser menor a 10MB')
        return
      }

      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast.error('Solo se permiten archivos de imagen')
        return
      }

      setSelectedImage(file)
      
      // Crear preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Procesar hashtags
  const processHashtags = (hashtagText) => {
    return hashtagText
      .split(/[\s,]+/)
      .filter(tag => tag.trim())
      .map(tag => tag.startsWith('#') ? tag : `#${tag}`)
      .filter(tag => tag.length > 1)
  }

  // Crear el post
  const handleCreatePost = async () => {
    if (!selectedImage) {
      toast.error('Selecciona una imagen para tu post')
      return
    }

    if (!caption.trim()) {
      toast.error('Escribe una descripción para tu post')
      return
    }

    setIsUploading(true)
    toast.loading('✨ Creando tu publicación...', { id: 'create-post' })

    try {
      // Convertir imagen a base64 (en producción sería upload a storage)
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageBase64 = e.target.result
        
        // Procesar hashtags
        const processedHashtags = processHashtags(hashtags)
        
        // Crear data del post
        const postData = {
          userId: user.id || user.uid || user.email,
          type: 'look',
          imageUrl: imageBase64, // En producción sería la URL del storage
          caption: caption.trim(),
          hashtags: processedHashtags,
          location: location.trim() || 'Argentina',
          
          // Metadata adicional
          userDisplayName: user.name || user.displayName || 'Usuario ToFit',
          userAvatar: getCurrentUserAvatar(),
          userHandle: user.email ? `@${user.email.split('@')[0]}` : '@usuario',
          
          // Configuración inicial
          isActive: true,
          status: 'published'
        }

        // Crear post en Firebase
        const result = await createPost(postData)

        if (result.success) {
          toast.success('🎉 ¡Publicación creada exitosamente!', { id: 'create-post' })
          
          // Notificar al componente padre
          if (onPostCreated) {
            onPostCreated({
              id: result.id,
              ...postData,
              likesCount: 0,
              commentsCount: 0,
              savesCount: 0,
              sharesCount: 0,
              createdAt: new Date()
            })
          }
          
          // Cerrar modal y limpiar formulario
          onClose()
          resetForm()
          
        } else {
          toast.error('Error al crear la publicación. Inténtalo de nuevo.', { id: 'create-post' })
        }
      }
      
      reader.readAsDataURL(selectedImage)
      
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Error inesperado. Inténtalo de nuevo.', { id: 'create-post' })
    } finally {
      setIsUploading(false)
    }
  }

  // Limpiar formulario
  const resetForm = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setCaption('')
    setHashtags('')
    setLocation('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Cerrar modal
  const handleClose = () => {
    if (!isUploading) {
      onClose()
      resetForm()
    }
  }

  // Sugerencias de hashtags populares
  const suggestedHashtags = [
    '#OOTD', '#Fashion', '#Style', '#ToFit', '#Look', '#Outfit', 
    '#Tendencia', '#Moda', '#BuenosAires', '#Argentina'
  ]

  const addSuggestedHashtag = (tag) => {
    if (!hashtags.includes(tag)) {
      setHashtags(prev => prev ? `${prev} ${tag}` : tag)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as="div" className="relative z-50" open={isOpen} onClose={handleClose}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-lg mx-auto shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white">Crear publicación</h2>
                <button
                  onClick={handleClose}
                  disabled={isUploading}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                
                {/* Selección de Imagen */}
                <div className="space-y-3">
                  {!imagePreview ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-gray-500 transition-colors"
                    >
                      <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400 font-medium mb-1">Selecciona una imagen</p>
                      <p className="text-gray-500 text-sm">JPG, PNG hasta 10MB</p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => {
                          setSelectedImage(null)
                          setImagePreview(null)
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>

                {/* Caption */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-1">
                    <Smile className="w-4 h-4" />
                    Descripción
                  </label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="¿Qué estás compartiendo hoy? Cuéntanos sobre tu look..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    maxLength={500}
                  />
                  <div className="text-right text-xs text-gray-500">
                    {caption.length}/500
                  </div>
                </div>

                {/* Hashtags */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-1">
                    <Hash className="w-4 h-4" />
                    Hashtags
                  </label>
                  <input
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    placeholder="#fashion #style #OOTD"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  {/* Sugerencias de hashtags */}
                  <div className="flex flex-wrap gap-1">
                    {suggestedHashtags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => addSuggestedHashtag(tag)}
                        className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ubicación */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Ubicación
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Buenos Aires, Argentina"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-4 border-t border-gray-700">
                <div className="text-xs text-gray-500">
                  {selectedImage && caption.trim() ? (
                    '✅ Listo para publicar'
                  ) : (
                    'Agrega una imagen y descripción'
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleClose}
                    disabled={isUploading}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  
                  <motion.button
                    onClick={handleCreatePost}
                    disabled={!selectedImage || !caption.trim() || isUploading}
                    className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    whileHover={{ scale: !selectedImage || !caption.trim() || isUploading ? 1 : 1.05 }}
                    whileTap={{ scale: !selectedImage || !caption.trim() || isUploading ? 1 : 0.95 }}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        Publicando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Publicar
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default CreatePostModal 