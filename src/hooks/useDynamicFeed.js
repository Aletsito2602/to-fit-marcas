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

// Mock data para posts de "Siguiendo"
const mockFollowingPosts = [
  {
    id: 'following-1',
    userId: 'sofia_fashion',
    username: '@sofia_fashion',
    displayName: 'Sofia Martinez',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=150&h=150&fit=crop&crop=face',
    verified: true,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
    caption: 'Nuevo look para la oficina ✨ Combinar elegancia con comodidad es posible! #OOTD #WorkStyle',
    tags: ['#OOTD', '#WorkStyle', '#Elegante'],
    likesCount: 234,
    commentsCount: 18,
    savesCount: 45,
    createdAt: new Date('2024-01-20T10:30:00'),
    isLikedByUser: false,
    isSavedByUser: false,
    isFollowingUser: true
  },
  {
    id: 'following-2',
    userId: 'valentina_style',
    username: '@valentina_style',
    displayName: 'Valentina Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    verified: false,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop',
    caption: 'Domingo de shopping 🛍️ Encontré estas piezas increíbles en el centro!',
    tags: ['#Shopping', '#Weekend', '#Fashion'],
    likesCount: 189,
    commentsCount: 12,
    savesCount: 32,
    createdAt: new Date('2024-01-18T15:45:00'),
    isLikedByUser: true,
    isSavedByUser: false,
    isFollowingUser: true
  },
  {
    id: 'following-3',
    userId: 'camila_outfits',
    username: '@camila_outfits',
    displayName: 'Camila Torres',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    verified: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
    caption: 'Look casual para el fin de semana 🌸 A veces lo simple es lo más hermoso',
    tags: ['#Casual', '#Weekend', '#Simple'],
    likesCount: 156,
    commentsCount: 9,
    savesCount: 28,
    createdAt: new Date('2024-01-17T12:20:00'),
    isLikedByUser: false,
    isSavedByUser: true,
    isFollowingUser: true
  },
  {
    id: 'following-4',
    userId: 'ana_trends',
    username: '@ana_trends',
    displayName: 'Ana Gutierrez',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    verified: false,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop',
    caption: 'Probando esta nueva tendencia en suéteres oversized 💫 ¿Qué opinan?',
    tags: ['#Oversized', '#Trends', '#Cozy'],
    likesCount: 203,
    commentsCount: 15,
    savesCount: 41,
    createdAt: new Date('2024-01-16T09:15:00'),
    isLikedByUser: true,
    isSavedByUser: false,
    isFollowingUser: true
  },
  {
    id: 'following-5',
    userId: 'lucia_vintage',
    username: '@lucia_vintage',
    displayName: 'Lucia Morales',
    avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=150&h=150&fit=crop&crop=face',
    verified: true,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=800&fit=crop',
    caption: 'Vintage vibes nunca pasan de moda ✨ Este conjunto de los 90s es perfecto',
    tags: ['#Vintage', '#90s', '#Retro'],
    likesCount: 267,
    commentsCount: 22,
    savesCount: 58,
    createdAt: new Date('2024-01-15T18:30:00'),
    isLikedByUser: false,
    isSavedByUser: true,
    isFollowingUser: true
  }
];

