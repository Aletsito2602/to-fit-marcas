// Script de diagnóstico para Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zfjowsanrhhwioqavpdf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U'

console.log('🧪 === DIAGNÓSTICO SUPABASE ===')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey.slice(0, 20) + '...')

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testBasicConnection() {
  console.log('\\n1️⃣ Probando conexión básica...')
  
  try {
    const response = await fetch(supabaseUrl + '/rest/v1/', {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': 'Bearer ' + supabaseAnonKey
      }
    })
    
    console.log('Status HTTP:', response.status)
    console.log('Status Text:', response.statusText)
    
    if (response.ok) {
      console.log('✅ Conexión HTTP básica: OK')
    } else {
      console.log('❌ Conexión HTTP básica: FALLO')
      const text = await response.text()
      console.log('Response:', text)
    }
  } catch (error) {
    console.log('❌ Error en conexión HTTP:', error.message)
  }
}

async function testAuth() {
  console.log('\\n2️⃣ Probando auth...')
  
  try {
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Auth timeout')), 5000)
    )
    
    const authPromise = supabase.auth.getUser()
    const result = await Promise.race([authPromise, timeout])
    
    console.log('✅ Auth responde:', !!result.data)
    console.log('Usuario:', result.data?.user?.id || 'No autenticado')
    console.log('Error:', result.error?.message || 'Ninguno')
  } catch (error) {
    console.log('❌ Auth timeout o error:', error.message)
  }
}

async function testTableExists() {
  console.log('\\n3️⃣ Probando si tabla users existe...')
  
  try {
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Table query timeout')), 5000)
    )
    
    const queryPromise = supabase
      .from('users')
      .select('count')
      .limit(0)
    
    const result = await Promise.race([queryPromise, timeout])
    
    console.log('✅ Tabla users accesible')
    console.log('Error:', result.error?.message || 'Ninguno')
  } catch (error) {
    console.log('❌ Tabla users timeout o error:', error.message)
  }
}

async function testInsert() {
  console.log('\\n4️⃣ Probando INSERT simple...')
  
  try {
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Insert timeout')), 5000)
    )
    
    const insertPromise = supabase
      .from('users')
      .insert({
        id: 'test-' + Date.now(),
        name: 'Test User',
        email: 'test@test.com'
      })
    
    const result = await Promise.race([insertPromise, timeout])
    
    console.log('✅ INSERT funciona')
    console.log('Error:', result.error?.message || 'Ninguno')
    console.log('Data:', !!result.data)
  } catch (error) {
    console.log('❌ INSERT timeout o error:', error.message)
  }
}

async function runDiagnostic() {
  await testBasicConnection()
  await testAuth()
  await testTableExists()
  await testInsert()
  
  console.log('\\n🏁 === FIN DIAGNÓSTICO ===')
}

// En el navegador, ejecuta: runDiagnostic()
window.runDiagnostic = runDiagnostic
console.log('💡 Ejecuta: runDiagnostic() en la consola del navegador')