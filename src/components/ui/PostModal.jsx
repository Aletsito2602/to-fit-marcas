import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, X, Share } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import UserAvatar from './UserAvatar'
import { 
  likePost, 
  unlikePost, 
  savePost, 
  unsavePost,
  addComment,
  getComments,
  getPostById
} from '../../services/postsService'
import toast from 'react-hot-toast'

// Animaciones definidas exactamente como se especifica
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
}

const PostModal = ({ isOpen, onClose, post, onLike }) => {
  const { user: currentUser } = useAuthStore()
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const commentsEndRef = useRef(null)
  
  // ✅ ESTADOS DINÁMICOS PARA FIREBASE
  const [realComments, setRealComments] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [commentsCount, setCommentsCount] = useState(0)
  const [loadingComments, setLoadingComments] = useState(false)

  // ✅ CARGAR DATOS REALES AL ABRIR EL MODAL
  useEffect(() => {
    if (isOpen && post && currentUser) {
      loadPostData()
    }
  }, [isOpen, post, currentUser])

  // ✅ FUNCIÓN PARA OBTENER AVATAR DEL USUARIO ACTUAL
  const getCurrentUserAvatar = () => {
    if (!currentUser) return "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=32&h=32&fit=crop&crop=face"
    
    // Prioridad: photoURL > avatar > imagen por defecto
    return currentUser.photoURL || 
           currentUser.avatar || 
           (currentUser.email ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.email)}&backgroundColor=6366f1&textColor=ffffff` : null) ||
           "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=32&h=32&fit=crop&crop=face"
  }

  // ✅ FUNCIÓN PARA CARGAR TODOS LOS DATOS DEL POST
  const loadPostData = async () => {
    if (!post || !currentUser) return

    try {
      setLoadingComments(true)
      const userId = currentUser.id || currentUser.uid

      // ✅ CARGAR DATOS ACTUALIZADOS DEL POST DESDE FIREBASE
      const updatedPostResult = await getPostById(post.id)
      let currentPostData = post

      if (updatedPostResult.success) {
        currentPostData = updatedPostResult.data
      }

      // ✅ CARGAR ESTADO REAL DE LIKES Y SAVES DEL USUARIO ACTUAL
      setIsLiked(currentPostData.likedBy?.includes(userId) || false)
      setIsSaved(currentPostData.savedBy?.includes(userId) || false)
      setLikesCount(currentPostData.likesCount || 0)
      setCommentsCount(currentPostData.commentsCount || 0)

      // ✅ CARGAR COMENTARIOS REALES EN TIEMPO REAL
      const unsubscribe = getComments(post.id, (comments) => {
        setRealComments(comments)
        setCommentsCount(comments.length)
        setLoadingComments(false)
        
        // Auto-scroll a los comentarios nuevos
        setTimeout(() => {
          commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      })

      // Cleanup function
      return () => {
        if (unsubscribe) unsubscribe()
      }

    } catch (error) {
      console.error('Error loading post data:', error)
      setLoadingComments(false)
    }
  }

  // ✅ MANEJAR LIKE/UNLIKE REAL CON SINCRONIZACIÓN
  const handleLike = async () => {
    if (!currentUser || !post) return

    const userId = currentUser.id || currentUser.uid
    
    // ✅ VERIFICAR ESTADO ACTUAL DESDE FIREBASE ANTES DE PROCEDER
    try {
      const currentPostResult = await getPostById(post.id)
      let serverIsLiked = isLiked // fallback al estado local
      let serverLikesCount = likesCount
      
      if (currentPostResult.success) {
        serverIsLiked = currentPostResult.data.likedBy?.includes(userId) || false
        serverLikesCount = currentPostResult.data.likesCount || 0
        
        // ✅ SINCRONIZAR ESTADO LOCAL CON SERVIDOR
        setIsLiked(serverIsLiked)
        setLikesCount(serverLikesCount)
      }
      
      // ✅ ACTUALIZACIÓN OPTIMISTA DE UI (INMEDIATA)
      const newIsLiked = !serverIsLiked
      setIsLiked(newIsLiked)
      setLikesCount(prev => newIsLiked ? prev + 1 : Math.max(0, prev - 1))
      
      // ✅ EJECUTAR ACCIÓN EN SERVIDOR
      let result
      if (serverIsLiked) {
        result = await unlikePost(post.id, userId)
      } else {
        result = await likePost(post.id, userId)
      }
      
      if (result.success) {
        // ✅ ACCIÓN EXITOSA - MANTENER ESTADO OPTIMISTA
        if (onLike) {
          onLike(post.id, newIsLiked)
        }
        
        if (newIsLiked) {
          toast.success('❤️ ¡Te gusta esta publicación!', { duration: 1500 })
        } else {
          toast.success('💔 Ya no te gusta esta publicación', { duration: 1000 })
        }
        
        // ✅ VERIFICAR ESTADO FINAL DESDE SERVIDOR
        setTimeout(async () => {
          const finalResult = await getPostById(post.id)
          if (finalResult.success) {
            setIsLiked(finalResult.data.likedBy?.includes(userId) || false)
            setLikesCount(finalResult.data.likesCount || 0)
          }
        }, 500)
        
      } else {
        // ✅ ERROR - REVERTIR ESTADO OPTIMISTA
        setIsLiked(serverIsLiked)
        setLikesCount(serverLikesCount)
        toast.error('Error al procesar el like')
      }
      
    } catch (error) {
      console.error('Error toggling like:', error)
      toast.error('Error al procesar el like')
      
      // ✅ RECARGAR ESTADO DESDE SERVIDOR EN CASO DE ERROR
      try {
        const recoveryResult = await getPostById(post.id)
        if (recoveryResult.success) {
          setIsLiked(recoveryResult.data.likedBy?.includes(userId) || false)
          setLikesCount(recoveryResult.data.likesCount || 0)
        }
      } catch (recoveryError) {
        console.error('Error recovering like state:', recoveryError)
      }
    }
  }

  // ✅ MANEJAR SAVE/UNSAVE REAL
  const handleSave = async () => {
    if (!currentUser || !post) return

    try {
      const userId = currentUser.id || currentUser.uid

      if (isSaved) {
        // Unsave
        const result = await unsavePost(post.id, userId)
        if (result.success) {
          setIsSaved(false)
          toast.success('📌 Eliminado de guardados', { duration: 1500 })
        }
      } else {
        // Save
        const result = await savePost(post.id, userId)
        if (result.success) {
          setIsSaved(true)
          toast.success('📌 ¡Guardado en tu colección!', { duration: 1500 })
        }
      }
    } catch (error) {
      console.error('Error toggling save:', error)
      toast.error('Error al guardar la publicación')
    }
  }

  // ✅ ENVIAR COMENTARIO REAL A FIREBASE
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || !currentUser || !post) return

    setLoading(true)
    
    try {
      const commentData = {
        content: newComment.trim(),
        userDisplayName: currentUser.name || currentUser.displayName || 'Usuario ToFit',
        userAvatar: getCurrentUserAvatar()
      }

      const result = await addComment(
        post.id, 
        currentUser.id || currentUser.uid, 
        commentData.content,
        commentData.userDisplayName,
        commentData.userAvatar
      )
      
      if (result.success) {
        setNewComment('')
        toast.success('💬 ¡Comentario agregado!', { duration: 1500 })
        
        // Los comentarios se actualizarán automáticamente por el listener de tiempo real
      } else {
        toast.error('Error al enviar el comentario')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      toast.error('Error al enviar el comentario')
    } finally {
      setLoading(false)
    }
  }

  // ✅ MANEJAR COMPARTIR
  const handleShare = async () => {
    if (!post) return

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Post de ${post.userDisplayName}`,
          text: post.caption || 'Mira esta publicación en ToFit',
          url: window.location.href
        })
      } else {
        // Fallback: copiar al portapapeles
        await navigator.clipboard.writeText(window.location.href)
        toast.success('🔗 Enlace copiado al portapapeles')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      toast.error('Error al compartir')
    }
  }

  // ✅ FORMATEAR TIMESTAMP
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Ahora'
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Ahora'
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d`
    
    return date.toLocaleDateString()
  }

  // No renderizar si no hay post válido
  if (!post || typeof post !== 'object') return null

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-black rounded-2xl border border-gray-800 w-full max-w-4xl mx-auto shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            >
              
              {/* ✅ IMAGEN DEL POST */}
              <div className="lg:flex-1 lg:max-w-md xl:max-w-lg bg-black flex items-center justify-center">
                <img
                  src={post.imageUrl}
                  alt={post.caption || 'Post image'}
                  className="w-full h-full object-cover max-h-[50vh] lg:max-h-full"
                />
              </div>

              {/* ✅ CONTENIDO DEL POST */}
              <div className="lg:flex-1 flex flex-col bg-black text-white">
                
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <div className="flex items-center space-x-3">
                    <UserAvatar 
                      user={post}
                      size="md"
                      fallbackSeed={post.userDisplayName}
                    />
                    <div>
                      <p className="font-semibold text-sm">{post.userDisplayName || 'Usuario'}</p>
                      <p className="text-gray-400 text-xs">{post.userHandle || '@usuario'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleShare}
                      className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                      title="Compartir"
                    >
                      <Share className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Caption */}
                {post.caption && (
                  <div className="p-4 border-b border-gray-800">
                    <p className="text-sm">
                      <span className="font-semibold">{post.userDisplayName}</span>{' '}
                      <span>{post.caption}</span>
                    </p>
                    {post.hashtags && post.hashtags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {post.hashtags.map((tag, index) => (
                          <span key={index} className="text-blue-400 text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-gray-500 text-xs mt-2">
                      {formatTimestamp(post.createdAt)}
                    </p>
                  </div>
                )}

                {/* ✅ COMENTARIOS REALES */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-60 lg:max-h-none">
                  {loadingComments ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                  ) : realComments.length > 0 ? (
                    realComments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <UserAvatar 
                          user={comment}
                          size="sm"
                          fallbackSeed={comment.userDisplayName}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-semibold">{comment.userDisplayName}</span>{' '}
                            <span>{comment.content}</span>
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {formatTimestamp(comment.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Sé el primero en comentar</p>
                    </div>
                  )}
                  <div ref={commentsEndRef} />
                </div>

                {/* ✅ ACCIONES REALES */}
                <div className="border-t border-gray-800 p-4 space-y-3">
                  
                  {/* Botones de acción */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        onClick={handleLike}
                        className={`p-2 rounded-full transition-colors ${
                          isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                      </motion.button>
                      
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <MessageCircle className="w-6 h-6" />
                      </button>
                      
                      <button
                        onClick={handleShare}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Share className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <motion.button
                      onClick={handleSave}
                      className={`p-2 rounded-full transition-colors ${
                        isSaved ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                      }`}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
                    </motion.button>
                  </div>

                  {/* Contador de likes */}
                  <div className="text-sm font-semibold">
                    {likesCount > 0 && (
                      <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
                    )}
                  </div>

                  {/* ✅ FORMULARIO DE COMENTARIO REAL */}
                  <form onSubmit={handleSubmitComment} className="flex items-center space-x-2">
                    <UserAvatar 
                      user={currentUser}
                      size="sm"
                      fallbackSeed={currentUser?.email || currentUser?.name}
                    />
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Agrega un comentario..."
                      className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500"
                      disabled={loading}
                    />
                    <motion.button
                      type="submit"
                      disabled={!newComment.trim() || loading}
                      className="text-blue-500 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:text-blue-400 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Publicar'
                      )}
                    </motion.button>
                  </form>
                </div>

              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default PostModal 