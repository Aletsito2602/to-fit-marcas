// Datos del usuario para el header del menú
export const userData = {
  name: "Agostina Perez",
  handle: "@agostinabelenperez",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=100&h=100&fit=crop&crop=face",
  // Configuraciones del usuario
  settings: {
    notificationsEnabled: true,
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false
  }
}

// Estructura completa del menú de configuraciones
export const menuStructure = {
  notificaciones: {
    title: "Notificaciones",
    items: [
      {
        id: "push-notifications",
        type: "toggle",
        text: "Activar/Desactivar notificaciones push",
        key: "pushNotifications",
        defaultValue: true
      }
    ]
  },
  afiliados: {
    title: "Afiliados",
    items: [
      {
        id: "affiliates-section",
        type: "navigation",
        text: "Sección Afiliados",
        route: "/affiliates",
        external: false
      },
      {
        id: "affiliates-faqs",
        type: "navigation", 
        text: "FAQs Afiliados",
        route: "/affiliates/faqs",
        external: false
      }
    ]
  },
  actividad: {
    title: "Actividad",
    items: [
      {
        id: "my-purchases",
        type: "navigation",
        text: "Mis compras",
        route: "/purchases",
        external: false
      },
      {
        id: "favorites",
        type: "navigation",
        text: "Me gusta", 
        route: "/favorites",
        external: false
      }
    ]
  },
  mas: {
    title: "Más",
    items: [
      {
        id: "rate-app",
        type: "action",
        text: "Calificar App",
        action: "rate",
        external: true
      },
      {
        id: "feedback",
        type: "navigation",
        text: "Feedback",
        route: "/feedback",
        external: false
      },
      {
        id: "follow-us",
        type: "action",
        text: "Seguinos",
        action: "social",
        external: true
      },
      {
        id: "share-app",
        type: "action", 
        text: "Compartir App",
        action: "share",
        external: false
      },
      {
        id: "terms",
        type: "navigation",
        text: "Términos y Condiciones",
        route: "/terms",
        external: false
      },
      {
        id: "privacy",
        type: "navigation",
        text: "Políticas de Privacidad", 
        route: "/privacy",
        external: false
      }
    ]
  }
}

// Función helper para obtener todos los items del menú
export const getAllMenuItems = () => {
  const allItems = []
  Object.entries(menuStructure).forEach(([sectionKey, section]) => {
    section.items.forEach(item => {
      allItems.push({
        ...item,
        section: sectionKey,
        sectionTitle: section.title
      })
    })
  })
  return allItems
}

// Funciones para manejar acciones especiales
export const menuActions = {
  rate: () => {
    // Abrir store de la plataforma
    const userAgent = navigator.userAgent
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.open('https://apps.apple.com/app/tofit', '_blank')
    } else if (/android/i.test(userAgent)) {
      window.open('https://play.google.com/store/apps/details?id=com.tofit', '_blank')
    } else {
      // Fallback para desktop
      window.open('https://tofit.app', '_blank')
    }
  },
  
  share: async () => {
    const shareData = {
      title: 'ToFit - Tu app de fitness favorita',
      text: '¡Descarga ToFit y transforma tu rutina de ejercicio!',
      url: 'https://tofit.app'
    }
    
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
        // Fallback: copiar al clipboard
        navigator.clipboard.writeText(shareData.url)
        alert('Link copiado al portapapeles')
      }
    } else {
      // Fallback: copiar al clipboard
      navigator.clipboard.writeText(shareData.url)
      alert('Link copiado al portapapeles')
    }
  },
  
  social: () => {
    // Abrir menú de redes sociales o redirigir a perfil principal
    const socialLinks = [
      { name: 'Instagram', url: 'https://instagram.com/tofit' },
      { name: 'Twitter', url: 'https://twitter.com/tofit' },
      { name: 'TikTok', url: 'https://tiktok.com/@tofit' }
    ]
    
    // Por simplicidad, abrir Instagram
    window.open(socialLinks[0].url, '_blank')
  }
}

// Configuración por defecto del usuario
export const defaultUserSettings = {
  notificationsEnabled: true,
  pushNotifications: true,
  emailNotifications: false,
  smsNotifications: false,
  theme: 'dark',
  language: 'es'
} 