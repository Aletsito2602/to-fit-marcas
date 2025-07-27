import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface FilterSectionProps {
  timeframes: string[];
  categories: string[];
  activeTimeframe: string;
  activeCategory: string;
  onTimeframeChange: (timeframe: string) => void;
  onCategoryChange: (category: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  timeframes,
  categories,
  activeTimeframe,
  activeCategory,
  onTimeframeChange,
  onCategoryChange,
}) => {
  const getTimeframeLabel = (timeframe: string) => {
    const labels: { [key: string]: string } = {
      day: 'Día',
      week: 'Semana',
      month: 'Mes',
      year: 'Año',
    };
    return labels[timeframe] || timeframe;
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      all: 'Todas',
      sales: 'Ventas',
      campaigns: 'Campañas',
      products: 'Productos',
      customers: 'Clientes',
      affiliates: 'Afiliados',
    };
    return labels[category] || category;
  };

  return (
    <View style={styles.container}>
      {/* Filtros de tiempo */}
      <View style={styles.filterGroup}>
        <Text style={styles.filterGroupTitle}>Período</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContainer}
        >
          {timeframes.map((timeframe) => (
            <TouchableOpacity
              key={timeframe}
              style={[
                styles.filterButton,
                activeTimeframe === timeframe && styles.activeFilterButton,
              ]}
              onPress={() => onTimeframeChange(timeframe)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeTimeframe === timeframe && styles.activeFilterButtonText,
                ]}
              >
                {getTimeframeLabel(timeframe)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filtros de categoría */}
      <View style={styles.filterGroup}>
        <Text style={styles.filterGroupTitle}>Categorías</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                activeCategory === category && styles.activeFilterButton,
              ]}
              onPress={() => onCategoryChange(category)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  activeCategory === category && styles.activeFilterButtonText,
                ]}
              >
                {getCategoryLabel(category)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterGroupTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  filterScrollContainer: {
    paddingHorizontal: 4,
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeFilterButton: {
    backgroundColor: 'rgba(151, 71, 255, 0.3)',
    borderColor: '#9747FF',
  },
  filterButtonText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: '#9747FF',
    fontWeight: '600',
  },
});

export default FilterSection;