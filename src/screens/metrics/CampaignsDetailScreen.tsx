import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Campaign } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';

const CampaignsDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTimeFilter, setActiveTimeFilter] = useState('Mes');

  const timeFilters = ['Semana', 'Mes', 'Año'];

  // Mock data
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Campaña Red Flag',
      brand: 'Complot',
      status: 'inactive',
      image: 'https://via.placeholder.com/60/FF6B6B',
      revenue: 1500,
      interactions: 320,
    },
    {
      id: '2',
      name: 'Verano 2025',
      brand: 'Nike',
      status: 'active',
      image: 'https://via.placeholder.com/60/4ECDC4',
      revenue: 2800,
      interactions: 580,
    },
    {
      id: '3',
      name: 'Black Friday',
      brand: 'Adidas',
      status: 'pending',
      image: 'https://via.placeholder.com/60/FFD93D',
      revenue: 0,
      interactions: 0,
    },
    {
      id: '4',
      name: 'Promoción Invierno',
      brand: 'Puma',
      status: 'active',
      image: 'https://via.placeholder.com/60/6BCF7F',
      revenue: 1200,
      interactions: 240,
    },
    {
      id: '5',
      name: 'Liquidación Stock',
      brand: 'Reebok',
      status: 'inactive',
      image: 'https://via.placeholder.com/60/4D4D4D',
      revenue: 800,
      interactions: 150,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#00FF00'; // Verde
      case 'inactive':
        return '#FF4444'; // Rojo
      case 'pending':
        return '#FFD700'; // Amarillo
      default:
        return '#A0A0A0'; // Gris
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  const renderTimeFilterButton = (filter: string) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.timeFilterButton,
        activeTimeFilter === filter && styles.activeTimeFilterButton
      ]}
      onPress={() => setActiveTimeFilter(filter)}
    >
      <Text
        style={[
          styles.timeFilterText,
          activeTimeFilter === filter && styles.activeTimeFilterText
        ]}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );

  const renderCampaignItem = ({ item }: { item: Campaign }) => (
    <TouchableOpacity style={styles.campaignItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.campaignImage}
      />
      <View style={styles.campaignInfo}>
        <Text style={styles.campaignName}>{item.name}</Text>
        <Text style={styles.campaignBrand}>{item.brand}</Text>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(item.status) }
            ]}
          />
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      <View style={styles.campaignStats}>
        <Text style={styles.statValue}>${item.revenue}</Text>
        <Text style={styles.statLabel}>Ingresos</Text>
        <Text style={styles.statValue}>{item.interactions}</Text>
        <Text style={styles.statLabel}>Interacciones</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      {/* Header */}
      <Header />

      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>Campañas</Text>

        {/* Filtros de tiempo */}
        <View style={styles.timeFiltersContainer}>
          {timeFilters.map(renderTimeFilterButton)}
        </View>

        {/* Lista de campañas */}
        <FlatList
          data={campaigns}
          renderItem={renderCampaignItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
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
    paddingTop: 70,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 25,
  },
  timeFiltersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
    gap: 15,
  },
  timeFilterButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTimeFilterButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  timeFilterText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  activeTimeFilterText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
  },
  list: {
    flex: 1,
  },
  campaignItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  campaignImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  campaignInfo: {
    flex: 1,
  },
  campaignName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  campaignBrand: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 8,
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
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  campaignStats: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 4,
  },
});

export default CampaignsDetailScreen;