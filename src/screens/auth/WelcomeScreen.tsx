import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import ToFitLogo from '../../components/ToFitLogo';
import BackgroundPattern from '../../components/BackgroundPattern';
import LayerBackground from '../../components/LayerBackground';

const { width } = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login' as never);
  };

  const handleRegister = () => {
    navigation.navigate('OnboardingQuestions' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.08} />
      <LayerBackground opacity={0.3} />
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <ToFitLogo width={width * 0.6} height={121} />
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Iniciar sesión"
          onPress={handleLogin}
          variant="secondary"
        />
        
        <CustomButton
          title="Registrarse"
          onPress={handleRegister}
          variant="primary"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  buttonContainer: {
    paddingBottom: 60,
  },
});

export default WelcomeScreen;