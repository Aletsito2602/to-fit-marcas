// Test directo de la API de Supabase desde Node.js
// Ejecutar: node test-supabase-api.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://zfjowsanrhhwioqavpdf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testRegistration() {
  console.log('🧪 Probando registro directo...')
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email: `test-${Date.now()}@tofit.com`,
      password: '123456789'
    })
    
    if (error) {
      console.error('❌ Error:', error)
    } else {
      console.log('✅ Registro exitoso:', data)
    }
  } catch (err) {
    console.error('❌ Exception:', err)
  }
}

testRegistration()