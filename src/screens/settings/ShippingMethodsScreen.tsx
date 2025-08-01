import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  isActive: boolean;
  icon: string;
  type: 'standard' | 'express' | 'pickup' | 'free';
}

interface ShippingMethodsScreenProps {
  navigation: any;
}

const ShippingMethodsScreen: React.FC<ShippingMethodsScreenProps> = ({ navigation }) => {
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([
    {
      id: '1',
      name: 'Envío estándar',
      description: 'Entrega en 3-5 días hábiles',
      price: 500,
      estimatedDays: '3-5 días',
      isActive: true,
      icon: 'cube-outline',
      type: 'standard',
    },
    {
      id: '2',
      name: 'Envío express',
      description: 'Entrega en 24-48 horas',
      price: 1200,
      estimatedDays: '1-2 días',
      isActive: true,
      icon: 'flash-outline',
      type: 'express',
    },
    {
      id: '3',
      name: 'Retiro en sucursal',
      description: 'Retira en nuestras sucursales',
      price: 0,
      estimatedDays: '2-3 días',
      isActive: true,
      icon: 'storefront-outline',
      type: 'pickup',
    },
    {
      id: '4',
      name: 'Envío gratis',
      description: 'Compras mayores a $15,000',
      price: 0,
      estimatedDays: '4-6 días',
      isActive: false,
      icon: 'gift-outline',
      type: 'free',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState<ShippingMethod | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    estimatedDays: '',
  });

  const handleToggleMethod = (id: string) => {
    setShippingMethods(prev =>
      prev.map(method =>
        method.id === id ? { ...method, isActive: !method.isActive } : method
      )
    );
  };

  const handleEditMethod = (method: ShippingMethod) => {
    setEditingMethod(method);
    setFormData({
      name: method.name,
      description: method.description,
      price: method.price.toString(),
      estimatedDays: method.estimatedDays,
    });
    setShowAddModal(true);
  };

  const handleDeleteMethod = (id: string) => {
    Alert.alert(
      'Eliminar método de envío',
      '¿Estás seguro de que quieres eliminar este método de envío?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setShippingMethods(prev => prev.filter(method => method.id !== id));
          },
        },
      ]
    );
  };

  const handleSaveMethod = () => {
    if (!formData.name || !formData.description || !formData.estimatedDays) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const price = parseFloat(formData.price) || 0;

    if (editingMethod) {
      setShippingMethods(prev =>
        prev.map(method =>
          method.id === editingMethod.id
            ? {
                ...method,
                name: formData.name,
                description: formData.description,
                price,
                estimatedDays: formData.estimatedDays,
              }
            : method
        )
      );
      Alert.alert('Éxito', 'Método de envío actualizado');
    } else {
      const newMethod: ShippingMethod = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price,
        estimatedDays: formData.estimatedDays,
        isActive: true,
        icon: 'cube-outline',
        type: 'standard',
      };
      setShippingMethods(prev => [...prev, newMethod]);
      Alert.alert('Éxito', 'Método de envío agregado');
    }

    setShowAddModal(false);
    setEditingMethod(null);
    setFormData({ name: '', description: '', price: '', estimatedDays: '' });
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingMethod(null);
    setFormData({ name: '', description: '', price: '', estimatedDays: '' });
  };

  const renderShippingMethod = (method: ShippingMethod) => (
    <View key={method.id} style={styles.methodCard}>
      <View style={styles.methodHeader}>
        <View style={styles.methodInfo}>
          <Ionicons name={method.icon as any} size={24} color="#00D4AA" />
          <View style={styles.methodDetails}>
            <Text style={styles.methodName}>{method.name}</Text>
            <Text style={styles.methodDescription}>{method.description}</Text>
            <View style={styles.methodMeta}>
              <Text style={styles.methodPrice}>
                {method.price === 0 ? 'Gratis' : `$${method.price}`}
              </Text>
              <Text style={styles.methodTime}>{method.estimatedDays}</Text>
            </View>
          </View>
        </View>
        <Switch
          value={method.isActive}
          onValueChange={() => handleToggleMethod(method.id)}
          trackColor={{ false: '#333', true: '#00D4AA' }}
          thumbColor={method.isActive ? '#fff' : '#666'}
        />
      </View>

      <View style={styles.methodActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditMethod(method)}
        >
          <Ionicons name="create-outline" size={16} color="#00D4AA" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteMethod(method.id)}
        >
          <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Eliminar</Text>
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
            <Text style={styles.title}>Métodos de Envío</Text>
            <Text style={styles.subtitle}>Configura tus opciones de envío</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#00D4AA" />
          <Text style={styles.infoText}>
            Configura los métodos de envío disponibles para tus clientes. Puedes activar o desactivar cada método según tus necesidades.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Métodos configurados</Text>
          {shippingMethods.map(renderShippingMethod)}
        </View>

        <TouchableOpacity 
          style={styles.addMethodButton} 
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add-circle-outline" size={24} color="#00D4AA" />
          <Text style={styles.addMethodText}>Agregar nuevo método de envío</Text>
        </TouchableOpacity>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{shippingMethods.filter(m => m.isActive).length}</Text>
              <Text style={styles.statLabel}>Métodos activos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                ${Math.min(...shippingMethods.filter(m => m.price > 0).map(m => m.price)) || 0}
              </Text>
              <Text style={styles.statLabel}>Envío más barato</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {shippingMethods.filter(m => m.price === 0).length}
              </Text>
              <Text style={styles.statLabel}>Opciones gratuitas</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <BottomTabBar />

      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingMethod ? 'Editar Método' : 'Nuevo Método'}
            </Text>
            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={handleSaveMethod}
            >
              <Text style={styles.modalSaveText}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre del método *</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                placeholder="Ej: Envío express"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Descripción *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                placeholder="Describe el método de envío"
                placeholderTextColor="#666"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.inputLabel}>Precio ($)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.price}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
                  placeholder="0"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.inputLabel}>Tiempo estimado *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.estimatedDays}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, estimatedDays: text }))}
                  placeholder="Ej: 1-2 días"
                  placeholderTextColor="#666"
                />
              </View>
            </View>

            <View style={styles.helpCard}>
              <Ionicons name="help-circle" size={20} color="#00D4AA" />
              <Text style={styles.helpText}>
                Los campos marcados con * son obligatorios. El precio debe ser un número (usa 0 para envío gratuito).
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
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
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
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
  addButton: {
    padding: 5,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  methodCard: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodDetails: {
    marginLeft: 15,
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  methodMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 15,
  },
  methodTime: {
    fontSize: 14,
    color: '#666',
  },
  methodActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#00D4AA',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 4,
  },
  deleteButton: {
    borderColor: '#FFFFFF',
  },
  deleteButtonText: {
    color: '#FFFFFF',
  },
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00D4AA',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  addMethodText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  statsCard: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalCloseButton: {
    padding: 5,
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  modalSaveButton: {
    padding: 5,
  },
  modalSaveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#fff',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  helpText: {
    flex: 1,
    color: '#666',
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 18,
  },
});

export default ShippingMethodsScreen;