import { forwardRef } from 'react'

const InputMinimal = forwardRef(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-text-primary mb-3 font-medium">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          className={`w-full bg-transparent border-0 border-b border-gray-600 text-text-primary placeholder-gray-500 py-2 px-0 focus:outline-none focus:border-gray-400 transition-colors duration-200 ${className}`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-accent-error">{error}</p>
      )}
    </div>
  )
})

InputMinimal.displayName = 'InputMinimal'

export default InputMinimal 