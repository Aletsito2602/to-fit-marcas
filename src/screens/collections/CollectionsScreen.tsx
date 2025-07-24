import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';
import NewCollectionModal, { CollectionData } from './components/NewCollectionModal';

const CollectionsScreen: React.FC = () => {
  const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
  const [collections, setCollections] = useState([
    {
      id: '1',
      name: 'Verano 2025',
      products: 24,
      image: 'https://via.placeholder.com/150',
      status: 'active',
    },
    {
      id: '2',
      name: 'Invierno 2024',
      products: 18,
      image: 'https://via.placeholder.com/150/FF6B6B',
      status: 'active',
    },
    {
      id: '3',
      name: 'Black Friday',
      products: 35,
      image: 'https://via.placeholder.com/150/4ECDC4',
      status: 'archived',
    },
  ]);

  const handleNewCollection = (collectionData: CollectionData) => {
    const newCollection = {
      id: Date.now().toString(),
      name: collectionData.name,
      products: 0,
      image: collectionData.image,
      status: collectionData.status,
      description: collectionData.description,
    };

    setCollections(prev => [newCollection, ...prev]);
    Alert.alert('Éxito', 'Colección creada correctamente');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Colecciones</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowNewCollectionModal(true)}
          >
            <Text style={styles.addButtonText}>Nueva colección</Text>
          </TouchableOpacity>
        </View>

        {/* Collections List */}
        {collections.map((collection) => (
          <TouchableOpacity key={collection.id} style={styles.collectionCard}>
            <Image source={{ uri: collection.image }} style={styles.collectionImage} />
            
            <View style={styles.collectionInfo}>
              <View style={styles.collectionHeader}>
                <Text style={styles.collectionName}>{collection.name}</Text>
                <View style={[
                  styles.statusBadge,
                  collection.status === 'active' ? styles.activeBadge : styles.archivedBadge
                ]}>
                  <Text style={[
                    styles.statusText,
                    collection.status === 'active' ? styles.activeText : styles.archivedText
                  ]}>
                    {collection.status === 'active' ? 'Activa' : 'Archivada'}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.productCount}>
                {collection.products} productos
              </Text>
              
              <View style={styles.collectionActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="eye-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.actionText}>Ver</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="create-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-vertical" size={20} color="#A0A0A0" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {/* Empty State */}
        <View style={styles.emptyState}>
          <Ionicons name="albums-outline" size={48} color="#666666" />
          <Text style={styles.emptyTitle}>Organiza tus productos</Text>
          <Text style={styles.emptyDescription}>
            Las colecciones te ayudan a agrupar productos por temporada, categoría o promoción
          </Text>
        </View>
      </ScrollView>
      
      <BottomTabBar />

      {/* New Collection Modal */}
      <NewCollectionModal
        visible={showNewCollectionModal}
        onClose={() => setShowNewCollectionModal(false)}
        onSave={handleNewCollection}
      />
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
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  collectionCard: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
  collectionImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#333333',
    marginRight: 15,
  },
  collectionInfo: {
    flex: 1,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  collectionName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#4ADE80',
  },
  archivedBadge: {
    backgroundColor: '#6B7280',
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  activeText: {
    color: '#000000',
  },
  archivedText: {
    color: '#FFFFFF',
  },
  productCount: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 8,
  },
  collectionActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  moreButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default CollectionsScreen;