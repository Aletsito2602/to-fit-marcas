import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export interface TiendaData {
  id: string;
  alias_marca: string;
  id_marca: string;
  logo: string;
  nombre: string;
  seguidores: string[];
}

export const useTiendaActual = () => {
  const [tienda, setTienda] = useState<TiendaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const cargarTienda = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user) {
          setError('Usuario no autenticado');
          setLoading(false);
          return;
        }

        // Obtener id_tienda del usuario (desde el campo id_tienda en Users)
        const userIdTienda = user?.id_tienda || null;
        
        console.log('=== CARGAR TIENDA DEBUG ===');
        console.log('Usuario:', user?.display_name);
        console.log('ID tienda del usuario:', user?.id_tienda);
        console.log('ID tienda para consulta:', userIdTienda);

        if (!userIdTienda) {
          setError('Usuario sin tienda configurada');
          setLoading(false);
          return;
        }

        // Buscar marca que coincida con id_tienda del usuario
        const marcasRef = collection(db, 'marcas');
        const q = query(marcasRef, where('id_marca', '==', userIdTienda));
        
        console.log('Consultando marcas con id_marca:', userIdTienda);
        
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('No se encontró marca para id_marca:', userIdTienda);
          setError('Tienda no encontrada en la base de datos');
        } else {
          const marcaDoc = querySnapshot.docs[0];
          const marcaData = {
            id: marcaDoc.id,
            ...marcaDoc.data()
          } as TiendaData;
          
          console.log('Marca encontrada:', marcaData);
          setTienda(marcaData);
        }
      } catch (err) {
        console.error('Error al cargar tienda:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar tienda');
      } finally {
        setLoading(false);
      }
    };

    cargarTienda();
  }, [user]);

  const refreshTienda = () => {
    setLoading(true);
    setError(null);
    // El useEffect se ejecutará nuevamente
  };

  return { 
    tienda, 
    loading, 
    error,
    refreshTienda,
    // Helper para obtener el número de seguidores
    seguidoresCount: tienda?.seguidores?.length || 0
  };
};