// Test de conexión y diagnóstico de Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zfjowsanrhhwioqavpdf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U'

console.log('🧪 INICIANDO TESTS DE SUPABASE')
console.log('🔗 URL:', supabaseUrl)

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSupabaseConnection() {
  console.log('\n=== TEST 1: Conexión básica ===')
  
  try {
    // Test 1: Verificar conexión básica
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('✅ Conexión auth:', user ? 'Usuario logueado' : 'No hay usuario')
    if (authError) console.log('❌ Error auth:', authError)

    // Test 2: Listar todas las tablas accesibles
    console.log('\n=== TEST 2: Tablas accesibles ===')
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name, table_schema')
      .eq('table_schema', 'public')
    
    if (tablesError) {
      console.log('❌ Error listando tablas:', tablesError)
    } else {
      console.log('✅ Tablas públicas encontradas:', tables?.length || 0)
      tables?.forEach(t => console.log(`  - ${t.table_name}`))
    }

    // Test 3: Verificar tabla users específicamente
    console.log('\n=== TEST 3: Verificar tabla users ===')
    const { data: usersTest, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (usersError) {
      console.log('❌ Error accediendo a users:', usersError)
      console.log('  - Code:', usersError.code)
      console.log('  - Details:', usersError.details)
      console.log('  - Hint:', usersError.hint)
      console.log('  - Message:', usersError.message)
    } else {
      console.log('✅ Tabla users accesible')
    }

    // Test 4: Verificar usuario específico
    console.log('\n=== TEST 4: Usuario específico ===')
    const userId = '44de82e3-9735-475b-96c7-60140eee62a7'
    const { data: specificUser, error: specificError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (specificError) {
      console.log('❌ Error buscando usuario específico:', specificError)
    } else {
      console.log('✅ Usuario encontrado:', specificUser)
    }

    // Test 5: Intentar inserción de prueba
    console.log('\n=== TEST 5: Test de inserción ===')
    const testUser = {
      id: 'test-' + Date.now(),
      email: 'test@example.com',
      name: 'Test User',
      username: 'testuser',
      role: 'user'
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert(testUser)
      .select()
    
    if (insertError) {
      console.log('❌ Error insertando usuario de prueba:', insertError)
    } else {
      console.log('✅ Usuario de prueba insertado:', insertData)
      
      // Limpiar usuario de prueba
      await supabase.from('users').delete().eq('id', testUser.id)
      console.log('🧹 Usuario de prueba eliminado')
    }

  } catch (error) {
    console.log('💥 Error general:', error)
  }
}

// Ejecutar en el navegador
if (typeof window !== 'undefined') {
  window.testSupabase = testSupabaseConnection
  console.log('🔧 Para ejecutar el test, escribe en consola: testSupabase()')
}