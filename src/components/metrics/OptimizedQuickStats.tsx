import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

interface QuickStatItem {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: keyof typeof Ionicons.glyphMap;
}

interface OptimizedQuickStatsProps {
  stats: QuickStatItem[];
}

const OptimizedQuickStats: React.FC<OptimizedQuickStatsProps> = ({ stats }) => {
  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive':
        return '#0FFF95';
      case 'negative':
        return '#E3170A';
      default:
        return 'rgba(255, 255, 255, 0.6)';
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return 'trending-up';
      case 'negative':
        return 'trending-down';
      default:
        return 'remove';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {stats.map((stat, index) => (
          <View key={stat.id} style={[styles.statCard, index === 0 && styles.firstCard]}>
            {/* Icon and Change Indicator */}
            <View style={styles.header}>
              <View style={[styles.iconContainer, { backgroundColor: getChangeColor(stat.changeType) + '20' }]}>
                <Ionicons name={stat.icon} size={18} color={getChangeColor(stat.changeType)} />
              </View>
              <View style={styles.changeContainer}>
                <Ionicons 
                  name={getChangeIcon(stat.changeType) as any} 
                  size={12} 
                  color={getChangeColor(stat.changeType)} 
                />
                <Text style={[styles.changeText, { color: getChangeColor(stat.changeType) }]}>
                  {stat.change}
                </Text>
              </View>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
              <Text style={styles.value}>{stat.value}</Text>
              <Text style={styles.title}>{stat.title}</Text>
            </View>

            {/* Bottom Accent */}
            <View style={[styles.accent, { backgroundColor: getChangeColor(stat.changeType) }]} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingRight: 20,
  },
  statCard: {
    width: (screenWidth - 70) / 2.5, // 2.5 cards visible at once para mejor scroll
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 14, // Reducido padding
    marginRight: 10, // Reducido margin
    minHeight: 100, // Reducido altura
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  firstCard: {
    marginLeft: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 14,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  value: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 28,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
  },
  accent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default OptimizedQuickStats;