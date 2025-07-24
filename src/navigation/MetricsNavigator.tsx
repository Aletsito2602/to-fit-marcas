import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MetricsStackParamList } from '../types';

// Importar las pantallas de métricas
import MetricsDashboardScreen from '../screens/metrics/MetricsDashboardScreen';
import StatusDetailScreen from '../screens/metrics/StatusDetailScreen';
import DemographicsDetailScreen from '../screens/metrics/DemographicsDetailScreen';
import SalesAffiliateDetailScreen from '../screens/metrics/SalesAffiliateDetailScreen';
import CampaignsDetailScreen from '../screens/metrics/CampaignsDetailScreen';
import InteractionsDetailScreen from '../screens/metrics/InteractionsDetailScreen';
import InteractionPhotosScreen from '../screens/metrics/InteractionPhotosScreen';
import InteractionDetailScreen from '../screens/metrics/InteractionDetailScreen';

const Stack = createStackNavigator<MetricsStackParamList>();

const MetricsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#363636' },
      }}
      initialRouteName="MetricsDashboard"
    >
      <Stack.Screen 
        name="MetricsDashboard" 
        component={MetricsDashboardScreen}
        options={{ title: 'Métricas' }}
      />
      <Stack.Screen 
        name="StatusDetail" 
        component={StatusDetailScreen}
        options={{ title: 'Status' }}
      />
      <Stack.Screen 
        name="DemographicsDetail" 
        component={DemographicsDetailScreen}
        options={{ title: 'Demografía' }}
      />
      <Stack.Screen 
        name="SalesAffiliateDetail" 
        component={SalesAffiliateDetailScreen}
        options={{ title: 'Venta por Afiliado' }}
      />
      <Stack.Screen 
        name="CampaignsDetail" 
        component={CampaignsDetailScreen}
        options={{ title: 'Campañas' }}
      />
      <Stack.Screen 
        name="InteractionsDetail" 
        component={InteractionsDetailScreen}
        options={{ title: 'Interacciones' }}
      />
      <Stack.Screen 
        name="InteractionPhotos" 
        component={InteractionPhotosScreen}
        options={{ title: 'Todas las Interacciones' }}
      />
      <Stack.Screen 
        name="InteractionDetail" 
        component={InteractionDetailScreen}
        options={{ title: 'Detalle de Publicación' }}
      />
    </Stack.Navigator>
  );
};

export default MetricsNavigator;