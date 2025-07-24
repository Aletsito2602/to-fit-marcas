import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

const SettingsScreen: React.FC = () => {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  const handleLogout = async () => {
    await logout();
  };

  const settingsGroups = [
    {
      title: 'Cuenta',
      items: [
        {
          icon: 'person-outline',
          label: 'Información personal',
          action: () => {},
          hasArrow: true,
        },
        {
          icon: 'lock-closed-outline',
          label: 'Cambiar contraseña',
          action: () => {},
          hasArrow: true,
        },
        {
          icon: 'card-outline',
          label: 'Métodos de pago',
          action: () => {},
          hasArrow: true,
        },
      ],
    },
    {
      title: 'Notificaciones',
      items: [
        {
          icon: 'notifications-outline',
          label: 'Notificaciones push',
          action: () => setNotifications(!notifications),
          toggle: notifications,
        },
        {
          icon: 'mail-outline',
          label: 'Email marketing',
          action: () => setEmailMarketing(!emailMarketing),
          toggle: emailMarketing,
        },
      ],
    },
    {
      title: 'Tienda',
      items: [
        {
          icon: 'storefront-outline',
          label: 'Configuración de tienda',
          action: () => {},
          hasArrow: true,
        },
        {
          icon: 'car-outline',
          label: 'Métodos de envío',
          action: () => {},
          hasArrow: true,
        },
        {
          icon: 'receipt-outline',
          label: 'Configuración fiscal',
          action: () => {},
          hasArrow: true,
        },
      ],
    },
    {
      title: 'Aplicación',
      items: [
        {
          icon: 'moon-outline',
          label: 'Modo oscuro',
          action: () => setDarkMode(!darkMode),
          toggle: darkMode,
        },
        {
          icon: 'bar-chart-outline',
          label: 'Análisis de uso',
          action: () => setAnalytics(!analytics),
          toggle: analytics,
        },
        {
          icon: 'language-outline',
          label: 'Idioma',
          action: () => {},
          hasArrow: true,
          value: 'Español',
        },
      ],
    },
    {
      title: 'Soporte',
      items: [
        {
          icon: 'help-circle-outline',
          label: 'Centro de ayuda',
          action: () => {},
          hasArrow: true,
        },
        {
          icon: 'chatbubble-outline',
          label: 'Contactar soporte',
          action: () => {},
          hasArrow: true,
        },
        {
          icon: 'document-text-outline',
          label: 'Términos y condiciones',
          action: () => {},
          hasArrow: true,
        },
        {
          icon: 'shield-outline',
          label: 'Política de privacidad',
          action: () => {},
          hasArrow: true,
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => (
    <TouchableOpacity
      key={item.label}
      style={styles.settingItem}
      onPress={item.action}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={item.icon} size={20} color="#FFFFFF" />
        <Text style={styles.settingLabel}>{item.label}</Text>
      </View>
      
      <View style={styles.settingRight}>
        {item.value && (
          <Text style={styles.settingValue}>{item.value}</Text>
        )}
        {item.toggle !== undefined && (
          <Switch
            value={item.toggle}
            onValueChange={item.action}
            trackColor={{ false: '#333333', true: '#007AFF' }}
            thumbColor={item.toggle ? '#FFFFFF' : '#A0A0A0'}
          />
        )}
        {item.hasArrow && (
          <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundPattern opacity={0.06} />
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Configuración</Text>
          <Text style={styles.subtitle}>Personaliza tu experiencia</Text>
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <View key={group.title} style={styles.settingGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupContainer}>
              {group.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionLabel}>Versión de la aplicación</Text>
          <Text style={styles.versionNumber}>1.0.0 (Build 1)</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
          <Text style={styles.deleteText}>Eliminar cuenta</Text>
        </TouchableOpacity>
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
  settingGroup: {
    marginBottom: 30,
  },
  groupTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  groupContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginRight: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  versionLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#A0A0A0',
    marginBottom: 4,
  },
  versionNumber: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#666666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#EF4444',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  deleteText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#EF4444',
    marginLeft: 8,
  },
});

export default SettingsScreen;