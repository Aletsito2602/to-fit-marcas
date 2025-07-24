import { useState } from 'react'

const UserAvatar = ({ 
  user, 
  size = 'sm', 
  className = '', 
  fallbackSeed = null,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false)

  // Mapear tamaños
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6', 
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  }

  const sizePixels = {
    xs: '16',
    sm: '32',
    md: '40', 
    lg: '48',
    xl: '64'
  }

  // Obtener avatar del usuario con múltiples fallbacks
  const getAvatarSrc = () => {
    if (imageError) {
      // Si hubo error, usar avatar generado por iniciales
      const seed = fallbackSeed || user?.email || user?.name || user?.userDisplayName || user?.displayName || 'User'
      return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=6366f1&textColor=ffffff&size=${sizePixels[size]}`
    }

    // Prioridad: photoURL > avatar > userAvatar > imagen generada
    if (user?.photoURL && !user.photoURL.includes('dicebear')) return user.photoURL
    if (user?.avatar && !user.avatar.includes('dicebear')) return user.avatar
    if (user?.userAvatar && !user.userAvatar.includes('dicebear')) return user.userAvatar
    
    // Avatar generado por iniciales como fallback
    const seed = user?.email || user?.name || user?.userDisplayName || user?.displayName || 'User'
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=6366f1&textColor=ffffff&size=${sizePixels[size]}`
  }

  const handleImageError = () => {
    setImageError(true)
  }

  // Resetear error si el usuario cambia
  const userKey = user?.id || user?.uid || user?.email || user?.name
  const [lastUserKey, setLastUserKey] = useState(userKey)
  
  if (userKey !== lastUserKey) {
    setImageError(false)
    setLastUserKey(userKey)
  }

  return (
    <img
      src={getAvatarSrc()}
      alt={user?.name || user?.userDisplayName || user?.displayName || 'Usuario'}
      className={`${sizeClasses[size]} rounded-full object-cover flex-shrink-0 ${className}`}
      onError={handleImageError}
      {...props}
    />
  )
}

export default UserAvatar 