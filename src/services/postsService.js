import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  increment,
  arrayUnion,
  arrayRemove,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { syncUserActivityOnAction } from './userActivityService';

// ==================== POSTS ====================

export const getPostById = async (postId) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    
    if (postSnap.exists()) {
      return { 
        success: true, 
        data: { 
          id: postSnap.id, 
          ...postSnap.data() 
        } 
      };
    } else {
      return { success: false, error: 'Post not found' };
    }
  } catch (error) {
    console.error('Error getting post:', error);
    return { success: false, error: error.message };
  }
};

export const createPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...postData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likesCount: 0,
      commentsCount: 0,
      savesCount: 0,
      sharesCount: 0,
      isActive: true
    });

    // ✅ SINCRONIZAR MÉTRICAS DE ACTIVIDAD
    if (postData.userId) {
      await syncUserActivityOnAction(postData.userId, 'post');
    }

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, error: error.message };
  }
};

export const getPostsByUser = async (userId) => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('userId', '==', userId),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user posts:', error);
    return [];
  }
};

export const getFeedPosts = async (followingIds, limit = 20) => {
  try {
    if (!followingIds.length) return [];
    
    const q = query(
      collection(db, 'posts'),
      where('userId', 'in', followingIds),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting feed posts:', error);
    return [];
  }
};

// ==================== INTERACCIONES ====================

export const likePost = async (postId, userId) => {
  try {
    const interactionRef = doc(collection(db, 'interactions'));
    const postRef = doc(db, 'posts', postId);
    
    // Crear interacción
    await addDoc(collection(db, 'interactions'), {
      postId,
      userId,
      type: 'like',
      createdAt: serverTimestamp()
    });
    
    // Incrementar contador en el post
    await updateDoc(postRef, {
      likesCount: increment(1),
      likedBy: arrayUnion(userId)
    });

    // ✅ SINCRONIZAR MÉTRICAS DE ACTIVIDAD
    await syncUserActivityOnAction(userId, 'like');
    
    return { success: true };
  } catch (error) {
    console.error('Error liking post:', error);
    return { success: false, error: error.message };
  }
};

export const unlikePost = async (postId, userId) => {
  try {
    const postRef = doc(db, 'posts', postId);
    
    // Encontrar y eliminar la interacción
    const q = query(
      collection(db, 'interactions'),
      where('postId', '==', postId),
      where('userId', '==', userId),
      where('type', '==', 'like')
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      await deleteDoc(doc(db, 'interactions', snapshot.docs[0].id));
    }
    
    // Decrementar contador en el post
    await updateDoc(postRef, {
      likesCount: increment(-1),
      likedBy: arrayRemove(userId)
    });

    // ✅ SINCRONIZAR MÉTRICAS DE ACTIVIDAD
    await syncUserActivityOnAction(userId, 'unlike');
    
    return { success: true };
  } catch (error) {
    console.error('Error unliking post:', error);
    return { success: false, error: error.message };
  }
};

export const savePost = async (postId, userId) => {
  try {
    await addDoc(collection(db, 'interactions'), {
      postId,
      userId,
      type: 'save',
      createdAt: serverTimestamp()
    });
    
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      savesCount: increment(1),
      savedBy: arrayUnion(userId)
    });

    // ✅ SINCRONIZAR MÉTRICAS DE ACTIVIDAD
    await syncUserActivityOnAction(userId, 'save');
    
    return { success: true };
  } catch (error) {
    console.error('Error saving post:', error);
    return { success: false, error: error.message };
  }
};

export const unsavePost = async (postId, userId) => {
  try {
    // Encontrar y eliminar la interacción de guardado
    const q = query(
      collection(db, 'interactions'),
      where('postId', '==', postId),
      where('userId', '==', userId),
      where('type', '==', 'save')
    );
    const snapshot = await getDocs(q);
    
    // Eliminar todas las interacciones de guardado encontradas
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Actualizar el contador en el post
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      savesCount: increment(-1),
      savedBy: arrayRemove(userId)
    });

    // ✅ SINCRONIZAR MÉTRICAS DE ACTIVIDAD
    await syncUserActivityOnAction(userId, 'unsave');
    
    return { success: true };
  } catch (error) {
    console.error('Error unsaving post:', error);
    return { success: false, error: error.message };
  }
};

// ==================== COMENTARIOS ====================

export const addComment = async (postId, userId, content, userDisplayName, userAvatar) => {
  try {
    const commentRef = await addDoc(collection(db, 'comments'), {
      postId,
      userId,
      content,
      userDisplayName,
      userAvatar,
      createdAt: serverTimestamp(),
      likesCount: 0,
      isActive: true
    });
    
    // Incrementar contador de comentarios en el post
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      commentsCount: increment(1)
    });

    // ✅ SINCRONIZAR MÉTRICAS DE ACTIVIDAD
    await syncUserActivityOnAction(userId, 'comment');
    
    return { success: true, id: commentRef.id };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { success: false, error: error.message };
  }
};

export const getComments = (postId, callback) => {
  try {
    const q = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(comments);
    });
  } catch (error) {
    console.error('Error getting comments:', error);
    callback([]);
  }
};

// ==================== ALGORITMO DE RECOMENDACIONES ====================

