import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LineChart } from 'react-native-chart-kit';
import { MetricsStackParamList } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import LayerBackground from '../../components/LayerBackground';
import Header from '../../components/Header';
import InteractionsModal from './InteractionsModal';
import CampaignsModal from './CampaignsModal';

type MetricsDashboardNavigationProp = StackNavigationProp<MetricsStackParamList, 'MetricsDashboard'>;

const screenWidth = Dimensions.get('window').width;

// Configuración para gráficos que coincidan con el fondo de las cards
const getCleanChartConfig = (color: string) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Mismo color que las cards
  backgroundGradientFrom: 'rgba(0, 0, 0, 0.1)', 
  backgroundGradientTo: 'rgba(0, 0, 0, 0.1)',
  backgroundGradientFromOpacity: 1,
  backgroundGradientToOpacity: 1,
  decimalPlaces: 0,
  color: () => color,
  labelColor: () => 'rgba(0,0,0,0)', // Completamente transparente
  style: {
    borderRadius: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Coincide con las cards
  },
  propsForBackgroundLines: {
    strokeWidth: 0,
    stroke: 'rgba(0,0,0,0)',
  },
  propsForLabels: {
    fontSize: 0,
    fill: 'rgba(0,0,0,0)',
  },
  fillShadowGradient: 'rgba(0,0,0,0)',
  fillShadowGradientOpacity: 0,
  useShadowColorFromDataset: false,
  propsForHorizontalLabels: {
    fontSize: 0,
    fill: 'rgba(0,0,0,0)',
  },
  propsForVerticalLabels: {
    fontSize: 0,
    fill: 'rgba(0,0,0,0)',
  },
});

