// Mock data realista para el sistema de recomendaciones inteligente

// Usuarios ficticios diversos
export const mockUsers = [
  {
    id: 'user_1',
    username: 'sofia_martinez',
    displayName: 'Sofia Martinez',
    handle: '@sofia_martinez',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=40&h=40&fit=crop&crop=face',
    isFollowed: true,
    followers: 15200,
    isVerified: true,
    category: 'fashion_blogger'
  },
  {
    id: 'user_2', 
    username: 'adidas',
    displayName: 'Adidas',
    handle: '@adidas',
    avatar: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=40&h=40&fit=crop',
    isFollowed: false,
    followers: 2500000,
    isVerified: true,
    category: 'brand'
  },
  {
    id: 'user_3',
    username: 'lucia_style',
    displayName: 'Lucia Fernandez',
    handle: '@lucia_style',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    isFollowed: true,
    followers: 8900,
    isVerified: false,
    category: 'influencer'
  },
  {
    id: 'user_4',
    username: 'nike',
    displayName: 'Nike',
    handle: '@nike',
    avatar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=40&h=40&fit=crop',
    isFollowed: false,
    followers: 3200000,
    isVerified: true,
    category: 'brand'
  },
  {
    id: 'user_5',
    username: 'martina_chic',
    displayName: 'Martina Rodriguez',
    handle: '@martina_chic',
    avatar: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=40&h=40&fit=crop&crop=face',
    isFollowed: true,
    followers: 12800,
    isVerified: true,
    category: 'fashion_blogger'
  },
  {
    id: 'user_6',
    username: 'zara',
    displayName: 'Zara',
    handle: '@zara',
    avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=40&h=40&fit=crop',
    isFollowed: false,
    followers: 1800000,
    isVerified: true,
    category: 'brand'
  },
  {
    id: 'user_7',
    username: 'camila_trends',
    displayName: 'Camila Morales',
    handle: '@camila_trends',
    avatar: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=40&h=40&fit=crop&crop=face',
    isFollowed: false,
    followers: 5600,
    isVerified: false,
    category: 'influencer'
  },
  {
    id: 'user_8',
    username: 'hm',
    displayName: 'H&M',
    handle: '@hm',
    avatar: 'https://images.unsplash.com/photo-1523380744952-b79d241c7c4a?w=40&h=40&fit=crop',
    isFollowed: true,
    followers: 1200000,
    isVerified: true,
    category: 'brand'
  },
  {
    id: 'user_9',
    username: 'ana_vintage',
    displayName: 'Ana Gutierrez',
    handle: '@ana_vintage',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
    isFollowed: true,
    followers: 9200,
    isVerified: false,
    category: 'vintage_lover'
  },
  {
    id: 'user_10',
    username: 'mango',
    displayName: 'Mango',
    handle: '@mango',
    avatar: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=40&h=40&fit=crop',
    isFollowed: false,
    followers: 950000,
    isVerified: true,
    category: 'brand'
  }
];

