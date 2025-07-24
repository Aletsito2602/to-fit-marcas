import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { MetricCard as MetricCardType } from '../../types';

interface MetricCardProps {
  metric: MetricCardType;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width - 60; // Accounting for margins

const MetricCard: React.FC<MetricCardProps> = ({ metric, onPress }) => {
  const renderContent = () => {
    switch (metric.type) {
      case 'chart':
        return (
          <View>
            <View style={styles.chartHeader}>
              <Text style={styles.percentageText}>{metric.value}</Text>
              <Text style={styles.subtitleText}>{metric.subtitle}</Text>
            </View>
            {metric.chartData && (
              <LineChart
                data={{
                  labels: metric.chartData.labels,
                  datasets: metric.chartData.datasets,
                }}
                width={cardWidth - 40}
                height={80}
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                chartConfig={{
                  backgroundColor: 'transparent',
                  backgroundGradientFrom: 'transparent',
                  backgroundGradientTo: 'transparent',
                  color: (opacity = 1) => `rgba(255, 105, 180, ${opacity})`,
                  strokeWidth: 2,
                }}
                bezier
                style={styles.chart}
              />
            )}
          </View>
        );

      case 'number':
        return (
          <View style={styles.numberContainer}>
            <View style={styles.numberItem}>
              <Text style={styles.numberValue}>${metric.value}</Text>
              <Text style={styles.numberLabel}>{metric.title}</Text>
              {metric.chartData && (
                <LineChart
                  data={{
                    labels: metric.chartData.labels,
                    datasets: metric.chartData.datasets,
                  }}
                  width={100}
                  height={40}
                  withDots={false}
                  withInnerLines={false}
                  withOuterLines={false}
                  withVerticalLabels={false}
                  withHorizontalLabels={false}
                  chartConfig={{
                    backgroundColor: 'transparent',
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientTo: 'transparent',
                    color: (opacity = 1) => `rgba(255, 105, 180, ${opacity})`,
                    strokeWidth: 1,
                  }}
                  style={styles.miniChart}
                />
              )}
            </View>
            {metric.subtitle && (
              <View style={styles.numberItem}>
                <Text style={styles.numberValue}>${metric.subtitle}</Text>
                <Text style={styles.numberLabel}>Otros ingresos</Text>
              </View>
            )}
          </View>
        );

      case 'conversion':
        return (
          <View style={styles.conversionContainer}>
            <Text style={styles.cardTitle}>{metric.title}</Text>
            <View style={styles.progressContainer}>
              <AnimatedCircularProgress
                size={120}
                width={8}
                fill={metric.percentage || 60}
                tintColor="#FF69B4"
                backgroundColor="#404040"
                rotation={0}
              >
                {() => (
                  <Text style={styles.progressText}>{metric.percentage || 60}%</Text>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
        );

      case 'messages':
        return (
          <View>
            <Text style={styles.cardTitle}>{metric.title}</Text>
            {metric.items?.map((item, index) => (
              <View key={index} style={styles.messageItem}>
                <View style={styles.messageAvatar}>
                  <Text style={styles.avatarText}>{item.name?.charAt(0) || 'U'}</Text>
                </View>
                <View style={styles.messageInfo}>
                  <Text style={styles.messageName}>{item.name}</Text>
                  <Text style={styles.messageText}>{item.message}</Text>
                </View>
                <View style={[styles.statusDot, { backgroundColor: item.isNew ? '#FFD700' : '#00FF00' }]} />
              </View>
            ))}
          </View>
        );

      case 'stock':
        return (
          <View>
            <Text style={styles.cardTitle}>{metric.title}</Text>
            {metric.items?.map((item, index) => (
              <View key={index} style={styles.stockItem}>
                <View style={styles.stockImage}>
                  <Text style={styles.stockImageText}>📦</Text>
                </View>
                <View style={styles.stockInfo}>
                  <Text style={styles.stockName}>{item.name}</Text>
                  <Text style={styles.stockQuantity}>{item.quantity} unidades</Text>
                </View>
              </View>
            ))}
          </View>
        );

      default:
        return (
          <View>
            <Text style={styles.cardTitle}>{metric.title}</Text>
            <Text style={styles.cardValue}>{metric.value}</Text>
          </View>
        );
    }
  };

  const CardContent = (
    <View style={styles.card}>
      {renderContent()}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        {CardContent}
      </TouchableOpacity>
    );
  }

  return CardContent;
};

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 25,
    marginBottom: 20,
  },
  chartHeader: {
    marginBottom: 15,
  },
  percentageText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numberItem: {
    flex: 1,
    alignItems: 'center',
  },
  numberValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  numberLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 10,
  },
  miniChart: {
    borderRadius: 8,
  },
  conversionContainer: {
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  messageInfo: {
    flex: 1,
  },
  messageName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  stockImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stockImageText: {
    fontSize: 20,
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  stockQuantity: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  cardValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default MetricCard;