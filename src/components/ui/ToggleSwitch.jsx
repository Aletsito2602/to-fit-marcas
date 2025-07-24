import { useState, useEffect } from 'react'

const ToggleSwitch = ({ 
  isActive = false, 
  onToggle, 
  disabled = false,
  size = 'md' 
}) => {
  const [isToggled, setIsToggled] = useState(isActive)

  // Sincronizar estado interno con prop externa
  useEffect(() => {
    setIsToggled(isActive)
  }, [isActive])

  const handleToggle = () => {
    if (disabled) return
    
    const newState = !isToggled
    setIsToggled(newState)
    onToggle?.(newState)
  }

  const sizeClasses = {
    sm: {
      container: 'w-9 h-5',
      knob: 'w-3 h-3',
      translate: 'translate-x-4'
    },
    md: {
      container: 'w-11 h-6',
      knob: 'w-4 h-4',
      translate: 'translate-x-5'
    },
    lg: {
      container: 'w-14 h-7',
      knob: 'w-5 h-5',
      translate: 'translate-x-7'
    }
  }

  const currentSize = sizeClasses[size]

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`
        relative inline-flex items-center rounded-full transition-all duration-200 ease-in-out
        ${currentSize.container}
        ${isToggled 
          ? 'bg-green-500 hover:bg-green-600 active:bg-green-700' 
          : 'bg-gray-600 hover:bg-gray-500 active:bg-gray-700'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-black
        active:scale-95 touch-manipulation
      `}
      role="switch"
      aria-checked={isToggled}
    >
      {/* Knob */}
      <span
        className={`
          inline-block bg-white rounded-full shadow-md transform transition-all duration-200 ease-in-out
          ${currentSize.knob}
          ${isToggled ? currentSize.translate : 'translate-x-1'}
        `}
      />
      
      {/* Screen reader text */}
      <span className="sr-only">
        {isToggled ? 'Desactivar' : 'Activar'} notificaciones
      </span>
    </button>
  )
}

export default ToggleSwitch 