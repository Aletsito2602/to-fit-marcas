import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'input-base w-full'
  const errorClasses = error 
    ? 'border-accent-error focus:ring-accent-error' 
    : 'border-border-primary focus:ring-accent-primary'
  
  const classes = `${baseClasses} ${errorClasses} ${className}`

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {props.required && <span className="text-accent-error ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`${classes} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-accent-error">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-text-muted">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input 