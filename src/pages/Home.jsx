import { useState } from 'react';
import TinderCardsContainer from '../components/home/TinderCardsContainer';

// Componente de pestañas integrado en Home
const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'siguiendo', label: 'Siguiendo' },
    { id: 'inspiracion', label: 'Inspiración' }
  ];

  return (
    <div className="flex items-center justify-center py-4 px-4 bg-black border-b border-gray-800">
      <div className="flex items-center justify-center space-x-8 w-full max-w-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`font-medium transition-all duration-300 relative px-4 py-2 text-base text-center ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="block text-center">{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  // Estado local para las pestañas
  const [activeTab, setActiveTab] = useState('siguiendo');

  console.log('🏠 Home component render:', { activeTab });

  return (
    <div className="w-full h-full bg-black flex flex-col">
      {/* Pestañas integradas */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Contenedor de Tinder Cards */}
      <div className="flex-1 overflow-hidden h-full">
        <TinderCardsContainer activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Home; 