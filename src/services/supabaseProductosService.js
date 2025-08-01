import { supabase, supabaseUtils } from '../config/supabase'

class SupabaseProductosService {
  
  // ============================================================================
  // MÉTODOS DE PRODUCTOS
  // ============================================================================
  
  /**
   * Obtener productos del marketplace
   */
  async getProductos(filters = {}) {
    const { categoria, marca, minPrice, maxPrice, hasDiscount, limit = 20, offset = 0 } = filters
    
    return await supabaseUtils.query(async () => {
      let queryBuilder = supabase
        .from('productos')
        .select(`
          *,
          marcas!inner(brand, nombre, logo_url),
          categorias_tienda(name, icono, color)
        `)
        .eq('is_published', true)
        .eq('is_active', true)
      
      // Aplicar filtros
      if (categoria) queryBuilder = queryBuilder.eq('categoria_id', categoria)
      if (marca) queryBuilder = queryBuilder.eq('marca_id', marca)
      if (minPrice) queryBuilder = queryBuilder.gte('precio_actual', minPrice)
      if (maxPrice) queryBuilder = queryBuilder.lte('precio_actual', maxPrice)
      if (hasDiscount) queryBuilder = queryBuilder.gt('descuento', 0)
      
      return await queryBuilder
        .order('recommendation_score', { ascending: false })
        .range(offset, offset + limit - 1)
    })
  }
  
