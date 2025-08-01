// Prueba directa de conexión con Supabase - EJECUTAR EN CONSOLA DEL NAVEGADOR

// 1. Test de conectividad HTTP básica
async function testHTTP() {
  console.log('🌐 Test 1: Conectividad HTTP básica')
  
  try {
    const response = await fetch('https://zfjowsanrhhwioqavpdf.supabase.co/rest/v1/', {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U'
      }
    })
    
    console.log('Status:', response.status)
    console.log('StatusText:', response.statusText)
    
    if (response.ok) {
      console.log('✅ HTTP básico: OK')
      return true
    } else {
      console.log('❌ HTTP básico: FALLO')
      const text = await response.text()
      console.log('Response body:', text)
      return false
    }
  } catch (error) {
    console.log('❌ Error HTTP:', error.message)
    return false
  }
}

// 2. Test de tabla users
async function testUsersTable() {
  console.log('\\n📋 Test 2: Acceso a tabla users')
  
  try {
    const response = await fetch('https://zfjowsanrhhwioqavpdf.supabase.co/rest/v1/users?select=id&limit=1', {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      }
    })
    
    console.log('Status:', response.status)
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Tabla users accesible')
      console.log('Datos:', data)
      return true
    } else {
      console.log('❌ Error accediendo tabla users')
      const text = await response.text()
      console.log('Error:', text)
      return false
    }
  } catch (error) {
    console.log('❌ Error tabla users:', error.message)
    return false
  }
}

// 3. Test de inserción
async function testInsert() {
  console.log('\\n➕ Test 3: INSERT en tabla users')
  
  const testUserId = 'test-' + Date.now()
  
  try {
    const response = await fetch('https://zfjowsanrhhwioqavpdf.supabase.co/rest/v1/users', {
      method: 'POST',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U',
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        id: testUserId,
        name: 'Test User',
        email: 'test@test.com',
        username: 'testuser'
      })
    })
    
    console.log('Status:', response.status)
    
    if (response.status === 201 || response.status === 200) {
      console.log('✅ INSERT funciona')
      
      // Limpiar el test user
      try {
        await fetch(`https://zfjowsanrhhwioqavpdf.supabase.co/rest/v1/users?id=eq.${testUserId}`, {
          method: 'DELETE',
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U'
          }
        })
        console.log('🧹 Test user limpiado')
      } catch (e) {
        console.log('⚠️ Error limpiando test user:', e.message)
      }
      
      return true
    } else {
      console.log('❌ INSERT falló')
      const text = await response.text()
      console.log('Error:', text)
      return false
    }
  } catch (error) {
    console.log('❌ Error INSERT:', error.message)
    return false
  }
}

// 4. Test específico para tu usuario
async function testYourUser() {
  console.log('\\n👤 Test 4: Tu usuario específico')
  
  const userId = '700df027-2a78-4db4-8388-8057dae502a9'
  
  try {
    const response = await fetch(`https://zfjowsanrhhwioqavpdf.supabase.co/rest/v1/users?id=eq.${userId}`, {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U',
        'Content-Type': 'application/json'
      }
    })
    
    console.log('Status:', response.status)
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Tu usuario encontrado:', data.length > 0 ? 'SÍ' : 'NO')
      console.log('Datos:', data)
      return data
    } else {
      console.log('❌ Error buscando tu usuario')
      const text = await response.text()
      console.log('Error:', text)
      return null
    }
  } catch (error) {
    console.log('❌ Error buscando usuario:', error.message)
    return null
  }
}

// 5. Test de actualización (UPSERT)
async function testUpsert() {
  console.log('\\n🔄 Test 5: UPSERT (actualización)')
  
  const userId = '700df027-2a78-4db4-8388-8057dae502a9'
  
  try {
    const response = await fetch('https://zfjowsanrhhwioqavpdf.supabase.co/rest/v1/users', {
      method: 'POST',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTMyMjIsImV4cCI6MjA2OTM4OTIyMn0.IdfLAQk0tEtF0lkymC2XSNodf-kXi2oTPvu0jQf2M6U',
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=representation'
      },
      body: JSON.stringify({
        id: userId,
        name: 'Usuario ToFit Actualizado',
        bio: 'Bio actualizada ' + new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    })
    
    console.log('Status:', response.status)
    
    if (response.status === 201 || response.status === 200) {
      console.log('✅ UPSERT funciona')
      const data = await response.json()
      console.log('Datos actualizados:', data)
      return true
    } else {
      console.log('❌ UPSERT falló')
      const text = await response.text()
      console.log('Error:', text)
      return false
    }
  } catch (error) {
    console.log('❌ Error UPSERT:', error.message)
    return false
  }
}

// Función principal que ejecuta todos los tests
async function runAllTests() {
  console.log('🧪 === DIAGNÓSTICO COMPLETO SUPABASE ===\\n')
  
  const results = {
    http: await testHTTP(),
    table: await testUsersTable(), 
    insert: await testInsert(),
    user: await testYourUser(),
    upsert: await testUpsert()
  }
  
  console.log('\\n📊 === RESUMEN ===')
  console.log('HTTP básico:', results.http ? '✅' : '❌')
  console.log('Tabla users:', results.table ? '✅' : '❌')
  console.log('INSERT:', results.insert ? '✅' : '❌')
  console.log('Tu usuario:', results.user ? '✅' : '❌')
  console.log('UPSERT:', results.upsert ? '✅' : '❌')
  
  if (results.http && results.table && results.upsert) {
    console.log('\\n🎉 ¡SUPABASE FUNCIONA CORRECTAMENTE!')
    console.log('El problema puede estar en el código de la app.')
  } else {
    console.log('\\n⚠️ HAY PROBLEMAS CON SUPABASE')
    console.log('Revisar configuración, permisos o RLS policies.')
  }
  
  return results
}

// Ejecutar automáticamente
runAllTests()

// También exponer funciones individuales
window.testSupabase = {
  all: runAllTests,
  http: testHTTP,
  table: testUsersTable,
  insert: testInsert,
  user: testYourUser,
  upsert: testUpsert
}

console.log('💡 También puedes ejecutar tests individuales:')
console.log('- testSupabase.http()')
console.log('- testSupabase.table()')
console.log('- testSupabase.upsert()')