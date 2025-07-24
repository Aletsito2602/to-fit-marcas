import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  getFeedPosts, 
  getRecommendationsPosts, 
  likePost, 
  unlikePost, 
  savePost,
  followUser,
  unfollowUser
} from '../services/postsService';

export const useDynamicFeed = (activeTab = 'siguiendo') => {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ==================== CARGA INICIAL ====================

  const loadPosts = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      let newPosts = [];

      if (activeTab === 'siguiendo') {
        // Posts de usuarios que sigue
        const followingIds = user.following || [];
        if (followingIds.length > 0) {
          newPosts = await getFeedPosts(followingIds, 20);
        }
      } else if (activeTab === 'inspiracion') {
        // Posts recomendados por el algoritmo
        newPosts = await getRecommendationsPosts(user.uid, user.preferences);
      }

      // Agregar información de interacción del usuario actual
      const postsWithUserInteraction = await Promise.all(
        newPosts.map(async (post) => ({
          ...post,
          isLikedByUser: post.likedBy?.includes(user.uid) || false,
          isSavedByUser: post.savedBy?.includes(user.uid) || false,
          isFollowingUser: user.following?.includes(post.userId) || false
        }))
      );

      setPosts(postsWithUserInteraction);
      setCurrentIndex(0);
      setHasMore(postsWithUserInteraction.length >= 20);

    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Error al cargar el contenido. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [user, activeTab]);

  // ==================== EFECTOS ====================

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Recargar cuando cambie el tab
  useEffect(() => {
    if (user) {
      loadPosts();
    }
  }, [activeTab, user, loadPosts]);

  // ==================== ACCIONES DE CARDS ====================

  const handleCardAction = useCallback(async (action, postId) => {
    if (!user) return;

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      switch (action) {
        case 'like':
          if (!post.isLikedByUser) {
            await likePost(postId, user.uid);
            // Actualizar estado local inmediatamente
            setPosts(prev => prev.map(p => 
              p.id === postId 
                ? { 
                    ...p, 
                    isLikedByUser: true, 
                    likesCount: (p.likesCount || 0) + 1,
                    likedBy: [...(p.likedBy || []), user.uid]
                  }
                : p
            ));
          } else {
            await unlikePost(postId, user.uid);
            // Actualizar estado local inmediatamente
            setPosts(prev => prev.map(p => 
              p.id === postId 
                ? { 
                    ...p, 
                    isLikedByUser: false, 
                    likesCount: Math.max((p.likesCount || 1) - 1, 0),
                    likedBy: (p.likedBy || []).filter(id => id !== user.uid)
                  }
                : p
            ));
          }
          break;

        case 'save':
          if (!post.isSavedByUser) {
            await savePost(postId, user.uid);
            // Actualizar estado local
            setPosts(prev => prev.map(p => 
              p.id === postId 
                ? { 
                    ...p, 
                    isSavedByUser: true, 
                    savesCount: (p.savesCount || 0) + 1,
                    savedBy: [...(p.savedBy || []), user.uid]
                  }
                : p
            ));
          }
          break;

        case 'pass':
          // Simplemente pasar a la siguiente card
          break;

        default:
          console.warn('Acción no reconocida:', action);
      }

      // Avanzar al siguiente post
      setCurrentIndex(prev => prev + 1);

      // Verificar si necesitamos cargar más posts
      if (currentIndex >= posts.length - 3 && hasMore) {
        await loadMorePosts();
      }

    } catch (err) {
      console.error('Error handling card action:', err);
      setError('Error al procesar la acción. Inténtalo de nuevo.');
    }
  }, [user, posts, currentIndex, hasMore]);

  // ==================== CARGAR MÁS POSTS ====================

  const loadMorePosts = useCallback(async () => {
    if (!user || loading) return;

    try {
      let newPosts = [];

      if (activeTab === 'siguiendo') {
        const followingIds = user.following || [];
        if (followingIds.length > 0) {
          // TODO: Implementar paginación real con lastDoc
          newPosts = await getFeedPosts(followingIds, 10);
        }
      } else if (activeTab === 'inspiracion') {
        newPosts = await getRecommendationsPosts(user.uid, user.preferences);
      }

      if (newPosts.length > 0) {
        const postsWithUserInteraction = await Promise.all(
          newPosts.map(async (post) => ({
            ...post,
            isLikedByUser: post.likedBy?.includes(user.uid) || false,
            isSavedByUser: post.savedBy?.includes(user.uid) || false,
            isFollowingUser: user.following?.includes(post.userId) || false
          }))
        );

        // Filtrar posts duplicados
        const uniqueNewPosts = postsWithUserInteraction.filter(
          newPost => !posts.some(existingPost => existingPost.id === newPost.id)
        );

        setPosts(prev => [...prev, ...uniqueNewPosts]);
        setHasMore(uniqueNewPosts.length >= 10);
      } else {
        setHasMore(false);
      }

    } catch (err) {
      console.error('Error loading more posts:', err);
    }
  }, [user, posts, activeTab, loading]);

  // ==================== ACCIONES DE USUARIO ====================

  const handleFollowUser = useCallback(async (targetUserId) => {
    if (!user) return;

    try {
      const isCurrentlyFollowing = user.following?.includes(targetUserId);
      
      if (isCurrentlyFollowing) {
        await unfollowUser(user.uid, targetUserId);
        // Actualizar estado local del usuario
        useAuthStore.getState().updateUser({
          following: (user.following || []).filter(id => id !== targetUserId),
          followingCount: Math.max((user.followingCount || 1) - 1, 0)
        });
      } else {
        await followUser(user.uid, targetUserId);
        // Actualizar estado local del usuario
        useAuthStore.getState().updateUser({
          following: [...(user.following || []), targetUserId],
          followingCount: (user.followingCount || 0) + 1
        });
      }

      // Actualizar estado local de los posts
      setPosts(prev => prev.map(p => 
        p.userId === targetUserId 
          ? { ...p, isFollowingUser: !isCurrentlyFollowing }
          : p
      ));

    } catch (err) {
      console.error('Error following/unfollowing user:', err);
      setError('Error al seguir usuario. Inténtalo de nuevo.');
    }
  }, [user]);

  // ==================== STACK DE CARDS ====================

  const getStackCards = useCallback(() => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const cardIndex = currentIndex + i;
      if (cardIndex < posts.length) {
        cards.push({
          ...posts[cardIndex],
          stackPosition: i === 0 ? 'front' : i === 1 ? 'backLeft' : 'backRight'
        });
      }
    }
    return cards;
  }, [posts, currentIndex]);

  // ==================== UTILIDADES ====================

  const refresh = useCallback(() => {
    setCurrentIndex(0);
    setPosts([]);
    setError(null);
    loadPosts();
  }, [loadPosts]);

  const hasCards = posts.length > 0;
  const isLastCard = currentIndex >= posts.length - 1;
  const cardStack = getStackCards();

  // ==================== ESTADOS COMPUTED ====================

  const isEmpty = !loading && posts.length === 0;
  const showEmptyState = isEmpty && activeTab === 'siguiendo';
  const showNoRecommendations = isEmpty && activeTab === 'inspiracion';

  return {
    // Datos
    cardStack,
    posts,
    currentIndex,
    
    // Estados
    loading,
    error,
    hasMore,
    isEmpty,
    showEmptyState,
    showNoRecommendations,
    hasCards,
    isLastCard,
    
    // Acciones
    handleCardAction,
    handleFollowUser,
    refresh,
    loadMorePosts,
    
    // Metadatos
    totalPosts: posts.length,
    remainingPosts: Math.max(posts.length - currentIndex, 0)
  };
}; 