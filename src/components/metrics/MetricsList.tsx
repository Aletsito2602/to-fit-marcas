import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

interface MetricsListItem {
  id: string;
  title: string;
  value: string;
  subtitle?: string;
  image?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  status?: 'active' | 'inactive' | 'warning' | 'success';
  onPress?: () => void;
}

interface MetricsListProps {
  title: string;
  data: MetricsListItem[];
  maxItems?: number;
  showSeeMore?: boolean;
  onSeeMore?: () => void;
}

const MetricsList: React.FC<MetricsListProps> = ({
  title,
  data,
  maxItems = 5,
  showSeeMore = true,
  onSeeMore,
}) => {
  const displayData = data.slice(0, maxItems);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return '#0FFF95';
      case 'warning':
        return '#F2DC5D';
      case 'success':
        return '#0FFF95';
      case 'inactive':
        return '#E3170A';
      default:
        return 'rgba(255, 255, 255, 0.3)';
    }
  };

  const renderItem = ({ item }: { item: MetricsListItem }) => (
    <TouchableOpacity 
      style={styles.listItem} 
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      {/* Left content */}
      <View style={styles.leftContent}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        ) : item.icon ? (
          <View style={[styles.iconContainer, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Ionicons name={item.icon} size={18} color={getStatusColor(item.status)} />
          </View>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        <View style={styles.textContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
          )}
        </View>
      </View>

      {/* Right content */}
      <View style={styles.rightContent}>
        <Text style={styles.itemValue}>{item.value}</Text>
        {item.status && (
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showSeeMore && onSeeMore && (
          <TouchableOpacity onPress={onSeeMore}>
            <Text style={styles.seeMoreText}>Ver todo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      <View style={styles.listContainer}>
        <FlatList
          data={displayData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Más visible
    borderRadius: 12, // Más redondeado
    padding: 22, // Incrementado padding
    marginHorizontal: 20,
    marginVertical: 10, // Incrementado spacing vertical
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', // Border más visible
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  seeMoreText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  listContainer: {
    // Container for the list
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14, // Incrementado para mejor touch target
    paddingHorizontal: 4, // Añadido padding horizontal
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)', // Más visible
    borderRadius: 6, // Añadido border radius para hover effect
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemImage: {
    width: 44, // Incrementado tamaño
    height: 44,
    borderRadius: 8, // Más redondeado
    marginRight: 14, // Incrementado spacing
  },
  iconContainer: {
    width: 44, // Incrementado tamaño
    height: 44,
    borderRadius: 8, // Más redondeado
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14, // Incrementado spacing
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15, // Incrementado tamaño
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 3, // Incrementado spacing
    lineHeight: 20,
  },
  itemSubtitle: {
    fontSize: 13, // Incrementado tamaño
    fontFamily: 'Poppins-Regular',
    color: 'rgba(255, 255, 255, 0.7)', // Más visible
    lineHeight: 16,
  },
  rightContent: {
    alignItems: 'flex-end',
    position: 'relative',
  },
  itemValue: {
    fontSize: 17, // Incrementado tamaño
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    lineHeight: 22,
    letterSpacing: -0.2, // Mejor kerning
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    top: -2,
    right: -2,
  },
});

export default MetricsList;