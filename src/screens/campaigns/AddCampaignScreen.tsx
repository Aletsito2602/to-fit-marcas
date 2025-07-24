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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';

interface FormData {
  nombre: string;
  cantidadAfiliados: string;
  diasDuracion: string;
  campañaAbierta: boolean;
  nombreUbicacion: string;
  comisionAfiliados: string;
  objetivos: string;
}

const AddCampaignScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    cantidadAfiliados: '10',
    diasDuracion: '10',
    campañaAbierta: true,
    nombreUbicacion: '',
    comisionAfiliados: '10',
    objetivos: '',
  });

  const handleContinuar = () => {
    if (!formData.nombre.trim()) {
      Alert.alert('Error', 'El nombre de la campaña es requerido');
      return;
    }
    navigation.navigate('SelectProducts' as never);
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
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
            {/* Nombre */}
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={formData.nombre}
              onChangeText={(text) => updateFormData('nombre', text)}
              placeholder="Nombre de la campaña"
              placeholderTextColor="#A0A0A0"
            />

            {/* Cantidad de afiliados y Días de duración */}
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Cantidad de afiliados</Text>
                <TextInput
                  style={styles.input}
                  value={formData.cantidadAfiliados}
                  onChangeText={(text) => updateFormData('cantidadAfiliados', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Días de duración</Text>
                <TextInput
                  style={styles.input}
                  value={formData.diasDuracion}
                  onChangeText={(text) => updateFormData('diasDuracion', text)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Campaña abierta */}
            <Text style={styles.label}>Campaña abierta</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => updateFormData('campañaAbierta', true)}
              >
                <View style={formData.campañaAbierta ? styles.radioSelected : styles.radioUnselected} />
                <Text style={styles.radioText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.radioOption}
                onPress={() => updateFormData('campañaAbierta', false)}
              >
                <View style={!formData.campañaAbierta ? styles.radioSelected : styles.radioUnselected} />
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>

            {/* Nombre ubicación */}
            <Text style={styles.label}>Nombre ubicación</Text>
            <TextInput
              style={styles.input}
              value={formData.nombreUbicacion}
              onChangeText={(text) => updateFormData('nombreUbicacion', text)}
              placeholder="Ubicación de la campaña"
              placeholderTextColor="#A0A0A0"
            />

            {/* Comisión para afiliados */}
            <Text style={styles.label}>Comisión para afiliados</Text>
            <TouchableOpacity style={styles.pickerContainer}>
              <Text style={styles.pickerValue}>{formData.comisionAfiliados}%</Text>
              <Ionicons name="chevron-down" size={20} color="#A0A0A0" />
            </TouchableOpacity>

            {/* Objetivos */}
            <Text style={styles.label}>Objetivos</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.objetivos}
              onChangeText={(text) => updateFormData('objetivos', text)}
              placeholder="Ej: Objetivo 5 posts por campaña"
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinuar}>
            <Text style={styles.continueButtonText}>Continuar</Text>
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
});

export default AddCampaignScreen;