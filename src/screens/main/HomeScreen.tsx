import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';
import ModernMetricCard from '../../components/metrics/ModernMetricCard';
import MetricsList from '../../components/metrics/MetricsList';
import LoadingSkeleton from '../../components/metrics/LoadingSkeleton';
import { useProducts } from '../../hooks/useProducts';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen: React.FC = ({ navigation }: any) => {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const userIdTienda = user?.uid || '';
  const { products } = useProducts(userIdTienda);

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true);
    // Simular carga de datos
    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
    }, 1500);
  };

  // Datos de métricas principales con datos dinámicos
  const today = new Date();
  const dayOfMonth = today.getDate();
  const baseRevenue = 17800 + (dayOfMonth * 150);
  const baseOrders = 234 + dayOfMonth * 2;
  const baseConversion = 10.8 + (dayOfMonth * 0.05);
  const stockCritico = products.filter(product => Number(product.cantidad) <= 5).length;

  const mainMetrics = [
    {
      id: '1',
      title: 'Ingresos Totales',
      value: loading ? '...' : `$${baseRevenue.toLocaleString()}`,
      change: '+30%',
      changeType: 'positive' as const,
      icon: 'trending-up' as const,
    },
    {
      id: '2',
      title: 'Pedidos',
      value: loading ? '...' : baseOrders.toString(),
      change: '+12%',
      changeType: 'positive' as const,
      icon: 'bag-outline' as const,
    },
    {
      id: '3',
      title: 'Conversión',
      value: loading ? '...' : `${baseConversion.toFixed(1)}%`,
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: 'analytics-outline' as const,
    },
    {
      id: '4',
      title: 'Ticket Promedio',
      value: loading ? '...' : `$${Math.round(baseRevenue / baseOrders)}`,
      change: '+5%',
      changeType: 'positive' as const,
      icon: 'card-outline' as const,
    },
  ];

  // Métricas de estado crítico - 4 cards en grid 2x2
  const urgentMetrics = [
    {
      id: '1',
      title: 'Nuevos Pedidos',
      value: loading ? '...' : '12',
      change: '+15%',
      changeType: 'positive' as const,
      icon: 'notifications-outline' as const,
    },
    {
      id: '2',
      title: 'Pagos Pendientes',
      value: loading ? '...' : '$2,400',
      change: 'Por cobrar',
      changeType: 'negative' as const,
      icon: 'time-outline' as const,
    },
    {
      id: '3',
      title: 'Stock Crítico',
      value: loading ? '...' : stockCritico.toString(),
      change: 'Productos',
      changeType: stockCritico > 0 ? 'negative' as const : 'positive' as const,
      icon: 'warning-outline' as const,
    },
    {
      id: '4',
      title: 'Campañas Activas',
      value: loading ? '...' : '3',
      change: '+1 esta semana',
      changeType: 'positive' as const,
      icon: 'megaphone-outline' as const,
    },
  ];

  // Productos más vendidos con datos dinámicos del stock real
  const getTopProducts = () => {
    if (products.length > 0) {
      return products
        .sort((a, b) => Number(b.cantidad || 0) - Number(a.cantidad || 0))
        .slice(0, 4)
        .map((product, index) => ({
          id: product.id,
          title: product.name || 'Producto sin nombre',
          value: loading ? '...' : `${product.cantidad || 0} en stock`,
          subtitle: product.coleccion || 'Sin categoría',
          image: product.images?.[0] || 'https://via.placeholder.com/40',
          status: Number(product.cantidad || 0) > 10 ? 'success' as const : 
                 Number(product.cantidad || 0) > 5 ? 'warning' as const : 'active' as const,
        }));
    }
    
    // Fallback data si no hay productos
    return [
      { 
        id: '1', 
        title: 'Remera Básica Blanca', 
        value: loading ? '...' : '45 vendidas', 
        subtitle: 'Colección Urbana', 
        image: 'https://via.placeholder.com/40', 
        status: 'success' as const 
      },
      { 
        id: '2', 
        title: 'Jean Clásico Azul', 
        value: loading ? '...' : '32 vendidas', 
        subtitle: 'Colección Básicos', 
        image: 'https://via.placeholder.com/40', 
        status: 'success' as const 
      },
      { 
        id: '3', 
        title: 'Buzo Oversize Negro', 
        value: loading ? '...' : '28 vendidas', 
        subtitle: 'Colección Invierno', 
        image: 'https://via.placeholder.com/40', 
        status: 'success' as const 
      },
      { 
        id: '4', 
        title: 'Zapatillas Deportivas', 
        value: loading ? '...' : '24 vendidas', 
        subtitle: 'Colección Deporte', 
        image: 'https://via.placeholder.com/40', 
        status: 'warning' as const 
      },
    ];
  };

  const topProducts = getTopProducts();

  // Campañas activas
  const activeCampaigns = [
    {
      id: '1',
      title: 'Summer 2025',
      value: loading ? '...' : '$4,200',
      subtitle: '12 afiliados activos',
      image: 'https://via.placeholder.com/40',
      status: 'active' as const,
    },
    {
      id: '2',
      title: 'Otoño Collection',
      value: loading ? '...' : '$3,100',
      subtitle: '8 afiliados activos',
      image: 'https://via.placeholder.com/40',
      status: 'active' as const,
    },
    {
      id: '3',
      title: 'Black Friday',
      value: loading ? '...' : '$5,200',
      subtitle: '15 afiliados (finalizada)',
      image: 'https://via.placeholder.com/40',
      status: 'success' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <BackgroundPattern opacity={0.06} />
      
      <Header />

      <SafeAreaView style={styles.content}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FFFFFF"
            />
          }
        >
          {/* Main KPIs */}
          <Text style={styles.sectionTitle}>Resumen de Ventas</Text>
          <View style={styles.metricsGrid}>
            {loading ? (
              <LoadingSkeleton type="card" size="medium" count={4} />
            ) : (
              mainMetrics.map((metric, index) => (
                <ModernMetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  size="medium"
                  onPress={() => {
                    if (metric.icon === 'bag-outline') navigation.navigate('Orders');
                    else if (metric.icon === 'analytics-outline') navigation.navigate('Metrics');
                  }}
                />
              ))
            )}
          </View>

          {/* Urgent Metrics */}
          <Text style={styles.sectionTitle}>Estado Crítico</Text>
          <View style={styles.urgentGrid}>
            {loading ? (
              <LoadingSkeleton type="card" size="medium" count={4} />
            ) : (
              urgentMetrics.map((metric, index) => (
                <ModernMetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  size="medium"
                  onPress={() => {
                    if (metric.icon === 'notifications-outline') navigation.navigate('Orders');
                    else if (metric.icon === 'time-outline') navigation.navigate('Invoices');
                    else if (metric.icon === 'warning-outline') navigation.navigate('Products');
                    else if (metric.icon === 'megaphone-outline') navigation.navigate('Campaigns');
                  }}
                />
              ))
            )}
          </View>

          {/* Top Products */}
          {loading ? (
            <LoadingSkeleton type="list" />
          ) : (
            <MetricsList
              title="Stock de Productos"
              data={topProducts}
              maxItems={4}
              onSeeMore={() => navigation.navigate('Products')}
            />
          )}

          {/* Active Campaigns */}
          {loading ? (
            <LoadingSkeleton type="list" />
          ) : (
            <MetricsList
              title="Campañas Activas"
              data={activeCampaigns}
              maxItems={3}
              onSeeMore={() => navigation.navigate('Campaigns')}
            />
          )}

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    paddingTop: 120, // Incrementado para evitar superposición con header
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 48, // Incrementado mucho más para mayor espacio superior
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  urgentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bottomSpacing: {
    height: 100,
  },
});

export default HomeScreen;