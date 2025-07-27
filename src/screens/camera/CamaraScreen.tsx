import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import LayerBackground from '../../components/LayerBackground';
import BackgroundPattern from '../../components/BackgroundPattern';
import { useCamara } from './hooks/useCamara';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface CamaraScreenProps {
  navigation: any;
  route: any;
}

const CamaraScreen: React.FC<CamaraScreenProps> = ({ navigation, route }) => {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  
  const {
    isTakingPhoto,
    flashMode,
    cameraActive,
    facing,
    toggleFlash,
    toggleCamera,
    takePhoto,
    inicializarCamara
  } = useCamara();

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const initCamera = async () => {
      await inicializarCamara();
      
      // Animación de entrada después de inicializar
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
    };

    initCamera();

    return () => {
      // Cleanup al salir
    };
  }, []);

  // Verificar permisos
  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundPattern opacity={0.06} />
        <LayerBackground opacity={0.3} />
        <Header />
        <View style={styles.content}>
          <Text style={styles.title}>Inicializando cámara...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Si no se han otorgado permisos
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundPattern opacity={0.06} />
        <LayerBackground opacity={0.3} />
        <Header />
        <View style={styles.content}>
          <Text style={styles.title}>Permisos de Cámara</Text>
          <Text style={styles.subtitle}>
            Necesitamos acceso a tu cámara para tomar fotos
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Permitir Acceso</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleTakePhoto = async () => {
    if (!cameraRef.current || isTakingPhoto) return;

    try {
      console.log('Intentando tomar foto...');
      console.log('Camera ref exists:', !!cameraRef.current);
      
      // Pequeña pausa para asegurar que la cámara esté lista
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const photo = await takePhoto(cameraRef.current);
      
      if (photo) {
        console.log('Foto tomada exitosamente:', photo.uri);
        // Navegar a preview con la foto
        navigation.navigate('PreviewFoto', {
          photoPath: photo.uri,
          photoData: photo
        });
      } else {
        console.log('No se pudo obtener la foto');
        Alert.alert('Error', 'No se pudo capturar la imagen. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en handleTakePhoto:', error);
      Alert.alert('Error', 'No se pudo tomar la foto. Intenta de nuevo.');
    }
  };

  const handleOpenGallery = () => {
    navigation.navigate('GaleriaFotos');
  };

  const getFlashIcon = () => {
    switch (flashMode) {
      case 'on': return 'flash';
      case 'off': return 'flash-off';
      case 'auto': return 'flash-outline';
      default: return 'flash-off';
    }
  };

  const getFlashColor = () => {
    return flashMode === 'on' ? '#FFD700' : '#FFFFFF';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent />
      
      {/* Header with custom style for camera */}
      <View style={styles.headerContainer}>
        <Header 
          showBack={true}
          onBackPress={() => navigation.goBack()}
          style={styles.headerCamera}
        />
      </View>

      <Animated.View 
        style={[
          styles.cameraContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
          mode="picture"
          flash={flashMode}
        >
          {/* Overlay con controles superiores */}
          <View style={styles.overlay}>
            {/* Controles inferiores */}
            <View style={styles.bottomControls}>
              {/* Galería a la izquierda */}
              <TouchableOpacity
                style={styles.galleryButton}
                onPress={handleOpenGallery}
                disabled={isTakingPhoto}
              >
                <Ionicons name="images" size={30} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Controles centrales: flash, captura y cámara en línea */}
              <View style={styles.captureSection}>
                <TouchableOpacity
                  style={styles.sideControlButton}
                  onPress={toggleFlash}
                  disabled={isTakingPhoto}
                >
                  <Ionicons 
                    name={getFlashIcon() as any} 
                    size={24} 
                    color={getFlashColor()} 
                  />
                </TouchableOpacity>

                {/* Botón de captura principal */}
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={handleTakePhoto}
                  disabled={isTakingPhoto}
                >
                  <Animated.View
                    style={[
                      styles.captureButtonInner,
                      isTakingPhoto && styles.captureButtonLoading
                    ]}
                  >
                    {isTakingPhoto && (
                      <View style={styles.loadingIndicator} />
                    )}
                  </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sideControlButton}
                  onPress={toggleCamera}
                  disabled={isTakingPhoto}
                >
                  <Ionicons name="camera-reverse" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Espacio vacío a la derecha para balance */}
              <View style={styles.spacer} />
            </View>

            {/* Guías de encuadre */}
            <View style={styles.frameGuides}>
              <View style={styles.guideLine} />
              <View style={[styles.guideLine, styles.guideLineVertical]} />
            </View>
          </View>
        </CameraView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerCamera: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  permissionButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  cameraContainer: {
    flex: 1,
    marginTop: 60, // Altura del header
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  captureSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30, // Espacio entre flash, captura y girar cámara
  },
  sideControlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    // Sin backgroundColor - fondo transparente
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  galleryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    // Sin backgroundColor - fondo transparente
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    // Sombra elegante
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonLoading: {
    backgroundColor: '#F0F0F0',
  },
  loadingIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#000000',
    borderTopColor: 'transparent',
  },
  spacer: {
    width: 60, // Mismo ancho que el botón de galería para balance
  },
  frameGuides: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  guideLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 1,
    width: '70%',
  },
  guideLineVertical: {
    width: 1,
    height: '50%',
    transform: [{ rotate: '90deg' }],
  },
});

export default CamaraScreen;