import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { ChartData } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';

const { width } = Dimensions.get('window');

const StatusDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTimeFilter, setActiveTimeFilter] = useState('Semana');

  const timeFilters = ['Día', 'Semana', 'Mes'];

  // Mock data
  const statusData = {
    name: 'Gina Valverde',
    label: 'Genera',
    value: 302.00,
    avatar: 'https://via.placeholder.com/80',
  };

  const chartData: ChartData = {
    labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
    datasets: [{
      data: [120, 180, 250, 302, 280, 220, 300],
      color: (opacity = 1) => `rgba(255, 105, 180, ${opacity})`,
      strokeWidth: 3,
    }],
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

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título */}
        <Text style={styles.title}>Status</Text>

        {/* Tarjeta principal */}
        <View style={styles.mainCard}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: statusData.avatar }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{statusData.name}</Text>
              <Text style={styles.label}>{statusData.label}</Text>
            </View>
          </View>
          
          <Text style={styles.value}>${statusData.value.toFixed(2)}</Text>
        </View>

        {/* Filtros de tiempo */}
        <View style={styles.timeFiltersContainer}>
          {timeFilters.map(renderTimeFilterButton)}
        </View>

        {/* Gráfico */}
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: chartData.labels,
              datasets: chartData.datasets,
            }}
            width={width - 50}
            height={250}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: 'transparent',
              backgroundGradientTo: 'transparent',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 105, 180, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(160, 160, 160, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#FF69B4',
                fill: '#FF69B4',
              },
              propsForLabels: {
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
              },
            }}
            bezier
            style={styles.chart}
            withDots={true}
            withShadow={false}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={false}
            withHorizontalLines={true}
          />
        </View>
      </ScrollView>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  value: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
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
  chartContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default StatusDetailScreen;