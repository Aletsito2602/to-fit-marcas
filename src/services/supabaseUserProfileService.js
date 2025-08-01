import { supabase, supabaseUtils, supabaseConfig } from '../config/supabase'

// ==================== PERFIL DE USUARIO CON SUPABASE ====================

/**
 * Obtener datos completos del perfil de usuario
 */
export const getUserProfile = async (userId) => {
  try {
    console.log('🔍 getUserProfile llamado para userId:', userId)
    
    // CONSULTA REAL A SUPABASE
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️ Usuario no encontrado, devolviendo datos por defecto')
        return { 
          success: false, 
          error: 'Usuario no encontrado',
          defaultData: {
            id: userId,
            name: 'Usuario ToFit',
            username: `@${userId.slice(0,8)}`,
            bio: '¡Nuevo en ToFit! 🌟',
            location: 'Argentina',
            website: 'tofit.com',
            avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face',
            banner_url: 'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop',
            verified: false,
            isPrivate: false
          }
        }
      }
      console.error('❌ Error getting user profile:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Perfil encontrado en Supabase')
    return { success: true, data: data }
    
    /* CÓDIGO ORIGINAL COMENTADO TEMPORALMENTE
    // Hacer la consulta directamente con timeout reducido
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') { // PGRST116 = no rows returned
        console.log('⚠️ Usuario no encontrado en tabla users:', userId)
        return { success: false, error: 'Usuario no encontrado' }
      }
      console.error('❌ Error getting user profile:', error)
      return { success: false, error: supabaseUtils.formatError(error) }
    }
    
    if (!data) {
      console.log('⚠️ Usuario no encontrado en tabla users:', userId)
      return { success: false, error: 'Usuario no encontrado' }
    }
    
    console.log('✅ Perfil encontrado:', data)
    return { success: true, data: data }
    */
  } catch (error) {
    console.error('💥 Error inesperado getting user profile:', error)
    return { success: false, error: error.message || 'Error de conexión. Intenta nuevamente.' }
  }
}

/**
 * Actualizar datos del perfil de usuario
 */
// FUNCIÓN DE PRUEBA DE CONEXIÓN BÁSICA CON TIMEOUT
export const testSupabaseConnection = async () => {
  console.log('🧪 TEST CONEXIÓN: Iniciando...')
  
  try {
    // 1. Verificar cliente
    console.log('🧪 TEST 1: Cliente existe?', !!supabase)
    console.log('🧪 TEST 2: URL Supabase:', supabase?.supabaseUrl || 'NO URL')
    
    // 2. Probar auth con timeout
    console.log('🧪 TEST 3: Probando auth.getUser() con timeout de 5s...')
    const authTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout: auth.getUser() no respondió en 5s')), 5000)
    )
    
    try {
      const { data: userData, error: authError } = await Promise.race([
        supabase.auth.getUser(),
        authTimeout
      ])
      console.log('🧪 TEST 3 Resultado:', authError ? `Error: ${authError.message}` : `Usuario: ${userData?.user?.id}`)
    } catch (timeoutError) {
      console.log('🧪 TEST 3 Resultado: TIMEOUT - auth.getUser() no responde')
      return { 
        success: false, 
        error: 'Auth timeout - posible problema de conexión',
        results: {
          clientExists: !!supabase,
          authWorks: false,
          publicUsersAccessible: false
        }
      }
    }
    
    // 3. Probar query de tabla public.users con timeout
    console.log('🧪 TEST 4: Probando SELECT de tabla public.users con timeout...')
    const queryTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout: query no respondió en 5s')), 5000)
    )
    
    try {
      const { data: publicUsers, error: publicUsersError } = await Promise.race([
        supabase.from('users').select('id').limit(1),
        queryTimeout
      ])
      console.log('🧪 TEST 4 Resultado:', publicUsersError ? `Error: ${publicUsersError.message}` : `Filas: ${publicUsers?.length}`)
      
      return { 
        success: true, 
        results: {
          clientExists: !!supabase,
          authWorks: true,
          publicUsersAccessible: !publicUsersError
        }
      }
    } catch (timeoutError) {
      console.log('🧪 TEST 4 Resultado: TIMEOUT - query no responde')
      return { 
        success: false, 
        error: 'Query timeout - posible problema de conexión',
        results: {
          clientExists: !!supabase,
          authWorks: true,
          publicUsersAccessible: false
        }
      }
    }
  } catch (error) {
    console.error('🧪 TEST ERROR:', error)
    return { success: false, error: error.message }
  }
}

