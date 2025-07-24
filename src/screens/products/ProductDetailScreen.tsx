import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product, ProductsStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';
import { useProductDetail } from '../../hooks/useProductDetail';

type ProductDetailNavigationProp = StackNavigationProp<ProductsStackParamList, 'ProductDetail'>;
type ProductDetailRouteProp = RouteProp<ProductsStackParamList, 'ProductDetail'>;

const { width } = Dimensions.get('window');

const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<ProductDetailNavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();
  const { productId } = route.params;

  // Cargar datos del producto desde Firebase
  const { 
    product, 
    galleryImages, 
    hasGallery, 
    loading, 
    error, 
    getAllImages, 
    needsMorePhotos 
  } = useProductDetail(productId);

  // Estado para el modal de imagen expandida
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const handleEditProduct = () => {
    navigation.navigate('AddEditProduct', { productId });
  };

  const handleAddPhotos = () => {
    Alert.alert(
      'Agregar fotos',
      'Esta función te permitirá agregar más fotos a la galería del producto.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => console.log('Agregar fotos implementar') }
      ]
    );
  };

  const handleImagePress = (index: number) => {
    setSelectedImageIndex(index);
    setIsImageModalVisible(true);
  };

  const closeImageModal = () => {
    setIsImageModalVisible(false);
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    const allImages = getAllImages();
    let newIndex = selectedImageIndex;
    
    if (direction === 'prev') {
      newIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : allImages.length - 1;
    } else {
      newIndex = selectedImageIndex < allImages.length - 1 ? selectedImageIndex + 1 : 0;
    }
    
    setSelectedImageIndex(newIndex);
  };

  // Estados de loading y error
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundPattern opacity={0.06} />
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Cargando producto...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundPattern opacity={0.06} />
        <Header />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error || 'Producto no encontrado'}
          </Text>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Obtener todas las imágenes (portada + galería)
  const allImages = getAllImages();
  const showAddPhotosPrompt = needsMorePhotos();

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Nombre del producto */}
        <Text style={styles.productName}>{product.nombre}</Text>
        
        {/* Precio */}
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>{product.precio}</Text>
          <Text style={styles.storeText}>por {product.tienda}</Text>
        </View>

        {/* Galería de fotos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Galería {hasGallery && `(${allImages.length} fotos)`}
            </Text>
            {showAddPhotosPrompt && (
              <TouchableOpacity onPress={handleAddPhotos}>
                <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
            )}
          </View>
          
          {allImages.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imagesContainer}
              contentContainerStyle={styles.imagesContent}
            >
              {allImages.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleImagePress(index)}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: image }}
                    style={styles.productImage}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <TouchableOpacity 
              style={styles.addPhotosPrompt} 
              onPress={handleAddPhotos}
            >
              <Ionicons name="camera-outline" size={40} color="#A0A0A0" />
              <Text style={styles.addPhotosText}>
                Agregar fotos del producto
              </Text>
              <Text style={styles.addPhotosSubtext}>
                Toca para subir imágenes a la galería
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Variantes - Colores */}
        {product.color && product.color.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Colores disponibles</Text>
            <View style={styles.variantsContainer}>
              {product.color.map((color, index) => (
                <View key={index} style={styles.variantTag}>
                  <Text style={styles.variantText}>{color}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Variantes - Talles */}
        {product.talles && product.talles.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Talles disponibles</Text>
            <View style={styles.variantsContainer}>
              {product.talles.map((talle, index) => (
                <View key={index} style={styles.variantTag}>
                  <Text style={styles.variantText}>{talle}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Descripción */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>
            {product.descripcion || 'Sin descripción disponible'}
          </Text>
        </View>

        {/* Información de la tienda */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tienda</Text>
          <View style={styles.storeContainer}>
            <Image 
              source={{ uri: product.logo_tienda }} 
              style={styles.storeLogo}
            />
            <View style={styles.storeInfo}>
              <Text style={styles.storeNameText}>{product.tienda}</Text>
              <Text style={styles.storeIdText}>ID: {product.id_tienda}</Text>
            </View>
          </View>
        </View>

        {/* Categoría */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categoría</Text>
          <Text style={styles.collectionText}>{product.categoria}</Text>
        </View>

        {/* Likes */}
        {product.likes && product.likes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Likes</Text>
            <Text style={styles.stockText}>{product.likes.length} personas</Text>
          </View>
        )}
      </ScrollView>

      {/* Botón editar */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProduct}>
          <Text style={styles.editButtonText}>Editar producto</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de imagen expandida */}
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <View style={styles.imageModalContainer}>
          <Pressable 
            style={styles.imageModalOverlay} 
            onPress={closeImageModal}
          />
          
          {selectedImageIndex !== null && (
            <>
              {/* Imagen expandida */}
              <View style={styles.imageModalContent}>
                <Image
                  source={{ uri: getAllImages()[selectedImageIndex] }}
                  style={styles.expandedImage}
                  resizeMode="contain"
                />
                
                {/* Contador de imágenes */}
                <View style={styles.imageCounter}>
                  <Text style={styles.imageCounterText}>
                    {selectedImageIndex + 1} de {getAllImages().length}
                  </Text>
                </View>
              </View>

              {/* Botones de navegación */}
              {getAllImages().length > 1 && (
                <>
                  <TouchableOpacity
                    style={[styles.navButton, styles.prevButton]}
                    onPress={() => navigateImage('prev')}
                    activeOpacity={0.8}
                  >
                    <View style={styles.navButtonInner}>
                      <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.navButton, styles.nextButton]}
                    onPress={() => navigateImage('next')}
                    activeOpacity={0.8}
                  >
                    <View style={styles.navButtonInner}>
                      <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
                    </View>
                  </TouchableOpacity>
                </>
              )}

              {/* Botón cerrar */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeImageModal}
                activeOpacity={0.8}
              >
                <View style={styles.closeButtonInner}>
                  <Ionicons name="close" size={24} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 55,
  },
  productName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  originalPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#A0A0A0',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  currentPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  storeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
    marginLeft: 8,
  },
  imagesContainer: {
    marginBottom: 25,
  },
  imagesContent: {
    paddingRight: 25,
  },
  productImage: {
    width: 140,
    height: 140,
    borderRadius: 5,
    marginRight: 15,
    resizeMode: 'cover',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  variantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  variantTag: {
    backgroundColor: '#1C1C1C',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  variantText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#A0A0A0',
    lineHeight: 24,
  },
  collectionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  stockText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  bottomContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: 'rgba(41, 41, 41, 1)',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)', // Para web
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Para Android
  },
  editButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Estados de loading y error
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  // Estilos para agregar fotos
  addPhotosPrompt: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#333333',
    borderStyle: 'dashed',
  },
  addPhotosText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  addPhotosSubtext: {
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  // Estilos para información de tienda
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  storeInfo: {
    flex: 1,
  },
  storeNameText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  storeIdText: {
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 2,
  },
  // Estilos para modal de imagen expandida
  imageModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  imageModalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  expandedImage: {
    width: width - 40,
    height: '80%',
    borderRadius: 12,
  },
  imageCounter: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  imageCounterText: {
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    fontSize: 14,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  navButtonInner: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  prevButton: {
    left: 20,
  },
  nextButton: {
    right: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  closeButtonInner: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
});

export default ProductDetailScreen;