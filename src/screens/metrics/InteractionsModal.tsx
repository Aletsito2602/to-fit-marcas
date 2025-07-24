import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../navigation/DrawerNavigator';
import TabIcon from '../../components/TabIcon';
import BackgroundPattern from '../../components/BackgroundPattern';

interface Post {
  id: number;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  engagement: number;
  date: string;
  type: 'photo' | 'video' | 'carousel';
}

interface InteractionsModalProps {
  visible: boolean;
  onClose: () => void;
}

type InteractionsModalNavigationProp = DrawerNavigationProp<DrawerParamList>;

// TAB 1: POSTS (Grid de publicaciones)
const PostsTab = () => {
  const posts: Post[] = [
    {
      id: 1,
      image: 'https://via.placeholder.com/300x300/FF69B4/fff?text=1',
      caption: 'Nuevo outfit de verano con @tofit 🌞',
      likes: 1250,
      comments: 89,
      shares: 45,
      engagement: 6.8,
      date: '22 Jul',
      type: 'photo'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/300x300/A98FFF/fff?text=2',
      caption: 'Look casual para el fin de semana',
      likes: 980,
      comments: 67,
      shares: 32,
      engagement: 5.4,
      date: '21 Jul',
      type: 'video'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/300x300/00B894/fff?text=3',
      caption: 'Tendencia: colores vibrantes',
      likes: 875,
      comments: 54,
      shares: 28,
      engagement: 4.9,
      date: '20 Jul',
      type: 'carousel'
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/300x300/FFA726/fff?text=4',
      caption: 'Accesorios que marcan la diferencia',
      likes: 756,
      comments: 43,
      shares: 21,
      engagement: 4.2,
      date: '19 Jul',
      type: 'photo'
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/300x300/FF5722/fff?text=5',
      caption: 'Estilo minimalista pero elegante',
      likes: 634,
      comments: 38,
      shares: 19,
      engagement: 3.8,
      date: '18 Jul',
      type: 'video'
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/300x300/9C27B0/fff?text=6',
      caption: 'Comodidad y estilo en uno',
      likes: 567,
      comments: 32,
      shares: 15,
      engagement: 3.4,
      date: '17 Jul',
      type: 'photo'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return 'play-circle';
      case 'carousel':
        return 'albums';
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.postsGrid}>
        {posts.map(post => (
          <TouchableOpacity key={post.id} style={styles.postCard}>
            <View style={styles.postImageContainer}>
              <Image source={{uri: post.image}} style={styles.postImage} />
              {getTypeIcon(post.type) && (
                <View style={styles.postTypeIcon}>
                  <Ionicons name={getTypeIcon(post.type) as any} size={20} color="#FFFFFF" />
                </View>
              )}
              <View style={styles.engagementBadge}>
                <Text style={styles.engagementText}>{post.engagement}%</Text>
              </View>
            </View>
            <View style={styles.postInfo}>
              <Text style={styles.postCaption} numberOfLines={2}>{post.caption}</Text>
              <Text style={styles.postDate}>{post.date}</Text>
              <View style={styles.postStats}>
                <View style={styles.postStat}>
                  <Ionicons name="heart" size={14} color="#FF69B4" />
                  <Text style={styles.postStatNumber}>{post.likes}</Text>
                </View>
                <View style={styles.postStat}>
                  <Ionicons name="chatbubble" size={14} color="#A98FFF" />
                  <Text style={styles.postStatNumber}>{post.comments}</Text>
                </View>
                <View style={styles.postStat}>
                  <Ionicons name="share-social" size={14} color="#00B894" />
                  <Text style={styles.postStatNumber}>{post.shares}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// TAB 2: ESTADÍSTICAS
const EstadisticasTab = () => {
  const stats = {
    totalPosts: 156,
    totalLikes: 12450,
    totalComments: 892,
    totalShares: 234,
    avgEngagement: 4.7,
    topHashtags: ['#moda', '#style', '#outfit', '#tofit', '#fashion'],
    bestTime: '18:30 - 20:00',
    bestDay: 'Miércoles',
  };

  return (
    <ScrollView style={styles.tabContent}>
      {/* Resumen general */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Resumen General</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalPosts}</Text>
            <Text style={styles.statLabel}>Posts Totales</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalLikes.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Likes Totales</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalComments}</Text>
            <Text style={styles.statLabel}>Comentarios</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalShares}</Text>
            <Text style={styles.statLabel}>Compartidos</Text>
          </View>
        </View>
      </View>

      {/* Engagement promedio */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Engagement Promedio</Text>
        <View style={styles.engagementDisplay}>
          <Text style={styles.engagementValue}>{stats.avgEngagement}%</Text>
          <Text style={styles.engagementSubtext}>vs. 3.2% del mes anterior</Text>
        </View>
      </View>

      {/* Mejores hashtags */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Hashtags Más Efectivos</Text>
        <View style={styles.hashtagsContainer}>
          {stats.topHashtags.map((hashtag, index) => (
            <View key={hashtag} style={[styles.hashtagItem, { 
              backgroundColor: index === 0 ? '#FF69B4' : index === 1 ? '#A98FFF' : '#666666'
            }]}>
              <Text style={styles.hashtagText}>{hashtag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Mejores horarios */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Mejor Momento para Publicar</Text>
        <View style={styles.timingInfo}>
          <View style={styles.timingItem}>
            <Ionicons name="time-outline" size={20} color="#FF69B4" />
            <Text style={styles.timingText}>{stats.bestTime}</Text>
          </View>
          <View style={styles.timingItem}>
            <Ionicons name="calendar-outline" size={20} color="#A98FFF" />
            <Text style={styles.timingText}>{stats.bestDay}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

// TAB 3: INSIGHTS
const InsightsTab = () => {
  const insights = [
    {
      title: 'Audiencia Principal',
      description: 'Mujeres de 18-34 años representan el 68% de tu audiencia',
      icon: 'people-outline',
      color: '#FF69B4'
    },
    {
      title: 'Contenido Más Exitoso',
      description: 'Los videos tienen 2.3x más engagement que las fotos',
      icon: 'play-outline',
      color: '#A98FFF'
    },
    {
      title: 'Crecimiento de Seguidores',
      description: '+12% de crecimiento este mes vs. el anterior',
      icon: 'trending-up-outline',
      color: '#00B894'
    },
    {
      title: 'Ubicación Principal',
      description: 'Buenos Aires genera el 45% de tus interacciones',
      icon: 'location-outline',
      color: '#FFA726'
    },
    {
      title: 'Tendencia Semanal',
      description: 'Miércoles y viernes son tus mejores días',
      icon: 'bar-chart-outline',
      color: '#FF5722'
    }
  ];

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.insightsContainer}>
        {insights.map((insight, index) => (
          <View key={index} style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Ionicons name={insight.icon as any} size={24} color={insight.color} />
              <Text style={styles.insightTitle}>{insight.title}</Text>
            </View>
            <Text style={styles.insightDescription}>{insight.description}</Text>
          </View>
        ))}
      </View>

      {/* Recomendaciones */}
      <View style={styles.recommendationsSection}>
        <Text style={styles.sectionTitle}>Recomendaciones</Text>
        <View style={styles.recommendationCard}>
          <Ionicons name="bulb-outline" size={18} color="#FFD700" />
          <Text style={styles.recommendationText}>
            Publica más videos para aumentar tu engagement promedio
          </Text>
        </View>
        <View style={styles.recommendationCard}>
          <Ionicons name="time-outline" size={18} color="#FF69B4" />
          <Text style={styles.recommendationText}>
            Programa tus posts entre 18:30-20:00 para mejor alcance
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// MODAL BOTTOM TAB BAR COMPONENT (igual al de campañas)
const ModalBottomTabBar: React.FC<{onClose: () => void}> = ({onClose}) => {
  const navigation = useNavigation<InteractionsModalNavigationProp>();

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home' as const, route: 'MainTabs', screen: 'Home' },
    { key: 'orders', label: 'Pedidos', icon: 'orders' as const, route: 'MainTabs', screen: 'Orders' },
    { key: 'camera', label: 'Cámara', icon: 'camera' as const, route: 'MainTabs', screen: 'Camera' },
    { key: 'products', label: 'Productos', icon: 'products' as const, route: 'MainTabs', screen: 'Products' },
    { key: 'metrics', label: 'Métricas', icon: 'metrics' as const, route: 'Metrics' },
  ];

  const handleTabPress = (route: string, screen?: string) => {
    onClose(); // Cerrar modal primero
    if (screen) {
      navigation.navigate(route as any, { screen });
    } else {
      navigation.navigate(route as any);
    }
  };

  return (
    <View style={styles.bottomTabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.bottomTabButton}
          onPress={() => handleTabPress(tab.route, tab.screen)}
          activeOpacity={0.7}
        >
          <View style={styles.bottomTabIconContainer}>
            <TabIcon name={tab.icon} focused={false} size={20} />
          </View>
          <Text style={styles.bottomTabLabel}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// COMPONENTE PRINCIPAL
const InteractionsModal: React.FC<InteractionsModalProps> = ({
  visible,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('Posts');
  
  const tabs = [
    { name: 'Posts', component: PostsTab },
    { name: 'Estadísticas', component: EstadisticasTab },
    { name: 'Insights', component: InsightsTab },
  ];

  const renderTabButton = (tab: any) => (
    <TouchableOpacity
      key={tab.name}
      style={[
        styles.tabButton,
        activeTab === tab.name && styles.activeTabButton
      ]}
      onPress={() => setActiveTab(tab.name)}
    >
      <Text
        style={[
          styles.tabButtonText,
          activeTab === tab.name && styles.activeTabButtonText
        ]}
      >
        {tab.name}
      </Text>
    </TouchableOpacity>
  );

  const getCurrentTabComponent = () => {
    const currentTab = tabs.find(tab => tab.name === activeTab);
    if (!currentTab) return <PostsTab />;
    
    const TabComponent = currentTab.component;
    return <TabComponent />;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
    >
      <SafeAreaView style={styles.modalContainer}>
        <BackgroundPattern opacity={0.06} />
        
        {/* Header consistente con la app */}
        <View style={styles.modalHeader}>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.centerContainer}>
            <Text style={styles.modalTitle}>Interacciones</Text>
          </View>
          
          <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero section con stats generales */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Posts de la Marca</Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>156</Text>
              <Text style={styles.heroStatLabel}>Posts</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>12.4k</Text>
              <Text style={styles.heroStatLabel}>Likes</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatNumber}>4.7%</Text>
              <Text style={styles.heroStatLabel}>Engagement</Text>
            </View>
          </View>
        </View>

        {/* Custom Tab Bar */}
        <View style={styles.tabContainer}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContent}
            style={styles.tabScrollView}
          >
            {tabs.map(renderTabButton)}
          </ScrollView>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContentContainer}>
          {getCurrentTabComponent()}
        </View>

        {/* Bottom Navigation */}
        <ModalBottomTabBar onClose={onClose} />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Modal container
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
  },

  // Modal Header (consistente con Header principal)
  modalHeader: {
    height: 60,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  backButton: {
    padding: 4,
  },

  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  menuButton: {
    padding: 4,
  },

  // Hero section
  heroSection: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  heroStatItem: {
    alignItems: 'center',
  },

  heroStatNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },

  heroStatLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },

  // Custom Tab Bar
  tabContainer: {
    backgroundColor: 'rgba(41, 41, 41, 1)',
    borderBottomColor: '#333333',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },

  tabScrollView: {
    paddingHorizontal: 16,
  },

  tabScrollContent: {
    paddingRight: 16,
    gap: 8,
  },

  tabButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTabButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },

  tabButtonText: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '500',
  },

  activeTabButtonText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },

  tabContentContainer: {
    flex: 1,
  },

  // Tab content
  tabContent: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
    padding: 16,
  },

  // Posts tab
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  postCard: {
    width: '48%',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },

  postImageContainer: {
    position: 'relative',
  },

  postImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#333333',
  },

  postTypeIcon: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 4,
  },

  engagementBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#00B894',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  engagementText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },

  postInfo: {
    padding: 12,
  },

  postCaption: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
    lineHeight: 16,
  },

  postDate: {
    color: '#A0A0A0',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },

  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  postStatNumber: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },

  // Estadísticas tab
  statsSection: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statItem: {
    width: '48%',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },

  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },

  statLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },

  engagementDisplay: {
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 20,
  },

  engagementValue: {
    color: '#00B894',
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },

  engagementSubtext: {
    color: '#A0A0A0',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },

  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  hashtagItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  hashtagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },

  timingInfo: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
  },

  timingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  timingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginLeft: 12,
  },

  // Insights tab
  insightsContainer: {
    marginBottom: 24,
  },

  insightCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },

  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  insightTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    marginLeft: 12,
  },

  insightDescription: {
    color: '#A0A0A0',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
  },

  recommendationsSection: {
    marginBottom: 24,
  },

  recommendationCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  recommendationText: {
    flex: 1,
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginLeft: 12,
    lineHeight: 18,
  },

  // Modal Bottom Tab Bar (igual al de campañas)
  bottomTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderTopWidth: 0,
    height: 80,
    paddingBottom: 12,
    paddingTop: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  
  bottomTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  bottomTabIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 50,
    marginTop: -2,
  },
  
  bottomTabLabel: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    marginTop: 2,
    color: 'rgba(157, 157, 157, 1)',
  },
});

export default InteractionsModal;