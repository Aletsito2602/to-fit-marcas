import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Order, OrderItem, OrdersStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';

type AddEditOrderNavigationProp = StackNavigationProp<OrdersStackParamList, 'AddEditOrder'>;
type AddEditOrderRouteProp = RouteProp<OrdersStackParamList, 'AddEditOrder'>;

const AddEditOrderScreen: React.FC = () => {
  const navigation = useNavigation<AddEditOrderNavigationProp>();
  const route = useRoute<AddEditOrderRouteProp>();
  const { orderId } = route.params || {};

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    orderNotes: '',
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
    isPaid: false,
  });

  const [selectedProducts, setSelectedProducts] = useState<OrderItem[]>([]);

  const isEditing = !!orderId;

  useEffect(() => {
    if (isEditing) {
      // Mock data loading - en producción esto vendría de una API
      const mockOrder: Order = {
        id: orderId,
        customer: {
          id: '1',
          name: 'Arthuro Lopez',
          email: 'arthuro.lopez@email.com',
          phone: '+1 234 567 8900',
          address: '123 Main St, City, State 12345',
        },
        items: [
          {
            productId: '1',
            productName: 'Zapatillas running adidas',
            quantity: 2,
            price: 89.99,
            total: 179.98,
          },
        ],
        subtotal: 179.98,
        discount: 0,
        total: 179.98,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setFormData({
        customerName: mockOrder.customer.name,
        customerEmail: mockOrder.customer.email,
        customerPhone: mockOrder.customer.phone || '',
        shippingAddress: mockOrder.customer.address || '',
        orderNotes: '',
        subtotal: mockOrder.subtotal,
        shipping: 0,
        discount: mockOrder.discount,
        total: mockOrder.total,
        isPaid: mockOrder.paymentStatus === 'paid',
      });

      setSelectedProducts(mockOrder.items);
    }
  }, [isEditing, orderId]);

  useEffect(() => {
    // Recalcular totales cuando cambien los productos
    const subtotal = selectedProducts.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal + formData.shipping - formData.discount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      total: Math.max(0, total), // Asegurar que el total no sea negativo
    }));
  }, [selectedProducts, formData.shipping, formData.discount]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectProducts = () => {
    navigation.navigate('SelectProducts', {
      selectedProducts,
      onProductsSelected: (products: OrderItem[]) => {
        setSelectedProducts(products);
      }
    });
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(item => item.productId !== productId));
  };

  const handleSave = () => {
    // Validaciones básicas
    if (!formData.customerName.trim()) {
      Alert.alert('Error', 'El nombre del cliente es obligatorio');
      return;
    }

    if (!formData.customerEmail.trim()) {
      Alert.alert('Error', 'El email del cliente es obligatorio');
      return;
    }

    if (selectedProducts.length === 0) {
      Alert.alert('Error', 'Debe agregar al menos un producto al pedido');
      return;
    }

    // Aquí iría la lógica para guardar el pedido
    console.log('Saving order:', { formData, selectedProducts });
    
    Alert.alert(
      'Éxito',
      isEditing ? 'Pedido actualizado correctamente' : 'Pedido creado correctamente',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const renderProductItem = (item: OrderItem) => (
    <View key={item.productId} style={styles.productItem}>
      <Image
        source={{ uri: 'https://via.placeholder.com/50' }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productDetails}>
          Cantidad: {item.quantity} • ${item.price.toFixed(2)} c/u
        </Text>
      </View>
      <Text style={styles.productTotal}>${item.total.toFixed(2)}</Text>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveProduct(item.productId)}
      >
        <Ionicons name="close-circle" size={24} color="#FF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título */}
        <Text style={styles.title}>
          {isEditing ? 'Editar pedido' : 'Añadir pedido'}
        </Text>

        {/* Información del cliente */}
        <Text style={styles.sectionTitle}>Información del cliente</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nombre del cliente"
          placeholderTextColor="#A0A0A0"
          value={formData.customerName}
          onChangeText={(text) => handleInputChange('customerName', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Email del cliente"
          placeholderTextColor="#A0A0A0"
          value={formData.customerEmail}
          onChangeText={(text) => handleInputChange('customerEmail', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono del cliente"
          placeholderTextColor="#A0A0A0"
          value={formData.customerPhone}
          onChangeText={(text) => handleInputChange('customerPhone', text)}
          keyboardType="phone-pad"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Dirección de envío"
          placeholderTextColor="#A0A0A0"
          value={formData.shippingAddress}
          onChangeText={(text) => handleInputChange('shippingAddress', text)}
          multiline
          numberOfLines={3}
        />

        {/* Productos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos</Text>
          
          {selectedProducts.length > 0 ? (
            <View style={styles.productsContainer}>
              {selectedProducts.map(renderProductItem)}
            </View>
          ) : (
            <View style={styles.emptyProducts}>
              <Text style={styles.emptyText}>No hay productos agregados</Text>
            </View>
          )}

          <TouchableOpacity style={styles.addProductsButton} onPress={handleSelectProducts}>
            <Ionicons name="add-outline" size={30} color="#FFFFFF" />
            <Text style={styles.addProductsText}>
              {selectedProducts.length > 0 ? 'Modificar productos' : 'Agregar productos'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notas del pedido */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Notas del pedido"
          placeholderTextColor="#A0A0A0"
          value={formData.orderNotes}
          onChangeText={(text) => handleInputChange('orderNotes', text)}
          multiline
          numberOfLines={3}
        />

        {/* Información de pago */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de pago</Text>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Subtotal</Text>
            <Text style={styles.paymentValue}>${formData.subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <TextInput
                style={styles.input}
                placeholder="Envío"
                placeholderTextColor="#A0A0A0"
                value={formData.shipping.toString()}
                onChangeText={(text) => handleInputChange('shipping', parseFloat(text) || 0)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputHalf}>
              <TextInput
                style={styles.input}
                placeholder="Descuento"
                placeholderTextColor="#A0A0A0"
                value={formData.discount.toString()}
                onChangeText={(text) => handleInputChange('discount', parseFloat(text) || 0)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={[styles.paymentRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total a pagar</Text>
            <Text style={styles.totalValue}>${formData.total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity 
            style={styles.paidCheckbox} 
            onPress={() => handleInputChange('isPaid', !formData.isPaid)}
          >
            <Ionicons 
              name={formData.isPaid ? "checkbox-outline" : "square-outline"} 
              size={24} 
              color="#FFFFFF" 
            />
            <Text style={styles.paidText}>Pagado</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Botones de acción */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar</Text>
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
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,
    marginTop: 10,
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
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: 25,
  },
  productsContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  emptyProducts: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#A0A0A0',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  productDetails: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  productTotal: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 10,
  },
  removeButton: {
    padding: 5,
  },
  addProductsButton: {
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addProductsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  inputHalf: {
    flex: 1,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  paymentLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  paymentValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#404040',
  },
  totalLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  paidCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  paidText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#404040',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  saveButton: {
    flex: 1,
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

export default AddEditOrderScreen;