export const getRecommendationsPosts = async (userId, userPreferences = {}) => {
  try {
    // 1. Obtener interacciones del usuario
    const userInteractions = await getUserInteractions(userId);
    
    // 2. Analizar preferencias basadas en actividad
    const preferences = await analyzeUserPreferences(userId, userInteractions);
    
    // 3. Obtener posts recomendados basados en el análisis
    const recommendedPosts = await getPostsByPreferences(preferences, userId);
    
    return recommendedPosts;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};

const getUserInteractions = async (userId) => {
  try {
    const q = query(
      collection(db, 'interactions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(100) // Últimas 100 interacciones
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user interactions:', error);
    return [];
  }
};

const analyzeUserPreferences = async (userId, interactions) => {
  try {
    const preferences = {
      brands: {},
      categories: {},
      colors: {},
      styles: {},
      priceRanges: {},
      interactions: {
        likes: 0,
        saves: 0,
        comments: 0
      }
    };
    
    // Analizar cada interacción
    for (const interaction of interactions) {
      const postDoc = await getDoc(doc(db, 'posts', interaction.postId));
      if (!postDoc.exists()) continue;
      
      const post = postDoc.data();
      const weight = getInteractionWeight(interaction.type);
      
      // Incrementar preferencias por marca
      if (post.brand) {
        preferences.brands[post.brand] = (preferences.brands[post.brand] || 0) + weight;
      }
      
      // Incrementar preferencias por categoría
      if (post.category) {
        preferences.categories[post.category] = (preferences.categories[post.category] || 0) + weight;
      }
      
      // Incrementar preferencias por estilo
      if (post.style) {
        preferences.styles[post.style] = (preferences.styles[post.style] || 0) + weight;
      }
      
      // Contar tipos de interacción
      preferences.interactions[interaction.type]++;
    }
    
    return preferences;
  } catch (error) {
    console.error('Error analyzing preferences:', error);
    return {};
  }
};

const getInteractionWeight = (type) => {
  const weights = {
    'like': 1,
    'save': 3,
    'comment': 5,
    'share': 2
  };
  return weights[type] || 1;
};

const getPostsByPreferences = async (preferences, userId) => {
  try {
    const recommendedPosts = [];
    
    // 1. Posts de marcas preferidas
    const topBrands = Object.keys(preferences.brands || {})
      .sort((a, b) => preferences.brands[b] - preferences.brands[a])
      .slice(0, 5);
    
    for (const brand of topBrands) {
      const q = query(
        collection(db, 'posts'),
        where('brand', '==', brand),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        recommendationReason: `Te gusta ${brand}`
      }));
      recommendedPosts.push(...posts);
    }
    
    // 2. Posts de categorías preferidas
    const topCategories = Object.keys(preferences.categories || {})
      .sort((a, b) => preferences.categories[b] - preferences.categories[a])
      .slice(0, 3);
    
    for (const category of topCategories) {
      const q = query(
        collection(db, 'posts'),
        where('category', '==', category),
        where('isActive', '==', true),
        orderBy('likesCount', 'desc'),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        recommendationReason: `Basado en tu interés en ${category}`
      }));
      recommendedPosts.push(...posts);
    }
    
    // 3. Posts populares generales (fallback)
    const q = query(
      collection(db, 'posts'),
      where('isActive', '==', true),
      orderBy('likesCount', 'desc'),
      limit(20)
    );
    const snapshot = await getDocs(q);
    const popularPosts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      recommendationReason: 'Trending ahora'
    }));
    recommendedPosts.push(...popularPosts);
    
    // Eliminar duplicados y posts del propio usuario
    const uniquePosts = recommendedPosts
      .filter((post, index, self) => 
        index === self.findIndex(p => p.id === post.id) && 
        post.userId !== userId
      )
      .slice(0, 50); // Máximo 50 posts recomendados
    
    return shuffleArray(uniquePosts);
  } catch (error) {
    console.error('Error getting posts by preferences:', error);
    return [];
  }
};

// Utilidad para mezclar array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ==================== SEGUIMIENTOS ====================

export const followUser = async (currentUserId, targetUserId) => {
  try {
    // Agregar a la lista de siguiendo del usuario actual
    const currentUserRef = doc(db, 'users', currentUserId);
    await updateDoc(currentUserRef, {
      following: arrayUnion(targetUserId),
      followingCount: increment(1)
    });
    
    // Agregar a la lista de seguidores del usuario objetivo
    const targetUserRef = doc(db, 'users', targetUserId);
    await updateDoc(targetUserRef, {
      followers: arrayUnion(currentUserId),
      followersCount: increment(1)
    });
    
    // Crear registro de follow
    await addDoc(collection(db, 'follows'), {
      followerId: currentUserId,
      followingId: targetUserId,
      createdAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error following user:', error);
    return { success: false, error: error.message };
  }
};

export const unfollowUser = async (currentUserId, targetUserId) => {
  try {
    // Remover de la lista de siguiendo del usuario actual
    const currentUserRef = doc(db, 'users', currentUserId);
    await updateDoc(currentUserRef, {
      following: arrayRemove(targetUserId),
      followingCount: increment(-1)
    });
    
    // Remover de la lista de seguidores del usuario objetivo
    const targetUserRef = doc(db, 'users', targetUserId);
    await updateDoc(targetUserRef, {
      followers: arrayRemove(currentUserId),
      followersCount: increment(-1)
    });
    
    // Eliminar registro de follow
    const q = query(
      collection(db, 'follows'),
      where('followerId', '==', currentUserId),
      where('followingId', '==', targetUserId)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      await deleteDoc(doc(db, 'follows', snapshot.docs[0].id));
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return { success: false, error: error.message };
  }
}; 