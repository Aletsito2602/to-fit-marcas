import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  hasSubItems?: boolean;
  subItems?: MenuItem[];
  screen?: string;
}

interface DrawerMenuProps {
  navigation: DrawerNavigationProp<any>;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      title: 'Home',
      icon: 'home-outline',
      screen: 'MainTabs',
    },
    {
      id: 'campaigns',
      title: 'Campañas',
      icon: 'megaphone-outline',
      screen: 'Campaigns',
    },
    {
      id: 'statistics',
      title: 'Estadísticas',
      icon: 'bar-chart-outline',
      screen: 'Metrics',
    },
    {
      id: 'documents',
      title: 'Documentos',
      icon: 'document-text-outline',
      hasSubItems: true,
      subItems: [
        { id: 'invoices', title: 'Facturas', icon: '', screen: 'Invoices' },
        { id: 'reports', title: 'Reportes', icon: '', screen: 'Reports' },
      ],
    },
    {
      id: 'store',
      title: 'Mi Tienda',
      icon: 'storefront-outline',
      screen: 'Store',
    },
    {
      id: 'profile',
      title: 'Mi perfil',
      icon: 'person-outline',
      screen: 'Profile',
    },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemPress = (item: MenuItem) => {
    if (item.hasSubItems) {
      toggleExpanded(item.id);
    } else if (item.screen) {
      navigation.navigate(item.screen);
      navigation.closeDrawer();
    }
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
    navigation.closeDrawer();
  };

  const handleLogout = async () => {
    await logout();
    navigation.closeDrawer();
  };

  const renderMenuItem = (item: MenuItem, isSubItem = false) => {
    const isExpanded = expandedItems.includes(item.id);
    
    return (
      <View key={item.id}>
        <TouchableOpacity
          style={[
            styles.menuItem,
            isSubItem && styles.subMenuItem
          ]}
          onPress={() => handleItemPress(item)}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemContent}>
            {item.icon && (
              <Ionicons 
                name={item.icon as any} 
                size={20} 
                color="#FFFFFF" 
                style={styles.menuIcon}
              />
            )}
            <Text style={[
              styles.menuText,
              isSubItem && styles.subMenuText,
              !item.icon && styles.noIconText
            ]}>
              {item.title}
            </Text>
          </View>
          {item.hasSubItems && (
            <Ionicons 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={16} 
              color="#A0A0A0" 
            />
          )}
        </TouchableOpacity>
        
        {item.hasSubItems && isExpanded && item.subItems && (
          <View style={styles.subItemsContainer}>
            {item.subItems.map(subItem => renderMenuItem(subItem, true))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <TouchableOpacity style={styles.profileHeader} onPress={handleProfilePress}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ 
                uri: user?.photo_url || user?.photoURL || 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=60&h=60&fit=crop&crop=face' 
              }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.display_name || user?.nombre_completo || user?.fullName || 'Usuario'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(item => renderMenuItem(item))}
        </View>

        {/* Bottom Menu Items */}
        <View style={styles.bottomMenuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
            <View style={styles.menuItemContent}>
              <Ionicons name="settings-outline" size={20} color="#FFFFFF" style={styles.menuIcon} />
              <Text style={styles.menuText}>Configuración</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Support')}>
            <View style={styles.menuItemContent}>
              <Ionicons name="help-circle-outline" size={20} color="#FFFFFF" style={styles.menuIcon} />
              <Text style={styles.menuText}>Centro de ayuda</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 110, // 60 + 50 = 110px de top padding
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1C',
  },
  profileImageContainer: {
    marginRight: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333333',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  menuContainer: {
    paddingTop: 20,
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  subMenuItem: {
    paddingLeft: 45,
    paddingVertical: 12,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 15,
    width: 20,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  subMenuText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#CCCCCC',
  },
  noIconText: {
    marginLeft: 35,
  },
  subItemsContainer: {
    backgroundColor: '#0A0A0A',
  },
  bottomMenuContainer: {
    marginTop: 30,
    paddingBottom: 40,
  },
});

export default DrawerMenu;