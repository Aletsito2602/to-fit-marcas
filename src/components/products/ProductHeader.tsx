import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface ProductHeaderProps {
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  onMenuPress,
  onNotificationPress,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
      </TouchableOpacity>
      
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>To FIT</Text>
        <Text style={styles.logoSubtext}>MARCAS</Text>
      </View>
      
      <View style={styles.headerRightButtons}>
        <TouchableOpacity style={styles.headerButton} onPress={onMenuPress}>
          <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={onNotificationPress}>
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 70,
    backgroundColor: '#363636',
  },
  headerButton: {
    padding: 5,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  logoSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: -5,
  },
  headerRightButtons: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default ProductHeader;