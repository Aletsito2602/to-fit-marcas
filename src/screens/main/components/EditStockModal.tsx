import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FirebaseProduct } from '../../../hooks/useProducts';

interface EditStockModalProps {
  visible: boolean;
  product: FirebaseProduct | null;
  onClose: () => void;
  onSave: (productId: string, newStock: number) => void;
}

const EditStockModal: React.FC<EditStockModalProps> = ({
  visible,
  product,
  onClose,
  onSave,
}) => {
  const [stock, setStock] = useState('');
  const [previousStock, setPreviousStock] = useState(0);

  useEffect(() => {
    if (product) {
      // Calcular stock actual (simulado por ahora)
      const currentStock = Math.max((product.talles?.length || 1) * 10, 1);
      setPreviousStock(currentStock);
      setStock(currentStock.toString());
    }
  }, [product]);

  const handleSave = () => {
    const newStockValue = parseInt(stock);
    
    if (isNaN(newStockValue) || newStockValue < 0) {
      Alert.alert('Error', 'Ingresa un número válido para el stock');
      return;
    }

    if (!product) return;

    onSave(product.id, newStockValue);
    handleClose();
  };

  const handleClose = () => {
    setStock('');
    setPreviousStock(0);
    onClose();
  };

  const adjustStock = (amount: number) => {
    const currentValue = parseInt(stock) || 0;
    const newValue = Math.max(0, currentValue + amount);
    setStock(newValue.toString());
  };

  const getStockStatus = (stockValue: number) => {
    if (stockValue > 20) return { text: 'En Stock', color: '#4CAF50' };
    if (stockValue > 5) return { text: 'Bajo Stock', color: '#FF9800' };
    return { text: 'Sin Stock', color: '#F44336' };
  };

  if (!product) return null;

  const currentStockValue = parseInt(stock) || 0;
  const stockStatus = getStockStatus(currentStockValue);
  const stockChange = currentStockValue - previousStock;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.title}>Editar Stock</Text>
          
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Product Info */}
          <View style={styles.productInfo}>
            <Image 
              source={{ uri: product.portada || 'https://via.placeholder.com/80' }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.nombre}</Text>
              <Text style={styles.productCategory}>{product.categoria}</Text>
              <Text style={styles.productPrice}>
                ${product.precio?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") || '0'}
              </Text>
            </View>
          </View>

          {/* Current Stock Status */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <Text style={styles.statusTitle}>Estado Actual</Text>
              <View style={[styles.statusBadge, { backgroundColor: stockStatus.color }]}>
                <Text style={styles.statusText}>{stockStatus.text}</Text>
              </View>
            </View>
            <Text style={styles.previousStockText}>Stock anterior: {previousStock} unidades</Text>
          </View>

          {/* Stock Input */}
          <View style={styles.stockSection}>
            <Text style={styles.sectionTitle}>Nuevo Stock</Text>
            
            {/* Quick Adjustment Buttons */}
            <View style={styles.quickActions}>
              <TouchableOpacity 
                style={styles.quickButton}
                onPress={() => adjustStock(-10)}
              >
                <Ionicons name="remove" size={20} color="#FFFFFF" />
                <Text style={styles.quickButtonText}>-10</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickButton}
                onPress={() => adjustStock(-1)}
              >
                <Ionicons name="remove" size={20} color="#FFFFFF" />
                <Text style={styles.quickButtonText}>-1</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickButton}
                onPress={() => adjustStock(1)}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.quickButtonText}>+1</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickButton}
                onPress={() => adjustStock(10)}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.quickButtonText}>+10</Text>
              </TouchableOpacity>
            </View>

            {/* Stock Input Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.stockInput}
                value={stock}
                onChangeText={setStock}
                placeholder="0"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                selectTextOnFocus
              />
              <Text style={styles.inputLabel}>unidades</Text>
            </View>

            {/* Stock Change Indicator */}
            {stockChange !== 0 && (
              <View style={styles.changeIndicator}>
                <Ionicons 
                  name={stockChange > 0 ? "trending-up" : "trending-down"} 
                  size={16} 
                  color={stockChange > 0 ? "#4CAF50" : "#F44336"} 
                />
                <Text style={[
                  styles.changeText,
                  { color: stockChange > 0 ? "#4CAF50" : "#F44336" }
                ]}>
                  {stockChange > 0 ? '+' : ''}{stockChange} unidades
                </Text>
              </View>
            )}
          </View>

          {/* Quick Stock Presets */}
          <View style={styles.presetsSection}>
            <Text style={styles.sectionTitle}>Valores Rápidos</Text>
            <View style={styles.presetButtons}>
              {[0, 5, 10, 25, 50, 100].map((preset) => (
                <TouchableOpacity
                  key={preset}
                  style={[
                    styles.presetButton,
                    parseInt(stock) === preset && styles.activePreset
                  ]}
                  onPress={() => setStock(preset.toString())}
                >
                  <Text style={[
                    styles.presetText,
                    parseInt(stock) === preset && styles.activePresetText
                  ]}>
                    {preset}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#007AFF" />
            <Text style={styles.infoText}>
              El stock se actualizará inmediatamente. Los cambios se reflejarán en todas las pantallas.
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  closeButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productInfo: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#333333',
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#4CAF50',
  },
  statusCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  previousStockText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  stockSection: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 3,
    justifyContent: 'center',
  },
  quickButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stockInput: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginLeft: 8,
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginLeft: 4,
  },
  presetsSection: {
    marginTop: 25,
  },
  presetButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  presetButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
  },
  activePreset: {
    backgroundColor: '#007AFF',
  },
  presetText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  activePresetText: {
    color: '#FFFFFF',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 25,
    marginBottom: 30,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#007AFF',
    marginLeft: 8,
    lineHeight: 18,
  },
});

export default EditStockModal;