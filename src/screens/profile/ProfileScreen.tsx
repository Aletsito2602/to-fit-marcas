import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Modal,
  Animated,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useTiendaActual } from '../../hooks/useTiendaActual';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';
import ModernCalendar from '../../components/metrics/ModernCalendar';

interface Evento {
  id: string;
  titulo: string;
  descripcion?: string;
  fecha: Date;
  imagenFondo: string;
  logoMarca: string;
  publicaciones: number;
  participantes?: number;
  ubicacion?: string;
  tipo: 'lanzamiento' | 'colaboracion' | 'evento' | 'competencia';
  estado: 'programado' | 'en_curso' | 'finalizado';
}

const CalendarioTab: React.FC = () => {
  const [proximosEventos, setProximosEventos] = useState<Evento[]>([]);
  
  // Eventos para el calendario moderno
  const calendarEvents = [
    {
      id: '1',
      date: '2025-01-28',
      title: 'New Drop Classic',
      type: 'launch' as const,
    },
    {
      id: '2',
      date: '2025-01-30',
      title: '10K Adidas',
      type: 'meeting' as const,
    },
    {
      id: '3',
      date: '2025-02-02',
      title: 'Summer Collection',
      type: 'deadline' as const,
    },
    {
      id: '4',
      date: '2025-02-05',
      title: 'Adidas x Creators',
      type: 'campaign' as const,
    },
    {
      id: '5',
      date: '2025-02-14',
      title: 'Evento San Valentín',
      type: 'launch' as const,
    },
  ];

  const eventosData: Evento[] = [
    {
      id: '1',
      titulo: 'New Drop Classic',
      descripcion: 'Lanzamiento de la nueva colección clásica de Adidas',
      fecha: new Date('2025-04-30'),
      imagenFondo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      logoMarca: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=60&h=60&fit=crop',
      publicaciones: 98,
      participantes: 1200,
      ubicacion: 'Buenos Aires, Argentina',
      tipo: 'lanzamiento',
      estado: 'programado'
    },
    {
      id: '2',
      titulo: '10K Adidas',
      descripcion: 'Carrera de 10K patrocinada por Adidas',
      fecha: new Date('2025-05-20'),
      imagenFondo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      logoMarca: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=60&h=60&fit=crop',
      publicaciones: 124,
      participantes: 2500,
      ubicacion: 'Parque Centenario',
      tipo: 'evento',
      estado: 'programado'
    },
    {
      id: '3',
      titulo: 'Summer Collection',
      descripcion: 'Preview exclusivo de la colección de verano',
      fecha: new Date('2025-06-15'),
      imagenFondo: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop',
      logoMarca: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=60&h=60&fit=crop',
      publicaciones: 67,
      participantes: 800,
      ubicacion: 'Showroom Palermo',
      tipo: 'lanzamiento',
      estado: 'programado'
    },
    {
      id: '4',
      titulo: 'Adidas x Creators',
      descripcion: 'Encuentro de creadores de contenido con Adidas',
      fecha: new Date('2025-07-10'),
      imagenFondo: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
      logoMarca: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=60&h=60&fit=crop',
      publicaciones: 156,
      participantes: 500,
      ubicacion: 'Estudio Creativo',
      tipo: 'colaboracion',
      estado: 'programado'
    }
  ];

  React.useEffect(() => {
    const eventosFuturos = eventosData
      .filter(evento => evento.fecha > new Date())
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
    
    setProximosEventos(eventosFuturos);
  }, []);

  const formatearFecha = (fecha: Date) => {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                   'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    return {
      mes: meses[fecha.getMonth()],
      dia: fecha.getDate().toString()
    };
  };

  const getTipoColor = (tipo: string) => {
    switch(tipo) {
      case 'lanzamiento': return { backgroundColor: '#4CAF50' };
      case 'colaboracion': return { backgroundColor: '#FF9800' };
      case 'evento': return { backgroundColor: '#2196F3' };
      case 'competencia': return { backgroundColor: '#E91E63' };
      default: return { backgroundColor: '#666' };
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch(tipo) {
      case 'lanzamiento': return 'Lanzamiento';
      case 'colaboracion': return 'Colaboración';
      case 'evento': return 'Evento';
      case 'competencia': return 'Competencia';
      default: return 'Evento';
    }
  };

  const renderEvento = ({ item }: { item: Evento }) => {
    const { mes, dia } = formatearFecha(item.fecha);
    
    return (
      <TouchableOpacity 
        style={styles.eventoCard}
        activeOpacity={0.9}
      >
        <Image source={{uri: item.imagenFondo}} style={styles.eventoImagen} />
        <View style={styles.eventoOverlay} />
        
        <View style={styles.fechaBadge}>
          <Text style={styles.fechaMes}>{mes}</Text>
          <Text style={styles.fechaDia}>{dia}</Text>
        </View>
        
        <View style={styles.logoContainer}>
          <Image source={{uri: item.logoMarca}} style={styles.logoMarca} />
        </View>
        
        <View style={styles.eventoContent}>
          <Text style={styles.eventoTitulo}>{item.titulo}</Text>
          <Text style={styles.eventoPublicaciones}>
            {item.publicaciones} Publicaciones
          </Text>
          
          <View style={styles.eventoInfo}>
            <Text style={styles.eventoParticipantes}>
              {item.participantes} participantes
            </Text>
            <Text style={styles.eventoUbicacion}>{item.ubicacion}</Text>
          </View>
        </View>
        
        <View style={[styles.tipoIndicador, getTipoColor(item.tipo)]}>
          <Text style={styles.tipoTexto}>{getTipoLabel(item.tipo)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.calendarioContainer}>
      {/* Calendario ModernCalendar */}
      <ModernCalendar
        events={calendarEvents}
        onDatePress={(date) => console.log('Fecha seleccionada:', date)}
        onEventPress={(event) => console.log('Evento seleccionado:', event)}
      />
      
      <View style={styles.seccionHeader}>
        <Text style={styles.seccionTitulo}>Próximos eventos</Text>
        <TouchableOpacity>
          <Text style={styles.verTodos}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      {proximosEventos.length > 0 ? (
        <FlatList
          data={proximosEventos}
          renderItem={renderEvento}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventosContainer}
          snapToInterval={width * 0.75 + 16}
          decelerationRate="fast"
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No hay eventos programados</Text>
          <Text style={styles.emptySubtext}>
            Los próximos eventos aparecerán aquí
          </Text>
        </View>
      )}

      <View style={styles.seccionHeader}>
        <Text style={styles.seccionTitulo}>Eventos anteriores</Text>
      </View>

      <View style={styles.eventosAnteriores}>
        <TouchableOpacity style={styles.eventoAnteriorItem}>
          <View style={styles.eventoAnteriorFecha}>
            <Text style={styles.fechaAnteriorMes}>Mar</Text>
            <Text style={styles.fechaAnteriorDia}>15</Text>
          </View>
          <View style={styles.eventoAnteriorInfo}>
            <Text style={styles.eventoAnteriorTitulo}>Adidas Forum Launch</Text>
            <Text style={styles.eventoAnteriorEstado}>Finalizado • 89 publicaciones</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventoAnteriorItem}>
          <View style={styles.eventoAnteriorFecha}>
            <Text style={styles.fechaAnteriorMes}>Feb</Text>
            <Text style={styles.fechaAnteriorDia}>28</Text>
          </View>
          <View style={styles.eventoAnteriorInfo}>
            <Text style={styles.eventoAnteriorTitulo}>Stan Smith Revival</Text>
            <Text style={styles.eventoAnteriorEstado}>Finalizado • 143 publicaciones</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

interface Capsula {
  id: string;
  nombre: string;
  marca: string;
  logoMarca: string;
  imagenes: string[];
  descripcion: string;
  fechaCreacion: string;
}

// Removido - Datos hardcodeados reemplazados por datos dinámicos del AuthContext
// Posts hardcodeados removidos - se cargarán dinámicamente desde Firebase

const capsulasData: Capsula[] = [
  {
    id: '1',
    nombre: 'ADIDAS X KORN',
    marca: 'Adidas',
    logoMarca: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=60&h=60&fit=crop',
    imagenes: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520256862855-398228c41684?w=400&h=600&fit=crop'
    ],
    descripcion: 'Colaboración exclusiva entre Adidas y Korn',
    fechaCreacion: '2025-01-15'
  },
  {
    id: '2',
    nombre: 'ADIDAS RETRO',
    marca: 'Adidas',
    logoMarca: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=60&h=60&fit=crop',
    imagenes: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1612902456551-333ac5afa26e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=600&fit=crop'
    ],
    descripcion: 'Colección retro de Adidas',
    fechaCreacion: '2025-01-10'
  },
  {
    id: '3',
    nombre: 'NIKE AIR FORCE',
    marca: 'Nike',
    logoMarca: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop',
    imagenes: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=400&h=600&fit=crop'
    ],
    descripcion: 'Icónica colección Air Force de Nike',
    fechaCreacion: '2025-01-08'
  }
];

