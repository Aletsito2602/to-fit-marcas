import { useState, useEffect, useMemo } from 'react';
import { 
  mockPosts, 
  mockUsers, 
  mockUserInteractions, 
  algorithmConfig,
  categories,
  brands 
} from '../data/mockPosts';

// Hook principal para el algoritmo de recomendaciones
export const useRecommendationAlgorithm = (activeTab = 'siguiendo') => {
  const [userPreferences, setUserPreferences] = useState({
    categories: {},
    brands: {},
    interactions: mockUserInteractions
  });

  // Debug inicial
  console.log('🔍 useRecommendationAlgorithm - Init:', {
    activeTab,
    mockPostsLength: mockPosts.length,
    mockUsersLength: mockUsers.length,
    userPreferences
  });

  // Inicializar preferencias basadas en interacciones históricas
  useEffect(() => {
    console.log('🔄 Initializing user preferences...');
    const preferences = calculateUserPreferences(mockUserInteractions);
    setUserPreferences(prev => ({
      ...prev,
      categories: preferences.categories,
      brands: preferences.brands
    }));
  }, []);

  // Procesar posts según el tab activo
  const processedPosts = useMemo(() => {
    console.log('🎯 Processing posts for tab:', activeTab);
    
    let result;
    if (activeTab === 'siguiendo') {
      result = getFollowingFeed();
      console.log('👥 Following feed result:', result);
    } else {
      result = getInspirationFeed(userPreferences);
      console.log('✨ Inspiration feed result:', result);
    }
    
    return result;
  }, [activeTab, userPreferences]);

  // Función para registrar nueva interacción
  const recordInteraction = (postId, action) => {
    console.log('📝 Recording interaction:', { postId, action });
    
    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      console.warn('❌ Post not found for interaction:', postId);
      return;
    }

    const newInteraction = {
      postId,
      action,
      category: post.category,
      brand: post.brand.toLowerCase().replace(/\s+/g, '_'),
      timestamp: new Date()
    };

    setUserPreferences(prev => {
      const updatedInteractions = [...prev.interactions, newInteraction];
      const newPreferences = calculateUserPreferences(updatedInteractions);
      
      return {
        interactions: updatedInteractions,
        categories: newPreferences.categories,
        brands: newPreferences.brands
      };
    });
  };

  console.log('✅ useRecommendationAlgorithm - Returning:', {
    postsLength: processedPosts.length,
    processedPosts: processedPosts.slice(0, 3) // Solo los primeros 3 para debug
  });

  return {
    posts: processedPosts,
    userPreferences,
    recordInteraction,
    totalPosts: processedPosts.length
  };
};

// Calcular preferencias del usuario basadas en interacciones
const calculateUserPreferences = (interactions) => {
  console.log('🧮 Calculating user preferences from interactions:', interactions.length);
  
  const categoryScores = {};
  const brandScores = {};

  interactions.forEach(interaction => {
    const weight = getActionWeight(interaction.action);
    
    // Acumular scores por categoría
    categoryScores[interaction.category] = 
      (categoryScores[interaction.category] || 0) + weight;
    
    // Acumular scores por marca
    brandScores[interaction.brand] = 
      (brandScores[interaction.brand] || 0) + weight;
  });

  // Normalizar scores si hay datos
  const categoryValues = Object.values(categoryScores);
  const brandValues = Object.values(brandScores);
  
  const maxCategoryScore = Math.max(...categoryValues, 1); // Mínimo 1 para evitar división por 0
  const maxBrandScore = Math.max(...brandValues, 1);

  const normalizedCategories = {};
  Object.keys(categoryScores).forEach(category => {
    normalizedCategories[category] = categoryScores[category] / maxCategoryScore;
  });

  const normalizedBrands = {};
  Object.keys(brandScores).forEach(brand => {
    normalizedBrands[brand] = brandScores[brand] / maxBrandScore;
  });

  console.log('📊 Calculated preferences:', {
    categories: normalizedCategories,
    brands: normalizedBrands
  });

  return {
    categories: normalizedCategories,
    brands: normalizedBrands
  };
};

// Pesos según tipo de acción
const getActionWeight = (action) => {
  const weights = {
    'like': 1.0,
    'save': 1.5,
    'share': 1.3,
    'comment': 1.2,
    'pass': -0.5,
    'report': -2.0
  };
  return weights[action] || 0;
};

// Feed de usuarios seguidos
const getFollowingFeed = () => {
  console.log('👥 Getting following feed...');
  
  const followedUserIds = mockUsers
    .filter(user => user.isFollowed)
    .map(user => user.id);

  console.log('👥 Followed user IDs:', followedUserIds);

  const result = mockPosts
    .filter(post => followedUserIds.includes(post.userId))
    .map(post => enrichPost(post))
    .sort((a, b) => {
      // Priorizar por engagement y recencia
      const aScore = (a.engagement_score * 0.7) + (a.recency_score * 0.3);
      const bScore = (b.engagement_score * 0.7) + (b.recency_score * 0.3);
      return bScore - aScore;
    });

  console.log('👥 Following feed result:', result.length, 'posts');
  return result;
};

