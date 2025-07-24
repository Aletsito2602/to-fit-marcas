import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Order, OrdersStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import LayerBackground from '../../components/LayerBackground';
import Header from '../../components/Header';
import OrderItem from '../../components/orders/OrderItem';
import OrderBottomSheet from '../../components/OrderBottomSheet';

type OrdersListNavigationProp = StackNavigationProp<OrdersStackParamList, 'OrdersList'>;

const OrdersListScreen: React.FC = () => {
  const navigation = useNavigation<OrdersListNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Mock data - en producción esto vendría de una API
  const mockOrders: Order[] = [
    {
      id: '1234',
      customer: {
        id: '1',
        name: 'Arthuro Lopez',
        email: 'arthuro.lopez@email.com',
        avatar: 'https://via.placeholder.com/60',
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
      ],
      subtotal: 299.98,
      discount: 0,
      total: 299.98,
      status: 'preparing',
      paymentStatus: 'paid',
      createdAt: new Date('2025-01-01T09:12:00'),
      updatedAt: new Date(),
    },
    {
      id: '1235',
      customer: {
        id: '2',
        name: 'María González',
        email: 'maria.gonzalez@email.com',
        avatar: 'https://via.placeholder.com/60/FF6B6B',
      },
      items: [
        {
          productId: '3',
          productName: 'Vestido de verano',
          quantity: 1,
          price: 65.00,
          total: 65.00,
        },
      ],
      subtotal: 65.00,
      discount: 5.00,
      total: 60.00,
      status: 'delivered',
      paymentStatus: 'paid',
      createdAt: new Date('2025-01-02T14:30:00'),
      updatedAt: new Date(),
    },
    {
      id: '1236',
      customer: {
        id: '3',
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@email.com',
        avatar: 'https://via.placeholder.com/60/4ECDC4',
      },
      items: [
        {
          productId: '4',
          productName: 'Pantalones deportivos',
          quantity: 3,
          price: 45.00,
          total: 135.00,
        },
      ],
      subtotal: 135.00,
      discount: 0,
      total: 135.00,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date('2025-01-03T11:15:00'),
      updatedAt: new Date(),
    },
  ];

  const filters = ['Todos', 'Reciente', 'En preparación'];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
                         order.id.includes(searchText);
    
    const matchesFilter = activeFilter === 'Todos' || 
      (activeFilter === 'Reciente' && order.status === 'pending') ||
      (activeFilter === 'En preparación' && order.status === 'preparing');
    
    return matchesSearch && matchesFilter;
  });

  const handleAddOrder = () => {
    navigation.navigate('AddEditOrder', {});
  };

  const handleOrderPress = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      // Convertir Order a formato esperado por OrderBottomSheet
      const bottomSheetOrder = {
        id: order.id,
        customer: order.customer.name,
        email: order.customer.email,
        status: order.status === 'preparing' ? 'Preparación' : 
                order.status === 'delivered' ? 'Entregado' : 'Reciente',
        amount: order.total,
        avatar: order.customer.avatar,
        statusColor: order.status === 'preparing' ? '#06B6D4' : 
                    order.status === 'delivered' ? '#4ADE80' : '#F59E0B',
        orderDate: order.createdAt.toLocaleDateString(),
        deliveryAddress: 'Calle Mayor 123, Madrid, España',
        items: order.items.map(item => ({
          id: item.productId,
          name: item.productName,
          quantity: item.quantity,
          price: item.price,
          image: 'https://via.placeholder.com/100',
        })),
      };
      setSelectedOrder(bottomSheetOrder);
      bottomSheetRef.current?.expand();
    }
  };

  const handleCloseBottomSheet = () => {
    setSelectedOrder(null);
    bottomSheetRef.current?.close();
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <OrderItem order={item} onPress={handleOrderPress} />
  );

  const renderFilterButton = (filter: string) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterButton,
        activeFilter === filter && styles.activeFilterButton
      ]}
      onPress={() => setActiveFilter(filter)}
    >
      <Text
        style={[
          styles.filterText,
          activeFilter === filter && styles.activeFilterText
        ]}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <LayerBackground opacity={0.3} />
      
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título y botón añadir */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pedidos</Text>
          <TouchableOpacity onPress={handleAddOrder}>
            <Text style={styles.addButton}>Añadir pedido</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor="#A0A0A0"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Lista de pedidos con header */}
        <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        style={styles.ordersList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
            contentContainerStyle={styles.filtersContent}
          >
            {filters.map(renderFilterButton)}
          </ScrollView>
        }
        ListHeaderComponentStyle={styles.listHeader}
        scrollEnabled={false}
        style={[styles.ordersList, { flex: 0 }]}
      />
      </ScrollView>

      {/* Bottom Sheet */}
      <OrderBottomSheet
        ref={bottomSheetRef}
        order={selectedOrder}
        onClose={handleCloseBottomSheet}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  addButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 25,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  filtersContainer: {
    marginBottom: 5,
    marginTop: 5,
  },
  filtersContent: {
    paddingHorizontal: 25,
    gap: 8,
  },
  filterButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 0,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  filterText: {
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    fontSize: 14,
  },
  activeFilterText: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  ordersList: {
    flex: 1,
  },
  listHeader: {
    marginBottom: 10,
  },
});

export default OrdersListScreen;