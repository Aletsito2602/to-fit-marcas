import { useState, useEffect, useCallback } from 'react';
import { useProducts, FirebaseProduct } from '../../../hooks/useProducts';
import { useTiendaActual, TiendaData } from '../../../hooks/useTiendaActual';
import { useAuth } from '../../../contexts/AuthContext';

// Mock data para categorías (se puede hacer dinámico después)
const mockCategorias = [
  {
    id: '1',
    nombre: 'Categorías',
    imagen: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=140&fit=crop',
    orden: 0,
    activa: true
  },
  {
    id: '2', 
    nombre: 'Zapatos',
    imagen: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=140&fit=crop',
    orden: 1,
    activa: true
  },
  {
    id: '3',
    nombre: 'Ropa',
    imagen: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&h=140&fit=crop',
    orden: 2,
    activa: true
  },
  {
    id: '4',
    nombre: 'Accesorios',
    imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=140&fit=crop',
    orden: 3,
    activa: true
  }
];

// Mock data para colección especial
const mockColeccionEspecial = {
  id: '1',
  titulo: 'Adidas X Pharrell',
  descripcion: 'Colección especial de colaboración',
  imagen_banner: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=200&fit=crop',
  activa: true
};

export const useMiTienda = () => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  
  // Obtener id_tienda del usuario para filtrar productos
  const userIdTienda = user?.id_tienda || null;
  
  // Usar hook existente de productos con filtro por tienda
  const { 
    products: productos, 
    loading: loadingProductos, 
    error: errorProductos,
    refreshProducts 
  } = useProducts(userIdTienda);
  
  // Usar hook existente de tienda actual
  const { 
    tienda, 
    loading: loadingTienda, 
    error: errorTienda,
    refreshTienda 
  } = useTiendaActual();

  // Estados combinados
  const loading = loadingProductos || loadingTienda;
  const error = errorProductos || errorTienda;

  // Función de refresh que actualiza todo
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refreshProducts(),
      refreshTienda()
    ]);
    setRefreshing(false);
  }, [refreshProducts, refreshTienda]);

  // Categorizar productos (simulando diferentes tipos)
  const productosDestacados = productos.slice(0, 2); // Primeros 2 como destacados
  const productosSugeridos = productos.slice(2, 6); // Siguientes 4 como sugeridos  
  const productosGeneral = productos.slice(6); // El resto como generales

  // Convertir productos de Firebase al formato esperado por los componentes
  const convertirProducto = (producto: FirebaseProduct) => ({
    id: producto.id,
    nombre: producto.nombre,
    precio: parseFloat(producto.precio?.toString().replace(/[^0-9.,]/g, '').replace(',', '.')) || 0,
    imagen: producto.portada || 'https://via.placeholder.com/175x210',
    categoria: producto.categoria,
    destacado: false,
    sugerido: false,
    nuevo: false,
    likes: producto.likes || [],
    guardados: [], // Se puede agregar después
    disponible: true,
    stock: 10 // Mock stock
  });

  return {
    // Datos principales
    tienda,
    productos: productos.map(convertirProducto),
    categorias: mockCategorias,
    coleccionEspecial: mockColeccionEspecial,
    
    // Estados
    loading,
    refreshing,
    error,
    
    // Acciones
    onRefresh,
    
    // Productos categorizados
    productosDestacados: productosDestacados.map(convertirProducto),
    productosSugeridos: productosSugeridos.map(convertirProducto),
    productosGeneral: productosGeneral.map(convertirProducto)
  };
};