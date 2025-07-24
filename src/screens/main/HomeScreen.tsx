import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import BackgroundPattern from '../../components/BackgroundPattern';
import LayerBackground from '../../components/LayerBackground';
import Header from '../../components/Header';
import { useProducts, FirebaseProduct } from '../../hooks/useProducts';
import { Product } from '../../types';

const { width: screenWidth } = Dimensions.get('window');

// Paleta de colores exacta del diseño
const homeColors = {
  background: 'rgba(0, 0, 0, 0.5)',
  cardBackground: 'rgba(0, 0, 0, 0.1)',
  headerBackground: 'rgba(0, 0, 0, 0.3)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.5)',
  textMuted: '#939597',
  activo: '#0FFF95',
  pendiente: '#F2DC5D',
  inactivo: '#E3170A',
  reciente: '#F2DC5D',
  entregado: '#0FFF95',
  preparacion: '#E3170A',
  deporte: '#FEE083',
  urbano: '#6AD27B',
  invierno: '#9FD6FE',
  chartPrimary: '#ECB2CD',
  chartSecondary: '#9747FF',
  buttonBackground: 'rgba(255, 255, 255, 0.3)',
};

const HomeScreen: React.FC = ({ navigation }: any) => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  
  // Obtener userIdTienda del usuario autenticado
  const userIdTienda = user?.uid || '';
  
  // Cargar productos para Stock Crítico (productos con stock bajo)
  const { products, loading: productsLoading } = useProducts(userIdTienda);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simular carga de datos
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Convertir productos de Firebase al formato esperado
  const convertFirebaseToProduct = (firebaseProduct: FirebaseProduct): Product => {
    const colores = Array.isArray(firebaseProduct.color) ? firebaseProduct.color : [];
    const talles = Array.isArray(firebaseProduct.talles) ? firebaseProduct.talles : [];
    
    return {
      id: firebaseProduct.id,
      name: firebaseProduct.name || 'Producto sin nombre',
      price: Number(firebaseProduct.price) || 0,
      image: firebaseProduct.images?.[0] || firebaseProduct.image || '',
      category: firebaseProduct.coleccion || 'Sin categoría',
      stock: Number(firebaseProduct.cantidad) || 0,
      brand: firebaseProduct.marca || 'Sin marca',
      colors: colores,
      sizes: talles,
      description: firebaseProduct.description || '',
      images: firebaseProduct.images || (firebaseProduct.image ? [firebaseProduct.image] : []),
      userIdTienda: firebaseProduct.userIdTienda || '',
    };
  };

  // Filtrar productos con stock crítico (menor a 5 unidades) y tomar solo los primeros 3
  const stockCriticoProducts = products
    .filter(product => Number(product.cantidad) <= 5)
    .slice(0, 3)
    .map(convertFirebaseToProduct);

  // Función para obtener color de categoría
  const getCategoriaColor = (categoria: string) => {
    const categoriaLower = categoria.toLowerCase();
    if (categoriaLower.includes('deporte')) return homeColors.deporte;
    if (categoriaLower.includes('urbano')) return homeColors.urbano;
    if (categoriaLower.includes('invierno')) return homeColors.invierno;
    return '#FFFFFF';
  };

  // Componente para las métricas de interacciones
  const InteraccionesDelMes = () => {
    const metricas = [
      { icon: 'heart', titulo: 'Me Gusta', valor: '15,000', color: '#FF69B4' },
      { icon: 'chatbubble', titulo: 'Comentarios', valor: '2,100', color: '#74B9FF' },
      { icon: 'bookmark', titulo: 'Guardados', valor: '1,000', color: '#FFA726' },
      { icon: 'link', titulo: 'Clics en links', valor: '8,000', color: '#00B894' },
    ];

    return (
      <View style={styles.interaccionesContainer}>
        <Text style={styles.sectionTitle}>Interacciones del mes</Text>
        <View style={styles.interaccionesGrid}>
          {metricas.map((metrica, index) => (
            <View key={index} style={styles.metricaCard}>
              <View style={styles.iconContainer}>
                <View style={styles.iconBackground}>
                  <Ionicons name={metrica.icon as any} size={16} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.metricaTitulo}>{metrica.titulo}</Text>
                <Text style={styles.metricaValor}>{metrica.valor}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Componente Card de Ingresos
  const CardIngresos = () => (
    <View style={[styles.card, styles.cardIngresos]}>
      <Text style={styles.valorPrincipal}>$0.000</Text>
      <Text style={styles.labelIngresos}>Ingresos</Text>
      
      <View style={styles.tabsPeriodo}>
        <Text style={[styles.tabTexto, styles.tabActivo]}>Día</Text>
        <Text style={styles.tabTexto}>Semana</Text>
      </View>
      
      {/* Placeholder para el gráfico */}
      <View style={styles.graficoContainer}>
        <View style={styles.graficoPlaceholder}>
          <Ionicons name="trending-up" size={20} color={homeColors.chartPrimary} />
        </View>
        
        <View style={styles.labelsContainer}>
          {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((dia, index) => (
            <Text key={index} style={styles.labelDia}>{dia}</Text>
          ))}
        </View>
      </View>
    </View>
  );

  // Componente Card de Cambios Web
  const CardCambiosWeb = () => (
    <LinearGradient
      colors={['rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.2)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, styles.cardCambios]}
    >
      <View style={styles.cardCambiosContent}>
        <View style={styles.headerGradient} />
        <View style={styles.lineaDivisoria} />
        <Text style={styles.tituloCard}>Cambios en la web</Text>
        
        <View style={styles.listaCambios}>
          {[...Array(5)].map((_, index) => (
            <Text key={index} style={styles.textoCambio}>
              Productos vendidos a...
            </Text>
          ))}
        </View>
      </View>
    </LinearGradient>
  );

  // Componente Sección Órdenes
  const SeccionOrdenes = () => {
    const ordenes = [
      { id: 1, nombre: 'Arthuro Lopez', email: 'arthuro@gmail.com', estado: 'Reciente', avatar: 'https://via.placeholder.com/32' },
      { id: 2, nombre: 'María Mendoza', email: 'Mendoza@gmail.com', estado: 'Entregado', avatar: 'https://via.placeholder.com/32' },
      { id: 3, nombre: 'Leny Hernandez', email: 'Leny@gmail.com', estado: 'En preparación', avatar: 'https://via.placeholder.com/32' },
    ];

    const getEstadoColor = (estado: string) => {
      switch (estado.toLowerCase()) {
        case 'reciente': return homeColors.reciente;
        case 'entregado': return homeColors.entregado;
        case 'en preparación': return homeColors.preparacion;
        default: return homeColors.textPrimary;
      }
    };

    return (
      <View style={styles.seccionContainer}>
        <View style={styles.seccionHeader}>
          <Text style={styles.seccionTitulo}>Órdenes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('OrdersScreen')}>
            <Text style={styles.verMas}>Ver más</Text>
          </TouchableOpacity>
        </View>
        
        {ordenes.map((orden) => (
          <TouchableOpacity 
            key={orden.id} 
            style={styles.ordenItem}
            onPress={() => navigation.navigate('OrdersScreen')}
            activeOpacity={0.7}
          >
            <Image source={{ uri: orden.avatar }} style={styles.avatar} />
            <View style={styles.infoUsuario}>
              <Text style={styles.nombreUsuario}>{orden.nombre}</Text>
              <Text style={styles.emailUsuario}>{orden.email}</Text>
            </View>
            <View style={styles.estadoContainer}>
              <View style={[styles.estadoPunto, { backgroundColor: getEstadoColor(orden.estado) }]} />
              <Text style={[styles.estadoTexto, { color: getEstadoColor(orden.estado) }]}>
                {orden.estado}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Componente Sección Campañas
  const SeccionCampanas = () => {
    const campanas = [
      { id: 1, nombre: 'Campaña Red Flag', marca: 'Complot', estado: 'inactivo', imagen: 'https://via.placeholder.com/43' },
      { id: 2, nombre: 'Summer 25', marca: 'Chloe', estado: 'pendiente', imagen: 'https://via.placeholder.com/43' },
      { id: 3, nombre: 'Otoño 2025', marca: 'Bottega Veneta', estado: 'activo', imagen: 'https://via.placeholder.com/43' },
    ];

    const getEstadoColor = (estado: string) => {
      switch (estado) {
        case 'activo': return homeColors.activo;
        case 'pendiente': return homeColors.pendiente;
        case 'inactivo': return homeColors.inactivo;
        default: return homeColors.textPrimary;
      }
    };

    return (
      <View style={styles.seccionContainer}>
        <View style={styles.seccionHeader}>
          <Text style={styles.seccionTitulo}>Campañas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CampaignsScreen')}>
            <Text style={styles.verMas}>Ver más</Text>
          </TouchableOpacity>
        </View>
        
        {campanas.map((campana) => (
          <TouchableOpacity 
            key={campana.id} 
            style={styles.campanaItem}
            onPress={() => navigation.navigate('CampaignsScreen')}
            activeOpacity={0.7}
          >
            <Image source={{ uri: campana.imagen }} style={styles.imagenCampana} />
            <View style={styles.infoCampana}>
              <Text style={styles.nombreCampana}>{campana.nombre}</Text>
              <Text style={styles.marcaCampana}>{campana.marca}</Text>
            </View>
            <View style={[styles.estadoPunto, { backgroundColor: getEstadoColor(campana.estado) }]} />
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Componente Stock Crítico
  const SeccionStockCritico = () => {
    if (productsLoading) {
      return (
        <View style={styles.seccionContainer}>
          <View style={styles.seccionHeader}>
            <Text style={styles.seccionTitulo}>Stock crítico</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProductsScreen')}>
              <Text style={styles.verMas}>Ver más</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.productoItem, { justifyContent: 'center' }]}>
            <Text style={styles.nombreProducto}>Cargando productos...</Text>
          </View>
        </View>
      );
    }

    const productosAMostrar = stockCriticoProducts.length > 0 ? stockCriticoProducts : [
      // Fallback si no hay productos con stock crítico
      {
        id: 'fallback-1',
        name: 'Sin productos en stock crítico',
        brand: 'Todos los productos tienen stock suficiente',
        category: 'Sin categoría',
        image: '',
        stock: 0,
        price: 0,
        colors: [],
        sizes: [],
        description: '',
        images: [],
        userIdTienda: '',
      }
    ];

    return (
      <View style={styles.seccionContainer}>
        <View style={styles.seccionHeader}>
          <Text style={styles.seccionTitulo}>Stock crítico</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductsScreen')}>
            <Text style={styles.verMas}>Ver más</Text>
          </TouchableOpacity>
        </View>
        
        {productosAMostrar.map((producto) => (
          <TouchableOpacity 
            key={producto.id} 
            style={styles.productoItem}
            onPress={() => navigation.navigate('ProductsScreen')}
            activeOpacity={0.7}
          >
            <Image 
              source={{ 
                uri: producto.image || 'https://via.placeholder.com/32' 
              }} 
              style={styles.imagenProducto} 
            />
            <View style={styles.infoProducto}>
              <Text style={styles.nombreProducto}>{producto.name}</Text>
              <Text style={styles.marcaProducto}>{producto.brand}</Text>
              {producto.stock <= 5 && producto.stock > 0 && (
                <Text style={[styles.marcaProducto, { color: homeColors.inactivo }]}>
                  Stock: {producto.stock}
                </Text>
              )}
            </View>
            <View style={[styles.tagCategoria, { backgroundColor: getCategoriaColor(producto.category) }]}>
              <Text style={styles.textTag}>{producto.category}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Componente Sección Seguidores
  const SeccionSeguidores = () => {
    const [periodoActivo, setPeriodoActivo] = useState('Día');
    
    return (
      <View style={styles.seccionContainer}>
        <View style={styles.seguidoresHeader}>
          <Text style={styles.labelSeguidores}>Seguidores</Text>
          <Text style={styles.valorSeguidores}>+624</Text>
        </View>
        
        {/* Tabs período */}
        <View style={styles.tabsSeguidoresContainer}>
          {['Día', 'Semana', 'Mes'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setPeriodoActivo(tab)}
              style={styles.tabSeguidorItem}
            >
              <Text style={[
                styles.tabSeguidorTexto,
                periodoActivo === tab && styles.tabSeguidorActivo
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Placeholder para gráfico dual */}
        <View style={styles.graficoSeguidoresContainer}>
          <View style={styles.graficoSeguidoresPlaceholder}>
            <Ionicons name="trending-up" size={24} color={homeColors.chartPrimary} />
            <Ionicons name="trending-down" size={24} color={homeColors.chartSecondary} />
          </View>
        </View>
        
        {/* Labels días */}
        <View style={styles.labelsSeguidoresContainer}>
          {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((dia, index) => (
            <Text 
              key={index} 
              style={[
                styles.labelSeguidorDia,
                index === 0 && styles.labelSeguidorActivo
              ]}
            >
              {dia}
            </Text>
          ))}
        </View>
        
        {/* Leyenda */}
        <View style={styles.leyendaSeguidoresContainer}>
          <View style={styles.leyendaSeguidorItem}>
            <View style={[styles.leyendaSeguidorColor, { backgroundColor: homeColors.chartPrimary }]} />
            <Text style={styles.leyendaSeguidorTexto}>Seguidores</Text>
          </View>
          <View style={styles.leyendaSeguidorItem}>
            <View style={[styles.leyendaSeguidorColor, { backgroundColor: homeColors.chartSecondary }]} />
            <Text style={styles.leyendaSeguidorTexto}>Dejaron de seguir</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <BackgroundPattern opacity={0.06} />
      <LayerBackground opacity={0.3} />
      
      <Header />

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
          />
        }
      >
        {/* Botón Añadir Producto */}
        <TouchableOpacity 
          style={styles.botonAnadirProducto}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ProductsScreen')}
        >
          <Text style={styles.textoBotonAnadir}>Añadir producto</Text>
        </TouchableOpacity>

        {/* Interacciones del mes - Grid 2x2 */}
        <InteraccionesDelMes />

        {/* Cards principales - Ingresos + Cambios web */}
        <View style={styles.cardsContainer}>
          <CardIngresos />
          <CardCambiosWeb />
        </View>

        {/* Sección Órdenes */}
        <SeccionOrdenes />

        {/* Sección Campañas */}
        <SeccionCampanas />

        {/* Sección Stock Crítico */}
        <SeccionStockCritico />

        {/* Sección Seguidores con gráfico dual */}
        <SeccionSeguidores />

        {/* Espaciado inferior para bottom nav */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: homeColors.background, // rgba(0, 0, 0, 0.5)
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 88, // Espacio para header fijo
    paddingHorizontal: 15, // Padding lateral consistente
    paddingBottom: 100, // Espacio para bottom nav
  },
  
  // Botón Añadir Producto
  botonAnadirProducto: {
    width: screenWidth - 30,
    height: 40,
    backgroundColor: homeColors.buttonBackground, // rgba(255, 255, 255, 0.3)
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Padding superior añadido
    marginBottom: 24,
  },
  textoBotonAnadir: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 16,
    color: homeColors.textPrimary,
  },
  
  // Interacciones del mes
  interaccionesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 24, // Corregido para que no se corte el texto
    color: homeColors.textPrimary,
    marginBottom: 16,
  },
  interaccionesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  metricaCard: {
    width: (screenWidth - 40) / 2 - 2.5, // 2 columnas con gap
    height: 51,
    backgroundColor: homeColors.cardBackground,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    marginRight: 8,
  },
  iconBackground: {
    width: 34,
    height: 34,
    borderRadius: 29.6,
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  metricaTitulo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 11,
    color: homeColors.textSecondary,
    marginBottom: 2,
  },
  metricaValor: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    color: homeColors.textPrimary,
  },
  
  // Cards container
  cardsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    backgroundColor: homeColors.cardBackground,
    borderRadius: 20,
    padding: 15,
  },
  cardIngresos: {
    width: 166,
    height: 191,
    position: 'relative',
  },
  cardCambios: {
    flex: 1,
    height: 191,
    borderRadius: 30,
    padding: 10,
  },
  
  // Card Ingresos específicos
  valorPrincipal: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 32,
    color: homeColors.textPrimary,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  labelIngresos: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 13,
    color: homeColors.textPrimary,
    position: 'absolute',
    top: 57,
    left: 15,
  },
  tabsPeriodo: {
    position: 'absolute',
    top: 81,
    left: 15,
    flexDirection: 'row',
    gap: 8,
  },
  tabTexto: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 13,
    color: homeColors.textPrimary,
  },
  tabActivo: {
    fontFamily: 'Poppins-SemiBold',
  },
  graficoContainer: {
    position: 'absolute',
    top: 86,
    left: 2,
    width: 162,
    height: 95,
  },
  graficoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  labelsContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  labelDia: {
    fontFamily: 'Poppins-Regular',
    fontSize: 9,
    lineHeight: 14,
    color: homeColors.textPrimary,
    textAlign: 'center',
  },
  
  // Card Cambios Web
  cardCambiosContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 20,
    padding: 8,
  },
  headerGradient: {
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineaDivisoria: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 5,
  },
  tituloCard: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    lineHeight: 15,
    color: homeColors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  listaCambios: {
    flex: 1,
    gap: 5,
  },
  textoCambio: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    lineHeight: 13,
    color: homeColors.textSecondary,
  },
  
  // Secciones generales
  seccionContainer: {
    backgroundColor: homeColors.cardBackground,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  seccionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seccionTitulo: {
    fontFamily: 'Poppins-Bold', // Cambiado a Bold
    fontSize: 18, // Aumentado de 16 a 18
    lineHeight: 26, // Ajustado proporcionalmente
    color: homeColors.textPrimary,
  },
  verMas: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: homeColors.textPrimary,
  },
  
  // Órdenes
  ordenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 16,
    paddingVertical: 8, // Mejor área de toque
    paddingHorizontal: 4,
    borderRadius: 8, // Retroalimentación visual
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  infoUsuario: {
    flex: 1,
    gap: 2,
  },
  nombreUsuario: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: homeColors.textPrimary,
  },
  emailUsuario: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: '#DFDFDF',
  },
  estadoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  estadoPunto: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  estadoTexto: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 15,
  },
  
  // Campañas
  campanaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 16,
    paddingVertical: 8, // Mejor área de toque
    paddingHorizontal: 4,
    borderRadius: 8, // Retroalimentación visual
  },
  imagenCampana: {
    width: 43,
    height: 43,
    borderRadius: 8,
  },
  infoCampana: {
    flex: 1,
    gap: 2,
  },
  nombreCampana: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 15,
    color: homeColors.textPrimary,
  },
  marcaCampana: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: homeColors.textMuted,
  },
  
  // Stock Crítico
  productoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 16,
    paddingVertical: 8, // Mejor área de toque
    paddingHorizontal: 4,
    borderRadius: 8, // Retroalimentación visual
  },
  imagenProducto: {
    width: 32,
    height: 32,
    borderRadius: 32,
  },
  infoProducto: {
    flex: 1,
    gap: 2,
  },
  nombreProducto: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: homeColors.textPrimary,
  },
  marcaProducto: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: homeColors.textPrimary,
  },
  tagCategoria: {
    paddingHorizontal: 7,
    paddingVertical: 0,
    borderRadius: 11,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTag: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: '#000000',
    textAlign: 'center',
  },
  
  // Sección Seguidores
  seguidoresHeader: {
    gap: 5,
    marginBottom: 16,
  },
  labelSeguidores: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: homeColors.textSecondary,
  },
  valorSeguidores: {
    fontFamily: 'Poppins-Medium',
    fontSize: 30,
    lineHeight: 32,
    color: homeColors.textPrimary,
  },
  tabsSeguidoresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 10,
  },
  tabSeguidorItem: {
    paddingVertical: 4,
  },
  tabSeguidorTexto: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 13,
    color: '#929292',
  },
  tabSeguidorActivo: {
    fontFamily: 'Poppins-SemiBold',
    color: homeColors.textPrimary,
  },
  graficoSeguidoresContainer: {
    height: 124,
    marginBottom: 20,
  },
  graficoSeguidoresPlaceholder: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  labelsSeguidoresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginBottom: 15,
  },
  labelSeguidorDia: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: homeColors.textSecondary,
    textAlign: 'center',
  },
  labelSeguidorActivo: {
    color: homeColors.textPrimary,
  },
  leyendaSeguidoresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  leyendaSeguidorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  leyendaSeguidorColor: {
    width: 15,
    height: 5,
    borderRadius: 8,
  },
  leyendaSeguidorTexto: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
    lineHeight: 15,
    color: homeColors.textPrimary,
  },
  
  // Espaciado final
  bottomSpacer: {
    height: 20,
  },
});

export default HomeScreen;