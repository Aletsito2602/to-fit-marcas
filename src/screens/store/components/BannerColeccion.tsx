import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ImageBackground,
  StyleSheet
} from 'react-native';

interface ColeccionEspecial {
  id: string;
  titulo: string;
  descripcion: string;
  imagen_banner: string;
  activa: boolean;
}

interface BannerColeccionProps {
  coleccion: ColeccionEspecial | null;
  onPress: () => void;
}

const BannerColeccion: React.FC<BannerColeccionProps> = ({ coleccion, onPress }) => {
  if (!coleccion) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.bannerContainer}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <ImageBackground 
          source={{ uri: coleccion.imagen_banner }}
          style={styles.bannerImagen}
          imageStyle={styles.bannerImageStyle}
        >
          {/* Overlay con información */}
          <View style={styles.overlayInfo}>
            <View style={styles.infoContainer}>
              <Text style={styles.tituloColeccion}>
                {coleccion.titulo}
              </Text>
              
              <TouchableOpacity 
                style={styles.botonVerColeccion}
                onPress={onPress}
              >
                <Text style={styles.textoBoton}>
                  Ver Colección
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200, // Exacto del CSS
    paddingHorizontal: 11,
    marginVertical: 20,
  },
  bannerContainer: {
    width: '100%',
    height: '100%',
  },
  bannerImagen: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bannerImageStyle: {
    borderRadius: 12, // Exacto del CSS
  },
  overlayInfo: {
    width: '90%', // 352px de 390px
    height: 70, // Exacto del CSS
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Exacto del CSS
    borderRadius: 8,
    marginHorizontal: '5%',
    marginBottom: 15,
    justifyContent: 'space-between',
    padding: 14,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tituloColeccion: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27, // Exacto del CSS
    color: '#FFFFFF',
  },
  botonVerColeccion: {
    width: 150, // Exacto del CSS
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBoton: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22, // Exacto del CSS
    color: '#000000',
  },
});

export default BannerColeccion;