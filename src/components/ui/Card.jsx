import { forwardRef } from 'react'

const Card = forwardRef(({
  children,
  variant = 'default',
  hover = false,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'card-base transition-all duration-200'
  
  const variants = {
    default: 'p-6',
    compact: 'p-4',
    spacious: 'p-8',
    bordered: 'p-6 border-2',
    elevated: 'p-6 shadow-xl'
  }
  
  const hoverClasses = hover 
    ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer' 
    : ''
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`

  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

// Subcomponentes para estructura
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-text-primary ${className}`} {...props}>
    {children}
  </h3>
)

const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-text-secondary ${className}`} {...props}>
    {children}
  </p>
)

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
)

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
)

// Exportar todo
Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export default Card 