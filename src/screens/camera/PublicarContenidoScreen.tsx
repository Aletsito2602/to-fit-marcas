import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import LayerBackground from '../../components/LayerBackground';
import BackgroundPattern from '../../components/BackgroundPattern';

interface PublicarContenidoScreenProps {
  navigation: any;
  route: any;
}

const PublicarContenidoScreen: React.FC<PublicarContenidoScreenProps> = ({ navigation, route }) => {
  const { photoPath, photoData } = route.params;
  const [descripcion, setDescripcion] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [tipoPublicacion, setTipoPublicacion] = useState<'producto' | 'contenido'>('contenido');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublicar = async () => {
    if (isPublishing) return;
    
    if (!descripcion.trim()) {
      Alert.alert('Error', 'Por favor agrega una descripción');
      return;
    }

    setIsPublishing(true);
    
    try {
      // Aquí integrarías con Firebase para publicar
      // Por ahora simularemos el proceso
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular upload
      
      Alert.alert(
        'Éxito',
        '¡Contenido publicado exitosamente!',
        [
          {
            text: 'Ver publicación',
            onPress: () => {
              // Navegar a la publicación o al feed
              navigation.navigate('Home');
            }
          },
          {
            text: 'Publicar otro',
            onPress: () => {
              navigation.navigate('Camara');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error publicando:', error);
      Alert.alert('Error', 'No se pudo publicar el contenido');
    } finally {
      setIsPublishing(false);
    }
  };

  const tiposPublicacion = [
    {
      id: 'contenido',
      title: 'Contenido',
      subtitle: 'Publica como contenido general',
      icon: 'images-outline'
    },
    {
      id: 'producto',
      title: 'Producto',
      subtitle: 'Agregar como nuevo producto',
      icon: 'pricetag-outline'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <LayerBackground opacity={0.3} />
      
      <Header 
        title="Publicar"
        showBack={true}
        onBackPress={() => navigation.goBack()}
        rightComponent={() => (
          <TouchableOpacity
            onPress={handlePublicar}
            style={[styles.publishButton, isPublishing && styles.publishButtonDisabled]}
            disabled={isPublishing}
          >
            <Text style={styles.publishButtonText}>
              {isPublishing ? 'Publicando...' : 'Publicar'}
            </Text>
          </TouchableOpacity>
        )}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Preview de la imagen */}
          <View style={styles.imagePreview}>
            <Image
              source={{ uri: photoPath }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>

          {/* Tipo de publicación */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tipo de publicación</Text>
            {tiposPublicacion.map((tipo) => (
              <TouchableOpacity
                key={tipo.id}
                style={[
                  styles.tipoOption,
                  tipoPublicacion === tipo.id && styles.tipoOptionActive
                ]}
                onPress={() => setTipoPublicacion(tipo.id as 'producto' | 'contenido')}
              >
                <View style={styles.tipoOptionContent}>
                  <Ionicons 
                    name={tipo.icon as any} 
                    size={24} 
                    color={tipoPublicacion === tipo.id ? '#000000' : '#FFFFFF'} 
                  />
                  <View style={styles.tipoOptionText}>
                    <Text style={[
                      styles.tipoTitle,
                      tipoPublicacion === tipo.id && styles.tipoTitleActive
                    ]}>
                      {tipo.title}
                    </Text>
                    <Text style={[
                      styles.tipoSubtitle,
                      tipoPublicacion === tipo.id && styles.tipoSubtitleActive
                    ]}>
                      {tipo.subtitle}
                    </Text>
                  </View>
                </View>
                <Ionicons 
                  name={tipoPublicacion === tipo.id ? 'radio-button-on' : 'radio-button-off'} 
                  size={20} 
                  color={tipoPublicacion === tipo.id ? '#000000' : '#FFFFFF'} 
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Descripción */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Escribe una descripción..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
            <Text style={styles.characterCount}>
              {descripcion.length}/500
            </Text>
          </View>

          {/* Hashtags */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hashtags</Text>
            <TextInput
              style={styles.textInput}
              placeholder="#moda #outfit #tofit"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={hashtags}
              onChangeText={setHashtags}
            />
          </View>

          {/* Ubicación */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ubicación (opcional)</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={20} color="#FFFFFF" />
              <TextInput
                style={styles.locationInput}
                placeholder="Agregar ubicación"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={ubicacion}
                onChangeText={setUbicacion}
              />
            </View>
          </View>

          {/* Opciones adicionales */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Opciones</Text>
            
            <TouchableOpacity style={styles.optionItem}>
              <View style={styles.optionContent}>
                <Ionicons name="people-outline" size={20} color="#FFFFFF" />
                <Text style={styles.optionText}>Etiquetar personas</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem}>
              <View style={styles.optionContent}>
                <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
                <Text style={styles.optionText}>Configuración avanzada</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>
          </View>

          {/* Espaciado inferior */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 90, // Espacio para header
    paddingHorizontal: 20,
  },
  publishButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  publishButtonDisabled: {
    opacity: 0.6,
  },
  publishButtonText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 25,
    backgroundColor: '#1C1C1C',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  tipoOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tipoOptionActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  tipoOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tipoOptionText: {
    flex: 1,
  },
  tipoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  tipoTitleActive: {
    color: '#000000',
  },
  tipoSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  tipoSubtitleActive: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'top',
  },
  characterCount: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    textAlign: 'right',
    marginTop: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    gap: 10,
  },
  locationInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  bottomSpacer: {
    height: 100, // Espacio para teclado y navegación
  },
});

export default PublicarContenidoScreen;