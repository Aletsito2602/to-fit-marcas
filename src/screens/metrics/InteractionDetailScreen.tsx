import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundPattern from '../../components/BackgroundPattern';
import Header from '../../components/Header';

const { width: screenWidth } = Dimensions.get('window');

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

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

interface MetricData {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const InteractionDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeTab, setActiveTab] = useState('Métricas');
  
  // Mock data - en una app real vendría de los parámetros de navegación
  const photoData: PhotoData = {
    id: 1,
    image: 'https://via.placeholder.com/400x400/FF69B4/fff?text=Post',
    likes: 1250,
    comments: 89,
    shares: 45,
    engagement: 6.8,
    date: '22 Jul 2025',
    caption: 'Nuevo outfit de verano con @tofit 🌞 ¡Me encanta cómo combinan estos colores! #moda #style #outfit #tofit #verano'
  };

  const tabs = ['Métricas', 'Comentarios', 'Insights'];

  const metricsData: MetricData[] = [
    { label: 'Alcance', value: '18.4k', change: '+12%', isPositive: true },
    { label: 'Impresiones', value: '24.7k', change: '+8%', isPositive: true },
    { label: 'Clics', value: '892', change: '+15%', isPositive: true },
    { label: 'Guardados', value: '156', change: '-3%', isPositive: false },
    { label: 'Compartidos', value: '45', change: '+25%', isPositive: true },
    { label: 'Rate de Engagement', value: '6.8%', change: '+2.1%', isPositive: true },
  ];

  const commentsData: Comment[] = [
    {
      id: 1,
      user: 'maria_style',
      avatar: 'https://via.placeholder.com/40x40/A98FFF/fff?text=M',
      text: '¡Me encanta este look! ¿Dónde puedo conseguir esa blusa?',
      time: '2h',
      likes: 12
    },
    {
      id: 2,
      user: 'fashion_lover23',
      avatar: 'https://via.placeholder.com/40x40/FF69B4/fff?text=F',
      text: 'Los colores están perfectos 💕 Definitivamente voy a intentar algo similar',
      time: '4h',
      likes: 8
    },
    {
      id: 3,
      user: 'ana_boutique',
      avatar: 'https://via.placeholder.com/40x40/00B894/fff?text=A',
      text: 'Excelente combinación! Tu estilo siempre me inspira 🔥',
      time: '6h',
      likes: 5
    },
    {
      id: 4,
      user: 'style_guru',
      avatar: 'https://via.placeholder.com/40x40/FFA726/fff?text=S',
      text: '¿Podrías hacer un tutorial de cómo combinar estos colores?',
      time: '8h',
      likes: 15
    },
  ];

  const insightsData = [
    { label: 'Mejor hora de publicación', value: '18:30 - 20:00', icon: 'time-outline' },
    { label: 'Audiencia más activa', value: 'Mujeres 18-34 años', icon: 'people-outline' },
    { label: 'Ubicación principal', value: 'Buenos Aires, AR', icon: 'location-outline' },
    { label: 'Hashtag más efectivo', value: '#outfit (+180 likes)', icon: 'pricetag-outline' },
    { label: 'Tipo de contenido', value: 'Foto simple', icon: 'image-outline' },
    { label: 'Duración en feed', value: '2.4 segundos promedio', icon: 'eye-outline' },
  ];

  const renderTabButton = (tab: string) => (
    <TouchableOpacity
      key={tab}
      style={[
        styles.tabButton,
        activeTab === tab && styles.activeTabButton
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text
        style={[
          styles.tabButtonText,
          activeTab === tab && styles.activeTabButtonText
        ]}
      >
        {tab}
      </Text>
    </TouchableOpacity>
  );

  const renderMetricsTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Métricas principales */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Métricas de Rendimiento</Text>
          <View style={styles.metricsGrid}>
            {metricsData.map((metric, index) => (
              <View key={index} style={styles.metricItem}>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <View style={styles.metricChange}>
                  <Ionicons 
                    name={metric.isPositive ? 'trending-up' : 'trending-down'} 
                    size={14} 
                    color={metric.isPositive ? '#00B894' : '#FF7675'} 
                  />
                  <Text style={[
                    styles.metricChangeText,
                    { color: metric.isPositive ? '#00B894' : '#FF7675' }
                  ]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* Gráfico de engagement por hora */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Engagement por Hora</Text>
          <View style={styles.chartContainer}>
            <View style={styles.hourlyChart}>
              {[12, 8, 15, 22, 45, 67, 89, 95, 78, 56, 34, 23].map((value, index) => (
                <View key={index} style={styles.hourlyBar}>
                  <View style={[styles.hourlyBarFill, { height: `${value}%` }]} />
                  <Text style={styles.hourlyLabel}>{6 + index * 2}h</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Comparación con posts anteriores */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Comparación con Promedio</Text>
          <View style={styles.comparisonContainer}>
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>Este post</Text>
              <Text style={styles.comparisonValue}>6.8% engagement</Text>
              <Text style={styles.comparisonSubtitle}>1,384 interacciones</Text>
            </View>
            <View style={styles.comparisonDivider} />
            <View style={styles.comparisonItem}>
              <Text style={styles.comparisonLabel}>Tu promedio</Text>
              <Text style={styles.comparisonValue}>4.2% engagement</Text>
              <Text style={styles.comparisonSubtitle}>892 interacciones</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );

  const renderCommentsTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Comentarios Destacados</Text>
          {commentsData.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUser}>@{comment.user}</Text>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                </View>
                <Text style={styles.commentText}>{comment.text}</Text>
                <View style={styles.commentFooter}>
                  <TouchableOpacity style={styles.commentLike}>
                    <Ionicons name="heart-outline" size={14} color="#A0A0A0" />
                    <Text style={styles.commentLikeCount}>{comment.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.commentReply}>
                    <Text style={styles.commentReplyText}>Responder</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </LinearGradient>
    </ScrollView>
  );

  const renderInsightsTab = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Insights de la Publicación</Text>
          {insightsData.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <Ionicons name={insight.icon as any} size={20} color="#A98FFF" />
              <View style={styles.insightContent}>
                <Text style={styles.insightLabel}>{insight.label}</Text>
                <Text style={styles.insightValue}>{insight.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Recomendaciones */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
        style={styles.gradientBorder}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recomendaciones</Text>
          <View style={styles.recommendationItem}>
            <Ionicons name="bulb-outline" size={18} color="#FFD700" />
            <Text style={styles.recommendationText}>
              Publica contenido similar entre las 18:30-20:00 para maximizar el engagement
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Ionicons name="trending-up-outline" size={18} color="#00B894" />
            <Text style={styles.recommendationText}>
              El hashtag #outfit tuvo excelente performance. Úsalo en futuros posts
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Ionicons name="people-outline" size={18} color="#A98FFF" />
            <Text style={styles.recommendationText}>
              Tu audiencia femenina joven es muy activa. Crea más contenido dirigido a este segmento
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );

  const getCurrentTabContent = () => {
    switch (activeTab) {
      case 'Métricas':
        return renderMetricsTab();
      case 'Comentarios':
        return renderCommentsTab();
      case 'Insights':
        return renderInsightsTab();
      default:
        return renderMetricsTab();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header con imagen */}
        <View style={styles.photoHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Image source={{ uri: photoData.image }} style={styles.postImage} />
        </View>

        {/* Información básica del post */}
        <View style={styles.postInfo}>
          <Text style={styles.postCaption}>{photoData.caption}</Text>
          <Text style={styles.postDate}>{photoData.date}</Text>
          
          {/* Stats principales */}
          <View style={styles.mainStats}>
            <View style={styles.mainStat}>
              <Ionicons name="heart" size={20} color="#FF69B4" />
              <Text style={styles.mainStatNumber}>{photoData.likes}</Text>
            </View>
            <View style={styles.mainStat}>
              <Ionicons name="chatbubble" size={20} color="#A98FFF" />
              <Text style={styles.mainStatNumber}>{photoData.comments}</Text>
            </View>
            <View style={styles.mainStat}>
              <Ionicons name="share-social" size={20} color="#00B894" />
              <Text style={styles.mainStatNumber}>{photoData.shares}</Text>
            </View>
            <View style={styles.engagementStat}>
              <Text style={styles.engagementValue}>{photoData.engagement}%</Text>
              <Text style={styles.engagementLabel}>Engagement</Text>
            </View>
          </View>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabContainer}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContent}
          >
            {tabs.map(renderTabButton)}
          </ScrollView>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContentContainer}>
          {getCurrentTabContent()}
        </View>
      </ScrollView>
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
  photoHeader: {
    position: 'relative',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 25,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  postImage: {
    width: screenWidth,
    height: screenWidth,
    backgroundColor: '#333333',
  },
  postInfo: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  postCaption: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 8,
  },
  postDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 16,
  },
  mainStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  mainStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mainStatNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  engagementStat: {
    marginLeft: 'auto',
    alignItems: 'center',
  },
  engagementValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#00B894',
  },
  engagementLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#A0A0A0',
  },
  tabContainer: {
    backgroundColor: '#2A2A2A',
    paddingVertical: 16,
    marginBottom: 20,
  },
  tabScrollContent: {
    paddingHorizontal: 25,
    gap: 8,
  },
  tabButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  activeTabButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  tabContentContainer: {
    paddingHorizontal: 25,
    paddingBottom: 50,
  },
  gradientBorder: {
    borderRadius: 16,
    padding: 2,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  // Metrics styles
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 12,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChangeText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  chartContainer: {
    marginTop: 16,
  },
  hourlyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
    paddingBottom: 20,
  },
  hourlyBar: {
    alignItems: 'center',
    flex: 1,
  },
  hourlyBarFill: {
    width: 8,
    backgroundColor: '#FF69B4',
    borderRadius: 4,
    marginBottom: 8,
  },
  hourlyLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  comparisonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  comparisonItem: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 8,
  },
  comparisonValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  comparisonSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
  },
  comparisonDivider: {
    width: 1,
    backgroundColor: '#666666',
    marginHorizontal: 16,
  },
  // Comments styles
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUser: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  commentText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: 8,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  commentLike: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentLikeCount: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  commentReply: {},
  commentReplyText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#007AFF',
  },
  // Insights styles
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  insightContent: {
    flex: 1,
    marginLeft: 12,
  },
  insightLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  insightValue: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#CCCCCC',
    lineHeight: 20,
    marginLeft: 12,
  },
});

export default InteractionDetailScreen;