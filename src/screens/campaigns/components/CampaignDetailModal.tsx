import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
  Clipboard,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../navigation/DrawerNavigator';
import TabIcon from '../../../components/TabIcon';
import BackgroundPattern from '../../../components/BackgroundPattern';

interface Campaign {
  id: number;
  marca: string;
  comision: string;
  imagen: string;
  descripcion?: string;
}

interface CampaignDetailModalProps {
  visible: boolean;
  campaign?: Campaign;
  onClose: () => void;
}

type CampaignModalNavigationProp = DrawerNavigationProp<DrawerParamList>;


// TAB 1: CAMPAÑA (Productos)
const CampañaTab = ({ onProductPress }: { onProductPress: (product: any) => void }) => {
  const productos = [
    {
      id: 1,
      nombre: "BUZO PIZZA",
      precio: "$79.900",
      imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      disponible: true
    },
    {
      id: 2,
      nombre: "CHAQUETA MANCHENTE",
      precio: "$109.900",
      imagen: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      disponible: true
    },
    {
      id: 3,
      nombre: "REMERA SPICY",
      precio: "$54.900",
      imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      disponible: true
    },
    {
      id: 4,
      nombre: "REMERA OUT",
      precio: "$34.900",
      imagen: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      disponible: true
    },
    {
      id: 5,
      nombre: "PANTALON SERPENT",
      precio: "$129.900",
      imagen: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      disponible: true
    },
    {
      id: 6,
      nombre: "REMERA REVISTAS",
      precio: "$34.900",
      imagen: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      disponible: true
    }
  ];

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.productGrid}>
        {productos.map(producto => (
          <TouchableOpacity 
            key={producto.id} 
            style={styles.productCard}
            onPress={() => onProductPress(producto)}
          >
            <Image source={{uri: producto.imagen}} style={styles.productImage} />
            <Text style={styles.productName}>{producto.nombre}</Text>
            <Text style={styles.productPrice}>{producto.precio}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// TAB 2: DETALLES
const DetallesTab = () => {
  const detalles = {
    comision: "$18 USD / 10%",
    fechaInicio: "15 de Enero, 2024",
    nombreCampañante: "Red Flag Marketing",
    campaña: "Campaña Red Flag",
    objetivo: "Aumentar el reconocimiento de Completo y conectar emocionalmente con un público joven y creativo a través de mensajes promocionales que refuercen su identidad auténtica y rebelde.",
    publicoObjetivo: "Dirigido a jóvenes entre 18 y 30 años, especialmente artistas urbanos y las expresiones de cultura callejera que buscan diferenciarse a través de la moda auténtica y accesible.",
    mercado: "La marca busca retomar campañas de marketing visualmente impactantes con creación rápida de contenido atractivo que conecte con audiencias jóvenes.",
    contenidoIncluido: [
      "Acceso exclusivo a campañas",
      "Material creativo (fotos/vídeos) y mensajes alineados a la marca",
      "Plantillas de comunicación listas para usar en diferentes plataformas",
      "Contenido visual exclusivo (fotografías, vectores, vídeo) para promocionar productos",
      "Herramientas para análisis de campañas",
      "Acceso para optimizar campañas",
      "Métricas y plantaciones específicas para interacciones"
    ]
  };

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Stats Cards */}
      <View style={styles.statsCards}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Ionicons name="cash-outline" size={24} color="#4ADE80" />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Comisión</Text>
            <Text style={styles.statValue}>{detalles.comision}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Ionicons name="calendar-outline" size={24} color="#F59E0B" />
          </View>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Fecha inicio</Text>
            <Text style={styles.statValue}>{detalles.fechaInicio}</Text>
          </View>
        </View>
      </View>

      {/* Company Info Card */}
      <View style={styles.modernCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="business-outline" size={20} color="#FFFFFF" />
          <Text style={styles.cardTitle}>Información de la empresa</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Campañante</Text>
            <Text style={styles.infoValue}>{detalles.nombreCampañante}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Campaña</Text>
            <Text style={styles.infoValue}>{detalles.campaña}</Text>
          </View>
        </View>
      </View>

      {/* Objective Card */}
      <View style={styles.modernCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="target-outline" size={20} color="#FFFFFF" />
          <Text style={styles.cardTitle}>Objetivo de la campaña</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardDescription}>{detalles.objetivo}</Text>
        </View>
      </View>

      {/* Target Audience Card */}
      <View style={styles.modernCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="people-outline" size={20} color="#FFFFFF" />
          <Text style={styles.cardTitle}>Público objetivo</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardDescription}>{detalles.publicoObjetivo}</Text>
        </View>
      </View>

      {/* Market Strategy Card */}
      <View style={styles.modernCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="trending-up-outline" size={20} color="#FFFFFF" />
          <Text style={styles.cardTitle}>¿Qué busca la marca?</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardDescription}>{detalles.mercado}</Text>
        </View>
      </View>

      {/* Content Included Card */}
      <View style={styles.modernCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="gift-outline" size={20} color="#FFFFFF" />
          <Text style={styles.cardTitle}>Contenido incluido</Text>
        </View>
        <View style={styles.cardContent}>
          {detalles.contenidoIncluido.map((item, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.benefitIcon}>
                <Ionicons name="checkmark" size={16} color="#4ADE80" />
              </View>
              <Text style={styles.benefitText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

// TAB 3: LINKS
const LinksTab = () => {
  const links = {
    afiliacion: "https://bit.ly/3kJ8vG3",
    duracion: "https://bit.ly/2N2v3d"
  };

  const copyToClipboard = (link: string) => {
    Clipboard.setString(link);
    Alert.alert('✅ Copiado', 'Link copiado al portapapeles');
  };

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Header Info */}
      <View style={styles.modernCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="link-outline" size={20} color="#FFFFFF" />
          <Text style={styles.cardTitle}>Links de afiliación</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardDescription}>
            Utiliza estos links para promocionar la campaña y obtener tu comisión por cada venta realizada.
          </Text>
        </View>
      </View>

      {/* Affiliate Link */}
      <View style={styles.linkCardModern}>
        <View style={styles.linkCardHeader}>
          <View style={styles.linkIconContainer}>
            <Ionicons name="storefront-outline" size={24} color="#4ADE80" />
          </View>
          <View style={styles.linkCardInfo}>
            <Text style={styles.linkCardTitle}>Link principal</Text>
            <Text style={styles.linkCardSubtitle}>Link de afiliación de la campaña</Text>
          </View>
        </View>
        
        <View style={styles.linkUrlContainer}>
          <Text style={styles.linkUrlText} numberOfLines={1}>{links.afiliacion}</Text>
          <TouchableOpacity 
            style={styles.copyButtonModern}
            onPress={() => copyToClipboard(links.afiliacion)}
          >
            <Ionicons name="copy-outline" size={20} color="#FFFFFF" />
            <Text style={styles.copyButtonText}>Copiar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Duration Link */}
      <View style={styles.linkCardModern}>
        <View style={styles.linkCardHeader}>
          <View style={styles.linkIconContainer}>
            <Ionicons name="time-outline" size={24} color="#F59E0B" />
          </View>
          <View style={styles.linkCardInfo}>
            <Text style={styles.linkCardTitle}>Duración de cookies</Text>
            <Text style={styles.linkCardSubtitle}>Información sobre el tracking</Text>
          </View>
        </View>
        
        <View style={styles.linkUrlContainer}>
          <Text style={styles.linkUrlText} numberOfLines={1}>{links.duracion}</Text>
          <TouchableOpacity 
            style={styles.copyButtonModern}
            onPress={() => copyToClipboard(links.duracion)}
          >
            <Ionicons name="copy-outline" size={20} color="#FFFFFF" />
            <Text style={styles.copyButtonText}>Copiar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tips Card */}
      <View style={styles.tipsCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="bulb-outline" size={20} color="#FFFFFF" />
          <Text style={styles.cardTitle}>Consejos para usar los links</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4ADE80" />
            <Text style={styles.tipText}>Comparte el link en tus redes sociales</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4ADE80" />
            <Text style={styles.tipText}>Úsalo en tus historias de Instagram</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4ADE80" />
            <Text style={styles.tipText}>Inclúyelo en la descripción de tus videos</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

// TAB 4: MATERIALES
const MaterialesTab = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  
  const materiales = [
    { id: 1, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=1', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=1', name: 'Producto Hero 1' },
    { id: 2, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=2', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=2', name: 'Lifestyle Shot' },
    { id: 3, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=3', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=3', name: 'Banner Promocional' },
    { id: 4, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=4', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=4', name: 'Story Template' },
    { id: 5, tipo: 'video', url: 'https://via.placeholder.com/150x150/333/fff?text=5', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=▶️', name: 'Video Promocional' },
    { id: 6, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=6', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=6', name: 'Post Template' },
    { id: 7, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=7', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=7', name: 'Logo Pack' },
    { id: 8, tipo: 'video', url: 'https://via.placeholder.com/150x150/333/fff?text=8', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=▶️', name: 'Tutorial Video' }
  ];

  const categories = [
    { id: 'todos', name: 'Todos', count: materiales.length },
    { id: 'imagen', name: 'Imágenes', count: materiales.filter(m => m.tipo === 'imagen').length },
    { id: 'video', name: 'Videos', count: materiales.filter(m => m.tipo === 'video').length }
  ];

  const filteredMateriales = selectedCategory === 'todos' 
    ? materiales 
    : materiales.filter(m => m.tipo === selectedCategory);

  const openMaterial = (material: any) => {
    Alert.alert('📁 Material', `Abriendo ${material.name} (${material.tipo})`);
  };

  const downloadMaterial = (material: any) => {
    Alert.alert('⬇️ Descarga', `Descargando ${material.name}...`);
  };

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Header Info */}
      <View style={styles.modernCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="folder-outline" size={20} color="#FFFFFF" />
          <Text style={styles.cardTitle}>Materiales creativos</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardDescription}>
            Descarga y utiliza estos materiales para promocionar la campaña en tus redes sociales.
          </Text>
        </View>
      </View>

      {/* Category Filters */}
      <View style={styles.categoryFilters}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryFilter,
              selectedCategory === category.id && styles.categoryFilterActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[
              styles.categoryFilterText,
              selectedCategory === category.id && styles.categoryFilterTextActive
            ]}>
              {category.name} ({category.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Materials Grid */}
      <View style={styles.materialesGridModern}>
        {filteredMateriales.map(material => (
          <View key={material.id} style={styles.materialItemModern}>
            <TouchableOpacity 
              style={styles.materialImageContainer}
              onPress={() => openMaterial(material)}
            >
              <Image 
                source={{uri: material.thumbnail}} 
                style={styles.materialThumbnailModern} 
              />
              {material.tipo === 'video' && (
                <View style={styles.playIconModern}>
                  <Ionicons name="play" size={24} color="#fff" />
                </View>
              )}
              <View style={styles.materialTypeTag}>
                <Text style={styles.materialTypeText}>
                  {material.tipo === 'video' ? 'VIDEO' : 'IMG'}
                </Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.materialInfo}>
              <Text style={styles.materialName} numberOfLines={1}>{material.name}</Text>
              <View style={styles.materialActions}>
                <TouchableOpacity 
                  style={styles.materialActionButton}
                  onPress={() => openMaterial(material)}
                >
                  <Ionicons name="eye-outline" size={16} color="#4ADE80" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.materialActionButton}
                  onPress={() => downloadMaterial(material)}
                >
                  <Ionicons name="download-outline" size={16} color="#F59E0B" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

// TAB 5: SEGUIMIENTO
const SeguimientoTab = () => {
  const reglas = {
    texto: `Seguimiento de afiliación

No está permitido hacer publicidad directa o mencionar nombres de marcas de forma directa en plataformas donde está prohibido.

Imagen de portada obligatoria (máximo 1920x1080, sin texto en la imagen, formato JPG o PNG).

Hashtags y etiquetas (máximo 5 marcas específicas).

Opciones:
- Agregar un video educativo
- Subir foto de la colaboración como evidencia del contenido de tu influencia.
- ¡Necesitas seguir los requerimientos específicos en publicación de vídeo incluidas!`
  };

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.textSection}>
        <Text style={styles.rulesText}>{reglas.texto}</Text>
      </View>
    </ScrollView>
  );
};

// TAB 6: REGLAS
const ReglasTab = () => {
  const reglas = {
    texto: `Reglas de afiliación

No está permitido hacer publicidad directa o mencionar nombres de marcas de forma directa en plataformas donde está prohibido.

Imagen de portada obligatoria (máximo 1920x1080, sin texto en la imagen, formato JPG o PNG).

Hashtags y etiquetas (máximo 5 marcas específicas).

Opciones:
- Agregar un video educativo
- Subir foto de la colaboración como evidencia del contenido de tu influencia.
- ¡Necesitas seguir los requerimientos específicos en publicación de vídeo incluidas!

Restricciones importantes:
• No se permite spam en comentarios
• Respeta las políticas de cada plataforma
• Mantén la coherencia con la imagen de marca
• Utiliza el contenido proporcionado de manera apropiada`
  };

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.textSection}>
        <Text style={styles.rulesText}>{reglas.texto}</Text>
      </View>
    </ScrollView>
  );
};

// TAB 7: CONTENIDO
const ContenidoTab = () => {
  const [selectedType, setSelectedType] = useState('historia');
  
  const contenidoOptions = [
    { id: 'historia', label: 'Historia', approved: true },
    { id: 'post', label: 'Post', approved: false },
    { id: 'video', label: 'Video', approved: false }
  ];

  const contenidoItems = {
    historia: [
      { id: 1, title: 'SUMMER FASHION', image: 'https://via.placeholder.com/50x50/333/fff?text=SF', type: 'Historia' },
      { id: 2, title: 'Outfit del día', image: 'https://via.placeholder.com/50x50/333/fff?text=OD', type: 'Historia' }
    ],
    post: [
      { id: 3, title: 'VANEA Collection', image: 'https://via.placeholder.com/50x50/333/fff?text=VC', type: 'Post' }
    ],
    video: [
      { id: 4, title: 'Video Tutorial', image: 'https://via.placeholder.com/50x50/333/fff?text=VT', type: 'Video' }
    ]
  };

  return (
    <View style={styles.tabContent}>
      {/* Header con selector */}
      <View style={styles.contenidoHeader}>
        <Text style={styles.contenidoTitle}>Título de contenido</Text>
        <Text style={styles.contenidoSubtitle}>Aprobado</Text>
      </View>

      {/* Selector de tipo */}
      <View style={styles.typeSelector}>
        {contenidoOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.typeOption,
              selectedType === option.id && styles.typeOptionSelected
            ]}
            onPress={() => setSelectedType(option.id)}
          >
            <Text style={[
              styles.typeOptionText,
              selectedType === option.id && styles.typeOptionTextSelected
            ]}>
              {option.label}
            </Text>
            {option.approved && (
              <View style={styles.approvedDot} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de contenido */}
      <ScrollView style={styles.contenidoList}>
        {contenidoItems[selectedType as keyof typeof contenidoItems]?.map((item: any) => (
          <TouchableOpacity key={item.id} style={styles.contenidoItem}>
            <Image source={{uri: item.image}} style={styles.contenidoImage} />
            <View style={styles.contenidoInfo}>
              <Text style={styles.contenidoItemTitle}>{item.title}</Text>
              <Text style={styles.contenidoItemType}>{item.type}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// COMPONENTE PRINCIPAL
// MODAL BOTTOM TAB BAR COMPONENT
const ModalBottomTabBar: React.FC<{onClose: () => void}> = ({onClose}) => {
  const navigation = useNavigation<CampaignModalNavigationProp>();

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home' as const, route: 'MainTabs', screen: 'Home' },
    { key: 'orders', label: 'Pedidos', icon: 'orders' as const, route: 'MainTabs', screen: 'Orders' },
    { key: 'camera', label: 'Cámara', icon: 'camera' as const, route: 'MainTabs', screen: 'Camera' },
    { key: 'products', label: 'Productos', icon: 'products' as const, route: 'MainTabs', screen: 'Products' },
    { key: 'metrics', label: 'Métricas', icon: 'metrics' as const, route: 'Metrics' },
  ];

  const handleTabPress = (route: string, screen?: string) => {
    onClose(); // Cerrar modal primero
    if (screen) {
      // Navegar a MainTabs con pantalla específica
      navigation.navigate(route as any, { screen });
    } else {
      // Navegar directamente (para Metrics que está en Drawer)
      navigation.navigate(route as any);
    }
  };

  return (
    <View style={styles.bottomTabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.bottomTabButton}
          onPress={() => handleTabPress(tab.route, tab.screen)}
          activeOpacity={0.7}
        >
          <View style={styles.bottomTabIconContainer}>
            <TabIcon name={tab.icon} focused={false} size={20} />
          </View>
          <Text style={styles.bottomTabLabel}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// COMPONENTE PRINCIPAL
const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  visible,
  campaign,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('Campaña');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const translateY = new Animated.Value(0);
  
  if (!campaign) return null;

  const handleProductPress = (product: any) => {
    translateY.setValue(0);
    setSelectedProduct(product);
    setIsLiked(false);
    setIsSaved(false);
    setProductModalOpen(true);
  };

  const closeProductModal = () => {
    setProductModalOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
      translateY.setValue(0);
    }, 300);
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: false }
  );

  const onGestureStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY, velocityY } = event.nativeEvent;
      
      if (translationY > 100 || velocityY > 500) {
        Animated.timing(translateY, {
          toValue: 800,
          duration: 250,
          useNativeDriver: false,
        }).start(() => {
          setProductModalOpen(false);
          setTimeout(() => {
            setSelectedProduct(null);
            translateY.setValue(0);
          }, 50);
        });
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  const handleSavePress = () => {
    setIsSaved(!isSaved);
  };

  const handleCommentPress = () => {
    setCommentModalOpen(true);
  };

  const handleSendComment = () => {
    if (commentText.trim()) {
      Alert.alert('Comentario enviado', `"${commentText}"`);
      setCommentText('');
      setCommentModalOpen(false);
    }
  };

  const closeCommentModal = () => {
    setCommentModalOpen(false);
    setCommentText('');
  };

  const handleMorePress = () => {
    Alert.alert('Más opciones', 'Opciones adicionales del producto');
  };

  const tabs = [
    { name: 'Campaña', component: CampañaTab },
    { name: 'Detalles', component: DetallesTab },
    { name: 'Links', component: LinksTab },
    { name: 'Materiales', component: MaterialesTab },
    { name: 'Seguimiento', component: SeguimientoTab },
    { name: 'Reglas', component: ReglasTab },
    { name: 'Contenido', component: ContenidoTab }
  ];

  const renderTabButton = (tab: any) => (
    <TouchableOpacity
      key={tab.name}
      style={[
        styles.tabButton,
        activeTab === tab.name && styles.activeTabButton
      ]}
      onPress={() => setActiveTab(tab.name)}
    >
      <Text
        style={[
          styles.tabButtonText,
          activeTab === tab.name && styles.activeTabButtonText
        ]}
      >
        {tab.name}
      </Text>
    </TouchableOpacity>
  );

  const getCurrentTabComponent = () => {
    const currentTab = tabs.find(tab => tab.name === activeTab);
    if (!currentTab) return <CampañaTab onProductPress={handleProductPress} />;
    
    const TabComponent = currentTab.component;
    if (currentTab.name === 'Campaña') {
      return <TabComponent onProductPress={handleProductPress} />;
    }
    return <TabComponent />;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
    >
      <SafeAreaView style={styles.modalContainer}>
        <BackgroundPattern opacity={0.06} />
        
        {/* Header consistente con la app */}
        <View style={styles.modalHeader}>
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.centerContainer}>
            <Text style={styles.modalTitle}>Campaña</Text>
          </View>
          
          <View style={styles.rightContainer}>
          </View>
        </View>

        {/* Imagen hero */}
        <Image 
          source={{uri: campaign.imagen}} 
          style={styles.heroImage} 
        />

        {/* Título de campaña */}
        <View style={styles.campaignTitleContainer}>
          <Text style={styles.campaignTitle}>{campaign.marca}</Text>
        </View>

        {/* Custom Tab Bar */}
        <View style={styles.tabContainer}>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabScrollContent}
            style={styles.tabScrollView}
          >
            {tabs.map(renderTabButton)}
          </ScrollView>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContentContainer}>
          {getCurrentTabComponent()}
        </View>

        {/* Bottom Navigation */}
        <ModalBottomTabBar onClose={onClose} />

        {/* Product Detail Modal */}
        <Modal
          visible={productModalOpen}
          transparent={true}
          animationType="slide"
          onRequestClose={closeProductModal}
        >
          <View style={styles.productModalContainer}>
            <TouchableOpacity style={styles.productModalOverlay} onPress={closeProductModal} />
            {selectedProduct && (
              <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onGestureStateChange}
              >
                <Animated.View style={[
                  styles.productModalContent,
                  {
                    transform: [{ translateY: translateY }]
                  }
                ]}>

                {/* Product Image in fullscreen */}
                <View style={styles.productImageContainer}>
                  <Image source={{ uri: selectedProduct.imagen }} style={styles.productFullscreenImage} />
                  
                  {/* Product info overlay */}
                  <View style={styles.productInfoOverlay}>
                    <Text style={styles.productModalName}>{selectedProduct.nombre}</Text>
                    <Text style={styles.productModalPrice}>{selectedProduct.precio}</Text>
                  </View>
                </View>

                {/* Action buttons on the right side */}
                <View style={styles.productActions}>
                  <TouchableOpacity style={styles.productActionButton} onPress={handleLikePress}>
                    <Ionicons 
                      name={isLiked ? "heart" : "heart-outline"} 
                      size={24} 
                      color={isLiked ? "#FF3040" : "#FFFFFF"} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.productActionButton} onPress={handleCommentPress}>
                    <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.productActionButton} onPress={handleSavePress}>
                    <Ionicons 
                      name={isSaved ? "bookmark" : "bookmark-outline"} 
                      size={24} 
                      color={isSaved ? "#FFFFFF" : "#FFFFFF"} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.productActionButton} onPress={handleMorePress}>
                    <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                </Animated.View>
              </PanGestureHandler>
            )}
          </View>
        </Modal>

        {/* Comment Modal */}
        <Modal
          visible={commentModalOpen}
          transparent={true}
          animationType="slide"
          onRequestClose={closeCommentModal}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.commentModalContainer}
          >
            <TouchableOpacity 
              style={styles.commentModalOverlay} 
              onPress={closeCommentModal}
              activeOpacity={1}
            />
            <View style={styles.commentModalContent}>
              <View style={styles.commentModalHeader}>
                <TouchableOpacity onPress={closeCommentModal}>
                  <Text style={styles.commentModalCancel}>Cancelar</Text>
                </TouchableOpacity>
                <Text style={styles.commentModalTitle}>Escribir comentario</Text>
                <TouchableOpacity onPress={handleSendComment}>
                  <Text style={[styles.commentModalSend, commentText.trim() ? styles.commentModalSendActive : {}]}>
                    Enviar
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.commentInputContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Escribe tu comentario..."
                  placeholderTextColor="#666666"
                  multiline
                  value={commentText}
                  onChangeText={setCommentText}
                  maxLength={500}
                  autoFocus
                />
                <Text style={styles.commentCounter}>{commentText.length}/500</Text>
              </View>

              <View style={styles.emojiReactions}>
                <Text style={styles.emojiLabel}>Reacciones rápidas:</Text>
                <View style={styles.emojiContainer}>
                  {['🔥', '❤️', '😍', '👏', '💯', '🙌'].map((emoji, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.emojiButton}
                      onPress={() => setCommentText(prev => prev + emoji)}
                    >
                      <Text style={styles.emoji}>{emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Modal container
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(41, 41, 41, 1)',
  },

  // Modal Header (consistente con Header principal)
  modalHeader: {
    height: 60,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },

  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  backButton: {
    padding: 4,
  },

  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  menuButton: {
    padding: 4,
  },


  // Hero image
  heroImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#333333',
  },

  campaignTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  campaignTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Custom Tab Bar
  tabContainer: {
    backgroundColor: '#000000',
    borderBottomColor: '#333333',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },

  tabScrollView: {
    paddingHorizontal: 16,
  },

  tabScrollContent: {
    paddingRight: 16,
    gap: 8,
  },

  tabButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTabButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },

  tabButtonText: {
    fontSize: 14,
    color: '#A0A0A0',
    fontWeight: '500',
  },

  activeTabButtonText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },

  tabContentContainer: {
    flex: 1,
  },

  // Tab content
  tabContent: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },

  // Productos tab
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  productCard: {
    width: '48%',
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },

  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    backgroundColor: '#333333',
    marginBottom: 8,
  },

  productName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },

  productPrice: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Detalles tab
  detailSection: {
    marginBottom: 20,
  },

  detailLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 4,
  },

  detailValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  detailText: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 20,
  },

  bulletPoint: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },

  // Links tab
  linkSection: {
    flex: 1,
  },

  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },

  linkInfo: {
    flex: 1,
  },

  linkLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 4,
  },

  linkUrl: {
    color: '#4A90E2',
    fontSize: 14,
  },

  copyButton: {
    padding: 8,
  },

  // Materiales tab
  materialesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  materialItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },

  materialThumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333333',
  },

  playIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Text sections (Seguimiento/Reglas)
  textSection: {
    flex: 1,
  },

  rulesText: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 22,
  },

  // Contenido tab
  contenidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  contenidoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  contenidoSubtitle: {
    color: '#4CAF50',
    fontSize: 12,
  },

  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },

  typeOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  typeOptionSelected: {
    backgroundColor: '#333333',
  },

  typeOptionText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '500',
  },

  typeOptionTextSelected: {
    color: '#FFFFFF',
  },

  approvedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginLeft: 4,
  },

  contenidoList: {
    flex: 1,
  },

  contenidoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },

  contenidoImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: '#333333',
  },

  contenidoInfo: {
    flex: 1,
    marginLeft: 12,
  },

  contenidoItemTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },

  contenidoItemType: {
    color: '#A0A0A0',
    fontSize: 12,
  },

  // Modal Bottom Tab Bar
  bottomTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderTopWidth: 0,
    height: 80,
    paddingBottom: 12,
    paddingTop: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  
  bottomTabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  bottomTabIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 50,
    marginTop: -2,
  },
  
  bottomTabLabel: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 12,
    marginTop: 2,
    color: 'rgba(157, 157, 157, 1)',
  },

  // Modern Card Styles
  modernCard: {
    backgroundColor: '#000000',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
  },
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  
  cardContent: {
    padding: 16,
  },
  
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#CCCCCC',
    lineHeight: 22,
  },

  // Stats Cards
  statsCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  
  statCard: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  
  statInfo: {
    flex: 1,
  },
  
  statLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 4,
  },
  
  statValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },

  // Info Rows
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  
  infoValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'right',
  },

  // Benefits
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  benefitIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  
  benefitText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#CCCCCC',
    lineHeight: 20,
  },

  // Link Cards Modern
  linkCardModern: {
    backgroundColor: '#000000',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
  },
  
  linkCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  
  linkIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  
  linkCardInfo: {
    flex: 1,
  },
  
  linkCardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  
  linkCardSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  
  linkUrlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333333',
  },
  
  linkUrlText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#4ADE80',
    marginRight: 12,
  },
  
  copyButtonModern: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  
  copyButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    marginLeft: 6,
  },

  // Tips Card
  tipsCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    overflow: 'hidden',
  },
  
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  tipText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#CCCCCC',
    marginLeft: 12,
  },

  // Category Filters
  categoryFilters: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666666',
  },
  
  categoryFilterActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  
  categoryFilterText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#A0A0A0',
  },
  
  categoryFilterTextActive: {
    color: '#000000',
  },

  // Materials Grid Modern
  materialesGridModern: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  materialItemModern: {
    width: '48%',
    backgroundColor: '#000000',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
  },
  
  materialImageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  
  materialThumbnailModern: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333333',
  },
  
  playIconModern: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  materialTypeTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  
  materialTypeText: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  
  materialInfo: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  materialName: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginRight: 8,
  },
  
  materialActions: {
    flexDirection: 'row',
    gap: 8,
  },
  
  materialActionButton: {
    padding: 6,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 20,
  },

  // Product Modal Styles
  productModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  productModalOverlay: {
    flex: 1,
  },
  
  productModalContent: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  
  productImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 80,
  },
  
  productFullscreenImage: {
    width: width - 64,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 24,
  },
  
  productInfoOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 40,
    right: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
    borderRadius: 12,
  },
  
  productModalName: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  
  productModalPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#4ADE80',
  },
  
  productActions: {
    position: 'absolute',
    right: 32,
    bottom: 140,
    alignItems: 'center',
    gap: 16,
  },
  
  productActionButton: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 12,
  },

  // Comment Modal Styles
  commentModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  commentModalOverlay: {
    flex: 1,
  },

  commentModalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
    minHeight: 400,
  },

  commentModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },

  commentModalCancel: {
    fontSize: 16,
    color: '#A0A0A0',
    fontFamily: 'Poppins-Regular',
  },

  commentModalTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },

  commentModalSend: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
  },

  commentModalSendActive: {
    color: '#4ADE80',
  },

  commentInputContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  commentInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    minHeight: 120,
    textAlignVertical: 'top',
  },

  commentCounter: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'right',
    marginTop: 8,
    fontFamily: 'Poppins-Regular',
  },

  emojiReactions: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  emojiLabel: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 12,
    fontFamily: 'Poppins-Regular',
  },

  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  emojiButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
  },

  emoji: {
    fontSize: 20,
  },
});

export default CampaignDetailModal;