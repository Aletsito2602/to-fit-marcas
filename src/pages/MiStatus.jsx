import ProgressBar from '../components/ui/ProgressBar'
import AchievementCard from '../components/ui/AchievementCard'
import FAQSection from '../components/ui/FAQSection'
import { userStatusData, achievements } from '../data/statusData'

const MiStatus = () => {
  const handleAchievementClick = (achievement) => {
    console.log('Achievement clicked:', achievement.title)
  }

  const handleViewBenefits = () => {
    console.log('Ver beneficios clicked')
  }

  return (
    <div className="w-full bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6">
        
        {/* Header de usuario */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            {/* Avatar y info básica */}
            <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
              <img
                src={userStatusData.avatar}
                alt={userStatusData.name}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-1">
                  <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold truncate">
                    {userStatusData.name}
                  </h2>
                  <div className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded flex-shrink-0">
                    {userStatusData.statusBadge}
                  </div>
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">
                  MI STATUS
                </div>
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mb-4 sm:mb-6">
            <ProgressBar 
              steps={userStatusData.maxLevel} 
              currentStep={userStatusData.completedSteps}
              className="mb-3 sm:mb-4"
            />
          </div>

          {/* Información adicional */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-end sm:justify-between sm:space-y-0">
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-300">
                <span>Código: <span className="text-white font-medium">{userStatusData.code}</span></span>
                <span>Hasta: <span className="text-white font-medium">{userStatusData.validUntil}</span></span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {userStatusData.currentAmount}
              </div>
            </div>
            
            <button 
              onClick={handleViewBenefits}
              className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium transition-colors duration-200 self-start sm:self-end"
            >
              Ver beneficios
            </button>
          </div>
        </div>

        {/* Sección "Mis Premios" */}
        <div>
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4 px-1">Mis Premios</h3>
          
          {/* Grid responsivo de logros */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                icon={achievement.icon}
                title={achievement.title}
                badge={achievement.badge}
                isUnlocked={achievement.isUnlocked}
                onClick={() => handleAchievementClick(achievement)}
                className={`
                  min-h-[80px] sm:min-h-[90px] md:min-h-[100px]
                  ${index >= 6 ? 'col-span-1' : ''} 
                `}
              />
            ))}
          </div>
        </div>

        {/* Sección FAQ */}
        <FAQSection className="mt-6" />
        
        {/* Espacio adicional para scroll */}
        <div className="h-4 sm:h-8" />
      </div>
    </div>
  )
}

export default MiStatus 