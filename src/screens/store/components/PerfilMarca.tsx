import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ImageBackground,
  StyleSheet,
  Modal,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { TiendaData } from '../../../hooks/useTiendaActual';

interface PerfilMarcaProps {
  tienda: TiendaData | null;
  navigation: any;
}

const PerfilMarca: React.FC<PerfilMarcaProps> = ({ tienda, navigation }) => {
  const [bannerImage, setBannerImage] = useState(tienda?.logo || '');
  const [logoImage, setLogoImage] = useState(tienda?.logo || '');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [editMode, setEditMode] = useState(false);
  
  if (!tienda) return null;

  const seguidoresCount = tienda.seguidores?.length || 0;

  const pickImage = async (type: 'banner' | 'logo') => {
    if (!editMode) return;
    
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Error', 'Se necesitan permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'banner' ? [16, 9] : [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      if (type === 'banner') {
        setBannerImage(imageUri);
      } else {
        setLogoImage(imageUri);
      }
    }
  };

  const showFullImage = (imageUri: string) => {
    setSelectedImage(imageUri);
    setShowImageModal(true);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <View style={styles.container}>
      {/* Banner de fondo con imagen */}
      <TouchableOpacity onLongPress={() => pickImage('banner')} onPress={() => showFullImage(bannerImage)} activeOpacity={0.9}>
        <ImageBackground 
          source={{ uri: bannerImage }}
          style={styles.bannerContainer}
          resizeMode="cover"
        >
          {/* Icono de editar banner - solo visible en modo edición */}
          {editMode && (
            <TouchableOpacity style={styles.editBannerButton} onPress={() => pickImage('banner')}>
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        {/* Overlay gradiente exacto del CSS */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', '#000000']}
          style={styles.bannerOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        
        {/* Logo circular de la marca */}
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => showFullImage(logoImage)} onLongPress={() => pickImage('logo')}>
            <Image 
              source={{ uri: logoImage }}
              style={styles.logoCircular}
              defaultSource={require('../../../../assets/icon.png')}
            />
            {/* Icono de editar logo - solo visible en modo edición */}
            {editMode && (
              <TouchableOpacity style={styles.editLogoButton} onPress={() => pickImage('logo')}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Información de la marca */}
        <View style={styles.infoContainer}>
          <Text style={styles.nombreMarca}>
            {tienda.nombre}
          </Text>
        </View>
        
        {/* Botón Editar */}
        <TouchableOpacity 
          style={styles.botonPerfil}
          onPress={toggleEditMode}
        >
          <Ionicons 
            name={editMode ? "checkmark" : "create-outline"} 
            size={16} 
            color="#FFFFFF" 
            style={{ marginRight: 6 }} 
          />
          <Text style={styles.textoPerfil}>{editMode ? 'Guardar' : 'Editar'}</Text>
        </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>
      
      {/* Modal para ampliar imágenes */}
      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImageModal(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowImageModal(false)}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowImageModal(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200, // Reducido de 280 a 200
    marginBottom: 20, // Un poco de separación con las categorías
  },
  bannerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  bannerOverlay: {
    position: 'absolute',
    top: '38%', // Exacto del CSS
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    position: 'absolute',
    top: 89, // Ajustado para la nueva altura (169 - 80 = 89)
    alignSelf: 'center',
  },
  logoCircular: {
    width: 100,
    height: 100,
    borderRadius: 15, // Radio de 15px como solicitado
    borderWidth: 4,
    borderColor: '#000000',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 80, // Espacio para que quede debajo del logo
  },
  nombreMarca: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF', // Blanco como solicitado
    textAlign: 'center',
    paddingTop: 5, // 5px de padding superior como solicitado
  },
  botonPerfil: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  editBannerButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  editLogoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  textoPerfil: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default PerfilMarca;