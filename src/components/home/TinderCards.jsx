import { useState } from 'react'
import { useSprings, animated, to as interpolate } from 'react-spring'
import { useDrag } from '@use-gesture/react'
import { Heart, Eye, Bookmark, Tag, MoreHorizontal } from 'lucide-react'
import PostModal from '../ui/PostModal'

// Mock data para las cards
const mockCards = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    brand: "Adidas",
    handle: "@adidas",
    likes: 1250,
    isLiked: false,
    description: "Conjunto deportivo elegante"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=600&fit=crop",
    brand: "Nike",
    handle: "@nike",
    likes: 890,
    isLiked: false,
    description: "Outfit casual urbano"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop",
    brand: "Zara",
    handle: "@zara",
    likes: 2340,
    isLiked: true,
    description: "Look profesional moderno"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
    brand: "H&M",
    handle: "@hm",
    likes: 567,
    isLiked: false,
    description: "Estilo bohemio chic"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
    brand: "Mango",
    handle: "@mango",
    likes: 1456,
    isLiked: false,
    description: "Elegancia casual"
  }
]

// Transformación inicial de las cards
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})

const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

const TinderCards = () => {
  const [gone] = useState(() => new Set())
  const [resetting, setResetting] = useState(false)
  const [postModalOpen, setPostModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [props, api] = useSprings(mockCards.length, i => ({
    ...to(i),
    from: from(i),
  }))

  // Función para resetear las cards MEJORADA
  const resetCards = () => {
    setResetting(true)
    gone.clear()
    
    // Reset inmediato sin animación para evitar artefactos
    api.start(i => ({
      x: 0,
      y: i * -4,
      scale: 1,
      rot: -10 + Math.random() * 20,
      delay: i * 50,
      config: { tension: 300, friction: 50 },
      onRest: i === mockCards.length - 1 ? () => setResetting(false) : undefined
    }))
  }

  const bind = useDrag(({ 
    args: [index], 
    active, 
    movement: [mx], 
    direction: [xDir], 
    velocity: [vx],
    distance,
    cancel 
  }) => {
    // No permitir interacción durante reset
    if (resetting) {
      cancel()
      return
    }

    const trigger = vx > 0.2 // VELOCIDAD límite para trigger - valor más bajo para móvil
    const isGone = gone.has(index)

    if (!active && trigger) gone.add(index)

    api.start(i => {
      if (index !== i) return
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0
      const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0)
      const scale = active ? 1.1 : 1
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
      }
    })

    // Resetear si todas las cards han sido eliminadas
    if (!active && gone.size === mockCards.length) {
      setTimeout(() => {
        resetCards()
      }, 600)
    }
  })

  const swipeCard = (index, direction) => {
    if (resetting) return
    
    gone.add(index)
    api.start(i => {
      if (index !== i) return
      return {
        x: (200 + window.innerWidth) * direction,
        rot: direction * 10,
        scale: 1,
        config: { friction: 50, tension: 200 },
      }
    })
    
    // Verificar si todas las cards se han eliminado
    if (gone.size === mockCards.length) {
      setTimeout(() => {
        resetCards()
      }, 500)
    }
  }

  // Función para manejar acciones de botones
  const handleAction = (action, cardIndex) => {
    if (resetting) return
    
    switch (action) {
      case 'like':
        console.log('Liked:', mockCards[cardIndex]?.brand)
        swipeCard(cardIndex, 1) // Swipe right (like)
        break
      case 'pass':
        console.log('Passed:', mockCards[cardIndex]?.brand)
        swipeCard(cardIndex, -1) // Swipe left (pass)
        break
      case 'bookmark':
        console.log('Bookmarked:', mockCards[cardIndex]?.brand)
        break
      case 'look':
        console.log('View look:', mockCards[cardIndex]?.brand)
        handleCardClick(cardIndex)
        break
      case 'more':
        console.log('More options:', mockCards[cardIndex]?.brand)
        break
    }
  }

  const handleCardClick = (cardIndex) => {
    const card = mockCards[cardIndex]
    setSelectedCard({
      id: `card_${card.id}`,
      user: {
        name: card.brand,
        handle: card.handle,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=40&h=40&fit=crop&crop=face"
      },
      image: card.image,
      timestamp: "2h",
      likes: card.likes,
      isLiked: card.isLiked,
      comments: [
        {
          id: "comment_1",
          user: { 
            name: "FashionLover", 
            handle: "@fashionlover", 
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" 
          },
          text: "¡Me encanta este look! 😍",
          likes: 5,
          isLiked: false,
          timestamp: "1h"
        }
      ]
    })
    setPostModalOpen(true)
  }

  const closePostModal = () => {
    setPostModalOpen(false)
    setTimeout(() => setSelectedCard(null), 300)
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center 
                    px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Cards Stack - TAMAÑO REDUCIDO */}
      <div className="relative w-full h-full 
                      max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[380px] xl:max-w-[400px]
                      max-h-[400px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[520px] xl:max-h-[550px]
                      flex items-center justify-center">
        {props.map(({ x, y, rot, scale }, i) => {
          // No renderizar cards que están siendo reseteadas para evitar artefactos
          const isGone = gone.has(i)
          if (resetting && isGone) return null
          
          return (
            <animated.div
              key={mockCards[i].id}
              className="absolute will-change-transform cursor-grab active:cursor-grabbing touch-none
                         w-full h-full"
              style={{
                transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
                visibility: resetting && isGone ? 'hidden' : 'visible'
              }}
              {...bind(i)}
            >
              <animated.div
                className="w-full h-full rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden bg-white"
                style={{
                  transform: interpolate([rot, scale], (r, s) => 
                    `perspective(1500px) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
                  ),
                }}
              >
                {/* Imagen principal */}
                <div className="relative w-full h-full">
                  <img
                    src={mockCards[i].image}
                    alt={mockCards[i].description}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Brand info - RESPONSIVE */}
                  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 
                                  left-4 sm:left-6 md:left-8 
                                  flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                                    bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-black font-bold 
                                       text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                        {mockCards[i].brand.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold 
                                     text-base sm:text-lg md:text-xl lg:text-2xl">
                        {mockCards[i].brand}
                      </h3>
                      <p className="text-white/80 
                                    text-sm sm:text-base md:text-lg">
                        {mockCards[i].handle}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons en la card - RESPONSIVE MEJORADO */}
                  <div className="absolute right-3 sm:right-4 md:right-6 
                                  top-1/2 transform -translate-y-1/2 
                                  flex flex-col space-y-3 sm:space-y-4 z-10">
                    <button
                      onClick={() => handleAction('like', i)}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                                 bg-white/90 hover:bg-white rounded-full 
                                 flex items-center justify-center shadow-lg 
                                 transition-all duration-200 hover:scale-110 
                                 active:scale-95"
                      disabled={resetting}
                    >
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-500" />
                    </button>
                    
                    <button
                      onClick={() => handleAction('look', i)}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                                 bg-white/90 hover:bg-white rounded-full 
                                 flex items-center justify-center shadow-lg 
                                 transition-all duration-200 hover:scale-110 
                                 active:scale-95"
                      disabled={resetting}
                    >
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-700" />
                    </button>
                    
                    <button
                      onClick={() => handleAction('bookmark', i)}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                                 bg-white/90 hover:bg-white rounded-full 
                                 flex items-center justify-center shadow-lg 
                                 transition-all duration-200 hover:scale-110 
                                 active:scale-95"
                      disabled={resetting}
                    >
                      <Bookmark className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-blue-600" />
                    </button>
                    
                    <button
                      onClick={() => handleAction('more', i)}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                                 bg-white/90 hover:bg-white rounded-full 
                                 flex items-center justify-center shadow-lg 
                                 transition-all duration-200 hover:scale-110 
                                 active:scale-95"
                      disabled={resetting}
                    >
                      <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-700" />
                    </button>
                  </div>
                </div>
              </animated.div>
            </animated.div>
          )
        })}
      </div>

      {/* Indicador de repetición infinita - RESPONSIVE */}
      <div className="absolute top-3 sm:top-4 md:top-6 
                      right-3 sm:right-4 md:right-6 
                      text-white/60 text-xs sm:text-sm">
        ♾️ Contenido infinito
      </div>

      {/* PostModal Componente */}
      <PostModal 
        isOpen={postModalOpen}
        onClose={closePostModal}
        post={selectedCard}
      />
    </div>
  )
}

export default TinderCards 