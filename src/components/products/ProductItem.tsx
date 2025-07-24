import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types';

interface ProductItemProps {
  product: Product;
  onPress: (productId: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onPress }) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'deporte':
        return '#FFD700'; // Amarillo dorado
      case 'invierno':
        return '#ADD8E6'; // Azul claro
      case 'verano':
        return '#90EE90'; // Verde claro
      case 'ropa':
        return '#DDA0DD'; // Púrpura claro
      case 'calzado':
        return '#F0E68C'; // Amarillo claro
      case 'accesorios':
        return '#FFA07A'; // Salmón claro
      default:
        return '#90EE90'; // Verde claro por defecto
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product.id)}
    >
      <Image
        source={{ uri: product.images[0] || 'https://via.placeholder.com/60' }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productQuantity}>{product.totalStock} unidades</Text>
        <View
          style={[
            styles.categoryTag,
            { backgroundColor: getCategoryColor(product.category) }
          ]}
        >
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  productImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
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
    marginBottom: 6,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#000000',
  },
});

export default ProductItem;