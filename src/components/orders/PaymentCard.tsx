import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PaymentCardProps {
  itemsCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  isPaid: boolean;
  onTogglePaid: () => void;
  onAddDiscount?: () => void;
  showDiscountLink?: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  itemsCount,
  subtotal,
  shipping,
  discount,
  total,
  isPaid,
  onTogglePaid,
  onAddDiscount,
  showDiscountLink = true,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Pagos</Text>
      
      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>{itemsCount} artículos</Text>
        <Text style={styles.paymentValue}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>Subtotal</Text>
        <Text style={styles.paymentValue}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.paymentRow}>
        <Text style={styles.paymentLabel}>Envío</Text>
        <Text style={styles.paymentValue}>${shipping.toFixed(2)}</Text>
      </View>
      
      {discount > 0 && (
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Descuento</Text>
          <Text style={[styles.paymentValue, styles.discountValue]}>
            -${discount.toFixed(2)}
          </Text>
        </View>
      )}
      
      <View style={[styles.paymentRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total a pagar</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      {showDiscountLink && onAddDiscount && (
        <TouchableOpacity style={styles.discountLink} onPress={onAddDiscount}>
          <Text style={styles.discountText}>Añadir descuento</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.paidCheckbox} onPress={onTogglePaid}>
        <Ionicons 
          name={isPaid ? "checkbox-outline" : "square-outline"} 
          size={24} 
          color="#FFFFFF" 
        />
        <Text style={styles.paidText}>Pagado</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PaymentCard;