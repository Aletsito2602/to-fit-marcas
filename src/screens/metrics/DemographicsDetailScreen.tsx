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
import { useNavigation } from '@react-navigation/native';
import { DemographicData, ProvinceData, CityData } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';

const DemographicsDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeLevel, setActiveLevel] = useState<'province' | 'city'>('province');
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);

  const levels = [
    { key: 'province', label: 'Provincia' },
    { key: 'city', label: 'Ciudad' },
  ];

  // Mock data
  const demographicData: DemographicData = {
    country: 'Argentina',
    flag: '🇦🇷',
    totalUsers: 1000,
    provinces: [
      {
        name: 'Buenos Aires',
        users: 450,
        cities: [
          { name: 'CABA', users: 200 },
          { name: 'La Plata', users: 80 },
          { name: 'Mar del Plata', users: 98 },
          { name: 'Tandil', users: 45 },
          { name: 'Bahía Blanca', users: 27 },
        ],
      },
      {
        name: 'Córdoba',
        users: 220,
        cities: [
          { name: 'Córdoba Capital', users: 150 },
          { name: 'Villa Carlos Paz', users: 35 },
          { name: 'Río Cuarto', users: 35 },
        ],
      },
      {
        name: 'Santa Fe',
        users: 150,
        cities: [
          { name: 'Rosario', users: 90 },
          { name: 'Santa Fe Capital', users: 60 },
        ],
      },
      {
        name: 'Mendoza',
        users: 90,
        cities: [
          { name: 'Mendoza Capital', users: 70 },
          { name: 'San Rafael', users: 20 },
        ],
      },
      {
        name: 'Tucumán',
        users: 90,
        cities: [
          { name: 'San Miguel de Tucumán', users: 75 },
          { name: 'Yerba Buena', users: 15 },
        ],
      },
    ],
  };

  const renderLevelButton = (level: { key: string; label: string }) => (
    <TouchableOpacity
      key={level.key}
      style={[
        styles.levelButton,
        activeLevel === level.key && styles.activeLevelButton
      ]}
      onPress={() => {
        setActiveLevel(level.key as 'province' | 'city');
        if (level.key === 'province') {
          setSelectedProvince(null);
        }
      }}
    >
      <Text
        style={[
          styles.levelText,
          activeLevel === level.key && styles.activeLevelText
        ]}
      >
        {level.label}
      </Text>
    </TouchableOpacity>
  );

  const renderProvinceItem = ({ item }: { item: ProvinceData }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        setSelectedProvince(item);
        setActiveLevel('city');
      }}
    >
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCount}>{item.users}</Text>
    </TouchableOpacity>
  );

  const renderCityItem = ({ item }: { item: CityData }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemCount}>{item.users}</Text>
    </View>
  );

  const currentData = activeLevel === 'province' 
    ? demographicData.provinces 
    : selectedProvince?.cities || [];

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      {/* Header */}
      <Header />

      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>Demografía</Text>

        {/* Tarjeta principal */}
        <View style={styles.mainCard}>
          <View style={styles.countrySection}>
            <Text style={styles.flag}>{demographicData.flag}</Text>
            <Text style={styles.countryName}>{demographicData.country}</Text>
          </View>
          
          <View style={styles.usersSection}>
            <Text style={styles.usersLabel}>Usuarios</Text>
            <Text style={styles.usersCount}>{demographicData.totalUsers}</Text>
          </View>
        </View>

        {/* Filtros de nivel */}
        <View style={styles.levelFiltersContainer}>
          {levels.map(renderLevelButton)}
        </View>

        {/* Breadcrumb para ciudades */}
        {activeLevel === 'city' && selectedProvince && (
          <TouchableOpacity
            style={styles.breadcrumb}
            onPress={() => {
              setActiveLevel('province');
              setSelectedProvince(null);
            }}
          >
            <Text style={styles.breadcrumbText}>
              ← {selectedProvince.name}
            </Text>
          </TouchableOpacity>
        )}

        {/* Lista de datos */}
        <FlatList
          data={currentData}
          renderItem={activeLevel === 'province' ? renderProvinceItem : renderCityItem}
          keyExtractor={(item) => item.name}
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
    paddingTop: 110,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 25,
  },
  mainCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
  },
  countrySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  flag: {
    fontSize: 30,
    marginRight: 15,
  },
  countryName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  usersSection: {
    alignItems: 'center',
  },
  usersLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 8,
  },
  usersCount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  levelFiltersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
    gap: 15,
  },
  levelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  activeLevelButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  levelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  activeLevelText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
  },
  breadcrumb: {
    marginBottom: 15,
  },
  breadcrumbText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#4ECDC4',
  },
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  itemCount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default DemographicsDetailScreen;