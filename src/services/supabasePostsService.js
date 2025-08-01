import { supabase, supabaseUtils } from '../config/supabase'

// ==================== POSTS CON SUPABASE ====================

export const getPostById = async (postId) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()
    
    if (error) {
      console.error('Error getting post:', error)
      return { success: false, error: supabaseUtils.formatError(error) }
    }
    
    return { 
      success: true, 
      data: {
        id: data.id,
        userId: data.user_id,
        imageUrl: data.imagen_url || data.image_url,
        caption: data.contenido || data.content,
        hashtags: data.hashtags || [],
        likesCount: data.likes_count || 0,
        commentsCount: data.comments_count || 0,
        savesCount: data.saves_count || 0,
        sharesCount: data.shares_count || 0,
        isActive: data.is_active,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      }
    }
  } catch (error) {
    console.error('Error inesperado getting post:', error)
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' }
  }
}

export const createPost = async (postData) => {
  try {
    console.log('🎯 Creando post con Supabase:', postData)
    
    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: postData.userId,
        imagen_url: postData.imageUrl,
        contenido: postData.caption || postData.contenido,
        hashtags: postData.hashtags || [],
        likes_count: 0,
        comments_count: 0,
        saves_count: 0,
        shares_count: 0,
        is_active: true
      })
      .select()
      .single()
    
    if (error) {
      console.error('❌ Error creating post:', error)
      return { success: false, error: supabaseUtils.formatError(error) }
    }
    
    console.log('✅ Post creado exitosamente:', data.id)
    return { 
      success: true, 
      data: {
        id: data.id,
        userId: data.user_id,
        imageUrl: data.imagen_url,
        caption: data.contenido,
        hashtags: data.hashtags,
        likesCount: data.likes_count,
        commentsCount: data.comments_count,
        savesCount: data.saves_count,
        sharesCount: data.shares_count,
        isActive: data.is_active,
        createdAt: new Date(data.created_at)
      }
    }
  } catch (error) {
    console.error('💥 Error inesperado creating post:', error)
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' }
  }
}

// Funciones básicas sin tablas adicionales por ahora
export const deletePost = async (postId) => {
  try {
    const { error } = await supabase
      .from('posts')
      .update({ is_active: false })
      .eq('id', postId)
    
    if (error) {
      console.error('Error deleting post:', error)
      return { success: false, error: supabaseUtils.formatError(error) }
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error inesperado deleting post:', error)
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' }
  }
}

export const likePost = async (postId, userId) => {
  console.log('👍 Like post (sin implementar aún):', postId, userId)
  return { success: true }
}

export const unlikePost = async (postId, userId) => {
  console.log('👎 Unlike post (sin implementar aún):', postId, userId)
  return { success: true }
}

export const savePost = async (postId, userId) => {
  console.log('💾 Save post (sin implementar aún):', postId, userId)
  return { success: true }
}

export const unsavePost = async (postId, userId) => {
  console.log('🗑️ Unsave post (sin implementar aún):', postId, userId)
  return { success: true }
}

// Función temporal para actividad de usuario (sin Firebase)
export const syncUserActivityOnAction = async (action, data) => {
  console.log('📊 User activity (temporalmente deshabilitado):', action, data)
  return { success: true }
}

// ==================== FUNCIONES DE FOLLOW (TEMPORALES) ====================

export const followUser = async (currentUserId, targetUserId) => {
  console.log('👥 Follow user (sin implementar aún):', currentUserId, targetUserId)
  return { success: true }
}

export const unfollowUser = async (currentUserId, targetUserId) => {
  console.log('👤 Unfollow user (sin implementar aún):', currentUserId, targetUserId)
  return { success: true }
}

export const getFeedPosts = async (followingIds, limit = 20) => {
  console.log('📰 Get feed posts (sin implementar aún):', followingIds, limit)
  return []
}

export const getRecommendationsPosts = async (userId, userPreferences = {}) => {
  console.log('💡 Get recommendations (sin implementar aún):', userId, userPreferences)
  return []
}

// ==================== COMENTARIOS (TEMPORALES) ====================

export const addComment = async (postId, userId, content, userDisplayName, userAvatar) => {
  console.log('💬 Add comment (sin implementar aún):', postId, userId, content)
  return { success: true, id: 'temp-comment-id' }
}

export const getComments = (postId, callback) => {
  console.log('📄 Get comments (sin implementar aún):', postId)
  callback([])
  return () => {} // unsubscribe function
}