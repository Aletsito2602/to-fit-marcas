import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

interface ChangePasswordScreenProps {
  navigation: any;
}

const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    if (!formData.currentPassword) {
      Alert.alert('Error', 'Ingresa tu contraseña actual');
      return false;
    }
    if (formData.newPassword.length < 8) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 8 caracteres');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert(
        'Éxito',
        'Tu contraseña ha sido cambiada exitosamente',
        [{ text: 'OK', onPress: () => navigation.navigate('Settings') }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo cambiar la contraseña. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordInput = (
    label: string,
    field: 'currentPassword' | 'newPassword' | 'confirmPassword',
    showField: 'current' | 'new' | 'confirm',
    placeholder: string
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          placeholder={placeholder}
          placeholderTextColor="#666"
          secureTextEntry={!showPasswords[showField]}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => togglePasswordVisibility(showField)}
        >
          <Ionicons
            name={showPasswords[showField] ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
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
            <Text style={styles.title}>Cambiar Contraseña</Text>
            <Text style={styles.subtitle}>Actualiza tu contraseña de forma segura</Text>
          </View>
        </View>
        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark" size={24} color="#00D4AA" />
          <Text style={styles.infoText}>
            Tu contraseña debe tener al menos 8 caracteres e incluir una combinación de letras, números y símbolos.
          </Text>
        </View>

        <View style={styles.form}>
          {renderPasswordInput(
            'Contraseña Actual',
            'currentPassword',
            'current',
            'Ingresa tu contraseña actual'
          )}

          {renderPasswordInput(
            'Nueva Contraseña',
            'newPassword',
            'new',
            'Nueva contraseña (mín. 8 caracteres)'
          )}

          {renderPasswordInput(
            'Confirmar Nueva Contraseña',
            'confirmPassword',
            'confirm',
            'Confirma tu nueva contraseña'
          )}

          <View style={styles.requirementsCard}>
            <Text style={styles.requirementsTitle}>Requisitos de la contraseña:</Text>
            <View style={styles.requirement}>
              <Ionicons 
                name={formData.newPassword.length >= 8 ? "checkmark-circle" : "ellipse-outline"} 
                size={16} 
                color={formData.newPassword.length >= 8 ? "#00D4AA" : "#666"} 
              />
              <Text style={[
                styles.requirementText,
                formData.newPassword.length >= 8 && styles.requirementMet
              ]}>
                Al menos 8 caracteres
              </Text>
            </View>
            <View style={styles.requirement}>
              <Ionicons 
                name={/[A-Z]/.test(formData.newPassword) ? "checkmark-circle" : "ellipse-outline"} 
                size={16} 
                color={/[A-Z]/.test(formData.newPassword) ? "#00D4AA" : "#666"} 
              />
              <Text style={[
                styles.requirementText,
                /[A-Z]/.test(formData.newPassword) && styles.requirementMet
              ]}>
                Una letra mayúscula
              </Text>
            </View>
            <View style={styles.requirement}>
              <Ionicons 
                name={/[0-9]/.test(formData.newPassword) ? "checkmark-circle" : "ellipse-outline"} 
                size={16} 
                color={/[0-9]/.test(formData.newPassword) ? "#00D4AA" : "#666"} 
              />
              <Text style={[
                styles.requirementText,
                /[0-9]/.test(formData.newPassword) && styles.requirementMet
              ]}>
                Un número
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.changeButton, loading && styles.changeButtonDisabled]}
          onPress={handleChangePassword}
          disabled={loading}
        >
          <Text style={styles.changeButtonText}>
            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => Alert.alert('Información', 'Contacta a soporte para recuperar tu contraseña')}
        >
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña actual?</Text>
        </TouchableOpacity>
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  infoText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 20,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    padding: 15,
  },
  eyeIcon: {
    padding: 15,
  },
  requirementsCard: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  requirementsTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 10,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
  },
  requirementMet: {
    color: '#FFFFFF',
  },
  changeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  changeButtonDisabled: {
    backgroundColor: '#333',
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default ChangePasswordScreen;