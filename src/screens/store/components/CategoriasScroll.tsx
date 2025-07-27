import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground,
  StyleSheet,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface Categoria {
  id: string;
  nombre: string;
  imagen: string;
  orden: number;
  activa: boolean;
}

interface CategoriasScrollProps {
  categorias: Categoria[];
  onCategoriaPress: (categoria: Categoria) => void;
  editable?: boolean;
}

const CategoriasScroll: React.FC<CategoriasScrollProps> = ({ categorias, onCategoriaPress, editable = true }) => {
  const [localCategorias, setLocalCategorias] = useState(categorias);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categoria | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  
  if (!localCategorias || localCategorias.length === 0) return null;

  const editCategory = (categoria: Categoria) => {
    setEditingCategory(categoria);
    setNewCategoryName(categoria.nombre);
    setShowEditModal(true);
  };

  const saveCategory = () => {
    if (!editingCategory || !newCategoryName.trim()) return;
    
    const updatedCategorias = localCategorias.map(cat => 
      cat.id === editingCategory.id 
        ? { ...cat, nombre: newCategoryName.trim() }
        : cat
    );
    
    setLocalCategorias(updatedCategorias);
    setShowEditModal(false);
    setEditingCategory(null);
    setNewCategoryName('');
  };

  const pickImageForCategory = async (categoria: Categoria) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Error', 'Se necesitan permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const updatedCategorias = localCategorias.map(cat => 
        cat.id === categoria.id 
          ? { ...cat, imagen: result.assets[0].uri }
          : cat
      );
      setLocalCategorias(updatedCategorias);
    }
  };

  const showFullImage = (imageUri: string) => {
    setSelectedImage(imageUri);
    setShowImageModal(true);
  };

  const addNewCategory = () => {
    const newCategory: Categoria = {
      id: Date.now().toString(),
      nombre: 'Nueva Categoría',
      imagen: 'https://via.placeholder.com/95x70',
      orden: localCategorias.length,
      activa: true
    };
    setLocalCategorias([...localCategorias, newCategory]);
  };

  const deleteCategory = (categoriaId: string) => {
    Alert.alert(
      'Eliminar Categoría',
      '¿Estás seguro de que quieres eliminar esta categoría?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            setLocalCategorias(localCategorias.filter(cat => cat.id !== categoriaId));
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={95 + 6} // Ancho de categoria + gap
        snapToAlignment="start"
      >
        {localCategorias.map((categoria, index) => (
          <CategoriaItem 
            key={categoria.id || index}
            categoria={categoria}
            onPress={() => onCategoriaPress(categoria)}
            onEdit={() => editable && editCategory(categoria)}
            onChangeImage={() => editable && pickImageForCategory(categoria)}
            onDelete={() => editable && deleteCategory(categoria.id)}
            onShowFullImage={() => showFullImage(categoria.imagen)}
            editable={editable}
          />
        ))}
        
        {/* Botón para añadir nueva categoría */}
        {editable && (
          <TouchableOpacity style={styles.addCategoryButton} onPress={addNewCategory}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.addCategoryText}>Añadir</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      
      {/* Modal para editar nombre de categoría */}
      <Modal
        visible={showEditModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.editModalContent}>
            <Text style={styles.modalTitle}>Editar Categoría</Text>
            <TextInput
              style={styles.categoryInput}
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              placeholder="Nombre de la categoría"
              placeholderTextColor="#A0A0A0"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={saveCategory}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Modal para ampliar imágenes */}
      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImageModal(false)}
      >
        <View style={styles.imageModalContainer}>
          <TouchableOpacity style={styles.imageModalOverlay} onPress={() => setShowImageModal(false)}>
            <View style={styles.imageModalContent}>
              <ImageBackground source={{ uri: selectedImage }} style={styles.fullCategoryImage} resizeMode="contain" />
              <TouchableOpacity style={styles.closeImageButton} onPress={() => setShowImageModal(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

interface CategoriaItemProps {
  categoria: Categoria;
  onPress: () => void;
  onEdit?: () => void;
  onChangeImage?: () => void;
  onDelete?: () => void;
  onShowFullImage?: () => void;
  editable?: boolean;
}

const CategoriaItem: React.FC<CategoriaItemProps> = ({ 
  categoria, 
  onPress, 
  onEdit, 
  onChangeImage, 
  onDelete, 
  onShowFullImage,
  editable = false 
}) => (
  <View style={styles.categoriaContainer}>
    <TouchableOpacity 
      onPress={editable ? onShowFullImage : onPress}
      onLongPress={editable ? onEdit : undefined}
      activeOpacity={0.8}
      style={{ flex: 1 }}
    >
      <ImageBackground 
        source={{ uri: categoria.imagen }}
        style={styles.categoriaImagen}
        imageStyle={styles.categoriaImageStyle}
      >
        {/* Botón para cambiar imagen */}
        {editable && (
          <TouchableOpacity style={styles.changeImageButton} onPress={onChangeImage}>
            <Ionicons name="camera" size={12} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        
        {/* Botón para eliminar categoría */}
        {editable && (
          <TouchableOpacity style={styles.deleteCategoryButton} onPress={onDelete}>
            <Ionicons name="close" size={12} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        
        {/* Overlay blur exacto del CSS */}
        <View style={styles.overlay}>
          <TouchableOpacity onPress={editable ? onEdit : onPress} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.categoriaNombre}>
              {categoria.nombre}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 70, // Exacto del CSS
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 14,
    gap: 6, // Exacto del CSS
  },
  categoriaContainer: {
    width: 95, // Exacto del CSS
    height: 70,
  },
  categoriaImagen: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriaImageStyle: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Exacto del CSS
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // Simular backdrop-filter: blur(0.5px) con opacity
  },
  categoriaNombre: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 25,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  addCategoryButton: {
    width: 95,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCategoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#FFFFFF',
    marginTop: 4,
  },
  changeImageButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 4,
    zIndex: 10,
  },
  deleteCategoryButton: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 4,
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalContent: {
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  categoryInput: {
    width: '100%',
    backgroundColor: '#444444',
    borderRadius: 10,
    padding: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666666',
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  saveButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000000',
  },
  imageModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  imageModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageModalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullCategoryImage: {
    width: '90%',
    height: '80%',
  },
  closeImageButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
});

export default CategoriasScroll;