  /**
   * Obtener producto por ID
   */
  async getProductoById(productoId) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('productos')
        .select(`
          *,
          marcas!inner(brand, nombre, logo_url, website),
          categorias_tienda(name, icono, color)
        `)
        .eq('id', productoId)
        .eq('is_published', true)
        .eq('is_active', true)
        .single()
    })
  }
  
  /**
   * Buscar productos
   */
  async searchProductos(query, filters = {}) {
    const { categoria, marca, limit = 20 } = filters
    
    return await supabaseUtils.query(async () => {
      let queryBuilder = supabase
        .from('productos')
        .select(`
          *,
          marcas!inner(brand, nombre, logo_url)
        `)
        .eq('is_published', true)
        .eq('is_active', true)
      
      // Filtro de búsqueda por texto
      if (query) {
        queryBuilder = queryBuilder.or(
          `nombre.ilike.%${query}%,descripcion.ilike.%${query}%,tags.cs.{${query}}`
        )
      }
      
      // Filtros adicionales
      if (categoria) queryBuilder = queryBuilder.eq('categoria_id', categoria)
      if (marca) queryBuilder = queryBuilder.eq('marca_id', marca)
      
      return await queryBuilder
        .order('recommendation_score', { ascending: false })
        .limit(limit)
    })
  }
  
  /**
   * Obtener productos recomendados
   */
  async getRecommendedProductos(limit = 10) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('productos')
        .select(`
          *,
          marcas!inner(brand, nombre, logo_url)
        `)
        .eq('is_published', true)
        .eq('is_active', true)
        .gt('recommendation_score', 0)
        .order('recommendation_score', { ascending: false })
        .limit(limit)
    })
  }
  
  /**
   * Obtener productos en oferta
   */
  async getProductosEnOferta(limit = 20, offset = 0) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('productos')
        .select(`
          *,
          marcas!inner(brand, nombre, logo_url)
        `)
        .eq('is_published', true)
        .eq('is_active', true)
        .gt('descuento', 0)
        .order('descuento', { ascending: false })
        .range(offset, offset + limit - 1)
    })
  }
  
  /**
   * Obtener productos por marca
   */
  async getProductosByMarca(marcaId, limit = 20, offset = 0) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('productos')
        .select(`
          *,
          marcas!inner(brand, nombre, logo_url)
        `)
        .eq('marca_id', marcaId)
        .eq('is_published', true)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
    })
  }
  
  /**
   * Obtener productos por categoría
   */
  async getProductosByCategoria(categoriaId, limit = 20, offset = 0) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('productos')
        .select(`
          *,
          marcas!inner(brand, nombre, logo_url),
          categorias_tienda!inner(name, icono, color)
        `)
        .eq('categoria_id', categoriaId)
        .eq('is_published', true)
        .eq('is_active', true)
        .order('recommendation_score', { ascending: false })
        .range(offset, offset + limit - 1)
    })
  }
  
  // ============================================================================
  // MÉTODOS DE MARCAS
  // ============================================================================
  
  /**
   * Obtener todas las marcas
   */
  async getMarcas(featured = null) {
    return await supabaseUtils.query(async () => {
      let queryBuilder = supabase
        .from('marcas')
        .select('*')
        .eq('is_active', true)
      
      if (featured !== null) {
        queryBuilder = queryBuilder.eq('is_featured', featured)
      }
      
      return await queryBuilder.order('priority', { ascending: false })
    })
  }
  
  /**
   * Obtener marca por ID
   */
  async getMarcaById(marcaId) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('marcas')
        .select('*')
        .eq('id', marcaId)
        .eq('is_active', true)
        .single()
    })
  }
  
  /**
   * Buscar marcas
   */
  async searchMarcas(query) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('marcas')
        .select('*')
        .eq('is_active', true)
        .or(`brand.ilike.%${query}%,nombre.ilike.%${query}%`)
        .order('priority', { ascending: false })
    })
  }
  
  /**
   * Obtener marcas destacadas
   */
  async getFeaturedMarcas() {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('marcas')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('priority', { ascending: false })
    })
  }
  
  // ============================================================================
  // MÉTODOS DE CATEGORÍAS
  // ============================================================================
  
  /**
   * Obtener todas las categorías
   */
  async getCategorias(parentId = null) {
    return await supabaseUtils.query(async () => {
      let queryBuilder = supabase
        .from('categorias_tienda')
        .select('*')
        .eq('is_active', true)
      
      if (parentId === null) {
        queryBuilder = queryBuilder.is('parent_id', null)
      } else {
        queryBuilder = queryBuilder.eq('parent_id', parentId)
      }
      
      return await queryBuilder.order('orden', { ascending: true })
    })
  }
  
  /**
   * Obtener categoría por ID
   */
  async getCategoriaById(categoriaId) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('categorias_tienda')
        .select('*')
        .eq('id', categoriaId)
        .eq('is_active', true)
        .single()
    })
  }
  
  /**
   * Obtener subcategorías
   */
  async getSubcategorias(parentId) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('categorias_tienda')
        .select('*')
        .eq('parent_id', parentId)
        .eq('is_active', true)
        .order('orden', { ascending: true })
    })
  }
  
  // ============================================================================
  // MÉTODOS DE FAVORITOS
  // ============================================================================
  
  /**
   * Agregar producto a favoritos
   */
  async addProductoToFavorites(productoId) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('favoritos')
        .upsert({
          user_id: userId,
          servicio_id: productoId,
          type: 'producto'
        })
    })
  }
  
  /**
   * Quitar producto de favoritos
   */
  async removeProductoFromFavorites(productoId) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('favoritos')
        .delete()
        .eq('user_id', userId)
        .eq('servicio_id', productoId)
        .eq('type', 'producto')
    })
  }
  
  /**
   * Obtener productos favoritos del usuario
   */
  async getUserFavoriteProductos() {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: false, error: 'Usuario no autenticado' }
    }
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('favoritos')
        .select(`
          *,
          productos:servicio_id!inner(
            *,
            marcas!inner(brand, nombre, logo_url)
          )
        `)
        .eq('user_id', userId)
        .eq('type', 'producto')
        .order('created_at', { ascending: false })
    })
  }
  
  /**
   * Verificar si un producto está en favoritos
   */
  async isProductoFavorite(productoId) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      return { success: true, data: false }
    }
    
    return await supabaseUtils.query(async () => {
      const { data, error } = await supabase
        .from('favoritos')
        .select('id')
        .eq('user_id', userId)
        .eq('servicio_id', productoId)
        .eq('type', 'producto')
        .single()
      
      return { data: !!data, error: null }
    })
  }
  
  // ============================================================================
  // MÉTODOS DE RECOMENDACIONES
  // ============================================================================
  
  /**
   * Obtener productos relacionados
   */
  async getRelatedProductos(productoId, limit = 6) {
    // Primero obtenemos el producto actual
    const { data: producto } = await this.getProductoById(productoId)
    if (!producto.success) return producto
    
    const currentProduct = producto.data
    
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('productos')
        .select(`
          *,
          marcas!inner(brand, nombre, logo_url)
        `)
        .eq('is_published', true)
        .eq('is_active', true)
        .neq('id', productoId)
        .or(
          `categoria_id.eq.${currentProduct.categoria_id},marca_id.eq.${currentProduct.marca_id}`
        )
        .order('recommendation_score', { ascending: false })
        .limit(limit)
    })
  }
  
  /**
   * Obtener productos para usuario específico (personalizado)
   */
  async getPersonalizedProductos(limit = 20) {
    const userId = await supabaseUtils.getCurrentUserId()
    if (!userId) {
      // Si no hay usuario, devolver productos populares
      return this.getRecommendedProductos(limit)
    }
    
    // Aquí se podría implementar lógica de recomendación basada en:
    // - Historial de compras
    // - Productos favoritos
    // - Interacciones previas
    
    return this.getRecommendedProductos(limit)
  }
  
  // ============================================================================
  // MÉTODOS DE ANALYTICS
  // ============================================================================
  
  /**
   * Registrar vista de producto
   */
  async trackProductView(productoId) {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('analytics_events')
        .insert({
          event_name: 'product_view',
          event_data: { product_id: productoId },
          page_url: window.location?.href || null
        })
    })
  }
  
  /**
   * Registrar click en producto
   */
  async trackProductClick(productoId, source = 'listing') {
    return await supabaseUtils.query(async () => {
      return await supabase
        .from('analytics_events')
        .insert({
          event_name: 'product_click',
          event_data: { 
            product_id: productoId,
            source: source
          },
          page_url: window.location?.href || null
        })
    })
  }
  
  // ============================================================================
  // MÉTODOS DE MIGRACIÓN DESDE FIREBASE
  // ============================================================================
  
  /**
   * Migrar producto desde Firebase
   */
  async migrateProductoFromFirebase(firebaseData, firebaseId) {
    try {
      // Verificar si ya existe
      const { data: existing } = await supabase
        .from('productos')
        .select('id')
        .eq('firebase_id', firebaseId)
        .single()
      
      if (existing) {
        return { success: true, data: existing }
      }
      
      // Mapear datos
      const productoData = {
        firebase_id: firebaseId,
        nombre: firebaseData.nombre || firebaseData.name,
        descripcion: firebaseData.descripcion || firebaseData.description,
        precio_actual: firebaseData.precioActual || firebaseData.price || 0,
        precio_anterior: firebaseData.precioAnterior || firebaseData.oldPrice,
        descuento: firebaseData.descuento || firebaseData.discount || 0,
        imagenes: firebaseData.imagenes || firebaseData.images || [],
        stock: firebaseData.stock || 0,
        tags: firebaseData.tags || [],
        recommendation_score: firebaseData.recommendationScore || 0,
        is_published: firebaseData.isPublished ?? true,
        created_at: firebaseData.createdAt || new Date().toISOString()
      }
      
      // Buscar o crear marca
      if (firebaseData.brand || firebaseData.marca) {
        const brandName = firebaseData.brand || firebaseData.marca
        let { data: marca } = await supabase
          .from('marcas')
          .select('id')
          .eq('brand', brandName.toLowerCase())
          .single()
        
        if (!marca) {
          const { data: newMarca } = await supabase
            .from('marcas')
            .insert({
              brand: brandName.toLowerCase(),
              nombre: brandName,
              descripcion: `Marca ${brandName}`,
              is_active: true
            })
            .select('id')
            .single()
          
          marca = newMarca
        }
        
        if (marca) {
          productoData.marca_id = marca.id
        }
      }
      
      return await supabaseUtils.query(async () => {
        return await supabase
          .from('productos')
          .insert(productoData)
          .select()
          .single()
      })
    } catch (error) {
      console.error('Error migrando producto:', error)
      return { success: false, error: 'Error en migración' }
    }
  }
  
  /**
   * Migrar marca desde Firebase
   */
  async migrateMarcaFromFirebase(firebaseData, firebaseId) {
    try {
      // Verificar si ya existe
      const { data: existing } = await supabase
        .from('marcas')
        .select('id')
        .eq('firebase_id', firebaseId)
        .single()
      
      if (existing) {
        return { success: true, data: existing }
      }
      
      const marcaData = {
        firebase_id: firebaseId,
        brand: firebaseData.brand || firebaseData.id,
        nombre: firebaseData.nombre || firebaseData.name,
        descripcion: firebaseData.descripcion || firebaseData.description,
        logo_url: firebaseData.logoUrl || firebaseData.logo,
        website: firebaseData.website,
        product_count: firebaseData.productCount || 0,
        followers_count: firebaseData.followersCount || 0,
        priority: firebaseData.priority || 0,
        is_featured: firebaseData.isFeatured || false,
        created_at: firebaseData.createdAt || new Date().toISOString()
      }
      
      return await supabaseUtils.query(async () => {
        return await supabase
          .from('marcas')
          .insert(marcaData)
          .select()
          .single()
      })
    } catch (error) {
      console.error('Error migrando marca:', error)
      return { success: false, error: 'Error en migración' }
    }
  }
  
  // ============================================================================
  // SUBSCRIPCIONES EN TIEMPO REAL
  // ============================================================================
  
  /**
   * Suscribirse a cambios en productos
   */
  subscribeToProductos(callback, filters = {}) {
    const filterString = Object.entries(filters)
      .map(([key, value]) => `${key}=eq.${value}`)
      .join(',')
    
    return supabaseUtils.subscribe('productos', {
      filter: filterString || 'is_published=eq.true',
      callback: (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          callback(payload.new)
        }
      }
    })
  }
}

export default new SupabaseProductosService()