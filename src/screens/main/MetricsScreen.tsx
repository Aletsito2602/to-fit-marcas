import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import BackgroundPattern from '../../components/BackgroundPattern';
import LayerBackground from '../../components/LayerBackground';
import Header from '../../components/Header';
import QuickStatsBar from '../../components/metrics/QuickStatsBar';
import FilterSection from '../../components/metrics/FilterSection';
import EnhancedMetricCard from '../../components/metrics/EnhancedMetricCard';
import { CampaignMetricsCard } from '../../components/metrics/CampaignMetricsCard';
import SectionHeader from '../../components/metrics/SectionHeader';

const { width: screenWidth } = Dimensions.get('window');

const MetricsScreen: React.FC = ({ navigation }: any) => {
  const { user } = useAuth();
  const [activeTimeframe, setActiveTimeframe] = useState('week');
  const [activeCategory, setActiveCategory] = useState('all');

  // Datos simulados - en producción vendrían de hooks
  const recurringCustomersData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [{ data: [65, 68, 72, 68, 71] }],
  };

  const salesChannelsData = [
    { name: 'Instagram', population: 45, color: '#E1306C', legendFontColor: '#fff', legendFontSize: 10 },
    { name: 'WhatsApp', population: 25, color: '#25D366', legendFontColor: '#fff', legendFontSize: 10 },
    { name: 'Web', population: 20, color: '#1DA1F2', legendFontColor: '#fff', legendFontSize: 10 },
    { name: 'Afiliados', population: 10, color: '#9747FF', legendFontColor: '#fff', legendFontSize: 10 },
  ];

  const engagementData = {
    labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    datasets: [{ data: [7.2, 8.1, 9.3, 8.7, 8.2, 9.1, 8.5] }],
  };

  const revenueData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [{ data: [2800, 3200, 2900, 3800, 4200] }],
  };

  const topProducts = [
    { id: '1', name: 'Remera Básica', image: 'https://via.placeholder.com/40', sales: 45, revenue: '$2,250' },
    { id: '2', name: 'Jean Clásico', image: 'https://via.placeholder.com/40', sales: 32, revenue: '$1,920' },
    { id: '3', name: 'Buzo Oversize', image: 'https://via.placeholder.com/40', sales: 28, revenue: '$1,680' },
    { id: '4', name: 'Zapatillas Urban', image: 'https://via.placeholder.com/40', sales: 24, revenue: '$1,440' },
    { id: '5', name: 'Campera Denim', image: 'https://via.placeholder.com/40', sales: 22, revenue: '$1,320' },
  ];

  const customerRetentionData = [
    { name: 'Nuevos', population: 35, color: '#0FFF95', legendFontColor: '#fff', legendFontSize: 10 },
    { name: 'Recurrentes', population: 45, color: '#F2DC5D', legendFontColor: '#fff', legendFontSize: 10 },
    { name: 'Inactivos', population: 20, color: '#E3170A', legendFontColor: '#fff', legendFontSize: 10 },
  ];

  const conversionFunnelData = {
    labels: ['Visitas', 'Interés', 'Carrito', 'Compra'],
    datasets: [{ data: [1000, 350, 120, 85] }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <LayerBackground opacity={0.3} />
      <Header showMenu={true} />
      
      <ScrollView style={styles.scrollContainer}>
        {/* Barra de estadísticas rápidas */}
        <QuickStatsBar 
          revenue="$8,240"
          orders="156"
          conversion="8.2%"
          growth="+12%"
        />
        
        {/* Filtros de tiempo y categoría */}
        <FilterSection
          timeframes={['day', 'week', 'month', 'year']}
          categories={['all', 'sales', 'campaigns', 'products', 'customers', 'affiliates']}
          activeTimeframe={activeTimeframe}
          activeCategory={activeCategory}
          onTimeframeChange={setActiveTimeframe}
          onCategoryChange={setActiveCategory}
        />

        {/* Sección de Ventas y Ingresos */}
        <SectionHeader 
          title="Ventas y Ingresos" 
          subtitle="Análisis de rendimiento financiero"
        />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricsCardsContainer}
        >
          <EnhancedMetricCard
            title="Ingresos Totales"
            value="$8,240"
            trend="up"
            subtitle="+15% vs periodo anterior"
            chartData={revenueData}
            chartType="line"
            width={180}
            height={200}
          />
          <EnhancedMetricCard
            title="Canales de Venta"
            value="4 activos"
            subtitle="Instagram lidera con 45%"
            pieData={salesChannelsData}
            chartType="pie"
            width={180}
            height={200}
          />
          <EnhancedMetricCard
            title="Ticket Promedio"
            value="$52.80"
            trend="up"
            subtitle="+8% vs mes anterior"
            chartType="none"
            width={160}
            height={200}
          />
        </ScrollView>

        {/* Sección de Clientes */}
        <SectionHeader 
          title="Análisis de Clientes" 
          subtitle="Retención y comportamiento"
        />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricsCardsContainer}
        >
          <EnhancedMetricCard
            title="Clientes Recurrentes"
            value="68%"
            trend="up"
            subtitle="Excelente retención"
            chartData={recurringCustomersData}
            chartType="line"
            width={180}
            height={200}
          />
          <EnhancedMetricCard
            title="Segmentación"
            value="3 grupos"
            subtitle="45% recurrentes"
            pieData={customerRetentionData}
            chartType="pie"
            width={180}
            height={200}
          />
          <EnhancedMetricCard
            title="Embudo Conversión"
            value="8.5%"
            trend="up"
            subtitle="Tasa de conversión"
            chartData={conversionFunnelData}
            chartType="line"
            width={180}
            height={200}
          />
        </ScrollView>

        {/* Sección de Productos */}
        <SectionHeader 
          title="Rendimiento de Productos" 
          subtitle="Best sellers y análisis de catálogo"
        />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricsCardsContainer}
        >
          <EnhancedMetricCard
            title="Best Sellers"
            value="Top 5"
            subtitle="Este mes"
            products={topProducts}
            chartType="products"
            width={200}
            height={220}
          />
          <EnhancedMetricCard
            title="Rotación Stock"
            value="2.3x"
            trend="up"
            subtitle="Veces por mes"
            chartType="none"
            width={160}
            height={220}
          />
          <EnhancedMetricCard
            title="Margen Promedio"
            value="45%"
            trend="stable"
            subtitle="Rentabilidad"
            chartType="none"
            width={160}
            height={220}
          />
        </ScrollView>

        {/* Sección de Engagement */}
        <SectionHeader 
          title="Engagement y Marketing" 
          subtitle="Interacciones y alcance"
        />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricsCardsContainer}
        >
          <EnhancedMetricCard
            title="Engagement Rate"
            value="8.2%"
            trend="up"
            subtitle="Promedio semanal"
            chartData={engagementData}
            chartType="line"
            width={180}
            height={200}
          />
          <EnhancedMetricCard
            title="Alcance Orgánico"
            value="12.5K"
            trend="up"
            subtitle="Personas alcanzadas"
            chartType="none"
            width={160}
            height={200}
          />
          <EnhancedMetricCard
            title="Publicaciones Guardadas"
            value="1,450"
            trend="up"
            subtitle="Contenido de calidad"
            chartType="none"
            width={160}
            height={200}
          />
        </ScrollView>

        {/* Sección de Campañas y Afiliados */}
        <SectionHeader 
          title="Campañas y Afiliados" 
          subtitle="Rendimiento de campañas activas"
        />
        <View style={styles.campaignMetricsContainer}>
          <CampaignMetricsCard
            activeCampaigns={3}
            totalRevenue="$12,500"
            topPerformingCampaign="Summer 2025"
            affiliateCount={24}
            conversionRate="12.3%"
            onPress={() => navigation.navigate('CampaignsScreen')}
          />
        </View>

        {/* Espaciado inferior */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 88, // Espacio para header fijo
  },
  metricsCardsContainer: {
    paddingLeft: 12,
    paddingRight: 20,
    paddingBottom: 20,
  },
  campaignMetricsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bottomSpacer: {
    height: 100, // Espacio para bottom navigation
  },
});

export default MetricsScreen;