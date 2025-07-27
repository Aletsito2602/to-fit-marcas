import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, PieChart } from 'react-native-chart-kit';

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    color?: (opacity: number) => string;
  }>;
}

interface PieChartData {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

interface ProductData {
  id: string;
  name: string;
  image?: string;
  sales: number;
  revenue: string;
}

interface EnhancedMetricCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  subtitle?: string;
  chartData?: ChartData;
  pieData?: PieChartData[];
  products?: ProductData[];
  width?: number;
  height?: number;
  onPress?: () => void;
  style?: ViewStyle;
  chartType?: 'line' | 'pie' | 'products' | 'none';
}

const EnhancedMetricCard: React.FC<EnhancedMetricCardProps> = ({
  title,
  value,
  trend,
  subtitle,
  chartData,
  pieData,
  products,
  width = 160,
  height = 180,
  onPress,
  style,
  chartType = 'line',
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return '#0FFF95';
      case 'down':
        return '#E3170A';
      case 'stable':
        return '#F2DC5D';
      default:
        return '#FFFFFF';
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

  const renderChart = () => {
    if (chartType === 'none') return null;

    switch (chartType) {
      case 'line':
        if (!chartData) return null;
        return (
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={width - 32}
              height={60}
              chartConfig={{
                backgroundColor: 'transparent',
                backgroundGradientFrom: 'transparent',
                backgroundGradientTo: 'transparent',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(236, 178, 205, ${opacity})`,
                labelColor: () => 'rgba(255, 255, 255, 0.5)',
                style: {
                  borderRadius: 8,
                },
                propsForDots: {
                  r: '2',
                  strokeWidth: '1',
                  stroke: '#ECB2CD',
                },
                propsForBackgroundLines: {
                  strokeDasharray: '',
                  stroke: 'rgba(255, 255, 255, 0.1)',
                  strokeWidth: 1,
                },
              }}
              bezier
              style={styles.chart}
              withDots={true}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLabels={false}
              withHorizontalLabels={false}
            />
          </View>
        );

      case 'pie':
        if (!pieData) return null;
        return (
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              width={width - 32}
              height={80}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              hasLegend={false}
              center={[0, 0]}
            />
          </View>
        );

      case 'products':
        if (!products) return null;
        return (
          <ScrollView style={styles.productsContainer} showsVerticalScrollIndicator={false}>
            {products.slice(0, 3).map((product, index) => (
              <View key={product.id} style={styles.productItem}>
                <View style={styles.productRank}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                {product.image && (
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                )}
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text style={styles.productSales}>
                    {product.sales} vendidos • {product.revenue}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        );

      default:
        return null;
    }
  };

  const CardContent = () => (
    <LinearGradient
      colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.2)']}
      style={[styles.card, { width, height }, style]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {getTrendIcon()}
        </View>
      </View>

      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: getTrendColor() }]}>{value}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>

      {renderChart()}
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
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 8,
  },
  header: {
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    flex: 1,
  },
  valueContainer: {
    marginBottom: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 2,
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 8,
  },
  productsContainer: {
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productRank: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(236, 178, 205, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rankText: {
    fontSize: 8,
    color: '#ECB2CD',
    fontWeight: 'bold',
  },
  productImage: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  productSales: {
    fontSize: 7,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default EnhancedMetricCard;