const MetricsDashboardScreen: React.FC = () => {
  const navigation = useNavigation<MetricsDashboardNavigationProp>();
  const [activeFilter, setActiveFilter] = useState('Rendimiento');
  const [activePeriod, setActivePeriod] = useState('Mes');
  const [activeDayFilter, setActiveDayFilter] = useState('Día');
  const [showInteractionsModal, setShowInteractionsModal] = useState(false);
  const [showCampaignsModal, setShowCampaignsModal] = useState(false);

  const filters = ['Rendimiento', 'Cliente/Afiliado', 'Crecimiento'];
  const periods = ['Semana', 'Mes', 'Año'];
  const dayFilters = ['Día', 'Semana', 'Mes'];

  // Mock data para productos populares
  const popularProducts = [
    {
      id: '1',
      name: 'Saco',
      brand: 'Zara',
      category: 'Invierno',
      categoryColor: '#74B9FF',
      image: null,
    },
    {
      id: '2',
      name: 'Zapatillas',
      brand: 'Nike',
      category: 'Deporte',
      categoryColor: '#FDCB6E',
      image: null,
    },
    {
      id: '3',
      name: 'Jeans',
      brand: 'Levis',
      category: 'Urbano',
      categoryColor: '#00B894',
      image: null,
    },
  ];

  // Mock data para ventas con descuento
  const discountSales = [
    {
      id: '1',
      name: 'Ana García',
      email: 'ana@email.com',
      avatar: null,
    },
    {
      id: '2',
      name: 'Carlos López',
      email: 'carlos@email.com',
      avatar: null,
    },
    {
      id: '3',
      name: 'María Torres',
      email: 'maria@email.com',
      avatar: null,
    },
  ];

  // Mock data para stock crítico
  const criticalStock = [
    { id: '1', name: 'Camiseta básica', brand: 'H&M', quantity: 5 },
    { id: '2', name: 'Pantalón vaquero', brand: 'Zara', quantity: 3 },
    { id: '3', name: 'Sudadera', brand: 'Nike', quantity: 2 },
  ];

  // Mock data para clientes
  const topClients = [
    { id: '1', name: 'María González', avatar: null, totalSpent: 2850, purchases: 12 },
    { id: '2', name: 'Carlos Ruiz', avatar: null, totalSpent: 2340, purchases: 8 },
    { id: '3', name: 'Ana Martín', avatar: null, totalSpent: 1890, purchases: 15 },
    { id: '4', name: 'Luis Torres', avatar: null, totalSpent: 1650, purchases: 6 },
    { id: '5', name: 'Sofia López', avatar: null, totalSpent: 1420, purchases: 9 },
  ];

  const recentActivity = [
    { id: '1', icon: 'bag-handle-outline', description: 'María González realizó una compra de $150.00', time: '2h' },
    { id: '2', icon: 'person-add-outline', description: 'Carlos Ruiz se registró como nuevo cliente', time: '4h' },
    { id: '3', icon: 'heart-outline', description: 'Ana Martín agregó 3 productos a favoritos', time: '6h' },
    { id: '4', icon: 'chatbubble-outline', description: 'Luis Torres dejó una reseña de 5 estrellas', time: '8h' },
  ];

  const inactiveClients = [
    { id: '1', name: 'Roberto Díaz', avatar: null, daysSinceLastPurchase: 90 },
    { id: '2', name: 'Carmen Vega', avatar: null, daysSinceLastPurchase: 75 },
    { id: '3', name: 'Pedro Silva', avatar: null, daysSinceLastPurchase: 60 },
  ];

  // Mock data para afiliados
  const topAffiliates = [
    { id: '1', name: 'Elena Morales', avatar: null, commission: 1850, sales: 23 },
    { id: '2', name: 'Diego Herrera', avatar: null, commission: 1340, sales: 18 },
    { id: '3', name: 'Laura Castillo', avatar: null, commission: 980, sales: 14 },
    { id: '4', name: 'Miguel Santos', avatar: null, commission: 750, sales: 11 },
    { id: '5', name: 'Isabel Jiménez', avatar: null, commission: 620, sales: 9 },
  ];

  const withdrawalRequests = [
    { id: '1', name: 'Elena Morales', avatar: null, amount: 850, status: 'pending' },
    { id: '2', name: 'Diego Herrera', avatar: null, amount: 640, status: 'processing' },
    { id: '3', name: 'Laura Castillo', avatar: null, amount: 420, status: 'paid' },
  ];

  const topLinks = [
    { id: '1', name: 'Campaña Verano 2025', clicks: 350, sales: 15 },
    { id: '2', name: 'Promoción Black Friday', clicks: 280, sales: 22 },
    { id: '3', name: 'Colección Invierno', clicks: 195, sales: 8 },
  ];

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

  const renderPeriodButton = (period: string) => (
    <TouchableOpacity
      key={period}
      style={[
        styles.periodButton,
        activePeriod === period && styles.activePeriodButton
      ]}
      onPress={() => setActivePeriod(period)}
    >
      <Text
        style={[
          styles.periodText,
          activePeriod === period && styles.activePeriodText
        ]}
      >
        {period}
      </Text>
    </TouchableOpacity>
  );

  const renderPerformanceContent = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Gráfico de rendimiento */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Rendimiento +30%</Text>

        <View style={[styles.chartContainer, { alignItems: 'center', justifyContent: 'center' }]}>
          <LineChart
            data={{
              labels: ['', '', '', '', '', '', ''],
              datasets: [
                {
                  data: [100, 160, 80, 140, 60, 120, 90],
                  color: () => '#ECB2CD',
                  strokeWidth: 3,
                },
              ],
            }}
            width={screenWidth - 40}
            height={120}
            chartConfig={getCleanChartConfig('#ECB2CD')}
            bezier
            withInnerLines={false}
            withOuterLines={false} 
            withVerticalLines={false}
            withHorizontalLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            withDots={true}
            style={{
              marginVertical: 0,
              paddingRight: 0,
              paddingLeft: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
            withShadow={false}
            transparent={true}
            segments={4}
            onDataPointClick={(data) => {
              // Interactividad - puedes agregar lógica aquí
              console.log('Clicked:', data);
            }}
          />
            <View style={styles.chartLabels}>
              {activePeriod === 'Semana' && (
                <>
                  <Text style={styles.dayLabel}>Lun</Text>
                  <Text style={styles.dayLabelInactive}>Mar</Text>
                  <Text style={styles.dayLabelInactive}>Mie</Text>
                  <Text style={styles.dayLabelInactive}>Jue</Text>
                  <Text style={styles.dayLabelInactive}>Vie</Text>
                  <Text style={styles.dayLabelInactive}>Sab</Text>
                  <Text style={styles.dayLabelInactive}>Dom</Text>
                </>
              )}
              {activePeriod === 'Mes' && (
                <>
                  <Text style={styles.dayLabelInactive}>Sem 1</Text>
                  <Text style={styles.dayLabel}>Sem 2</Text>
                  <Text style={styles.dayLabelInactive}>Sem 3</Text>
                  <Text style={styles.dayLabelInactive}>Sem 4</Text>
                </>
              )}
              {activePeriod === 'Año' && (
                <>
                  <Text style={styles.dayLabelInactive}>Q1</Text>
                  <Text style={styles.dayLabelInactive}>Q2</Text>
                  <Text style={styles.dayLabel}>Q3</Text>
                  <Text style={styles.dayLabelInactive}>Q4</Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.dayFilterContainer}>
          {dayFilters.map(filter => (
            <TouchableOpacity key={filter} onPress={() => setActiveDayFilter(filter)}>
              <Text style={[
                styles.dayFilterItem, 
                activeDayFilter === filter && styles.activeDayFilterItem,
                { marginHorizontal: 8 }
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {/* Ingresos y Egresos */}
      <View style={styles.doubleCardContainer}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
          style={[styles.gradientBorder, styles.halfGradientBorder]}
        >
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardTitle}>Ingresos Totales</Text>
          <Text style={styles.bigAmount}>$23.000</Text>
          <Text style={styles.subtitle}>Día</Text>
          <View style={[styles.miniChart, { alignItems: 'center', justifyContent: 'center' }]}>
            <LineChart
              data={{
                labels: ['', '', '', '', '', ''],
                datasets: [
                  {
                    data: [50, 80, 40, 70, 55, 65],
                    color: () => '#ECB2CD',
                    strokeWidth: 2,
                  },
                ],
              }}
              width={120}
              height={40}
              chartConfig={getCleanChartConfig('#ECB2CD')}
              bezier
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withDots={false}
              style={{
                marginVertical: 0,
                paddingRight: 0,
                paddingLeft: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
              withShadow={false}
              transparent={true}
              segments={4}
              onDataPointClick={(data) => {
                console.log('Mini chart clicked:', data);
              }}
            />
          </View>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
          style={[styles.gradientBorder, styles.halfGradientBorder]}
        >
          <View style={[styles.card, styles.halfCard]}>
            <Text style={styles.cardTitle}>Egresos</Text>
          <Text style={styles.bigAmount}>$2.000</Text>
          <Text style={styles.subtitle}>Día</Text>
          <View style={[styles.miniChart, { alignItems: 'center', justifyContent: 'center' }]}>
            <LineChart
              data={{
                labels: ['', '', '', '', '', ''],
                datasets: [
                  {
                    data: [60, 35, 75, 25, 50, 45],
                    color: () => '#9747FF',
                    strokeWidth: 2,
                  },
                ],
              }}
              width={120}
              height={40}
              chartConfig={getCleanChartConfig('#9747FF')}
              bezier
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withDots={false}
              style={{
                marginVertical: 0,
                paddingRight: 0,
                paddingLeft: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
              withShadow={false}
              transparent={true}
              segments={4}
              onDataPointClick={(data) => {
                console.log('Mini chart clicked:', data);
              }}
            />
          </View>
          </View>
        </LinearGradient>
      </View>

      {/* Total de ventas */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de ventas</Text>
        <Text style={styles.bigAmount}>250</Text>
        <View style={[styles.chartContainer, { alignItems: 'center', justifyContent: 'center' }]}>
          <LineChart
            data={{
              labels: ['', '', '', '', '', '', ''],
              datasets: [
                {
                  data: [80, 130, 60, 110, 85, 120, 95],
                  color: () => '#9747FF',
                  strokeWidth: 3,
                },
              ],
            }}
            width={screenWidth - 40}
            height={120}
            chartConfig={getCleanChartConfig('#9747FF')}
            bezier
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            withDots={true}
            style={{
              marginVertical: 0,
              paddingRight: 0,
              paddingLeft: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
            withShadow={false}
            transparent={true}
            segments={4}
            onDataPointClick={(data) => {
              console.log('Clicked:', data);
            }}
          />
            <View style={styles.chartLabels}>
              {activeDayFilter === 'Día' && (
                <>
                  <Text style={styles.dayLabel}>Lun</Text>
                  <Text style={styles.dayLabelInactive}>Mar</Text>
                  <Text style={styles.dayLabelInactive}>Mie</Text>
                  <Text style={styles.dayLabelInactive}>Jue</Text>
                  <Text style={styles.dayLabelInactive}>Vie</Text>
                  <Text style={styles.dayLabelInactive}>Sab</Text>
                  <Text style={styles.dayLabelInactive}>Dom</Text>
                </>
              )}
              {activeDayFilter === 'Semana' && (
                <>
                  <Text style={styles.dayLabelInactive}>Sem 1</Text>
                  <Text style={styles.dayLabel}>Sem 2</Text>
                  <Text style={styles.dayLabelInactive}>Sem 3</Text>
                  <Text style={styles.dayLabelInactive}>Sem 4</Text>
                </>
              )}
              {activeDayFilter === 'Mes' && (
                <>
                  <Text style={styles.dayLabelInactive}>Ene</Text>
                  <Text style={styles.dayLabelInactive}>Feb</Text>
                  <Text style={styles.dayLabel}>Mar</Text>
                  <Text style={styles.dayLabelInactive}>Abr</Text>
                  <Text style={styles.dayLabelInactive}>May</Text>
                  <Text style={styles.dayLabelInactive}>Jun</Text>
                </>
              )}
            </View>
          </View>
        </View>
        <View style={styles.dayFilterContainer}>
          {dayFilters.map(filter => (
            <TouchableOpacity key={filter} onPress={() => setActiveDayFilter(filter)}>
              <Text style={[
                styles.dayFilterItem, 
                activeDayFilter === filter && styles.activeDayFilterItem,
                { marginHorizontal: 8 }
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {/* Productos populares */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Productos populares</Text>
        {popularProducts.map((product) => (
          <View key={product.id} style={styles.listItem}>
            <View style={styles.productImage}>
              <Ionicons name="cube-outline" size={20} color="#A0A0A0" />
            </View>
            <View style={styles.listItemInfo}>
              <Text style={styles.productName}>{product.name} - {product.brand}</Text>
              <View style={[styles.categoryTag, { backgroundColor: product.categoryColor }]}>
                <Text style={styles.categoryText}>{product.category}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </View>
        ))}
        </View>
      </LinearGradient>

      {/* Ventas con descuento */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Ventas con descuento</Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>Ver más</Text>
          </TouchableOpacity>
        </View>
        {discountSales.map((sale) => (
          <View key={sale.id} style={styles.listItem}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={20} color="#A0A0A0" />
            </View>
            <View style={styles.listItemInfo}>
              <Text style={styles.userName}>{sale.name}</Text>
              <Text style={styles.userEmail}>{sale.email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </View>
        ))}
        </View>
      </LinearGradient>

      {/* Conversión */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de venta</Text>
        <View style={styles.conversionContainer}>
          <View style={styles.conversionItem}>
            <View style={[styles.conversionCircle, { backgroundColor: '#00B894' }]}>
              <Text style={styles.conversionPercent}>50%</Text>
            </View>
            <Text style={styles.conversionLabel}>No compró</Text>
          </View>
          <View style={styles.conversionItem}>
            <View style={[styles.conversionCircle, { backgroundColor: '#74B9FF' }]}>
              <Text style={styles.conversionPercent}>25%</Text>
            </View>
            <Text style={styles.conversionLabel}>Compró</Text>
          </View>
          <View style={styles.conversionItem}>
            <View style={[styles.conversionCircle, { backgroundColor: '#FF7675' }]}>
              <Text style={styles.conversionPercent}>25%</Text>
            </View>
            <Text style={styles.conversionLabel}>Abandonó</Text>
          </View>
        </View>
        </View>
      </LinearGradient>

      {/* Tasa de devolución */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Tasa de devolución</Text>
        <View style={styles.donutContainer}>
          <View style={styles.donutChart}>
            <Text style={styles.donutPercent}>50%</Text>
          </View>
          <View style={styles.donutLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFA726' }]} />
              <Text style={styles.legendText}>Activos</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#616161' }]} />
              <Text style={styles.legendText}>Inactivos</Text>
            </View>
          </View>
        </View>
        </View>
      </LinearGradient>

      {/* Stock crítico */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Stock crítico</Text>
        <View style={styles.periodSelector}>
          <TouchableOpacity style={styles.activePeriodButton}>
            <Text style={styles.activePeriodText}>Día</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.periodButton}>
            <Text style={styles.periodText}>Semana</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.periodButton}>
            <Text style={styles.periodText}>Mes</Text>
          </TouchableOpacity>
        </View>
        {criticalStock.map((item) => (
          <View key={item.id} style={styles.stockItem}>
            <Text style={styles.stockName}>{item.name} - {item.brand}</Text>
            <Text style={styles.stockQuantity}>Cantidad: {item.quantity}</Text>
          </View>
        ))}
        </View>
      </LinearGradient>

      {/* Tasa de venta comercial */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Tasa de venta comercial</Text>
        <View style={styles.donutContainer}>
          <View style={[styles.donutChart, { borderColor: '#B180FF' }]}>
            <Text style={styles.donutPercent}>60%</Text>
          </View>
          <View style={styles.donutLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#B180FF' }]} />
              <Text style={styles.legendText}>Activos</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#616161' }]} />
              <Text style={styles.legendText}>Inactivos</Text>
            </View>
          </View>
        </View>
        </View>
      </LinearGradient>

      {/* Ventas por canal */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
        <Text style={styles.cardTitle}>Ventas por canal</Text>
        <View style={styles.barChartContainer}>
          <View style={styles.barItem}>
            <View style={[styles.bar, { height: 70, backgroundColor: '#B180FF' }]} />
            <Text style={styles.barLabel}>Marca</Text>
            <Text style={styles.barPercent}>70%</Text>
          </View>
          <View style={styles.barItem}>
            <View style={[styles.bar, { height: 63, backgroundColor: '#FFA726' }]} />
            <Text style={styles.barLabel}>Afiliados</Text>
            <Text style={styles.barPercent}>63%</Text>
          </View>
          <View style={styles.barItem}>
            <View style={[styles.bar, { height: 30, backgroundColor: '#74B9FF' }]} />
            <Text style={styles.barLabel}>Mi Status</Text>
            <Text style={styles.barPercent}>30%</Text>
          </View>
        </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );


  const renderClientAffiliateContent = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Resumen de Clientes */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumen de Clientes</Text>
          <View style={styles.doubleCardContainer}>
            <View style={styles.halfCard}>
              <Text style={styles.cardSubtitle}>Nuevos Clientes</Text>
              <Text style={styles.bigAmount}>47</Text>
              <Text style={styles.subtitle}>Este mes</Text>
            </View>
            <View style={styles.halfCard}>
              <Text style={styles.cardSubtitle}>Clientes VIP</Text>
              <Text style={styles.bigAmount}>23</Text>
              <Text style={styles.subtitle}>Top gastadores</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Top 5 Clientes por Gasto */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Top 5 Clientes por Gasto</Text>
          {topClients.map((client) => (
            <View key={client.id} style={styles.listItem}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#A0A0A0" />
              </View>
              <View style={styles.listItemInfo}>
                <Text style={styles.userName}>{client.name}</Text>
                <Text style={styles.userEmail}>${client.totalSpent.toLocaleString()} • {client.purchases} compras</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Top 5 Afiliados por Comisiones */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Top 5 Afiliados por Comisiones</Text>
          {topAffiliates.map((affiliate) => (
            <View key={affiliate.id} style={styles.listItem}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#A0A0A0" />
              </View>
              <View style={styles.listItemInfo}>
                <Text style={styles.userName}>{affiliate.name}</Text>
                <Text style={styles.userEmail}>${affiliate.commission.toLocaleString()} • {affiliate.sales} ventas</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Actividad Reciente */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Actividad Reciente</Text>
          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <Ionicons name={activity.icon as any} size={20} color="#FFFFFF" />
              <View style={styles.activityInfo}>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>Hace {activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Progreso al Siguiente Nivel */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progreso al Siguiente Nivel: Oro</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '70%' }]} />
            </View>
            <Text style={styles.progressText}>
              Te faltan <Text style={styles.progressHighlight}>5 ventas</Text> para alcanzar el siguiente nivel y obtener un <Text style={styles.progressHighlight}>15% de comisión</Text>
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Solicitudes de Retiro */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Solicitudes de Retiro</Text>
          {withdrawalRequests.map((request) => (
            <View key={request.id} style={styles.listItem}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#A0A0A0" />
              </View>
              <View style={styles.listItemInfo}>
                <Text style={styles.userName}>{request.name}</Text>
                <Text style={styles.userEmail}>${request.amount.toLocaleString()}</Text>
              </View>
              <View style={[
                styles.statusPill,
                request.status === 'pending' && styles.statusPending,
                request.status === 'processing' && styles.statusProcessing,
                request.status === 'paid' && styles.statusPaid,
              ]}>
                <Text style={styles.statusText}>
                  {request.status === 'pending' ? 'Pendiente' : 
                   request.status === 'processing' ? 'En Proceso' : 'Pagado'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Enlaces con Mejor Rendimiento */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Enlaces con Mejor Rendimiento</Text>
          {topLinks.map((link) => (
            <View key={link.id} style={styles.listItem}>
              <View style={styles.linkIcon}>
                <Ionicons name="link-outline" size={20} color="#A0A0A0" />
              </View>
              <View style={styles.listItemInfo}>
                <Text style={styles.userName}>{link.name}</Text>
                <Text style={styles.userEmail}>{link.clicks} Clics / {link.sales} Ventas</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Clientes en Riesgo */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Clientes Inactivos (En Riesgo)</Text>
          {inactiveClients.map((client) => (
            <View key={client.id} style={styles.listItem}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#A0A0A0" />
              </View>
              <View style={styles.listItemInfo}>
                <Text style={styles.userName}>{client.name}</Text>
                <Text style={[styles.userEmail, { color: '#F1C40F' }]}>
                  {client.daysSinceLastPurchase} días sin comprar
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
            </View>
          ))}
        </View>
      </LinearGradient>
    </ScrollView>
  );

  const renderGrowthContent = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* 1. Sección Campañas */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Campañas</Text>
            <TouchableOpacity onPress={() => setShowCampaignsModal(true)}>
              <Text style={styles.seeMoreText}>Ver más</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.campaignsList}>
            {[
              { id: 1, name: 'Campaña Red Flag', brand: 'Complot', status: 'inactivo', image: 'https://via.placeholder.com/43x43/E3170A/fff?text=RF' },
              { id: 2, name: 'Summer 25', brand: 'Chloe', status: 'pendiente', image: 'https://via.placeholder.com/43x43/F2DC5D/fff?text=S25' },
              { id: 3, name: 'Otoño 2025', brand: 'Bottega Veneta', status: 'activo', image: 'https://via.placeholder.com/43x43/0FFF95/fff?text=OT' }
            ].map((campaign) => (
              <TouchableOpacity 
                key={campaign.id} 
                style={styles.campaignItem}
                onPress={() => setShowCampaignsModal(true)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: campaign.image }} style={styles.campaignImage} />
                <View style={styles.campaignInfo}>
                  <Text style={styles.campaignName}>{campaign.name}</Text>
                  <Text style={styles.campaignBrand}>{campaign.brand}</Text>
                </View>
                <View style={styles.campaignStatusContainer}>
                  <View style={[
                    styles.campaignStatusDot, 
                    { backgroundColor: 
                      campaign.status === 'activo' ? '#0FFF95' : 
                      campaign.status === 'pendiente' ? '#F2DC5D' : '#E3170A' 
                    }
                  ]} />
                </View>
                <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* 2. Sección Interacciones +200 con gráfico grande */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={[styles.gradientBorder, { height: 500 }]}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Interacciones</Text>
          <Text style={styles.bigAmount}>+200</Text>
          

          <View style={[styles.chartContainer, { alignItems: 'center', justifyContent: 'center' }]}>
            <LineChart
              data={{
                labels: ['', '', '', '', '', '', ''],
                datasets: [
                  {
                    data: [120, 180, 150, 200, 170, 220, 190],
                    color: () => '#ECB2CD',
                    strokeWidth: 3,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={120}
              chartConfig={getCleanChartConfig('#ECB2CD')}
              bezier
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withDots={true}
              style={{
                marginVertical: 0,
                paddingRight: 0,
                paddingLeft: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
              withShadow={false}
              transparent={true}
              segments={4}
              onDataPointClick={(data) => {
                console.log('Interacciones clicked:', data);
              }}
            />
            
            {/* Labels días */}
            <View style={styles.chartLabels}>
              <Text style={styles.dayLabel}>Lun</Text>
              <Text style={styles.dayLabelInactive}>Mar</Text>
              <Text style={styles.dayLabelInactive}>Mie</Text>
              <Text style={styles.dayLabelInactive}>Jue</Text>
              <Text style={styles.dayLabelInactive}>Vie</Text>
              <Text style={styles.dayLabelInactive}>Sab</Text>
              <Text style={styles.dayLabelInactive}>Dom</Text>
            </View>
          </View>

          {/* 3. Sección Publicaciones - Grid 2x2 dentro del card */}
          <View style={styles.publicationsSection}>
            <View style={styles.cardHeader}>
              <Text style={styles.publicationsSectionTitle}>Publicaciones</Text>
              <TouchableOpacity onPress={() => setShowInteractionsModal(true)}>
                <Text style={styles.seeMoreText}>Ver más</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.publicationsGrid}>
              {[1, 2, 3, 4].map((index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.publicationItem}
                  onPress={() => setShowInteractionsModal(true)}
                  activeOpacity={0.7}
                >
                  <Image 
                    source={{ uri: `https://via.placeholder.com/160x227/ECB2CD/fff?text=Post${index}` }} 
                    style={styles.publicationImage} 
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.publicationOverlay}
                  >
                    <Text style={styles.publicationInteractions}>Interacciones: 52</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* 4. Sección Seguidores +624 con gráfico dual */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Seguidores</Text>
          <Text style={styles.bigAmount}>+624</Text>
          

          <View style={[styles.chartContainer, { alignItems: 'center', justifyContent: 'center' }]}>
            <LineChart
              data={{
                labels: ['', '', '', '', '', '', ''],
                datasets: [
                  {
                    data: [100, 150, 120, 180, 160, 200, 170],
                    color: () => '#ECB2CD',
                    strokeWidth: 3,
                  },
                  {
                    data: [50, 80, 60, 90, 70, 100, 80],
                    color: () => '#9747FF',
                    strokeWidth: 2,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={120}
              chartConfig={getCleanChartConfig('#ECB2CD')}
              bezier
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withDots={true}
              style={{
                marginVertical: 0,
                paddingRight: 0,
                paddingLeft: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
              withShadow={false}
              transparent={true}
              segments={4}
              onDataPointClick={(data) => {
                console.log('Seguidores clicked:', data);
              }}
            />
            
            {/* Labels días */}
            <View style={styles.chartLabels}>
              <Text style={styles.dayLabel}>Lun</Text>
              <Text style={styles.dayLabelInactive}>Mar</Text>
              <Text style={styles.dayLabelInactive}>Mie</Text>
              <Text style={styles.dayLabelInactive}>Jue</Text>
              <Text style={styles.dayLabelInactive}>Vie</Text>
              <Text style={styles.dayLabelInactive}>Sab</Text>
              <Text style={styles.dayLabelInactive}>Dom</Text>
            </View>
          </View>
            
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#ECB2CD' }]} />
                <Text style={styles.legendText}>Seguidores</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#9747FF' }]} />
                <Text style={styles.legendText}>Dejaron de seguir</Text>
              </View>
            </View>
        </View>
      </LinearGradient>

      {/* 5. Interacciones del mes */}
      <View style={styles.monthInteractionsContainer}>
        <Text style={styles.monthInteractionsTitle}>Interacciones del mes</Text>
        <View style={styles.interactionsGrid}>
          <View style={styles.interactionCard}>
            <View style={styles.interactionIconContainer}>
              <Ionicons name="heart" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.interactionValue}>15,000</Text>
            <Text style={styles.interactionLabel}>Me Gusta</Text>
          </View>
          <View style={styles.interactionCard}>
            <View style={styles.interactionIconContainer}>
              <Ionicons name="chatbubble" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.interactionValue}>2,100</Text>
            <Text style={styles.interactionLabel}>Comentarios</Text>
          </View>
          <View style={styles.interactionCard}>
            <View style={styles.interactionIconContainer}>
              <Ionicons name="bookmark" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.interactionValue}>1,000</Text>
            <Text style={styles.interactionLabel}>Guardados</Text>
          </View>
          <View style={styles.interactionCard}>
            <View style={styles.interactionIconContainer}>
              <Ionicons name="link" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.interactionValue}>8,000</Text>
            <Text style={styles.interactionLabel}>Clics en links</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const handleCardPress = (metricId: string) => {
    // Navegación a detalles
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <LayerBackground opacity={0.3} />
      
      <Header />

      <View style={styles.content}>
        {/* Tab Bar Superior */}
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={() => (
            <View style={styles.contentContainer}>
              {activeFilter === 'Rendimiento' && renderPerformanceContent()}
              {activeFilter === 'Cliente/Afiliado' && renderClientAffiliateContent()}
              {activeFilter === 'Crecimiento' && renderGrowthContent()}
            </View>
          )}
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
          showsVerticalScrollIndicator={false}
          keyExtractor={() => 'metrics'}
          style={styles.metricsContainer}
        />
      </View>

      {/* Modal de Interacciones */}
      <InteractionsModal 
        visible={showInteractionsModal}
        onClose={() => setShowInteractionsModal(false)}
      />

      {/* Modal de Campañas */}
      <CampaignsModal 
        visible={showCampaignsModal}
        onClose={() => setShowCampaignsModal(false)}
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
    paddingTop: 110,
  },
  filtersContainer: {
    marginBottom: 8,
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
    fontSize: 14,
    color: '#A0A0A0',
  },
  activeFilterText: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  listHeader: {
    marginBottom: 10,
  },
  metricsContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  periodButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  activePeriodButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  periodText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  activePeriodText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  linearChart: {
    width: '100%',
    height: 120,
  },
  chartArea: {
    position: 'relative',
    width: '100%',
    height: 80,
    marginBottom: 16,
  },
  chartGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2.5,
    borderColor: 'rgba(160, 160, 160, 0.2)',
    borderRadius: 8,
  },
  chartLine: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    height: 40,
  },
  pinkGradientLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#FF69B4',
    borderRadius: 2,
    transform: [{ scaleY: 2 }],
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  violetGradientLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#A98FFF',
    borderRadius: 2,
    transform: [{ scaleY: 2 }],
    shadowColor: '#A98FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 4,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  dayLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  dayLabelInactive: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  periodTextSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  periodTextItem: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  activePeriodTextItem: {
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  curvedLineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  miniCurvedLineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  dayFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  dayFilterItem: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  activeDayFilterItem: {
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  wavyLineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wavePoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF69B4',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  wavePointViolet: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A98FFF',
    shadowColor: '#A98FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  waveConnection: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#FF69B4',
    borderRadius: 1,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
  },
  waveConnectionViolet: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#A98FFF',
    borderRadius: 1,
    shadowColor: '#A98FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
  },
  miniWavyLineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // New styles for Growth section components
  publicationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  publicationItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  publicationImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  publicationOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  campaignImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  monthInteractionsContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  monthInteractionsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  interactionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  interactionCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  interactionValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  interactionLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  miniWavePoint: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FF69B4',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  miniWavePointViolet: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#A98FFF',
    shadowColor: '#A98FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  miniWaveConnection: {
    position: 'absolute',
    height: 1.5,
    backgroundColor: '#FF69B4',
    borderRadius: 0.5,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 1,
  },
  miniWaveConnectionViolet: {
    position: 'absolute',
    height: 1.5,
    backgroundColor: '#A98FFF',
    borderRadius: 0.5,
    shadowColor: '#A98FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 1,
  },
  gradientBorder: {
    borderRadius: 18,
    padding: 2,
    marginBottom: 16,
  },
  halfGradientBorder: {
    flex: 1,
    marginBottom: 0,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#CCCCCC',
    marginBottom: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#555555',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A98FFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    lineHeight: 20,
  },
  progressHighlight: {
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPending: {
    backgroundColor: 'rgba(241, 196, 15, 0.2)',
  },
  statusProcessing: {
    backgroundColor: 'rgba(52, 152, 219, 0.2)',
  },
  statusPaid: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  linkIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  channelItem: {
    marginBottom: 16,
  },
  channelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  channelName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  channelMetric: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  channelBar: {
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
  },
  channelFill: {
    height: '100%',
    borderRadius: 3,
  },
  retentionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  retentionItem: {
    alignItems: 'center',
  },
  retentionPeriod: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 4,
  },
  retentionRate: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  goalItem: {
    marginBottom: 16,
  },
  goalName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  goalProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
    marginRight: 12,
  },
  goalFill: {
    height: '100%',
    backgroundColor: '#00B894',
    borderRadius: 3,
  },
  goalPercentage: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    minWidth: 30,
  },
  chartLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 8,
  },
  mockChart: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  mockChartText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  mockChartSubtext: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginTop: 4,
  },
  doubleCardContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfCard: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: '#1B1B1B',
  },
  bigAmount: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 8,
  },
  miniChart: {
    marginTop: 8,
  },
  miniChartArea: {
    position: 'relative',
    width: '100%',
    height: 40,
  },
  miniChartGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2.5,
    borderColor: 'rgba(160, 160, 160, 0.2)',
    borderRadius: 6,
  },
  miniChartLine: {
    position: 'absolute',
    top: 15,
    left: 8,
    right: 8,
    height: 10,
  },
  miniPinkGradientLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#FF69B4',
    borderRadius: 1,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
  },
  miniVioletGradientLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#A98FFF',
    borderRadius: 1,
    shadowColor: '#A98FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
  },
  weekDays: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  listItemInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  seeMoreText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#007AFF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  conversionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  conversionItem: {
    alignItems: 'center',
  },
  conversionCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  conversionPercent: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  conversionLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    textAlign: 'center',
  },
  donutContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  donutChart: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 15,
    borderColor: '#FFA726',
    backgroundColor: '#616161',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  donutPercent: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  donutLegend: {
    flexDirection: 'row',
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  stockItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  stockName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  stockQuantity: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    marginTop: 16,
  },
  barItem: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 40,
    backgroundColor: '#B180FF',
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 2,
  },
  barPercent: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  // Photo Grid Styles
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  photoItem: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333333',
  },
  interactionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  interactionStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  interactionNumber: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  // Time Slot Styles
  timeSlotContainer: {
    marginTop: 16,
  },
  timeSlotItem: {
    marginBottom: 16,
  },
  timeSlotHour: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  timeSlotMetric: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 8,
  },
  timeSlotBar: {
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
  },
  timeSlotFill: {
    height: '100%',
    borderRadius: 3,
  },
  // Hashtag Styles
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  hashtagItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  hashtagText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  hashtagMetric: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  // Content Type Styles
  contentTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  contentTypeItem: {
    alignItems: 'center',
    flex: 1,
  },
  contentTypeLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  contentTypeMetric: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#A0A0A0',
    marginBottom: 2,
  },
  contentTypeCount: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  // Top Post Styles
  topPostItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  topPostImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#333333',
    marginRight: 12,
  },
  topPostInfo: {
    flex: 1,
  },
  topPostTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  topPostMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  topPostMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  topPostNumber: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  // Projection Styles
  projectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  projectionItem: {
    alignItems: 'center',
    flex: 1,
  },
  projectionTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 8,
  },
  projectionValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  projectionSubtitle: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  // Campaign List Styles
  campaignsList: {
    marginTop: 16,
  },
  campaignItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  campaignInfo: {
    flex: 1,
  },
  campaignName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  campaignBrand: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 6,
  },
  campaignStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  campaignStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  campaignStatusText: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  campaignRevenue: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  revenueAmount: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#00B894',
    marginBottom: 2,
  },
  revenueLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  
  // Estilos nuevos para sección Crecimiento
  campaignsList: {
    gap: 16,
  },
  campaignItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  campaignImage: {
    width: 43,
    height: 43,
    borderRadius: 8,
  },
  campaignInfo: {
    flex: 1,
    gap: 2,
  },
  campaignName: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    lineHeight: 15,
  },
  campaignBrand: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#939597',
    lineHeight: 15,
  },
  campaignStatusContainer: {
    alignItems: 'center',
    marginRight: 8,
  },
  campaignStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  // Sección Publicaciones
  publicationsSection: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#404040',
    paddingTop: 20,
  },
  publicationsSectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: 21,
  },
  publicationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 5,
  },
  publicationItem: {
    width: 160,
    height: 227,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  publicationImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  publicationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  publicationInteractions: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  
  // Iconos con contenedor circular mejorado
  interactionIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 29.6,
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});

export default MetricsDashboardScreen;