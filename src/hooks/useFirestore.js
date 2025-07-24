import { useState, useEffect, useMemo } from 'react'
import { 
  collection, 
  onSnapshot, 
  where, 
  query, 
  orderBy, 
  limit,
  doc,
  getDoc,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from '../config/firebase'

// Hook principal para cualquier colección de Firestore
export const useFirestoreCollection = (collectionName, filters = [], orderByField = null, limitCount = null) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      let q = collection(db, collectionName)
      
      // Aplicar filtros
      filters.forEach(filter => {
        q = query(q, where(filter.field, filter.operator, filter.value))
      })
      
      // Aplicar ordenamiento
      if (orderByField) {
        q = query(q, orderBy(orderByField.field, orderByField.direction || 'desc'))
      }
      
      // Aplicar límite
      if (limitCount) {
        q = query(q, limit(limitCount))
      }

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const docs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convertir timestamps a Date objects
            created_at: doc.data().created_at?.toDate(),
            updated_at: doc.data().updated_at?.toDate()
          }))
          setData(docs)
          setLoading(false)
        },
        (err) => {
          console.error(`Error fetching ${collectionName}:`, err)
          setError(err)
          setLoading(false)
        }
      )

      return unsubscribe
    } catch (err) {
      console.error(`Error setting up listener for ${collectionName}:`, err)
      setError(err)
      setLoading(false)
    }
  }, [collectionName, JSON.stringify(filters), JSON.stringify(orderByField), limitCount])

  return { data, loading, error }
}

// Hook específico para marcas activas
export const useMarcas = () => {
  return useFirestoreCollection('marcas', [
    { field: 'isActive', operator: '==', value: true }
  ], { field: 'created_at', direction: 'desc' })
}

// Hook específico para productos publicados
export const useProductos = (marcaId = null) => {
  const filters = [
    { field: 'isPublished', operator: '==', value: true }
  ]
  
  if (marcaId) {
    filters.push({ field: 'marca_id', operator: '==', value: marcaId })
  }
  
  return useFirestoreCollection('productos', filters, { field: 'created_at', direction: 'desc' })
}

// Hook específico para publicaciones destacadas
export const usePublicaciones = (isFeatured = false) => {
  const filters = [
    { field: 'isActive', operator: '==', value: true }
  ]
  
  if (isFeatured) {
    filters.push({ field: 'isFeatured', operator: '==', value: true })
  }
  
  return useFirestoreCollection('publicaciones', filters, { field: 'created_at', direction: 'desc' }, 10)
}

// Hook específico para tiendas activas
export const useTiendas = () => {
  return useFirestoreCollection('tiendas', [
    { field: 'isActive', operator: '==', value: true }
  ])
}

// Hook específico para categorías de tienda
export const useCategoriasTienda = () => {
  return useFirestoreCollection('categorias_tienda', [
    { field: 'isActive', operator: '==', value: true }
  ], { field: 'orden', direction: 'asc' })
}

// Hook específico para influencers verificados
export const useInfluencers = () => {
  return useFirestoreCollection('users', [
    { field: 'role', operator: '==', value: 'influencer' },
    { field: 'isVerified', operator: '==', value: true },
    { field: 'isActive', operator: '==', value: true }
  ])
}

// Hook específico para posts de looks
export const useLookPosts = () => {
  return useFirestoreCollection('posts', [
    { field: 'type', operator: '==', value: 'look' },
    { field: 'isActive', operator: '==', value: true }
  ], { field: 'engagement_score', direction: 'desc' })
}

// Hook específico para promociones generales
export const useShopPromotions = () => {
  return useFirestoreCollection('shop_general_promotions', [
    { field: 'isActive', operator: '==', value: true },
    { field: 'expires_at', operator: '>', value: new Date() }
  ], { field: 'priority', direction: 'desc' })
}

// Hook para pedidos de un usuario específico
export const usePedidosUser = (userId) => {
  const filters = userId ? [
    { field: 'user_id', operator: '==', value: userId }
  ] : []
  
  return useFirestoreCollection('pedidos', filters, { field: 'created_at', direction: 'desc' })
}

// Hook específico para historias activas
export const useHistorias = () => {
  return useFirestoreCollection('historias', [
    { field: 'isActive', operator: '==', value: true }
  ], { field: 'created_at', direction: 'desc' })
}

// Hook para obtener un documento específico
export const useFirestoreDocument = (collectionName, documentId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!documentId) {
      setLoading(false)
      return
    }

    const docRef = doc(db, collectionName, documentId)
    
    const unsubscribe = onSnapshot(docRef,
      (doc) => {
        if (doc.exists()) {
          setData({
            id: doc.id,
            ...doc.data(),
            created_at: doc.data().created_at?.toDate(),
            updated_at: doc.data().updated_at?.toDate()
          })
        } else {
          setData(null)
        }
        setLoading(false)
      },
      (err) => {
        console.error(`Error fetching document ${documentId} from ${collectionName}:`, err)
        setError(err)
        setLoading(false)
      }
    )

    return unsubscribe
  }, [collectionName, documentId])

  return { data, loading, error }
}

