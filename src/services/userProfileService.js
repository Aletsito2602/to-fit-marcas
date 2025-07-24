import { 
  collection, 
  doc, 
  getDoc,
  getDocs, 
  updateDoc,
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  serverTimestamp,
  addDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ==================== PERFIL DE USUARIO ====================

/**
 * Obtener datos completos del perfil de usuario
 */
export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'Usuario no encontrado' };
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Actualizar datos del perfil de usuario
 */
export const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener estadísticas del usuario (seguidores, seguidos, posts)
 */
export const getUserStats = async (userId) => {
  try {
    // Obtener cantidad de posts del usuario
    const postsQuery = query(
      collection(db, 'posts'),
      where('userId', '==', userId),
      where('isActive', '==', true)
    );
    const postsSnapshot = await getDocs(postsQuery);
    const postsCount = postsSnapshot.size;

    // Obtener seguidores
    const followersQuery = query(
      collection(db, 'follows'),
      where('followedUserId', '==', userId)
    );
    const followersSnapshot = await getDocs(followersQuery);
    const followersCount = followersSnapshot.size;

    // Obtener seguidos
    const followingQuery = query(
      collection(db, 'follows'),
      where('followerUserId', '==', userId)
    );
    const followingSnapshot = await getDocs(followingQuery);
    const followingCount = followingSnapshot.size;

    return {
      success: true,
      data: {
        posts: postsCount,
        followers: followersCount,
        following: followingCount
      }
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener posts del usuario con tiempo real
 */
export const getUserPosts = (userId, callback) => {
  try {
    const q = query(
      collection(db, 'posts'),
      where('userId', '==', userId),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, async (snapshot) => {
      const posts = [];
      
      for (const docSnap of snapshot.docs) {
        const postData = { id: docSnap.id, ...docSnap.data() };
        
        // Obtener estadísticas de interacciones para cada post
        const interactions = await getPostInteractions(postData.id);
        
        posts.push({
          ...postData,
          likesCount: interactions.likesCount,
          commentsCount: interactions.commentsCount,
          savesCount: interactions.savesCount,
          sharesCount: interactions.sharesCount
        });
      }
      
      callback(posts);
    });
  } catch (error) {
    console.error('Error getting user posts:', error);
    callback([]);
  }
};

/**
 * Obtener interacciones de un post específico
 */
export const getPostInteractions = async (postId) => {
  try {
    // Obtener likes
    const likesQuery = query(
      collection(db, 'interactions'),
      where('postId', '==', postId),
      where('type', '==', 'like')
    );
    const likesSnapshot = await getDocs(likesQuery);
    
    // Obtener comentarios
    const commentsQuery = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      where('isActive', '==', true)
    );
    const commentsSnapshot = await getDocs(commentsQuery);
    
    // Obtener guardados
    const savesQuery = query(
      collection(db, 'interactions'),
      where('postId', '==', postId),
      where('type', '==', 'save')
    );
    const savesSnapshot = await getDocs(savesQuery);
    
    // Obtener compartidos
    const sharesQuery = query(
      collection(db, 'interactions'),
      where('postId', '==', postId),
      where('type', '==', 'share')
    );
    const sharesSnapshot = await getDocs(sharesQuery);

    return {
      likesCount: likesSnapshot.size,
      commentsCount: commentsSnapshot.size,
      savesCount: savesSnapshot.size,
      sharesCount: sharesSnapshot.size
    };
  } catch (error) {
    console.error('Error getting post interactions:', error);
    return {
      likesCount: 0,
      commentsCount: 0,
      savesCount: 0,
      sharesCount: 0
    };
  }
};

/**
 * Verificar si el usuario actual está siguiendo a otro usuario
 */
export const isFollowingUser = async (currentUserId, targetUserId) => {
  try {
    const followQuery = query(
      collection(db, 'follows'),
      where('followerUserId', '==', currentUserId),
      where('followedUserId', '==', targetUserId)
    );
    const followSnapshot = await getDocs(followQuery);
    return followSnapshot.size > 0;
  } catch (error) {
    console.error('Error checking follow status:', error);
    return false;
  }
};

/**
 * Seguir/dejar de seguir a un usuario
 */
export const toggleFollowUser = async (currentUserId, targetUserId) => {
  try {
    const isFollowing = await isFollowingUser(currentUserId, targetUserId);
    
    if (isFollowing) {
      // Dejar de seguir
      const followQuery = query(
        collection(db, 'follows'),
        where('followerUserId', '==', currentUserId),
        where('followedUserId', '==', targetUserId)
      );
      const followSnapshot = await getDocs(followQuery);
      const followDoc = followSnapshot.docs[0];
      
      if (followDoc) {
        await deleteDoc(followDoc.ref);
      }
      
      return { success: true, isFollowing: false };
    } else {
      // Seguir
      await addDoc(collection(db, 'follows'), {
        followerUserId: currentUserId,
        followedUserId: targetUserId,
        createdAt: serverTimestamp()
      });
      
      return { success: true, isFollowing: true };
    }
  } catch (error) {
    console.error('Error toggling follow:', error);
    return { success: false, error: error.message };
  }
};

// ==================== DATOS MOCK PARA DESARROLLO ====================

/**
 * Función temporal para obtener datos mock mientras se implementa Firebase completo
 */
export const getMockUserProfile = () => {
  return {
    id: 'agostina-perez',
    name: "Agostina Perez",
    username: "@agostinabelenperez",
    bio: "CEO @ToFit - Asesora de imagen. Te ayudo a potenciar tu imagen!",
    location: "Misiones, Argentina",
    website: "tofit.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop",
    verified: true,
    isPrivate: false,
    createdAt: new Date('2023-01-15'),
    stats: {
      posts: 42,
      followers: 10500,
      following: 890
    }
  };
};

/**
 * Posts mock para desarrollo
 */
export const getMockUserPosts = () => {
  return [
    {
      id: 'post-1',
      userId: 'agostina-perez',
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
      caption: "Nuevo look para la oficina 💼✨ #WorkStyle #OOTD #ToFit",
      hashtags: ["#WorkStyle", "#OOTD", "#ToFit"],
      likesCount: 456,
      commentsCount: 23,
      savesCount: 67,
      sharesCount: 12,
      createdAt: new Date('2024-01-20'),
      isActive: true
    },
    {
      id: 'post-2',
      userId: 'agostina-perez',
      imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
      caption: "Domingo de shopping 🛍️ Encontré estas piezas increíbles",
      hashtags: ["#Shopping", "#Weekend", "#Fashion"],
      likesCount: 289,
      commentsCount: 15,
      savesCount: 34,
      sharesCount: 8,
      createdAt: new Date('2024-01-18'),
      isActive: true
    },
    {
      id: 'post-3',
      userId: 'agostina-perez',
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      caption: "Evento de moda en Buenos Aires 🎉 #FashionWeek",
      hashtags: ["#FashionWeek", "#BuenosAires", "#Event"],
      likesCount: 623,
      commentsCount: 41,
      savesCount: 89,
      sharesCount: 25,
      createdAt: new Date('2024-01-15'),
      isActive: true
    }
  ];
}; 