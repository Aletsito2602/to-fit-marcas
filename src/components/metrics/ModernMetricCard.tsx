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

const { width: screenWidth } = Dimensions.get('window');

interface ModernMetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: keyof typeof Ionicons.glyphMap;
  subtitle?: string;
  onPress?: () => void;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large' | 'full';
  compact?: boolean; // Nueva prop para textos más pequeños
}

const ModernMetricCard: React.FC<ModernMetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  subtitle,
  onPress,
  style,
  size = 'medium',
  compact = false,
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return '#0FFF95';
      case 'negative':
        return '#E3170A';
      default:
        return 'rgba(255, 255, 255, 0.6)';
    }
  };

  const getCardWidth = () => {
    switch (size) {
      case 'small':
        return (screenWidth - 76) / 3; // 3 columns con mejor spacing
      case 'medium':
        return (screenWidth - 56) / 2; // 2 columns ajustado
      case 'large':
        return screenWidth - 40; // Full width with padding
      case 'full':
        return screenWidth - 40; // Full width
      default:
        return (screenWidth - 56) / 2;
    }
  };

  const CardContent = () => (
    <View style={[styles.card, { width: getCardWidth() }, style]}>
      {/* Header with icon */}
      {icon && (
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={20} color="rgba(255, 255, 255, 0.7)" />
          </View>
        </View>
      )}

      {/* Main content */}
      <View style={styles.content}>
        <Text style={[styles.value, compact && styles.compactValue]}>{value}</Text>
        <Text style={[styles.title, compact && styles.compactTitle]}>{title}</Text>
        
        {/* Change indicator */}
        {change && (
          <View style={styles.changeContainer}>
            <Text style={[styles.changeText, { color: getChangeColor() }]}>
              {change}
            </Text>
          </View>
        )}
        
        {/* Subtitle */}
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>

      {/* Right border accent */}
      <View style={[styles.accent, { backgroundColor: getChangeColor() }]} />
    </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Incrementado para mejor contraste
    borderRadius: 12, // Incrementado para mejor visual
    padding: 16, // Reducido padding para mejor fit
    marginHorizontal: 4, // Reducido margin para mejor spacing
    marginVertical: 6, // Reducido spacing vertical
    minHeight: 130, // Incrementado para mejor proporción
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', // Border más visible
    position: 'relative',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6, // Android shadow
  },
  header: {
    marginBottom: 14, // Incrementado spacing
  },
  iconContainer: {
    width: 40, // Incrementado tamaño
    height: 40,
    borderRadius: 8, // Más redondeado para mejor visual
    backgroundColor: 'rgba(255, 255, 255, 0.12)', // Más visible
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  value: {
    fontSize: 32, // Incrementado para mayor impacto
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 6, // Incrementado spacing
    lineHeight: 36,
    letterSpacing: -0.5, // Mejor kerning para números grandes
  },
  title: {
    fontSize: 15, // Incrementado ligeramente
    fontFamily: 'Poppins-Medium',
    color: 'rgba(255, 255, 255, 0.85)', // Más visible
    marginBottom: 10, // Incrementado spacing
    lineHeight: 20,
  },
  changeContainer: {
    marginBottom: 4,
  },
  changeText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 16,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: 14,
  },
  // Estilos compactos para análisis de conversión
  compactValue: {
    fontSize: 24, // Reducido de 32
    lineHeight: 28,
  },
  compactTitle: {
    fontSize: 12, // Reducido de 15
    lineHeight: 16,
  },
  accent: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4, // Incrementado grosor
    borderTopRightRadius: 12, // Ajustado al borderRadius del card
    borderBottomRightRadius: 12,
  },
});

export default ModernMetricCard;