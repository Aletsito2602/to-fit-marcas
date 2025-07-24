import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Productos</Text>
      <Text style={styles.subtitle}>Inventario y catálogo de productos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
});

export default ProductsScreen;