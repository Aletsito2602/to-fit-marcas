import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

const { width } = Dimensions.get('window');

const ReportsScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Este mes');

  const periods = ['Esta semana', 'Este mes', 'Últimos 3 meses', 'Este año'];

  const reports = [
    {
      id: '1',
      title: 'Ventas por producto',
      description: 'Productos más vendidos y sus ingresos',
      icon: 'bar-chart-outline',
      color: '#4ADE80',
    },
    {
      id: '2',
      title: 'Clientes frecuentes',
      description: 'Análisis de comportamiento de clientes',
      icon: 'people-outline',
      color: '#06B6D4',
    },
    {
      id: '3',
      title: 'Inventario y stock',
      description: 'Estado actual del inventario',
      icon: 'cube-outline',
      color: '#8B5CF6',
    },
    {
      id: '4',
      title: 'Ingresos y gastos',
      description: 'Resumen financiero detallado',
      icon: 'cash-outline',
      color: '#F59E0B',
    },
  ];

  // Datos dinámicos basados en el período seleccionado
  const getStatsForPeriod = (period: string) => {
    const baseStats = {
      'Esta semana': {
        ventas: '$3.250.000',
        ventasChange: '+8%',
        pedidos: '42',
        pedidosChange: '+12%',
        productos: '89',
        productosChange: '-2%',
        clientes: '7',
        clientesChange: '+16%',
      },
      'Este mes': {
        ventas: '$12.450.000',
        ventasChange: '+15%',
        pedidos: '156',
        pedidosChange: '+8%',
        productos: '342',
        productosChange: '-3%',
        clientes: '28',
        clientesChange: '+22%',
      },
      'Últimos 3 meses': {
        ventas: '$35.780.000',
        ventasChange: '+24%',
        pedidos: '478',
        pedidosChange: '+18%',
        productos: '1.240',
        productosChange: '+12%',
        clientes: '89',
        clientesChange: '+31%',
      },
      'Este año': {
        ventas: '$128.900.000',
        ventasChange: '+28%',
        pedidos: '1.654',
        pedidosChange: '+22%',
        productos: '4.890',
        productosChange: '+19%',
        clientes: '312',
        clientesChange: '+35%',
      },
    };

    const stats = baseStats[period as keyof typeof baseStats] || baseStats['Este mes'];
    
    return [
      { 
        label: 'Ventas totales', 
        value: stats.ventas, 
        change: stats.ventasChange, 
        positive: stats.ventasChange.includes('+') 
      },
      { 
        label: 'Pedidos', 
        value: stats.pedidos, 
        change: stats.pedidosChange, 
        positive: stats.pedidosChange.includes('+') 
      },
      { 
        label: 'Productos vendidos', 
        value: stats.productos, 
        change: stats.productosChange, 
        positive: stats.productosChange.includes('+') 
      },
      { 
        label: 'Clientes nuevos', 
        value: stats.clientes, 
        change: stats.clientesChange, 
        positive: stats.clientesChange.includes('+') 
      },
    ];
  };

  const quickStats = getStatsForPeriod(selectedPeriod);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    // Opcional: Mostrar feedback visual
    // Alert.alert('Período actualizado', `Mostrando datos para ${period.toLowerCase()}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Reportes</Text>
          <Text style={styles.subtitle}>Análisis detallado de tu negocio</Text>
        </View>

        {/* Period Selector */}
        <View style={styles.periodContainer}>
          <View style={styles.periodHeader}>
            <Text style={styles.sectionTitle}>Período</Text>
            <View style={styles.selectedPeriodBadge}>
              <Ionicons name="calendar-outline" size={14} color="#007AFF" />
              <Text style={styles.selectedPeriodText}>{selectedPeriod}</Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.periodScroll}
            contentContainerStyle={styles.periodContent}
          >
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.activePeriodButton
                ]}
                onPress={() => handlePeriodChange(period)}
              >
                <Text
                  style={[
                    styles.periodText,
                    selectedPeriod === period && styles.activePeriodText
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsHeader}>
            <Text style={styles.sectionTitle}>Resumen rápido</Text>
            <Text style={styles.statsSubtitle}>Datos para {selectedPeriod.toLowerCase()}</Text>
          </View>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => (
              <View key={`${selectedPeriod}-${index}`} style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <View style={styles.refreshIndicator}>
                    <Ionicons name="refresh-circle" size={12} color="#007AFF" />
                  </View>
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <View style={styles.statChange}>
                  <Ionicons 
                    name={stat.positive ? 'trending-up' : 'trending-down'} 
                    size={14} 
                    color={stat.positive ? '#4ADE80' : '#EF4444'} 
                  />
                  <Text style={[
                    styles.changeText,
                    { color: stat.positive ? '#4ADE80' : '#EF4444' }
                  ]}>
                    {stat.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Available Reports */}
        <View style={styles.reportsContainer}>
          <Text style={styles.sectionTitle}>Reportes disponibles</Text>
          
          {reports.map((report) => (
            <TouchableOpacity key={report.id} style={styles.reportCard}>
              <View style={[styles.reportIcon, { backgroundColor: report.color }]}>
                <Ionicons name={report.icon as any} size={24} color="#FFFFFF" />
              </View>
              
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDescription}>{report.description}</Text>
              </View>
              
              <View style={styles.reportActions}>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>Ver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadButton}>
                  <Ionicons name="download-outline" size={16} color="#A0A0A0" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Export Options */}
        <View style={styles.exportContainer}>
          <Text style={styles.sectionTitle}>Exportar datos</Text>
          
          <TouchableOpacity style={styles.exportButton}>
            <Ionicons name="document-text-outline" size={20} color="#FFFFFF" />
            <Text style={styles.exportText}>Exportar como PDF</Text>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.exportButton}>
            <Ionicons name="grid-outline" size={20} color="#FFFFFF" />
            <Text style={styles.exportText}>Exportar como Excel</Text>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.exportButton}>
            <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
            <Text style={styles.exportText}>Enviar por email</Text>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <BottomTabBar />
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
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  periodContainer: {
    marginBottom: 30,
  },
  periodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedPeriodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  selectedPeriodText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#007AFF',
  },
  periodScroll: {
    marginBottom: 5,
  },
  periodContent: {
    gap: 10,
  },
  periodButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activePeriodButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  periodText: {
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    fontSize: 14,
  },
  activePeriodText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  statsContainer: {
    marginBottom: 30,
  },
  statsHeader: {
    marginBottom: 15,
  },
  statsSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    width: (width - 50) / 2,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    flex: 1,
  },
  refreshIndicator: {
    opacity: 0.6,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginLeft: 4,
  },
  reportsContainer: {
    marginBottom: 30,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  reportActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  downloadButton: {
    padding: 6,
  },
  exportContainer: {
    marginBottom: 30,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  exportText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 15,
  },
});

export default ReportsScreen;