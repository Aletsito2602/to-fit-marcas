import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import TabIcon from './TabIcon';

type BottomTabBarNavigationProp = DrawerNavigationProp<DrawerParamList>;

interface BottomTabBarProps {
  activeTab?: 'home' | 'orders' | 'camera' | 'products' | 'metrics';
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab }) => {
  const navigation = useNavigation<BottomTabBarNavigationProp>();

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home' as const, route: 'MainTabs' },
    { key: 'orders', label: 'Pedidos', icon: 'orders' as const, route: 'MainTabs' },
    { key: 'camera', label: 'Cámara', icon: 'camera' as const, route: 'MainTabs' },
    { key: 'products', label: 'Productos', icon: 'products' as const, route: 'MainTabs' },
    { key: 'metrics', label: 'Métricas', icon: 'metrics' as const, route: 'MainTabs' },
  ];

  const handleTabPress = (tabKey: string, route: string) => {
    if (route === 'MainTabs') {
      navigation.navigate('MainTabs');
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => handleTabPress(tab.key, tab.route)}
            activeOpacity={0.7}
          >
            <View style={styles.tabIconContainer}>
              {isActive && <View style={styles.activeIndicator} />}
              <TabIcon name={tab.icon} focused={isActive} size={20} />
            </View>
            <Text style={[
              styles.tabLabel,
              { color: isActive ? '#FFFFFF' : 'rgba(157, 157, 157, 1)' }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderTopWidth: 0,
    height: 80,
    paddingBottom: 12,
    paddingTop: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  tabLabel: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    marginTop: 2,
  },
});

export default BottomTabBar;