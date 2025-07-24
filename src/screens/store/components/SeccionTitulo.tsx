import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SeccionTituloProps {
  titulo: string;
  onVerMas?: () => void;
  showVerMas?: boolean;
}

const SeccionTitulo: React.FC<SeccionTituloProps> = ({ 
  titulo, 
  onVerMas, 
  showVerMas = true 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      
      {showVerMas && onVerMas && (
        <TouchableOpacity 
          style={styles.verMasContainer}
          onPress={onVerMas}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.verMasTexto}>Ver Más</Text>
          <Ionicons 
            name="chevron-forward"
            size={12}
            color="#FFFFFF"
            style={styles.verMasIcono}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 25, // Exacto del CSS
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 11,
    marginVertical: 12,
  },
  titulo: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 18, // Exacto del CSS
    color: '#FFFFFF',
    flex: 1,
  },
  verMasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verMasTexto: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18, // Exacto del CSS
    color: '#FFFFFF',
    textAlign: 'center',
  },
  verMasIcono: {
    width: 30,
    height: 25,
  },
});

export default SeccionTitulo;