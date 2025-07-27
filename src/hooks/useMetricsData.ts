import { useState, useEffect } from 'react';

interface MetricData {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

interface MetricsDataHook {
  quickStats: MetricData[];
  performanceMetrics: MetricData[];
  conversionMetrics: MetricData[];
  customerMetrics: MetricData[];
  growthMetrics: MetricData[];
  socialMetrics: MetricData[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

// Simulación de datos dinámicos basados en fecha
const generateRealisticData = () => {
  const today = new Date();
  const dayOfMonth = today.getDate();
  const month = today.getMonth() + 1;
  
  // Base valores que cambian ligeramente cada día
  const baseRevenue = 12500 + (dayOfMonth * 150) + (month * 200);
  const baseOrders = 156 + dayOfMonth * 3;
  const baseConversion = 8.2 + (dayOfMonth * 0.1);
  const baseCustomers = 47 + dayOfMonth;
  
  return {
    revenue: Math.round(baseRevenue),
    orders: baseOrders,
    conversion: Number(baseConversion.toFixed(1)),
    customers: baseCustomers,
    engagement: Number((8.2 + dayOfMonth * 0.05).toFixed(1)),
    followers: 624 + dayOfMonth * 12,
    reach: Number((15.2 + dayOfMonth * 0.3).toFixed(1)),
    interactions: 200 + dayOfMonth * 8,
  };
};

const useMetricsData = (): MetricsDataHook => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(generateRealisticData());

  // Simular carga de datos
  const loadData = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setData(generateRealisticData());
        resolve();
      }, 1500); // 1.5 segundos de carga
    });
  };

  const refreshData = async (): Promise<void> => {
    setLoading(true);
    await loadData();
    setLoading(false);
  };

  useEffect(() => {
    const initData = async () => {
      await loadData();
      setLoading(false);
    };
    initData();
  }, []);

  // Quick Stats
  const quickStats: MetricData[] = [
    {
      id: '1',
      title: 'Ingresos',
      value: loading ? '...' : `$${(data.revenue / 1000).toFixed(1)}K`,
      change: '+30%',
      changeType: 'positive',
      icon: 'trending-up',
    },
    {
      id: '2',
      title: 'Pedidos',
      value: loading ? '...' : data.orders.toString(),
      change: '+12%',
      changeType: 'positive',
      icon: 'bag-outline',
    },
    {
      id: '3',
      title: 'Conversión',
      value: loading ? '...' : `${data.conversion}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: 'analytics-outline',
    },
    {
      id: '4',
      title: 'Clientes',
      value: loading ? '...' : data.customers.toString(),
      change: '+15%',
      changeType: 'positive',
      icon: 'people-outline',
    },
  ];

  // Performance Metrics
  const performanceMetrics: MetricData[] = [
    {
      id: '1',
      title: 'Ingresos Totales',
      value: loading ? '...' : `$${data.revenue.toLocaleString()}`,
      change: '+30%',
      changeType: 'positive',
      icon: 'trending-up',
    },
    {
      id: '2',
      title: 'Pedidos',
      value: loading ? '...' : data.orders.toString(),
      change: '+12%',
      changeType: 'positive',
      icon: 'bag-outline',
    },
    {
      id: '3',
      title: 'Conversión',
      value: loading ? '...' : `${data.conversion}%`,
      change: '+2.1%',
      changeType: 'positive',
      icon: 'analytics-outline',
    },
    {
      id: '4',
      title: 'Ticket Promedio',
      value: loading ? '...' : `$${Math.round(data.revenue / data.orders)}`,
      change: '+5%',
      changeType: 'positive',
      icon: 'card-outline',
    },
  ];

  // Conversion Analysis
  const conversionMetrics: MetricData[] = [
    {
      id: '1',
      title: 'No Compraron',
      value: loading ? '...' : '47%',
      change: '',
      changeType: 'negative',
      icon: '',
    },
    {
      id: '2',
      title: 'Compraron',
      value: loading ? '...' : '28%',
      change: '',
      changeType: 'positive',
      icon: '',
    },
    {
      id: '3',
      title: 'Abandonaron',
      value: loading ? '...' : '25%',
      change: '',
      changeType: 'neutral',
      icon: '',
    },
  ];

  // Customer Metrics
  const customerMetrics: MetricData[] = [
    {
      id: '1',
      title: 'Nuevos Clientes',
      value: loading ? '...' : data.customers.toString(),
      change: '+15%',
      changeType: 'positive',
      icon: 'person-add-outline',
    },
    {
      id: '2',
      title: 'Clientes VIP',
      value: loading ? '...' : Math.round(data.customers * 0.49).toString(),
      change: '+8%',
      changeType: 'positive',
      icon: 'star-outline',
    },
    {
      id: '3',
      title: 'Retención',
      value: loading ? '...' : `${Math.round(68 + data.customers * 0.1)}%`,
      change: '+4%',
      changeType: 'positive',
      icon: 'heart-outline',
    },
    {
      id: '4',
      title: 'Valor Promedio',
      value: loading ? '...' : `$${Math.round(data.revenue / data.customers)}`,
      change: '+12%',
      changeType: 'positive',
      icon: 'wallet-outline',
    },
  ];

  // Growth Metrics
  const growthMetrics: MetricData[] = [
    {
      id: '1',
      title: 'Seguidores',
      value: loading ? '...' : `+${data.followers}`,
      change: '+12%',
      changeType: 'positive',
      icon: 'people-outline',
    },
    {
      id: '2',
      title: 'Engagement',
      value: loading ? '...' : `${data.engagement}%`,
      change: '+1.5%',
      changeType: 'positive',
      icon: 'heart-outline',
    },
    {
      id: '3',
      title: 'Alcance',
      value: loading ? '...' : `${data.reach}K`,
      change: '+25%',
      changeType: 'positive',
      icon: 'eye-outline',
    },
    {
      id: '4',
      title: 'Interacciones',
      value: loading ? '...' : `+${data.interactions}`,
      change: '+18%',
      changeType: 'positive',
      icon: 'chatbubble-outline',
    },
  ];

  // Social Media Metrics
  const socialMetrics: MetricData[] = [
    {
      id: '1',
      title: 'Me Gusta',
      value: loading ? '...' : `${Math.round(15 + data.interactions * 0.5)}K`,
      change: '',
      changeType: 'positive',
      icon: '',
    },
    {
      id: '2',
      title: 'Comentarios',
      value: loading ? '...' : `${Math.round(2.1 + data.interactions * 0.05)}K`,
      change: '',
      changeType: 'positive',
      icon: '',
    },
    {
      id: '3',
      title: 'Guardados',
      value: loading ? '...' : `${Math.round(1 + data.interactions * 0.02)}K`,
      change: '',
      changeType: 'neutral',
      icon: '',
    },
    {
      id: '4',
      title: 'Clics en Links',
      value: loading ? '...' : `${Math.round(8 + data.interactions * 0.3)}K`,
      change: '',
      changeType: 'positive',
      icon: '',
    },
  ];

  return {
    quickStats,
    performanceMetrics,
    conversionMetrics,
    customerMetrics,
    growthMetrics,
    socialMetrics,
    loading,
    refreshData,
  };
};

export default useMetricsData;