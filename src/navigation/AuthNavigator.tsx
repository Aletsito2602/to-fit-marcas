import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';
import { useAuth } from '../contexts/AuthContext';

// Pantallas de autenticación
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import OnboardingQuestionsScreen from '../screens/auth/OnboardingQuestionsScreen';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  const { user, firebaseUser } = useAuth();

  // Determinar pantalla inicial basado en el estado del usuario
  let initialRouteName: keyof AuthStackParamList = "Welcome";
  
  if (firebaseUser && user) {
    // Usuario autenticado pero necesita completar onboarding
    const hasCompletedOnboarding = user.onboardingCompleted === true;
    if (!hasCompletedOnboarding) {
      initialRouteName = "OnboardingQuestions";
    }
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#000000' },
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OnboardingQuestions" component={OnboardingQuestionsScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;