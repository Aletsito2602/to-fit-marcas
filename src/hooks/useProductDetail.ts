import { useState, useEffect } from 'react';
import { doc, getDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { FirebaseProduct } from './useProducts';

export interface ProductGalleryImage {
  id: string;
  foto: string;
  orden: number;
  es_portada: boolean;
  fecha_subida: any;
}

export interface ProductDetailData {
  product: FirebaseProduct | null;
  galleryImages: ProductGalleryImage[];
  hasGallery: boolean;
}

export const useProductDetail = (productId: string) => {
  const [productData, setProductData] = useState<ProductDetailData>({
    product: null,
    galleryImages: [],
    hasGallery: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const loadProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar el producto principal
        console.log('Loading product:', productId);
        const productRef = doc(db, 'productos', productId);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          setError('Producto no encontrado');
          setLoading(false);
          return;
        }

        const productData = {
          id: productSnap.id,
          ...productSnap.data()
        } as FirebaseProduct;

        console.log('Product loaded:', productData.nombre);

        // Cargar galería de fotos (subcolección)
        console.log('=== GALLERY DEBUG ===');
        console.log('Product ID:', productId);
        console.log('Gallery path:', `productos/${productId}/galeria_fotos`);
        
        const galleryRef = collection(db, 'productos', productId, 'galeria_fotos');
        // Primero intentamos sin orderBy para evitar problemas de índice
        const galleryQuery = galleryRef;

        // Suscribirse a cambios en la galería
        const unsubscribe = onSnapshot(galleryQuery,
          (gallerySnapshot) => {
            console.log('Gallery snapshot received');
            console.log('Gallery docs count:', gallerySnapshot.docs.length);
            
            const galleryImages = gallerySnapshot.docs.map(doc => {
              const data = doc.data();
              console.log('Gallery image doc:', doc.id, data);
              return {
                id: doc.id,
                ...data
              };
            }) as ProductGalleryImage[];

            // Ordenar por el campo orden
            galleryImages.sort((a, b) => (a.orden || 0) - (b.orden || 0));

            console.log(`Gallery images processed: ${galleryImages.length}`);
            console.log('Gallery images:', galleryImages);
            
            setProductData({
              product: productData,
              galleryImages: galleryImages,
              hasGallery: galleryImages.length > 0
            });
            
            setLoading(false);
          },
          (err) => {
            console.error('Error loading gallery:', err);
            console.error('Gallery error details:', err.message);
            // Aunque falle la galería, mostrar el producto sin galería
            setProductData({
              product: productData,
              galleryImages: [],
              hasGallery: false
            });
            setLoading(false);
          }
        );

        return unsubscribe;

      } catch (error) {
        console.error('Error loading product detail:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
        setLoading(false);
      }
    };

    const unsubscribe = loadProductDetail();

    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [productId]);

  // Función para obtener todas las imágenes (portada + galería)
  const getAllImages = (): string[] => {
    const images: string[] = [];
    
    // Agregar portada principal
    if (productData.product?.portada) {
      images.push(productData.product.portada);
    }
    
    // Agregar imágenes de galería ordenadas
    const sortedGallery = productData.galleryImages
      .filter(img => img.foto && !img.es_portada) // Excluir la portada si está en galería
      .sort((a, b) => a.orden - b.orden)
      .map(img => img.foto);
    
    images.push(...sortedGallery);
    
    return images;
  };

  // Función para verificar si necesita agregar fotos
  const needsMorePhotos = (): boolean => {
    const totalImages = getAllImages().length;
    return totalImages <= 1; // Solo tiene portada o ninguna imagen
  };

  return {
    ...productData,
    loading,
    error,
    getAllImages,
    needsMorePhotos
  };
};