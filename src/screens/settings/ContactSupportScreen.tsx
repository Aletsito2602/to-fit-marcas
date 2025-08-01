import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

interface ContactMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'available' | 'busy' | 'offline';
  responseTime: string;
  action: () => void;
}

interface ContactSupportScreenProps {
  navigation: any;
}

const ContactSupportScreen: React.FC<ContactSupportScreenProps> = ({ navigation }) => {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('alejandro@example.com');
  const [priority, setPriority] = useState('medium');

  const issueTypes = [
    'Problema técnico',
    'Error en la aplicación',
    'Problema con pagos',
    'Problema con pedidos',
    'Configuración de cuenta',
    'Sugerencia o mejora',
    'Otro',
  ];

  const priorities = [
    { id: 'low', name: 'Baja', color: '#00D4AA' },
    { id: 'medium', name: 'Media', color: '#FFFFFF' },
    { id: 'high', name: 'Alta', color: '#FFFFFF' },
  ];

  const contactMethods: ContactMethod[] = [
    {
      id: 'live-chat',
      name: 'Chat en vivo',
      description: 'Respuesta inmediata de 9:00 a 18:00',
      icon: 'chatbubble-ellipses',
      status: 'available',
      responseTime: 'Inmediato',
      action: () => Alert.alert('Chat en vivo', 'Conectando con un agente...'),
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Envía tu consulta por correo electrónico',
      icon: 'mail',
      status: 'available',
      responseTime: '24 horas',
      action: () => Linking.openURL('mailto:soporte@tofit.com'),
    },
    {
      id: 'phone',
      name: 'Teléfono',
      description: 'Llámanos directamente',
      icon: 'call',
      status: 'offline',
      responseTime: 'No disponible',
      action: () => Linking.openURL('tel:+5491112345678'),
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Chatea por WhatsApp',
      icon: 'logo-whatsapp',
      status: 'available',
      responseTime: '2-4 horas',
      action: () => Linking.openURL('https://wa.me/5491112345678'),
    },
  ];

  const handleSubmitTicket = () => {
    if (!selectedIssue || !description.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    Alert.alert(
      'Ticket enviado',
      'Hemos recibido tu consulta. Te responderemos pronto.',
      [{ text: 'OK', onPress: () => navigation.navigate('Settings') }]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#00D4AA';
      case 'busy': return '#FFFFFF';
      case 'offline': return '#666';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'busy': return 'Ocupado';
      case 'offline': return 'No disponible';
      default: return 'Desconocido';
    }
  };

  const renderContactMethod = (method: ContactMethod) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.contactMethod,
        method.status === 'offline' && styles.contactMethodDisabled
      ]}
      onPress={method.action}
      disabled={method.status === 'offline'}
    >
      <View style={styles.contactMethodHeader}>
        <Ionicons name={method.icon as any} size={24} color="#00D4AA" />
        <View style={styles.contactMethodInfo}>
          <Text style={styles.contactMethodName}>{method.name}</Text>
          <Text style={styles.contactMethodDescription}>{method.description}</Text>
        </View>
        <View style={styles.contactMethodStatus}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(method.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(method.status) }]}>
            {getStatusText(method.status)}
          </Text>
        </View>
      </View>
      <View style={styles.contactMethodFooter}>
        <Text style={styles.responseTime}>Tiempo de respuesta: {method.responseTime}</Text>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
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
            <Text style={styles.title}>Contactar Soporte</Text>
            <Text style={styles.subtitle}>Obtén ayuda de nuestro equipo</Text>
          </View>
        </View>

        <View style={styles.supportCard}>
          <Ionicons name="headset" size={32} color="#00D4AA" />
          <Text style={styles.supportTitle}>¿Cómo podemos ayudarte?</Text>
          <Text style={styles.supportText}>
            Nuestro equipo está aquí para resolver tus dudas y problemas
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Métodos de contacto</Text>
          {contactMethods.map(renderContactMethod)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crear ticket de soporte</Text>
          <Text style={styles.sectionDescription}>
            Envía una consulta detallada y te responderemos por email
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo de problema *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.issueTypes}>
              {issueTypes.map((issue) => (
                <TouchableOpacity
                  key={issue}
                  style={[
                    styles.issueType,
                    selectedIssue === issue && styles.issueTypeSelected
                  ]}
                  onPress={() => setSelectedIssue(issue)}
                >
                  <Text style={[
                    styles.issueTypeText,
                    selectedIssue === issue && styles.issueTypeTextSelected
                  ]}>
                    {issue}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Prioridad</Text>
            <View style={styles.priorityContainer}>
              {priorities.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={[
                    styles.priorityOption,
                    priority === p.id && styles.priorityOptionSelected,
                    { borderColor: p.color }
                  ]}
                  onPress={() => setPriority(p.id)}
                >
                  <View style={[styles.priorityIndicator, { backgroundColor: p.color }]} />
                  <Text style={[
                    styles.priorityText,
                    priority === p.id && { color: p.color }
                  ]}>
                    {p.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email de contacto *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="tu@email.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Descripción del problema *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe tu problema con el mayor detalle posible..."
              placeholderTextColor="#666"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{description.length}/500</Text>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitTicket}
          >
            <Ionicons name="send" size={20} color="#1a1a1a" />
            <Text style={styles.submitButtonText}>Enviar consulta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Antes de contactarnos</Text>
          <TouchableOpacity
            style={styles.faqButton}
            onPress={() => navigation.navigate('HelpCenter')}
          >
            <Ionicons name="help-circle" size={24} color="#00D4AA" />
            <View style={styles.faqContent}>
              <Text style={styles.faqTitle}>Revisa las preguntas frecuentes</Text>
              <Text style={styles.faqDescription}>
                Encuentra respuestas rápidas a problemas comunes
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="time" size={20} color="#00D4AA" />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Horarios de atención</Text>
            <Text style={styles.infoText}>
              Lunes a Viernes: 9:00 - 18:00 (GMT-3)
              {'\n'}Sábados: 10:00 - 14:00 (GMT-3)
              {'\n'}Domingos: Cerrado
            </Text>
          </View>
        </View>
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
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
  supportCard: {
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 25,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    marginBottom: 8,
  },
  supportText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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
    marginBottom: 20,
    lineHeight: 20,
  },
  contactMethod: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  contactMethodDisabled: {
    opacity: 0.5,
  },
  contactMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactMethodInfo: {
    flex: 1,
    marginLeft: 15,
  },
  contactMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  contactMethodDescription: {
    fontSize: 14,
    color: '#666',
  },
  contactMethodStatus: {
    alignItems: 'flex-end',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  contactMethodFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  responseTime: {
    fontSize: 14,
    color: '#666',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  issueTypes: {
    flexDirection: 'row',
  },
  issueType: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  issueTypeSelected: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },
  issueTypeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  issueTypeTextSelected: {
    color: '#1a1a1a',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  priorityOptionSelected: {
    backgroundColor: '#333',
  },
  priorityIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  priorityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#fff',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D4AA',
    padding: 15,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  faqSection: {
    marginBottom: 20,
  },
  faqButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00D4AA',
    borderStyle: 'dashed',
  },
  faqContent: {
    flex: 1,
    marginLeft: 15,
  },
  faqTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  faqDescription: {
    fontSize: 14,
    color: '#666',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
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
});

export default ContactSupportScreen;