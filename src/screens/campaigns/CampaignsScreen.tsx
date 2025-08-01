import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';
import CampaignDetailModal from './components/CampaignDetailModal';
import { useCampaigns } from '../../hooks/useCampaigns';
import { FirebaseCampaign } from '../../services/campaignsService';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

interface CampaignCardProps {
  campaign: FirebaseCampaign;
  onViewDetails: (campaign: FirebaseCampaign) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onViewDetails }) => {
  const handleVerDetalles = () => {
    onViewDetails(campaign);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleVerDetalles}>
      <Image source={{ uri: campaign.imagen }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.brandName}>{campaign.marca}</Text>
        <Text style={styles.commission}>Comisión {campaign.comision}</Text>
        <TouchableOpacity style={styles.detailsButton} onPress={handleVerDetalles}>
          <Text style={styles.detailsButtonText}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const CampaignsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { campaigns, loading, error } = useCampaigns();
  const [searchText, setSearchText] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<FirebaseCampaign | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Filter campaigns based on search text
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.marca.toLowerCase().includes(searchText.toLowerCase()) ||
    campaign.descripcion?.toLowerCase().includes(searchText.toLowerCase()) ||
    campaign.nombreCampañante.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddCampaign = () => {
    navigation.navigate('AddCampaign' as never);
  };

  const handleViewDetails = (campaign: FirebaseCampaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCampaign(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      <Header />

      <View style={styles.content}>
        {/* Header con botón Añadir */}
        <View style={styles.header}>
          <Text style={styles.title}>Campañas</Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddCampaign}>
            <Text style={styles.addButtonText}>Añadir campaña</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor="#A0A0A0"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Loading, Error, or Grid de campañas */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Cargando campañas...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={filteredCampaigns}
            numColumns={2}
            keyExtractor={(item) => item.id || Math.random().toString()}
            renderItem={({ item }) => (
              <CampaignCard 
                campaign={item} 
                onViewDetails={handleViewDetails}
              />
            )}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay campañas disponibles</Text>
                <Text style={styles.emptySubtext}>Crea tu primera campaña para comenzar</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Modal de detalles */}
      <CampaignDetailModal
        visible={showModal}
        campaign={selectedCampaign}
        onClose={handleCloseModal}
      />
      
      <BottomTabBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
  },
  content: {
    flex: 1,
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 25,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    margin: 8,
    width: cardWidth,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  cardImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#333333',
  },
  cardContent: {
    padding: 12,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commission: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 12,
  },
  detailsButton: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Poppins-Regular',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  emptySubtext: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
});

export default CampaignsScreen;