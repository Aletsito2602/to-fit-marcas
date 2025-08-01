import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Order } from '../../types';

interface OrderItemProps {
  order: Order;
  onPress: (orderId: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ order, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFD700'; // Amarillo para reciente/pendiente
      case 'preparing':
        return '#00BFFF'; // Azul cielo para en preparación
      case 'shipped':
        return '#FFA500'; // Naranja para enviado
      case 'delivered':
        return '#00FF00'; // Verde para entregado
      case 'cancelled':
        return '#FF4444'; // Rojo para cancelado
      default:
        return '#A0A0A0'; // Gris por defecto
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Reciente';
      case 'preparing':
        return 'Preparación';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregado';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  };

  const getOrigenVentaText = (origen?: string) => {
    switch (origen) {
      case 'tienda_online':
        return 'Tienda Online';
      case 'instagram':
        return 'Instagram';
      case 'whatsapp':
        return 'WhatsApp';
      case 'marketplace':
        return 'Marketplace';
      case 'fisico':
        return 'Tienda Física';
      default:
        return 'No especificado';
    }
  };

  const getOrigenVentaIcon = (origen?: string) => {
    switch (origen) {
      case 'tienda_online':
        return 'storefront-outline';
      case 'instagram':
        return 'logo-instagram';
      case 'whatsapp':
        return 'logo-whatsapp';
      case 'marketplace':
        return 'business-outline';
      case 'fisico':
        return 'location-outline';
      default:
        return 'help-outline';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(order.id)}
    >
      <Image
        source={{ uri: order.customer.avatar || 'https://via.placeholder.com/55' }}
        style={styles.customerAvatar}
      />
      <View style={styles.orderInfo}>
        <Text style={styles.customerName}>{order.customer.name}</Text>
        <Text style={styles.customerEmail}>{order.customer.email}</Text>
        <View style={styles.origenContainer}>
          <Ionicons 
            name={getOrigenVentaIcon(order.origenVenta) as any} 
            size={12} 
            color="#A0A0A0" 
          />
          <Text style={styles.origenText}>{getOrigenVentaText(order.origenVenta)}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor(order.status) }
          ]}
        />
        <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
      </View>
      <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  customerAvatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
  },
  orderInfo: {
    flex: 1,
  },
  customerName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  customerEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  origenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  origenText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    gap: 5,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  orderTotal: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 10,
  },
});

export default OrderItem;