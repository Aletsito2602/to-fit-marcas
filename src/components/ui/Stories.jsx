import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const Stories = ({ isOpen, onClose, stories, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Duración de cada historia en segundos
  const STORY_DURATION = 5

  // Reset cuando se abre/cambia historia
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
      setProgress(0)
    }
  }, [isOpen, initialIndex])

  // Auto progreso de las historias
  useEffect(() => {
    if (!isOpen || isPaused || !stories.length) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (STORY_DURATION * 10))
        
        if (newProgress >= 100) {
          // Pasar a la siguiente historia
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1)
            return 0
          } else {
            // Cerrar cuando termine la última historia
            onClose()
            return 0
          }
        }
        
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isOpen, currentIndex, isPaused, stories.length, onClose])

  // Reset progress cuando cambia el índice
  useEffect(() => {
    setProgress(0)
  }, [currentIndex])

  // Navegación con teclado
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onClose()
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const isLeftSide = x < rect.width / 2

    if (isLeftSide) {
      goToPrevious()
    } else {
      goToNext()
    }
  }

  if (!isOpen || !stories.length) return null

  const currentStory = stories[currentIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        {/* Contenedor de la historia - Formato vertical como Instagram */}
        <div className="relative w-full h-full sm:w-[400px] sm:h-[600px] md:w-[420px] md:h-[680px] lg:w-[450px] lg:h-[750px] 
                        sm:rounded-2xl overflow-hidden bg-black shadow-2xl">

          {/* Barras de progreso */}
          <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: index < currentIndex ? '100%' : 
                           index === currentIndex ? `${progress}%` : '0%'
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            ))}
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm 
                       hover:bg-black/70 transition-colors duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Área de la historia */}
          <motion.div
            key={currentIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full h-full flex items-center justify-center"
            onClick={handleTap}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Imagen de fondo optimizada */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${currentStory.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50" />

            {/* Contenido de la historia - Optimizado para el nuevo tamaño */}
            <div className="relative z-10 text-center text-white px-6 max-w-sm">
              {/* Título principal */}
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-3 drop-shadow-lg leading-tight"
              >
                {currentStory.title}
              </motion.h1>

              {/* Subtítulo o precio */}
              {currentStory.subtitle && (
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-base sm:text-lg md:text-lg mb-4 text-gray-200 drop-shadow-lg"
                >
                  {currentStory.subtitle}
                </motion.p>
              )}

              {/* Precio para looks de influencers */}
              {currentStory.price && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <span className="text-xl sm:text-2xl md:text-2xl font-bold text-green-400 drop-shadow-lg">
                    {currentStory.price}
                  </span>
                </motion.div>
              )}

              {/* Botón de acción */}
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white text-black px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-bold text-sm sm:text-base
                           hover:bg-gray-100 transition-colors duration-200
                           transform hover:scale-105 active:scale-95"
                onClick={(e) => {
                  e.stopPropagation()
                  // Aquí puedes agregar la lógica de compra/ver más
                  console.log('Acción:', currentStory.action || 'Ver más')
                }}
              >
                {currentStory.action || 'Ver más'}
              </motion.button>
            </div>

            {/* Controles de navegación laterales - Solo desktop y dentro del contenedor */}
            <div className="hidden sm:flex absolute inset-0 items-center justify-between px-2 pointer-events-none">
              {currentIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                  className="p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 
                             transition-colors duration-200 pointer-events-auto"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
              )}

              {currentIndex < stories.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  className="p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 
                             transition-colors duration-200 pointer-events-auto"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            {/* Indicador de tap (solo móvil) */}
            <div className="sm:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white/60 text-xs">
              Toca los lados para navegar
            </div>
          </motion.div>

          {/* Click fuera para cerrar (solo desktop) */}
          <div 
            className="hidden sm:block fixed inset-0 -z-10" 
            onClick={onClose}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Stories 