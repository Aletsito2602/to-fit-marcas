import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import LayerBackground from '../../components/LayerBackground';
import BackgroundPattern from '../../components/BackgroundPattern';
import { useCamara } from './hooks/useCamara';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const { width: screenWidth } = Dimensions.get('window');
const itemSize = (screenWidth - 40 - 4) / 3; // 3 columnas con gaps

interface GaleriaFotosScreenProps {
  navigation: any;
}

interface Foto {
  id: string;
  path: string;
  uri: string;
  timestamp: number;
  flashUsed: string;
  facing: string;
  edited: boolean;
  shared: boolean;
  width: number;
  height: number;
}

const GaleriaFotosScreen: React.FC<GaleriaFotosScreenProps> = ({ navigation }) => {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const { obtenerFotosGuardadas, eliminarFoto } = useCamara();

  const cargarFotos = useCallback(async () => {
    try {
      const fotosGuardadas = await obtenerFotosGuardadas();
      
      // Verificar que los archivos existan
      const fotosValidas = [];
      for (const foto of fotosGuardadas) {
        try {
          const fileInfo = await FileSystem.getInfoAsync(foto.path);
          if (fileInfo.exists) {
            fotosValidas.push(foto);
          }
        } catch (error) {
          console.warn('Archivo no encontrado:', foto.path);
        }
      }
      
      setFotos(fotosValidas);
    } catch (error) {
      console.error('Error cargando fotos:', error);
    } finally {
      setLoading(false);
    }
  }, [obtenerFotosGuardadas]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarFotos();
    });

    return unsubscribe;
  }, [navigation, cargarFotos]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await cargarFotos();
    setRefreshing(false);
  }, [cargarFotos]);

  const handleFotoPress = (foto: Foto) => {
    navigation.navigate('PreviewFoto', {
      photoPath: foto.uri,
      photoData: foto,
      fromGallery: true
    });
  };

  const handleFotoLongPress = (foto: Foto) => {
    Alert.alert(
      'Opciones',
      `¿Qué quieres hacer con esta foto?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Editar',
          onPress: () => navigation.navigate('EditorFoto', {
            photoPath: foto.uri,
            photoData: foto
          })
        },
        {
          text: 'Exportar',
          onPress: () => exportarFoto(foto)
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => confirmarEliminar(foto)
        }
      ]
    );
  };

  const exportarFoto = async (foto: Foto) => {
    try {
      // Verificar disponibilidad de MediaLibrary
      const isAvailable = await MediaLibrary.isAvailableAsync();
      
      if (!isAvailable) {
        Alert.alert(
          'Funcionalidad limitada',
          'En Expo Go, la funcionalidad completa de galería requiere un development build. Puedes compartir la foto usando el botón de compartir.',
          [{ text: 'Entendido' }]
        );
        return;
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permisos requeridos',
          'Necesitamos permisos para guardar la foto en tu galería'
        );
        return;
      }

      await MediaLibrary.saveToLibraryAsync(foto.uri);
      Alert.alert('Éxito', 'Foto exportada a tu galería');
    } catch (error) {
      console.error('Error exportando foto:', error);
      Alert.alert(
        'Funcionalidad limitada', 
        'En Expo Go, usar un development build para funcionalidad completa. Puedes compartir la foto usando otras opciones.',
        [{ text: 'OK' }]
      );
    }
  };

  const confirmarEliminar = (foto: Foto) => {
    Alert.alert(
      'Eliminar foto',
      '¿Estás seguro? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => handleEliminarFoto(foto)
        }
      ]
    );
  };

  const handleEliminarFoto = async (foto: Foto) => {
    try {
      const success = await eliminarFoto(foto.id);
      if (success) {
        setFotos(prevFotos => prevFotos.filter(f => f.id !== foto.id));
        Alert.alert('Éxito', 'Foto eliminada');
      } else {
        Alert.alert('Error', 'No se pudo eliminar la foto');
      }
    } catch (error) {
      console.error('Error eliminando foto:', error);
      Alert.alert('Error', 'No se pudo eliminar la foto');
    }
  };

  const renderFotoItem = ({ item }: { item: Foto }) => (
    <TouchableOpacity
      style={styles.fotoItem}
      onPress={() => handleFotoPress(item)}
      onLongPress={() => handleFotoLongPress(item)}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.fotoImage}
        resizeMode="cover"
      />
      {item.edited && (
        <View style={styles.editedBadge}>
          <Ionicons name="create" size={12} color="#FFFFFF" />
        </View>
      )}
      {item.shared && (
        <View style={styles.sharedBadge}>
          <Ionicons name="share" size={12} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  if (fotos.length === 0 && !loading) {
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundPattern opacity={0.06} />
        <LayerBackground opacity={0.3} />
        
        <Header 
          title="Mi Galería"
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />
        
        <View style={styles.emptyContainer}>
          <Ionicons name="images-outline" size={80} color="rgba(255, 255, 255, 0.3)" />
          <Text style={styles.emptyTitle}>No hay fotos</Text>
          <Text style={styles.emptySubtitle}>
            Toma tu primera foto con la cámara
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('Camara')}
          >
            <Ionicons name="camera" size={20} color="#000000" />
            <Text style={styles.emptyButtonText}>Abrir Cámara</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <LayerBackground opacity={0.3} />
      
      {/* Header */}
      <Header 
        title="Mi Galería"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightComponent={() => (
          <TouchableOpacity 
            style={styles.headerAction}
            onPress={() => navigation.navigate('Camara')}
          >
            <Ionicons name="camera" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      />

      {/* Grid de fotos */}
      <View style={styles.content}>
        <FlatList
          data={fotos}
          renderItem={renderFotoItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.row}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFFFFF"
              colors={['#FFFFFF']}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    paddingTop: 90, // Espacio para header
  },
  headerAction: {
    padding: 8,
  },
  gridContainer: {
    padding: 10,
    paddingBottom: 100, // Espacio para bottom navigation
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  fotoItem: {
    width: itemSize,
    height: itemSize,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1C1C1C',
    position: 'relative',
  },
  fotoImage: {
    width: '100%',
    height: '100%',
  },
  editedBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sharedBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    paddingTop: 100,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 30,
  },
  emptyButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    gap: 8,
  },
  emptyButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default GaleriaFotosScreen;