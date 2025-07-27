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
import { StackNavigationProp } from '@react-navigation/stack';
import { MetricsStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';
import ModernMetricCard from '../../components/metrics/ModernMetricCard';
import MetricsList from '../../components/metrics/MetricsList';
import ModernTabBar from '../../components/metrics/ModernTabBar';
import LoadingSkeleton from '../../components/metrics/LoadingSkeleton';
import useMetricsData from '../../hooks/useMetricsData';

type MetricsDashboardNavigationProp = StackNavigationProp<MetricsStackParamList, 'MetricsDashboard'>;

const { width: screenWidth } = Dimensions.get('window');

const MetricsDashboardScreen: React.FC = () => {
  const navigation = useNavigation<MetricsDashboardNavigationProp>();
  const [activeTab, setActiveTab] = useState('performance');
  const [refreshing, setRefreshing] = useState(false);
  
  // Hook para datos con animaciones
  const {
    performanceMetrics,
    conversionMetrics,
    customerMetrics,
    growthMetrics,
    socialMetrics,
    loading,
    refreshData,
  } = useMetricsData();

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  };

  const tabs = [
    { id: 'performance', title: 'Rendimiento', subtitle: 'Ventas & KPIs' },
    { id: 'customers', title: 'Clientes', subtitle: 'Analytics & Afiliados' },
    { id: 'growth', title: 'Crecimiento', subtitle: 'Campañas & Redes' },
  ];

  // Datos estáticos con loading states
  const popularProducts = [
    { id: '1', title: 'Remera Básica Blanca', value: loading ? '...' : '45 vendidas', subtitle: 'Colección Urbana', image: 'https://via.placeholder.com/40', status: 'success' as const },
    { id: '2', title: 'Jean Clásico Azul', value: loading ? '...' : '32 vendidas', subtitle: 'Colección Básicos', image: 'https://via.placeholder.com/40', status: 'success' as const },
    { id: '3', title: 'Buzo Oversize Negro', value: loading ? '...' : '28 vendidas', subtitle: 'Colección Invierno', image: 'https://via.placeholder.com/40', status: 'success' as const },
    { id: '4', title: 'Zapatillas Deportivas', value: loading ? '...' : '24 vendidas', subtitle: 'Colección Deporte', image: 'https://via.placeholder.com/40', status: 'warning' as const },
  ];

  const topCustomers = [
    { id: '1', title: 'María González', value: loading ? '...' : '$2,400', subtitle: 'Cliente VIP', status: 'success' as const },
    { id: '2', title: 'Carlos Rodríguez', value: loading ? '...' : '$1,800', subtitle: 'Cliente Frecuente', status: 'success' as const },
    { id: '3', title: 'Ana Martínez', value: loading ? '...' : '$1,200', subtitle: 'Cliente Regular', status: 'warning' as const },
    { id: '4', title: 'Luis Fernández', value: loading ? '...' : '$980', subtitle: 'Cliente Nuevo', status: 'active' as const },
  ];

  const topAffiliates = [
    { id: '1', title: '@fashion_influencer', value: loading ? '...' : '$450', subtitle: '12 ventas este mes', icon: 'logo-instagram' as const, status: 'success' as const },
    { id: '2', title: '@style_blogger', value: loading ? '...' : '$320', subtitle: '8 ventas este mes', icon: 'logo-instagram' as const, status: 'success' as const },
    { id: '3', title: '@trendy_girl', value: loading ? '...' : '$280', subtitle: '6 ventas este mes', icon: 'logo-instagram' as const, status: 'warning' as const },
  ];

  const campaignsList = [
    { id: '1', title: 'Summer 2025', value: loading ? '...' : '$4,200', subtitle: '12 afiliados activos', image: 'https://via.placeholder.com/40', status: 'active' as const },
    { id: '2', title: 'Otoño Collection', value: loading ? '...' : '$3,100', subtitle: '8 afiliados activos', image: 'https://via.placeholder.com/40', status: 'active' as const },
    { id: '3', title: 'Black Friday', value: loading ? '...' : '$5,200', subtitle: '15 afiliados (finalizada)', image: 'https://via.placeholder.com/40', status: 'success' as const },
  ];


  const renderPerformanceTab = () => (
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
      <View style={styles.metricsGrid}>
        {loading ? (
          <LoadingSkeleton type="card" size="medium" count={4} />
        ) : (
          performanceMetrics.map((metric, index) => (
            <ModernMetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon as any}
              size="medium"
            />
          ))
        )}
      </View>

      {/* Conversion Metrics */}
      <Text style={styles.sectionTitle}>Análisis de Conversión</Text>
      <View style={styles.metricsGrid}>
        {loading ? (
          <LoadingSkeleton type="card" size="small" count={3} />
        ) : (
          conversionMetrics.map((metric, index) => (
            <ModernMetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              changeType={metric.changeType}
              size="small"
              compact={true}
            />
          ))
        )}
      </View>

      {/* Popular Products List */}
      {loading ? (
        <LoadingSkeleton type="list" />
      ) : (
        <MetricsList
          title="Productos Más Vendidos"
          data={popularProducts}
          maxItems={4}
          onSeeMore={() => navigation.navigate('Products' as never)}
        />
      )}

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );

  const renderCustomersTab = () => (
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
      {/* Customer KPIs */}
      <View style={styles.metricsGrid}>
        {loading ? (
          <LoadingSkeleton type="card" size="medium" count={4} />
        ) : (
          customerMetrics.map((metric, index) => (
            <ModernMetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon as any}
              size="medium"
            />
          ))
        )}
      </View>

      {/* Top Customers */}
      {loading ? (
        <LoadingSkeleton type="list" />
      ) : (
        <MetricsList
          title="Top Clientes"
          data={topCustomers}
          maxItems={4}
          onSeeMore={() => console.log('Ver todos los clientes')}
        />
      )}

      {/* Top Affiliates */}
      {loading ? (
        <LoadingSkeleton type="list" />
      ) : (
        <MetricsList
          title="Mejores Afiliados"
          data={topAffiliates}
          maxItems={3}
          onSeeMore={() => console.log('Ver todos los afiliados')}
        />
      )}

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );

  const renderGrowthTab = () => (
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
      {/* Growth KPIs */}
      <View style={styles.metricsGrid}>
        {loading ? (
          <LoadingSkeleton type="card" size="medium" count={4} />
        ) : (
          growthMetrics.map((metric, index) => (
            <ModernMetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon as any}
              size="medium"
            />
          ))
        )}
      </View>

      {/* Campaigns */}
      {loading ? (
        <LoadingSkeleton type="list" />
      ) : (
        <MetricsList
          title="Campañas Activas"
          data={campaignsList}
          maxItems={3}
          onSeeMore={() => navigation.navigate('Campaigns' as never)}
        />
      )}


      {/* Social Media Metrics */}
      <Text style={styles.sectionTitle}>Redes Sociales - Este Mes</Text>
      <View style={styles.metricsGrid}>
        {loading ? (
          <LoadingSkeleton type="card" size="medium" count={4} />
        ) : (
          socialMetrics.map((metric, index) => (
            <ModernMetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              changeType={metric.changeType}
              size="medium"
            />
          ))
        )}
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'performance':
        return renderPerformanceTab();
      case 'customers':
        return renderCustomersTab();
      case 'growth':
        return renderGrowthTab();
      default:
        return renderPerformanceTab();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <BackgroundPattern opacity={0.06} />
      
      <Header />

      <SafeAreaView style={styles.content}>
        {/* Tab Bar */}
        <ModernTabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />

        {/* Content */}
        <View style={styles.tabContent}>
          {renderActiveTab()}
        </View>
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
  tabContent: {
    flex: 1,
    paddingHorizontal: 0,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20, // Vuelto a padding estándar
    marginBottom: 20, // Spacing optimizado
  },
  sectionTitle: {
    fontSize: 20, // Incrementado para mejor jerarquía
    fontFamily: 'Poppins-Bold', // Cambiado a Bold
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginBottom: 16, // Incrementado spacing
    marginTop: 12, // Incrementado spacing
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  bottomSpacing: {
    height: 100, // Espacio para main navigator tab bar
  },
});

export default MetricsDashboardScreen;