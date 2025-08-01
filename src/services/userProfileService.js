// Re-export del servicio de Supabase para mantener compatibilidad
// Este archivo actúa como proxy para no romper las importaciones existentes
import {
  getUserProfile,
  updateUserProfile,
  getUserStats,
  getUserPosts,
  getPostInteractions,
  isFollowingUser,
  toggleFollowUser,
  getMockUserProfile,
  getMockUserPosts
} from './supabaseUserProfileService'

// Exportar todas las funciones del servicio de Supabase
export {
  getUserProfile,
  updateUserProfile,
  getUserStats,
  getUserPosts,
  getPostInteractions,
  isFollowingUser,
  toggleFollowUser,
  getMockUserProfile,
  getMockUserPosts
}

 