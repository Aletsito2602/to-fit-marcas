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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';
import CampaignDetailModal from './components/CampaignDetailModal';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

interface Campaign {
  id: number;
  marca: string;
  comision: string;
  imagen: string;
  descripcion?: string;
}

interface CampaignCardProps {
  campaign: Campaign;
  onViewDetails: (campaign: Campaign) => void;
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
  const [searchText, setSearchText] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Datos de ejemplo
  const campaignsData: Campaign[] = [
    {
      id: 1,
      marca: "Complor",
      comision: "$18 USD/10%",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=Complor"
    },
    {
      id: 2,
      marca: "Calvin Klein",
      comision: "$12.6 USD/12%",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=CK"
    },
    {
      id: 3,
      marca: "Xlavida",
      comision: "$9.9 USD/10%",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=Xlavida"
    },
    {
      id: 4,
      marca: "Vanidad",
      comision: "$10 USD/5%",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=Vanidad"
    },
    {
      id: 5,
      marca: "Sport Elite",
      comision: "$15 USD/8%",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=Sport"
    },
    {
      id: 6,
      marca: "Fashion Pro",
      comision: "$20 USD/15%",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=Fashion"
    }
  ];

  const handleAddCampaign = () => {
    navigation.navigate('AddCampaign' as never);
  };

  const handleViewDetails = (campaign: Campaign) => {
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

        {/* Grid de campañas */}
        <FlatList
          data={campaignsData}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CampaignCard 
              campaign={item} 
              onViewDetails={handleViewDetails}
            />
          )}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
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
});

export default CampaignsScreen;