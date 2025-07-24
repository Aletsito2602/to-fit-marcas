import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import LayerBackground from '../../components/LayerBackground';
import BackgroundPattern from '../../components/BackgroundPattern';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const { width: screenWidth } = Dimensions.get('window');

interface EditorFotoScreenProps {
  navigation: any;
  route: any;
}

type Filtro = {
  id: string;
  name: string;
  transform: any;
};

const EditorFotoScreen: React.FC<EditorFotoScreenProps> = ({ navigation, route }) => {
  const { photoPath, photoData } = route.params;
  const [imagenEditada, setImagenEditada] = useState<string>(photoPath);
  const [filtroActivo, setFiltroActivo] = useState<string>('original');
  const [isProcessing, setIsProcessing] = useState(false);
  const [herramientaActiva, setHerramientaActiva] = useState<string>('filtros');

  const filtros: Filtro[] = [
    {
      id: 'original',
      name: 'Original',
      transform: {},
    },
    {
      id: 'bw',
      name: 'B&N',
      transform: {
        resize: { width: 1080 },
        format: ImageManipulator.SaveFormat.JPEG,
      },
    },
    {
      id: 'sepia',
      name: 'Sepia',
      transform: {
        resize: { width: 1080 },
        format: ImageManipulator.SaveFormat.JPEG,
      },
    },
    {
      id: 'vintage',
      name: 'Vintage',
      transform: {
        resize: { width: 1080 },
        format: ImageManipulator.SaveFormat.JPEG,
      },
    },
  ];

  const aplicarFiltro = async (filtro: Filtro) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setFiltroActivo(filtro.id);

    try {
      if (filtro.id === 'original') {
        setImagenEditada(photoPath);
        return;
      }

      const result = await ImageManipulator.manipulateAsync(
        photoPath,
        [
          { resize: { width: 1080 } },
        ],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      setImagenEditada(result.uri);
    } catch (error) {
      console.error('Error aplicando filtro:', error);
      Alert.alert('Error', 'No se pudo aplicar el filtro');
    } finally {
      setIsProcessing(false);
    }
  };

  const rotarImagen = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      const result = await ImageManipulator.manipulateAsync(
        imagenEditada,
        [
          { rotate: 90 },
        ],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      setImagenEditada(result.uri);
    } catch (error) {
      console.error('Error rotando imagen:', error);
      Alert.alert('Error', 'No se pudo rotar la imagen');
    } finally {
      setIsProcessing(false);
    }
  };

  const recortarImagen = async (aspectRatio: [number, number]) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      const result = await ImageManipulator.manipulateAsync(
        imagenEditada,
        [
          { 
            crop: { 
              originX: 0, 
              originY: 0, 
              width: 1080, 
              height: 1080 * (aspectRatio[1] / aspectRatio[0]) 
            } 
          },
        ],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      setImagenEditada(result.uri);
    } catch (error) {
      console.error('Error recortando imagen:', error);
      Alert.alert('Error', 'No se pudo recortar la imagen');
    } finally {
      setIsProcessing(false);
    }
  };

  const guardarEdicion = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      // Crear nombre único para la imagen editada
      const timestamp = Date.now();
      const fileName = `editada_${timestamp}.jpg`;
      const personalDir = `${FileSystem.documentDirectory}MiGaleria/`;
      const newPath = `${personalDir}${fileName}`;

      // Copiar imagen editada
      await FileSystem.copyAsync({
        from: imagenEditada,
        to: newPath,
      });

      Alert.alert(
        'Éxito',
        'Imagen editada guardada',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.replace('PreviewFoto', {
                photoPath: newPath,
                photoData: { ...photoData, edited: true, path: newPath, uri: newPath },
                fromGallery: true
              });
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error guardando edición:', error);
      Alert.alert('Error', 'No se pudo guardar la edición');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetearEdicion = () => {
    setImagenEditada(photoPath);
    setFiltroActivo('original');
  };

  const renderFiltros = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filtrosContainer}
      contentContainerStyle={styles.filtrosContent}
    >
      {filtros.map((filtro) => (
        <TouchableOpacity
          key={filtro.id}
          style={[
            styles.filtroItem,
            filtroActivo === filtro.id && styles.filtroActivo
          ]}
          onPress={() => aplicarFiltro(filtro)}
          disabled={isProcessing}
        >
          <View style={styles.filtroPreview}>
            <Image
              source={{ uri: photoPath }}
              style={styles.filtroImage}
              resizeMode="cover"
            />
          </View>
          <Text style={[
            styles.filtroText,
            filtroActivo === filtro.id && styles.filtroTextActivo
          ]}>
            {filtro.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderHerramientas = () => {
    switch (herramientaActiva) {
      case 'filtros':
        return renderFiltros();
      case 'recorte':
        return (
          <View style={styles.recorteContainer}>
            <TouchableOpacity
              style={styles.recorteButton}
              onPress={() => recortarImagen([1, 1])}
              disabled={isProcessing}
            >
              <Ionicons name="square-outline" size={24} color="#FFFFFF" />
              <Text style={styles.recorteText}>1:1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.recorteButton}
              onPress={() => recortarImagen([16, 9])}
              disabled={isProcessing}
            >
              <Ionicons name="tablet-landscape-outline" size={24} color="#FFFFFF" />
              <Text style={styles.recorteText}>16:9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.recorteButton}
              onPress={() => recortarImagen([4, 3])}
              disabled={isProcessing}
            >
              <Ionicons name="tablet-portrait-outline" size={24} color="#FFFFFF" />
              <Text style={styles.recorteText}>4:3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.recorteButton}
              onPress={rotarImagen}
              disabled={isProcessing}
            >
              <Ionicons name="refresh-outline" size={24} color="#FFFFFF" />
              <Text style={styles.recorteText}>Rotar</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <LayerBackground opacity={0.3} />
      
      {/* Header con acciones personalizadas */}
      <Header 
        title="Editar"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightComponent={() => (
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={resetearEdicion}
              style={styles.headerButton}
              disabled={isProcessing}
            >
              <Text style={styles.headerButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={guardarEdicion}
              style={[styles.headerButton, styles.saveButton]}
              disabled={isProcessing}
            >
              <Text style={styles.saveButtonText}>
                {isProcessing ? 'Guardando...' : 'Guardar'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Imagen principal */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imagenEditada }}
          style={styles.editImage}
          resizeMode="contain"
        />
        {isProcessing && (
          <View style={styles.processingOverlay}>
            <Text style={styles.processingText}>Procesando...</Text>
          </View>
        )}
      </View>

      {/* Toolbar de herramientas */}
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[
            styles.toolButton,
            herramientaActiva === 'filtros' && styles.toolButtonActive
          ]}
          onPress={() => setHerramientaActiva('filtros')}
        >
          <Ionicons name="color-filter" size={24} color="#FFFFFF" />
          <Text style={styles.toolButtonText}>Filtros</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.toolButton,
            herramientaActiva === 'recorte' && styles.toolButtonActive
          ]}
          onPress={() => setHerramientaActiva('recorte')}
        >
          <Ionicons name="crop" size={24} color="#FFFFFF" />
          <Text style={styles.toolButtonText}>Recorte</Text>
        </TouchableOpacity>
      </View>

      {/* Panel de herramientas */}
      <View style={styles.toolsPanel}>
        {renderHerramientas()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  headerButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  imageContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 100, // Espacio para header
    position: 'relative',
  },
  editImage: {
    width: '100%',
    height: '100%',
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  toolButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toolButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  toolButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
  toolsPanel: {
    height: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 10,
  },
  filtrosContainer: {
    flex: 1,
  },
  filtrosContent: {
    paddingHorizontal: 20,
    gap: 15,
  },
  filtroItem: {
    alignItems: 'center',
    gap: 8,
  },
  filtroActivo: {
    transform: [{ scale: 1.1 }],
  },
  filtroPreview: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filtroImage: {
    width: '100%',
    height: '100%',
  },
  filtroText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  filtroTextActivo: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  recorteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  recorteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    gap: 8,
  },
  recorteText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default EditorFotoScreen;