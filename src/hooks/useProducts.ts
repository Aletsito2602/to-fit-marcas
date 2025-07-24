import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface FirebaseProduct {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: string;
  tienda: string;
  id_tienda: string;
  logo_tienda: string;
  color: string[];
  talles: string[];
  portada: string;
  likes: string[];
  fecha_creado: any;
}

export interface ProductStats {
  total: number;
  active: number;
  outOfStock: number;
}

export const useProducts = (userIdTienda?: string) => {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [productStats, setProductStats] = useState<ProductStats>({
    total: 0,
    active: 0,
    outOfStock: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Crear query para obtener productos filtrados por tienda del usuario
    let productsQuery;
    
    if (userIdTienda) {
      // Filtrar solo productos de la tienda del usuario autenticado
      console.log('=== FILTRO POR TIENDA ===');
      console.log('ID de tienda del usuario:', userIdTienda);
      
      productsQuery = query(
        collection(db, 'productos'),
        where('id_tienda', '==', userIdTienda),
        orderBy('fecha_creado', 'desc'),
        limit(100)
      );
    } else {
      // Mostrar todos los productos (modo anterior)
      console.log('=== MOSTRANDO TODOS LOS PRODUCTOS ===');
      
      productsQuery = query(
        collection(db, 'productos'),
        orderBy('fecha_creado', 'desc'),
        limit(100)
      );
    }

    let unsubscribe: () => void;

    const setupSubscription = (queryToUse: any) => {
      return onSnapshot(queryToUse,
        (snapshot) => {
          const productsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as FirebaseProduct[];
          
          // Debug: revisar la estructura de los productos
          console.log('=== PRODUCTOS DEBUG ===');
          console.log(`Total productos encontrados: ${productsData.length}`);
          console.log(`Filtro aplicado para id_tienda: ${userIdTienda || 'ninguno'}`);
          
          // Revisar los primeros productos para detectar problemas
          productsData.slice(0, 3).forEach((product, index) => {
            console.log(`Producto ${index + 1}:`, {
              id: product.id,
              nombre: product.nombre,
              id_tienda: product.id_tienda,
              tienda: product.tienda,
              color: product.color,
              colorIsArray: Array.isArray(product.color),
              talles: product.talles,
              tallesIsArray: Array.isArray(product.talles)
            });
          });
          console.log('=====================');
          
          setProducts(productsData);
          
          // Calcular estadísticas
          const stats = {
            total: productsData.length,
            active: productsData.length, // Asumiendo que todos están activos por ahora
            outOfStock: 0 // Firebase no tiene stock definido aún
          };
          setProductStats(stats);
          
          setLoading(false);
          console.log(`Productos cargados: ${productsData.length}`);
        },
        (err) => {
          console.error('Error loading products:', err);
          
          // Si el error es por índice en construcción, usar fallback temporal
          if (err.message && err.message.includes('index is currently building')) {
            console.log('=== ÍNDICE EN CONSTRUCCIÓN - USANDO FALLBACK ===');
            console.log('El índice se está construyendo. Cargando todos los productos temporalmente...');
            
            // Fallback: cargar todos los productos y filtrar en cliente
            const fallbackQuery = query(
              collection(db, 'productos'),
              orderBy('fecha_creado', 'desc'),
              limit(100)
            );
            
            unsubscribe = onSnapshot(fallbackQuery,
              (fallbackSnapshot) => {
                let fallbackData = fallbackSnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
                })) as FirebaseProduct[];
                
                // Filtrar en cliente si tenemos userIdTienda
                if (userIdTienda) {
                  fallbackData = fallbackData.filter(product => product.id_tienda === userIdTienda);
                  console.log(`Productos filtrados en cliente para ${userIdTienda}: ${fallbackData.length}`);
                }
                
                setProducts(fallbackData);
                const stats = {
                  total: fallbackData.length,
                  active: fallbackData.length,
                  outOfStock: 0
                };
                setProductStats(stats);
                setLoading(false);
              },
              (fallbackErr) => {
                console.error('Error en fallback:', fallbackErr);
                setError(fallbackErr.message);
                setLoading(false);
              }
            );
          } else {
            setError(err.message);
            setLoading(false);
          }
        }
      );
    };

    unsubscribe = setupSubscription(productsQuery);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userIdTienda]);

  const refreshProducts = () => {
    setLoading(true);
    setError(null);
    // La suscripción se reactivará automáticamente
  };

  // Función para filtrar productos
  const filterProducts = (products: FirebaseProduct[], searchText: string, filter: string) => {
    return products.filter(product => {
      // Validar que los campos existan antes de usarlos
      const nombre = product.nombre || '';
      const descripcion = product.descripcion || '';
      const tienda = product.tienda || '';
      
      const matchesSearch = nombre.toLowerCase().includes(searchText.toLowerCase()) ||
                          descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
                          tienda.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesFilter = filter === 'Todos' || 
        (filter === 'Activos') || // Todos están activos por ahora
        (filter === 'Sin stock'); // No hay productos sin stock aún
      
      return matchesSearch && matchesFilter;
    });
  };

  return {
    products,
    productStats,
    loading,
    error,
    refreshProducts,
    filterProducts
  };
};