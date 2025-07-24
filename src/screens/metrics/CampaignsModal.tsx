import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../navigation/DrawerNavigator';
import TabIcon from '../../components/TabIcon';
import BackgroundPattern from '../../components/BackgroundPattern';

interface Campaign {
  id: number;
  name: string;
  brand: string;
  status: 'active' | 'inactive' | 'pending';
  image: string;
  commission: string;
  description: string;
  startDate: string;
  endDate: string;
  affiliates: number;
  revenue: number;
  clicks: number;
}

interface CampaignsModalProps {
  visible: boolean;
  onClose: () => void;
}

type CampaignsModalNavigationProp = DrawerNavigationProp<DrawerParamList>;

// TAB 1: CAMPAÑAS (Lista de campañas)
const CampañasTab = ({ activeFilter }: { activeFilter: string }) => {
  const campaigns: Campaign[] = [
    {
      id: 1,
      name: 'Campaña Red Flag',
      brand: 'Complot',
      status: 'active',
      image: 'https://via.placeholder.com/80x80/FF6B6B/fff?text=RF',
      commission: '$18 USD / 10%',
      description: 'Aumentar el reconocimiento de Complot y conectar emocionalmente con un público joven',
      startDate: '15 Ene 2025',
      endDate: '15 Feb 2025',
      affiliates: 23,
      revenue: 15000,
      clicks: 2340
    },
    {
      id: 2,
      name: 'Verano 2025',
      brand: 'Nike',
      status: 'active',
      image: 'https://via.placeholder.com/80x80/4ECDC4/fff?text=V25',
      commission: '$25 USD / 12%',
      description: 'Promoción de la nueva colección de verano Nike con influencers',
      startDate: '01 Dic 2024',
      endDate: '31 Mar 2025',
      affiliates: 45,
      revenue: 28000,
      clicks: 4560
    },
    {
      id: 3,
      name: 'Black Friday Special',
      brand: 'Adidas',
      status: 'inactive',
      image: 'https://via.placeholder.com/80x80/2C3E50/fff?text=BF',
      commission: '$30 USD / 15%',
      description: 'Campaña especial para Black Friday con descuentos exclusivos',
      startDate: '25 Nov 2024',
      endDate: '02 Dic 2024',
      affiliates: 67,
      revenue: 45000,
      clicks: 8900
    },
    {
      id: 4,
      name: 'Promoción Invierno',
      brand: 'Puma',
      status: 'pending',
      image: 'https://via.placeholder.com/80x80/9B59B6/fff?text=PI',
      commission: '$20 USD / 8%',
      description: 'Lanzamiento de la colección de invierno con colaboradores',
      startDate: '01 Jun 2025',
      endDate: '31 Ago 2025',
      affiliates: 12,
      revenue: 0,
      clicks: 0
    },
    {
      id: 5,
      name: 'Liquidación Stock',
      brand: 'Reebok',
      status: 'inactive',
      image: 'https://via.placeholder.com/80x80/E67E22/fff?text=LS',
      commission: '$15 USD / 6%',
      description: 'Liquidación de productos de temporadas anteriores',
      startDate: '10 Oct 2024',
      endDate: '30 Nov 2024',
      affiliates: 34,
      revenue: 12000,
      clicks: 1890
    },
    {
      id: 6,
      name: 'Spring Collection',
      brand: 'Zara',
      status: 'pending',
      image: 'https://via.placeholder.com/80x80/27AE60/fff?text=SC',
      commission: '$22 USD / 11%',
      description: 'Nueva colección primaveral con estilos frescos y modernos',
      startDate: '01 Sep 2025',
      endDate: '30 Nov 2025',
      affiliates: 8,
      revenue: 0,
      clicks: 0
    }
  ];

  const getFilteredCampaigns = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    switch (activeFilter) {
      case 'Semana':
        // Filtrar por última semana (simplificado)
        return campaigns.slice(0, 2);
      case 'Mes':
        // Filtrar por mes actual
        return campaigns.slice(0, 4);
      case 'Año':
        // Mostrar todas las campañas del año
        return campaigns;
      default:
        return campaigns;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#00B894'; // Verde
      case 'inactive':
        return '#FF7675'; // Rojo
      case 'pending':
        return '#FDCB6E'; // Amarillo
      default:
        return '#A0A0A0'; // Gris
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'inactive':
        return 'Inactiva';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Desconocida';
    }
  };

  const renderCampaignCard = ({ item }: { item: Campaign }) => (
    <TouchableOpacity style={styles.campaignCard}>
      <Image source={{ uri: item.image }} style={styles.campaignImage} />
      <View style={styles.campaignContent}>
        <View style={styles.campaignHeader}>
          <Text style={styles.campaignName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>
        
        <Text style={styles.campaignBrand}>{item.brand}</Text>
        <Text style={styles.campaignDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.campaignDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Comisión:</Text>
            <Text style={styles.detailValue}>{item.commission}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Afiliados:</Text>
            <Text style={styles.detailValue}>{item.affiliates}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Período:</Text>
            <Text style={styles.detailValue}>{item.startDate} - {item.endDate}</Text>
          </View>
        </View>

        {item.status !== 'pending' && (
          <View style={styles.campaignMetrics}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>${item.revenue.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Revenue</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{item.clicks.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>Clicks</Text>
            </View>
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="#A0A0A0" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.tabContent}>
      <FlatList
        data={getFilteredCampaigns()}
        renderItem={renderCampaignCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

// TAB 2: ESTADÍSTICAS
const EstadisticasTab = () => {
  const stats = {
    totalCampaigns: 6,
    activeCampaigns: 2,
    totalRevenue: 100000,
    totalAffiliates: 189,
    avgCommission: 12.5,
    topPerformer: 'Black Friday Special',
    conversionRate: 3.4,
  };

  return (
    <ScrollView style={styles.tabContent}>
      {/* Resumen general */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Resumen de Campañas</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalCampaigns}</Text>
            <Text style={styles.statLabel}>Total Campañas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.activeCampaigns}</Text>
            <Text style={styles.statLabel}>Activas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>${stats.totalRevenue.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Revenue Total</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalAffiliates}</Text>
            <Text style={styles.statLabel}>Afiliados</Text>
          </View>
        </View>
      </View>

      {/* Métricas detalladas */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Métricas Clave</Text>
        <View style={styles.metricDetailCard}>
          <View style={styles.metricDetailItem}>
            <Text style={styles.metricDetailLabel}>Comisión Promedio</Text>
            <Text style={styles.metricDetailValue}>{stats.avgCommission}%</Text>
          </View>
          <View style={styles.metricDetailItem}>
            <Text style={styles.metricDetailLabel}>Tasa de Conversión</Text>
            <Text style={styles.metricDetailValue}>{stats.conversionRate}%</Text>
          </View>
          <View style={styles.metricDetailItem}>
            <Text style={styles.metricDetailLabel}>Mejor Campaña</Text>
            <Text style={styles.metricDetailValue}>{stats.topPerformer}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// TAB 3: INSIGHTS
const InsightsTab = () => {
  const insights = [
    {
      title: 'Mejor Rendimiento',
      description: 'Las campañas de Black Friday generan 2.5x más revenue',
      icon: 'trending-up-outline',
      color: '#00B894'
    },
    {
      title: 'Época Óptima',
      description: 'Noviembre-Diciembre son los mejores meses para campañas',
      icon: 'calendar-outline',
      color: '#FF69B4'
    },
    {
      title: 'Duración Ideal',
      description: 'Campañas de 30-45 días tienen mejor engagement',
      icon: 'time-outline',
      color: '#A98FFF'
    },
    {
      title: 'Afiliados Top',
      description: 'El 20% de afiliados genera el 80% del revenue',
      icon: 'people-outline',
      color: '#FFA726'
    }
  ];

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.insightsContainer}>
        {insights.map((insight, index) => (
          <View key={index} style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Ionicons name={insight.icon as any} size={24} color={insight.color} />
              <Text style={styles.insightTitle}>{insight.title}</Text>
            </View>
            <Text style={styles.insightDescription}>{insight.description}</Text>
          </View>
        ))}
      </View>

      {/* Recomendaciones */}
      <View style={styles.recommendationsSection}>
        <Text style={styles.sectionTitle}>Recomendaciones</Text>
        <View style={styles.recommendationCard}>
          <Ionicons name="bulb-outline" size={18} color="#FFD700" />
          <Text style={styles.recommendationText}>
            Considera crear más campañas estacionales para maximizar el revenue
          </Text>
        </View>
        <View style={styles.recommendationCard}>
          <Ionicons name="people-outline" size={18} color="#A98FFF" />
          <Text style={styles.recommendationText}>
            Identifica y recompensa a tus afiliados más productivos
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// MODAL BOTTOM TAB BAR COMPONENT
const ModalBottomTabBar: React.FC<{onClose: () => void}> = ({onClose}) => {
  const navigation = useNavigation<CampaignsModalNavigationProp>();

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home' as const, route: 'MainTabs', screen: 'Home' },
    { key: 'orders', label: 'Pedidos', icon: 'orders' as const, route: 'MainTabs', screen: 'Orders' },
    { key: 'camera', label: 'Cámara', icon: 'camera' as const, route: 'MainTabs', screen: 'Camera' },
    { key: 'products', label: 'Productos', icon: 'products' as const, route: 'MainTabs', screen: 'Products' },
    { key: 'metrics', label: 'Métricas', icon: 'metrics' as const, route: 'Metrics' },
  ];

  const handleTabPress = (route: string, screen?: string) => {
    onClose(); // Cerrar modal primero
    if (screen) {
      navigation.navigate(route as any, { screen });
    } else {
      navigation.navigate(route as any);
    }
  };

  return (
    <View style={styles.bottomTabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.bottomTabButton}
          onPress={() => handleTabPress(tab.route, tab.screen)}
          activeOpacity={0.7}
        >
          <View style={styles.bottomTabIconContainer}>
            <TabIcon name={tab.icon} focused={false} size={20} />
          </View>
          <Text style={styles.bottomTabLabel}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// COMPONENTE PRINCIPAL
const CampaignsModal: React.FC<CampaignsModalProps> = ({
  visible,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('Campañas');
  const [activeFilter, setActiveFilter] = useState('Mes');
  
  const tabs = [
    { name: 'Campañas', component: CampañasTab },
    { name: 'Estadísticas', component: EstadisticasTab },
    { name: 'Insights', component: InsightsTab },
  ];

  const filters = ['Semana', 'Mes', 'Año'];

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

  const renderTabButton = (tab: any) => (
    <TouchableOpacity
      key={tab.name}
      style={[
        styles.tabButton,
        activeTab === tab.name && styles.activeTabButton
      ]}
      onPress={() => setActiveTab(tab.name)}
    >
      <Text
        style={[
          styles.tabButtonText,
          activeTab === tab.name && styles.activeTabButtonText
        ]}
      >
        {tab.name}
      </Text>
    </TouchableOpacity>
  );

  const getCurrentTabComponent = () => {
    const currentTab = tabs.find(tab => tab.name === activeTab);
    if (!currentTab) return <CampañasTab activeFilter={activeFilter} />;
    
    const TabComponent = currentTab.component;
    if (currentTab.name === 'Campañas') {
      return <TabComponent activeFilter={activeFilter} />;
    }
    return <TabComponent />;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
    >
      <SafeAreaView style={styles.modalContainer}>
        <BackgroundPattern opacity={0.06} />
        
        {/* Header consistente con la app */}
        <View style={styles.modalHeader}>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.centerContainer}>
            <Text style={styles.modalTitle}>Campañas</Text>
          </View>
          
          <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filtros de período (solo para el tab Campañas) */}
        {activeTab === 'Campañas' && (
          <View style={styles.filtersContainer}>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersContent}
            >
              {filters.map(renderFilterButton)}
            </ScrollView>
          </View>
        )}

        {/* Hero section con stats generales */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Gestión de Campañas</Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>6</Text>
              <Text style={styles.heroStatLabel}>Campañas</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>2</Text>
              <Text style={styles.heroStatLabel}>Activas</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>$100k</Text>
              <Text style={styles.heroStatLabel}>Revenue</Text>
            </View>
          </View>
        </View>

        {/* Custom Tab Bar */}
        <View style={styles.tabContainer}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContent}
            style={styles.tabScrollView}
          >
            {tabs.map(renderTabButton)}
          </ScrollView>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContentContainer}>
          {getCurrentTabComponent()}
        </View>

        {/* Bottom Navigation */}
        <ModalBottomTabBar onClose={onClose} />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Modal container
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
  },

  // Modal Header
  modalHeader: {
    height: 60,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  backButton: {
    padding: 4,
  },

  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  menuButton: {
    padding: 4,
  },

  // Filtros de período
  filtersContainer: {
    paddingVertical: 16,
    backgroundColor: '#2A2A2A',
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
    paddingHorizontal: 16,
  },

  activeFilterButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },

  filterText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },

  activeFilterText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },

  // Hero section
  heroSection: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  heroStatItem: {
    alignItems: 'center',
  },

  heroStatNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },

  heroStatLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },

  // Custom Tab Bar
  tabContainer: {
    backgroundColor: 'rgba(41, 41, 41, 1)',
    borderBottomColor: '#333333',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },

  tabScrollView: {
    paddingHorizontal: 16,
  },

  tabScrollContent: {
    paddingRight: 16,
    gap: 8,
  },

  tabButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTabButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },

  tabButtonText: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '500',
  },

  activeTabButtonText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },

  tabContentContainer: {
    flex: 1,
  },

  // Tab content
  tabContent: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
    padding: 16,
  },

  // Campaigns tab
  campaignCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  campaignImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#333333',
    marginRight: 16,
  },

  campaignContent: {
    flex: 1,
  },

  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  campaignName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },

  campaignBrand: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 8,
  },

  campaignDescription: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#CCCCCC',
    lineHeight: 16,
    marginBottom: 12,
  },

  campaignDetails: {
    marginBottom: 12,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  detailLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },

  detailValue: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },

  campaignMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 12,
  },

  metricItem: {
    alignItems: 'center',
  },

  metricValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },

  metricLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },

  // Estadísticas tab
  statsSection: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statCard: {
    width: '48%',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },

  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },

  statLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },

  metricDetailCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
  },

  metricDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  metricDetailLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },

  metricDetailValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },

  // Insights tab
  insightsContainer: {
    marginBottom: 24,
  },

  insightCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },

  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  insightTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    marginLeft: 12,
  },

  insightDescription: {
    color: '#A0A0A0',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
  },

  recommendationsSection: {
    marginBottom: 24,
  },

  recommendationCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  recommendationText: {
    flex: 1,
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginLeft: 12,
    lineHeight: 18,
  },

  // Modal Bottom Tab Bar
  bottomTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderTopWidth: 0,
    height: 80,
    paddingBottom: 12,
    paddingTop: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  
  bottomTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  bottomTabIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 50,
    marginTop: -2,
  },
  
  bottomTabLabel: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    marginTop: 2,
    color: 'rgba(157, 157, 157, 1)',
  },
});

export default CampaignsModal;