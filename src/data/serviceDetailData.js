// Datos mock completos para el servicio de Gabriela Silva
export const serviceDetailData = {
  id: 1,
  professional: {
    name: "Gabriela Silva",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=100&h=100&fit=crop&crop=face",
    verified: true
  },
  title: "Maquillaje para sesiones fotográficas",
  price: 18,
  currency: "USD",
  rating: 5,
  reviewCount: 47,
  mainImage: "https://images.unsplash.com/photo-1487412912781-8382b2eeca23?w=400&h=600&fit=crop",
  description: "Ofrezco un servicio de maquillaje pensado especialmente para sesiones fotográficas: duradero, adaptado a luces de estudio y diseñado para destacar tus mejores rasgos. Trabajo con productos de alta calidad y técnicas que aseguran un acabado profesional, tanto para retratos, books, editoriales como campañas publicitarias.",
  highlights: [
    "Disponible para estudios, exteriores o a domicilio.",
    "Zona Belgrano — ¡También me traslado!",
    "Consulta disponibilidad y reserva tu fecha 💬"
  ],
  portfolio: [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1487412912781-8382b2eeca23?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1573921470445-0c0e2b636d2b?w=200&h=200&fit=crop"
  ],
  paymentMethods: [
    "Transferencia",
    "Tarjetas de crédito", 
    "Mercado Pago"
  ],
  location: {
    city: "Ciudad Autónoma de Buenos Aires.",
    neighborhoods: ["Palermo", "Belgrano", "Villa Urquiza", "Villa Crespo", "Recoleta", "Pueyrredón", "Saavedra", "Núñez"]
  },
  reviews: [
    {
      id: 1,
      client: "Cami S.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      rating: 5,
      timeAgo: "Hace 1 semana",
      comment: "¡Un 10! Super puntual, amable y profesional. Me hizo sentir cómoda para las fotos. Se nota que tiene experiencia en esto por la atención que da el maquillaje!",
      price: "$18USD / $100USD",
      duration: "3 Horas"
    },
    {
      id: 2,
      client: "Julieta M.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
      rating: 5,
      timeAgo: "Hace 2 meses",
      comment: "Quedé encantada con el maquillaje. Duró toda la sesión sin necesidad de retoques y se veía increíble en las fotos. Súper profesional y puntual. ¡La volvería a elegir mil veces!",
      price: "$18USD / $100USD",
      duration: "4 Horas"
    },
    {
      id: 3,
      client: "Agustina D.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
      rating: 5,
      timeAgo: "Hace 3 meses",
      comment: "Excelente trabajo! Gabriela es súper profesional y el maquillaje quedó perfecto para mi sesión de fotos. Recomendada al 100%.",
      price: "$18USD / $100USD",
      duration: "2 Horas"
    },
    {
      id: 4,
      client: "Martina L.",
      avatar: "https://images.unsplash.com/photo-1487412912781-8382b2eeca23?w=50&h=50&fit=crop&crop=face",
      rating: 5,
      timeAgo: "Hace 1 mes",
      comment: "¡Increíble experiencia! El maquillaje duró toda la sesión y se veía espectacular en las fotos. Gabriela es muy talentosa y profesional.",
      price: "$18USD / $100USD",
      duration: "3.5 Horas"
    },
    {
      id: 5,
      client: "Sofia R.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=50&h=50&fit=crop&crop=face",
      rating: 5,
      timeAgo: "Hace 2 semanas",
      comment: "Super recomendada! Puntual, profesional y el resultado fue exactamente lo que esperaba. El maquillaje se mantuvo perfecto durante toda la sesión.",
      price: "$18USD / $100USD",
      duration: "2.5 Horas"
    }
  ]
}

// Función para obtener datos extendidos de todos los servicios
export const getAllServicesWithDetails = () => {
  return [
    serviceDetailData,
    {
      id: 2,
      professional: {
        name: "Sofía T",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        verified: true
      },
      title: "Maquillaje personalizado",
      price: 25,
      currency: "USD",
      rating: 5,
      reviewCount: 32,
      mainImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=600&fit=crop",
      description: "Servicio de maquillaje personalizado adaptado a tu estilo y preferencias. Trabajo con técnicas modernas y productos de alta gama para lograr el look perfecto para cualquier ocasión especial.",
      highlights: [
        "Maquillaje para eventos especiales y celebraciones.",
        "Atención personalizada y asesoramiento de estilo.",
        "Productos de marcas premium certificadas."
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1573921470445-0c0e2b636d2b?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1487412912781-8382b2eeca23?w=200&h=200&fit=crop"
      ],
      paymentMethods: [
        "Efectivo",
        "Transferencia bancaria",
        "Tarjetas de débito y crédito"
      ],
      location: {
        city: "Ciudad Autónoma de Buenos Aires.",
        neighborhoods: ["Palermo", "Villa Crick", "Barracas", "San Telmo", "Puerto Madero"]
      },
      reviews: [
        {
          id: 1,
          client: "María F.",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
          rating: 5,
          timeAgo: "Hace 5 días",
          comment: "Sofía es increíble! Mi maquillaje quedó perfecto y duró toda la noche. Super profesional y puntual.",
          price: "$25USD / $120USD",
          duration: "2 Horas"
        }
      ]
    },
    // ... más servicios con estructura similar
  ]
} 