import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProductCardProps {
  producto: {
    id: string;
    nombre: string;
    precio: number;
    imagen: string;
    likes?: string[];
    guardados?: string[];
  };
  onPress: (producto: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ producto, onPress }) => {
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  return (
    <Pressable 
      style={styles.container}
      onPress={() => onPress(producto)}
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      {/* Imagen del producto */}
      <Image 
        source={{ 
          uri: imageError ? 'https://via.placeholder.com/175x210' : producto.imagen 
        }}
        style={styles.imagenProducto}
        onError={() => setImageError(true)}
        resizeMode="cover"
      />
      
      {/* Información del producto */}
      <View style={styles.infoContainer}>
        <View style={styles.textoContainer}>
          <Text style={styles.nombreProducto} numberOfLines={2}>
            {producto.nombre}
          </Text>
          
          <Text style={styles.precioProducto}>
            {formatPrice(producto.precio)}
          </Text>
        </View>
        
        {/* Botones de acción */}
        <View style={styles.accionesContainer}>
          {/* Botón Guardar */}
          <TouchableOpacity 
            style={styles.botonAccion}
            onPress={handleSave}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          >
            <Ionicons 
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={21}
              color="#FFFFFF"
              style={styles.iconoAccion}
            />
          </TouchableOpacity>
          
          {/* Botón Like */}
          <TouchableOpacity 
            style={styles.botonAccion}
            onPress={handleLike}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          >
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"}
              size={21}
              color="#FFFFFF"
              style={styles.iconoAccion}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 175, // Exacto del CSS
    height: 275,
    marginBottom: 17, // Gap del CSS
  },
  imagenProducto: {
    width: '100%',
    height: '76.36%', // 100% - 23.64% del CSS
    borderRadius: 20,
    backgroundColor: '#333', // Placeholder mientras carga
  },
  infoContainer: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  textoContainer: {
    flex: 1,
  },
  nombreProducto: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 15, // Exacto del CSS
    color: '#FFFFFF',
    marginBottom: 4,
  },
  precioProducto: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21, // Exacto del CSS
    color: 'rgba(255, 255, 255, 0.5)', // Exacto del CSS
  },
  accionesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    paddingTop: 4,
  },
  botonAccion: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconoAccion: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default ProductCard;