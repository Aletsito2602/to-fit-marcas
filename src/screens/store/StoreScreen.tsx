import React from 'react';
import MiTiendaScreen from './MiTiendaScreen';

interface StoreScreenProps {
  navigation: any;
}

const StoreScreen: React.FC<StoreScreenProps> = ({ navigation }) => {
  return <MiTiendaScreen navigation={navigation} />;
};

export default StoreScreen;