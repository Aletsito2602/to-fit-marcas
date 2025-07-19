import { useState, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Stories from '../components/ui/Stories'

// Mock data para las colecciones del hero banner
const heroCollections = [
  {
    id: 1,
    brand: "Adidas x Pharrell",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    buttonText: "Ver Colección"
  },
  {
    id: 2,
    brand: "Nike x Off-White",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=400&fit=crop",
    buttonText: "Ver Colección"
  },
  {
    id: 3,
    brand: "Supreme x Louis Vuitton",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    buttonText: "Ver Colección"
  },
  {
    id: 4,
    brand: "Balenciaga x Gucci",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=400&fit=crop",
    buttonText: "Ver Colección"
  },
  {
    id: 5,
    brand: "Versace x H&M",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop",
    buttonText: "Ver Colección"
  }
]

// Mock data para las marcas/colecciones - AMPLIADO PARA SCROLL
const brandCollections = [
  {
    id: 1,
    brand: "Zara",
    image: "https://images.unsplash.com/photo-1506629905057-46ac5b127cdb?w=400&h=500&fit=crop",
    icon: "Z",
    featured: "Retro Wave"
  },
  {
    id: 2,
    brand: "Rock&Stories",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
    featured: "WINTER",
    type: "season"
  },
  {
    id: 3,
    brand: "Devre",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    featured: "15%",
    type: "discount"
  },
  {
    id: 4,
    brand: "Tokoshop",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop",
    featured: "colección",
    type: "collection"
  },
  {
    id: 5,
    brand: "Leberin",
    image: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=400&h=500&fit=crop",
    featured: "¡NUEVA TEMPORADA!",
    type: "season"
  },
  {
    id: 6,
    brand: "H&M",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
    featured: "colección",
    type: "collection"
  },
  {
    id: 7,
    brand: "Mango",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop",
    icon: "M",
    featured: "New Arrivals"
  },
  {
    id: 8,
    brand: "Bershka",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=500&fit=crop",
    featured: "30%",
    type: "discount"
  },
  {
    id: 9,
    brand: "Pull&Bear",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop",
    icon: "P",
    featured: "Urban Style"
  },
  {
    id: 10,
    brand: "Stradivarius",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
    featured: "SPRING",
    type: "season"
  },
  {
    id: 11,
    brand: "Massimo Dutti",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop",
    featured: "Premium",
    type: "collection"
  },
  {
    id: 12,
    brand: "COS",
    image: "https://images.unsplash.com/photo-1506629905057-46ac5b127cdb?w=400&h=500&fit=crop",
    icon: "C",
    featured: "Minimalism"
  }
]

// Mock data para las categorías inferiores
const categories = [
    {
      id: 1,
    name: "Lo último que viste",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop"
    },
    {
      id: 2,
    name: "Novedades",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    name: "Tendencias",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    name: "Hot Sale",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=250&fit=crop"
  },
  {
    id: 5,
    name: "Pantalones",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
  }
]

// Mock data para los looks de influencers
const influencerLooks = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506629905057-46ac5b127cdb?w=300&h=400&fit=crop",
    influencer: "@fashionista",
    price: "$89"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop",
    influencer: "@stylequeen",
    price: "$145"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    influencer: "@urbanstyle",
    price: "$67"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop",
    influencer: "@trendsetter",
    price: "$98"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=300&h=400&fit=crop",
    influencer: "@lookbook",
    price: "$122"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=300&h=400&fit=crop",
    influencer: "@outfitofday",
    price: "$156"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=300&h=400&fit=crop",
    influencer: "@chic_style",
    price: "$134"
  }
]

// Mock data para tiendas destacadas
const featuredStores = [
  {
    id: 1,
    name: "Nueva Colección",
    subtitle: "VER AHORA",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    featured: true
  },
  {
    id: 2,
    name: "Zara",
    subtitle: "Primavera 2024",
    image: "https://images.unsplash.com/photo-1506629905057-46ac5b127cdb?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "H&M",
    subtitle: "Conscious Collection",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Mango",
    subtitle: "New Arrivals",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  }
]

