import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

const SupportScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqCategories = [
    {
      id: 'getting-started',
      title: 'Primeros pasos',
      icon: 'play-circle-outline',
      questions: [
        {
          id: '1',
          question: '¿Cómo configuro mi primera tienda?',
          answer: 'Para configurar tu tienda, ve a "Mi Tienda" > "Configuración" y completa la información básica como nombre, descripción y métodos de pago.',
        },
        {
          id: '2',
          question: '¿Cómo añado mi primer producto?',
          answer: 'Ve a la sección "Productos" y toca "Añadir producto". Completa la información del producto, agrega fotos y establece el precio.',
        },
      ],
    },
    {
      id: 'orders',
      title: 'Pedidos y ventas',
      icon: 'receipt-outline',
      questions: [
        {
          id: '3',
          question: '¿Cómo gestiono los pedidos?',
          answer: 'En la sección "Pedidos" puedes ver todos los pedidos, cambiar su estado y gestionar los envíos.',
        },
        {
          id: '4',
          question: '¿Qué métodos de pago puedo aceptar?',
          answer: 'Puedes configurar tarjetas de crédito, PayPal, transferencias bancarias y pago contra entrega según tu región.',
        },
      ],
    },
    {
      id: 'technical',
      title: 'Problemas técnicos',
      icon: 'build-outline',
      questions: [
        {
          id: '5',
          question: 'La app se cierra inesperadamente',
          answer: 'Intenta cerrar completamente la app y volver a abrirla. Si el problema persiste, contacta con soporte.',
        },
        {
          id: '6',
          question: 'No puedo subir fotos de productos',
          answer: 'Verifica que hayas dado permisos de cámara y galería a la aplicación en la configuración de tu dispositivo.',
        },
      ],
    },
  ];

  const contactOptions = [
    {
      id: '1',
      title: 'Chat en vivo',
      description: 'Respuesta inmediata de 9:00 a 18:00',
      icon: 'chatbubble-outline',
      color: '#4ADE80',
      available: true,
    },
    {
      id: '2',
      title: 'Email',
      description: 'Respuesta en 24 horas',
      icon: 'mail-outline',
      color: '#06B6D4',
      available: true,
    },
    {
      id: '3',
      title: 'Teléfono',
      description: 'Lun-Vie 9:00 a 18:00',
      icon: 'call-outline',
      color: '#F59E0B',
      available: false,
    },
    {
      id: '4',
      title: 'WhatsApp',
      description: 'Soporte por WhatsApp',
      icon: 'logo-whatsapp',
      color: '#25D366',
      available: true,
    },
  ];

  const toggleFAQ = (questionId: string) => {
    setExpandedFAQ(expandedFAQ === questionId ? null : questionId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Centro de Ayuda</Text>
          <Text style={styles.subtitle}>Encuentra respuestas a tus dudas</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#A0A0A0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar en la ayuda..."
            placeholderTextColor="#A0A0A0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Contact */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contactar soporte</Text>
          <View style={styles.contactGrid}>
            {contactOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.contactCard,
                  !option.available && styles.contactCardDisabled
                ]}
                disabled={!option.available}
              >
                <View style={[styles.contactIcon, { backgroundColor: option.color }]}>
                  <Ionicons name={option.icon as any} size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.contactTitle}>{option.title}</Text>
                <Text style={styles.contactDescription}>{option.description}</Text>
                {!option.available && (
                  <Text style={styles.unavailableText}>No disponible</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Categories */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Preguntas frecuentes</Text>
          
          {faqCategories.map((category) => (
            <View key={category.id} style={styles.faqCategory}>
              <View style={styles.categoryHeader}>
                <Ionicons name={category.icon as any} size={20} color="#FFFFFF" />
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </View>
              
              {category.questions.map((faq) => (
                <View key={faq.id} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => toggleFAQ(faq.id)}
                  >
                    <Text style={styles.questionText}>{faq.question}</Text>
                    <Ionicons
                      name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color="#A0A0A0"
                    />
                  </TouchableOpacity>
                  
                  {expandedFAQ === faq.id && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.answerText}>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Additional Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>Recursos adicionales</Text>
          
          <TouchableOpacity style={styles.resourceItem}>
            <Ionicons name="videocam-outline" size={20} color="#FFFFFF" />
            <Text style={styles.resourceText}>Tutoriales en video</Text>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <Ionicons name="document-text-outline" size={20} color="#FFFFFF" />
            <Text style={styles.resourceText}>Guías paso a paso</Text>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <Ionicons name="people-outline" size={20} color="#FFFFFF" />
            <Text style={styles.resourceText}>Comunidad de usuarios</Text>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.resourceItem}>
            <Ionicons name="school-outline" size={20} color="#FFFFFF" />
            <Text style={styles.resourceText}>Academia To FIT</Text>
            <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        {/* Feedback */}
        <View style={styles.feedbackSection}>
          <Text style={styles.sectionTitle}>¿Te ayudamos?</Text>
          <Text style={styles.feedbackText}>
            Tu opinión nos ayuda a mejorar nuestro soporte
          </Text>
          
          <View style={styles.feedbackButtons}>
            <TouchableOpacity style={styles.feedbackButton}>
              <Ionicons name="thumbs-up-outline" size={20} color="#4ADE80" />
              <Text style={[styles.feedbackButtonText, { color: '#4ADE80' }]}>
                Útil
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.feedbackButton}>
              <Ionicons name="thumbs-down-outline" size={20} color="#EF4444" />
              <Text style={[styles.feedbackButtonText, { color: '#EF4444' }]}>
                No útil
              </Text>
            </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 30,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#333333',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  contactSection: {
    marginBottom: 30,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contactCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
  contactCardDisabled: {
    opacity: 0.5,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  contactDescription: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    textAlign: 'center',
  },
  unavailableText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#EF4444',
    marginTop: 4,
  },
  faqSection: {
    marginBottom: 30,
  },
  faqCategory: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#262626',
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  answerText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#CCCCCC',
    lineHeight: 18,
  },
  resourcesSection: {
    marginBottom: 30,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  resourceText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  feedbackSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 20,
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  feedbackButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
  },
});

export default SupportScreen;