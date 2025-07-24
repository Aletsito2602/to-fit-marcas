import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';

interface PhotoData {
  id: number;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  engagement: number;
  date: string;
  caption: string;
}

const InteractionPhotosScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filters = ['Todas', 'Más Likes', 'Más Comentarios', 'Más Shares', 'Mayor Engagement'];

  const mockPhotos: PhotoData[] = [
    {
      id: 1,
      image: 'https://via.placeholder.com/300x300/FF69B4/fff?text=1',
      likes: 1250,
      comments: 89,
      shares: 45,
      engagement: 6.8,
      date: '22 Jul',
      caption: 'Nuevo outfit de verano con @tofit 🌞'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/300x300/A98FFF/fff?text=2',
      likes: 980,
      comments: 67,
      shares: 32,
      engagement: 5.4,
      date: '21 Jul',
      caption: 'Look casual para el fin de semana'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/300x300/00B894/fff?text=3',
      likes: 875,
      comments: 54,
      shares: 28,
      engagement: 4.9,
      date: '20 Jul',
      caption: 'Tendencia: colores vibrantes'
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/300x300/FFA726/fff?text=4',
      likes: 756,
      comments: 43,
      shares: 21,
      engagement: 4.2,
      date: '19 Jul',
      caption: 'Accesorios que marcan la diferencia'
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/300x300/FF5722/fff?text=5',
      likes: 634,
      comments: 38,
      shares: 19,
      engagement: 3.8,
      date: '18 Jul',
      caption: 'Estilo minimalista pero elegante'
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/300x300/9C27B0/fff?text=6',
      likes: 567,
      comments: 32,
      shares: 15,
      engagement: 3.4,
      date: '17 Jul',
      caption: 'Comodidad y estilo en uno'
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/300x300/3F51B5/fff?text=7',
      likes: 489,
      comments: 28,
      shares: 12,
      engagement: 3.1,
      date: '16 Jul',
      caption: 'Inspiración nocturna'
    },
    {
      id: 8,
      image: 'https://via.placeholder.com/300x300/009688/fff?text=8',
      likes: 423,
      comments: 25,
      shares: 10,
      engagement: 2.9,
      date: '15 Jul',
      caption: 'Colores de temporada'
    },
    {
      id: 9,
      image: 'https://via.placeholder.com/300x300/795548/fff?text=9',
      likes: 367,
      comments: 21,
      shares: 8,
      engagement: 2.6,
      date: '14 Jul',
      caption: 'Look profesional'
    }
  ];

  const getFilteredPhotos = () => {
    switch (activeFilter) {
      case 'Más Likes':
        return [...mockPhotos].sort((a, b) => b.likes - a.likes);
      case 'Más Comentarios':
        return [...mockPhotos].sort((a, b) => b.comments - a.comments);
      case 'Más Shares':
        return [...mockPhotos].sort((a, b) => b.shares - a.shares);
      case 'Mayor Engagement':
        return [...mockPhotos].sort((a, b) => b.engagement - a.engagement);
      default:
        return mockPhotos;
    }
  };

  const renderFilterButton = (filter: string) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterButton,
        activeFilter === filter && styles.activeFilterButton
      ]}
      onPress={() => setActiveFilter(filter)}
    >
      <Text
        style={[
          styles.filterText,
          activeFilter === filter && styles.activeFilterText
        ]}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );

  const renderGridItem = ({ item }: { item: PhotoData }) => (
    <TouchableOpacity 
      style={styles.gridItem}
      onPress={() => navigation.navigate('InteractionDetail' as any, { photo: item })}
    >
      <Image source={{ uri: item.image }} style={styles.gridImage} />
      <View style={styles.gridOverlay}>
        <View style={styles.gridStats}>
          <View style={styles.gridStat}>
            <Ionicons name="heart" size={14} color="#FF69B4" />
            <Text style={styles.gridStatNumber}>{item.likes}</Text>
          </View>
          <View style={styles.gridStat}>
            <Ionicons name="chatbubble" size={14} color="#A98FFF" />
            <Text style={styles.gridStatNumber}>{item.comments}</Text>
          </View>
        </View>
        <Text style={styles.engagementBadge}>{item.engagement}%</Text>
      </View>
    </TouchableOpacity>
  );

  const renderListItem = ({ item }: { item: PhotoData }) => (
    <TouchableOpacity 
      style={styles.listItem}
      onPress={() => navigation.navigate('InteractionDetail' as any, { photo: item })}
    >
      <Image source={{ uri: item.image }} style={styles.listImage} />
      <View style={styles.listContent}>
        <Text style={styles.listCaption} numberOfLines={2}>{item.caption}</Text>
        <Text style={styles.listDate}>{item.date}</Text>
        <View style={styles.listStats}>
          <View style={styles.listStat}>
            <Ionicons name="heart" size={16} color="#FF69B4" />
            <Text style={styles.listStatNumber}>{item.likes}</Text>
          </View>
          <View style={styles.listStat}>
            <Ionicons name="chatbubble" size={16} color="#A98FFF" />
            <Text style={styles.listStatNumber}>{item.comments}</Text>
          </View>
          <View style={styles.listStat}>
            <Ionicons name="share-social" size={16} color="#00B894" />
            <Text style={styles.listStatNumber}>{item.shares}</Text>
          </View>
        </View>
      </View>
      <View style={styles.engagementColumn}>
        <Text style={styles.engagementPercentage}>{item.engagement}%</Text>
        <Text style={styles.engagementLabel}>Engagement</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      <Header />

      <View style={styles.content}>
        {/* Título y controles */}
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Interacciones</Text>
          <View style={styles.viewControls}>
            <TouchableOpacity 
              style={[styles.viewButton, viewMode === 'grid' && styles.activeViewButton]}
              onPress={() => setViewMode('grid')}
            >
              <Ionicons name="grid" size={20} color={viewMode === 'grid' ? '#000000' : '#A0A0A0'} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.viewButton, viewMode === 'list' && styles.activeViewButton]}
              onPress={() => setViewMode('list')}
            >
              <Ionicons name="list" size={20} color={viewMode === 'list' ? '#000000' : '#A0A0A0'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filtros */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map(renderFilterButton)}
        </ScrollView>

        {/* Estadísticas rápidas */}
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
          style={styles.gradientBorder}
        >
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>6.8k</Text>
              <Text style={styles.statLabel}>Total Likes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>397</Text>
              <Text style={styles.statLabel}>Comentarios</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>190</Text>
              <Text style={styles.statLabel}>Shares</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.2%</Text>
              <Text style={styles.statLabel}>Engagement</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Lista/Grid de fotos */}
        <FlatList
          data={getFilteredPhotos()}
          renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={viewMode === 'grid' ? 3 : 1}
          key={viewMode} // Force re-render when changing view mode
          showsVerticalScrollIndicator={false}
          style={styles.photosList}
          contentContainerStyle={styles.photosContent}
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
    paddingTop: 70,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    flex: 1,
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  viewControls: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeViewButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 25,
    gap: 8,
  },
  filterButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeFilterButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  filterText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
  },
  activeFilterText: {
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  gradientBorder: {
    borderRadius: 16,
    padding: 2,
    marginHorizontal: 25,
    marginBottom: 16,
  },
  statsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  photosList: {
    flex: 1,
  },
  photosContent: {
    paddingHorizontal: 25,
  },
  // Grid styles
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333333',
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
  },
  gridStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  gridStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gridStatNumber: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  engagementBadge: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#00B894',
    textAlign: 'center',
  },
  // List styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#333333',
    marginRight: 12,
  },
  listContent: {
    flex: 1,
  },
  listCaption: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  listDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 8,
  },
  listStats: {
    flexDirection: 'row',
    gap: 16,
  },
  listStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listStatNumber: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  engagementColumn: {
    alignItems: 'center',
    marginLeft: 12,
  },
  engagementPercentage: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#00B894',
    marginBottom: 2,
  },
  engagementLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#A0A0A0',
  },
});

export default InteractionPhotosScreen;