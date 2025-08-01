import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

interface StoreConfigScreenProps {
  navigation: any;
}

const StoreConfigScreen: React.FC<StoreConfigScreenProps> = ({ navigation }) => {
  const [storeData, setStoreData] = useState({
    storeName: 'To FIT Store',
    description: 'Tienda de ropa deportiva y casual para todos los estilos',
    logo: 'https://via.placeholder.com/100x100/00D4AA/fff?text=TF',
    banner: 'https://via.placeholder.com/300x150/333/fff?text=Banner',
    category: 'Ropa y Accesorios',
    location: 'Buenos Aires, Argentina',
    phone: '+54 9 11 1234-5678',
    email: 'tienda@tofit.com',
    website: 'www.tofit.com',
    socialMedia: {
      instagram: '@tofit_store',
      facebook: 'To FIT Store',
      twitter: '@tofit',
    },
  });

  const [settings, setSettings] = useState({
    isPublic: true,
    allowMessages: true,
    autoReply: false,
    showRatings: true,
    allowReviews: true,
    showInventory: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleImagePicker = async (type: 'logo' | 'banner') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'logo' ? [1, 1] : [2, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setStoreData(prev => ({
        ...prev,
        [type]: result.assets[0].uri,
      }));
    }
  };

  const handleSave = () => {
    Alert.alert('Éxito', 'Configuración de tienda actualizada');
    setIsEditing(false);
  };

  const handleToggleSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderField = (label: string, value: string, key: string, multiline = false) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={[styles.textInput, multiline && styles.textArea]}
          value={value}
          onChangeText={(text) => setStoreData(prev => ({ ...prev, [key]: text }))}
          placeholderTextColor="#666"
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
        />
      ) : (
        <Text style={[styles.fieldValue, multiline && styles.fieldValueMultiline]}>{value}</Text>
      )}
    </View>
  );

  const renderSocialField = (label: string, value: string, key: string) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={(text) => setStoreData(prev => ({ 
            ...prev, 
            socialMedia: { ...prev.socialMedia, [key]: text }
          }))}
          placeholderTextColor="#666"
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  const renderToggleSetting = (label: string, description: string, key: string) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={settings[key as keyof typeof settings]}
        onValueChange={(value) => handleToggleSetting(key, value)}
        trackColor={{ false: '#333', true: '#00D4AA' }}
        thumbColor={settings[key as keyof typeof settings] ? '#fff' : '#666'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Configuración de Tienda</Text>
            <Text style={styles.subtitle}>Personaliza tu tienda</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Ionicons 
              name={isEditing ? "checkmark" : "create-outline"} 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>Imágenes de la tienda</Text>
          
          <View style={styles.imageRow}>
            <View style={styles.imageContainer}>
              <Text style={styles.imageLabel}>Logo</Text>
              <TouchableOpacity 
                style={styles.logoContainer}
                onPress={isEditing ? () => handleImagePicker('logo') : undefined}
              >
                <Image source={{ uri: storeData.logo }} style={styles.logo} />
                {isEditing && (
                  <View style={styles.cameraIcon}>
                    <Ionicons name="camera" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
              <Text style={styles.imageLabel}>Banner</Text>
              <TouchableOpacity 
                style={styles.bannerContainer}
                onPress={isEditing ? () => handleImagePicker('banner') : undefined}
              >
                <Image source={{ uri: storeData.banner }} style={styles.banner} />
                {isEditing && (
                  <View style={styles.cameraIcon}>
                    <Ionicons name="camera" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Información básica</Text>
          {renderField('Nombre de la tienda', storeData.storeName, 'storeName')}
          {renderField('Descripción', storeData.description, 'description', true)}
          {renderField('Categoría', storeData.category, 'category')}
          {renderField('Ubicación', storeData.location, 'location')}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Información de contacto</Text>
          {renderField('Teléfono', storeData.phone, 'phone')}
          {renderField('Email', storeData.email, 'email')}
          {renderField('Sitio web', storeData.website, 'website')}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Redes sociales</Text>
          {renderSocialField('Instagram', storeData.socialMedia.instagram, 'instagram')}
          {renderSocialField('Facebook', storeData.socialMedia.facebook, 'facebook')}
          {renderSocialField('Twitter', storeData.socialMedia.twitter, 'twitter')}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Configuración de privacidad</Text>
          {renderToggleSetting(
            'Tienda pública',
            'Permite que otros usuarios encuentren tu tienda',
            'isPublic'
          )}
          {renderToggleSetting(
            'Permitir mensajes',
            'Los clientes pueden enviarte mensajes directos',
            'allowMessages'
          )}
          {renderToggleSetting(
            'Respuesta automática',
            'Envía respuestas automáticas a los mensajes',
            'autoReply'
          )}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Configuración de productos</Text>
          {renderToggleSetting(
            'Mostrar calificaciones',
            'Muestra las calificaciones de productos en tu tienda',
            'showRatings'
          )}
          {renderToggleSetting(
            'Permitir reseñas',
            'Los clientes pueden dejar reseñas en tus productos',
            'allowReviews'
          )}
          {renderToggleSetting(
            'Mostrar inventario',
            'Muestra la cantidad disponible de cada producto',
            'showInventory'
          )}
        </View>

        {isEditing && (
          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      <BottomTabBar />
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
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
  },
  titleWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  editButton: {
    padding: 5,
  },
  imageSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  imageLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: '500',
  },
  logoContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333',
  },
  bannerContainer: {
    position: 'relative',
  },
  banner: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a1a',
  },
  formSection: {
    marginBottom: 30,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  fieldValue: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
  },
  fieldValueMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  textInput: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00D4AA',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StoreConfigScreen;