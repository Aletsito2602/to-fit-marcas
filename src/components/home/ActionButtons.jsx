import { motion } from 'framer-motion';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Eye, Share2 } from 'lucide-react';

const ActionButtons = ({ 
  post, 
  onLike, 
  onComment, 
  onSave, 
  onMore, 
  onView,
  disabled = false,
  className = ""
}) => {
  const buttons = [
    {
      id: 'like',
      icon: Heart,
      action: onLike,
      color: 'text-red-500',
      hoverColor: 'hover:bg-red-50',
      count: post?.likes,
      filled: post?.isLiked,
      ariaLabel: 'Me gusta'
    },
    {
      id: 'comment',
      icon: MessageCircle,
      action: onComment,
      color: 'text-blue-500',
      hoverColor: 'hover:bg-blue-50',
      count: post?.comments,
      ariaLabel: 'Comentar'
    },
    {
      id: 'save',
      icon: Bookmark,
      action: onSave,
      color: 'text-yellow-500',
      hoverColor: 'hover:bg-yellow-50',
      count: post?.saves,
      filled: post?.isSaved,
      ariaLabel: 'Guardar'
    },
    {
      id: 'view',
      icon: Eye,
      action: onView,
      color: 'text-purple-500',
      hoverColor: 'hover:bg-purple-50',
      ariaLabel: 'Ver detalles'
    },
    {
      id: 'more',
      icon: MoreHorizontal,
      action: onMore,
      color: 'text-gray-600',
      hoverColor: 'hover:bg-gray-50',
      ariaLabel: 'Más opciones'
    }
  ];

  const formatCount = (count) => {
    if (!count) return '';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className={`
      flex flex-col space-y-3 sm:space-y-4 z-10
      ${className}
    `}>
      {buttons.map((button, index) => (
        <motion.button
          key={button.id}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled && button.action) {
              button.action();
            }
          }}
          disabled={disabled}
          aria-label={button.ariaLabel}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: index * 0.1,
            duration: 0.3,
            ease: "easeOut"
          }}
          whileHover={{ 
            scale: disabled ? 1 : 1.1,
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: disabled ? 1 : 0.95,
            transition: { duration: 0.1 }
          }}
          className={`
            group relative
            w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
            bg-white/90 backdrop-blur-sm
            rounded-full shadow-lg
            flex items-center justify-center
            transition-all duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:shadow-xl'}
            ${button.hoverColor}
            border border-white/20
          `}
          style={{
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          {/* Icono principal */}
          <button.icon 
            className={`
              w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8
              transition-all duration-200
              ${button.color}
              ${button.filled ? 'fill-current' : ''}
              ${!disabled ? 'group-hover:scale-110' : ''}
              ${disabled ? 'opacity-60' : ''}
            `}
            style={{
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
            }}
          />

          {/* Contador de interacciones */}
          {button.count && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-1 -right-1 
                         bg-gray-900 text-white text-xs 
                         px-1.5 py-0.5 rounded-full
                         min-w-[20px] h-5
                         flex items-center justify-center
                         font-medium"
              style={{
                fontSize: '10px',
                lineHeight: '12px'
              }}
            >
              {formatCount(button.count)}
            </motion.div>
          )}

          {/* Efecto de ripple en hover */}
          {!disabled && (
            <motion.div
              className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-10"
              style={{ color: button.color.replace('text-', '') }}
              whileHover={{
                scale: [1, 1.2, 1],
                opacity: [0, 0.2, 0]
              }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Indicador de acción activa (para like/save) */}
          {button.filled && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: button.color.includes('red') ? '#ef4444' : '#eab308' }}
            />
          )}
        </motion.button>
      ))}

      {/* Botón de share adicional en hover */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        whileHover={{ opacity: 1, height: 'auto' }}
        className="overflow-hidden"
      >
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled && navigator.share) {
              navigator.share({
                title: post?.caption || 'Look increíble en ToFit',
                url: window.location.href
              });
            }
          }}
          disabled={disabled || !navigator.share}
          aria-label="Compartir"
          whileHover={{ scale: disabled ? 1 : 1.1 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          className={`
            w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
            bg-white/80 backdrop-blur-sm
            rounded-full shadow-md
            flex items-center justify-center
            transition-all duration-200
            ${disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:shadow-lg'}
            border border-white/20
            mt-2
          `}
        >
          <Share2 
            className={`
              w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7
              text-green-500
              ${disabled ? 'opacity-60' : ''}
            `}
          />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ActionButtons; 