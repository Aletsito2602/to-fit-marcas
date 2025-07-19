import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Edit3, ChevronDown, Heart, MessageCircle, Share } from 'lucide-react'
import PostModal from '../components/ui/PostModal'

// Data del perfil exactamente como se especifica
const userProfile = {
  name: "Agostina Perez",
  handle: "@agostinabelenperez", 
  location: "Misiones, Argentina.",
  bio: "CEO @ToFit - Asesora de imagen. Te ayudo a potenciar tu imagen!",
  stats: {
    followers: "10K",
    following: "1K", 
    posts: "50"
  },
  avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face",
  banner: "https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop",
  posts: [
    { 
      id: 1, 
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=400&fit=crop", 
      likes: 234, 
      comments: 12,
      description: "Mujer sentada en café, ropa casual"
    },
    { 
      id: 2, 
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop", 
      likes: 456, 
      comments: 23,
      description: "Mujer caminando, vista de espaldas, ropa sport"
    },
    { 
      id: 3, 
      image: "https://images.unsplash.com/photo-1506629905057-46ac5b127cdb?w=400&h=400&fit=crop", 
      likes: 189, 
      comments: 8,
      description: "Selfie de mujer rubia en espejo"
    },
    { 
      id: 4, 
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop", 
      likes: 312, 
      comments: 15,
      description: "Mujer con outfit beige/marrón"
    },
    { 
      id: 5, 
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=400&fit=crop", 
      likes: 234, 
      comments: 12,
      description: "Repetición de imagen 1"
    },
    { 
      id: 6, 
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop", 
      likes: 456, 
      comments: 23,
      description: "Repetición de imagen 2"
    },
    { 
      id: 7, 
      image: "https://images.unsplash.com/photo-1506629905057-46ac5b127cdb?w=400&h=400&fit=crop", 
      likes: 189, 
      comments: 8,
      description: "Repetición de imagen 3"
    },
    { 
      id: 8, 
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop", 
      likes: 312, 
      comments: 15,
      description: "Repetición de imagen 4"
    }
  ]
}

const PerfilMarca = () => {
  const [activeTab, setActiveTab] = useState('publicaciones')
  const [hoveredPost, setHoveredPost] = useState(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [postModalOpen, setPostModalOpen] = useState(false)

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const tabs = [
    { id: 'publicaciones', label: 'Publicaciones', active: true },
    { id: 'capsulas', label: 'Cápsulas', hasDropdown: true },
    { id: 'calendario', label: 'Calendario' }
  ]

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
    setTimeout(() => setSelectedPost(null), 300) // Delay para animación
  }

  const handleEditProfile = () => {
    console.log('Editar perfil')
  }

  const handleStatClick = (stat) => {
    console.log(`Ver ${stat}`)
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
          <div className="relative h-48 sm:h-56 lg:h-64 rounded-t-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${userProfile.banner})` }}
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Botón Editar Perfil */}
            <motion.button
              onClick={handleEditProfile}
              className="absolute top-4 right-4 px-5 py-2.5 border border-white/80 rounded-lg 
                         bg-transparent hover:bg-white hover:text-black transition-all duration-300
                         text-white text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit3 className="w-4 h-4 inline mr-2" />
              Editar Perfil
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
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-3xl border-4 border-white overflow-hidden cursor-pointer">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Info del usuario */}
            <div className="pt-4">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1"
              >
                {userProfile.name}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-base text-gray-400 mb-2"
              >
                {userProfile.handle}
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
          className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-6 sm:gap-10 mb-8"
        >
          <motion.div
            className="text-center cursor-pointer"
            onClick={() => handleStatClick('seguidores')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-xl sm:text-2xl font-bold text-white">{userProfile.stats.followers}</div>
            <div className="text-sm text-gray-400">Seguidores</div>
          </motion.div>
          
          <motion.div
            className="text-center cursor-pointer"
            onClick={() => handleStatClick('seguidos')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-xl sm:text-2xl font-bold text-white">{userProfile.stats.following}</div>
            <div className="text-sm text-gray-400">Seguidos</div>
          </motion.div>
          
          <motion.div
            className="text-center cursor-pointer"
            onClick={() => handleStatClick('publicaciones')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-xl sm:text-2xl font-bold text-white">{userProfile.stats.posts}</div>
            <div className="text-sm text-gray-400">Publicaciones</div>
          </motion.div>
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
                
                {/* Border bottom para tab activa */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Dropdown para Cápsulas */}
                <AnimatePresence>
                  {tab.hasDropdown && showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 left-0 bg-gray-900 rounded-lg shadow-xl border border-gray-700 py-2 min-w-[140px] z-10"
                    >
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                        Ver todas
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                        Favoritas
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                        Recientes
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GRID DE PUBLICACIONES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
        >
          {userProfile.posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="relative aspect-square cursor-pointer group"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              onClick={() => handlePostClick(post)}
            >
              <div className="w-full h-full rounded-xl overflow-hidden">
                <img
                  src={post.image}
                  alt={post.description}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Overlay en hover */}
              <AnimatePresence>
                {hoveredPost === post.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center gap-4"
                  >
                    <div className="flex items-center text-white text-sm font-medium">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center text-white text-sm font-medium">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* PostModal Componente */}
        <PostModal 
          isOpen={postModalOpen}
          onClose={closePostModal}
          post={selectedPost}
        />
      </div>
    </div>
  )
}

export default PerfilMarca 