export const updateUserProfile = async (userId, profileData) => {
  if (supabaseConfig.debugMode) {
    console.log('🔄 updateUserProfile iniciado para userId:', userId)
    console.log('🔧 Configuración timeout:', supabaseConfig.timeout + 'ms')
  }
  
  // VERSIÓN SIMPLIFICADA SIN TEST DE CONEXIÓN
  try {
    // LOGGING SEGURO: Solo las keys
    const keys = Object.keys(profileData || {})
    console.log('📝 Keys a actualizar:', keys)
    
    // LOGGING SEGURO: Tamaños sin contenido
    const sizes = {}
    keys.forEach(key => {
      const value = profileData[key]
      if (typeof value === 'string') {
        sizes[key] = value.length + ' chars'
      } else {
        sizes[key] = typeof value
      }
    })
    console.log('📏 Tamaños:', sizes)
    
    // MAPEAR DATOS PARA SUPABASE
    const mappedData = {}
    if (profileData.avatar) {
      mappedData.avatar_url = profileData.avatar
    }
    if (profileData.banner) {
      mappedData.banner_url = profileData.banner
    }
    if (profileData.name) {
      mappedData.name = profileData.name
    }
    if (profileData.username) {
      mappedData.username = profileData.username
    }
    if (profileData.bio) {
      mappedData.bio = profileData.bio
    }
    if (profileData.location) {
      mappedData.location = profileData.location
    }
    if (profileData.website) {
      mappedData.website = profileData.website
    }
    
    // Timestamp
    mappedData.updated_at = new Date().toISOString()
    
    console.log('🔍 Iniciando UPSERT a Supabase...')
    
    // TIMEOUT PARA EVITAR COLGADO INFINITO (configurado desde .env)
    const timeoutMs = supabaseConfig.timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error(`Timeout después de ${timeoutMs/1000} segundos`)), timeoutMs)
    )
    
    const upsertPromise = supabase
      .from('users')
      .upsert({
        id: userId,
        ...mappedData
      })
      .select()
      .single()
    
    console.log(`⏱️ Esperando respuesta de Supabase (máximo ${timeoutMs/1000}s)...`)
    
    // RACE entre la consulta y el timeout
    const result = await Promise.race([upsertPromise, timeoutPromise])
    
    // Si el timeout ganó, result será un Error
    if (result instanceof Error) {
      throw result
    }
    
    const { data, error } = result
    
    console.log('📊 ¡RESPUESTA RECIBIDA!')
    console.log('📊 Resultado Supabase - error:', error ? error.message : 'ninguno')
    console.log('📊 Resultado Supabase - data existe:', !!data)
    
    if (error) {
      console.error('❌ Error en upsert:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Usuario actualizado/creado exitosamente')
    return { success: true, data: data }
  } catch (error) {
    console.error('💥 Error inesperado updating user profile:', error)
    console.error('💥 Stack trace:', error.stack)
    
    // Si es un timeout, mensaje específico
    if (error.message && error.message.includes('Timeout')) {
      return { success: false, error: 'La conexión con Supabase tardó demasiado. Por favor intenta nuevamente.' }
    }
    
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' }
  }
}

/**
 * Obtener estadísticas del usuario (seguidores, seguidos, posts)
 */
export const getUserStats = async (userId) => {
  try {
    // Obtener cantidad de posts del usuario
    const { count: postsCount, error: postsError } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_active', true)
    
    if (postsError && postsError.code !== 'PGRST116') {
      console.error('Error getting posts count:', postsError)
    }

    // Obtener seguidores
    const { count: followersCount, error: followersError } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('followed_user_id', userId)
    
    if (followersError && followersError.code !== 'PGRST116') {
      console.error('Error getting followers count:', followersError)
    }

    // Obtener seguidos
    const { count: followingCount, error: followingError } = await supabase
      .from('follows')
      .select('*', { count: 'exact', head: true })
      .eq('follower_user_id', userId)
    
    if (followingError && followingError.code !== 'PGRST116') {
      console.error('Error getting following count:', followingError)
    }

    return {
      success: true,
      data: {
        posts: postsCount || 0,
        followers: followersCount || 0,
        following: followingCount || 0
      }
    }
  } catch (error) {
    console.error('Error getting user stats:', error)
    return { 
      success: false, 
      error: error.message,
      data: { posts: 0, followers: 0, following: 0 }
    }
  }
}

/**
 * Obtener posts del usuario con tiempo real
 */
export const getUserPosts = (userId, callback) => {
  try {
    console.log('📰 getUserPosts (sin suscripción en tiempo real):', userId)
    
    // TEMPORAL: Solo cargar posts una vez, sin suscripción
    loadUserPosts(userId, callback)

    // Devolver función de limpieza vacía
    return () => {
      console.log('🧹 Cleanup getUserPosts (sin suscripción)')
    }
  } catch (error) {
    console.error('Error loading user posts:', error)
    callback([])
    return () => {}
  }
}

/**
 * Función auxiliar para cargar posts del usuario
 */
