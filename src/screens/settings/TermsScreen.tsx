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

interface TermsScreenProps {
  navigation: any;
}

const TermsScreen: React.FC<TermsScreenProps> = ({ navigation }) => {
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
            <Text style={styles.title}>Términos y Condiciones</Text>
            <Text style={styles.subtitle}>Revisa nuestros términos legales</Text>
          </View>
        </View>

        <Text style={styles.lastUpdated}>Última actualización: 1 de enero de 2024</Text>
        <Text style={styles.lastUpdated}>Última actualización: 1 de enero de 2024</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Aceptación de los Términos</Text>
          <Text style={styles.paragraph}>
            Al acceder y usar la aplicación To FIT Marcas, usted acepta estar sujeto a estos términos 
            y condiciones de uso. Si no está de acuerdo con alguno de estos términos, no debe usar 
            nuestra aplicación.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Descripción del Servicio</Text>
          <Text style={styles.paragraph}>
            To FIT Marcas es una plataforma que permite a los usuarios crear y gestionar tiendas 
            online, vender productos, gestionar inventarios y procesar pagos. Nos reservamos el 
            derecho de modificar o discontinuar el servicio en cualquier momento.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Registro de Cuenta</Text>
          <Text style={styles.paragraph}>
            Para usar ciertos aspectos del servicio, debe registrar una cuenta. Usted es responsable de:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>• Mantener la confidencialidad de su contraseña</Text>
            <Text style={styles.bulletPoint}>• Proporcionar información precisa y actualizada</Text>
            <Text style={styles.bulletPoint}>• Todas las actividades que ocurran en su cuenta</Text>
            <Text style={styles.bulletPoint}>• Notificarnos inmediatamente sobre uso no autorizado</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Uso Aceptable</Text>
          <Text style={styles.paragraph}>
            Usted se compromete a no usar la aplicación para:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletPoint}>• Actividades ilegales o fraudulentas</Text>
            <Text style={styles.bulletPoint}>• Violar derechos de propiedad intelectual</Text>
            <Text style={styles.bulletPoint}>• Distribuir contenido ofensivo o dañino</Text>
            <Text style={styles.bulletPoint}>• Interferir con el funcionamiento del servicio</Text>
            <Text style={styles.bulletPoint}>• Acceder a cuentas de otros usuarios sin autorización</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Transacciones y Pagos</Text>
          <Text style={styles.paragraph}>
            Todas las transacciones están sujetas a nuestras políticas de pago. Los vendedores 
            son responsables de cumplir con todas las leyes aplicables, incluyendo impuestos y 
            regulaciones comerciales.
          </Text>
          <Text style={styles.paragraph}>
            To FIT Marcas actúa como intermediario y no es responsable por disputas entre 
            compradores y vendedores, aunque proporcionamos herramientas para resolverlas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Propiedad Intelectual</Text>
          <Text style={styles.paragraph}>
            El contenido, características y funcionalidad de To FIT Marcas son propiedad de 
            nuestra empresa y están protegidos por derechos de autor, marcas registradas y 
            otras leyes de propiedad intelectual.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Privacidad</Text>
          <Text style={styles.paragraph}>
            Su privacidad es importante para nosotros. Consulte nuestra Política de Privacidad 
            para obtener información sobre cómo recopilamos, usamos y protegemos su información.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Limitación de Responsabilidad</Text>
          <Text style={styles.paragraph}>
            En ningún caso To FIT Marcas será responsable por daños indirectos, incidentales, 
            especiales o consecuentes que resulten del uso o la incapacidad de usar el servicio.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Terminación</Text>
          <Text style={styles.paragraph}>
            Podemos suspender o terminar su cuenta si viola estos términos. Usted puede 
            cancelar su cuenta en cualquier momento contactando nuestro soporte.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Modificaciones</Text>
          <Text style={styles.paragraph}>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. 
            Las modificaciones entrarán en vigencia inmediatamente después de su publicación 
            en la aplicación.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Ley Aplicable</Text>
          <Text style={styles.paragraph}>
            Estos términos se regirán e interpretarán de acuerdo con las leyes de Argentina. 
            Cualquier disputa será resuelta en los tribunales competentes de Buenos Aires.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Contacto</Text>
          <Text style={styles.paragraph}>
            Si tiene preguntas sobre estos términos y condiciones, puede contactarnos en:
          </Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>Email: legal@tofit.com</Text>
            <Text style={styles.contactText}>Teléfono: +54 9 11 1234-5678</Text>
            <Text style={styles.contactText}>Dirección: Av. Corrientes 1234, CABA, Argentina</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Al continuar usando To FIT Marcas, usted acepta estos términos y condiciones.
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
    marginBottom: 30,
    fontStyle: 'italic',
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
  paragraph: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletList: {
    marginTop: 8,
    marginLeft: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 6,
  },
  contactInfo: {
    backgroundColor: '#333333',
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
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#00D4AA',
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
  },
});

export default TermsScreen;