import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductsStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';
import { useProductForm } from '../../hooks/useProductForm';
import * as ImagePicker from 'expo-image-picker';

type AddEditProductNavigationProp = StackNavigationProp<ProductsStackParamList, 'AddEditProduct'>;
type AddEditProductRouteProp = RouteProp<ProductsStackParamList, 'AddEditProduct'>;

const AddEditProductScreen: React.FC = () => {
  const navigation = useNavigation<AddEditProductNavigationProp>();
  const route = useRoute<AddEditProductRouteProp>();
  const { productId } = route.params || {};

  // Hook dinámico para manejar el formulario con Firebase
  const {
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
  } = useProductForm(productId);

  // Estados locales para el UI
  const [newColor, setNewColor] = useState('');
  const [newTalle, setNewTalle] = useState('');

  const handleAddPhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Error', 'Se necesitan permisos para acceder a la galería');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        // Actualizar la imagen local inmediatamente para preview
        updateFormField('portada', result.assets[0].uri);
        
        // La imagen se subirá a Firebase Storage cuando se guarde el producto
        console.log('Imagen seleccionada:', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo añadir la imagen');
    }
  };

  const handleAddColor = () => {
    if (newColor.trim()) {
      addColor(newColor);
      setNewColor('');
    }
  };

  const handleAddTalle = () => {
    if (newTalle.trim()) {
      addTalle(newTalle);
      setNewTalle('');
    }
  };

  const handleSave = async () => {
    if (saving || uploading) return;

    const success = await saveProduct();
    if (success) {
      Alert.alert(
        'Éxito',
        isEditing ? 'Producto actualizado correctamente' : 'Producto creado correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else if (error) {
      Alert.alert('Error', error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // Estado de loading
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

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Título */}
        <Text style={styles.title}>
          {isEditing ? 'Editar producto' : 'Añadir producto'}
        </Text>

        {/* Información básica */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información básica</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del producto *"
            placeholderTextColor="#A0A0A0"
            value={formData.nombre}
            onChangeText={(text) => updateFormField('nombre', text)}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción del producto"
            placeholderTextColor="#A0A0A0"
            value={formData.descripcion}
            onChangeText={(text) => updateFormField('descripcion', text)}
            multiline
            numberOfLines={4}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoría (ej: Falda, Camisa, Zapatos)"
            placeholderTextColor="#A0A0A0"
            value={formData.categoria}
            onChangeText={(text) => updateFormField('categoria', text)}
          />
        </View>

        {/* Fotos del producto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fotos del producto *</Text>
          <View style={styles.photosContainer}>
            {formData.portada && (
              <View style={styles.photoItem}>
                <Image source={{ uri: formData.portada }} style={styles.photoThumbnail} />
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => updateFormField('portada', '')}
                >
                  <Ionicons name="close-circle" size={24} color="#FF4444" />
                </TouchableOpacity>
                <View style={styles.primaryBadge}>
                  <Text style={styles.primaryBadgeText}>Principal</Text>
                </View>
              </View>
            )}
            
            {/* Botón para agregar más fotos - siempre visible */}
            <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
              <Ionicons name="camera-outline" size={30} color="#FFFFFF" />
              <Text style={styles.addPhotoText}>
                {formData.portada ? 'Agregar más' : 'Foto principal'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.helpText}>
            {formData.portada 
              ? 'La primera foto será la imagen principal. Puedes agregar hasta 5 fotos.'
              : 'Agrega la foto principal del producto'
            }
          </Text>
        </View>

        {/* Colores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colores disponibles</Text>
          <View style={styles.tagsContainer}>
            {formData.color.map((color, index) => (
              <View key={index} style={styles.tagItem}>
                <Text style={styles.tagText}>{color}</Text>
                <TouchableOpacity onPress={() => removeColor(index)}>
                  <Ionicons name="close" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.addTagContainer}>
            <TextInput
              style={[styles.input, styles.tagInput]}
              placeholder="Nuevo color (ej: Azul, Rojo)"
              placeholderTextColor="#A0A0A0"
              value={newColor}
              onChangeText={setNewColor}
              onSubmitEditing={handleAddColor}
            />
            <TouchableOpacity style={styles.addTagButton} onPress={handleAddColor}>
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Talles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Talles disponibles</Text>
          <View style={styles.tagsContainer}>
            {formData.talles.map((talle, index) => (
              <View key={index} style={styles.tagItem}>
                <Text style={styles.tagText}>{talle}</Text>
                <TouchableOpacity onPress={() => removeTalle(index)}>
                  <Ionicons name="close" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.addTagContainer}>
            <TextInput
              style={[styles.input, styles.tagInput]}
              placeholder="Nuevo talle (ej: S, M, L, XL)"
              placeholderTextColor="#A0A0A0"
              value={newTalle}
              onChangeText={setNewTalle}
              onSubmitEditing={handleAddTalle}
            />
            <TouchableOpacity style={styles.addTagButton} onPress={handleAddTalle}>
              <Ionicons name="add" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Precio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Precio *</Text>
          <TextInput
            style={styles.input}
            placeholder="$0.00"
            placeholderTextColor="#A0A0A0"
            value={formData.precio}
            onChangeText={(text) => updateFormField('precio', text)}
            keyboardType="default"
          />
          <Text style={styles.helpText}>
            Incluye el símbolo de moneda (ej: $25.000, €50.99)
          </Text>
        </View>

        {/* Información de la tienda (solo mostrar) */}
        {userStores.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tienda</Text>
            <View style={styles.storeInfo}>
              <Text style={styles.storeText}>
                Este producto será asignado a: {formData.tienda}
              </Text>
              <Text style={styles.storeSubtext}>
                ID: {formData.id_tienda}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Botones de acción */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={handleCancel}
          disabled={saving}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.saveButton, (saving || uploading) && styles.saveButtonDisabled]} 
          onPress={handleSave}
          disabled={saving || uploading}
        >
          {(saving || uploading) ? (
            <View style={styles.loadingContent}>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text style={[styles.saveButtonText, { marginLeft: 8, fontSize: 14 }]}>
                {uploading ? 'Subiendo imagen...' : 'Guardando...'}
              </Text>
            </View>
          ) : (
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Actualizar' : 'Crear producto'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 70,
    backgroundColor: '#363636',
  },
  headerButton: {
    padding: 5,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  logoSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: -5,
  },
  headerRightButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 55,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  photoItem: {
    position: 'relative',
  },
  photoThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    backgroundColor: '#1C1C1C',
    borderWidth: 2,
    borderColor: '#333333',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
  variantsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  variantsButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  variantsButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  pricesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  priceInputContainer: {
    flex: 1,
  },
  priceLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  priceInput: {
    marginBottom: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 20,
    paddingBottom: 30,
    gap: 15,
    backgroundColor: 'rgba(41, 41, 41, 1)',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#A0A0A0',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // Estados de loading
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
  // Estilos para tags (colores y talles)
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  tagItem: {
    backgroundColor: '#1C1C1C',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#333333',
  },
  tagText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  addTagContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  tagInput: {
    flex: 1,
    marginBottom: 0,
  },
  addTagButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Texto de ayuda
  helpText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 5,
    lineHeight: 16,
  },
  // Info de tienda
  storeInfo: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  storeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  storeSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  // Botón guardar deshabilitado
  saveButtonDisabled: {
    backgroundColor: '#555555',
  },
  // Contenido de loading en botón
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Badge de foto principal
  primaryBadge: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  primaryBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default AddEditProductScreen;