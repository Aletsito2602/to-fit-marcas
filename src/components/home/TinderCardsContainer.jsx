import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Heart, MoreHorizontal, Bookmark, Plus, MessageCircle, UserPlus, UserMinus } from 'lucide-react';
import { useDynamicFeed } from '../../hooks/useDynamicFeed';
import PostModal from '../ui/PostModal';
import { useAuthStore } from '../../store/authStore';

// Configuración optimizada de posiciones del stack
const CARD_POSITIONS = {
  front: {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    zIndex: 30,
    opacity: 1
  },
  backLeft: {
    x: -35,
    y: 18,
    rotate: -10,
    scale: 0.94,
    zIndex: 20,
    opacity: 0.88
  },
  backRight: {
    x: 35,
    y: 18,
    rotate: 10,
    scale: 0.92,
    zIndex: 10,
    opacity: 0.82
  }
};

// Card individual con animaciones SIMPLIFICADAS
const StackCard = ({ post, position, onSwipe, onShowComments, onFollowUser }) => {
  const { user } = useAuthStore();
  const basePosition = CARD_POSITIONS[position];
  const [isDragging, setIsDragging] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState(null);

  // Configuración de drag SIMPLE
  const handleDragEnd = (event, info) => {
    if (position !== 'front') return;

    const threshold = 100;
    const velocity = Math.abs(info.velocity.x);
    const offset = info.offset.x;

    // Si supera el threshold, hacer swipe
    if (Math.abs(offset) > threshold || velocity > 500) {
      const direction = offset > 0 ? 'right' : 'left';
      
      // Activar animación de salida
      setIsExiting(true);
      setExitDirection(direction);
      
      // Ejecutar callback después de la animación
      setTimeout(() => {
        onSwipe(direction, post.id);
      }, 300);
    }
  };

  // Overlay más oscuro para cards traseras
  const overlayOpacity = position === 'front' ? 0.4 : 0.7;

  // Configurar animación según el estado
  const getAnimateProps = () => {
    if (isExiting) {
      if (exitDirection === 'up') {
        return {
          x: 0,
          y: -400,
          rotate: 0,
          opacity: 0,
          scale: 0.8
        };
      }
      return {
        x: exitDirection === 'right' ? 400 : -400,
        y: 0,
        rotate: exitDirection === 'right' ? 30 : -30,
        opacity: 0,
        scale: 0.8
      };
    }
    return basePosition;
  };

  return (
    <motion.div
      className="absolute"
      style={{
        width: 'min(420px, 85vw)',
        height: 'min(650px, 75vh)',
        left: '50%',
        top: '50%',
        marginLeft: 'calc(min(420px, 85vw) / -2)',
        marginTop: 'calc(min(650px, 75vh) / -2)',
        zIndex: basePosition.zIndex
      }}
      initial={basePosition}
      animate={getAnimateProps()}
      transition={{
        type: isExiting ? "tween" : "spring",
        duration: isExiting ? 0.3 : undefined,
        stiffness: isExiting ? undefined : 300,
        damping: isExiting ? undefined : 30
      }}
             drag={position === 'front' && !isExiting}
       dragConstraints={{ left: -180, right: 180, top: -60, bottom: 60 }}
       dragElastic={0.2}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        handleDragEnd(event, info);
      }}
      whileDrag={{ 
        scale: 1.05,
        zIndex: 50,
        rotateZ: 0
      }}
    >
       <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Imagen */}
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Overlay gradient - Más oscuro en cards traseras */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
          style={{ opacity: overlayOpacity }}
        />
        
        {/* Overlay adicional para cards traseras */}
        {position !== 'front' && (
          <div className="absolute inset-0 bg-black/20" />
        )}
        
        {/* Contenido de la card */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">
                {post.brand?.charAt(0) || post.user?.displayName?.charAt(0) || '?'}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {post.user?.displayName || post.brand || 'Brand'}
              </h3>
              <p className="text-white/90 text-sm">
                {post.user?.handle || `@${(post.brand || 'brand').toLowerCase()}`}
              </p>
            </div>
          </div>

          {post.caption && position === 'front' && (
            <p className="text-sm mb-3 leading-relaxed line-clamp-2">
              {post.caption}
            </p>
          )}

          {post.hashtags && position === 'front' && (
            <div className="flex flex-wrap gap-2">
              {post.hashtags.slice(0, 3).map((tag, i) => (
                <span 
                  key={i} 
                  className="bg-white/25 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

                          {/* Botones de acción dinámicos - lado derecho */}
         {position === 'front' && (
           <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3">
             {/* Botón de Like */}
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               transition={{ duration: 0.15, ease: "easeOut" }}
               onClick={(e) => {
                 e.stopPropagation();
                 setIsExiting(true);
                 setExitDirection('right');
                 setTimeout(() => {
                   onSwipe('like', post.id);
                 }, 300);
               }}
               className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all ${
                 post.isLikedByUser 
                   ? 'bg-red-500 text-white' 
                   : 'bg-white/20 text-white hover:bg-red-500/20'
               }`}
             >
               <Heart className={`w-5 h-5 ${post.isLikedByUser ? 'fill-current' : ''}`} />
             </motion.button>

             {/* Botón de Comentarios */}
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               transition={{ duration: 0.15, ease: "easeOut" }}
               onClick={(e) => {
                 e.stopPropagation();
                 onShowComments(post);
               }}
               className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg relative"
             >
               <MessageCircle className="w-5 h-5" />
               {post.commentsCount > 0 && (
                 <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                   {post.commentsCount > 9 ? '9+' : post.commentsCount}
                 </div>
               )}
             </motion.button>
             
             {/* Botón de Guardar */}
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               transition={{ duration: 0.15, ease: "easeOut" }}
               onClick={(e) => {
                 e.stopPropagation();
                 setIsExiting(true);
                 setExitDirection('up');
                 setTimeout(() => {
                   onSwipe('save', post.id);
                 }, 300);
               }}
               className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all ${
                 post.isSavedByUser 
                   ? 'bg-blue-500 text-white' 
                   : 'bg-white/20 text-white hover:bg-blue-500/20'
               }`}
             >
               <Bookmark className={`w-5 h-5 ${post.isSavedByUser ? 'fill-current' : ''}`} />
             </motion.button>

             {/* Botón de Follow/Unfollow */}
             {post.userId !== user?.uid && (
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 transition={{ duration: 0.15, ease: "easeOut" }}
                 onClick={(e) => {
                   e.stopPropagation();
                   onFollowUser(post.userId);
                 }}
                 className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all ${
                   post.isFollowingUser 
                     ? 'bg-green-500 text-white' 
                     : 'bg-white/20 text-white hover:bg-green-500/20'
                 }`}
               >
                 {post.isFollowingUser ? (
                   <UserMinus className="w-5 h-5" />
                 ) : (
                   <UserPlus className="w-5 h-5" />
                 )}
               </motion.button>
             )}
           </div>
         )}
      </div>
    </motion.div>
  );
};

const TinderCardsContainer = ({ activeTab = 'siguiendo' }) => {
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  // Hook dinámico de datos
  const {
    cardStack,
    loading,
    error,
    showEmptyState,
    showNoRecommendations,
    hasCards,
    handleCardAction,
    handleFollowUser,
    refresh,
    totalPosts,
    remainingPosts
  } = useDynamicFeed(activeTab);

  // ==================== HANDLERS ====================

  const handleSwipe = (action, postId) => {
    handleCardAction(action, postId);
  };

  const handleShowComments = (post) => {
    setSelectedPost(post);
    setCommentsModalOpen(true);
  };

  const handleCloseComments = () => {
    setCommentsModalOpen(false);
    setSelectedPost(null);
  };

  // ==================== ESTADOS DE CARGA Y ERROR ====================

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="text-center mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h3 className="text-white text-lg mb-2 text-center">Cargando contenido...</h3>
          <p className="text-white/70 text-sm text-center">
            {activeTab === 'siguiendo' ? 'Buscando posts de tus seguidos' : 'Personalizando tu feed'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="text-center max-w-sm mx-auto">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-white text-lg mb-2 text-center">Error al cargar</h3>
          <p className="text-white/70 text-sm mb-4 text-center">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refresh}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all mx-auto block"
          >
            Reintentar
          </motion.button>
        </div>
      </div>
    );
  }

  if (showEmptyState) {
    return (
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="text-center max-w-sm mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white/50" />
          </div>
          <h3 className="text-white text-xl mb-3 text-center">¡Tu feed está vacío!</h3>
          <p className="text-white/70 text-sm mb-6 leading-relaxed text-center">
            Sigue a marcas y creadores para ver su contenido aquí. 
            Mientras tanto, explora la pestaña Inspiración.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {/* TODO: Navegar a búsqueda */}}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all mx-auto block"
          >
            Buscar cuentas
          </motion.button>
        </div>
      </div>
    );
  }

  if (showNoRecommendations) {
    return (
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="text-center max-w-sm mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-10 h-10 text-white/50" />
          </div>
          <h3 className="text-white text-xl mb-3 text-center">Construyendo tu perfil</h3>
          <p className="text-white/70 text-sm mb-6 leading-relaxed text-center">
            Interactúa con contenido (likes, comentarios, guardados) para que podamos 
            crear recomendaciones personalizadas para ti.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refresh}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all mx-auto block"
          >
            Actualizar
          </motion.button>
        </div>
      </div>
    );
  }

  if (!hasCards) {
    return (
      <div className="w-full h-full flex items-center justify-center px-4">
        <div className="text-center mx-auto">
          <h3 className="text-white text-xl mb-4 text-center">No hay más contenido</h3>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refresh}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all mx-auto block"
          >
            Recargar
          </motion.button>
        </div>
      </div>
    );
  }

     return (
     <>
       <div className="relative w-full h-full flex items-center justify-center p-2 md:p-4">
         {/* Cards Stack Container - Completamente dinámico */}
         <div className="relative w-full h-full">
           {cardStack.map((card, index) => (
             <StackCard
               key={card.id}
               post={card}
               position={card.stackPosition}
               onSwipe={handleSwipe}
               onShowComments={handleShowComments}
               onFollowUser={handleFollowUser}
             />
           ))}
         </div>

         {/* Indicador de tab con información dinámica */}
         <div className="absolute top-4 right-4 text-white/80 text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20">
           <div className="flex items-center space-x-2">
             <span>
               {activeTab === 'siguiendo' ? '👥 Siguiendo' : '✨ Inspiración'}
             </span>
             {totalPosts > 0 && (
               <span className="text-xs opacity-75">
                 {remainingPosts} restantes
               </span>
             )}
           </div>
         </div>

         {/* Indicador de algoritmo para Inspiración */}
         {activeTab === 'inspiracion' && cardStack.length > 0 && cardStack[0].recommendationReason && (
           <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white/80 text-xs px-4 py-2 rounded-full border border-white/20 text-center">
             💡 {cardStack[0].recommendationReason}
           </div>
         )}
       </div>

       {/* Modal de Comentarios */}
       <PostModal
         isOpen={commentsModalOpen}
         onClose={handleCloseComments}
         post={selectedPost}
       />
     </>
   );
};

export default TinderCardsContainer; 