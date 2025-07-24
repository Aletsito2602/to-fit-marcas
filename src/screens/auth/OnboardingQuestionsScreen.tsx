import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import BackgroundPattern from '../../components/BackgroundPattern';
import LayerBackground from '../../components/LayerBackground';

const OnboardingQuestionsScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasStore, setHasStore] = useState<string | null>(null);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  
  const navigation = useNavigation();
  const { user, firebaseUser } = useAuth();

  const productTypes = [
    'Todos',
    'Ropa',
    'Calzado',
    'Accesorios',
    'Belleza'
  ];

  const handleStoreAnswer = (answer: string) => {
    setHasStore(answer);
    setCurrentStep(1);
  };

  const toggleProductType = (type: string) => {
    if (type === 'Todos') {
      // Si selecciona "Todos", marcar todos los demás
      if (selectedProductTypes.includes('Todos')) {
        setSelectedProductTypes([]);
      } else {
        setSelectedProductTypes(productTypes);
      }
    } else {
      // Lógica normal para otros tipos
      setSelectedProductTypes(prev => {
        const newSelection = prev.includes(type) 
          ? prev.filter(t => t !== type)
          : [...prev.filter(t => t !== 'Todos'), type];
        
        // Si se seleccionan todos los tipos excepto "Todos", agregar "Todos"
        if (newSelection.length === productTypes.length - 1 && !newSelection.includes('Todos')) {
          return [...newSelection, 'Todos'];
        }
        
        return newSelection;
      });
    }
  };

  const handleNext = async () => {
    if (currentStep === 0 && hasStore) {
      setCurrentStep(1);
    } else if (currentStep === 1 && selectedProductTypes.length > 0) {
      // Guardar datos del onboarding para usuario autenticado
      if (firebaseUser) {
        try {
          await updateDoc(doc(db, 'users', firebaseUser.uid), {
            hasStore: hasStore === 'Ya tengo tienda online o física',
            storeType: hasStore,
            productTypes: selectedProductTypes,
            onboardingCompleted: true,
          });
          // La navegación se manejará automáticamente por el AuthNavigator
        } catch (error) {
          console.error('Error updating user data:', error);
          Alert.alert('Error', 'No se pudo completar el onboarding. Inténtalo de nuevo.');
        }
      } else {
        // Si no hay usuario autenticado, navegar al registro
        navigation.navigate('Register' as never, {
          onboardingData: {
            hasStore,
            productTypes: selectedProductTypes,
          }
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
    } else {
      navigation.goBack();
    }
  };

  const renderStoreQuestion = () => (
    <View style={styles.questionContainer}>
      {/* Header con botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handlePrevious}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Título y subtítulo */}
      <Text style={styles.questionTitle}>¿Qué te describe mejor?</Text>
      <Text style={styles.questionSubtitle}>
        Esto nos ayuda a sugerir la incorporación adecuada.
      </Text>
      
      {/* Opciones */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton, 
            hasStore === 'Ya tengo tienda online o física' && styles.selectedOption
          ]}
          onPress={() => handleStoreAnswer('Ya tengo tienda online o física')}
        >
          <Text style={[
            styles.optionText, 
            hasStore === 'Ya tengo tienda online o física' && styles.selectedOptionText
          ]}>
            Ya tengo tienda online o física
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.optionButton, 
            hasStore === 'Aún no tengo tienda' && styles.selectedOption
          ]}
          onPress={() => handleStoreAnswer('Aún no tengo tienda')}
        >
          <Text style={[
            styles.optionText, 
            hasStore === 'Aún no tengo tienda' && styles.selectedOptionText
          ]}>
            Aún no tengo tienda
          </Text>
        </TouchableOpacity>
      </View>

      {/* Botones de navegación */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.previousButton}
          onPress={handlePrevious}
        >
          <Text style={styles.previousButtonText}>Anterior</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.nextButton, !hasStore && styles.disabledButton]}
          onPress={handleNext}
          disabled={!hasStore}
        >
          <Text style={[styles.nextButtonText, !hasStore && styles.disabledButtonText]}>
            Siguiente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProductTypesQuestion = () => (
    <View style={styles.questionContainer}>
      {/* Header con botón de retroceso */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handlePrevious}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Título y subtítulo */}
      <Text style={styles.questionTitle}>¿Qué tienes pensado vender?</Text>
      <Text style={styles.questionSubtitle}>
        Te ayudaremos a importar los productos, clientes y datos de la tienda.
      </Text>
      
      {/* Opciones con checkboxes */}
      <View style={styles.optionsContainer}>
        {productTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.optionButtonWithIcon,
              selectedProductTypes.includes(type) && styles.selectedOption
            ]}
            onPress={() => toggleProductType(type)}
          >
            <Text style={[
              styles.optionText,
              selectedProductTypes.includes(type) && styles.selectedOptionText
            ]}>
              {type}
            </Text>
            <Ionicons 
              name={selectedProductTypes.includes(type) ? "checkbox-outline" : "square-outline"} 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones de navegación */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.previousButton}
          onPress={handlePrevious}
        >
          <Text style={styles.previousButtonText}>Anterior</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.nextButton, selectedProductTypes.length === 0 && styles.disabledButton]}
          onPress={handleNext}
          disabled={selectedProductTypes.length === 0}
        >
          <Text style={[styles.nextButtonText, selectedProductTypes.length === 0 && styles.disabledButtonText]}>
            Siguiente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.04} />
      <LayerBackground opacity={0.3} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Contenido dinámico */}
        {currentStep === 0 && renderStoreQuestion()}
        {currentStep === 1 && renderProductTypesQuestion()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  questionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  questionSubtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginHorizontal: 10,
    marginBottom: 50,
    lineHeight: 24,
  },
  optionsContainer: {
    flex: 1,
    marginBottom: 40,
  },
  optionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonWithIcon: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  selectedOption: {
    backgroundColor: '#FFFFFF',
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectedOptionText: {
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 40,
  },
  previousButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 18,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previousButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingVertical: 18,
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    opacity: 0.5,
  },
});

export default OnboardingQuestionsScreen;