const Tienda = () => {
  const { activeTab } = useOutletContext()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  
  // Estados para Stories
  const [storiesOpen, setStoriesOpen] = useState(false)
  const [currentStories, setCurrentStories] = useState([])
  const [initialStoryIndex, setInitialStoryIndex] = useState(0)
  
  // Refs y estado para drag scroll
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Auto-play del hero banner
  useEffect(() => {
    if (!emblaApi) return

    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)

    emblaApi.on('select', () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    })

    return () => clearInterval(autoplay)
  }, [emblaApi])

  const scrollTo = (index) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }

  // Funciones para drag scroll MEJORADAS
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
    scrollRef.current.style.cursor = 'grabbing'
    scrollRef.current.style.userSelect = 'none'
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab'
      scrollRef.current.style.userSelect = 'auto'
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab'
      scrollRef.current.style.userSelect = 'auto'
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Velocidad del scroll ajustada
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  // Touch events para móvil MEJORADOS
  const handleTouchStart = (e) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Funciones para abrir historias por sección
  const openHeroStories = (index) => {
    const stories = heroCollections.map(collection => ({
      id: collection.id,
      title: collection.brand,
      subtitle: "Colección Exclusiva",
      image: collection.image,
      action: "Explorar Colección"
    }))
    setCurrentStories(stories)
    setInitialStoryIndex(index)
    setStoriesOpen(true)
  }

  const openBrandStories = (index) => {
    const stories = brandCollections.map(brand => ({
      id: brand.id,
      title: brand.brand,
      subtitle: brand.featured,
      image: brand.image,
      action: "Ver Tienda"
    }))
    setCurrentStories(stories)
    setInitialStoryIndex(index)
    setStoriesOpen(true)
  }

  const openCategoryStories = (index) => {
    const stories = categories.map(category => ({
      id: category.id,
      title: category.name,
      subtitle: "Descubre nuestra selección",
      image: category.image,
      action: "Ver Productos"
    }))
    setCurrentStories(stories)
    setInitialStoryIndex(index)
    setStoriesOpen(true)
  }

  const openInfluencerStories = (index) => {
    const stories = influencerLooks.map(look => ({
      id: look.id,
      title: "Look Influencer",
      subtitle: look.influencer,
      price: look.price,
      image: look.image,
      action: "Comprar Look"
    }))
    setCurrentStories(stories)
    setInitialStoryIndex(index)
    setStoriesOpen(true)
  }

  const openStoreStories = (index) => {
    const stories = featuredStores.map(store => ({
      id: store.id,
      title: store.name,
      subtitle: store.subtitle,
      image: store.image,
      action: store.featured ? "Ver Ahora" : "Explorar Tienda"
    }))
    setCurrentStories(stories)
    setInitialStoryIndex(index)
    setStoriesOpen(true)
  }

  const closeStories = () => {
    setStoriesOpen(false)
    setCurrentStories([])
    setInitialStoryIndex(0)
  }

  // Tienda siempre muestra el contenido completo independientemente del tab
  return (
    <div className="w-full h-full bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden">
        <div className="w-full px-1 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 space-y-4 sm:space-y-6 md:space-y-8 pb-20">
          
          {/* Hero Banner con Carrusel - SIN TOCAR */}
          <section className="w-full">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl relative" ref={emblaRef}>
              <div className="flex">
                {heroCollections.map((collection, index) => (
                  <div key={collection.id} className="flex-[0_0_100%] min-w-0">
                    <div 
                      className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 
                                 bg-cover bg-center rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer"
                      style={{ backgroundImage: `url(${collection.image})` }}
                      onClick={() => openHeroStories(index)}
                    >
                      {/* Overlay oscuro */}
                      <div className="absolute inset-0 bg-black/40" />
                      
                      {/* Contenido del banner - RESPONSIVE */}
                      <div className="relative z-10 h-full flex flex-col justify-center 
                                      px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                        <motion.h2 
                          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
                                     font-bold text-white mb-3 sm:mb-4 md:mb-5 lg:mb-6"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {collection.brand}
                        </motion.h2>
                        
                        <motion.button 
                          className="bg-white text-black 
                                     px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 
                                     rounded-full font-medium 
                                     text-sm sm:text-base md:text-base lg:text-base
                                     w-fit hover:bg-gray-100 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {collection.buttonText}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Puntos de navegación - RESPONSIVE */}
            <div className="flex justify-center mt-3 sm:mt-4 md:mt-5 lg:mt-6 space-x-2 sm:space-x-3">
              {heroCollections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </section>

          {/* Sección de Marcas/Colecciones - MÓVIL OPTIMIZADO */}
          <section className="w-full">
            <div className="w-full">
              <div 
                ref={scrollRef}
                className="w-full overflow-x-auto scrollbar-hide cursor-grab select-none"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ scrollBehavior: 'smooth' }}
              >
                <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 pb-4 min-w-max px-1">
                  {brandCollections.map((brand, index) => (
                    <motion.div
                      key={brand.id}
                      className="flex-shrink-0 
                                 w-32 h-44 sm:w-40 sm:h-52 md:w-48 md:h-64 lg:w-52 lg:h-72 xl:w-56 xl:h-80
                                 rounded-lg sm:rounded-xl overflow-hidden relative cursor-pointer group
                                 shadow-lg hover:shadow-2xl transition-all duration-300"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => openBrandStories(index)}
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${brand.image})` }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
                      
                      {/* Contenido de la card - MÓVIL OPTIMIZADO */}
                      <div className="absolute inset-0 p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col justify-between">
                        {/* Contenido superior */}
                        <div>
                          {brand.icon && (
                            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 
                                            bg-white rounded-full flex items-center justify-center mb-1 sm:mb-2">
                              <span className="font-bold text-black text-xs sm:text-sm md:text-base lg:text-lg">
                                {brand.icon}
                              </span>
                            </div>
                          )}
                          
                          {brand.featured && (
                            <div className="text-white">
                              {brand.type === 'discount' && (
                                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                                  {brand.featured}
                                </span>
                              )}
                              {brand.type === 'season' && (
                                <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
                                  {brand.featured}
                                </span>
                              )}
                              {brand.type === 'collection' && (
                                <span className="text-xs sm:text-sm md:text-base lg:text-lg italic">
                                  {brand.featured}
                                </span>
                              )}
                              {!brand.type && (
                                <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium">
                                  {brand.featured}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Logo de la marca en la parte inferior */}
                        <div className="flex items-center">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 
                                          bg-white rounded-full flex items-center justify-center mr-1 sm:mr-2">
                            <span className="text-xs sm:text-xs md:text-sm lg:text-base font-bold text-black">
                              {brand.brand.charAt(0)}
                            </span>
                          </div>
                          <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium truncate">
                            {brand.brand}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Categorías - RESPONSIVE MEJORADO */}
          <section className="w-screen -ml-1 sm:w-full sm:ml-0">
            <div className="w-full max-w-full px-3 sm:px-0">
              {/* Grid responsivo optimizado para móvil */}
              <div className="grid grid-cols-1 gap-3 
                              xs:grid-cols-1 xs:gap-3
                              sm:grid-cols-2 sm:gap-4 
                              md:grid-cols-3 md:gap-5 
                              lg:grid-cols-4 lg:gap-6 
                              xl:grid-cols-5 xl:gap-6 
                              w-full">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="w-full 
                               h-32 xs:h-36 
                               sm:h-28 
                               md:h-32 
                               lg:h-36 
                               xl:h-40
                               aspect-[16/9] sm:aspect-auto
                               rounded-xl sm:rounded-2xl 
                               overflow-hidden relative cursor-pointer group
                               shadow-lg hover:shadow-2xl 
                               transition-all duration-300 ease-out
                               transform hover:scale-[1.02] hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => openCategoryStories(index)}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    
                    {/* Overlay con gradiente mejorado */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 
                                    group-hover:from-black/80 group-hover:via-black/40 group-hover:to-black/30 
                                    transition-all duration-300" />
                    
                    {/* Texto de la categoría con mejor posicionamiento */}
                    <div className="absolute inset-0 flex items-center justify-center px-4 py-3">
                      <div className="text-center">
                        <h3 className="text-white font-bold 
                                       text-lg leading-tight
                                       xs:text-xl 
                                       sm:text-base sm:leading-tight
                                       md:text-lg md:leading-tight
                                       lg:text-xl lg:leading-tight
                                       xl:text-2xl xl:leading-tight
                                       drop-shadow-lg
                                       group-hover:scale-105 transition-transform duration-300">
                          {category.name}
                        </h3>
                        {/* Línea decorativa */}
                        <div className="w-8 h-0.5 bg-white/60 mx-auto mt-2 
                                        group-hover:w-12 group-hover:bg-white/80 
                                        transition-all duration-300" />
                      </div>
                    </div>

                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                    bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                    transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                                    transition-all duration-700 ease-out" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Sección de Looks de Influencers */}
          <section className="w-screen -ml-1 sm:w-full sm:ml-0">
            <div className="w-full max-w-full px-3 sm:px-0">
              {/* Título de la sección */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-white font-bold text-left
                               text-sm leading-tight tracking-wide
                               sm:text-base sm:leading-tight
                               md:text-lg md:leading-tight
                               lg:text-xl lg:leading-tight
                               xl:text-2xl xl:leading-tight
                               uppercase">
                  COMPRA LOS LOOKS DE LOS INFLUENCERS QUE MÁS TE GUSTAN
                </h2>
              </div>

              {/* Scroll horizontal de looks */}
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 pb-4 min-w-max">
                  {influencerLooks.map((look, index) => (
                                         <motion.div
                       key={look.id}
                       className="flex-shrink-0 
                                  w-28 h-40 sm:w-32 sm:h-44 md:w-36 md:h-48 lg:w-40 lg:h-52 xl:w-44 xl:h-56
                                  rounded-lg sm:rounded-xl overflow-hidden relative cursor-pointer group
                                  shadow-lg hover:shadow-2xl transition-all duration-300"
                       initial={{ opacity: 0, x: 50 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: index * 0.05 }}
                       whileHover={{ scale: 1.03 }}
                       onClick={() => openInfluencerStories(index)}
                     >
                      <div 
                        className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${look.image})` }}
                      />
                      
                      {/* Overlay con gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                                      group-hover:from-black/90 transition-all duration-300" />
                      
                      {/* Información del look */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                        <div className="text-center">
                          <p className="text-white text-xs sm:text-sm font-medium mb-1">
                            {look.influencer}
                          </p>
                          <p className="text-white font-bold text-sm sm:text-base">
                            {look.price}
                          </p>
                        </div>
                      </div>

                      {/* Efecto de brillo en hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                      bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                      transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                                      transition-all duration-700 ease-out" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Sección Explora Tiendas */}
          <section className="w-screen -ml-1 sm:w-full sm:ml-0">
            <div className="w-full max-w-full px-3 sm:px-0">
              {/* Header de la sección */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-white font-bold 
                               text-lg sm:text-xl md:text-2xl lg:text-3xl">
                  Explora Tiendas
                </h2>
                <button className="text-gray-400 hover:text-white text-sm sm:text-base 
                                   transition-colors duration-200 flex items-center gap-1">
                  Ver Más
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Scroll horizontal de tiendas - Una sola fila */}
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 pb-4 min-w-max">
                  
                  {/* Card principal - Nueva Colección */}
                  <motion.div
                    className="flex-shrink-0
                               w-64 h-48 sm:w-72 sm:h-52 md:w-80 md:h-56 lg:w-96 lg:h-64 xl:w-[420px] xl:h-72
                               rounded-xl sm:rounded-2xl overflow-hidden relative cursor-pointer group
                               shadow-lg hover:shadow-2xl transition-all duration-300"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openStoreStories(0)}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${featuredStores[0].image})` }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 
                                    group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/70
                                    transition-all duration-300" />
                    
                    {/* Contenido centrado */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-white font-bold 
                                       text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                                       mb-3 sm:mb-4 drop-shadow-lg
                                       group-hover:scale-105 transition-transform duration-300">
                          {featuredStores[0].name}
                        </h3>
                        <button className="bg-white text-black px-6 py-3 sm:px-8 sm:py-4 
                                           rounded-full font-medium text-sm sm:text-base md:text-lg
                                           hover:bg-gray-100 transition-colors duration-200
                                           group-hover:scale-105 transform transition-transform">
                          {featuredStores[0].subtitle}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Cards secundarias de tiendas */}
                  {featuredStores.slice(1).map((store, index) => (
                    <motion.div
                      key={store.id}
                      className="flex-shrink-0
                                 w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72
                                 rounded-xl sm:rounded-2xl overflow-hidden relative cursor-pointer group
                                 shadow-lg hover:shadow-2xl transition-all duration-300"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + 1) * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => openStoreStories(index + 1)}
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${store.image})` }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 
                                      group-hover:from-black/80 group-hover:via-black/40 group-hover:to-black/30
                                      transition-all duration-300" />
                      
                      {/* Contenido */}
                      <div className="absolute inset-0 flex items-end p-4 sm:p-5 md:p-6">
                        <div>
                          <h4 className="text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl
                                         mb-1 sm:mb-2 drop-shadow-lg">
                            {store.name}
                          </h4>
                          <p className="text-gray-200 text-sm sm:text-base md:text-lg">
                            {store.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                                      bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                      transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                                      transition-all duration-700 ease-out" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Componente Stories */}
      <Stories 
        isOpen={storiesOpen}
        onClose={closeStories}
        stories={currentStories}
        initialIndex={initialStoryIndex}
      />
    </div>
  )
}

export default Tienda 