import { motion } from 'framer-motion'
import { Calendar, Users, Plus } from 'lucide-react'
import EventCard from './EventCard'

const EventSection = ({ 
  title, 
  events = [], 
  isOwner = false, 
  onEventClick, 
  onCreateEvent,
  emptyMessage = "No hay eventos",
  emptyDescription = "Crea tu primer evento para comenzar"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {/* Título de la sección */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent-primary" />
          {title}
        </h2>
        
        {isOwner && onCreateEvent && (
          <motion.button
            onClick={onCreateEvent}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            Crear
          </motion.button>
        )}
      </div>

      {/* Grid de eventos */}
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <EventCard
                event={event}
                onClick={onEventClick}
                isOwner={isOwner}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        // Estado vacío elegante
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
            <Calendar className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {emptyMessage}
          </h3>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">
            {emptyDescription}
          </p>
          {isOwner && onCreateEvent && (
            <motion.button
              onClick={onCreateEvent}
              className="px-6 py-3 bg-accent-primary text-white rounded-lg font-medium hover:bg-accent-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Crear mi primer evento
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default EventSection 