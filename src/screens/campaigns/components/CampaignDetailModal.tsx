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
} from 'react-native';
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
const CampañaTab = () => {
  const productos = [
    {
      id: 1,
      nombre: "BUZO PIZZA",
      precio: "$79.900",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=BUZO",
      disponible: true
    },
    {
      id: 2,
      nombre: "CHAQUETA MANCHENTE",
      precio: "$109.900",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=CHAQUETA",
      disponible: true
    },
    {
      id: 3,
      nombre: "REMERA SPICY",
      precio: "$54.900",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=REMERA",
      disponible: true
    },
    {
      id: 4,
      nombre: "REMERA OUT",
      precio: "$34.900",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=OUT",
      disponible: true
    },
    {
      id: 5,
      nombre: "PANTALON SERPENT",
      precio: "$129.900",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=PANTALON",
      disponible: true
    },
    {
      id: 6,
      nombre: "REMERA REVISTAS",
      precio: "$34.900",
      imagen: "https://via.placeholder.com/150x100/333/fff?text=REVISTAS",
      disponible: true
    }
  ];

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.productGrid}>
        {productos.map(producto => (
          <View key={producto.id} style={styles.productCard}>
            <Image source={{uri: producto.imagen}} style={styles.productImage} />
            <Text style={styles.productName}>{producto.nombre}</Text>
            <Text style={styles.productPrice}>{producto.precio}</Text>
          </View>
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
    <ScrollView style={styles.tabContent}>
      <View style={styles.detailSection}>
        <Text style={styles.detailLabel}>Comisión de la campaña:</Text>
        <Text style={styles.detailValue}>{detalles.comision}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.detailLabel}>Fecha de la campaña</Text>
        <Text style={styles.detailValue}>{detalles.fechaInicio}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.detailLabel}>Nombre de la campañante</Text>
        <Text style={styles.detailValue}>{detalles.nombreCampañante}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.detailLabel}>Campaña Red Flag</Text>
        <Text style={styles.detailValue}>{detalles.campaña}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.sectionTitle}>Objetivo:</Text>
        <Text style={styles.detailText}>{detalles.objetivo}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.sectionTitle}>¿A quién está dirigido?</Text>
        <Text style={styles.detailText}>{detalles.publicoObjetivo}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.sectionTitle}>¿Qué busca la marca?</Text>
        <Text style={styles.detailText}>{detalles.mercado}</Text>
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.sectionTitle}>Contenido incluido:</Text>
        {detalles.contenidoIncluido.map((item, index) => (
          <Text key={index} style={styles.bulletPoint}>• {item}</Text>
        ))}
      </View>
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
    Alert.alert('Copiado', 'Link copiado al portapapeles');
  };

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.linkSection}>
        <Text style={styles.sectionTitle}>Links de afiliación</Text>
        
        <View style={styles.linkItem}>
          <View style={styles.linkInfo}>
            <Text style={styles.linkLabel}>Nombre:</Text>
            <Text style={styles.linkUrl}>{links.afiliacion}</Text>
          </View>
          <TouchableOpacity 
            style={styles.copyButton}
            onPress={() => copyToClipboard(links.afiliacion)}
          >
            <Ionicons name="copy-outline" size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        <View style={styles.linkItem}>
          <View style={styles.linkInfo}>
            <Text style={styles.linkLabel}>Días de duración:</Text>
            <Text style={styles.linkUrl}>{links.duracion}</Text>
          </View>
          <TouchableOpacity 
            style={styles.copyButton}
            onPress={() => copyToClipboard(links.duracion)}
          >
            <Ionicons name="copy-outline" size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// TAB 4: MATERIALES
const MaterialesTab = () => {
  const materiales = [
    { id: 1, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=1', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=1' },
    { id: 2, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=2', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=2' },
    { id: 3, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=3', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=3' },
    { id: 4, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=4', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=4' },
    { id: 5, tipo: 'video', url: 'https://via.placeholder.com/150x150/333/fff?text=5', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=▶️' },
    { id: 6, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=6', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=6' },
    { id: 7, tipo: 'imagen', url: 'https://via.placeholder.com/150x150/333/fff?text=7', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=7' },
    { id: 8, tipo: 'video', url: 'https://via.placeholder.com/150x150/333/fff?text=8', thumbnail: 'https://via.placeholder.com/150x150/333/fff?text=▶️' }
  ];

  const openMaterial = (material: any) => {
    Alert.alert('Material', `Abrir ${material.tipo}: ${material.id}`);
  };

  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.materialesGrid}>
        {materiales.map(material => (
          <TouchableOpacity 
            key={material.id} 
            style={styles.materialItem}
            onPress={() => openMaterial(material)}
          >
            <Image 
              source={{uri: material.thumbnail}} 
              style={styles.materialThumbnail} 
            />
            {material.tipo === 'video' && (
              <View style={styles.playIcon}>
                <Ionicons name="play" size={20} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
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
  
  if (!campaign) return null;

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
    if (!currentTab) return <CampañaTab />;
    
    const TabComponent = currentTab.component;
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
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
            </TouchableOpacity>
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
    backgroundColor: 'rgba(41, 41, 41, 1)',
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
    backgroundColor: 'rgba(41, 41, 41, 1)',
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
    backgroundColor: '#1C1C1C',
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
    backgroundColor: '#1C1C1C',
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
    backgroundColor: '#1C1C1C',
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
    backgroundColor: '#1C1C1C',
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
});

export default CampaignDetailModal;