// Posts diversos con categorías y estilos variados
export const mockPosts = [
  {
    id: 'post_1',
    userId: 'user_2', // Adidas
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop',
    caption: 'Nuevo drop deportivo. Comodidad y estilo en cada paso 👟',
    hashtags: ['#Adidas', '#Sportswear', '#NewDrop', '#ToFitStyle'],
    category: 'sport',
    subcategory: 'athletic',
    brand: 'Adidas',
    likes: 15420,
    comments: 234,
    saves: 892,
    shares: 156,
    createdAt: new Date('2024-01-20T10:30:00Z'),
    products: [
      { id: 'prod_1', name: 'Adidas Ultraboost 22', price: 89999, position: { x: 0.3, y: 0.7 } },
      { id: 'prod_2', name: 'Adidas Track Jacket', price: 45999, position: { x: 0.5, y: 0.4 } }
    ],
    engagement_score: 0.87,
    trending_score: 0.92
  },
  {
    id: 'post_2',
    userId: 'user_1', // Sofia Martinez
    imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=600&fit=crop',
    caption: 'Look casual para el finde. ¿Cuál es tu favorito? 💫',
    hashtags: ['#CasualLook', '#WeekendVibes', '#OOTD', '#Fashion'],
    category: 'casual',
    subcategory: 'everyday',
    brand: 'Mixed',
    likes: 3240,
    comments: 89,
    saves: 456,
    shares: 67,
    createdAt: new Date('2024-01-19T16:45:00Z'),
    products: [
      { id: 'prod_3', name: 'Jeans Mom Fit', price: 29999, position: { x: 0.4, y: 0.6 } },
      { id: 'prod_4', name: 'Sweater Oversized', price: 19999, position: { x: 0.5, y: 0.3 } }
    ],
    engagement_score: 0.76,
    trending_score: 0.68
  },
  {
    id: 'post_3',
    userId: 'user_6', // Zara
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop',
    caption: 'Elegancia profesional redefinida. Nueva colección ejecutiva ✨',
    hashtags: ['#Zara', '#Professional', '#NewCollection', '#Elegance'],
    category: 'formal',
    subcategory: 'professional',
    brand: 'Zara',
    likes: 8950,
    comments: 167,
    saves: 1203,
    shares: 234,
    createdAt: new Date('2024-01-18T09:15:00Z'),
    products: [
      { id: 'prod_5', name: 'Blazer Structured', price: 79999, position: { x: 0.5, y: 0.3 } },
      { id: 'prod_6', name: 'Pantalón Recto', price: 39999, position: { x: 0.5, y: 0.6 } }
    ],
    engagement_score: 0.82,
    trending_score: 0.78
  },
  {
    id: 'post_4',
    userId: 'user_3', // Lucia Style
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
    caption: 'Boho vibes para esta temporada 🌻 Me enamoré de estos colores',
    hashtags: ['#BohoStyle', '#VintageVibes', '#SpringFashion', '#Colors'],
    category: 'boho',
    subcategory: 'vintage',
    brand: 'Vintage Mix',
    likes: 2890,
    comments: 156,
    saves: 892,
    shares: 78,
    createdAt: new Date('2024-01-17T14:20:00Z'),
    products: [
      { id: 'prod_7', name: 'Vestido Floral', price: 24999, position: { x: 0.5, y: 0.5 } },
      { id: 'prod_8', name: 'Collar Bohemio', price: 8999, position: { x: 0.5, y: 0.2 } }
    ],
    engagement_score: 0.89,
    trending_score: 0.71
  },
  {
    id: 'post_5',
    userId: 'user_4', // Nike
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
    caption: 'Just Do It. Nueva línea Nike Air 🔥',
    hashtags: ['#Nike', '#JustDoIt', '#NikeAir', '#Innovation'],
    category: 'sport',
    subcategory: 'performance',
    brand: 'Nike',
    likes: 12680,
    comments: 298,
    saves: 1567,
    shares: 445,
    createdAt: new Date('2024-01-16T11:30:00Z'),
    products: [
      { id: 'prod_9', name: 'Air Force 1', price: 69999, position: { x: 0.3, y: 0.8 } },
      { id: 'prod_10', name: 'Nike Hoodie', price: 39999, position: { x: 0.5, y: 0.4 } }
    ],
    engagement_score: 0.91,
    trending_score: 0.89
  },
  {
    id: 'post_6',
    userId: 'user_5', // Martina Chic
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop',
    caption: 'Saturday night outfit 💃 Ready to dance!',
    hashtags: ['#NightOut', '#SaturdayNight', '#PartyLook', '#Confidence'],
    category: 'party',
    subcategory: 'night',
    brand: 'Designer Mix',
    likes: 4560,
    comments: 123,
    saves: 678,
    shares: 89,
    createdAt: new Date('2024-01-15T19:45:00Z'),
    products: [
      { id: 'prod_11', name: 'Vestido Negro', price: 49999, position: { x: 0.5, y: 0.5 } },
      { id: 'prod_12', name: 'Tacones Stiletto', price: 34999, position: { x: 0.4, y: 0.9 } }
    ],
    engagement_score: 0.84,
    trending_score: 0.73
  },
  {
    id: 'post_7',
    userId: 'user_8', // H&M
    imageUrl: 'https://images.unsplash.com/photo-1503104834685-7205e8607eb1?w=400&h=600&fit=crop',
    caption: 'Sustainable fashion for a better future 🌱',
    hashtags: ['#HM', '#Sustainable', '#EcoFashion', '#ConsciousFashion'],
    category: 'sustainable',
    subcategory: 'eco',
    brand: 'H&M',
    likes: 7890,
    comments: 234,
    saves: 1123,
    shares: 267,
    createdAt: new Date('2024-01-14T08:20:00Z'),
    products: [
      { id: 'prod_13', name: 'Camiseta Orgánica', price: 12999, position: { x: 0.5, y: 0.4 } },
      { id: 'prod_14', name: 'Jeans Reciclados', price: 24999, position: { x: 0.5, y: 0.7 } }
    ],
    engagement_score: 0.78,
    trending_score: 0.81
  },
  {
    id: 'post_8',
    userId: 'user_7', // Camila Trends
    imageUrl: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=600&fit=crop',
    caption: 'Street style inspo from Buenos Aires 🇦🇷',
    hashtags: ['#StreetStyle', '#BuenosAires', '#UrbanLook', '#Argentina'],
    category: 'street',
    subcategory: 'urban',
    brand: 'Local Brands',
    likes: 1890,
    comments: 67,
    saves: 234,
    shares: 45,
    createdAt: new Date('2024-01-13T15:10:00Z'),
    products: [
      { id: 'prod_15', name: 'Bomber Jacket', price: 32999, position: { x: 0.5, y: 0.3 } },
      { id: 'prod_16', name: 'Sneakers Urbanas', price: 28999, position: { x: 0.3, y: 0.8 } }
    ],
    engagement_score: 0.72,
    trending_score: 0.65
  },
  {
    id: 'post_9',
    userId: 'user_9', // Ana Vintage
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop',
    caption: 'Vintage treasures from the 90s ✨ Nothing beats authentic style',
    hashtags: ['#Vintage', '#90sFashion', '#Authentic', '#Retro'],
    category: 'vintage',
    subcategory: 'retro',
    brand: 'Vintage',
    likes: 3456,
    comments: 178,
    saves: 892,
    shares: 123,
    createdAt: new Date('2024-01-12T12:30:00Z'),
    products: [
      { id: 'prod_17', name: 'Chaqueta Vintage', price: 18999, position: { x: 0.5, y: 0.4 } },
      { id: 'prod_18', name: 'Mom Jeans 90s', price: 15999, position: { x: 0.5, y: 0.7 } }
    ],
    engagement_score: 0.88,
    trending_score: 0.79
  },
  {
    id: 'post_10',
    userId: 'user_10', // Mango
    imageUrl: 'https://images.unsplash.com/photo-1506629905057-46ac5b127cdb?w=400&h=600&fit=crop',
    caption: 'Mediterranean elegance meets modern design 🏖️',
    hashtags: ['#Mango', '#Mediterranean', '#Elegance', '#Modern'],
    category: 'elegant',
    subcategory: 'modern',
    brand: 'Mango',
    likes: 6789,
    comments: 145,
    saves: 967,
    shares: 198,
    createdAt: new Date('2024-01-11T17:15:00Z'),
    products: [
      { id: 'prod_19', name: 'Blusa Seda', price: 42999, position: { x: 0.5, y: 0.3 } },
      { id: 'prod_20', name: 'Falda Midi', price: 29999, position: { x: 0.5, y: 0.6 } }
    ],
    engagement_score: 0.81,
    trending_score: 0.74
  }
];

