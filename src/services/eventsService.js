// Mock data para eventos
const mockEvents = [
  // Eventos próximos (no propios del usuario)
  {
    id: 1,
    title: "Desfile Primavera 2025",
    date: "2025-03-15",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    publicationsCount: 632,
    isOwner: false,
    type: "Desfile"
  },
  {
    id: 2,
    title: "Expo Moda Buenos Aires",
    date: "2025-03-18",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
    publicationsCount: 143,
    isOwner: false,
    type: "Exposición"
  },
  {
    id: 3,
    title: "Fashion Week Madrid",
    date: "2025-03-22",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
    publicationsCount: 892,
    isOwner: false,
    type: "Fashion Week"
  },
  {
    id: 4,
    title: "Lanzamiento Colección Verano",
    date: "2025-03-25",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    publicationsCount: 456,
    isOwner: false,
    type: "Lanzamiento"
  },
  {
    id: 5,
    title: "Workshop de Estilo Personal",
    date: "2025-03-28",
    image: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=400&h=300&fit=crop",
    publicationsCount: 234,
    isOwner: false,
    type: "Workshop"
  },
  {
    id: 6,
    title: "Networking Moda Digital",
    date: "2025-04-02",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400&h=300&fit=crop",
    publicationsCount: 178,
    isOwner: false,
    type: "Networking"
  },

  // Eventos creados por el usuario
  {
    id: 7,
    title: "Cumpleaños 28",
    date: "2025-03-12",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
    publicationsCount: 45,
    isOwner: true,
    type: "Personal"
  },
  {
    id: 8,
    title: "México 2025",
    date: "2025-03-27",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    publicationsCount: 89,
    isOwner: true,
    type: "Viaje"
  },
  {
    id: 9,
    title: "Cena de Gala",
    date: "2025-04-05",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    publicationsCount: 67,
    isOwner: true,
    type: "Social"
  },
  {
    id: 10,
    title: "Shooting Fotográfico",
    date: "2025-04-10",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop",
    publicationsCount: 123,
    isOwner: true,
    type: "Fotografía"
  }
]

// Función para obtener eventos próximos (no propios del usuario)
export const getUpcomingEvents = async (userId) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const upcomingEvents = mockEvents.filter(event => !event.isOwner)
  
  return {
    success: true,
    data: upcomingEvents,
    message: "Eventos próximos cargados exitosamente"
  }
}

// Función para obtener eventos creados por el usuario
export const getUserEvents = async (userId) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const userEvents = mockEvents.filter(event => event.isOwner)
  
  return {
    success: true,
    data: userEvents,
    message: "Eventos del usuario cargados exitosamente"
  }
}

// Función para crear un nuevo evento
export const createEvent = async (eventData) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const newEvent = {
    id: Date.now(),
    ...eventData,
    isOwner: true,
    publicationsCount: 0,
    createdAt: new Date().toISOString()
  }
  
  return {
    success: true,
    data: newEvent,
    message: "Evento creado exitosamente"
  }
}

// Función para obtener detalles de un evento específico
export const getEventDetails = async (eventId) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const event = mockEvents.find(e => e.id === eventId)
  
  if (!event) {
    return {
      success: false,
      message: "Evento no encontrado"
    }
  }
  
  return {
    success: true,
    data: event,
    message: "Detalles del evento cargados exitosamente"
  }
}

// Función para eliminar un evento
export const deleteEvent = async (eventId) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    success: true,
    message: "Evento eliminado exitosamente"
  }
}

// Función para actualizar un evento
export const updateEvent = async (eventId, eventData) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    success: true,
    data: { id: eventId, ...eventData },
    message: "Evento actualizado exitosamente"
  }
} 