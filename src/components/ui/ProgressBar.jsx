const ProgressBar = ({ 
  steps = 4, 
  currentStep = 3, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {Array.from({ length: steps }, (_, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber <= currentStep
        const isLast = index === steps - 1

        return (
          <div key={stepNumber} className="flex items-center">
            {/* Círculo del paso */}
            <div
              className={`
                w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center 
                text-white text-xs sm:text-sm font-medium
                transition-all duration-200
                ${isCompleted 
                  ? 'bg-green-500' 
                  : 'bg-gray-600'
                }
              `}
            >
              {stepNumber}
            </div>

            {/* Línea conectora */}
            {!isLast && (
              <div
                className={`
                  w-6 sm:w-8 md:w-12 h-0.5 mx-0.5 sm:mx-1
                  transition-all duration-200
                  ${stepNumber < currentStep 
                    ? 'bg-green-500' 
                    : 'bg-gray-600'
                  }
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ProgressBar 