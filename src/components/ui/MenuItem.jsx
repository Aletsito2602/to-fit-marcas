import { ChevronRight } from 'lucide-react'
import ToggleSwitch from './ToggleSwitch'

// Componente principal MenuItem
const MenuItem = ({ 
  text, 
  onClick, 
  showChevron = true, 
  className = '',
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center justify-between px-8 py-6
        bg-gray-800 rounded-lg mb-4
        hover:bg-gray-700 active:bg-gray-600
        transition-all duration-200 ease-in-out
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        group
        ${className}
      `}
    >
      <span className="text-gray-200 text-base font-normal leading-relaxed flex-1 text-left">
        {text}
      </span>
      
      {showChevron && (
        <ChevronRight 
          className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors duration-200 flex-shrink-0 ml-6" 
        />
      )}
    </button>
  )
}

// Componente MenuItem con Toggle
const MenuItemWithToggle = ({ 
  text, 
  isActive = false, 
  onToggle, 
  disabled = false,
  className = '' 
}) => {
  return (
    <div className={`
      w-full flex items-center justify-between px-8 py-6
      bg-gray-800 rounded-lg mb-4
      ${className}
    `}>
      <span className="text-gray-200 text-base font-normal leading-relaxed flex-1 text-left pr-8">
        {text}
      </span>
      
      <ToggleSwitch
        isActive={isActive}
        onToggle={onToggle}
        disabled={disabled}
        size="md"
      />
    </div>
  )
}

// Componente MenuSection para agrupar items
const MenuSection = ({ 
  title, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`mb-10 ${className}`}>
      {title && (
        <h3 className="text-white text-lg font-bold mb-4 tracking-tight">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  )
}

// Exportar todos los componentes
export default MenuItem
export { MenuItemWithToggle, MenuSection } 