const loadUserPosts = async (userId, callback) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id,
        user_id,
        imagen_url,
        contenido,
        hashtags,
        created_at,
        updated_at,
        is_active,
        likes_count,
        comments_count,
        saves_count,
        shares_count
      `)
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error loading user posts:', error)
      callback([])
      return
    }

    // Mapear datos para compatibilidad con el frontend
    const mappedPosts = posts.map(post => ({
      id: post.id,
      userId: post.user_id,
      imageUrl: post.imagen_url,
      caption: post.contenido,
      hashtags: post.hashtags || [],
      likesCount: post.likes_count || 0,
      commentsCount: post.comments_count || 0,
      savesCount: post.saves_count || 0,
      sharesCount: post.shares_count || 0,
      createdAt: new Date(post.created_at),
      isActive: post.is_active
    }))
    
    callback(mappedPosts)
  } catch (error) {
    console.error('Error loading user posts:', error)
    callback([])
  }
}

/**
 * Obtener interacciones de un post específico
 */
export const getPostInteractions = async (postId) => {
  try {
    // En Supabase, las estadísticas ya están en la tabla posts
    const { data: post, error } = await supabase
      .from('posts')
      .select('likes_count, comments_count, saves_count, shares_count')
      .eq('id', postId)
      .single()
    
    if (error) {
      console.error('Error getting post interactions:', error)
      return {
        likesCount: 0,
        commentsCount: 0,
        savesCount: 0,
        sharesCount: 0
      }
    }

    return {
      likesCount: post.likes_count || 0,
      commentsCount: post.comments_count || 0,
      savesCount: post.saves_count || 0,
      sharesCount: post.shares_count || 0
    }
  } catch (error) {
    console.error('Error getting post interactions:', error)
    return {
      likesCount: 0,
      commentsCount: 0,
      savesCount: 0,
      sharesCount: 0
    }
  }
}

/**
 * Verificar si el usuario actual está siguiendo a otro usuario
 */
export const isFollowingUser = async (currentUserId, targetUserId) => {
  try {
    const { data, error } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_user_id', currentUserId)
      .eq('followed_user_id', targetUserId)
      .limit(1)
    
    if (error) {
      console.error('Error checking follow status:', error)
      return false
    }
    
    return data.length > 0
  } catch (error) {
    console.error('Error checking follow status:', error)
    return false
  }
}

/**
 * Seguir/dejar de seguir a un usuario
 */
export const toggleFollowUser = async (currentUserId, targetUserId) => {
  try {
    const isFollowing = await isFollowingUser(currentUserId, targetUserId)
    
    if (isFollowing) {
      // Dejar de seguir
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_user_id', currentUserId)
        .eq('followed_user_id', targetUserId)
      
      if (error) {
        console.error('Error unfollowing user:', error)
        return { success: false, error: supabaseUtils.formatError(error) }
      }
      
      return { success: true, isFollowing: false }
    } else {
      // Seguir
      const { error } = await supabase
        .from('follows')
        .insert({
          follower_user_id: currentUserId,
          followed_user_id: targetUserId,
          created_at: new Date().toISOString()
        })
      
      if (error) {
        console.error('Error following user:', error)
        return { success: false, error: supabaseUtils.formatError(error) }
      }
      
      return { success: true, isFollowing: true }
    }
  } catch (error) {
    console.error('Error toggling follow:', error)
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' }
  }
}

// ==================== DATOS MOCK PARA DESARROLLO ====================

/**
 * Función temporal para obtener datos mock mientras se implementa Supabase completo
 */
export const getMockUserProfile = () => {
  return {
    id: 'agostina-perez',
    name: "Agostina Perez",
    username: "@agostinabelenperez",
    bio: "CEO @ToFit - Asesora de imagen. Te ayudo a potenciar tu imagen!",
    location: "Misiones, Argentina",
    website: "tofit.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop",
    verified: true,
    isPrivate: false,
    createdAt: new Date('2023-01-15'),
    stats: {
      posts: 42,
      followers: 10500,
      following: 890
    }
  }
}

/**
 * Posts mock para desarrollo
 */
export const getMockUserPosts = () => {
  return [
    {
      id: 'post-1',
      userId: 'agostina-perez',
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
      caption: "Nuevo look para la oficina 💼✨ #WorkStyle #OOTD #ToFit",
      hashtags: ["#WorkStyle", "#OOTD", "#ToFit"],
      likesCount: 456,
      commentsCount: 23,
      savesCount: 67,
      sharesCount: 12,
      createdAt: new Date('2024-01-20'),
      isActive: true
    },
    {
      id: 'post-2',
      userId: 'agostina-perez',
      imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
      caption: "Domingo de shopping 🛍️ Encontré estas piezas increíbles",
      hashtags: ["#Shopping", "#Weekend", "#Fashion"],
      likesCount: 289,
      commentsCount: 15,
      savesCount: 34,
      sharesCount: 8,
      createdAt: new Date('2024-01-18'),
      isActive: true
    },
    {
      id: 'post-3',
      userId: 'agostina-perez',
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      caption: "Evento de moda en Buenos Aires 🎉 #FashionWeek",
      hashtags: ["#FashionWeek", "#BuenosAires", "#Event"],
      likesCount: 623,
      commentsCount: 41,
      savesCount: 89,
      sharesCount: 25,
      createdAt: new Date('2024-01-15'),
      isActive: true
    }
  ]
}