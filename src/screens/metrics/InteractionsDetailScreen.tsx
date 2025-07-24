import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Interaction } from '../../types';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';

const { width } = Dimensions.get('window');
const itemWidth = (width - 75) / 2; // 2 columnas con márgenes

const InteractionsDetailScreen: React.FC = () => {
  const navigation = useNavigation();

  // Mock data
  const interactions: Interaction[] = [
    {
      id: '1',
      image: 'https://via.placeholder.com/200/FF6B6B',
      count: 52,
      type: 'like',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/200/4ECDC4',
      count: 38,
      type: 'comment',
    },
    {
      id: '3',
      image: 'https://via.placeholder.com/200/FFD93D',
      count: 75,
      type: 'share',
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/200/6BCF7F',
      count: 29,
      type: 'like',
    },
    {
      id: '5',
      image: 'https://via.placeholder.com/200/A8E6CF',
      count: 43,
      type: 'comment',
    },
    {
      id: '6',
      image: 'https://via.placeholder.com/200/FFB3BA',
      count: 67,
      type: 'share',
    },
    {
      id: '7',
      image: 'https://via.placeholder.com/200/FFDFBA',
      count: 31,
      type: 'like',
    },
    {
      id: '8',
      image: 'https://via.placeholder.com/200/BAFFC9',
      count: 55,
      type: 'comment',
    },
    {
      id: '9',
      image: 'https://via.placeholder.com/200/BAE1FF',
      count: 82,
      type: 'share',
    },
    {
      id: '10',
      image: 'https://via.placeholder.com/200/F8B4CB',
      count: 19,
      type: 'like',
    },
  ];

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'share':
        return '📤';
      default:
        return '👍';
    }
  };

  const renderInteractionItem = ({ item }: { item: Interaction }) => (
    <TouchableOpacity style={styles.interactionItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.interactionImage}
      />
      <View style={styles.interactionOverlay}>
        <View style={styles.interactionInfo}>
          <Text style={styles.interactionIcon}>
            {getInteractionIcon(item.type)}
          </Text>
          <Text style={styles.interactionCount}>
            Interacciones: {item.count}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      {/* Header */}
      <Header />

      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title}>Interacciones</Text>

        {/* Grid de imágenes */}
        <FlatList
          data={interactions}
          renderItem={renderInteractionItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          style={styles.grid}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 110,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 25,
  },
  grid: {
    flex: 1,
  },
  gridContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  interactionItem: {
    width: itemWidth,
    height: itemWidth,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  interactionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  interactionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  interactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  interactionIcon: {
    fontSize: 20,
  },
  interactionCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'right',
  },
});

export default InteractionsDetailScreen;