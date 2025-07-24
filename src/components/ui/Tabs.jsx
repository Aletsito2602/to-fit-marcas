import { useState } from 'react'

const Tabs = ({ tabs, activeTab, onTabChange, className = '' }) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200
            ${activeTab === tab.id
              ? 'bg-white text-black hover:bg-gray-100'
              : 'bg-transparent text-white border border-white/30 hover:border-white/50 hover:bg-white/5'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs