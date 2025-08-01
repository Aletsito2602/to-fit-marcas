import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

interface TaxConfig {
  country: string;
  taxId: string;
  businessName: string;
  businessType: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  defaultTaxRate: number;
  includeTaxInPrice: boolean;
  showTaxOnReceipts: boolean;
  exemptProducts: string[];
}

interface TaxConfigScreenProps {
  navigation: any;
}

const TaxConfigScreen: React.FC<TaxConfigScreenProps> = ({ navigation }) => {
  const [taxConfig, setTaxConfig] = useState<TaxConfig>({
    country: 'Argentina',
    taxId: '20-12345678-9',
    businessName: 'To FIT Marcas SRL',
    businessType: 'Sociedad de Responsabilidad Limitada',
    address: 'Av. Corrientes 1234',
    city: 'Buenos Aires',
    province: 'CABA',
    postalCode: '1043',
    defaultTaxRate: 21,
    includeTaxInPrice: true,
    showTaxOnReceipts: true,
    exemptProducts: [],
  });

  const [customRates, setCustomRates] = useState([
    { category: 'Ropa básica', rate: 21 },
    { category: 'Calzado deportivo', rate: 21 },
    { category: 'Accesorios', rate: 10.5 },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (!taxConfig.taxId || !taxConfig.businessName) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    Alert.alert('Éxito', 'Configuración fiscal actualizada');
    setIsEditing(false);
  };

  const handleToggleSetting = (key: keyof TaxConfig, value: any) => {
    setTaxConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateCustomRate = (index: number, newRate: string) => {
    const rate = parseFloat(newRate) || 0;
    setCustomRates(prev =>
      prev.map((item, i) => (i === index ? { ...item, rate } : item))
    );
  };

  const renderField = (
    label: string,
    value: string,
    key: keyof TaxConfig,
    required = false,
    keyboardType: 'default' | 'numeric' = 'default'
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      {isEditing ? (
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={(text) => setTaxConfig(prev => ({ ...prev, [key]: text }))}
          placeholderTextColor="#666"
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  const renderToggleSetting = (
    label: string,
    description: string,
    key: keyof TaxConfig
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={taxConfig[key] as boolean}
        onValueChange={(value) => handleToggleSetting(key, value)}
        trackColor={{ false: '#333', true: '#00D4AA' }}
        thumbColor={taxConfig[key] ? '#fff' : '#666'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Configuración Fiscal</Text>
            <Text style={styles.subtitle}>Configura la información fiscal de tu tienda</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Ionicons 
              name={isEditing ? "checkmark" : "create-outline"} 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.warningCard}>
          <Ionicons name="warning" size={24} color="#FFFFFF" />
          <Text style={styles.warningText}>
            La configuración fiscal es importante para el cumplimiento legal. Consulta con un contador si tienes dudas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la empresa</Text>
          {renderField('País', taxConfig.country, 'country', true)}
          {renderField('CUIT/RUT', taxConfig.taxId, 'taxId', true)}
          {renderField('Razón social', taxConfig.businessName, 'businessName', true)}
          {renderField('Tipo de empresa', taxConfig.businessType, 'businessType')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dirección fiscal</Text>
          {renderField('Dirección', taxConfig.address, 'address', true)}
          <View style={styles.rowFields}>
            <View style={[styles.fieldContainer, { flex: 2, marginRight: 10 }]}>
              <Text style={styles.fieldLabel}>Ciudad *</Text>
              {isEditing ? (
                <TextInput
                  style={styles.textInput}
                  value={taxConfig.city}
                  onChangeText={(text) => setTaxConfig(prev => ({ ...prev, city: text }))}
                  placeholderTextColor="#666"
                />
              ) : (
                <Text style={styles.fieldValue}>{taxConfig.city}</Text>
              )}
            </View>
            <View style={[styles.fieldContainer, { flex: 1, marginLeft: 5, marginRight: 5 }]}>
              <Text style={styles.fieldLabel}>Provincia</Text>
              {isEditing ? (
                <TextInput
                  style={styles.textInput}
                  value={taxConfig.province}
                  onChangeText={(text) => setTaxConfig(prev => ({ ...prev, province: text }))}
                  placeholderTextColor="#666"
                />
              ) : (
                <Text style={styles.fieldValue}>{taxConfig.province}</Text>
              )}
            </View>
            <View style={[styles.fieldContainer, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.fieldLabel}>CP</Text>
              {isEditing ? (
                <TextInput
                  style={styles.textInput}
                  value={taxConfig.postalCode}
                  onChangeText={(text) => setTaxConfig(prev => ({ ...prev, postalCode: text }))}
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.fieldValue}>{taxConfig.postalCode}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración de impuestos</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Tasa de impuesto por defecto (%)</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={taxConfig.defaultTaxRate.toString()}
                onChangeText={(text) => 
                  setTaxConfig(prev => ({ ...prev, defaultTaxRate: parseFloat(text) || 0 }))
                }
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>{taxConfig.defaultTaxRate}%</Text>
            )}
          </View>

          {renderToggleSetting(
            'Incluir impuestos en precios',
            'Los precios mostrados incluyen impuestos',
            'includeTaxInPrice'
          )}

          {renderToggleSetting(
            'Mostrar impuestos en recibos',
            'Desglosar impuestos en facturas y recibos',
            'showTaxOnReceipts'
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasas por categoría</Text>
          <Text style={styles.sectionDescription}>
            Configura tasas específicas para diferentes categorías de productos
          </Text>
          {customRates.map((item, index) => (
            <View key={index} style={styles.categoryRate}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.category}</Text>
              </View>
              <View style={styles.rateInput}>
                {isEditing ? (
                  <TextInput
                    style={styles.rateTextInput}
                    value={item.rate.toString()}
                    onChangeText={(text) => updateCustomRate(index, text)}
                    keyboardType="numeric"
                    placeholderTextColor="#666"
                  />
                ) : (
                  <Text style={styles.rateValue}>{item.rate}%</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#00D4AA" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Información importante</Text>
            <Text style={styles.infoText}>
              • Verifica que tu CUIT esté actualizado en AFIP
              • Las tasas de impuesto deben coincidir con la legislación vigente
              • Mantén respaldos de tu configuración fiscal
            </Text>
          </View>
        </View>

        {isEditing && (
          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      <BottomTabBar />
    </SafeAreaView>
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
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  titleWrapper: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  editButton: {
    padding: 5,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFFFFF',
  },
  warningText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: '#FFFFFF',
  },
  fieldValue: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
  },
  textInput: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00D4AA',
  },
  rowFields: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  categoryRate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  rateInput: {
    width: 80,
  },
  rateTextInput: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#00D4AA',
  },
  rateValue: {
    fontSize: 16,
    color: '#00D4AA',
    fontWeight: '600',
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContent: {
    flex: 1,
    marginLeft: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#00D4AA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TaxConfigScreen;