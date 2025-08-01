import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import { useCampaigns } from '../../hooks/useCampaigns';
import { FirebaseCampaign } from '../../services/campaignsService';

interface FormData {
  marca: string;
  comision: string;
  imagen: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  nombreCampañante: string;
  objetivo: string;
  publicoObjetivo: string;
  mercado: string;
  contenidoIncluido: string[];
  linkAfiliacion: string;
  linkDuracion: string;
  reglas: string;
  seguimiento: string;
  status: 'active' | 'inactive' | 'pending' | 'completed';
}

const AddCampaignScreen: React.FC = () => {
  const navigation = useNavigation();
  const { createCampaign } = useCampaigns();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    marca: '',
    comision: '',
    imagen: '',
    descripcion: '',
    fechaInicio: new Date(),
    fechaFin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    nombreCampañante: '',
    objetivo: '',
    publicoObjetivo: '',
    mercado: '',
    contenidoIncluido: [],
    linkAfiliacion: '',
    linkDuracion: '',
    reglas: '',
    seguimiento: '',
    status: 'pending',
  });

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Error', 'Se necesitan permisos para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData(prev => ({ ...prev, imagen: result.assets[0].uri }));
    }
  };

  const handleCreateCampaign = async () => {
    if (!formData.marca.trim()) {
      Alert.alert('Error', 'El nombre de la marca es requerido');
      return;
    }

    if (!formData.comision.trim()) {
      Alert.alert('Error', 'La comisión es requerida');
      return;
    }

    setLoading(true);

    try {
      const campaignData: Omit<FirebaseCampaign, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'> = {
        marca: formData.marca,
        comision: formData.comision,
        imagen: formData.imagen || 'https://via.placeholder.com/400x300/333/fff?text=' + formData.marca,
        descripcion: formData.descripcion,
        fechaInicio: formData.fechaInicio,
        fechaFin: formData.fechaFin,
        nombreCampañante: formData.nombreCampañante,
        objetivo: formData.objetivo,
        publicoObjetivo: formData.publicoObjetivo,
        mercado: formData.mercado,
        contenidoIncluido: formData.contenidoIncluido,
        links: {
          afiliacion: formData.linkAfiliacion,
          duracion: formData.linkDuracion,
        },
        materiales: [],
        productos: [],
        reglas: formData.reglas,
        seguimiento: formData.seguimiento,
        contenido: {
          historia: [],
          post: [],
          video: [],
        },
        status: formData.status,
      };

      await createCampaign(campaignData);
      
      Alert.alert(
        'Éxito',
        'Campaña creada exitosamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la campaña. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  const updateFormData = (field: keyof FormData, value: string | boolean | Date | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      <Header />

      <View style={styles.content}>
        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Añadir campaña</Text>
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.form}>
            {/* Imagen de campaña */}
            <Text style={styles.label}>Imagen de campaña</Text>
            <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
              {formData.imagen ? (
                <Image source={{ uri: formData.imagen }} style={styles.uploadedImage} />
              ) : (
                <>
                  <Ionicons name="camera-outline" size={32} color="#A0A0A0" />
                  <Text style={styles.imageUploadText}>Subir imagen</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Marca */}
            <Text style={styles.label}>Marca</Text>
            <TextInput
              style={styles.input}
              value={formData.marca}
              onChangeText={(text) => updateFormData('marca', text)}
              placeholder="Nombre de la marca"
              placeholderTextColor="#A0A0A0"
            />

            {/* Comisión */}
            <Text style={styles.label}>Comisión</Text>
            <TextInput
              style={styles.input}
              value={formData.comision}
              onChangeText={(text) => updateFormData('comision', text)}
              placeholder="Ej: $18 USD/10%"
              placeholderTextColor="#A0A0A0"
            />

            {/* Descripción */}
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.descripcion}
              onChangeText={(text) => updateFormData('descripcion', text)}
              placeholder="Descripción de la campaña"
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            {/* Nombre Campañante */}
            <Text style={styles.label}>Nombre del campañante</Text>
            <TextInput
              style={styles.input}
              value={formData.nombreCampañante}
              onChangeText={(text) => updateFormData('nombreCampañante', text)}
              placeholder="Ej: Red Flag Marketing"
              placeholderTextColor="#A0A0A0"
            />

            {/* Objetivo */}
            <Text style={styles.label}>Objetivo</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.objetivo}
              onChangeText={(text) => updateFormData('objetivo', text)}
              placeholder="Aumentar el reconocimiento de marca..."
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            {/* Público Objetivo */}
            <Text style={styles.label}>Público objetivo</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.publicoObjetivo}
              onChangeText={(text) => updateFormData('publicoObjetivo', text)}
              placeholder="Dirigido a jóvenes entre 18 y 30 años..."
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            {/* Mercado */}
            <Text style={styles.label}>¿Qué busca la marca?</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.mercado}
              onChangeText={(text) => updateFormData('mercado', text)}
              placeholder="La marca busca retomar campañas..."
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            {/* Links */}
            <Text style={styles.label}>Link de afiliación</Text>
            <TextInput
              style={styles.input}
              value={formData.linkAfiliacion}
              onChangeText={(text) => updateFormData('linkAfiliacion', text)}
              placeholder="https://bit.ly/3kJ8vG3"
              placeholderTextColor="#A0A0A0"
            />

            <Text style={styles.label}>Link de duración</Text>
            <TextInput
              style={styles.input}
              value={formData.linkDuracion}
              onChangeText={(text) => updateFormData('linkDuracion', text)}
              placeholder="https://bit.ly/2N2v3d"
              placeholderTextColor="#A0A0A0"
            />

            {/* Reglas */}
            <Text style={styles.label}>Reglas de afiliación</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.reglas}
              onChangeText={(text) => updateFormData('reglas', text)}
              placeholder="No está permitido hacer publicidad directa..."
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* Seguimiento */}
            <Text style={styles.label}>Seguimiento</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.seguimiento}
              onChangeText={(text) => updateFormData('seguimiento', text)}
              placeholder="Seguimiento de afiliación..."
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* Estado */}
            <Text style={styles.label}>Estado de la campaña</Text>
            <View style={styles.statusContainer}>
              {['pending', 'active', 'inactive', 'completed'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusButton,
                    formData.status === status && styles.statusButtonActive
                  ]}
                  onPress={() => updateFormData('status', status as any)}
                >
                  <Text style={[
                    styles.statusText,
                    formData.status === status && styles.statusTextActive
                  ]}>
                    {status === 'pending' ? 'Pendiente' :
                     status === 'active' ? 'Activa' :
                     status === 'inactive' ? 'Inactiva' : 'Completada'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.continueButton, loading && styles.disabledButton]} 
            onPress={handleCreateCampaign}
            disabled={loading}
          >
            <Text style={styles.continueButtonText}>
              {loading ? 'Creando...' : 'Crear Campaña'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingTop: 55,
  },
  titleContainer: {
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  form: {
    padding: 25,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1C1C1C',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4A90E2',
    marginRight: 8,
  },
  radioUnselected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderColor: '#A0A0A0',
    borderWidth: 1,
    marginRight: 8,
  },
  radioText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#1C1C1C',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pickerValue: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  continueButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  imageUploadButton: {
    backgroundColor: '#1C1C1C',
    borderColor: '#333333',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    minHeight: 120,
  },
  imageUploadText: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 8,
  },
  uploadedImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  statusButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  statusButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  statusText: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  statusTextActive: {
    color: '#FFFFFF',
  },
});

export default AddCampaignScreen;