const AchievementCard = ({ 
  icon: Icon, 
  title, 
  badge, 
  isUnlocked = true,
  onClick,
  className = '' 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative bg-gray-800 rounded-lg p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center
        min-h-[80px] sm:min-h-[90px] md:min-h-[100px] aspect-square cursor-pointer
        hover:bg-gray-700 hover:scale-105 active:scale-95
        transition-all duration-200 ease-in-out
        ${!isUnlocked ? 'opacity-60' : ''}
        ${className}
      `}
    >
      {/* Badge numérico */}
      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-gray-900 text-white text-xs font-medium px-1 sm:px-1.5 py-0.5 rounded-full min-w-[16px] sm:min-w-[20px] text-center">
        {badge}
      </div>

      {/* Ícono */}
      <div className="mb-1 sm:mb-2 flex-shrink-0">
        {Icon && (
          <Icon 
            className={`
              w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 
              ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}
              transition-colors duration-200
            `} 
          />
        )}
      </div>

      {/* Título */}
      <p 
        className={`
          text-center text-xs leading-tight font-medium px-1
          ${isUnlocked ? 'text-white' : 'text-gray-400'}
          transition-colors duration-200
          line-clamp-2
        `}
      >
        {title}
      </p>

      {/* Indicador de desbloqueado */}
      {isUnlocked && (
        <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
      )}
    </div>
  )
}

export default AchievementCard 