// Categorías para el algoritmo
export const categories = [
  { id: 'sport', name: 'Deportivo', weight: 1.0 },
  { id: 'casual', name: 'Casual', weight: 1.0 },
  { id: 'formal', name: 'Formal', weight: 1.0 },
  { id: 'boho', name: 'Bohemio', weight: 0.8 },
  { id: 'party', name: 'Fiesta', weight: 0.7 },
  { id: 'sustainable', name: 'Sostenible', weight: 0.9 },
  { id: 'street', name: 'Urbano', weight: 0.9 },
  { id: 'vintage', name: 'Vintage', weight: 0.8 },
  { id: 'elegant', name: 'Elegante', weight: 0.9 }
];

// Marcas populares
export const brands = [
  { id: 'adidas', name: 'Adidas', weight: 1.0 },
  { id: 'nike', name: 'Nike', weight: 1.0 },
  { id: 'zara', name: 'Zara', weight: 0.9 },
  { id: 'hm', name: 'H&M', weight: 0.8 },
  { id: 'mango', name: 'Mango', weight: 0.8 },
  { id: 'mixed', name: 'Mixed', weight: 0.6 },
  { id: 'vintage', name: 'Vintage', weight: 0.7 },
  { id: 'local', name: 'Local Brands', weight: 0.5 }
];

// Interacciones simuladas del usuario para el algoritmo
export const mockUserInteractions = [
  { postId: 'post_1', action: 'like', category: 'sport', brand: 'adidas', timestamp: new Date('2024-01-20T10:35:00Z') },
  { postId: 'post_3', action: 'save', category: 'formal', brand: 'zara', timestamp: new Date('2024-01-18T09:20:00Z') },
  { postId: 'post_4', action: 'like', category: 'boho', brand: 'vintage_mix', timestamp: new Date('2024-01-17T14:25:00Z') },
  { postId: 'post_6', action: 'save', category: 'party', brand: 'designer_mix', timestamp: new Date('2024-01-15T19:50:00Z') },
  { postId: 'post_9', action: 'like', category: 'vintage', brand: 'vintage', timestamp: new Date('2024-01-12T12:35:00Z') },
  { postId: 'post_2', action: 'pass', category: 'casual', brand: 'mixed', timestamp: new Date('2024-01-19T16:50:00Z') },
  { postId: 'post_7', action: 'like', category: 'sustainable', brand: 'hm', timestamp: new Date('2024-01-14T08:25:00Z') },
  { postId: 'post_5', action: 'save', category: 'sport', brand: 'nike', timestamp: new Date('2024-01-16T11:35:00Z') }
];

// Configuración del algoritmo de recomendaciones
export const algorithmConfig = {
  weights: {
    categoryPreference: 0.35,
    brandPreference: 0.25,
    followingBoost: 0.20,
    popularityScore: 0.10,
    recencyBoost: 0.10
  },
  diversityFactor: 0.3, // 30% de diversidad para evitar echo chamber
  followingBoostMultiplier: 1.5,
  trendingThreshold: 0.8
}; 