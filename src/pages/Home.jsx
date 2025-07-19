import { useOutletContext } from 'react-router-dom'
import TinderCards from '../components/home/TinderCards'

const Home = () => {
  const { activeTab } = useOutletContext()

  return (
    <div className="h-full flex items-center justify-center overflow-hidden 
                    p-2 sm:p-3 md:p-4 lg:p-6">
      {activeTab === 'siguiendo' && <TinderCards />}
      {activeTab === 'inspiracion' && (
        <div className="flex items-center justify-center h-full w-full 
                        px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center text-white max-w-md sm:max-w-lg md:max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                           font-bold mb-3 sm:mb-4 md:mb-6">
              Inspiración
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl 
                          text-gray-400 leading-relaxed">
              Contenido de inspiración próximamente...
          </p>
        </div>
        </div>
      )}
    </div>
  )
}

export default Home 