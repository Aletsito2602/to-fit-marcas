import { supabase, supabaseUtils } from '../config/supabase'

class SupabaseProfesionalesService {
  
  // ============================================================================
  // MÉTODOS DE PROFESIONALES
  // ============================================================================
  
  /**
   * Obtener todos los profesionales
   */
  async getProfesionales(filters = {}) {
    const { city, especialidad, verified = null, limit = 20, offset = 0 } = filters
    
    return await supabaseUtils.query(async () => {
      let queryBuilder = supabase
        .from('profesionales')
        .select(`
          *,
          users!inner(username, name, avatar_url, is_verified)
        `)
        .eq('is_active', true)
      
      // Aplicar filtros
      if (city) queryBuilder = queryBuilder.eq('city', city)
      if (especialidad) queryBuilder = queryBuilder.eq('especialidad', especialidad)
      if (verified !== null) queryBuilder = queryBuilder.eq('is_verified', verified)
      
      return await queryBuilder
        .order('rating', { ascending: false })
        .range(offset, offset + limit - 1)
    })
  }
  
  /**
   * Obtener profesional por ID
   */
  async getProfesionalById(profesionalId) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('profesionales')
        .select(`
          *,
          users!inner(username, name, avatar_url, is_verified, email)
        `)
        .eq('id', profesionalId)
        .eq('is_active', true)
        .single()
    })
  }
  
  /**
   * Buscar profesionales
   */
  async searchProfesionales(query, filters = {}) {
    const { city, especialidad, limit = 20 } = filters
    
    return await supabaseUtils.query(async () => {
      let queryBuilder = supabase
        .from('profesionales')
        .select(`
          *,
          users!inner(username, name, avatar_url, is_verified)
        `)
        .eq('is_active', true)
      
      // Filtro de búsqueda por texto
      if (query) {
        queryBuilder = queryBuilder.or(
          `nombre.ilike.%${query}%,especialidad.ilike.%${query}%,descripcion.ilike.%${query}%`
        )
      }
      
      // Filtros adicionales
      if (city) queryBuilder = queryBuilder.eq('city', city)
      if (especialidad) queryBuilder = queryBuilder.eq('especialidad', especialidad)
      
      return await queryBuilder
        .order('rating', { ascending: false })
        .limit(limit)
    })
  }
  
  /**
   * Obtener profesionales por ubicación
   */
  async getProfesionalesByLocation(lat, lng, radiusKm = 10) {
    return await supabaseUtils.query(async () => {
      return await supabase.rpc('get_profesionales_nearby', {
        lat,
        lng,
        radius_km: radiusKm
      })
    })
  }
  
  /**
   * Crear perfil de profesional
   */
  async createProfesional(profesionalData) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    const data = {
      user_id: userId,
      ...profesionalData
    }
    
    // Si hay coordenadas, convertirlas a formato PostGIS
    if (profesionalData.lat && profesionalData.lng) {
      data.coordinates = `POINT(${profesionalData.lng} ${profesionalData.lat})`
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('profesionales')
        .insert(data)
        .select()
        .single()
    })
  }
  
  /**
   * Actualizar perfil de profesional
   */
  async updateProfesional(profesionalId, updateData) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    // Si hay coordenadas, convertirlas a formato PostGIS
    if (updateData.lat && updateData.lng) {
      updateData.coordinates = `POINT(${updateData.lng} ${updateData.lat})`
      delete updateData.lat
      delete updateData.lng
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('profesionales')
        .update(updateData)
        .eq('id', profesionalId)
        .eq('user_id', userId)
        .select()
        .single()
    })
  }
  
  /**
   * Eliminar perfil de profesional
   */
  async deleteProfesional(profesionalId) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('profesionales')
        .update({ is_active: false })
        .eq('id', profesionalId)
        .eq('user_id', userId)
    })
  }
  
  // ============================================================================
  // MÉTODOS DE SERVICIOS
  // ============================================================================
  
  /**
   * Obtener servicios de un profesional
   */
  async getServiciosByProfesional(profesionalId, limit = 20, offset = 0) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('servicios')
        .select('*')
        .eq('profesional_id', profesionalId)
        .eq('is_active', true)
        .order('rating', { ascending: false })
        .range(offset, offset + limit - 1)
    })
  }
  
  /**
   * Obtener servicio por ID
   */
  async getServicioById(servicioId) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('servicios')
        .select(`
          *,
          profesionales!inner(
            *,
            users!inner(username, name, avatar_url, is_verified)
          )
        `)
        .eq('id', servicioId)
        .eq('is_active', true)
        .single()
    })
  }
  
  /**
   * Buscar servicios
   */
  async searchServicios(query, filters = {}) {
    const { categoria, city, minPrice, maxPrice, limit = 20 } = filters
    
    return await supabaseUtils.query(async () => {
      let queryBuilder = supabase
        .from('servicios')
        .select(`
          *,
          profesionales!inner(
            nombre, city, rating, is_verified,
            users!inner(username, name, avatar_url)
          )
        `)
        .eq('is_active', true)
      
      // Filtro de búsqueda por texto
      if (query) {
        queryBuilder = queryBuilder.or(
          `title.ilike.%${query}%,descripcion.ilike.%${query}%,categoria.ilike.%${query}%`
        )
      }
      
      // Filtros adicionales
      if (categoria) queryBuilder = queryBuilder.eq('categoria', categoria)
      if (city) queryBuilder = queryBuilder.eq('city', city)
      if (minPrice) queryBuilder = queryBuilder.gte('price', minPrice)
      if (maxPrice) queryBuilder = queryBuilder.lte('price', maxPrice)
      
      return await queryBuilder
        .order('rating', { ascending: false })
        .limit(limit)
    })
  }
  
  /**
   * Crear servicio
   */
  async createServicio(servicioData) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    // Verificar que el usuario tenga un perfil de profesional
    const { data: profesional } = await supabase
      .from('profesionales')
      .select('id')
      .eq('user_id', userId)
      .single()
    
    if (!profesional) {
      return { success: false, error: 'Debes crear un perfil de profesional primero' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('servicios')
        .insert({
          profesional_id: profesional.id,
          ...servicioData
        })
        .select()
        .single()
    })
  }
  
  /**
   * Actualizar servicio
   */
  async updateServicio(servicioId, updateData) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('servicios')
        .update(updateData)
        .eq('id', servicioId)
        .eq('profesional_id', 
          supabase
            .from('profesionales')
            .select('id')
            .eq('user_id', userId)
            .single()
        )
        .select()
        .single()
    })
  }
  
  /**
   * Eliminar servicio
   */
  async deleteServicio(servicioId) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('servicios')
        .update({ is_active: false })
        .eq('id', servicioId)
        .eq('profesional_id', 
          supabase
            .from('profesionales')
            .select('id')
            .eq('user_id', userId)
            .single()
        )
    })
  }
  
  // ============================================================================
  // MÉTODOS DE RESERVAS
  // ============================================================================
  
  /**
   * Crear reserva
   */
  async createReserva(reservaData) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('reservas')
        .insert({
          user_id: userId,
          ...reservaData
        })
        .select()
        .single()
    })
  }
  
  /**
   * Obtener reservas del usuario
   */
  async getUserReservas(status = null) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      let queryBuilder = supabase
        .from('reservas')
        .select(`
          *,
          servicios!inner(title, price, main_image),
          profesionales!inner(nombre, city)
        `)
        .eq('user_id', userId)
      
      if (status) {
        queryBuilder = queryBuilder.eq('status', status)
      }
      
      return await queryBuilder.order('created_at', { ascending: false })
    })
  }
  
  /**
   * Obtener reservas del profesional
   */
  async getProfesionalReservas(status = null) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      let queryBuilder = supabase
        .from('reservas')
        .select(`
          *,
          servicios!inner(title, price),
          users!inner(name, username, avatar_url)
        `)
        .eq('profesional_id', 
          supabase
            .from('profesionales')
            .select('id')
            .eq('user_id', userId)
            .single()
        )
      
      if (status) {
        queryBuilder = queryBuilder.eq('status', status)
      }
      
      return await queryBuilder.order('fecha_servicio', { ascending: true })
    })
  }
  
  /**
   * Actualizar estado de reserva
   */
  async updateReservaStatus(reservaId, status, cancelReason = null) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    const updateData = { status }
    if (status === 'cancelada') {
      updateData.cancel_reason = cancelReason
      updateData.canceled_at = new Date().toISOString()
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('reservas')
        .update(updateData)
        .eq('id', reservaId)
        .or(`user_id.eq.${userId},profesional_id.eq.${userId}`)
    })
  }
  
  // ============================================================================
  // MÉTODOS DE RESEÑAS
  // ============================================================================
  
  /**
   * Crear reseña
   */
  async createResena(resenaData) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('resenas')
        .insert({
          user_id: userId,
          ...resenaData
        })
        .select()
        .single()
    })
  }
  
  /**
   * Obtener reseñas de un servicio
   */
  async getServicioResenas(servicioId, limit = 20, offset = 0) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('resenas')
        .select(`
          *,
          users!inner(username, name, avatar_url)
        `)
        .eq('servicio_id', servicioId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
    })
  }
  
  /**
   * Obtener reseñas de un profesional
   */
  async getProfesionalResenas(profesionalId, limit = 20, offset = 0) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('resenas')
        .select(`
          *,
          users!inner(username, name, avatar_url),
          servicios!inner(title)
        `)
        .eq('profesional_id', profesionalId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
    })
  }
  
  // ============================================================================
  // MÉTODOS DE FAVORITOS
  // ============================================================================
  
  /**
   * Agregar servicio a favoritos
   */
  async addToFavorites(servicioId) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('favoritos')
        .upsert({
          user_id: userId,
          servicio_id: servicioId,
          type: 'servicio'
        })
    })
  }
  
  /**
   * Quitar servicio de favoritos
   */
  async removeFromFavorites(servicioId) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('favoritos')
        .delete()
        .eq('user_id', userId)
        .eq('servicio_id', servicioId)
        .eq('type', 'servicio')
    })
  }
  
  /**
   * Obtener servicios favoritos del usuario
   */
  async getUserFavoriteServicios() {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('favoritos')
        .select(`
          *,
          servicios!inner(
            *,
            profesionales!inner(nombre, city, rating)
          )
        `)
        .eq('user_id', userId)
        .eq('type', 'servicio')
        .order('created_at', { ascending: false })
    })
  }
  
  // ============================================================================
  // MÉTODOS DE ANALYTICS
  // ============================================================================
  
  /**
   * Registrar evento de analytics
   */
  async trackEvent(eventType, servicioId, profesionalId = null, contactMethod = null) {
    const userId = await supabaseUtils.getCurrentUserId()
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('analytics_servicios')
        .insert({
          event_type: eventType,
          user_id: userId,
          servicio_id: servicioId,
          profesional_id: profesionalId,
          contact_method: contactMethod
        })
    })
  }
  
  // ============================================================================
  // MÉTODOS DE MIGRACIÓN DESDE FIREBASE
  // ============================================================================
  
  /**
   * Migrar profesional desde Firebase
   */
  async migrateFromFirebase(firebaseData, firebaseId, userId) {
    try {
      // Verificar si ya existe
      const { data: existing } = await supabase
        .from('profesionales')
        .select('id')
        .eq('firebase_id', firebaseId)
        .single()
      
      if (existing) {
        return { success: true, data: existing }
      }
      
      // Mapear datos
      const profesionalData = {
        firebase_id: firebaseId,
        user_id: userId,
        nombre: firebaseData.nombre || firebaseData.name,
        especialidad: firebaseData.especialidad || firebaseData.specialty,
        descripcion: firebaseData.descripcion || firebaseData.description,
        city: firebaseData.city || firebaseData.ciudad,
        address: firebaseData.address || firebaseData.direccion,
        rating: firebaseData.rating || 0,
        review_count: firebaseData.reviewCount || 0,
        total_reservations: firebaseData.totalReservations || 0,
        is_verified: firebaseData.isVerified || false,
        created_at: firebaseData.createdAt || new Date().toISOString()
      }
      
      // Manejar coordenadas
      if (firebaseData.coordinates) {
        profesionalData.coordinates = `POINT(${firebaseData.coordinates.lng} ${firebaseData.coordinates.lat})`
      }
      
      return await supabaseUtils.query(async () => {
        return await supabase
          .from('profesionales')
          .insert(profesionalData)
          .select()
          .single()
      })
    } catch (error) {
      console.error('Error migrando profesional:', error)
      return { success: false, error: 'Error en migración' }
    }
  }
}

export default new SupabaseProfesionalesService()