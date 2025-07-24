import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  likes?: string[];
  guardados?: string[];
}

interface ProductGridProps {
  productos: Producto[];
  numColumns?: number;
  maxItems?: number;
  onProductPress: (producto: Producto) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  productos, 
  numColumns = 2, 
  maxItems,
  onProductPress 
}) => {
  // Limitar productos si se especifica maxItems
  const displayProducts = maxItems ? productos.slice(0, maxItems) : productos;

  const renderProductItem = ({ item }: { item: Producto }) => (
    <ProductCard 
      producto={item} 
      onPress={onProductPress}
    />
  );

  if (!productos || productos.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        style={styles.grid}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Deshabilitamos scroll para que funcione dentro de ScrollView padre
        contentContainerStyle={styles.gridContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    marginBottom: 17,
  },
  grid: {
    flex: 1,
  },
  gridContent: {
    paddingBottom: 0,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  separator: {
    height: 0, // ProductCard ya tiene marginBottom para el espaciado
  },
});

export default ProductGrid;