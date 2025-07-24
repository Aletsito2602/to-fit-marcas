import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Order, OrdersStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import ProductHeader from '../../components/products/ProductHeader';
import PaymentCard from '../../components/orders/PaymentCard';

type OrderDetailNavigationProp = StackNavigationProp<OrdersStackParamList, 'OrderDetail'>;
type OrderDetailRouteProp = RouteProp<OrdersStackParamList, 'OrderDetail'>;

const OrderDetailScreen: React.FC = () => {
  const navigation = useNavigation<OrderDetailNavigationProp>();
  const route = useRoute<OrderDetailRouteProp>();
  const { orderId } = route.params;

  const [isPaid, setIsPaid] = useState(false);

  // Mock data - en producción esto vendría de una API
  const mockOrder: Order = {
    id: orderId,
    customer: {
      id: '1',
      name: 'Arthuro Lopez',
      email: 'arthuro.lopez@email.com',
      avatar: 'https://via.placeholder.com/60',
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
      {
        productId: '2',
        productName: 'Chaqueta de invierno',
        quantity: 1,
        price: 120.00,
        total: 120.00,
      },
      {
        productId: '3',
        productName: 'Pantalones deportivos',
        quantity: 3,
        price: 45.00,
        total: 135.00,
      },
    ],
    subtotal: 434.98,
    discount: 34.98,
    total: 400.00,
    status: 'preparing',
    paymentStatus: 'paid',
    createdAt: new Date('2025-01-01T09:12:00'),
    updatedAt: new Date(),
  };

  const handleEditOrder = () => {
    navigation.navigate('AddEditOrder', { orderId });
  };

  const handleRemoveProduct = (productId: string) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que quieres eliminar este producto del pedido?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            // Aquí iría la lógica para eliminar el producto
            console.log('Removing product:', productId);
          }
        },
      ]
    );
  };

  const handleAddDiscount = () => {
    Alert.alert(
      'Añadir descuento',
      'Funcionalidad para añadir descuento',
      [{ text: 'OK' }]
    );
  };

  const togglePaidStatus = () => {
    setIsPaid(!isPaid);
    // Aquí iría la lógica para actualizar el estado de pago
  };

  const formatDate = (date: Date) => {
    const months = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month}. ${year} - ${hours}:${minutes} hrs.`;
  };

  const renderProductItem = (item: any, index: number) => (
    <View
      key={item.productId}
      style={[
        styles.productItem,
        index === mockOrder.items.length - 1 && styles.lastProductItem
      ]}
    >
      <Image
        source={{ uri: 'https://via.placeholder.com/50' }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productQuantity}>Cantidad: {item.quantity}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveProduct(item.productId)}
      >
        <Ionicons name="trash-outline" size={24} color="#A0A0A0" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      {/* Header */}
      <ProductHeader />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Número de pedido y fecha */}
        <View style={styles.orderHeader}>
          <Text style={styles.orderNumber}>#{mockOrder.id}</Text>
          <Text style={styles.orderDate}>{formatDate(mockOrder.createdAt)}</Text>
        </View>

        {/* Tarjeta del cliente */}
        <View style={styles.customerCard}>
          <Image
            source={{ uri: mockOrder.customer.avatar }}
            style={styles.customerAvatar}
          />
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{mockOrder.customer.name}</Text>
            <Text style={styles.customerEmail}>{mockOrder.customer.email}</Text>
          </View>
        </View>

        {/* Tarjeta de productos */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Productos</Text>
          {mockOrder.items.map(renderProductItem)}
        </View>

        {/* Tarjeta de pagos */}
        <PaymentCard
          itemsCount={mockOrder.items.length}
          subtotal={mockOrder.subtotal}
          shipping={0}
          discount={mockOrder.discount}
          total={mockOrder.total}
          isPaid={isPaid}
          onTogglePaid={togglePaidStatus}
          onAddDiscount={handleAddDiscount}
        />
      </ScrollView>

      {/* Botón editar */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditOrder}>
          <Text style={styles.editButtonText}>Editar pedido</Text>
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
    marginBottom: 15,
  },
  orderNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#FFFFFF',
  },
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  customerCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 15,
  },
  customerAvatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  customerEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 18,
    marginBottom: 20,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  lastProductItem: {
    borderBottomWidth: 0,
  },
  productImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
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
  productQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  removeButton: {
    padding: 8,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
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
  discountValue: {
    color: '#FF6B6B',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
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
  discountLink: {
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  discountText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4ECDC4',
    textDecorationLine: 'underline',
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
  bottomContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#363636',
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
});

export default OrderDetailScreen;