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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product, ProductsStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';
// BottomTabBar removed - accessed from sidebar drawer
import ProductItem from '../../components/products/ProductItem';
import { useProducts, FirebaseProduct } from '../../hooks/useProducts';
import { useAuth } from '../../contexts/AuthContext';
import EditStockModal from './components/EditStockModal';

type InventoryNavigationProp = StackNavigationProp<ProductsStackParamList, 'ProductsList'>;

const InventoryScreen: React.FC = () => {
  const navigation = useNavigation<InventoryNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [showEditStockModal, setShowEditStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FirebaseProduct | null>(null);
  const [productStocks, setProductStocks] = useState<{[key: string]: number}>({});
  const { user } = useAuth();
  
  // Obtener id_tienda del usuario autenticado
  const userIdTienda = user?.id_tienda || null;
  
  console.log('=== INVENTORY DEBUG ===');
  console.log('Usuario autenticado:', user?.display_name);
  console.log('ID de tienda del usuario:', user?.id_tienda);
  console.log('ID de tienda para filtrado:', userIdTienda);
  console.log('========================');
  
  // Cargar productos filtrados por tienda del usuario autenticado
  const { products, productStats, loading, error, filterProducts } = useProducts(userIdTienda);

  const filters = ['Todos', 'En Stock', 'Bajo Stock', 'Sin Stock'];

  // Filtrar productos usando la función del hook
  const filteredProducts = filterProducts(products, searchText, activeFilter);

  // Función para obtener el stock actual de un producto
  const getProductStock = (productId: string): number => {
    return productStocks[productId] ?? Math.max(Math.floor(Math.random() * 50), 1);
  };

  // Función para actualizar el stock de un producto
  const handleUpdateStock = (productId: string, newStock: number) => {
    setProductStocks(prev => ({
      ...prev,
      [productId]: newStock
    }));
    Alert.alert('Éxito', 'Stock actualizado correctamente');
  };

  // Función para abrir el modal de edición de stock
  const handleEditStock = (product: FirebaseProduct) => {
    setSelectedProduct(product);
    setShowEditStockModal(true);
  };

  // Convertir productos de Firebase al formato esperado por ProductItem
  const convertFirebaseToProduct = (firebaseProduct: FirebaseProduct): Product => {
    // Validar y asegurar que los arrays existan
    const colores = Array.isArray(firebaseProduct.color) ? firebaseProduct.color : [];
    const talles = Array.isArray(firebaseProduct.talles) ? firebaseProduct.talles : [];
    const precio = firebaseProduct.precio || '0';
    const currentStock = getProductStock(firebaseProduct.id);
    
    return {
      id: firebaseProduct.id,
      name: firebaseProduct.nombre || 'Producto sin nombre',
      description: firebaseProduct.descripcion || 'Sin descripción',
      images: [firebaseProduct.portada || 'https://via.placeholder.com/200'],
      price: parseFloat(precio.toString().replace(/[^0-9.,]/g, '').replace(',', '.')) || 0,
      salePrice: undefined,
      collection: firebaseProduct.tienda || 'Sin tienda',
      category: firebaseProduct.categoria || 'General',
      status: 'active',
      variants: colores.map((color, index) => ({
        id: `${firebaseProduct.id}_color_${index}`,
        type: 'color' as const,
        name: 'Color',
        value: color,
        stock: Math.floor(currentStock / colores.length) || 1
      })),
      totalStock: currentStock,
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

  // Renderizar cada producto con info de stock adicional
  const renderInventoryItem = ({ item }: { item: FirebaseProduct }) => {
    try {
      const convertedProduct = convertFirebaseToProduct(item);
      return (
        <View style={styles.inventoryItem}>
          <ProductItem product={convertedProduct} onPress={handleProductPress} />
          
          {/* Información adicional de inventario */}
          <View style={styles.stockInfo}>
            <View style={styles.stockLeftSection}>
              <View style={styles.stockBadge}>
                <Ionicons name="cube-outline" size={14} color="#FFFFFF" />
                <Text style={styles.stockText}>Stock: {convertedProduct.totalStock}</Text>
              </View>
              
              <View style={styles.stockStatus}>
                <View style={[
                  styles.statusIndicator,
                  convertedProduct.totalStock > 20 ? styles.inStock :
                  convertedProduct.totalStock > 5 ? styles.lowStock : styles.outOfStock
                ]} />
                <Text style={styles.statusText}>
                  {convertedProduct.totalStock > 20 ? 'En Stock' :
                   convertedProduct.totalStock > 5 ? 'Bajo Stock' : 'Sin Stock'}
                </Text>
              </View>
            </View>

            {/* Botón de editar stock */}
            <TouchableOpacity 
              style={styles.editStockButton}
              onPress={() => handleEditStock(item)}
            >
              <Ionicons name="create-outline" size={16} color="#007AFF" />
              <Text style={styles.editStockText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } catch (error) {
      console.error('Error converting product for inventory:', item.id, error);
      return null;
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
      
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título y estadísticas */}
        <View style={styles.titleContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Inventario</Text>
            {!loading && (
              <View style={styles.statsContainer}>
                <Text style={styles.subtitle}>
                  {productStats.total} productos totales
                </Text>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{productStats.active}</Text>
                    <Text style={styles.statLabel}>Activos</Text>
                  </View>
                  <View style={styles.statSeparator} />
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Bajo Stock</Text>
                  </View>
                </View>
              </View>
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
            placeholder="Buscar en inventario"
            placeholderTextColor="#A0A0A0"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Estado de loading */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Cargando inventario...</Text>
          </View>
        )}

        {/* Estado de error */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error al cargar inventario: {error}</Text>
          </View>
        )}

        {/* Lista de productos con header */}
        {!loading && !error && (
          <FlatList
            data={filteredProducts}
            renderItem={renderInventoryItem}
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
                <Ionicons name="cube-outline" size={48} color="#666666" />
                <Text style={styles.emptyText}>Sin productos en inventario</Text>
                <Text style={styles.emptySubtext}>
                  {searchText ? 'Intenta cambiar tu búsqueda' : 'Agrega tu primer producto'}
                </Text>
              </View>
            }
          />
        )}
      </ScrollView>

      {/* Edit Stock Modal */}
      <EditStockModal
        visible={showEditStockModal}
        product={selectedProduct}
        onClose={() => {
          setShowEditStockModal(false);
          setSelectedProduct(null);
        }}
        onSave={handleUpdateStock}
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
  statsContainer: {
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  statSeparator: {
    width: 1,
    height: 20,
    backgroundColor: '#666666',
    marginHorizontal: 16,
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
  inventoryItem: {
    marginBottom: 8,
  },
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 4,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  stockLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 16,
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stockText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  stockStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  inStock: {
    backgroundColor: '#4CAF50',
  },
  lowStock: {
    backgroundColor: '#FF9800',
  },
  outOfStock: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  editStockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 4,
  },
  editStockText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#007AFF',
  },
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
    marginTop: 16,
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

export default InventoryScreen;