const ProfileScreen: React.FC = () => {
  const { user: authUser } = useAuth();
  const { user, userPosts, userStats, loading: profileLoading } = useUserProfile();
  const { tienda } = useTiendaActual();
  const [activeTab, setActiveTab] = useState('publicaciones');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectedCapsula, setSelectedCapsula] = useState<Capsula | null>(null);
  const [capsulaModalOpen, setCapsulaModalOpen] = useState(false);
  const [selectedCapsulaImage, setSelectedCapsulaImage] = useState<string | null>(null);
  const [capsulaImageModalOpen, setCapsulaImageModalOpen] = useState(false);
  const translateY = new Animated.Value(0);
  const translateYCapsula = new Animated.Value(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCapsulaLiked, setIsCapsulaLiked] = useState(false);
  const [isCapsulaSaved, setIsCapsulaSaved] = useState(false);

  const tabs = [
    { id: 'publicaciones', label: 'Publicaciones', active: true },
    { id: 'capsulas', label: 'Cápsulas', hasDropdown: true },
    { id: 'calendario', label: 'Calendario' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'capsulas') {
      setShowDropdown(!showDropdown);
    } else {
      setShowDropdown(false);
    }
  };

  const handlePostClick = (post: any) => {
    translateY.setValue(0);
    setSelectedPost(post);
    setIsLiked(false);
    setIsSaved(false);
    setPostModalOpen(true);
  };

  const closePostModal = () => {
    setPostModalOpen(false);
    setTimeout(() => {
      setSelectedPost(null);
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
          setPostModalOpen(false);
          setTimeout(() => {
            setSelectedPost(null);
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

  const handleEditProfile = () => {
    console.log('Editar perfil');
  };

  const handleStatClick = (stat: string) => {
    console.log(`Ver ${stat}`);
  };

  const handleCapsulaPress = (capsula: Capsula) => {
    setSelectedCapsula(capsula);
    setCapsulaModalOpen(true);
  };

  const closeCapsulaModal = () => {
    setCapsulaModalOpen(false);
    setCapsulaImageModalOpen(false);
    setTimeout(() => {
      setSelectedCapsula(null);
      setSelectedCapsulaImage(null);
      translateYCapsula.setValue(0);
    }, 300);
  };

  const handleCapsulaImagePress = (imageUrl: string) => {
    translateYCapsula.setValue(0);
    setSelectedCapsulaImage(imageUrl);
    setIsCapsulaLiked(false);
    setIsCapsulaSaved(false);
    setCapsulaImageModalOpen(true);
  };

  const closeCapsulaImageModal = () => {
    setCapsulaImageModalOpen(false);
    setIsCapsulaLiked(false);
    setIsCapsulaSaved(false);
    setTimeout(() => {
      setSelectedCapsulaImage(null);
      translateYCapsula.setValue(0);
    }, 50);
  };

  const handleLikePress = () => {
    setIsLiked(!isLiked);
  };

  const handleSavePress = () => {
    setIsSaved(!isSaved);
  };

  const handleCommentPress = () => {
    console.log('Abrir comentarios');
  };

  const handleMorePress = () => {
    console.log('Abrir más opciones');
  };

  const handleCapsulaLikePress = () => {
    setIsCapsulaLiked(!isCapsulaLiked);
  };

  const handleCapsulaSavePress = () => {
    setIsCapsulaSaved(!isCapsulaSaved);
  };

  const handleCapsulaCommentPress = () => {
    console.log('Abrir comentarios capsula');
  };

  const handleCapsulaMorePress = () => {
    console.log('Abrir más opciones capsula');
  };

  const onCapsulaGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateYCapsula } }],
    { useNativeDriver: false }
  );

  const onCapsulaGestureStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY, velocityY } = event.nativeEvent;
      
      if (translationY > 100 || velocityY > 500) {
        Animated.timing(translateYCapsula, {
          toValue: 800,
          duration: 250,
          useNativeDriver: false,
        }).start(() => {
          setCapsulaImageModalOpen(false);
          setIsCapsulaLiked(false);
          setIsCapsulaSaved(false);
          setTimeout(() => {
            setSelectedCapsulaImage(null);
            translateYCapsula.setValue(0);
          }, 50);
        });
      } else {
        Animated.spring(translateYCapsula, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  const renderPost = ({ item, index }: { item: any; index: number }) => {
    const isEven = index % 2 === 0;
    return (
      <TouchableOpacity
        style={[
          styles.postItem,
          { marginRight: isEven ? 4 : 0, marginLeft: isEven ? 0 : 4 }
        ]}
        onPress={() => handlePostClick(item)}
      >
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.postOverlay}>
          <View style={styles.postStats}>
            <View style={styles.statRow}>
              <Ionicons name="heart" size={16} color="#FFFFFF" />
              <Text style={styles.statText}>{item.likes}</Text>
            </View>
            <View style={styles.statRow}>
              <Ionicons name="chatbubble" size={16} color="#FFFFFF" />
              <Text style={styles.statText}>{item.comments}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCapsula = ({ item, index }: { item: Capsula; index: number }) => {
    const isEven = index % 2 === 0;
    return (
      <TouchableOpacity
        style={[
          styles.capsulaItem,
          { marginRight: isEven ? 4 : 0, marginLeft: isEven ? 0 : 4 }
        ]}
        onPress={() => handleCapsulaPress(item)}
      >
        <Image source={{ uri: item.imagenes[0] }} style={styles.capsulaImage} />
        <View style={styles.capsulaOverlay}>
          <View style={styles.capsulaHeader}>
            <Image source={{ uri: item.logoMarca }} style={styles.capsulaLogo} />
            <Text style={styles.capsulaNombre}>{item.nombre}</Text>
          </View>
          <Text style={styles.capsulaMarca}>{item.marca}</Text>
          <Text style={styles.capsulaCount}>{item.imagenes.length} fotos</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTabButton = (tab: any) => (
    <TouchableOpacity
      key={tab.id}
      style={styles.tabButton}
      onPress={() => handleTabChange(tab.id)}
    >
      <View style={styles.tabContent}>
        <Text
          style={[
            styles.tabText,
            activeTab === tab.id && styles.activeTabText
          ]}
        >
          {tab.label}
        </Text>
        {tab.hasDropdown && (
          <Ionicons
            name={showDropdown ? "chevron-up" : "chevron-down"}
            size={16}
            color={activeTab === tab.id ? "#FFFFFF" : "#A0A0A0"}
            style={styles.dropdownIcon}
          />
        )}
      </View>
      {activeTab === tab.id && <View style={styles.activeTabIndicator} />}
    </TouchableOpacity>
  );

  // Debug: Log user data to see what's being loaded
  React.useEffect(() => {
    if (user) {
      console.log('=== USER DATA DEBUG (ProfileScreen) ===');
      console.log('Full user object:', JSON.stringify(user, null, 2));
      console.log('Photo URL exists:', !!user.photo_url);
      console.log('Photo URL value:', user.photo_url);
      console.log('Portada exists:', !!user.portada);
      console.log('Portada value:', user.portada);
      console.log('Display Name:', user.display_name);
      console.log('Alias:', user.alias);
      console.log('User keys:', Object.keys(user));
      console.log('=======================================');
    } else {
      console.log('No user data available in ProfileScreen');
    }
  }, [user]);

  // Mostrar loading mientras se cargan los datos del perfil
  if (profileLoading) {
    return (
      <View style={styles.fullContainer}>
        <SafeAreaView style={styles.container}>
          <BackgroundPattern opacity={0.06} />
          <Header />
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando perfil...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.fullContainer}>
      <SafeAreaView style={styles.container}>
        <BackgroundPattern opacity={0.06} />
        <Header />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header de perfil con banner */}
          <View style={styles.profileHeader}>
            {/* Banner de fondo */}
            <View style={styles.bannerContainer}>
              <Image 
                source={{ 
                  uri: user?.portada || 'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop'
                }} 
                style={styles.bannerImage}
                onError={(e) => {
                  console.log('Error loading banner:', e.nativeEvent.error);
                  console.log('Banner URL attempted:', user?.portada);
                }}
                onLoad={() => {
                  console.log('Banner loaded successfully');
                  console.log('Banner URL used:', user?.portada || 'fallback');
                }}
                defaultSource={{uri: 'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop'}}
              />
              <View style={styles.bannerOverlay} />
              {/* Debug indicator */}
              {!user?.portada && (
                <View style={styles.debugBadge}>
                  <Text style={styles.debugBadgeText}>Fallback Banner</Text>
                </View>
              )}
            </View>

            {/* Información del usuario */}
            <View style={styles.userInfoContainer}>
            {/* Avatar superpuesto */}
            <View style={styles.avatarContainer}>
              <Image 
                source={{ 
                  uri: tienda?.logo || user?.photo_url || 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face'
                }} 
                style={styles.avatar}
                onError={(e) => {
                  console.log('Error loading avatar:', e.nativeEvent.error);
                  console.log('Avatar URL attempted:', tienda?.logo || user?.photo_url);
                }}
                onLoad={() => {
                  console.log('Avatar loaded successfully');
                  console.log('Avatar URL used:', tienda?.logo || user?.photo_url || 'fallback');
                }}
                defaultSource={{uri: 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face'}}
              />
              {/* Debug indicator */}
              {!tienda?.logo && !user?.photo_url && (
                <View style={styles.debugBadge}>
                  <Text style={styles.debugBadgeText}>Fallback Avatar</Text>
                </View>
              )}
            </View>

            {/* Info del usuario */}
            <View style={styles.userInfo}>
              <View style={styles.userTextAndButtons}>
                <View style={styles.userTextContainer}>
                  <Text style={styles.userName}>{user?.display_name || user?.nombre_completo || 'Usuario'}</Text>
                  <Text style={styles.userHandle}>{user?.alias || '@usuario'}</Text>
                  <Text style={styles.userLocation}>{user?.enlaces || 'Ubicación no disponible'}</Text>
                  <Text style={styles.userBio}>{user?.descripcion || 'Sin descripción disponible'}</Text>
                </View>
                
                {/* Botones Comprar y Seguir */}
                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity style={styles.comprarButton}>
                    <Text style={styles.comprarButtonText}>Comprar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.seguirButton}>
                    <Text style={styles.seguirButtonText}>Seguir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Estadísticas de usuario */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statItem} onPress={() => handleStatClick('seguidores')}>
            <Text style={styles.statValue}>{userStats.followers.toString()}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.statItem} onPress={() => handleStatClick('seguidos')}>
            <Text style={styles.statValue}>{userStats.following.toString()}</Text>
            <Text style={styles.statLabel}>Seguidos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.statItem} onPress={() => handleStatClick('publicaciones')}>
            <Text style={styles.statValue}>{userStats.posts.toString()}</Text>
            <Text style={styles.statLabel}>Publicaciones</Text>
          </TouchableOpacity>
        </View>

        {/* Navegación de tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map(renderTabButton)}
        </View>

        {/* Dropdown para Cápsulas */}
        {showDropdown && (
          <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Ver todas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Favoritas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>Recientes</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Contenido según tab activo */}
        {activeTab === 'publicaciones' && (
          <FlatList
            data={userPosts.map(post => ({
              id: post.id,
              image: post.portada,
              likes: post.likes?.length || 0,
              comments: 0, // TODO: Implementar conteo de comentarios
              description: post.info
            }))}
            renderItem={renderPost}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            style={styles.postsGrid}
            scrollEnabled={false}
            columnWrapperStyle={styles.postRow}
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No hay publicaciones aún</Text>
                <Text style={styles.emptySubtext}>Tus publicaciones aparecerán aquí</Text>
              </View>
            )}
          />
        )}

        {activeTab === 'capsulas' && (
          <FlatList
            data={capsulasData}
            renderItem={renderCapsula}
            keyExtractor={(item) => item.id}
            numColumns={2}
            style={styles.postsGrid}
            scrollEnabled={false}
            columnWrapperStyle={styles.postRow}
          />
        )}

        {activeTab === 'calendario' && (
          <CalendarioTab />
        )}
      </ScrollView>

      {/* Bottom Sheet de post */}
      <Modal
        visible={postModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={closePostModal}
      >
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity style={styles.bottomSheetOverlay} onPress={closePostModal} />
          {selectedPost && (
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onGestureStateChange}
            >
              <Animated.View style={[
                styles.postBottomSheetContent,
                {
                  transform: [{ translateY: translateY }]
                }
              ]}>

              {/* Imagen del post en fullscreen */}
              <View style={styles.postImageContainer}>
                <Image source={{ uri: selectedPost.image }} style={styles.postFullscreenImage} />
              </View>

              {/* Botones de acción en el lado derecho */}
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
                  <Ionicons 
                    name={isLiked ? "heart" : "heart-outline"} 
                    size={24} 
                    color={isLiked ? "#FF3040" : "#FFFFFF"} 
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleCommentPress}>
                  <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleSavePress}>
                  <Ionicons 
                    name={isSaved ? "bookmark" : "bookmark-outline"} 
                    size={24} 
                    color={isSaved ? "#FFFFFF" : "#FFFFFF"} 
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleMorePress}>
                  <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              </Animated.View>
            </PanGestureHandler>
          )}
        </View>
      </Modal>

      {/* Bottom Sheet de cápsula */}
      <Modal
        visible={capsulaModalOpen && !capsulaImageModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={closeCapsulaModal}
      >
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity style={styles.bottomSheetOverlay} onPress={closeCapsulaModal} />
          {selectedCapsula && (
            <View style={styles.bottomSheetContent}>
              {/* Header del Bottom Sheet */}
              <View style={styles.bottomSheetHeader}>
                <TouchableOpacity onPress={closeCapsulaModal} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.bottomSheetTitle}>{selectedCapsula.nombre}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Grid de imágenes de la cápsula */}
              <FlatList
                data={selectedCapsula.imagenes}
                renderItem={({ item, index }) => (
                  <TouchableOpacity 
                    style={styles.bottomSheetImageContainer}
                    onPress={() => handleCapsulaImagePress(item)}
                  >
                    <Image source={{ uri: item }} style={styles.bottomSheetImage} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                style={styles.bottomSheetGrid}
                columnWrapperStyle={styles.bottomSheetRow}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      </Modal>

      {/* Modal para imagen individual de cápsula */}
      <Modal
        visible={capsulaImageModalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={closeCapsulaImageModal}
      >
        <View style={styles.bottomSheetContainer}>
          <TouchableOpacity style={styles.bottomSheetOverlay} onPress={closeCapsulaImageModal} />
          {selectedCapsulaImage && (
            <PanGestureHandler
              onGestureEvent={onCapsulaGestureEvent}
              onHandlerStateChange={onCapsulaGestureStateChange}
            >
              <Animated.View style={[
                styles.postBottomSheetContent,
                {
                  transform: [{ translateY: translateYCapsula }]
                }
              ]}>

              {/* Imagen de la cápsula en fullscreen */}
              <View style={styles.postImageContainer}>
                <Image source={{ uri: selectedCapsulaImage }} style={styles.postFullscreenImage} />
              </View>

              {/* Botones de acción en el lado derecho */}
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton} onPress={handleCapsulaLikePress}>
                  <Ionicons 
                    name={isCapsulaLiked ? "heart" : "heart-outline"} 
                    size={24} 
                    color={isCapsulaLiked ? "#FF3040" : "#FFFFFF"} 
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleCapsulaCommentPress}>
                  <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleCapsulaSavePress}>
                  <Ionicons 
                    name={isCapsulaSaved ? "bookmark" : "bookmark-outline"} 
                    size={24} 
                    color={isCapsulaSaved ? "#FFFFFF" : "#FFFFFF"} 
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleCapsulaMorePress}>
                  <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              </Animated.View>
            </PanGestureHandler>
          )}
        </View>
      </Modal>
      
      <BottomTabBar />
    </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    paddingTop: 0,
  },
  profileHeader: {
    marginBottom: 20,
  },
  bannerContainer: {
    position: 'relative',
    height: 250,
    marginHorizontal: 0,
    marginTop: -55,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  userInfoContainer: {
    backgroundColor: '#000000',
    marginHorizontal: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    position: 'absolute',
    top: -48,
    left: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 15, // Radio de 15px como en MiTienda
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    paddingTop: 22,
  },
  userTextAndButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  comprarButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  comprarButtonText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  seguirButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  seguirButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  userName: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 8,
  },
  userLocation: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
    marginBottom: 12,
  },
  userBio: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    lineHeight: 20,
    maxWidth: width - 80,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 0,
    marginBottom: 32,
    gap: 0,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 32,
  },
  tabButton: {
    position: 'relative',
    alignItems: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#A0A0A0',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  dropdownContainer: {
    backgroundColor: '#1C1C1C',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
  },
  postsGrid: {
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  postRow: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  postItem: {
    width: (width - 40) / 2,
    aspectRatio: 0.75,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  // Estilos para cápsulas
  capsulaItem: {
    width: (width - 48) / 2,
    aspectRatio: 0.75,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1C1C1C',
    marginBottom: 8,
  },
  capsulaImage: {
    width: '100%',
    height: '70%',
  },
  capsulaOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 12,
    height: '30%',
  },
  capsulaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  capsulaLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  capsulaNombre: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    flex: 1,
  },
  capsulaMarca: {
    color: '#A0A0A0',
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  capsulaCount: {
    color: '#666666',
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  // Bottom Sheet de cápsula
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetOverlay: {
    flex: 1,
  },
  bottomSheetContent: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    paddingTop: 20,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 4,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  moreButton: {
    padding: 4,
  },
  bottomSheetGrid: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bottomSheetRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  bottomSheetImageContainer: {
    width: (width - 40) / 2,
    aspectRatio: 0.75,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bottomSheetImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Bottom Sheet específico para posts
  postBottomSheetContent: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  postHeaderCenter: {
    flex: 1,
    alignItems: 'center',
  },
  postHeaderStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  postStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postStatText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  postImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 80,
  },
  postFullscreenImage: {
    width: width - 64,
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 24,
  },
  postActions: {
    position: 'absolute',
    right: 32,
    bottom: 140,
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 12,
  },
  // Contenido vacío
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#666666',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },

  // Estilos para CalendarioTab
  calendarioContainer: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: 20,
  },

  seccionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },

  seccionTitulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },

  verTodos: {
    color: '#4A90E2',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },

  eventosContainer: {
    paddingLeft: 16,
    paddingBottom: 20,
  },

  eventoCard: {
    width: width * 0.75,
    height: 200,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },

  eventoImagen: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  eventoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  fechaBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 50,
  },

  fechaMes: {
    color: '#333333',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    textTransform: 'uppercase',
  },

  fechaDia: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    lineHeight: 18,
  },

  logoContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoMarca: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  eventoContent: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },

  eventoTitulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },

  eventoPublicaciones: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },

  eventoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  eventoParticipantes: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    opacity: 0.8,
  },

  eventoUbicacion: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    opacity: 0.8,
    flex: 1,
    textAlign: 'right',
  },

  tipoIndicador: {
    position: 'absolute',
    top: 60,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    maxWidth: 100,
  },

  tipoTexto: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },

  emptySubtext: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },

  eventosAnteriores: {
    paddingHorizontal: 16,
  },

  eventoAnteriorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },

  eventoAnteriorFecha: {
    width: 50,
    alignItems: 'center',
    marginRight: 16,
  },

  fechaAnteriorMes: {
    color: '#666666',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textTransform: 'uppercase',
  },

  fechaAnteriorDia: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },

  eventoAnteriorInfo: {
    flex: 1,
  },

  eventoAnteriorTitulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
  },

  eventoAnteriorEstado: {
    color: '#666666',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },

  // Debug indicators
  debugBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  
  debugBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  
  debugIndicator: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 4,
    borderRadius: 4,
  },
  
  avatarDebugIndicator: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 2,
    borderRadius: 4,
    alignItems: 'center',
  },
  
  debugText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontFamily: 'Poppins-Regular',
  },
});

export default ProfileScreen;