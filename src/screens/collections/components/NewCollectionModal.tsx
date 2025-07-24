import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NewCollectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (collectionData: CollectionData) => void;
}

export interface CollectionData {
  name: string;
  description: string;
  image: string;
  status: 'active' | 'draft';
}

const NewCollectionModal: React.FC<NewCollectionModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [status, setStatus] = useState<'active' | 'draft'>('active');

  const predefinedImages = [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
  ];

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre de la colección es obligatorio');
      return;
    }

    const collectionData: CollectionData = {
      name: name.trim(),
      description: description.trim(),
      image: selectedImage || predefinedImages[0],
      status,
    };

    onSave(collectionData);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setSelectedImage('');
    setStatus('active');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.title}>Nueva Colección</Text>
          
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Collection Name */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nombre de la colección *</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Ej: Verano 2025"
              placeholderTextColor="#A0A0A0"
              maxLength={50}
            />
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe tu colección..."
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={3}
              maxLength={200}
            />
          </View>

          {/* Image Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Imagen de portada</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imagesContainer}
              contentContainerStyle={styles.imagesContent}
            >
              {predefinedImages.map((imageUrl, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.imageOption,
                    selectedImage === imageUrl && styles.selectedImage
                  ]}
                  onPress={() => setSelectedImage(imageUrl)}
                >
                  <Image source={{ uri: imageUrl }} style={styles.image} />
                  {selectedImage === imageUrl && (
                    <View style={styles.selectedOverlay}>
                      <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estado</Text>
            <View style={styles.statusContainer}>
              <TouchableOpacity
                style={[
                  styles.statusOption,
                  status === 'active' && styles.selectedStatus
                ]}
                onPress={() => setStatus('active')}
              >
                <View style={styles.statusContent}>
                  <Ionicons 
                    name="checkmark-circle" 
                    size={20} 
                    color={status === 'active' ? '#4ADE80' : '#A0A0A0'} 
                  />
                  <View style={styles.statusInfo}>
                    <Text style={[
                      styles.statusTitle,
                      status === 'active' && styles.selectedStatusText
                    ]}>
                      Activa
                    </Text>
                    <Text style={styles.statusDescription}>
                      Visible para clientes
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.statusOption,
                  status === 'draft' && styles.selectedStatus
                ]}
                onPress={() => setStatus('draft')}
              >
                <View style={styles.statusContent}>
                  <Ionicons 
                    name="create-outline" 
                    size={20} 
                    color={status === 'draft' ? '#F59E0B' : '#A0A0A0'} 
                  />
                  <View style={styles.statusInfo}>
                    <Text style={[
                      styles.statusTitle,
                      status === 'draft' && styles.selectedStatusText
                    ]}>
                      Borrador
                    </Text>
                    <Text style={styles.statusDescription}>
                      Solo visible para ti
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#007AFF" />
            <Text style={styles.infoText}>
              Después de crear la colección podrás agregar productos desde el catálogo
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  closeButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  imagesContainer: {
    marginVertical: 5,
  },
  imagesContent: {
    gap: 10,
  },
  imageOption: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
  },
  statusContainer: {
    gap: 10,
  },
  statusOption: {
    backgroundColor: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
  },
  selectedStatus: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    marginLeft: 12,
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  selectedStatusText: {
    color: '#007AFF',
  },
  statusDescription: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 25,
    marginBottom: 30,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#007AFF',
    marginLeft: 8,
    lineHeight: 18,
  },
});

export default NewCollectionModal;