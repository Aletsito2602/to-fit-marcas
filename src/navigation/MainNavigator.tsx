import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { MainTabParamList } from '../types';
import TabIcon from '../components/TabIcon';

// Pantallas principales
import HomeScreen from '../screens/main/HomeScreen';
import OrdersNavigator from './OrdersNavigator';
import CameraNavigator from './CameraNavigator';
import ProductsNavigator from './ProductsNavigator';
import MetricsNavigator from './MetricsNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 12,
          paddingTop: 12,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(157, 157, 157, 1)',
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Regular',
          fontWeight: '400',
          fontSize: 12,
          marginTop: 2,
        },
        tabBarIcon: ({ focused }) => {
          let iconName: 'home' | 'orders' | 'camera' | 'products' | 'metrics';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Orders':
              iconName = 'orders';
              break;
            case 'Camera':
              iconName = 'camera';
              break;
            case 'Products':
              iconName = 'products';
              break;
            case 'Metrics':
              iconName = 'metrics';
              break;
            default:
              iconName = 'home';
          }

          return (
            <View style={styles.tabIconContainer}>
              {focused && <View style={styles.activeIndicator} />}
              <TabIcon name={iconName} focused={focused} size={20} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersNavigator}
        options={{ tabBarLabel: 'Pedidos' }}
      />
      <Tab.Screen 
        name="Camera" 
        component={CameraNavigator}
        options={{ tabBarLabel: 'Cámara' }}
      />
      <Tab.Screen 
        name="Products" 
        component={ProductsNavigator}
        options={{ tabBarLabel: 'Productos' }}
      />
      <Tab.Screen 
        name="Metrics" 
        component={MetricsNavigator}
        options={{ tabBarLabel: 'Métricas' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 50,
    marginTop: -2,
  },
  activeIndicator: {
    position: 'absolute',
    top: -12,
    width: 40,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
});

export default MainNavigator;