// Hook combinado para datos de la tienda
export const useShopData = (currentUser = null) => {
  const { data: marcas, loading: loadingMarcas, error: errorMarcas } = useMarcas()
  const { data: productos, loading: loadingProductos, error: errorProductos } = useProductos()
  const { data: publicaciones, loading: loadingPublicaciones, error: errorPublicaciones } = usePublicaciones()
  const { data: tiendas, loading: loadingTiendas, error: errorTiendas } = useTiendas()
  const { data: categorias, loading: loadingCategorias, error: errorCategorias } = useCategoriasTienda()
  const { data: influencers, loading: loadingInfluencers, error: errorInfluencers } = useInfluencers()
  const { data: lookPosts, loading: loadingLookPosts, error: errorLookPosts } = useLookPosts()
  const { data: promotions, loading: loadingPromotions, error: errorPromotions } = useShopPromotions()
  const { data: userPedidos, loading: loadingUserPedidos, error: errorUserPedidos } = usePedidosUser(currentUser?.id)

  const isLoading = loadingMarcas || loadingProductos || loadingPublicaciones || 
                   loadingTiendas || loadingCategorias || loadingInfluencers ||
                   loadingLookPosts || loadingPromotions || loadingUserPedidos

  const hasError = errorMarcas || errorProductos || errorPublicaciones || 
                  errorTiendas || errorCategorias || errorInfluencers ||
                  errorLookPosts || errorPromotions || errorUserPedidos

  return {
    // Datos
    marcas,
    productos,
    publicaciones,
    tiendas,
    categorias,
    influencers,
    lookPosts,
    promotions,
    userPedidos,
    
    // Estados
    isLoading,
    hasError,
    
    // Estados individuales para debugging
    loading: {
      marcas: loadingMarcas,
      productos: loadingProductos,
      publicaciones: loadingPublicaciones,
      tiendas: loadingTiendas,
      categorias: loadingCategorias,
      influencers: loadingInfluencers,
      lookPosts: loadingLookPosts,
      promotions: loadingPromotions,
      userPedidos: loadingUserPedidos
    },
    
    errors: {
      marcas: errorMarcas,
      productos: errorProductos,
      publicaciones: errorPublicaciones,
      tiendas: errorTiendas,
      categorias: errorCategorias,
      influencers: errorInfluencers,
      lookPosts: errorLookPosts,
      promotions: errorPromotions,
      userPedidos: errorUserPedidos
    }
  }
} 

// Hook específico para profesionales de servicios verificados
export const useProfesionales = (filters = []) => {
  const defaultFilters = [
    { field: 'isActive', operator: '==', value: true }
  ];
  
  const allFilters = [...defaultFilters, ...filters];
  
  return useFirestoreCollection('profesionales', allFilters, { field: 'rating', direction: 'desc' });
};

// Hook específico para servicios por profesional
export const useServiciosPorProfesional = (profesionalId) => {
  const filters = profesionalId ? [
    { field: 'profesionalId', operator: '==', value: profesionalId },
    { field: 'isActive', operator: '==', value: true }
  ] : [{ field: 'isActive', operator: '==', value: true }];
  
  return useFirestoreCollection('servicios', filters, { field: 'created_at', direction: 'desc' });
};

// Hook específico para reseñas de servicios
export const useResenasServicios = (servicioId) => {
  const filters = servicioId ? [
    { field: 'servicioId', operator: '==', value: servicioId },
    { field: 'isApproved', operator: '==', value: true }
  ] : [{ field: 'isApproved', operator: '==', value: true }];
  
  return useFirestoreCollection('resenas', filters, { field: 'created_at', direction: 'desc' });
};

// Hook específico para reservas del usuario
export const useReservasUser = (userId) => {
  const filters = userId ? [
    { field: 'userId', operator: '==', value: userId }
  ] : [];
  
  return useFirestoreCollection('reservas', filters, { field: 'fechaServicio', direction: 'desc' });
};

// Hook específico para categorías de servicios
export const useCategoriasServicios = () => {
  return useFirestoreCollection('categorias_servicios', [
    { field: 'isActive', operator: '==', value: true }
  ], { field: 'order', direction: 'asc' });
};

// Hook específico para favoritos del usuario
export const useFavoritosUser = (userId) => {
  const filters = userId ? [
    { field: 'userId', operator: '==', value: userId },
    { field: 'type', operator: '==', value: 'servicio' }
  ] : [];
  
  return useFirestoreCollection('favoritos', filters, { field: 'created_at', direction: 'desc' });
};

// Hook combinado para datos completos de servicios
export const useServiciosData = (currentUser = null) => {
  const { data: profesionales, loading: loadingProfesionales, error: errorProfesionales } = useProfesionales();
  const { data: servicios, loading: loadingServicios, error: errorServicios } = useServiciosPorProfesional();
  const { data: categorias, loading: loadingCategorias, error: errorCategorias } = useCategoriasServicios();
  const { data: reservasUser, loading: loadingReservas, error: errorReservas } = useReservasUser(currentUser?.id);
  const { data: favoritosUser, loading: loadingFavoritos, error: errorFavoritos } = useFavoritosUser(currentUser?.id);

  const isLoading = loadingProfesionales || loadingServicios || loadingCategorias || 
                   loadingReservas || loadingFavoritos;

  const hasError = errorProfesionales || errorServicios || errorCategorias || 
                  errorReservas || errorFavoritos;

  return {
    // Datos
    profesionales,
    servicios,
    categorias,
    reservasUser,
    favoritosUser,
    
    // Estados
    isLoading,
    hasError,
    
    // Estados individuales para debugging
    loading: {
      profesionales: loadingProfesionales,
      servicios: loadingServicios,
      categorias: loadingCategorias,
      reservas: loadingReservas,
      favoritos: loadingFavoritos
    },
    
    errors: {
      profesionales: errorProfesionales,
      servicios: errorServicios,
      categorias: errorCategorias,
      reservas: errorReservas,
      favoritos: errorFavoritos
    }
  };
}; 