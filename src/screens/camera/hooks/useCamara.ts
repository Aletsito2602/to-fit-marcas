import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export const useCamara = () => {
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off');
  const [cameraActive, setCameraActive] = useState(true);
  const [facing, setFacing] = useState<'back' | 'front'>('back');

  const inicializarCamara = useCallback(async () => {
    try {
      setCameraActive(true);
      
      // Cargar configuración guardada
      const savedFlashMode = await AsyncStorage.getItem('flashMode');
      if (savedFlashMode && ['off', 'on', 'auto'].includes(savedFlashMode)) {
        setFlashMode(savedFlashMode as 'off' | 'on' | 'auto');
      }

      // Crear directorio personal si no existe
      const personalDir = `${FileSystem.documentDirectory}MiGaleria/`;
      const dirInfo = await FileSystem.getInfoAsync(personalDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(personalDir, { intermediates: true });
      }
    } catch (error) {
      console.error('Error inicializando cámara:', error);
    }
  }, []);

  const toggleFlash = useCallback(async () => {
    const modes: ('off' | 'on' | 'auto')[] = ['off', 'on', 'auto'];
    const currentIndex = modes.indexOf(flashMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    
    setFlashMode(nextMode);
    
    // Guardar configuración
    await AsyncStorage.setItem('flashMode', nextMode);
  }, [flashMode]);

  const toggleCamera = useCallback(() => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }, []);

  const takePhoto = useCallback(async (cameraRef: any) => {
    if (isTakingPhoto) return null;
    
    setIsTakingPhoto(true);
    
    try {
      // Verificar que la referencia de la cámara existe
      if (!cameraRef) {
        throw new Error('Camera reference is not available');
      }

      const photo = await cameraRef.takePictureAsync({
        quality: 0.85,
        base64: false,
        skipProcessing: false,
      });

      // Crear metadata adicional
      const photoWithMetadata = {
        ...photo,
        timestamp: Date.now(),
        flashUsed: flashMode,
        facing: facing,
        location: null, // Agregar geolocalización si necesario
      };

      // Guardar en galería personal
      await guardarEnGaleriaPersonal(photoWithMetadata);

      return photoWithMetadata;
    } catch (error) {
      console.error('Error tomando foto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
      return null;
    } finally {
      setIsTakingPhoto(false);
    }
  }, [flashMode, facing, isTakingPhoto]);

  const guardarEnGaleriaPersonal = async (photoData: any) => {
    try {
      // Crear directorio personal si no existe
      const personalDir = `${FileSystem.documentDirectory}MiGaleria/`;
      
      // Generar nombre único para la foto
      const fileName = `foto_${photoData.timestamp}.jpg`;
      const newPath = `${personalDir}${fileName}`;
      
      // Copiar foto al directorio personal
      await FileSystem.copyAsync({
        from: photoData.uri,
        to: newPath,
      });

      // Guardar metadata
      const metadata = {
        id: photoData.timestamp.toString(),
        path: newPath,
        uri: newPath,
        originalPath: photoData.uri,
        timestamp: photoData.timestamp,
        flashUsed: photoData.flashUsed,
        facing: photoData.facing,
        edited: false,
        shared: false,
        width: photoData.width || 0,
        height: photoData.height || 0,
      };

      // Obtener lista actual y agregar nueva foto
      const currentPhotos = await obtenerFotosGuardadas();
      const updatedPhotos = [metadata, ...currentPhotos];
      
      await AsyncStorage.setItem('galeriaPersonal', JSON.stringify(updatedPhotos));
      
    } catch (error) {
      console.error('Error guardando en galería personal:', error);
    }
  };

  const obtenerFotosGuardadas = async () => {
    try {
      const photosJson = await AsyncStorage.getItem('galeriaPersonal');
      return photosJson ? JSON.parse(photosJson) : [];
    } catch (error) {
      console.error('Error obteniendo fotos guardadas:', error);
      return [];
    }
  };

  const eliminarFoto = async (fotoId: string) => {
    try {
      const currentPhotos = await obtenerFotosGuardadas();
      const foto = currentPhotos.find((p: any) => p.id === fotoId);
      
      if (foto) {
        // Eliminar archivo físico
        const fileInfo = await FileSystem.getInfoAsync(foto.path);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(foto.path);
        }
        
        // Actualizar lista
        const updatedPhotos = currentPhotos.filter((p: any) => p.id !== fotoId);
        await AsyncStorage.setItem('galeriaPersonal', JSON.stringify(updatedPhotos));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error eliminando foto:', error);
      return false;
    }
  };

  return {
    isTakingPhoto,
    flashMode,
    cameraActive,
    facing,
    setCameraActive,
    toggleFlash,
    toggleCamera,
    takePhoto,
    inicializarCamara,
    obtenerFotosGuardadas,
    eliminarFoto,
  };
};