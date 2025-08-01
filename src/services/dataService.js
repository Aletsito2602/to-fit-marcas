/**
 * Servicio unificado de datos para ToFit usando Supabase
 * Reemplaza todas las dependencias de Firebase
 */

import supabasePostsService from './supabasePostsService'
import supabaseProfesionalesService from './supabaseProfesionalesService'
import supabaseProductosService from './supabaseProductosService'
import supabaseAuthService from './supabaseAuthService'

class DataService {
  // ============================================================================
  // POSTS Y SOCIAL
  // ============================================================================
  
  // Posts del feed
  async getFeedPosts(limit = 20, offset = 0) {
    return await supabasePostsService.getFeedPosts(limit, offset)
  }
  
  // Posts por usuario
  async getUserPosts(userId, limit = 20, offset = 0) {
    return await supabasePostsService.getUserPosts(userId, limit, offset)
  }
  
  // Buscar posts
  async searchPosts(query, filters = {}) {
    return await supabasePostsService.searchPosts(query, filters)
  }
  
  // Crear post
  async createPost(postData) {
    return await supabasePostsService.createPost(postData)
  }
  
  // Interacciones con posts
  async likePost(postId) {
    return await supabasePostsService.likePost(postId)
  }
  
  async unlikePost(postId) {
    return await supabasePostsService.unlikePost(postId)
  }
  
  async savePost(postId) {
    return await supabasePostsService.savePost(postId)
  }
  
  async unsavePost(postId) {
    return await supabasePostsService.unsavePost(postId)
  }
  
  // Comentarios
  async getPostComments(postId, limit = 20, offset = 0) {
    return await supabasePostsService.getPostComments(postId, limit, offset)
  }
  
  async createComment(postId, content) {
    return await supabasePostsService.createComment(postId, content)
  }
  
  // ============================================================================
  // PROFESIONALES Y SERVICIOS
  // ============================================================================
  
  // Profesionales
  async getProfesionales(filters = {}) {
    return await supabaseProfesionalesService.getProfesionales(filters)
  }
  
  async getProfesionalById(profesionalId) {
    return await supabaseProfesionalesService.getProfesionalById(profesionalId)
  }
  
  async searchProfesionales(query, filters = {}) {
    return await supabaseProfesionalesService.searchProfesionales(query, filters)
  }
  
  // Servicios
  async getServiciosByProfesional(profesionalId, limit = 20, offset = 0) {
    return await supabaseProfesionalesService.getServiciosByProfesional(profesionalId, limit, offset)
  }
  
  async getServicioById(servicioId) {
    return await supabaseProfesionalesService.getServicioById(servicioId)
  }
  
  async searchServicios(query, filters = {}) {
    return await supabaseProfesionalesService.searchServicios(query, filters)
  }
  
  // Reservas
  async createReserva(reservaData) {
    return await supabaseProfesionalesService.createReserva(reservaData)
  }
  
  async getUserReservas(status = null) {
    return await supabaseProfesionalesService.getUserReservas(status)
  }
  
  // Favoritos de servicios
  async addServiceToFavorites(servicioId) {
    return await supabaseProfesionalesService.addToFavorites(servicioId)
  }
  
  async removeServiceFromFavorites(servicioId) {
    return await supabaseProfesionalesService.removeFromFavorites(servicioId)
  }
  
  async getUserFavoriteServices() {
    return await supabaseProfesionalesService.getUserFavoriteServicios()
  }
  
  // ============================================================================
  // PRODUCTOS Y MARKETPLACE
  // ============================================================================
  
  // Productos
  async getProductos(filters = {}) {
    return await supabaseProductosService.getProductos(filters)
  }
  
  async getProductoById(productoId) {
    return await supabaseProductosService.getProductoById(productoId)
  }
  
  async searchProductos(query, filters = {}) {
    return await supabaseProductosService.searchProductos(query, filters)
  }
  
  async getRecommendedProductos(limit = 10) {
    return await supabaseProductosService.getRecommendedProductos(limit)
  }
  
  async getProductosEnOferta(limit = 20, offset = 0) {
    return await supabaseProductosService.getProductosEnOferta(limit, offset)
  }
  
  // Marcas
  async getMarcas(featured = null) {
    return await supabaseProductosService.getMarcas(featured)
  }
  
  async getMarcaById(marcaId) {
    return await supabaseProductosService.getMarcaById(marcaId)
  }
  
  async getFeaturedMarcas() {
    return await supabaseProductosService.getFeaturedMarcas()
  }
  
  // Categorías
  async getCategorias(parentId = null) {
    return await supabaseProductosService.getCategorias(parentId)
  }
  
  async getCategoriaById(categoriaId) {
    return await supabaseProductosService.getCategoriaById(categoriaId)
  }
  
  // Favoritos de productos
  async addProductToFavorites(productoId) {
    return await supabaseProductosService.addProductoToFavorites(productoId)
  }
  
  async removeProductFromFavorites(productoId) {
    return await supabaseProductosService.removeProductoFromFavorites(productoId)
  }
  
  async getUserFavoriteProducts() {
    return await supabaseProductosService.getUserFavoriteProductos()
  }
  
  // ============================================================================
  // USUARIO
  // ============================================================================
  
  // Perfil de usuario
  async getUserProfile(userId) {
    return await supabaseAuthService.getUserData(userId)
  }
  
  async updateUserProfile(userId, userData) {
    return await supabaseAuthService.updateUserData(userId, userData)
  }
  
  // ============================================================================
  // ANALYTICS
  // ============================================================================
  
  // Tracking de eventos
  async trackProductView(productoId) {
    return await supabaseProductosService.trackProductView(productoId)
  }
  
  async trackProductClick(productoId, source = 'listing') {
    return await supabaseProductosService.trackProductClick(productoId, source)
  }
  
  async trackServiceEvent(eventType, servicioId, profesionalId = null, contactMethod = null) {
    return await supabaseProfesionalesService.trackEvent(eventType, servicioId, profesionalId, contactMethod)
  }
  
  // ============================================================================
  // SUBSCRIPCIONES EN TIEMPO REAL
  // ============================================================================
  
  // Suscribirse a cambios en el feed
  subscribeToFeed(callback) {
    return supabasePostsService.subscribeToFeed(callback)
  }
  
  // Suscribirse a comentarios de un post
  subscribeToPostComments(postId, callback) {
    return supabasePostsService.subscribeToPostComments(postId, callback)
  }
  
  // Suscribirse a cambios en productos
  subscribeToProductos(callback, filters = {}) {
    return supabaseProductosService.subscribeToProductos(callback, filters)
  }
}

// Exportar instancia singleton
export const dataService = new DataService()
export default dataService