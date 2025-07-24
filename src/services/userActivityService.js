import { 
  collection, 
  doc, 
  getDoc,
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ==================== ACTIVIDAD DEL USUARIO ====================

/**
 * Obtener estadísticas completas de actividad del usuario
 */
export const getUserActivityStats = async (userId) => {
  try {
    // Obtener likes dados por el usuario
    const likesQuery = query(
      collection(db, 'interactions'),
      where('userId', '==', userId),
      where('type', '==', 'like')
    );
    const likesSnapshot = await getDocs(likesQuery);
    const likesGiven = likesSnapshot.size;

    // Obtener comentarios escritos por el usuario
    const commentsQuery = query(
      collection(db, 'comments'),
      where('userId', '==', userId),
      where('isActive', '==', true)
    );
    const commentsSnapshot = await getDocs(commentsQuery);
    const commentsWritten = commentsSnapshot.size;

    // Obtener posts guardados por el usuario
    const savesQuery = query(
      collection(db, 'interactions'),
      where('userId', '==', userId),
      where('type', '==', 'save')
    );
    const savesSnapshot = await getDocs(savesQuery);
    const postsSaved = savesSnapshot.size;

    // Obtener posts del usuario
    const postsQuery = query(
      collection(db, 'posts'),
      where('userId', '==', userId),
      where('isActive', '==', true)
    );
    const postsSnapshot = await getDocs(postsQuery);
    const postsCreated = postsSnapshot.size;

    // Obtener likes recibidos en posts del usuario
    let likesReceived = 0;
    const userPosts = postsSnapshot.docs.map(doc => doc.data());
    userPosts.forEach(post => {
      likesReceived += post.likesCount || 0;
    });

    // Obtener comentarios recibidos en posts del usuario
    let commentsReceived = 0;
    userPosts.forEach(post => {
      commentsReceived += post.commentsCount || 0;
    });

    return {
      success: true,
      data: {
        // Actividad dada
        likesGiven,
        commentsWritten,
        postsSaved,
        postsCreated,
        
        // Actividad recibida
        likesReceived,
        commentsReceived,
        
        // Métricas calculadas
        totalActivity: likesGiven + commentsWritten + postsSaved + postsCreated,
        engagementReceived: likesReceived + commentsReceived,
        averageLikesPerPost: postsCreated > 0 ? Math.round(likesReceived / postsCreated) : 0
      }
    };
  } catch (error) {
    console.error('Error getting user activity stats:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener posts que el usuario ha marcado como favoritos (likes)
 */
export const getUserLikedPosts = (userId, callback) => {
  try {
    // Primero obtener las interacciones de likes del usuario
    const likesQuery = query(
      collection(db, 'interactions'),
      where('userId', '==', userId),
      where('type', '==', 'like'),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(likesQuery, async (likesSnapshot) => {
      const likedPostIds = likesSnapshot.docs.map(doc => doc.data().postId);
      
      if (likedPostIds.length === 0) {
        callback([]);
        return;
      }

      // Obtener los posts completos
      const likedPosts = [];
      for (const postId of likedPostIds) {
        try {
          const postDoc = await getDoc(doc(db, 'posts', postId));
          if (postDoc.exists() && postDoc.data().isActive) {
            likedPosts.push({
              id: postDoc.id,
              ...postDoc.data()
            });
          }
        } catch (error) {
          console.error('Error fetching liked post:', error);
        }
      }
      
      callback(likedPosts);
    });
  } catch (error) {
    console.error('Error getting user liked posts:', error);
    callback([]);
  }
};

/**
 * Obtener posts que el usuario ha guardado
 */
export const getUserSavedPosts = (userId, callback) => {
  try {
    // Primero obtener las interacciones de saves del usuario
    const savesQuery = query(
      collection(db, 'interactions'),
      where('userId', '==', userId),
      where('type', '==', 'save'),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(savesQuery, async (savesSnapshot) => {
      const savedPostIds = savesSnapshot.docs.map(doc => doc.data().postId);
      
      if (savedPostIds.length === 0) {
        callback([]);
        return;
      }

      // Obtener los posts completos
      const savedPosts = [];
      for (const postId of savedPostIds) {
        try {
          const postDoc = await getDoc(doc(db, 'posts', postId));
          if (postDoc.exists() && postDoc.data().isActive) {
            savedPosts.push({
              id: postDoc.id,
              ...postDoc.data()
            });
          }
        } catch (error) {
          console.error('Error fetching saved post:', error);
        }
      }
      
      callback(savedPosts);
    });
  } catch (error) {
    console.error('Error getting user saved posts:', error);
    callback([]);
  }
};

/**
 * Actualizar métricas de actividad en el perfil del usuario
 */
export const updateUserActivityMetrics = async (userId) => {
  try {
    const activityStats = await getUserActivityStats(userId);
    
    if (activityStats.success) {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        activityMetrics: activityStats.data,
        lastActivityUpdate: serverTimestamp()
      });
      
      return { success: true };
    }
    
    return { success: false, error: 'Failed to get activity stats' };
  } catch (error) {
    console.error('Error updating user activity metrics:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtener historial de actividad reciente del usuario
 */
export const getUserRecentActivity = async (userId, limitCount = 50) => {
  try {
    const activities = [];

    // Obtener interacciones recientes (likes, saves)
    const interactionsQuery = query(
      collection(db, 'interactions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const interactionsSnapshot = await getDocs(interactionsQuery);
    
    for (const interactionDoc of interactionsSnapshot.docs) {
      const interaction = interactionDoc.data();
      
      // Obtener datos del post
      try {
        const postDoc = await getDoc(doc(db, 'posts', interaction.postId));
        if (postDoc.exists()) {
          activities.push({
            id: interactionDoc.id,
            type: interaction.type,
            createdAt: interaction.createdAt,
            post: {
              id: postDoc.id,
              ...postDoc.data()
            }
          });
        }
      } catch (error) {
        console.error('Error fetching post for activity:', error);
      }
    }

    // Obtener comentarios recientes
    const commentsQuery = query(
      collection(db, 'comments'),
      where('userId', '==', userId),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const commentsSnapshot = await getDocs(commentsQuery);
    
    for (const commentDoc of commentsSnapshot.docs) {
      const comment = commentDoc.data();
      
      // Obtener datos del post
      try {
        const postDoc = await getDoc(doc(db, 'posts', comment.postId));
        if (postDoc.exists()) {
          activities.push({
            id: commentDoc.id,
            type: 'comment',
            createdAt: comment.createdAt,
            content: comment.content,
            post: {
              id: postDoc.id,
              ...postDoc.data()
            }
          });
        }
      } catch (error) {
        console.error('Error fetching post for comment activity:', error);
      }
    }

    // Ordenar todas las actividades por fecha
    activities.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.toDate() - a.createdAt.toDate();
    });

    return {
      success: true,
      data: activities.slice(0, limitCount)
    };
  } catch (error) {
    console.error('Error getting user recent activity:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sincronizar métricas de actividad cuando el usuario realiza una acción
 */
export const syncUserActivityOnAction = async (userId, actionType) => {
  try {
    // Incrementar contador específico en tiempo real
    const userRef = doc(db, 'users', userId);
    
    const updates = {
      lastActivityUpdate: serverTimestamp()
    };
    
    switch (actionType) {
      case 'like':
        updates['activityMetrics.likesGiven'] = increment(1);
        break;
      case 'unlike':
        updates['activityMetrics.likesGiven'] = increment(-1);
        break;
      case 'comment':
        updates['activityMetrics.commentsWritten'] = increment(1);
        break;
      case 'save':
        updates['activityMetrics.postsSaved'] = increment(1);
        break;
      case 'unsave':
        updates['activityMetrics.postsSaved'] = increment(-1);
        break;
      case 'post':
        updates['activityMetrics.postsCreated'] = increment(1);
        break;
      default:
        console.warn('Unknown action type:', actionType);
    }
    
    await updateDoc(userRef, updates);
    
    return { success: true };
  } catch (error) {
    console.error('Error syncing user activity:', error);
    return { success: false, error: error.message };
  }
}; 