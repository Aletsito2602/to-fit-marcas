# To Fit - Marcas

Aplicación móvil integral para la gestión de e-commerce, diseñada para marcas y emprendedores que desean administrar eficientemente su tienda online.

## 🚀 Tecnologías

- **React Native** con **Expo Go**
- **TypeScript** para type safety
- **Firebase** como backend completo
- **React Navigation** para navegación
- **Expo Vector Icons** para iconografía

## 📱 Características Principales

### Autenticación
- Inicio de sesión con Email/Contraseña
- Registro de usuarios
- Recuperación de contraseña
- Onboarding personalizado

### Secciones Principales
- **Inicio**: Dashboard con métricas clave del negocio
- **Pedidos**: Gestión completa de órdenes y clientes
- **Cámara**: Captura de imágenes para productos
- **Productos**: Gestión de inventario y catálogo
- **Métricas**: Análisis detallado del rendimiento

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI
- Expo Go app en tu dispositivo móvil

### Pasos de instalación

1. **Clonar e instalar dependencias:**
   ```bash
   cd to-fit-marcas
   npm install
   ```

2. **Configurar Firebase:**
   - Seguir las instrucciones en `FIREBASE_SETUP.md`
   - Actualizar las credenciales en `src/config/firebase.ts`

3. **Ejecutar la aplicación:**
   ```bash
   npm start
   ```

4. **Probar en dispositivo:**
   - Escanear el código QR con Expo Go
   - La app se cargará automáticamente

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── screens/            # Pantallas de la aplicación
│   ├── auth/          # Pantallas de autenticación
│   └── main/          # Pantallas principales
├── navigation/         # Configuración de navegación
├── services/          # Servicios de API y Firebase
├── contexts/          # Contexts de React (Auth, etc.)
├── hooks/            # Custom hooks
├── types/            # Definiciones de TypeScript
├── utils/            # Utilidades y helpers
└── config/           # Configuración (Firebase, etc.)
```

## 🎨 Diseño

- **Tema oscuro** como estilo principal
- **Tipografía Poppins** en todas sus variantes
- **Iconos Ionicons** para consistencia visual
- **Navegación intuitiva** con Tab Bar y Stack Navigation

## 🔥 Firebase Services

### Authentication
- Email/Password (MVP)
- Gestión de sesiones automática

### Firestore Database
- Usuarios, productos, pedidos
- Reglas de seguridad configuradas
- Queries optimizadas

### Storage
- Imágenes de productos
- Avatares de usuarios
- Assets de la aplicación

## 📋 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run android` - Ejecuta en emulador Android
- `npm run ios` - Ejecuta en simulador iOS
- `npm run web` - Ejecuta versión web (desarrollo)

## 🚀 Desarrollo

### Estado Actual
El proyecto cuenta con:
- ✅ Estructura base configurada
- ✅ Navegación implementada
- ✅ Autenticación con Firebase
- ✅ Pantallas placeholder creadas
- ✅ TypeScript configurado

### Próximos Pasos
1. Implementar pantallas de autenticación
2. Desarrollar dashboard principal
3. Crear gestión de productos
4. Implementar sistema de pedidos
5. Agregar funcionalidad de cámara
6. Desarrollar métricas y analytics

## 📄 Licencia

Este proyecto está desarrollado para To Fit - Marcas.

---

¡Empezemos a construir una gran aplicación! 🎯