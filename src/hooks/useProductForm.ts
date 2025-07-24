import { useState, useEffect } from 'react';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { FirebaseProduct } from './useProducts';
import { uploadImageToStorage, generateImagePath } from '../utils/imageUpload';

export interface ProductFormData {
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: string;
  color: string[];
  talles: string[];
  portada: string;
  // Datos de la tienda (se asignarán automáticamente)
  tienda: string;
  id_tienda: string;
  logo_tienda: string;
}

export const useProductForm = (productId?: string) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ProductFormData>({
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: '',
    color: [],
    talles: [],
    portada: '',
    tienda: '',
    id_tienda: '',
    logo_tienda: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userStores, setUserStores] = useState<any[]>([]);

  const isEditing = !!productId;

  // Cargar tiendas del usuario
  useEffect(() => {
    if (user) {
      // TODO: Implementar carga de tiendas del usuario
      // Por ahora, usar datos mock basados en el usuario actual
      const mockStores = [
        {
          id_tienda: user.id_tienda || 'store1',
          nombre: user.display_name || 'Mi Tienda',
          logo_tienda: user.photo_url || ''
        }
      ];
      setUserStores(mockStores);
      
      // Si no está editando, asignar la primera tienda por defecto
      if (!isEditing && mockStores.length > 0) {
        setFormData(prev => ({
          ...prev,
          tienda: mockStores[0].nombre,
          id_tienda: mockStores[0].id_tienda,
          logo_tienda: mockStores[0].logo_tienda
        }));
      }
    }
  }, [user, isEditing]);

  // Cargar producto para editar
  useEffect(() => {
    if (isEditing && productId) {
      loadProduct(productId);
    }
  }, [isEditing, productId]);

  const loadProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const productRef = doc(db, 'productos', id);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        setError('Producto no encontrado');
        return;
      }

      const productData = productSnap.data() as FirebaseProduct;
      console.log('Product loaded for editing:', productData);

      setFormData({
        nombre: productData.nombre || '',
        descripcion: productData.descripcion || '',
        categoria: productData.categoria || '',
        precio: productData.precio || '',
        color: Array.isArray(productData.color) ? productData.color : [],
        talles: Array.isArray(productData.talles) ? productData.talles : [],
        portada: productData.portada || '',
        tienda: productData.tienda || '',
        id_tienda: productData.id_tienda || '',
        logo_tienda: productData.logo_tienda || ''
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading product:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      setLoading(false);
    }
  };

  const updateFormField = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addColor = (color: string) => {
    if (color.trim() && !formData.color.includes(color.trim())) {
      setFormData(prev => ({
        ...prev,
        color: [...prev.color, color.trim()]
      }));
    }
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      color: prev.color.filter((_, i) => i !== index)
    }));
  };

  const addTalle = (talle: string) => {
    if (talle.trim() && !formData.talles.includes(talle.trim())) {
      setFormData(prev => ({
        ...prev,
        talles: [...prev.talles, talle.trim()]
      }));
    }
  };

  const removeTalle = (index: number) => {
    setFormData(prev => ({
      ...prev,
      talles: prev.talles.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.nombre.trim()) {
      errors.push('El nombre del producto es obligatorio');
    }

    if (!formData.precio.trim()) {
      errors.push('El precio es obligatorio');
    }

    if (!formData.categoria.trim()) {
      errors.push('La categoría es obligatoria');
    }

    if (!formData.portada.trim()) {
      errors.push('La imagen de portada es obligatoria');
    }

    return errors;
  };

  const uploadPortadaImage = async (imageUri: string): Promise<string | null> => {
    if (!user?.id) {
      console.error('No user ID available for image upload');
      return null;
    }

    try {
      setUploading(true);
      const tempProductId = productId || `temp_${Date.now()}`;
      const imagePath = generateImagePath(user.id, tempProductId, 'portada');
      const downloadURL = await uploadImageToStorage(imageUri, imagePath);
      setUploading(false);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading portada image:', error);
      setUploading(false);
      throw error;
    }
  };

  const saveProduct = async (): Promise<boolean> => {
    try {
      setSaving(true);
      setError(null);

      const errors = validateForm();
      if (errors.length > 0) {
        setError(errors.join('\n'));
        setSaving(false);
        return false;
      }

      // Subir imagen de portada si es local
      let portadaUrl = formData.portada;
      if (formData.portada && formData.portada.startsWith('file://')) {
        try {
          const uploadedUrl = await uploadPortadaImage(formData.portada);
          if (uploadedUrl) {
            portadaUrl = uploadedUrl;
          } else {
            throw new Error('No se pudo subir la imagen');
          }
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          setError('Error al subir la imagen');
          setSaving(false);
          return false;
        }
      }

      const productData = {
        ...formData,
        portada: portadaUrl,
        fecha_creado: isEditing ? undefined : new Date(),
        likes: isEditing ? undefined : [] // Solo para productos nuevos
      };

      // Remover campos undefined
      Object.keys(productData).forEach(key => {
        if (productData[key as keyof typeof productData] === undefined) {
          delete productData[key as keyof typeof productData];
        }
      });

      if (isEditing && productId) {
        // Actualizar producto existente
        const productRef = doc(db, 'productos', productId);
        await updateDoc(productRef, productData);
        console.log('Product updated successfully');
      } else {
        // Crear nuevo producto
        const productsRef = collection(db, 'productos');
        const docRef = await addDoc(productsRef, productData);
        console.log('Product created with ID:', docRef.id);
      }

      setSaving(false);
      return true;
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error instanceof Error ? error.message : 'Error al guardar producto');
      setSaving(false);
      return false;
    }
  };

  return {
    formData,
    userStores,
    loading,
    saving,
    uploading,
    error,
    isEditing,
    updateFormField,
    addColor,
    removeColor,
    addTalle,
    removeTalle,
    saveProduct,
    uploadPortadaImage
  };
};