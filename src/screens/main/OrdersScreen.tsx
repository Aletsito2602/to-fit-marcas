import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import OrderBottomSheet from '../../components/OrderBottomSheet';

const OrdersScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const filters = ['Todos', 'Reciente', 'En preparación'];

  const orders = [
    {
      id: '001',
      customer: 'Arthuro Lopez',
      email: 'arthuro@gmail.com',
      status: 'Reciente',
      amount: 45.00,
      avatar: 'https://i.pravatar.cc/60?img=1',
      statusColor: '#F59E0B',
      orderDate: '2025-01-17',
      deliveryAddress: 'Calle Mayor 123, Madrid, España',
      saleSource: 'Instagram',
      items: [
        {
          id: '1',
          name: 'Camiseta básica blanca',
          quantity: 2,
          price: 15.00,
          image: 'https://via.placeholder.com/100',
        },
        {
          id: '2',
          name: 'Pantalón vaquero',
          quantity: 1,
          price: 25.00,
          image: 'https://via.placeholder.com/100',
        },
      ],
    },
    {
      id: '002',
      customer: 'Maria Mendoza',
      email: 'Mendoza@gmail.com',
      status: 'Entregado',
      amount: 45.00,
      avatar: 'https://i.pravatar.cc/60?img=2',
      statusColor: '#4ADE80',
      orderDate: '2025-01-16',
      deliveryAddress: 'Avenida de la Paz 456, Barcelona, España',
      saleSource: 'Tienda Web',
      items: [
        {
          id: '3',
          name: 'Vestido floral',
          quantity: 1,
          price: 35.00,
          image: 'https://via.placeholder.com/100',
        },
        {
          id: '4',
          name: 'Zapatos deportivos',
          quantity: 1,
          price: 10.00,
          image: 'https://via.placeholder.com/100',
        },
      ],
    },
    {
      id: '003',
      customer: 'Leny Hernandez',
      email: 'Leny@gmail.com',
      status: 'Preparación',
      amount: 45.00,
      avatar: 'https://i.pravatar.cc/60?img=3',
      statusColor: '#06B6D4',
      orderDate: '2025-01-15',
      deliveryAddress: 'Plaza España 789, Valencia, España',
      saleSource: 'WhatsApp',
      items: [
        {
          id: '5',
          name: 'Chaqueta de cuero',
          quantity: 1,
          price: 40.00,
          image: 'https://via.placeholder.com/100',
        },
        {
          id: '6',
          name: 'Gorra deportiva',
          quantity: 1,
          price: 5.00,
          image: 'https://via.placeholder.com/100',
        },
      ],
    },
  ];

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

  const handleOrderPress = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      bottomSheetRef.current?.expand();
    }
  };

  const handleCloseBottomSheet = () => {
    setSelectedOrder(null);
    bottomSheetRef.current?.close();
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <Header />
      
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Pedidos</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => navigation.navigate('AddOrder' as never)}
          >
            <Text style={styles.addButtonText}>Añadir pedido</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor="#A0A0A0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map(renderFilterButton)}
        </ScrollView>

        {/* Orders List */}
        <ScrollView 
          style={styles.ordersList} 
          showsVerticalScrollIndicator={false}
        >
          {orders.map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => handleOrderPress(order.id)}
            >
              <Image source={{ uri: order.avatar }} style={styles.avatar} />
              
              <View style={styles.orderInfo}>
                <Text style={styles.customerName}>{order.customer}</Text>
                <Text style={styles.customerEmail}>{order.email}</Text>
              </View>

              <View style={styles.orderStatus}>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, { backgroundColor: order.statusColor }]} />
                  <Text style={[styles.statusText, { color: order.statusColor }]}>
                    {order.status}
                  </Text>
                </View>
                <Text style={styles.orderAmount}>${order.amount.toFixed(2)}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

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
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
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
    fontSize: 14,
    color: '#A0A0A0',
  },
  activeFilterText: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  ordersList: {
    flex: 1,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  orderInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  customerEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  orderStatus: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  orderAmount: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});

export default OrdersScreen;