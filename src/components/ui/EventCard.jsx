import { motion } from 'framer-motion'
import { Calendar, Users, Eye } from 'lucide-react'

const EventCard = ({ event, onClick, isOwner = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const month = months[date.getMonth()]
    const day = date.getDate()
    return `${month} ${day}`
  }

  const formatPublications = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer"
      onClick={() => onClick?.(event)}
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-300">
        {/* Imagen del evento */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay con fecha */}
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1">
            <div className="flex items-center gap-1 text-white">
              <Calendar className="w-3 h-3" />
              <span className="text-xs font-medium">{formatDate(event.date)}</span>
            </div>
          </div>

          {/* Badge de propietario */}
          {isOwner && (
            <div className="absolute top-3 right-3 bg-accent-primary/90 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-xs font-medium text-white">Mi evento</span>
            </div>
          )}

          {/* Overlay hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="text-white text-center"
            >
              <Eye className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Ver evento</span>
            </motion.div>
          </div>
        </div>

        {/* Información del evento */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
            {event.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-400">
              <Users className="w-3 h-3" />
              <span className="text-xs">
                {formatPublications(event.publicationsCount)} Publicaciones
              </span>
            </div>
            
            {event.type && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                {event.type}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventCard 