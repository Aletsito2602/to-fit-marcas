import React from 'react';
import { 
  View, 
  ScrollView, 
  SafeAreaView, 
  RefreshControl,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text
} from 'react-native';
import { useMiTienda } from './hooks/useMiTienda';
import { 
  PerfilMarca,
  CategoriasScroll,
  ProductGrid,
  SeccionTitulo,
  BannerColeccion
} from './components';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';

interface MiTiendaScreenProps {
  navigation: any;
}

const MiTiendaScreen: React.FC<MiTiendaScreenProps> = ({ navigation }) => {
  const {
    tienda,
    productos,
    categorias,
    coleccionEspecial,
    loading,
    error,
    refreshing,
    onRefresh,
    productosDestacados,
    productosSugeridos,
    productosGeneral
  } = useMiTienda();

  // Estados de carga
  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundPattern opacity={0.06} />
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Cargando tu tienda...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <BackgroundPattern opacity={0.06} />
        <Header />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
      
      <BackgroundPattern opacity={0.06} />
      
      {/* Header Superior Fijo */}
      <Header />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
          />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {/* Perfil de la Marca/Tienda */}
        <PerfilMarca 
          tienda={tienda}
          navigation={navigation}
        />

        {/* Categorías Horizontales */}
        <CategoriasScroll 
          categorias={categorias}
          onCategoriaPress={(categoria) => {
            console.log('Categoria seleccionada:', categoria.nombre);
            // navigation.navigate('ProductosPorCategoria', { categoria });
          }}
        />

        {/* Grid Productos Destacados */}
        {productosDestacados.length > 0 && (
          <ProductGrid 
            productos={productosDestacados}
            numColumns={2}
            onProductPress={(producto) => {
              console.log('Producto seleccionado:', producto.nombre);
              // navigation.navigate('ProductDetail', { productId: producto.id });
            }}
          />
        )}

        {/* Sección Sugerencias para ti */}
        {productosSugeridos.length > 0 && (
          <>
            <SeccionTitulo 
              titulo="Sugerencias para ti"
              onVerMas={() => {
                console.log('Ver más sugerencias');
                // navigation.navigate('SugerenciasCompletas');
              }}
            />
            
            <ProductGrid 
              productos={productosSugeridos}
              numColumns={2}
              maxItems={4}
              onProductPress={(producto) => {
                console.log('Producto sugerido seleccionado:', producto.nombre);
                // navigation.navigate('ProductDetail', { productId: producto.id });
              }}
            />
          </>
        )}

        {/* Banner Colección Especial */}
        {coleccionEspecial && (
          <BannerColeccion 
            coleccion={coleccionEspecial}
            onPress={() => {
              console.log('Ver colección especial:', coleccionEspecial.titulo);
              // navigation.navigate('DetalleColeccion', { coleccion: coleccionEspecial });
            }}
          />
        )}

        {/* Sección Más Productos */}
        {productosGeneral.length > 0 && (
          <>
            <SeccionTitulo 
              titulo="Más productos"
              onVerMas={() => {
                console.log('Ver todos los productos');
                // navigation.navigate('TodosLosProductos');
              }}
            />
            
            <ProductGrid 
              productos={productosGeneral}
              numColumns={2}
              onProductPress={(producto) => {
                console.log('Producto general seleccionado:', producto.nombre);
                // navigation.navigate('ProductDetail', { productId: producto.id });
              }}
            />
          </>
        )}

        {/* Si no hay productos */}
        {productos.length === 0 && !loading && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay productos disponibles</Text>
            <Text style={styles.emptySubtext}>Agrega productos a tu tienda para comenzar</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Fondo negro exacto
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 0, // Sin padding top para que el banner quede pegado al header
  },
  scrollContent: {
    paddingBottom: 20,
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
    paddingHorizontal: 20,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
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
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MiTiendaScreen;