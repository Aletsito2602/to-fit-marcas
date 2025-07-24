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

// ==================== PROFESIONALES ====================

export const createProfesional = async (profesionalData) => {
  try {
    const docRef = await addDoc(collection(db, 'profesionales'), {
      ...profesionalData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      rating: 0,
      reviewCount: 0,
      totalReservations: 0,
      isActive: true,
      isVerified: false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating profesional:', error);
    return { success: false, error: error.message };
  }
};

export const updateProfesional = async (profesionalId, updateData) => {
  try {
    await updateDoc(doc(db, 'profesionales', profesionalId), {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating profesional:', error);
    return { success: false, error: error.message };
  }
};

export const getProfesionalById = async (profesionalId) => {
  try {
    const docSnap = await getDoc(doc(db, 'profesionales', profesionalId));
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: 'Profesional no encontrado' };
    }
  } catch (error) {
    console.error('Error getting profesional:', error);
    return { success: false, error: error.message };
  }
};

// ==================== SERVICIOS ====================

export const createServicio = async (servicioData) => {
  try {
    const docRef = await addDoc(collection(db, 'servicios'), {
      ...servicioData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      rating: 0,
      reviewCount: 0,
      totalBookings: 0,
      isActive: true,
      viewCount: 0,
      favoriteCount: 0
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating servicio:', error);
    return { success: false, error: error.message };
  }
};

export const updateServicio = async (servicioId, updateData) => {
  try {
    await updateDoc(doc(db, 'servicios', servicioId), {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating servicio:', error);
    return { success: false, error: error.message };
  }
};

export const incrementServiceView = async (servicioId) => {
  try {
    await updateDoc(doc(db, 'servicios', servicioId), {
      viewCount: increment(1)
    });
    return { success: true };
  } catch (error) {
    console.error('Error incrementing service view:', error);
    return { success: false, error: error.message };
  }
};

// ==================== FAVORITOS ====================

export const toggleFavoriteService = async (userId, servicioId) => {
  try {
    const favoritoId = `${userId}_${servicioId}`;
    const favoritoRef = doc(db, 'favoritos', favoritoId);
    const favoritoSnap = await getDoc(favoritoRef);

    if (favoritoSnap.exists()) {
      // Eliminar de favoritos
      await deleteDoc(favoritoRef);
      
      // Decrementar contador en el servicio
      await updateDoc(doc(db, 'servicios', servicioId), {
        favoriteCount: increment(-1)
      });
      
      return { success: true, action: 'removed' };
    } else {
      // Agregar a favoritos
      await addDoc(collection(db, 'favoritos'), {
        userId,
        servicioId,
        type: 'servicio',
        createdAt: serverTimestamp()
      });
      
      // Incrementar contador en el servicio
      await updateDoc(doc(db, 'servicios', servicioId), {
        favoriteCount: increment(1)
      });
      
      return { success: true, action: 'added' };
    }
  } catch (error) {
    console.error('Error toggling favorite service:', error);
    return { success: false, error: error.message };
  }
};

export const getUserFavoriteServices = async (userId) => {
  try {
    const q = query(
      collection(db, 'favoritos'),
      where('userId', '==', userId),
      where('type', '==', 'servicio'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const favoritos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: favoritos };
  } catch (error) {
    console.error('Error getting user favorite services:', error);
    return { success: false, error: error.message };
  }
};

// ==================== RESERVAS ====================

export const createReserva = async (reservaData) => {
  try {
    const docRef = await addDoc(collection(db, 'reservas'), {
      ...reservaData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'pendiente', // pendiente, confirmada, en_progreso, completada, cancelada
      isPaid: false
    });
    
    // Incrementar contador de reservas en el servicio
    await updateDoc(doc(db, 'servicios', reservaData.servicioId), {
      totalBookings: increment(1)
    });
    
    // Incrementar contador en el profesional
    await updateDoc(doc(db, 'profesionales', reservaData.profesionalId), {
      totalReservations: increment(1)
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating reserva:', error);
    return { success: false, error: error.message };
  }
};

export const updateReservaStatus = async (reservaId, newStatus) => {
  try {
    await updateDoc(doc(db, 'reservas', reservaId), {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating reserva status:', error);
    return { success: false, error: error.message };
  }
};

export const cancelReserva = async (reservaId, cancelReason = '') => {
  try {
    await updateDoc(doc(db, 'reservas', reservaId), {
      status: 'cancelada',
      cancelReason,
      canceledAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error canceling reserva:', error);
    return { success: false, error: error.message };
  }
};

// ==================== RESEÑAS ====================

export const createResena = async (resenaData) => {
  try {
    const docRef = await addDoc(collection(db, 'resenas'), {
      ...resenaData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isApproved: true, // Auto-approve por ahora
      helpfulCount: 0
    });
    
    // Actualizar rating del servicio
    await updateServiceRating(resenaData.servicioId);
    
    // Actualizar rating del profesional
    await updateProfesionalRating(resenaData.profesionalId);
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating resena:', error);
    return { success: false, error: error.message };
  }
};

const updateServiceRating = async (servicioId) => {
  try {
    const q = query(
      collection(db, 'resenas'),
      where('servicioId', '==', servicioId),
      where('isApproved', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    const resenas = querySnapshot.docs.map(doc => doc.data());
    
    if (resenas.length > 0) {
      const totalRating = resenas.reduce((sum, resena) => sum + resena.rating, 0);
      const averageRating = totalRating / resenas.length;
      
      await updateDoc(doc(db, 'servicios', servicioId), {
        rating: Math.round(averageRating * 10) / 10, // Redondear a 1 decimal
        reviewCount: resenas.length
      });
    }
  } catch (error) {
    console.error('Error updating service rating:', error);
  }
};

const updateProfesionalRating = async (profesionalId) => {
  try {
    const q = query(
      collection(db, 'resenas'),
      where('profesionalId', '==', profesionalId),
      where('isApproved', '==', true)
    );
    
    const querySnapshot = await getDocs(q);
    const resenas = querySnapshot.docs.map(doc => doc.data());
    
    if (resenas.length > 0) {
      const totalRating = resenas.reduce((sum, resena) => sum + resena.rating, 0);
      const averageRating = totalRating / resenas.length;
      
      await updateDoc(doc(db, 'profesionales', profesionalId), {
        rating: Math.round(averageRating * 10) / 10,
        reviewCount: resenas.length
      });
    }
  } catch (error) {
    console.error('Error updating profesional rating:', error);
  }
};

export const markResenaHelpful = async (resenaId) => {
  try {
    await updateDoc(doc(db, 'resenas', resenaId), {
      helpfulCount: increment(1)
    });
    return { success: true };
  } catch (error) {
    console.error('Error marking resena helpful:', error);
    return { success: false, error: error.message };
  }
};

// ==================== BÚSQUEDA Y FILTROS ====================

export const searchServicios = async (searchParams) => {
  try {
    const {
      query: searchQuery,
      categoria,
      ubicacion,
      fechaInicio,
      fechaFin,
      precioMin,
      precioMax,
      rating,
      sortBy = 'rating'
    } = searchParams;

    let q = collection(db, 'servicios');
    
    // Filtros básicos
    const constraints = [where('isActive', '==', true)];
    
    if (categoria) {
      constraints.push(where('categoria', '==', categoria));
    }
    
    if (ubicacion) {
      constraints.push(where('ubicacion.city', '==', ubicacion));
    }
    
    if (precioMin !== undefined) {
      constraints.push(where('price', '>=', precioMin));
    }
    
    if (precioMax !== undefined) {
      constraints.push(where('price', '<=', precioMax));
    }
    
    if (rating) {
      constraints.push(where('rating', '>=', rating));
    }
    
    // Aplicar ordenamiento
    const orderByField = sortBy === 'price' ? 'price' : 'rating';
    const orderDirection = sortBy === 'price' ? 'asc' : 'desc';
    constraints.push(orderBy(orderByField, orderDirection));
    
    q = query(q, ...constraints, limit(50));
    
    const querySnapshot = await getDocs(q);
    const servicios = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, data: servicios };
  } catch (error) {
    console.error('Error searching servicios:', error);
    return { success: false, error: error.message };
  }
};

// ==================== ALGORITMO DE RECOMENDACIONES ====================

export const getRecommendedServices = async (userId, userPreferences = {}) => {
  try {
    // Obtener historial del usuario
    const userHistoryQ = query(
      collection(db, 'reservas'),
      where('userId', '==', userId),
      where('status', '==', 'completada'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const historySnapshot = await getDocs(userHistoryQ);
    const userHistory = historySnapshot.docs.map(doc => doc.data());
    
    // Extraer categorías preferidas
    const categoriasCounts = {};
    userHistory.forEach(reserva => {
      const categoria = reserva.categoria;
      categoriasCounts[categoria] = (categoriasCounts[categoria] || 0) + 1;
    });
    
    // Obtener servicios recomendados basados en preferencias
    let recommendations = [];
    
    if (Object.keys(categoriasCounts).length > 0) {
      // Recomendar basado en historial
      const topCategoria = Object.keys(categoriasCounts).reduce((a, b) => 
        categoriasCounts[a] > categoriasCounts[b] ? a : b
      );
      
      const recommendedQ = query(
        collection(db, 'servicios'),
        where('isActive', '==', true),
        where('categoria', '==', topCategoria),
        where('rating', '>=', 4),
        orderBy('rating', 'desc'),
        limit(6)
      );
      
      const recommendedSnapshot = await getDocs(recommendedQ);
      recommendations = recommendedSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        recommendationReason: `Te gusta ${topCategoria}`
      }));
    } else {
      // Recomendar servicios populares
      const popularQ = query(
        collection(db, 'servicios'),
        where('isActive', '==', true),
        where('rating', '>=', 4.5),
        orderBy('rating', 'desc'),
        orderBy('reviewCount', 'desc'),
        limit(6)
      );
      
      const popularSnapshot = await getDocs(popularQ);
      recommendations = popularSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        recommendationReason: 'Servicio popular'
      }));
    }
    
    return { success: true, data: recommendations };
  } catch (error) {
    console.error('Error getting recommended services:', error);
    return { success: false, error: error.message };
  }
};

// ==================== ANALYTICS ====================

export const trackServiceInteraction = async (eventData) => {
  try {
    await addDoc(collection(db, 'analytics_servicios'), {
      ...eventData,
      timestamp: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error tracking service interaction:', error);
    return { success: false, error: error.message };
  }
};

export const trackServiceView = async (userId, servicioId, profesionalId) => {
  return trackServiceInteraction({
    eventType: 'view',
    userId,
    servicioId,
    profesionalId
  });
};

export const trackServiceContact = async (userId, servicioId, profesionalId, contactMethod) => {
  return trackServiceInteraction({
    eventType: 'contact',
    userId,
    servicioId,
    profesionalId,
    contactMethod
  });
};

export const trackServiceBooking = async (userId, servicioId, profesionalId) => {
  return trackServiceInteraction({
    eventType: 'booking',
    userId,
    servicioId,
    profesionalId
  });
}; 