// Feed de inspiración con algoritmo inteligente
const getInspirationFeed = (userPreferences) => {
  console.log('✨ Getting inspiration feed with preferences:', userPreferences);
  
  const result = mockPosts
    .map(post => {
      const enrichedPost = enrichPost(post);
      const recommendationScore = calculateRecommendationScore(
        enrichedPost, 
        userPreferences
      );
      
      return {
        ...enrichedPost,
        recommendationScore
      };
    })
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .slice(0, 50) // Limitar a 50 posts top
    .sort(() => Math.random() - 0.5) // Añadir algo de randomización
    .slice(0, 20); // Tomar top 20 con diversidad

  console.log('✨ Inspiration feed result:', result.length, 'posts');
  return result;
};

// Enriquecer post con datos adicionales
const enrichPost = (post) => {
  const user = mockUsers.find(u => u.id === post.userId);
  const recency_score = calculateRecencyScore(post.createdAt);
  const popularity_score = calculatePopularityScore(post);

  return {
    ...post,
    user,
    recency_score,
    popularity_score
  };
};

// Calcular score de recomendación para inspiración
const calculateRecommendationScore = (post, userPreferences) => {
  const config = algorithmConfig.weights;
  
  // Score por categoría
  const categoryScore = userPreferences.categories[post.category] || 0.1; // Valor por defecto
  
  // Score por marca
  const brandKey = post.brand.toLowerCase().replace(/\s+/g, '_');
  const brandScore = userPreferences.brands[brandKey] || 0.1; // Valor por defecto
  
  // Boost si el usuario sigue al creador
  const followingBoost = post.user?.isFollowed 
    ? algorithmConfig.followingBoostMultiplier 
    : 1.0;
  
  // Score de popularidad normalizado
  const popularityScore = post.popularity_score;
  
  // Score de recencia
  const recencyScore = post.recency_score;
  
  // Calcular score final
  const baseScore = 
    (categoryScore * config.categoryPreference) +
    (brandScore * config.brandPreference) +
    (popularityScore * config.popularityScore) +
    (recencyScore * config.recencyBoost);
  
  // Aplicar boost de following
  const finalScore = baseScore * followingBoost;
  
  // Añadir factor de diversidad (anti echo-chamber)
  const diversityFactor = Math.random() * algorithmConfig.diversityFactor;
  
  return finalScore + diversityFactor;
};

// Calcular score de recencia (posts más nuevos = score más alto)
const calculateRecencyScore = (createdAt) => {
  const now = new Date();
  const hoursAgo = (now - new Date(createdAt)) / (1000 * 60 * 60);
  
  // Score decrece exponencialmente con el tiempo
  if (hoursAgo < 6) return 1.0;
  if (hoursAgo < 24) return 0.8;
  if (hoursAgo < 72) return 0.6;
  if (hoursAgo < 168) return 0.4; // 1 semana
  return 0.2;
};

// Calcular score de popularidad basado en engagement
const calculatePopularityScore = (post) => {
  const totalEngagement = post.likes + (post.comments * 3) + (post.saves * 5) + (post.shares * 4);
  
  // Normalizar basado en rangos típicos
  if (totalEngagement > 50000) return 1.0;
  if (totalEngagement > 20000) return 0.9;
  if (totalEngagement > 10000) return 0.8;
  if (totalEngagement > 5000) return 0.7;
  if (totalEngagement > 1000) return 0.6;
  if (totalEngagement > 500) return 0.5;
  return 0.3;
};

// Hook para obtener posts infinitos (simulación de paginación)
export const useInfiniteCards = (activeTab) => {
  const { posts, recordInteraction } = useRecommendationAlgorithm(activeTab);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardHistory, setCardHistory] = useState([]);

  console.log('🔄 useInfiniteCards:', {
    activeTab,
    postsLength: posts.length,
    currentIndex,
    firstPost: posts[0]
  });

  // Obtener siguiente card del stack
  const getNextCard = () => {
    if (currentIndex >= posts.length) {
      // Si llegamos al final, reshufflear con nuevos algoritmos
      setCurrentIndex(0);
      return posts[0];
    }
    return posts[currentIndex];
  };

  // Avanzar al siguiente post
  const nextCard = () => {
    setCurrentIndex(prev => (prev + 1) % posts.length);
  };

  // Registrar acción y avanzar
  const handleCardAction = (action, postId) => {
    console.log('🎮 handleCardAction:', { action, postId });
    recordInteraction(postId, action);
    setCardHistory(prev => [...prev, { postId, action, timestamp: new Date() }]);
    nextCard();
  };

  // Obtener stack de 3 cards
  const getCardStack = () => {
    const stack = [];
    for (let i = 0; i < Math.min(3, posts.length); i++) {
      const index = (currentIndex + i) % posts.length;
      if (posts[index]) {
        stack.push(posts[index]);
      }
    }
    console.log('📚 Card stack created:', stack.length, 'cards');
    return stack;
  };

  const cardStack = getCardStack();

  console.log('✅ useInfiniteCards - Returning:', {
    cardStackLength: cardStack.length,
    currentIndex,
    totalPosts: posts.length
  });

  return {
    cardStack,
    handleCardAction,
    currentIndex,
    totalPosts: posts.length,
    hasMore: currentIndex < posts.length - 1
  };
}; 