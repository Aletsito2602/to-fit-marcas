import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { getUserLikedPosts, getUserSavedPosts } from '../services/userActivityService'
import PostModal from '../components/ui/PostModal'
import toast from 'react-hot-toast'

const Favorites = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('likes')
  const [likedPosts, setLikedPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)
  const [postModalOpen, setPostModalOpen] = useState(false)

  // ✅ CARGAR POSTS CON LIKE Y GUARDADOS
  useEffect(() => {
    if (!user) return

    setLoading(true)
    const userId = user.id || user.uid || user.email

    // Listener para posts con like
    const unsubscribeLikes = getUserLikedPosts(userId, (posts) => {
      setLikedPosts(posts)
      setLoading(false)
    })

    // Listener para posts guardados
    const unsubscribeSaves = getUserSavedPosts(userId, (posts) => {
      setSavedPosts(posts)
    })

    return () => {
      if (unsubscribeLikes) unsubscribeLikes()
      if (unsubscribeSaves) unsubscribeSaves()
    }
  }, [user])

  const handlePostClick = (post) => {
    setSelectedPost(post)
    setPostModalOpen(true)
  }

  const closePostModal = () => {
    setPostModalOpen(false)
    setTimeout(() => setSelectedPost(null), 300)
  }

  const tabs = [
    { id: 'likes', label: 'Me Gusta', count: likedPosts.length },
    { id: 'saved', label: 'Guardados', count: savedPosts.length }
  ]

  const currentPosts = activeTab === 'likes' ? likedPosts : savedPosts

  if (loading) {
    return (
      <div className="w-full bg-black text-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Mi Actividad
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 mb-6 bg-gray-900 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handlePostClick(post)}
                className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption || 'Post'}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>

                {/* Stats overlay */}
                <div className="absolute bottom-2 left-2 flex items-center space-x-2 text-white text-xs">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>{post.likesCount || 0}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4">
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {activeTab === 'likes' ? 'Sin likes aún' : 'Sin posts guardados'}
            </h3>
            <p className="text-gray-400 mb-6">
              {activeTab === 'likes' 
                ? '¡Empieza a explorar y marca lo que más te guste!'
                : '¡Guarda posts interesantes para verlos más tarde!'
              }
            </p>
            <button
              onClick={() => navigate('/home')}
              className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Explorar Posts
            </button>
          </div>
        )}

        {/* Modal de Post */}
        <PostModal
          isOpen={postModalOpen}
          onClose={closePostModal}
          post={selectedPost}
        />
      </div>
    </div>
  )
}

export default Favorites 