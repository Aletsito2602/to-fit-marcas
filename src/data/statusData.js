import { 
  Star, 
  Percent, 
  Gift, 
  Trophy, 
  Bell, 
  Calendar, 
  FileText, 
  Lock, 
  Crown 
} from 'lucide-react'

// Datos del usuario para Mi Status
export const userStatusData = {
  name: "Agostina Perez",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=100&h=100&fit=crop&crop=face",
  code: "AGOST7",
  validUntil: "30/09/25",
  currentAmount: "$50,000",
  statusBadge: "$1,500",
  currentLevel: 3,
  maxLevel: 4,
  completedSteps: 3
}

// Logros y premios del grid 3x3
export const achievements = [
  // Fila 1
  {
    id: 1,
    title: "Logo Nivel 1",
    icon: Star,
    badge: "01",
    isUnlocked: true,
    level: 1
  },
  {
    id: 2,
    title: "10% de descuento",
    icon: Percent,
    badge: "01",
    isUnlocked: true,
    level: 1
  },
  {
    id: 3,
    title: "Sorteos mensuales",
    icon: Gift,
    badge: "02",
    isUnlocked: true,
    level: 2
  },
  // Fila 2
  {
    id: 4,
    title: "Premios",
    icon: Trophy,
    badge: "02",
    isUnlocked: true,
    level: 2
  },
  {
    id: 5,
    title: "Regalos de cumpleaños",
    icon: Bell,
    badge: "02",
    isUnlocked: true,
    level: 2
  },
  {
    id: 6,
    title: "Eventos To Fit",
    icon: Calendar,
    badge: "03",
    isUnlocked: true,
    level: 3
  },
  // Fila 3
  {
    id: 7,
    title: "Newsletter y novedades",
    icon: FileText,
    badge: "03",
    isUnlocked: true,
    level: 3
  },
  {
    id: 8,
    title: "Accesos exclusivos",
    icon: Lock,
    badge: "03",
    isUnlocked: true,
    level: 3
  },
  {
    id: 9,
    title: "Miembro To Fit VIP",
    icon: Crown,
    badge: "04",
    isUnlocked: false, // Nivel 4 no alcanzado aún
    level: 4
  }
]

// Información adicional de niveles
export const levelInfo = {
  1: {
    name: "Bronce",
    color: "#CD7F32",
    benefits: ["Logo Nivel 1", "10% de descuento"]
  },
  2: {
    name: "Plata", 
    color: "#C0C0C0",
    benefits: ["Sorteos mensuales", "Premios", "Regalos de cumpleaños"]
  },
  3: {
    name: "Oro",
    color: "#FFD700", 
    benefits: ["Eventos To Fit", "Newsletter y novedades", "Accesos exclusivos"]
  },
  4: {
    name: "VIP",
    color: "#8A2BE2",
    benefits: ["Miembro To Fit VIP", "Acceso secreto", "Beneficios exclusivos"]
  }
}

// Función para obtener logros por nivel
export const getAchievementsByLevel = (level) => {
  return achievements.filter(achievement => achievement.level <= level)
}

// Función para obtener logros desbloqueados
export const getUnlockedAchievements = () => {
  return achievements.filter(achievement => achievement.isUnlocked)
}

// Estadísticas del usuario
export const userStats = {
  totalPurchases: 15,
  totalSpent: 180000,
  pointsEarned: 180,
  pointsUsed: 50,
  currentPoints: 130,
  nextLevelProgress: 75, // Porcentaje hacia el siguiente nivel
  joinDate: "2024-01-15",
  lastActivity: "2024-11-15"
} 