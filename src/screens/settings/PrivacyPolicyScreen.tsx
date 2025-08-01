import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackgroundPattern from '../../components/BackgroundPattern';
import BottomTabBar from '../../components/BottomTabBar';

interface PrivacyPolicyScreenProps {
  navigation: any;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ navigation }) => {
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
            <Text style={styles.title}>Política de Privacidad</Text>
            <Text style={styles.subtitle}>Conoce cómo protegemos tu información</Text>
          </View>
        </View>

        <Text style={styles.lastUpdated}>Última actualización: 1 de enero de 2024</Text>
        <Text style={styles.lastUpdated}>Última actualización: 1 de enero de 2024</Text>

        <View style={styles.introSection}>
          <Text style={styles.introText}>
            En To FIT Marcas, respetamos su privacidad y nos comprometemos a proteger 
            su información personal. Esta política describe cómo recopilamos, usamos y 
            protegemos su información.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Información que Recopilamos</Text>
          
          <Text style={styles.subsectionTitle}>Información Personal</Text>
          <Text style={styles.paragraph}>
            Recopilamos información que usted nos proporciona directamente:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>• Nombre completo y información de contacto</Text>
            <Text style={styles.bulletPoint}>• Dirección de email y número de teléfono</Text>
            <Text style={styles.bulletPoint}>• Información de facturación y envío</Text>
            <Text style={styles.bulletPoint}>• Datos de pago (procesados de forma segura)</Text>
            <Text style={styles.bulletPoint}>• Información del perfil de usuario</Text>
          </View>

          <Text style={styles.subsectionTitle}>Información Automática</Text>
          <Text style={styles.paragraph}>
            También recopilamos información automáticamente cuando usa nuestra aplicación:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>• Datos de uso y navegación</Text>
            <Text style={styles.bulletPoint}>• Dirección IP y información del dispositivo</Text>
            <Text style={styles.bulletPoint}>• Cookies y tecnologías similares</Text>
            <Text style={styles.bulletPoint}>• Información de geolocalización (con su permiso)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Cómo Usamos su Información</Text>
          <Text style={styles.paragraph}>
            Utilizamos su información para:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>• Proporcionar y mejorar nuestros servicios</Text>
            <Text style={styles.bulletPoint}>• Procesar transacciones y pagos</Text>
            <Text style={styles.bulletPoint}>• Comunicarnos con usted sobre su cuenta</Text>
            <Text style={styles.bulletPoint}>• Enviar actualizaciones y notificaciones</Text>
            <Text style={styles.bulletPoint}>• Prevenir fraudes y garantizar la seguridad</Text>
            <Text style={styles.bulletPoint}>• Cumplir con obligaciones legales</Text>
            <Text style={styles.bulletPoint}>• Personalizar su experiencia</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Compartir Información</Text>
          <Text style={styles.paragraph}>
            No vendemos su información personal. Podemos compartir su información en 
            estas circunstancias limitadas:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>• Con su consentimiento explícito</Text>
            <Text style={styles.bulletPoint}>• Con proveedores de servicios de confianza</Text>
            <Text style={styles.bulletPoint}>• Para cumplir con la ley o procesos legales</Text>
            <Text style={styles.bulletPoint}>• Para proteger nuestros derechos y seguridad</Text>
            <Text style={styles.bulletPoint}>• En caso de fusión o adquisición empresarial</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Seguridad de los Datos</Text>
          <Text style={styles.paragraph}>
            Implementamos medidas de seguridad técnicas y organizativas apropiadas para 
            proteger su información personal contra acceso no autorizado, alteración, 
            divulgación o destrucción.
          </Text>
          <View style={styles.securityCard}>
            <Ionicons name="shield-checkmark" size={24} color="#00D4AA" />
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Medidas de Seguridad</Text>
              <Text style={styles.securityText}>
                • Encriptación SSL/TLS para transmisión de datos
                {'\n'}• Almacenamiento seguro en servidores protegidos
                {'\n'}• Acceso limitado solo a personal autorizado
                {'\n'}• Monitoreo continuo de actividades sospechosas
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Sus Derechos</Text>
          <Text style={styles.paragraph}>
            Usted tiene los siguientes derechos respecto a su información personal:
          </Text>
          <View style={styles.rightsGrid}>
            <View style={styles.rightItem}>
              <Ionicons name="eye" size={20} color="#00D4AA" />
              <Text style={styles.rightTitle}>Acceso</Text>
              <Text style={styles.rightDescription}>Ver qué información tenemos sobre usted</Text>
            </View>
            <View style={styles.rightItem}>
              <Ionicons name="create" size={20} color="#00D4AA" />
              <Text style={styles.rightTitle}>Rectificación</Text>
              <Text style={styles.rightDescription}>Corregir información inexacta</Text>
            </View>
            <View style={styles.rightItem}>
              <Ionicons name="trash" size={20} color="#00D4AA" />
              <Text style={styles.rightTitle}>Eliminación</Text>
              <Text style={styles.rightDescription}>Solicitar borrado de sus datos</Text>
            </View>
            <View style={styles.rightItem}>
              <Ionicons name="download" size={20} color="#00D4AA" />
              <Text style={styles.rightTitle}>Portabilidad</Text>
              <Text style={styles.rightDescription}>Obtener una copia de sus datos</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Cookies y Tecnologías Similares</Text>
          <Text style={styles.paragraph}>
            Utilizamos cookies y tecnologías similares para mejorar su experiencia. 
            Puede controlar las cookies a través de la configuración de su navegador.
          </Text>
          <View style={styles.cookieTypes}>
            <Text style={styles.cookieType}>🍪 Cookies esenciales: Necesarias para el funcionamiento básico</Text>
            <Text style={styles.cookieType}>📊 Cookies de análisis: Para entender cómo usa nuestra app</Text>
            <Text style={styles.cookieType}>🎯 Cookies de personalización: Para personalizar su experiencia</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Retención de Datos</Text>
          <Text style={styles.paragraph}>
            Conservamos su información personal solo durante el tiempo necesario para 
            cumplir con los propósitos descritos en esta política o según lo requiera la ley.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Menores de Edad</Text>
          <Text style={styles.paragraph}>
            Nuestro servicio no está dirigido a menores de 18 años. No recopilamos 
            intencionalmente información personal de menores de edad.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Cambios en esta Política</Text>
          <Text style={styles.paragraph}>
            Podemos actualizar esta política ocasionalmente. Le notificaremos sobre 
            cambios significativos por email o através de un aviso en la aplicación.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Contacto</Text>
          <Text style={styles.paragraph}>
            Si tiene preguntas sobre esta política de privacidad o quiere ejercer 
            sus derechos, contáctenos:
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>📧 Email: privacidad@tofit.com</Text>
            <Text style={styles.contactText}>📞 Teléfono: +54 9 11 1234-5678</Text>
            <Text style={styles.contactText}>📍 Dirección: Av. Corrientes 1234, CABA, Argentina</Text>
            <Text style={styles.contactText}>⏰ Horario: Lunes a Viernes, 9:00 - 18:00</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Ionicons name="shield-checkmark" size={32} color="#00D4AA" />
          <Text style={styles.footerTitle}>Su Privacidad es Nuestra Prioridad</Text>
          <Text style={styles.footerText}>
            Nos comprometemos a proteger su información personal y ser transparentes 
            sobre nuestras prácticas de privacidad.
          </Text>
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
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  introSection: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#00D4AA',
  },
  introText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 15,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletList: {
    marginTop: 8,
    marginLeft: 10,
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 6,
  },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  securityContent: {
    flex: 1,
    marginLeft: 10,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  rightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rightItem: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  rightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  rightDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  cookieTypes: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  cookieType: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    lineHeight: 20,
  },
  contactInfo: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  footer: {
    backgroundColor: '#2a2a2a',
    padding: 25,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00D4AA',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default PrivacyPolicyScreen;