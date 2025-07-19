import { useState } from 'react'

const SocialAuthButtonsMinimal = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState({ google: false, facebook: false })

  const handleSocialAuth = async (provider) => {
    setIsLoading(prev => ({ ...prev, [provider]: true }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Autenticación con ${provider}`)
    } catch (error) {
      console.error(`Error en autenticación con ${provider}:`, error)
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }))
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Separador con texto */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background-primary text-gray-400">
            o inicia sesión con
          </span>
        </div>
      </div>

      {/* Botones sociales circulares */}
      <div className="flex justify-center space-x-6">
        {/* Botón Google */}
        <button
          onClick={() => handleSocialAuth('google')}
          disabled={isLoading.google || isLoading.facebook}
          className="w-12 h-12 rounded-full border border-gray-600 bg-transparent hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading.google ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span className="text-gray-300 font-medium text-lg">G</span>
          )}
        </button>

        {/* Botón Facebook */}
        <button
          onClick={() => handleSocialAuth('facebook')}
          disabled={isLoading.google || isLoading.facebook}
          className="w-12 h-12 rounded-full border border-gray-600 bg-transparent hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading.facebook ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span className="text-gray-300 font-medium text-lg">F</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default SocialAuthButtonsMinimal 