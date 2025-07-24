import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Camera screens
import CameraScreen from '../screens/main/CameraScreen';
import {
  PreviewFotoScreen,
  GaleriaFotosScreen,
  EditorFotoScreen,
  PublicarContenidoScreen,
} from '../screens/camera';

// Types para navegación de cámara
export type CameraStackParamList = {
  Camara: undefined;
  PreviewFoto: {
    photoPath: string;
    photoData: any;
    fromGallery?: boolean;
  };
  GaleriaFotos: undefined;
  EditorFoto: {
    photoPath: string;
    photoData: any;
  };
  PublicarContenido: {
    photoPath: string;
    photoData: any;
  };
};

const CameraStack = createStackNavigator<CameraStackParamList>();

const CameraNavigator: React.FC = () => {
  return (
    <CameraStack.Navigator 
      screenOptions={{ 
        headerShown: false,
        gestureEnabled: false, // Deshabilitar gestos en cámara para mejor experiencia
        cardStyle: { backgroundColor: '#000000' }, // Fondo negro consistente
      }}
    >
      <CameraStack.Screen 
        name="Camara" 
        component={CameraScreen}
        options={{
          // Prevenir que el usuario pueda hacer swipe back desde la cámara
          gestureEnabled: false,
        }}
      />
      <CameraStack.Screen 
        name="PreviewFoto" 
        component={PreviewFotoScreen}
        options={{
          // Animación personalizada para preview
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      />
      <CameraStack.Screen 
        name="GaleriaFotos" 
        component={GaleriaFotosScreen}
        options={{
          // Animación deslizante desde la derecha
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />
      <CameraStack.Screen 
        name="EditorFoto" 
        component={EditorFotoScreen}
        options={{
          // Animación de escala para editor
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              transform: [
                {
                  scale: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
              opacity: current.progress,
            },
          }),
        }}
      />
      <CameraStack.Screen 
        name="PublicarContenido" 
        component={PublicarContenidoScreen}
        options={{
          // Animación desde abajo para publicar
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />
    </CameraStack.Navigator>
  );
};

export default CameraNavigator;