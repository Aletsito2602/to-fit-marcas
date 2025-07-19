import { useState } from 'react'

const HeaderTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'siguiendo', label: 'Siguiendo' },
    { id: 'inspiracion', label: 'Inspiración' }
  ]

  return (
    <div className="flex items-center justify-center 
                    py-3 sm:py-4 md:py-5 lg:py-6 
                    px-4 sm:px-6 md:px-8 
                    bg-black">
      <div className="flex items-center 
                      space-x-4 sm:space-x-6 md:space-x-8">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center">
            <button
              onClick={() => onTabChange(tab.id)}
              className={`font-medium transition-all duration-300 relative 
                          px-3 py-2 sm:px-4 sm:py-2 
                          text-sm sm:text-base md:text-lg
                          ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute -bottom-1 left-0 right-0 
                                h-0.5 sm:h-0.5 md:h-0.5 
                                bg-white rounded-full" />
              )}
            </button>
            {index < tabs.length - 1 && (
              <div className="w-px h-4 sm:h-5 bg-gray-700 
                              ml-4 sm:ml-6 md:ml-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeaderTabs 