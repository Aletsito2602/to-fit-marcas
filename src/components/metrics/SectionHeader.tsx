import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onSeeMore?: () => void;
  seeMoreText?: string;
  showSeeMore?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  onSeeMore,
  seeMoreText = 'Ver todo',
  showSeeMore = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
      
      {showSeeMore && onSeeMore && (
        <TouchableOpacity onPress={onSeeMore} style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>{seeMoreText}</Text>
          <Ionicons name="chevron-forward" size={14} color="rgba(255, 255, 255, 0.5)" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18, // Incrementado para mejor jerarquía
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
    fontFamily: 'Poppins-Bold', // Consistente con el resto
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginRight: 4,
  },
});

export default SectionHeader;