// Mock data para posts de "Inspiración"
const mockInspirationPosts = [
  {
    id: 'inspiration-1',
    userId: 'fashion_guru',
    username: '@fashion_guru',
    displayName: 'Fashion Guru',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    verified: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=800&fit=crop',
    caption: 'Tendencias 2024: Los colores que marcarán la temporada 🎨 ¿Cuál es tu favorito?',
    tags: ['#Trends2024', '#Colors', '#Fashion'],
    likesCount: 892,
    commentsCount: 67,
    savesCount: 143,
    createdAt: new Date('2024-01-19T09:15:00'),
    isLikedByUser: false,
    isSavedByUser: false,
    isFollowingUser: false
  },
  {
    id: 'inspiration-2',
    userId: 'street_style_ba',
    username: '@street_style_ba',
    displayName: 'Street Style BA',
    avatar: 'https://images.unsplash.com/photo-1502767089025-6572583495b7?w=150&h=150&fit=crop&crop=face',
    verified: false,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
    caption: 'Street style en las calles de Buenos Aires 🇦🇷 La moda urbana que nos inspira',
    tags: ['#StreetStyle', '#BuenosAires', '#Urban'],
    likesCount: 445,
    commentsCount: 23,
    savesCount: 89,
    createdAt: new Date('2024-01-16T16:30:00'),
    isLikedByUser: true,
    isSavedByUser: true,
    isFollowingUser: false
  },
  {
    id: 'inspiration-3',
    userId: 'minimal_chic',
    username: '@minimal_chic',
    displayName: 'Minimal Chic',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    verified: true,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop',
    caption: 'Less is more ✨ El poder del minimalismo en la moda contemporánea',
    tags: ['#Minimalism', '#LessIsMore', '#Contemporary'],
    likesCount: 623,
    commentsCount: 41,
    savesCount: 127,
    createdAt: new Date('2024-01-15T14:10:00'),
    isLikedByUser: false,
    isSavedByUser: false,
    isFollowingUser: false
  },
  {
    id: 'inspiration-4',
    userId: 'eco_fashion',
    username: '@eco_fashion',
    displayName: 'Eco Fashion',
    avatar: 'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=150&h=150&fit=crop&crop=face',
    verified: false,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d06?w=600&h=800&fit=crop',
    caption: 'Moda sostenible: Cuidando el planeta con estilo 🌱 Cada elección cuenta',
    tags: ['#SustainableFashion', '#EcoFriendly', '#GreenStyle'],
    likesCount: 378,
    commentsCount: 31,
    savesCount: 76,
    createdAt: new Date('2024-01-14T11:25:00'),
    isLikedByUser: false,
    isSavedByUser: true,
    isFollowingUser: false
  },
  {
    id: 'inspiration-5',
    userId: 'color_theory',
    username: '@color_theory',
    displayName: 'Color Theory',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face',
    verified: true,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop',
    caption: 'El arte de combinar colores: Rosa y beige, una combinación que nunca falla 🎨',
    tags: ['#ColorTheory', '#Pink', '#Beige'],
    likesCount: 512,
    commentsCount: 38,
    savesCount: 94,
    createdAt: new Date('2024-01-13T13:45:00'),
    isLikedByUser: true,
    isSavedByUser: false,
    isFollowingUser: false
  },
  {
    id: 'inspiration-6',
    userId: 'business_casual',
    username: '@business_casual',
    displayName: 'Business Casual',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=150&h=150&fit=crop&crop=face',
    verified: false,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=800&fit=crop',
    caption: 'Elevator tu look de oficina sin perder profesionalismo 💼 Detalles que marcan la diferencia',
    tags: ['#BusinessCasual', '#Office', '#Professional'],
    likesCount: 298,
    commentsCount: 19,
    savesCount: 67,
    createdAt: new Date('2024-01-12T10:20:00'),
    isLikedByUser: false,
    isSavedByUser: true,
    isFollowingUser: false
  },
  {
    id: 'inspiration-7',
    userId: 'night_out',
    username: '@night_out',
    displayName: 'Night Out Style',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face',
    verified: true,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
    caption: 'Ready for the night ✨ Brillar sin ser demasiado es todo un arte',
    tags: ['#NightOut', '#Glam', '#Party'],
    likesCount: 756,
    commentsCount: 52,
    savesCount: 148,
    createdAt: new Date('2024-01-11T20:15:00'),
    isLikedByUser: true,
    isSavedByUser: true,
    isFollowingUser: false
  }
];

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
          try {
            newPosts = await getFeedPosts(followingIds, 20);
          } catch (error) {
            console.log('Error loading following posts, using mock data:', error);
            newPosts = [];
          }
        }
        
        // Si no hay posts de Firebase, usar datos mock
        if (newPosts.length === 0) {
          console.log('🎭 Usando datos mock para Following posts');
          newPosts = mockFollowingPosts;
        }
      } else if (activeTab === 'inspiracion') {
        // Posts recomendados por el algoritmo
        try {
          newPosts = await getRecommendationsPosts(user.uid, user.preferences);
        } catch (error) {
          console.log('Error loading inspiration posts, using mock data:', error);
          newPosts = [];
        }
        
        // Si no hay posts de Firebase, usar datos mock
        if (newPosts.length === 0) {
          console.log('🎭 Usando datos mock para Inspiration posts');
          newPosts = mockInspirationPosts;
        }
      }

      // Agregar información de interacción del usuario actual
      const postsWithUserInteraction = newPosts.map(post => ({
        ...post,
        isLikedByUser: post.likedBy?.includes(user.uid) || post.isLikedByUser || false,
        isSavedByUser: post.savedBy?.includes(user.uid) || post.isSavedByUser || false,
        isFollowingUser: user.following?.includes(post.userId) || post.isFollowingUser || false
      }));

      setPosts(postsWithUserInteraction);
      setCurrentIndex(0);
      setHasMore(postsWithUserInteraction.length >= 20);

    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Error al cargar el contenido. Inténtalo de nuevo.');
      
      // Como último recurso, usar datos mock
      const fallbackPosts = activeTab === 'siguiendo' ? mockFollowingPosts : mockInspirationPosts;
      setPosts(fallbackPosts);
      setCurrentIndex(0);
      setHasMore(false);
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