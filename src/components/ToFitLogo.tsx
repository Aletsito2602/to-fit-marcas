import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface ToFitLogoProps {
  width?: number;
  height?: number;
  color?: string;
}

const ToFitLogo: React.FC<ToFitLogoProps> = ({ 
  width = 213, 
  height = 121, 
  color = '#FFFFFF' 
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logos/logo to fit marcas.png')}
        style={[
          styles.logo,
          {
            width,
            height,
            tintColor: color,
          }
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // Base logo styles
  },
});

export default ToFitLogo;