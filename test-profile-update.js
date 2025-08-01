// Script de prueba para verificar la actualización de perfil
import { testSupabaseConnection, updateUserProfile } from './src/services/supabaseUserProfileService.js'

const testProfileUpdate = async () => {
  console.log('🧪 === PRUEBA DE ACTUALIZACIÓN DE PERFIL ===\n')
  
  // 1. Probar conexión básica
  console.log('1️⃣ Probando conexión básica...')
  const connectionResult = await testSupabaseConnection()
  console.log('Resultado conexión:', connectionResult)
  console.log('')
  
  // 2. Probar actualización de perfil con timeout
  if (connectionResult.success) {
    console.log('2️⃣ Probando actualización de perfil (sin test de conexión)...')
    const userId = '700df027-2a78-4db4-8388-8057dae502a9' // Tu usuario ID
    
    try {
      const updateResult = await updateUserProfile(userId, {
        name: 'Test Usuario',
        bio: 'Prueba de actualización ' + new Date().toISOString()
      })
      
      console.log('Resultado actualización:', updateResult)
    } catch (error) {
      console.log('Error en actualización:', error)
    }
  } else {
    console.log('❌ No se puede probar actualización debido a problemas de conexión')
  }
  
  console.log('\n🏁 === FIN DE PRUEBAS ===')
}

// Ejecutar test
testProfileUpdate().catch(console.error)