import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
  icon: string;
}

interface PaymentMethodsScreenProps {
  navigation: any;
}

const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({ navigation }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa terminada en 4532',
      details: 'Expira 12/25',
      isDefault: true,
      icon: 'card',
    },
    {
      id: '2',
      type: 'card',
      name: 'Mastercard terminada en 8765',
      details: 'Expira 08/26',
      isDefault: false,
      icon: 'card',
    },
    {
      id: '3',
      type: 'paypal',
      name: 'PayPal',
      details: 'alejandro@example.com',
      isDefault: false,
      icon: 'logo-paypal',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCardData, setNewCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
  });

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    Alert.alert('Éxito', 'Método de pago predeterminado actualizado');
  };

  const handleDeleteMethod = (id: string) => {
    Alert.alert(
      'Eliminar método de pago',
      '¿Estás seguro de que quieres eliminar este método de pago?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(prev => prev.filter(method => method.id !== id));
          },
        },
      ]
    );
  };

  const handleAddCard = () => {
    if (!newCardData.cardNumber || !newCardData.expiryDate || !newCardData.cvv || !newCardData.holderName) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const newCard: PaymentMethod = {
      id: Date.now().toString(),
      type: 'card',
      name: `Tarjeta terminada en ${newCardData.cardNumber.slice(-4)}`,
      details: `Expira ${newCardData.expiryDate}`,
      isDefault: false,
      icon: 'card',
    };

    setPaymentMethods(prev => [...prev, newCard]);
    setNewCardData({ cardNumber: '', expiryDate: '', cvv: '', holderName: '' });
    setShowAddModal(false);
    Alert.alert('Éxito', 'Tarjeta agregada exitosamente');
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted;
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const renderPaymentMethod = (method: PaymentMethod) => (
    <View key={method.id} style={styles.methodCard}>
      <View style={styles.methodHeader}>
        <View style={styles.methodInfo}>
          <Ionicons name={method.icon as any} size={24} color="#00D4AA" />
          <View style={styles.methodDetails}>
            <Text style={styles.methodName}>{method.name}</Text>
            <Text style={styles.methodSubtitle}>{method.details}</Text>
          </View>
        </View>
        {method.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Por defecto</Text>
          </View>
        )}
      </View>
      
      <View style={styles.methodActions}>
        {!method.isDefault && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSetDefault(method.id)}
          >
            <Text style={styles.actionButtonText}>Predeterminado</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteMethod(method.id)}
        >
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
            <Text style={styles.title}>Métodos de Pago</Text>
            <Text style={styles.subtitle}>Gestiona tus métodos de pago</Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Métodos guardados</Text>
          {paymentMethods.map(renderPaymentMethod)}
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark" size={24} color="#00D4AA" />
          <Text style={styles.infoText}>
            Tus datos de pago están protegidos con encriptación de nivel bancario.
          </Text>
        </View>

        <TouchableOpacity style={styles.addMethodButton} onPress={() => setShowAddModal(true)}>
          <Ionicons name="add-circle-outline" size={24} color="#00D4AA" />
          <Text style={styles.addMethodText}>Agregar nuevo método de pago</Text>
        </TouchableOpacity>
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
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Agregar Tarjeta</Text>
            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={handleAddCard}
            >
              <Text style={styles.modalSaveText}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Número de tarjeta</Text>
              <TextInput
                style={styles.input}
                value={formatCardNumber(newCardData.cardNumber)}
                onChangeText={(text) => setNewCardData(prev => ({ ...prev, cardNumber: text.replace(/\s/g, '') }))}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#666"
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                <Text style={styles.inputLabel}>Fecha de expiración</Text>
                <TextInput
                  style={styles.input}
                  value={formatExpiryDate(newCardData.expiryDate)}
                  onChangeText={(text) => setNewCardData(prev => ({ ...prev, expiryDate: text.replace(/\D/g, '') }))}
                  placeholder="MM/AA"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={newCardData.cvv}
                  onChangeText={(text) => setNewCardData(prev => ({ ...prev, cvv: text }))}
                  placeholder="123"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre del titular</Text>
              <TextInput
                style={styles.input}
                value={newCardData.holderName}
                onChangeText={(text) => setNewCardData(prev => ({ ...prev, holderName: text }))}
                placeholder="Nombre como aparece en la tarjeta"
                placeholderTextColor="#666"
                autoCapitalize="words"
              />
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
  addButton: {
    padding: 5,
  },
  section: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  methodCard: {
    backgroundColor: '#2a2a2a',
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
  methodSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  defaultBadge: {
    backgroundColor: '#00D4AA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  methodActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#00D4AA',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#00D4AA',
    fontWeight: '500',
  },
  deleteButton: {
    borderColor: '#FFFFFF',
  },
  deleteButtonText: {
    color: '#FFFFFF',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 20,
  },
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00D4AA',
    borderStyle: 'dashed',
    marginBottom: 30,
  },
  addMethodText: {
    color: '#00D4AA',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
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
    color: '#00D4AA',
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
    color: '#00D4AA',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#fff',
  },
  rowInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PaymentMethodsScreen;