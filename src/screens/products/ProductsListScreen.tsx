import React, { useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product, ProductsStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import LayerBackground from '../../components/LayerBackground';
import Header from '../../components/Header';
import ProductItem from '../../components/products/ProductItem';
import { useProducts, FirebaseProduct } from '../../hooks/useProducts';
import { useAuth } from '../../contexts/AuthContext';

type ProductsListNavigationProp = StackNavigationProp<ProductsStackParamList, 'ProductsList'>;

const ProductsListScreen: React.FC = () => {
  const navigation = useNavigation<ProductsListNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const { user } = useAuth();
  
  // Obtener id_tienda del usuario autenticado (desde el campo id_tienda en Users)
  const userIdTienda = user?.id_tienda || null;
  
  console.log('=== PRODUCTS LIST DEBUG ===');
  console.log('Usuario autenticado:', user?.display_name);
  console.log('ID de tienda del usuario:', user?.id_tienda);
  console.log('ID de tienda para filtrado:', userIdTienda);
  console.log('========================');
  
  // Cargar productos filtrados por tienda del usuario autenticado
  const { products, productStats, loading, error, filterProducts } = useProducts(userIdTienda);

  const filters = ['Todos', 'Activos', 'Sin stock'];

  // Filtrar productos usando la función del hook
  const filteredProducts = filterProducts(products, searchText, activeFilter);

  // Convertir productos de Firebase al formato esperado por ProductItem
  const convertFirebaseToProduct = (firebaseProduct: FirebaseProduct): Product => {
    // Validar y asegurar que los arrays existan
    const colores = Array.isArray(firebaseProduct.color) ? firebaseProduct.color : [];
    const talles = Array.isArray(firebaseProduct.talles) ? firebaseProduct.talles : [];
    const precio = firebaseProduct.precio || '0';
    
    return {
      id: firebaseProduct.id,
      name: firebaseProduct.nombre || 'Producto sin nombre',
      description: firebaseProduct.descripcion || 'Sin descripción',
      images: [firebaseProduct.portada || 'https://via.placeholder.com/200'],
      price: parseFloat(precio.toString().replace(/[^0-9.,]/g, '').replace(',', '.')) || 0,
      salePrice: undefined,
      collection: firebaseProduct.tienda || 'Sin tienda', // Usar tienda como colección
      category: firebaseProduct.categoria || 'General',
      status: 'active', // Todos los productos están activos por ahora
      variants: colores.map((color, index) => ({
        id: `${firebaseProduct.id}_color_${index}`,
        type: 'color' as const,
        name: 'Color',
        value: color,
        stock: 10 // Stock por defecto
      })),
      totalStock: Math.max(talles.length * 10, 1), // Stock estimado, mínimo 1
      createdAt: firebaseProduct.fecha_creado?.toDate ? firebaseProduct.fecha_creado.toDate() : new Date(),
      updatedAt: firebaseProduct.fecha_creado?.toDate ? firebaseProduct.fecha_creado.toDate() : new Date(),
    };
  };

  const handleAddProduct = () => {
    navigation.navigate('AddEditProduct', {});
  };

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const renderProductItem = ({ item }: { item: FirebaseProduct }) => {
    try {
      const convertedProduct = convertFirebaseToProduct(item);
      return <ProductItem product={convertedProduct} onPress={handleProductPress} />;
    } catch (error) {
      console.error('Error converting product:', item.id, error);
      console.error('Product data:', item);
      // Renderizar un producto por defecto en caso de error
      const defaultProduct: Product = {
        id: item.id || 'unknown',
        name: 'Error de producto',
        description: 'No se pudo cargar este producto',
        images: ['https://via.placeholder.com/200'],
        price: 0,
        collection: 'Error',
        category: 'Error',
        status: 'active',
        variants: [],
        totalStock: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return <ProductItem product={defaultProduct} onPress={handleProductPress} />;
    }
  };

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
          <View style={styles.titleSection}>
            <Text style={styles.title}>Productos</Text>
            {!loading && (
              <Text style={styles.subtitle}>
                {productStats.total} productos totales
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={handleAddProduct}>
            <Text style={styles.addButton}>Añadir producto</Text>
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

        {/* Estado de loading */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Cargando productos...</Text>
          </View>
        )}

        {/* Estado de error */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error al cargar productos: {error}</Text>
            <TouchableOpacity onPress={() => {
              // Aquí puedes agregar lógica de retry si necesitas
              console.log('Retry loading products');
            }}>
              <Text style={styles.retryText}>Intentar de nuevo</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Lista de productos con header */}
        {!loading && !error && (
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            style={styles.productsList}
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
            style={[styles.productsList, { flex: 0 }]}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay productos disponibles</Text>
                <Text style={styles.emptySubtext}>
                  {searchText ? 'Intenta cambiar tu búsqueda' : 'Agrega tu primer producto'}
                </Text>
              </View>
            }
          />
        )}
      </ScrollView>
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
    alignItems: 'flex-start',
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 4,
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
  productsList: {
    flex: 1,
  },
  listHeader: {
    marginBottom: 10,
  },
  // Estados de loading y error
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 25,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 25,
  },
  emptyText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ProductsListScreen;