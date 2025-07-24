import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground,
  StyleSheet
} from 'react-native';

interface Categoria {
  id: string;
  nombre: string;
  imagen: string;
  orden: number;
  activa: boolean;
}

interface CategoriasScrollProps {
  categorias: Categoria[];
  onCategoriaPress: (categoria: Categoria) => void;
}

const CategoriasScroll: React.FC<CategoriasScrollProps> = ({ categorias, onCategoriaPress }) => {
  if (!categorias || categorias.length === 0) return null;

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={95 + 6} // Ancho de categoria + gap
        snapToAlignment="start"
      >
        {categorias.map((categoria, index) => (
          <CategoriaItem 
            key={categoria.id || index}
            categoria={categoria}
            onPress={() => onCategoriaPress(categoria)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface CategoriaItemProps {
  categoria: Categoria;
  onPress: () => void;
}

const CategoriaItem: React.FC<CategoriaItemProps> = ({ categoria, onPress }) => (
  <TouchableOpacity 
    style={styles.categoriaContainer}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <ImageBackground 
      source={{ uri: categoria.imagen }}
      style={styles.categoriaImagen}
      imageStyle={styles.categoriaImageStyle}
    >
      {/* Overlay blur exacto del CSS */}
      <View style={styles.overlay}>
        <Text style={styles.categoriaNombre}>
          {categoria.nombre}
        </Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 70, // Exacto del CSS
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 14,
    gap: 6, // Exacto del CSS
  },
  categoriaContainer: {
    width: 95, // Exacto del CSS
    height: 70,
  },
  categoriaImagen: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriaImageStyle: {
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Exacto del CSS
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // Simular backdrop-filter: blur(0.5px) con opacity
  },
  categoriaNombre: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 25, // Exacto del CSS
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});

export default CategoriasScroll;