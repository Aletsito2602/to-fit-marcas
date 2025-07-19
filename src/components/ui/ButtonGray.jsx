import { forwardRef } from 'react'

const ButtonGray = forwardRef(({ 
  children, 
  loading = false,
  disabled = false,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed'
  
  const grayStyle = 'bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-500'
  
  const sizeClasses = 'px-6 py-3 text-base min-h-[48px]'
  
  const classes = `${baseClasses} ${grayStyle} ${sizeClasses} ${className}`
  
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Cargando...
        </>
      ) : children}
    </button>
  )
})

ButtonGray.displayName = 'ButtonGray'

export default ButtonGray 