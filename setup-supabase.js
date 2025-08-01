/**
 * Script para configurar la base de datos de Supabase
 * 
 * Este script debe ejecutarse una sola vez para configurar el schema de la base de datos.
 * 
 * Uso:
 * 1. Asegúrate de que las credenciales de Supabase estén configuradas correctamente
 * 2. Ejecuta: node setup-supabase.js
 * 
 * IMPORTANTE: Este script requiere privilegios de administrador de Supabase
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase (usar service role key para operaciones de esquema)
const supabaseUrl = 'https://zfjowsanrhhwioqavpdf.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpmam93c2Fucmhod2lvcWF2cGRmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzgxMzIyMiwiZXhwIjoyMDY5Mzg5MjIyfQ.BvcHdZImJbvZtARDjZkT2ZS3hPDKv35YCerH6aetT9o'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Crear cliente con service role
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

/**
 * Función para ejecutar SQL con manejo de errores
 */
async function executeSql(sql, description) {
  console.log(`\n📋 Ejecutando: ${description}`)
  
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql })
    
    if (error) {
      console.error(`❌ Error en "${description}":`, error.message)
      return { success: false, error }
    }
    
    console.log(`✅ Completado: ${description}`)
    return { success: true, data }
    
  } catch (error) {
    console.error(`❌ Excepción en "${description}":`, error.message)
    return { success: false, error }
  }
}

/**
 * Función principal de configuración
 */
async function setupSupabaseDatabase() {
  console.log('🚀 Iniciando configuración de base de datos Supabase para ToFit...\n')
  
  try {
    // Leer el archivo SQL del schema
    const schemaPath = join(__dirname, 'supabase_schema.sql')
    let schemaSQL
    
    try {
      schemaSQL = readFileSync(schemaPath, 'utf8')
      console.log('📖 Schema SQL cargado exitosamente')
    } catch (error) {
      console.error('❌ Error leyendo supabase_schema.sql:', error.message)
      return
    }
    
    // Dividir el SQL en sentencias individuales para mejor manejo de errores
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    console.log(`📊 Se ejecutarán ${statements.length} sentencias SQL\n`)
    
    // Ejecutar cada sentencia
    let successCount = 0
    let errorCount = 0
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';'
      const description = `Sentencia ${i + 1}/${statements.length}`
      
      // Intentar determinar el tipo de sentencia para mejor descripción
      let statementType = 'SQL'
      if (statement.toLowerCase().includes('create table')) {
        const match = statement.match(/create table.*?(\w+)/i)
        statementType = match ? `Crear tabla: ${match[1]}` : 'Crear tabla'
      } else if (statement.toLowerCase().includes('create index')) {
        statementType = 'Crear índice'
      } else if (statement.toLowerCase().includes('create trigger')) {
        statementType = 'Crear trigger'
      } else if (statement.toLowerCase().includes('create function')) {
        statementType = 'Crear función'
      } else if (statement.toLowerCase().includes('create policy')) {
        statementType = 'Crear política RLS'
      } else if (statement.toLowerCase().includes('insert into')) {
        statementType = 'Insertar datos iniciales'
      }
      
      const result = await executeSql(statement, `${description}: ${statementType}`)
      
      if (result.success) {
        successCount++
      } else {
        errorCount++
        
        // Para algunos errores esperados, no los contamos como fallos críticos
        const expectedErrors = [
          'already exists',
          'relation already exists',
          'function already exists',
          'trigger already exists',
          'duplicate key value'
        ]
        
        const isExpectedError = expectedErrors.some(expectedError => 
          result.error.message?.toLowerCase().includes(expectedError)
        )
        
        if (isExpectedError) {
          console.log(`⚠️  Error esperado (recurso ya existe), continuando...`)
          errorCount-- // No contar como error crítico
          successCount++
        }
      }
      
      // Pequeña pausa para no sobrecargar la base de datos
      if (i < statements.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    
    console.log('\n' + '='.repeat(60))
    console.log('📊 RESUMEN DE CONFIGURACIÓN')
    console.log('='.repeat(60))
    console.log(`✅ Sentencias exitosas: ${successCount}`)
    console.log(`❌ Sentencias con error: ${errorCount}`)
    console.log(`📈 Tasa de éxito: ${Math.round((successCount / statements.length) * 100)}%`)
    
    if (errorCount === 0) {
      console.log('\n🎉 ¡Configuración completada exitosamente!')
      console.log('   La base de datos de ToFit está lista para usar.')
    } else if (errorCount < statements.length * 0.1) { // Menos del 10% de errores
      console.log('\n✅ Configuración completada con advertencias menores.')
      console.log('   La base de datos debería funcionar correctamente.')
    } else {
      console.log('\n⚠️  Configuración completada con errores significativos.')
      console.log('   Revisa los errores anteriores antes de continuar.')
    }
    
    console.log('\n📝 Próximos pasos:')
    console.log('   1. Verifica que las tablas se crearon correctamente en el panel de Supabase')
    console.log('   2. Ejecuta la migración de datos desde Firebase (opcional)')
    console.log('   3. Cambia USE_SUPABASE = true en hybridAuthStore.js cuando estés listo')
    
  } catch (error) {
    console.error('\n💥 Error fatal en la configuración:', error)
  }
}

/**
 * Función para verificar la conexión
 */
async function verifyConnection() {
  console.log('🔍 Verificando conexión con Supabase...')
  
  try {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1)
    
    if (error) {
      console.error('❌ Error de conexión:', error.message)
      return false
    }
    
    console.log('✅ Conexión con Supabase verificada')
    return true
    
  } catch (error) {
    console.error('❌ No se pudo conectar con Supabase:', error.message)
    return false
  }
}

/**
 * Ejecutar el script
 */
async function main() {
  console.log('🏗️  CONFIGURADOR DE BASE DE DATOS SUPABASE - TOFIT')
  console.log('==================================================\n')
  
  // Verificar conexión primero
  const isConnected = await verifyConnection()
  if (!isConnected) {
    console.log('\n❌ No se pudo establecer conexión con Supabase.')
    console.log('   Verifica las credenciales y la conectividad de red.')
    process.exit(1)
  }
  
  // Confirmar antes de continuar
  console.log('\n⚠️  ADVERTENCIA: Este script modificará la estructura de tu base de datos.')
  console.log('   Asegúrate de tener un backup si hay datos importantes.')
  
  // En un entorno de producción, aquí podrías agregar una confirmación interactiva
  console.log('\n▶️  Continuando con la configuración...')
  
  await setupSupabaseDatabase()
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('\n💥 Error no manejado:', error)
    process.exit(1)
  })
}

export { setupSupabaseDatabase, verifyConnection }