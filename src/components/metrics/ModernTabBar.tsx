import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface TabItem {
  id: string;
  title: string;
  subtitle?: string;
}

interface ModernTabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const ModernTabBar: React.FC<ModernTabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const tabWidth = (screenWidth - 80) / tabs.length; // 40px padding total + gaps

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                { width: tabWidth },
                isActive && styles.activeTab,
              ]}
              onPress={() => onTabPress(tab.id)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabTitle, isActive && styles.activeTabTitle]}>
                {tab.title}
              </Text>
              {tab.subtitle && (
                <Text style={[styles.tabSubtitle, isActive && styles.activeTabSubtitle]}>
                  {tab.subtitle}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      
      {/* Active indicator */}
      <View style={styles.indicatorContainer}>
        <View 
          style={[
            styles.activeIndicator,
            {
              left: tabs.findIndex(tab => tab.id === activeTab) * (tabWidth + 8) + 20,
              width: tabWidth,
            }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 48, // Incrementado mucho más el padding superior
    marginBottom: 28, // Incrementado spacing
    position: 'relative',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Más visible
    borderRadius: 12, // Más redondeado
    padding: 6, // Incrementado padding
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', // Border más visible
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    paddingVertical: 14, // Incrementado para mejor touch target
    paddingHorizontal: 12, // Incrementado padding horizontal
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // Incrementado radius
    minHeight: 68, // Incrementado altura mínima
    transition: 'all 0.2s ease', // Transición suave
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Más visible
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 2,
  },
  activeTabTitle: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  tabSubtitle: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
  },
  activeTabSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
  },
  activeIndicator: {
    position: 'absolute',
    height: 3, // Incrementado grosor
    backgroundColor: '#0FFF95',
    borderRadius: 2, // Más redondeado
    shadowColor: '#0FFF95',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default ModernTabBar;