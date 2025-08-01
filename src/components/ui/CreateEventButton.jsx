import { motion } from 'framer-motion'
import { Plus, Calendar } from 'lucide-react'

const CreateEventButton = ({ onClick, className = '' }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary/90 hover:to-accent-secondary/90 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl ${className}`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Plus className="w-5 h-5" />
          <Calendar className="w-4 h-4 absolute -top-1 -right-1 opacity-80" />
        </div>
        <span className="text-lg">Crear Evento</span>
      </div>
    </motion.button>
  )
}

export default CreateEventButton 