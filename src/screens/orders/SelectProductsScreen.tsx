import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product, OrderItem, OrdersStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import ProductHeader from '../../components/products/ProductHeader';

type SelectProductsNavigationProp = StackNavigationProp<OrdersStackParamList, 'SelectProducts'>;
type SelectProductsRouteProp = RouteProp<OrdersStackParamList, 'SelectProducts'>;

interface ProductSelection extends Product {
  selectedQuantity: number;
}

const SelectProductsScreen: React.FC = () => {
  const navigation = useNavigation<SelectProductsNavigationProp>();
  const route = useRoute<SelectProductsRouteProp>();
  const { selectedProducts = [], onProductsSelected } = route.params;

  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<ProductSelection[]>([]);

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Zapatillas running adidas',
      description: 'Zapatillas deportivas para correr',
      images: ['https://via.placeholder.com/60'],
      price: 89.99,
      collection: 'Verano 2025',
      category: 'Deporte',
      status: 'active',
      variants: [],
      totalStock: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Chaqueta de invierno',
      description: 'Chaqueta cálida para el invierno',
      images: ['https://via.placeholder.com/60'],
      price: 120.00,
      collection: 'Invierno 2025',
      category: 'Ropa',
      status: 'active',
      variants: [],
      totalStock: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Pantalones deportivos',
      description: 'Pantalones cómodos para ejercicio',
      images: ['https://via.placeholder.com/60'],
      price: 45.00,
      collection: 'Deportiva',
      category: 'Ropa',
      status: 'active',
      variants: [],
      totalStock: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      name: 'Camiseta básica',
      description: 'Camiseta de algodón básica',
      images: ['https://via.placeholder.com/60'],
      price: 25.00,
      collection: 'Básicos',
      category: 'Ropa',
      status: 'active',
      variants: [],
      totalStock: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  useEffect(() => {
    // Inicializar productos con cantidades seleccionadas
    const productsWithSelection = mockProducts.map(product => {
      const selectedItem = selectedProducts.find(item => item.productId === product.id);
      return {
        ...product,
        selectedQuantity: selectedItem ? selectedItem.quantity : 0,
      };
    });
    setProducts(productsWithSelection);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleQuantityChange = (productId: string, quantity: number) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, selectedQuantity: Math.max(0, Math.min(quantity, product.totalStock)) }
        : product
    ));
  };

  const handleSaveSelection = () => {
    const selectedItems: OrderItem[] = products
      .filter(product => product.selectedQuantity > 0)
      .map(product => ({
        productId: product.id,
        productName: product.name,
        quantity: product.selectedQuantity,
        price: product.price,
        total: product.price * product.selectedQuantity,
      }));

    onProductsSelected(selectedItems);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const getTotalSelectedProducts = () => {
    return products.reduce((total, product) => total + product.selectedQuantity, 0);
  };

  const getTotalSelectedValue = () => {
    return products.reduce((total, product) => 
      total + (product.price * product.selectedQuantity), 0
    );
  };

  const renderProductItem = ({ item }: { item: ProductSelection }) => (
    <View style={styles.productItem}>
      <Image
        source={{ uri: item.images[0] }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.productStock}>Stock: {item.totalStock}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.selectedQuantity - 1)}
          disabled={item.selectedQuantity === 0}
        >
          <Ionicons 
            name="remove" 
            size={20} 
            color={item.selectedQuantity === 0 ? "#666666" : "#FFFFFF"} 
          />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.selectedQuantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.selectedQuantity + 1)}
          disabled={item.selectedQuantity >= item.totalStock}
        >
          <Ionicons 
            name="add" 
            size={20} 
            color={item.selectedQuantity >= item.totalStock ? "#666666" : "#FFFFFF"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      {/* Header */}
      <ProductHeader />

      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>Seleccionar productos</Text>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={24} color="#FFFFFF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos"
            placeholderTextColor="#A0A0A0"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Lista de productos */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          style={styles.productsList}
          showsVerticalScrollIndicator={false}
        />

        {/* Resumen de selección */}
        {getTotalSelectedProducts() > 0 && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {getTotalSelectedProducts()} productos seleccionados
              </Text>
              <Text style={styles.summaryValue}>
                ${getTotalSelectedValue().toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Botones de acción */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.saveButton,
            getTotalSelectedProducts() === 0 && styles.disabledButton
          ]} 
          onPress={handleSaveSelection}
          disabled={getTotalSelectedProducts() === 0}
        >
          <Text style={[
            styles.saveButtonText,
            getTotalSelectedProducts() === 0 && styles.disabledButtonText
          ]}>
            Confirmar selección
          </Text>
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
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  productsList: {
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  productPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#4ECDC4',
    marginBottom: 2,
  },
  productStock: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#404040',
  },
  quantityText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  summaryValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#4ECDC4',
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
  disabledButton: {
    backgroundColor: '#666666',
  },
  disabledButtonText: {
    color: '#A0A0A0',
  },
});

export default SelectProductsScreen;