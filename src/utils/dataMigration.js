import { db } from '../config/firebase'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import supabaseAuthService from '../services/supabaseAuthService'
import supabasePostsService from '../services/supabasePostsService'
import supabaseProfesionalesService from '../services/supabaseProfesionalesService'
import supabaseProductosService from '../services/supabaseProductosService'

/**
 * Utilidad para migrar datos desde Firebase a Supabase
 * 
 * IMPORTANTE: Esta utilidad debe usarse con cuidado y preferiblemente
 * en un entorno de desarrollo o con supervisión técnica.
 */
class DataMigrationUtility {
  constructor() {
    this.migrationLog = []
    this.errors = []
  }

  /**
   * Log de eventos de migración
   */
  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const logEntry = { timestamp, message, type }
    
    this.migrationLog.push(logEntry)
    console.log(`[${type.toUpperCase()}] ${timestamp}: ${message}`)
  }

  /**
   * Log de errores
   */
  logError(message, error) {
    const timestamp = new Date().toISOString()
    const errorEntry = { timestamp, message, error: error.toString() }
    
    this.errors.push(errorEntry)
    console.error(`[ERROR] ${timestamp}: ${message}`, error)
  }

  /**
   * Obtener estadísticas de migración
   */
  getMigrationStats() {
    return {
      totalLogs: this.migrationLog.length,
      totalErrors: this.errors.length,
      successfulOperations: this.migrationLog.filter(log => log.type === 'success').length,
      warnings: this.migrationLog.filter(log => log.type === 'warning').length,
      logs: this.migrationLog,
      errors: this.errors
    }
  }

  /**
   * Limpiar logs de migración
   */
  clearLogs() {
    this.migrationLog = []
    this.errors = []
  }

  // ============================================================================
  // MIGRACIÓN DE USUARIOS
  // ============================================================================

  /**
   * Migrar usuarios de Firebase Auth a Supabase
   * NOTA: Esta función es principalmente para referencia, ya que los usuarios
   * se migrarán automáticamente cuando hagan login
   */
  async migrateUsers(limit = 50) {
    this.log('Iniciando migración de usuarios...')
    
    try {
      // Obtener usuarios de la colección de Firebase
      const usersRef = collection(db, 'users')
      const snapshot = await getDocs(usersRef)
      
      let migratedCount = 0
      let skippedCount = 0
      
      for (const docSnapshot of snapshot.docs) {
        try {
          const userData = docSnapshot.data()
          const firebaseUserId = docSnapshot.id
          
          // Intentar migrar usuario
          const result = await supabaseAuthService.migrateFromFirebase(
            { uid: firebaseUserId, ...userData },
            userData
          )
          
          if (result.success) {
            this.log(`Usuario migrado exitosamente: ${userData.email || firebaseUserId}`, 'success')
            migratedCount++
          } else {
            this.log(`Usuario omitido (posiblemente ya existe): ${userData.email || firebaseUserId}`, 'warning')
            skippedCount++
          }
          
          // Límite de procesamiento
          if (migratedCount + skippedCount >= limit) break
          
        } catch (error) {
          this.logError(`Error migrando usuario ${docSnapshot.id}`, error)
        }
      }
      
      this.log(`Migración de usuarios completada. Migrados: ${migratedCount}, Omitidos: ${skippedCount}`, 'success')
      return { success: true, migrated: migratedCount, skipped: skippedCount }
      
    } catch (error) {
      this.logError('Error en migración de usuarios', error)
      return { success: false, error: error.message }
    }
  }

  // ============================================================================
  // MIGRACIÓN DE POSTS
  // ============================================================================

  /**
   * Migrar posts de Firebase a Supabase
   */
  async migratePosts(limit = 100) {
    this.log('Iniciando migración de posts...')
    
    try {
      const postsRef = collection(db, 'posts')
      const snapshot = await getDocs(postsRef)
      
      let migratedCount = 0
      let skippedCount = 0
      
      for (const docSnapshot of snapshot.docs) {
        try {
          const postData = docSnapshot.data()
          const firebasePostId = docSnapshot.id
          
          const result = await supabasePostsService.migrateFromFirebase(postData, firebasePostId)
          
          if (result.success) {
            this.log(`Post migrado exitosamente: ${firebasePostId}`, 'success')
            migratedCount++
          } else {
            this.log(`Post omitido: ${firebasePostId}`, 'warning')
            skippedCount++
          }
          
          if (migratedCount + skippedCount >= limit) break
          
        } catch (error) {
          this.logError(`Error migrando post ${docSnapshot.id}`, error)
        }
      }
      
      this.log(`Migración de posts completada. Migrados: ${migratedCount}, Omitidos: ${skippedCount}`, 'success')
      return { success: true, migrated: migratedCount, skipped: skippedCount }
      
    } catch (error) {
      this.logError('Error en migración de posts', error)
      return { success: false, error: error.message }
    }
  }

  // ============================================================================
  // MIGRACIÓN DE PROFESIONALES Y SERVICIOS
  // ============================================================================

  /**
   * Migrar profesionales de Firebase a Supabase
   */
  async migrateProfesionales(limit = 50) {
    this.log('Iniciando migración de profesionales...')
    
    try {
      const profesionalesRef = collection(db, 'profesionales')
      const snapshot = await getDocs(profesionalesRef)
      
      let migratedCount = 0
      let skippedCount = 0
      
      for (const docSnapshot of snapshot.docs) {
        try {
          const profesionalData = docSnapshot.data()
          const firebaseProfesionalId = docSnapshot.id
          
          const result = await supabaseProfesionalesService.migrateFromFirebase(
            profesionalData, 
            firebaseProfesionalId,
            profesionalData.userId
          )
          
          if (result.success) {
            this.log(`Profesional migrado exitosamente: ${profesionalData.nombre || firebaseProfesionalId}`, 'success')
            migratedCount++
          } else {
            this.log(`Profesional omitido: ${profesionalData.nombre || firebaseProfesionalId}`, 'warning')
            skippedCount++
          }
          
          if (migratedCount + skippedCount >= limit) break
          
        } catch (error) {
          this.logError(`Error migrando profesional ${docSnapshot.id}`, error)
        }
      }
      
      this.log(`Migración de profesionales completada. Migrados: ${migratedCount}, Omitidos: ${skippedCount}`, 'success')
      return { success: true, migrated: migratedCount, skipped: skippedCount }
      
    } catch (error) {
      this.logError('Error en migración de profesionales', error)
      return { success: false, error: error.message }
    }
  }

  // ============================================================================
  // MIGRACIÓN DE PRODUCTOS Y MARCAS
  // ============================================================================

  /**
   * Migrar marcas de Firebase a Supabase
   */
  async migrateMarcas(limit = 20) {
    this.log('Iniciando migración de marcas...')
    
    try {
      const marcasRef = collection(db, 'brands')
      const snapshot = await getDocs(marcasRef)
      
      let migratedCount = 0
      let skippedCount = 0
      
      for (const docSnapshot of snapshot.docs) {
        try {
          const marcaData = docSnapshot.data()
          const firebaseMarcaId = docSnapshot.id
          
          const result = await supabaseProductosService.migrateMarcaFromFirebase(
            marcaData, 
            firebaseMarcaId
          )
          
          if (result.success) {
            this.log(`Marca migrada exitosamente: ${marcaData.name || firebaseMarcaId}`, 'success')
            migratedCount++
          } else {
            this.log(`Marca omitida: ${marcaData.name || firebaseMarcaId}`, 'warning')
            skippedCount++
          }
          
          if (migratedCount + skippedCount >= limit) break
          
        } catch (error) {
          this.logError(`Error migrando marca ${docSnapshot.id}`, error)
        }
      }
      
      this.log(`Migración de marcas completada. Migrados: ${migratedCount}, Omitidos: ${skippedCount}`, 'success')
      return { success: true, migrated: migratedCount, skipped: skippedCount }
      
    } catch (error) {
      this.logError('Error en migración de marcas', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Migrar productos de Firebase a Supabase
   */
  async migrateProductos(limit = 100) {
    this.log('Iniciando migración de productos...')
    
    try {
      const productosRef = collection(db, 'products')
      const snapshot = await getDocs(productosRef)
      
      let migratedCount = 0
      let skippedCount = 0
      
      for (const docSnapshot of snapshot.docs) {
        try {
          const productoData = docSnapshot.data()
          const firebaseProductoId = docSnapshot.id
          
          const result = await supabaseProductosService.migrateProductoFromFirebase(
            productoData, 
            firebaseProductoId
          )
          
          if (result.success) {
            this.log(`Producto migrado exitosamente: ${productoData.name || firebaseProductoId}`, 'success')
            migratedCount++
          } else {
            this.log(`Producto omitido: ${productoData.name || firebaseProductoId}`, 'warning')
            skippedCount++
          }
          
          if (migratedCount + skippedCount >= limit) break
          
        } catch (error) {
          this.logError(`Error migrando producto ${docSnapshot.id}`, error)
        }
      }
      
      this.log(`Migración de productos completada. Migrados: ${migratedCount}, Omitidos: ${skippedCount}`, 'success')
      return { success: true, migrated: migratedCount, skipped: skippedCount }
      
    } catch (error) {
      this.logError('Error en migración de productos', error)
      return { success: false, error: error.message }
    }
  }

  // ============================================================================
  // MIGRACIÓN COMPLETA
  // ============================================================================

  /**
   * Ejecutar migración completa
   * ADVERTENCIA: Este proceso puede tomar mucho tiempo y debe ejecutarse con supervisión
   */
  async runFullMigration(options = {}) {
    const {
      migrateUsers: shouldMigrateUsers = true,
      migratePosts: shouldMigratePosts = true,
      migrateProfesionales: shouldMigrateProfesionales = true,
      migrateMarcas: shouldMigrateMarcas = true,
      migrateProductos: shouldMigrateProductos = true,
      limits = {
        users: 50,
        posts: 100,
        profesionales: 50,
        marcas: 20,
        productos: 100
      }
    } = options

    this.log('=== INICIANDO MIGRACIÓN COMPLETA ===', 'info')
    const startTime = Date.now()
    
    const results = {}

    try {
      // 1. Migrar marcas primero (las necesitan los productos)
      if (shouldMigrateMarcas) {
        results.marcas = await this.migrateMarcas(limits.marcas)
      }

      // 2. Migrar usuarios
      if (shouldMigrateUsers) {
        results.users = await this.migrateUsers(limits.users)
      }

      // 3. Migrar posts
      if (shouldMigratePosts) {
        results.posts = await this.migratePosts(limits.posts)
      }

      // 4. Migrar profesionales
      if (shouldMigrateProfesionales) {
        results.profesionales = await this.migrateProfesionales(limits.profesionales)
      }

      // 5. Migrar productos
      if (shouldMigrateProductos) {
        results.productos = await this.migrateProductos(limits.productos)
      }

      const endTime = Date.now()
      const duration = Math.round((endTime - startTime) / 1000)
      
      this.log(`=== MIGRACIÓN COMPLETA FINALIZADA EN ${duration} SEGUNDOS ===`, 'success')
      
      return {
        success: true,
        duration,
        results,
        stats: this.getMigrationStats()
      }

    } catch (error) {
      this.logError('Error en migración completa', error)
      return {
        success: false,
        error: error.message,
        results,
        stats: this.getMigrationStats()
      }
    }
  }

  // ============================================================================
  // UTILIDADES DE VERIFICACIÓN
  // ============================================================================

  /**
   * Verificar conectividad con Firebase
   */
  async verifyFirebaseConnection() {
    try {
      const testRef = collection(db, 'users')
      await getDocs(testRef)
      this.log('Conexión con Firebase verificada ✓', 'success')
      return { success: true }
    } catch (error) {
      this.logError('Error conectando con Firebase', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Verificar conectividad con Supabase
   */
  async verifySupabaseConnection() {
    try {
      const result = await supabaseAuthService.getCurrentUser()
      this.log('Conexión con Supabase verificada ✓', 'success')
      return { success: true }
    } catch (error) {
      this.logError('Error conectando con Supabase', error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Generar reporte de migración
   */
  generateReport() {
    const stats = this.getMigrationStats()
    
    const report = `
=== REPORTE DE MIGRACIÓN TOFIT ===
Fecha: ${new Date().toLocaleString()}

ESTADÍSTICAS:
- Total de operaciones: ${stats.totalLogs}
- Operaciones exitosas: ${stats.successfulOperations}
- Advertencias: ${stats.warnings}
- Errores: ${stats.totalErrors}

LOGS RECIENTES:
${stats.logs.slice(-10).map(log => 
  `[${log.type.toUpperCase()}] ${log.timestamp}: ${log.message}`
).join('\n')}

${stats.totalErrors > 0 ? `
ERRORES:
${stats.errors.map(error => 
  `[ERROR] ${error.timestamp}: ${error.message}\n  ${error.error}`
).join('\n')}
` : ''}

=== FIN DEL REPORTE ===
    `

    return report
  }
}

// Exportar instancia singleton
export const dataMigration = new DataMigrationUtility()
export default dataMigration