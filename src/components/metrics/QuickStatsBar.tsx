import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QuickStatsBarProps {
  revenue: string;
  orders: string;
  conversion: string;
  growth: string;
}

const QuickStatsBar: React.FC<QuickStatsBarProps> = ({
  revenue,
  orders,
  conversion,
  growth,
}) => {
  const stats = [
    {
      label: 'Ingresos',
      value: revenue,
      icon: 'cash-outline' as const,
      color: '#0FFF95',
    },
    {
      label: 'Pedidos',
      value: orders,
      icon: 'bag-outline' as const,
      color: '#F2DC5D',
    },
    {
      label: 'Conversión',
      value: conversion,
      icon: 'trending-up-outline' as const,
      color: '#9747FF',
    },
    {
      label: 'Crecimiento',
      value: growth,
      icon: 'stats-chart-outline' as const,
      color: '#ECB2CD',
    },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
            <Ionicons name={stat.icon} size={16} color={stat.color} />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default QuickStatsBar;