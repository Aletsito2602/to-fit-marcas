import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, X } from 'lucide-react'

// Data structure exacta como se especifica
const postData = {
  id: "post_123",
  user: {
    name: "AgostinaPerez",
    handle: "@agostinabelenperez", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=40&h=40&fit=crop&crop=face"
  },
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
  timestamp: "Saturday night",
  likes: 200,
  isLiked: false,
  comments: [
    {
      id: "comment_1",
      user: { 
        name: "Luciaquilla", 
        handle: "@luciaquil5", 
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" 
      },
      text: "esas botas 🔥🔥🔥",
      likes: 0,
      isLiked: false,
      timestamp: "2h"
    },
    {
      id: "comment_2",
      user: { 
        name: "Cinthiapach", 
        handle: "@cinpachecoo", 
        avatar: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=32&h=32&fit=crop&crop=face" 
      },
      text: "donde es???",
      likes: 0,
      isLiked: false,
      timestamp: "1h"
    },
    {
      id: "comment_3",
      user: { 
        name: "Natt", 
        handle: "@nattgodoyy", 
        avatar: "https://images.unsplash.com/photo-1506629905057-46ac5b127cdb?w=32&h=32&fit=crop&crop=face" 
      },
      text: "donde consigo esas botas???",
      likes: 0,
      isLiked: false,
      timestamp: "30m"
    }
  ]
}

// Animaciones definidas exactamente como se especifica
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
}

const likeVariants = {
  tap: { scale: 0.8 },
  liked: { scale: [1, 1.2, 1], transition: { duration: 0.3 } }
}

const PostModal = ({ isOpen, onClose, post }) => {
  // Usar datos por defecto si post no existe
  const currentPost = post || postData
  
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const commentInputRef = useRef(null)
  const commentsScrollRef = useRef(null)

  // Actualizar estados cuando cambie el post
  useEffect(() => {
    if (currentPost && typeof currentPost === 'object') {
      setIsLiked(currentPost.isLiked || false)
      setLikesCount(currentPost.likes || 0)
      setComments(Array.isArray(currentPost.comments) ? currentPost.comments : [])
    }
  }, [currentPost])

  // Focus en input cuando se abre el modal
  useEffect(() => {
    if (isOpen && commentInputRef.current) {
      setTimeout(() => commentInputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Scroll automático al agregar comentario
  useEffect(() => {
    if (commentsScrollRef.current) {
      commentsScrollRef.current.scrollTop = commentsScrollRef.current.scrollHeight
    }
  }, [comments])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
    // Aquí iría la llamada a la API
    console.log('Like toggled:', !isLiked)
  }

  const handleCommentLike = (commentId) => {
    setComments(prev => 
      (Array.isArray(prev) ? prev : []).map(comment => 
        comment.id === commentId 
          ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
          : comment
      )
    )
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setLoading(true)
    
    // Simular envío de comentario
    setTimeout(() => {
      const comment = {
        id: `comment_${Date.now()}`,
        user: {
          name: "Tu nombre",
          handle: "@tuhandle",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
        },
        text: newComment,
        likes: 0,
        isLiked: false,
        timestamp: "now"
      }
      
      setComments(prev => [...(Array.isArray(prev) ? prev : []), comment])
      setNewComment('')
      setLoading(false)
    }, 500)
  }

  const handleShare = () => {
    console.log('Share post:', currentPost?.id || 'unknown')
    // Aquí iría la lógica de compartir
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    console.log('Save toggled:', !isSaved)
  }

  const handleMoreOptions = () => {
    console.log('More options for post:', currentPost?.id || 'unknown')
  }

  // No renderizar si no hay post válido
  if (!currentPost || typeof currentPost !== 'object') return null

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
            <Dialog.Panel as={motion.div}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-black rounded-2xl shadow-2xl overflow-hidden"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Layout principal: Desktop horizontal, Mobile vertical */}
              <div className="flex flex-col lg:flex-row h-auto lg:h-[600px]">
                
                {/* IMAGEN PRINCIPAL (Lado Izquierdo) */}
                <div className="w-full lg:w-[500px] h-64 sm:h-80 lg:h-[600px] relative">
                  <img
                    src={currentPost.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop'}
                    alt="Post"
                    className="w-full h-full object-cover lg:rounded-l-2xl"
                    style={{ borderRadius: window.innerWidth >= 1024 ? '16px 0 0 16px' : '0' }}
                  />
                </div>

                {/* PANEL LATERAL DERECHO (300px width) */}
                <div className="w-full lg:w-[300px] flex flex-col bg-black">
                  
                  {/* Header del Post */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <motion.img
                        src={currentPost.user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                        alt={currentPost.user?.name || 'Usuario'}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div>
                        <h3 className="text-white font-medium text-sm">{currentPost.user?.name || 'Usuario'}</h3>
                        <p className="text-gray-400 text-xs">{currentPost.user?.handle || '@usuario'}</p>
                        <p className="text-gray-300 text-xs">{currentPost.timestamp || 'Ahora'}</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={handleMoreOptions}
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ opacity: 0.8 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Sección de Comentarios */}
                  <div 
                    ref={commentsScrollRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px] lg:max-h-[400px] scrollbar-hide"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {(Array.isArray(comments) ? comments : []).filter(comment => comment && comment.user).map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start space-x-3"
                      >
                        <motion.img
                          src={comment.user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
                          alt={comment.user?.name || 'Usuario'}
                          className="w-8 h-8 rounded-full object-cover cursor-pointer"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium text-xs">{comment.user?.name || 'Usuario'}</span>
                            <span className="text-gray-400 text-xs">{comment.user?.handle || '@usuario'}</span>
                          </div>
                          <p className="text-white text-xs mt-1 leading-relaxed">{comment.text || ''}</p>
                        </div>
                        <motion.button
                          onClick={() => handleCommentLike(comment.id)}
                          className="flex flex-col items-center"
                          whileTap={{ scale: 0.8 }}
                        >
                          <Heart 
                            className={`w-4 h-4 ${comment.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                          />
                          {comment.likes > 0 && (
                            <span className="text-xs text-gray-400 mt-1">{comment.likes}</span>
                          )}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Sección Inferior de Interacciones */}
                  <div className="border-t border-white/10 p-4">
                    {/* Botones de Acción */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          onClick={handleLike}
                          className="flex flex-col items-center"
                          variants={likeVariants}
                          whileTap="tap"
                          animate={isLiked ? "liked" : ""}
                        >
                          <Heart 
                            className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                          />
                          <span className="text-white font-medium text-sm mt-1">{likesCount}</span>
                        </motion.button>

                        <motion.button
                          onClick={() => commentInputRef.current?.focus()}
                          className="text-white"
                          whileHover={{ opacity: 0.8 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <MessageCircle className="w-6 h-6" />
                        </motion.button>

                        <motion.button
                          onClick={handleShare}
                          className="text-white"
                          whileHover={{ opacity: 0.8 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Send className="w-6 h-6" />
                        </motion.button>
                      </div>

                      <motion.button
                        onClick={handleSave}
                        className="text-white"
                        whileHover={{ opacity: 0.8 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark 
                          className={`w-6 h-6 ${isSaved ? 'fill-white' : ''}`} 
                        />
                      </motion.button>
                    </div>

                    {/* Input de Comentario */}
                    <form onSubmit={handleSubmitComment} className="border-t border-white/10 pt-3">
                      <input
                        ref={commentInputRef}
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Añade un comentario..."
                        className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none py-2"
                        disabled={loading}
                      />
                      {loading && (
                        <div className="flex items-center justify-center py-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default PostModal 