import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface CampaignMetricsCardProps {
  activeCampaigns: number;
  totalRevenue: string;
  topPerformingCampaign: string;
  affiliateCount: number;
  conversionRate: string;
  onPress?: () => void;
  style?: ViewStyle;
}

interface CampaignPerformanceItemProps {
  campaign: {
    id: string;
    name: string;
    status: 'active' | 'inactive' | 'finished';
    revenue: string;
    affiliateCount: number;
    conversionRate: string;
  };
  onPress?: () => void;
}

export const CampaignMetricsCard: React.FC<CampaignMetricsCardProps> = ({
  activeCampaigns,
  totalRevenue,
  topPerformingCampaign,
  affiliateCount,
  conversionRate,
  onPress,
  style,
}) => {
  const CardContent = () => (
    <LinearGradient
      colors={['rgba(151, 71, 255, 0.2)', 'rgba(151, 71, 255, 0.1)']}
      style={[styles.campaignCard, style]}
    >
      <View style={styles.campaignHeader}>
        <View style={styles.campaignIconContainer}>
          <Ionicons name="megaphone" size={20} color="#9747FF" />
        </View>
        <Text style={styles.campaignTitle}>Rendimiento de Campañas</Text>
        <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.5)" />
      </View>

      <View style={styles.campaignMetrics}>
        <View style={styles.metricRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{activeCampaigns}</Text>
            <Text style={styles.metricLabel}>Activas</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{totalRevenue}</Text>
            <Text style={styles.metricLabel}>Ingresos Totales</Text>
          </View>
        </View>

        <View style={styles.metricRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{affiliateCount}</Text>
            <Text style={styles.metricLabel}>Afiliados</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{conversionRate}</Text>
            <Text style={styles.metricLabel}>Conversión</Text>
          </View>
        </View>
      </View>

      <View style={styles.topCampaign}>
        <Text style={styles.topCampaignLabel}>Mejor campaña:</Text>
        <Text style={styles.topCampaignName}>{topPerformingCampaign}</Text>
      </View>
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

export const CampaignPerformanceItem: React.FC<CampaignPerformanceItemProps> = ({
  campaign,
  onPress,
}) => {
  const getStatusColor = () => {
    switch (campaign.status) {
      case 'active':
        return '#0FFF95';
      case 'inactive':
        return '#F2DC5D';
      case 'finished':
        return '#939597';
      default:
        return '#FFFFFF';
    }
  };

  const getStatusText = () => {
    switch (campaign.status) {
      case 'active':
        return 'Activa';
      case 'inactive':
        return 'Pausada';
      case 'finished':
        return 'Finalizada';
      default:
        return 'Desconocido';
    }
  };

  const ItemContent = () => (
    <View style={styles.performanceItem}>
      <View style={styles.performanceHeader}>
        <View style={styles.campaignInfo}>
          <Text style={styles.campaignName}>{campaign.name}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color="rgba(255, 255, 255, 0.3)" />
      </View>

      <View style={styles.performanceMetrics}>
        <View style={styles.performanceMetric}>
          <Text style={styles.performanceValue}>{campaign.revenue}</Text>
          <Text style={styles.performanceLabel}>Ingresos</Text>
        </View>
        <View style={styles.performanceMetric}>
          <Text style={styles.performanceValue}>{campaign.affiliateCount}</Text>
          <Text style={styles.performanceLabel}>Afiliados</Text>
        </View>
        <View style={styles.performanceMetric}>
          <Text style={styles.performanceValue}>{campaign.conversionRate}</Text>
          <Text style={styles.performanceLabel}>Conversión</Text>
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <ItemContent />
      </TouchableOpacity>
    );
  }

  return <ItemContent />;
};

const styles = StyleSheet.create({
  campaignCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  campaignHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  campaignIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(151, 71, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  campaignTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  campaignMetrics: {
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  topCampaign: {
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  topCampaignLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
  },
  topCampaignName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9747FF',
  },
  performanceItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 8,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  campaignInfo: {
    flex: 1,
  },
  campaignName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
  },
  performanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceMetric: {
    alignItems: 'center',
    flex: 1,
  },
  performanceValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  performanceLabel: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default CampaignMetricsCard;