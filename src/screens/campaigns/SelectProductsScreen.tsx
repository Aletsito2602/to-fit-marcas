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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import SuccessModal from './components/SuccessModal';

interface Product {
  id: number;
  nombre: string;
  cantidad: number;
  categoria: string;
  tagColor: string;
  imagen: string;
  selected: boolean;
}

interface ProductItemProps {
  product: Product;
  onToggle: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onToggle }) => {
  return (
    <TouchableOpacity style={styles.productItem} onPress={onToggle}>
      <View style={[
        styles.checkbox, 
        product.selected ? styles.checkboxSelected : styles.checkboxUnselected
      ]}>
        {product.selected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
      </View>
      
      <Image source={{ uri: product.imagen }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.nombre}</Text>
        <Text style={styles.productQuantity}>Cantidad: {product.cantidad}</Text>
      </View>
      
      <View style={[styles.tag, { backgroundColor: product.tagColor }]}>
        <Text style={styles.tagText}>{product.categoria}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SelectProductsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      nombre: "Zapatillas running",
      cantidad: 32,
      categoria: "Deporte",
      tagColor: "#FFD700",
      imagen: "https://via.placeholder.com/40x40/333/fff?text=👟",
      selected: true
    },
    {
      id: 2,
      nombre: "Polo",
      cantidad: 2,
      categoria: "Deporte",
      tagColor: "#FFD700",
      imagen: "https://via.placeholder.com/40x40/333/fff?text=👕",
      selected: false
    },
    {
      id: 3,
      nombre: "Polera",
      cantidad: 3,
      categoria: "Invierno",
      tagColor: "#4A90E2",
      imagen: "https://via.placeholder.com/40x40/333/fff?text=🧥",
      selected: false
    },
    {
      id: 4,
      nombre: "Polera de algodón",
      cantidad: 3,
      categoria: "Invierno",
      tagColor: "#4A90E2",
      imagen: "https://via.placeholder.com/40x40/333/fff?text=🧥",
      selected: false
    },
    {
      id: 5,
      nombre: "Polo deportivo",
      cantidad: 2,
      categoria: "Deporte",
      tagColor: "#FFD700",
      imagen: "https://via.placeholder.com/40x40/333/fff?text=👕",
      selected: false
    }
  ]);

  const toggleProduct = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, selected: !product.selected }
        : product
    ));
  };

  const handleCrearCampaña = () => {
    setShowSuccessModal(true);
  };

  const handleCancelar = () => {
    navigation.navigate('Campaigns' as never);
  };

  const handleCreateAnother = () => {
    setShowSuccessModal(false);
    navigation.navigate('AddCampaign' as never);
  };

  const handleGoToCampaigns = () => {
    setShowSuccessModal(false);
    navigation.navigate('Campaigns' as never);
  };

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      
      <Header />

      <View style={styles.content}>
        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Añadir campaña</Text>
        </View>

        {/* Subtítulo */}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Seleccionar productos</Text>
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

        {/* Lista de productos */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem 
              product={item} 
              onToggle={() => toggleProduct(item.id)} 
            />
          )}
          showsVerticalScrollIndicator={false}
          style={styles.productsList}
        />

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton} onPress={handleCrearCampaña}>
            <Text style={styles.createButtonText}>Crear campaña</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de éxito */}
        <SuccessModal 
          visible={showSuccessModal}
          onCreateAnother={handleCreateAnother}
          onGoToCampaigns={handleGoToCampaigns}
        />
      </View>
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
  titleContainer: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  subtitleContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  subtitle: {
    color: '#A0A0A0',
    fontSize: 14,
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
  productsList: {
    flex: 1,
    paddingHorizontal: 25,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#333333',
    borderBottomWidth: 0.5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4A90E2',
  },
  checkboxUnselected: {
    borderColor: '#A0A0A0',
    borderWidth: 1,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#333333',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  productQuantity: {
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 2,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  createButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SelectProductsScreen;