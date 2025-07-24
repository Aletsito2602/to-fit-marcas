import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const AppNavigator: React.FC = () => {
  const { user, firebaseUser, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  // Simplificar la lógica: si hay usuario autenticado y datos de usuario, mostrar app principal
  // Solo enviar a onboarding si explícitamente onboardingCompleted es false
  const shouldShowMainApp = firebaseUser && user && user.onboardingCompleted !== false;

  // Debug logs
  console.log('AppNavigator Debug:', {
    hasFirebaseUser: !!firebaseUser,
    hasUser: !!user,
    onboardingCompleted: user?.onboardingCompleted,
    shouldShowMainApp,
  });

  return (
    <NavigationContainer>
      {shouldShowMainApp ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
});

export default AppNavigator;