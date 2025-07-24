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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProductVariant, ProductsStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import ProductHeader from '../../components/products/ProductHeader';

type AddVariantsNavigationProp = StackNavigationProp<ProductsStackParamList, 'AddVariants'>;
type AddVariantsRouteProp = RouteProp<ProductsStackParamList, 'AddVariants'>;

interface VariantOption {
  id: string;
  name: string;
  values: string;
}

const AddVariantsScreen: React.FC = () => {
  const navigation = useNavigation<AddVariantsNavigationProp>();
  const route = useRoute<AddVariantsRouteProp>();
  const { onVariantsAdded } = route.params;

  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([
    { id: '1', name: '', values: '' }
  ]);

  const handleOptionChange = (id: string, field: 'name' | 'values', value: string) => {
    setVariantOptions(prev =>
      prev.map(option =>
        option.id === id ? { ...option, [field]: value } : option
      )
    );
  };

  const handleAddOption = () => {
    const newId = (variantOptions.length + 1).toString();
    setVariantOptions(prev => [
      ...prev,
      { id: newId, name: '', values: '' }
    ]);
  };

  const handleRemoveOption = (id: string) => {
    if (variantOptions.length === 1) {
      Alert.alert('Error', 'Debe mantener al menos una opción de variante');
      return;
    }
    
    setVariantOptions(prev => prev.filter(option => option.id !== id));
  };

  const handleDone = (optionId: string) => {
    const option = variantOptions.find(opt => opt.id === optionId);
    
    if (!option?.name.trim() || !option?.values.trim()) {
      Alert.alert('Error', 'Completa el nombre y valores de la opción');
      return;
    }

    Alert.alert('Éxito', 'Opción de variante configurada correctamente');
  };

  const handleSaveVariants = () => {
    // Validar que todas las opciones estén completas
    const incompleteOptions = variantOptions.filter(
      option => !option.name.trim() || !option.values.trim()
    );

    if (incompleteOptions.length > 0) {
      Alert.alert('Error', 'Completa todas las opciones de variantes antes de guardar');
      return;
    }

    // Convertir las opciones a variantes
    const variants: ProductVariant[] = [];
    
    variantOptions.forEach((option, optionIndex) => {
      const values = option.values.split(',').map(v => v.trim()).filter(v => v);
      
      values.forEach((value, valueIndex) => {
        variants.push({
          id: `${optionIndex}_${valueIndex}`,
          type: option.name.toLowerCase().includes('color') ? 'color' : 
                option.name.toLowerCase().includes('talla') || option.name.toLowerCase().includes('size') ? 'size' : 'style',
          name: option.name.trim(),
          value: value,
          stock: 0, // Stock inicial en 0
        });
      });
    });

    // Llamar al callback con las variantes
    onVariantsAdded(variants);
    
    Alert.alert(
      'Éxito',
      'Variantes añadidas correctamente',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const renderVariantOption = (option: VariantOption) => (
    <View key={option.id} style={styles.variantCard}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la opción"
        placeholderTextColor="#A0A0A0"
        value={option.name}
        onChangeText={(text) => handleOptionChange(option.id, 'name', text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Valores de la opción"
        placeholderTextColor="#A0A0A0"
        value={option.values}
        onChangeText={(text) => handleOptionChange(option.id, 'values', text)}
        multiline
      />

      <View style={styles.optionButtons}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveOption(option.id)}
        >
          <Text style={styles.removeButtonText}>Eliminar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => handleDone(option.id)}
        >
          <Text style={styles.doneButtonText}>Listo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      {/* Header */}
      <ProductHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título */}
        <Text style={styles.title}>Añadir variantes</Text>
        <Text style={styles.subtitle}>Añadir opciones como talla o color</Text>

        {/* Opciones de variantes */}
        {variantOptions.map(renderVariantOption)}

        {/* Botón añadir otra variante */}
        <TouchableOpacity style={styles.addVariantButton} onPress={handleAddOption}>
          <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
          <Text style={styles.addVariantText}>Añadir otra variante</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Botón guardar variantes */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveVariants}>
          <Text style={styles.saveButtonText}>Añadir variantes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
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
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 30,
  },
  variantCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  removeButton: {
    backgroundColor: '#404040',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  removeButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  doneButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  doneButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#000000',
  },
  addVariantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    gap: 10,
  },
  addVariantText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  bottomContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
});

export default AddVariantsScreen;