// Re-export del servicio de Supabase para mantener compatibilidad
// Este archivo actúa como proxy para no romper las importaciones existentes
import supabaseAuthService from './supabaseAuthService'

// Exportar directamente el servicio de Supabase
export default supabaseAuthService