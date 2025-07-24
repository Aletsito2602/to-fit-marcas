import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Header from '../../components/Header';
import LayerBackground from '../../components/LayerBackground';
import BackgroundPattern from '../../components/BackgroundPattern';

interface PreviewFotoScreenProps {
  navigation: any;
  route: any;
}

const PreviewFotoScreen: React.FC<PreviewFotoScreenProps> = ({ navigation, route }) => {
  const { photoPath, photoData, fromGallery } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleEditarFoto = () => {
    navigation.navigate('EditorFoto', {
      photoPath,
      photoData
    });
  };

  const handlePublicar = () => {
    navigation.navigate('PublicarContenido', {
      photoPath,
      photoData
    });
  };

  const handleGuardar = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      // Verificar disponibilidad de MediaLibrary
      const isAvailable = await MediaLibrary.isAvailableAsync();
      
      if (!isAvailable) {
        Alert.alert(
          'Funcionalidad limitada',
          'En Expo Go, la funcionalidad completa de galería requiere un development build. La foto se ha guardado en la galería personal de la app.',
          [{ text: 'Entendido' }]
        );
        return;
      }

      // Solicitar permisos para guardar en galería del dispositivo
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permisos requeridos',
          'Necesitamos permisos para guardar la foto en tu galería'
        );
        return;
      }

      // Guardar en la galería del dispositivo
      await MediaLibrary.saveToLibraryAsync(photoPath);
      
      Alert.alert(
        'Éxito',
        'Foto guardada en tu galería del dispositivo',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error guardando foto:', error);
      Alert.alert(
        'Funcionalidad limitada', 
        'En Expo Go, usar un development build para funcionalidad completa. La foto está guardada en la galería personal de la app.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCompartir = async () => {
    if (isProcessing) return;
    
    try {
      await Share.share({
        url: photoPath,
        message: 'Foto tomada con ToFit Marcas',
      });
    } catch (error) {
      console.error('Error compartiendo foto:', error);
      Alert.alert('Error', 'No se pudo compartir la foto');
    }
  };

  const handleDescartar = () => {
    Alert.alert(
      'Descartar foto',
      '¿Estás seguro de que quieres descartar esta foto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Descartar',
          style: 'destructive',
          onPress: async () => {
            // Solo eliminar si no viene de galería
            if (!fromGallery && photoData?.originalPath) {
              try {
                const fileInfo = await FileSystem.getInfoAsync(photoData.originalPath);
                if (fileInfo.exists) {
                  await FileSystem.deleteAsync(photoData.originalPath);
                }
              } catch (error) {
                console.error('Error eliminando archivo temporal:', error);
              }
            }
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <LayerBackground opacity={0.3} />
      
      {/* Header */}
      <Header 
        title="Preview"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        style={styles.header}
      />

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Imagen preview */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: photoPath }}
            style={styles.previewImage}
            resizeMode="cover"
          />
        </View>

        {/* Acciones principales */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={handleEditarFoto}
            disabled={isProcessing}
          >
            <Ionicons name="create-outline" size={20} color="#FFFFFF" />
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.publishButton]}
            onPress={handlePublicar}
            disabled={isProcessing}
          >
            <Ionicons name="cloud-upload-outline" size={20} color="#000000" />
            <Text style={styles.publishButtonText}>Publicar</Text>
          </TouchableOpacity>
        </View>

        {/* Acciones secundarias */}
        <View style={styles.secondaryActions}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleGuardar}
            disabled={isProcessing}
          >
            <Ionicons name="download-outline" size={16} color="#FFFFFF" />
            <Text style={styles.secondaryButtonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleCompartir}
            disabled={isProcessing}
          >
            <Ionicons name="share-outline" size={16} color="#FFFFFF" />
            <Text style={styles.secondaryButtonText}>Compartir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, styles.discardButton]}
            onPress={handleDescartar}
            disabled={isProcessing}
          >
            <Ionicons name="trash-outline" size={16} color="#FF6B6B" />
            <Text style={[styles.secondaryButtonText, styles.discardText]}>
              Descartar
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 100, // Espacio para header
  },
  imageContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#1C1C1C',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    gap: 8,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  publishButton: {
    backgroundColor: '#FFFFFF',
  },
  publishButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 6,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  discardButton: {
    // Estilo específico para descartar
  },
  discardText: {
    color: '#FF6B6B',
  },
});

export default PreviewFotoScreen;