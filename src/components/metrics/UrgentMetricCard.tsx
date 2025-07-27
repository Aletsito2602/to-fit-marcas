import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

interface UrgentMetricCardProps {
  title: string;
  value: string | number;
  status: 'critical' | 'warning' | 'normal' | 'active';
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  style?: ViewStyle;
}

const UrgentMetricCard: React.FC<UrgentMetricCardProps> = ({
  title,
  value,
  status,
  icon,
  onPress,
  subtitle,
  trend,
  style,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'critical':
        return '#E3170A';
      case 'warning':
        return '#F2DC5D';
      case 'active':
        return '#0FFF95';
      default:
        return '#FFFFFF';
    }
  };

  const getStatusGradient = () => {
    switch (status) {
      case 'critical':
        return ['rgba(227, 23, 10, 0.2)', 'rgba(227, 23, 10, 0.1)'];
      case 'warning':
        return ['rgba(242, 220, 93, 0.2)', 'rgba(242, 220, 93, 0.1)'];
      case 'active':
        return ['rgba(15, 255, 149, 0.2)', 'rgba(15, 255, 149, 0.1)'];
      default:
        return ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'];
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend) {
      case 'up':
        return <Ionicons name="trending-up" size={14} color="#0FFF95" />;
      case 'down':
        return <Ionicons name="trending-down" size={14} color="#E3170A" />;
      case 'stable':
        return <Ionicons name="remove" size={14} color="#F2DC5D" />;
      default:
        return null;
    }
  };

  const CardContent = () => (
    <LinearGradient
      colors={getStatusGradient()}
      style={[styles.card, style]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: getStatusColor() + '20' }]}>
          <Ionicons name={icon} size={18} color={getStatusColor()} />
        </View>
        {getTrendIcon()}
      </View>

      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>

      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
    </LinearGradient>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    minHeight: 100,
    justifyContent: 'space-between',
    width: (screenWidth - 44) / 2, // Adjusted for 4px total gap (2px each side)
    marginHorizontal: 2, // 2px spacing between columns
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
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 2,
  },
  statusIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 4,
    height: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default UrgentMetricCard;