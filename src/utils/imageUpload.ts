import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

export const uploadImageToStorage = async (uri: string, path: string): Promise<string> => {
  try {
    // Crear referencia al archivo
    const imageRef = ref(storage, path);
    
    // Convertir URI a blob
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Subir archivo
    const snapshot = await uploadBytes(imageRef, blob);
    
    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const generateImagePath = (userId: string, productId: string, imageType: 'portada' | 'galeria', index?: number): string => {
  const timestamp = Date.now();
  const indexSuffix = index !== undefined ? `_${index}` : '';
  return `productos/${userId}/${productId}/${imageType}${indexSuffix}_${timestamp}.jpg`;
};