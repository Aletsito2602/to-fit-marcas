import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  expanded?: boolean;
}

interface HelpCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface HelpCenterScreenProps {
  navigation: any;
}

const HelpCenterScreen: React.FC<HelpCenterScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const categories: HelpCategory[] = [
    { id: 'all', name: 'Todos', icon: 'apps', count: 12 },
    { id: 'getting-started', name: 'Primeros pasos', icon: 'rocket', count: 4 },
    { id: 'orders', name: 'Pedidos y ventas', icon: 'card', count: 3 },
    { id: 'technical', name: 'Problemas técnicos', icon: 'settings', count: 3 },
    { id: 'account', name: 'Cuenta', icon: 'person', count: 2 },
  ];

  const faqData: FAQItem[] = [
    {
      id: '1',
      category: 'getting-started',
      question: '¿Cómo creo mi primera tienda?',
      answer: 'Para crear tu primera tienda, ve a "Configuración" > "Configuración de tienda" y completa la información básica como nombre, descripción y categoría. Luego sube tu logo y banner para personalizar tu tienda.'
    },
    {
      id: '2',
      category: 'getting-started',
      question: '¿Cómo agrego productos a mi tienda?',
      answer: 'Desde el menú principal, selecciona "Productos" y luego toca el botón "+". Completa la información del producto incluyendo fotos, descripción, precio y stock disponible.'
    },
    {
      id: '3',
      category: 'orders',
      question: '¿Cómo proceso un pedido?',
      answer: 'Cuando recibas un pedido, ve a la sección "Pedidos" donde verás todos los pedidos pendientes. Toca el pedido para ver los detalles y marca como "Procesando" cuando comiences a prepararlo.'
    },
    {
      id: '4',
      category: 'orders',
      question: '¿Cómo configuro métodos de envío?',
      answer: 'Ve a "Configuración" > "Métodos de envío" donde puedes agregar diferentes opciones como envío estándar, express o retiro en sucursal. Define precios y tiempos estimados para cada método.'
    },
    {
      id: '5',
      category: 'technical',
      question: '¿Por qué no puedo subir fotos?',
      answer: 'Verifica que tengas permisos de cámara y galería habilitados. Las fotos deben ser menores a 10MB y en formato JPG o PNG. Si el problema persiste, reinicia la aplicación.'
    },
    {
      id: '6',
      category: 'technical',
      question: 'La aplicación se cierra inesperadamente',
      answer: 'Cierra completamente la aplicación y vuelve a abrirla. Si el problema continúa, verifica que tengas la última versión instalada o contacta a soporte técnico.'
    },
    {
      id: '7',
      category: 'account',
      question: '¿Cómo cambio mi contraseña?',
      answer: 'Ve a "Configuración" > "Cambiar contraseña". Ingresa tu contraseña actual y luego la nueva contraseña dos veces para confirmar el cambio.'
    },
    {
      id: '8',
      category: 'account',
      question: '¿Cómo actualizo mi información personal?',
      answer: 'En "Configuración" > "Información personal" puedes editar todos tus datos personales como nombre, teléfono, dirección y foto de perfil.'
    },
    {
      id: '9',
      category: 'getting-started',
      question: '¿Cómo configuro métodos de pago?',
      answer: 'Ve a "Configuración" > "Métodos de pago" para agregar tarjetas de crédito, débito o PayPal. Puedes establecer un método como predeterminado para pagos rápidos.'
    },
    {
      id: '10',
      category: 'orders',
      question: '¿Qué hacer si un cliente reclama?',
      answer: 'Mantén la calma y comunícate directamente con el cliente a través de la sección "Mensajes". Ofrece soluciones como reemplazo, reembolso o descuento según corresponda.'
    },
    {
      id: '11',
      category: 'technical',
      question: '¿Cómo hago backup de mis datos?',
      answer: 'Tus datos se respaldan automáticamente en la nube. Para exportar información específica, ve a "Configuración" > "Exportar datos" donde puedes descargar reportes de ventas y productos.'
    },
    {
      id: '12',
      category: 'getting-started',
      question: '¿Cuánto cuesta usar la plataforma?',
      answer: 'To FIT Marcas tiene un plan gratuito con funciones básicas y planes premium con funciones avanzadas. Consulta la sección "Planes y precios" para más detalles.'
    },
  ];

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderFAQItem = ({ item }: { item: FAQItem }) => {
    const isExpanded = expandedItems.has(item.id);
    return (
      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => toggleExpanded(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.faqHeader}>
          <Text style={styles.faqQuestion}>{item.question}</Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
          />
        </View>
        {isExpanded && (
          <Text style={styles.faqAnswer}>{item.answer}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderCategory = (category: HelpCategory) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons
        name={category.icon as any}
        size={20}
        color={selectedCategory === category.id ? '#1a1a1a' : '#00D4AA'}
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === category.id && styles.categoryTextActive
      ]}>
        {category.name}
      </Text>
      <View style={[
        styles.categoryBadge,
        selectedCategory === category.id && styles.categoryBadgeActive
      ]}>
        <Text style={[
          styles.categoryCount,
          selectedCategory === category.id && styles.categoryCountActive
        ]}>
          {category.count}
        </Text>
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
            <Text style={styles.title}>Centro de Ayuda</Text>
            <Text style={styles.subtitle}>Encuentra respuestas a tus preguntas</Text>
          </View>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => navigation.navigate('ContactSupport')}
          >
            <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeCard}>
          <Ionicons name="help-circle" size={32} color="#00D4AA" />
          <Text style={styles.welcomeTitle}>¿En qué podemos ayudarte?</Text>
          <Text style={styles.welcomeText}>
            Encuentra respuestas rápidas a las preguntas más frecuentes
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar en preguntas frecuentes..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map(renderCategory)}
        </ScrollView>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>
            Preguntas Frecuentes
            {filteredFAQs.length > 0 && (
              <Text style={styles.resultsCount}> ({filteredFAQs.length})</Text>
            )}
          </Text>

          {filteredFAQs.length > 0 ? (
            <FlatList
              data={filteredFAQs}
              renderItem={renderFAQItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noResults}>
              <Ionicons name="search" size={48} color="#666" />
              <Text style={styles.noResultsTitle}>No se encontraron resultados</Text>
              <Text style={styles.noResultsText}>
                Intenta con otras palabras clave o contacta a nuestro equipo de soporte
              </Text>
            </View>
          )}
        </View>

        <View style={styles.supportOptions}>
          <Text style={styles.sectionTitle}>¿Necesitas más ayuda?</Text>
          
          <TouchableOpacity
            style={styles.supportOption}
            onPress={() => navigation.navigate('ContactSupport')}
          >
            <Ionicons name="chatbubble-ellipses" size={24} color="#00D4AA" />
            <View style={styles.supportInfo}>
              <Text style={styles.supportTitle}>Contactar Soporte</Text>
              <Text style={styles.supportDescription}>
                Chatea con nuestro equipo de soporte
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportOption}>
            <Ionicons name="videocam" size={24} color="#00D4AA" />
            <View style={styles.supportInfo}>
              <Text style={styles.supportTitle}>Tutoriales en Video</Text>
              <Text style={styles.supportDescription}>
                Aprende con guías paso a paso
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportOption}>
            <Ionicons name="people" size={24} color="#00D4AA" />
            <View style={styles.supportInfo}>
              <Text style={styles.supportTitle}>Comunidad</Text>
              <Text style={styles.supportDescription}>
                Conecta con otros usuarios
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
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
  contactButton: {
    padding: 5,
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
  welcomeCard: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 25,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 15,
  },
  clearButton: {
    padding: 5,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#00D4AA',
  },
  categoryButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 8,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  categoryBadge: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  categoryBadgeActive: {
    backgroundColor: '#1a1a1a',
  },
  categoryCount: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryCountActive: {
    color: '#fff',
  },
  faqSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  resultsCount: {
    color: '#666',
    fontWeight: '400',
  },
  faqItem: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 10,
  },
  faqAnswer: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 22,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 15,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  supportOptions: {
    marginBottom: 30,
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  supportInfo: {
    flex: 1,
    marginLeft: 15,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default HelpCenterScreen;