import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ImageBackground,
  StyleSheet 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TiendaData } from '../../../hooks/useTiendaActual';

interface PerfilMarcaProps {
  tienda: TiendaData | null;
  navigation: any;
}

const PerfilMarca: React.FC<PerfilMarcaProps> = ({ tienda, navigation }) => {
  if (!tienda) return null;

  // Usar el banner si existe, sino usar el logo
  const bannerImage = tienda.logo; // Por ahora usamos logo como banner
  const seguidoresCount = tienda.seguidores?.length || 0;

  return (
    <View style={styles.container}>
      {/* Banner de fondo con imagen */}
      <ImageBackground 
        source={{ uri: bannerImage }}
        style={styles.bannerContainer}
        resizeMode="cover"
      >
        {/* Overlay gradiente exacto del CSS */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', '#000000']}
          style={styles.bannerOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        
        {/* Logo circular de la marca */}
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: tienda.logo }}
            style={styles.logoCircular}
            defaultSource={require('../../../../assets/icon.png')}
          />
        </View>
        
        {/* Información de la marca */}
        <View style={styles.infoContainer}>
          <Text style={styles.nombreMarca}>
            {tienda.nombre}
          </Text>
        </View>
        
        {/* Botón Ver Perfil */}
        <TouchableOpacity 
          style={styles.botonPerfil}
          onPress={() => {
            // navigation.navigate('PerfilCompleto', { tienda });
            console.log('Ver perfil completo');
          }}
        >
          <Text style={styles.textoPerfil}>Ver Perfil</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 280, // Exacto del CSS
    marginBottom: 20, // Un poco de separación con las categorías
  },
  bannerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  bannerOverlay: {
    position: 'absolute',
    top: '38%', // Exacto del CSS
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoContainer: {
    position: 'absolute',
    top: 169, // Bajado 20px más abajo (149 + 20 = 169)
    alignSelf: 'center',
  },
  logoCircular: {
    width: 100,
    height: 100,
    borderRadius: 15, // Radio de 15px como solicitado
    borderWidth: 4,
    borderColor: '#000000',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    marginTop: 80, // Espacio para que quede debajo del logo
  },
  nombreMarca: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF', // Blanco como solicitado
    textAlign: 'center',
    paddingTop: 5, // 5px de padding superior como solicitado
  },
  botonPerfil: {
    position: 'absolute',
    right: 20, // Ajustado para mejor responsive
    bottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 15, // Aumentado 5px como solicitado (10px + 5px = 15px)
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textoPerfil: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default PerfilMarca;