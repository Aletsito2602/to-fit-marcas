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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

interface PersonalInfoScreenProps {
  navigation: any;
}

const PersonalInfoScreen: React.FC<PersonalInfoScreenProps> = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    firstName: 'Alejandro',
    lastName: 'Vilte',
    email: 'alejandro@example.com',
    phone: '+54 9 11 1234-5678',
    birthDate: '15/03/1990',
    gender: 'Masculino',
    address: 'Av. Corrientes 1234, CABA',
    avatar: 'https://via.placeholder.com/100x100/333/fff?text=AV',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData(prev => ({
        ...prev,
        avatar: result.assets[0].uri,
      }));
    }
  };

  const handleSave = () => {
    Alert.alert('Éxito', 'Tu información personal ha sido actualizada');
    setIsEditing(false);
  };

  const renderField = (label: string, value: string, key: string, editable = true) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Ionicons name="person-outline" size={20} color="#FFFFFF" />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingRight}>
        {isEditing && editable ? (
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => setProfileData(prev => ({ ...prev, [key]: text }))}
            placeholderTextColor="#A0A0A0"
          />
        ) : (
          <Text style={styles.settingValue}>{value}</Text>
        )}
      </View>
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
            <Text style={styles.title}>Información Personal</Text>
            <Text style={styles.subtitle}>Gestiona tu información personal</Text>
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
        <View style={styles.avatarSection}>
          <TouchableOpacity 
            style={styles.avatarContainer}
            onPress={isEditing ? handleImagePicker : undefined}
          >
            <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
            {isEditing && (
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={20} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.avatarHint}>
            {isEditing ? 'Toca para cambiar foto' : 'Foto de perfil'}
          </Text>
        </View>

        <View style={styles.settingGroup}>
          <Text style={styles.groupTitle}>Información Básica</Text>
          <View style={styles.groupContainer}>
            {renderField('Nombre', profileData.firstName, 'firstName')}
            {renderField('Apellido', profileData.lastName, 'lastName')}
            {renderField('Fecha de Nacimiento', profileData.birthDate, 'birthDate')}
            {renderField('Género', profileData.gender, 'gender')}
          </View>
        </View>

        <View style={styles.settingGroup}>
          <Text style={styles.groupTitle}>Contacto</Text>
          <View style={styles.groupContainer}>
            {renderField('Email', profileData.email, 'email', false)}
            {renderField('Teléfono', profileData.phone, 'phone')}
            {renderField('Dirección', profileData.address, 'address')}
          </View>
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333333',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(41, 41, 41, 1)',
  },
  avatarHint: {
    color: '#A0A0A0',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
  },
  settingGroup: {
    marginBottom: 30,
  },
  groupTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  groupContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginRight: 8,
  },
  textInput: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    backgroundColor: '#333333',
    padding: 8,
    borderRadius: 6,
    minWidth: 120,
    textAlign: 'right',
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#A0A0A0',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  saveButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default PersonalInfoScreen;