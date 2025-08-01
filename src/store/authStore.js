// Re-export del store de Supabase para mantener compatibilidad
// Este archivo actúa como proxy para no romper las importaciones existentes
export { useSupabaseAuthStore as useAuthStore } from './supabaseAuthStore'