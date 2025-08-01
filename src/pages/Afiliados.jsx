import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Menu, Search, Users, TrendingUp, DollarSign, Award, ExternalLink } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { updateUserProfile, getUserProfile } from '../services/userProfileService'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import toast from 'react-hot-toast'

const Afiliados = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)
  const [affiliateStats, setAffiliateStats] = useState({
    referrals: 0,
    earnings: 0,
    rank: 'Beginner'
  })

  // ✅ Cargar datos del usuario y estadísticas de afiliado
  useEffect(() => {
    const loadAffiliateData = async () => {
      if (!user) return
      
      const userId = user.id || user.uid || user.email
      setLoading(true)
      
      try {
        const result = await getUserProfile(userId)
        if (result.success) {
          setUserProfile(result.data)
          // Cargar estadísticas de afiliado si existen
          if (result.data.affiliateStats) {
            setAffiliateStats(result.data.affiliateStats)
          }
        }
      } catch (error) {
        console.error('Error loading affiliate data:', error)
        toast.error('Error al cargar datos de afiliado')
      } finally {
        setLoading(false)
      }
    }

    loadAffiliateData()
  }, [user])

  const handleJoinProgram = async () => {
    if (!user) return
    
    const userId = user.id || user.uid || user.email
    
    try {
      const updateData = {
        isAffiliate: true,
        affiliateStats: {
          referrals: 0,
          earnings: 0,
          rank: 'Beginner',
          joinedAt: new Date().toISOString()
        }
      }
      
      const result = await updateUserProfile(userId, updateData)
      
      if (result.success) {
        toast.success('¡Te has unido al programa de afiliados!')
        setUserProfile(prev => ({ ...prev, ...updateData }))
        setAffiliateStats(updateData.affiliateStats)
      } else {
        toast.error('Error al unirse al programa')
      }
    } catch (error) {
      console.error('Error joining affiliate program:', error)
      toast.error('Error inesperado')
    }
  }

  const benefits = [
    {
      icon: DollarSign,
      title: "Comisiones Atractivas",
      description: "Gana hasta 15% por cada venta referida",
      color: "text-green-400"
    },
    {
      icon: Users,
      title: "Red de Influencers",
      description: "Conéctate con otros creadores de contenido",
      color: "text-blue-400"
    },
    {
      icon: TrendingUp,
      title: "Crecimiento Conjunto",
      description: "Herramientas para hacer crecer tu audiencia",
      color: "text-purple-400"
    },
    {
      icon: Award,
      title: "Recompensas Exclusivas",
      description: "Acceso a productos y eventos especiales",
      color: "text-yellow-400"
    }
  ]

  const ranks = [
    { name: 'Beginner', minReferrals: 0, commission: '5%', color: 'bg-gray-600' },
    { name: 'Rising', minReferrals: 10, commission: '8%', color: 'bg-blue-600' },
    { name: 'Influencer', minReferrals: 50, commission: '12%', color: 'bg-purple-600' },
    { name: 'Ambassador', minReferrals: 100, commission: '15%', color: 'bg-yellow-600' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  const isAffiliate = userProfile?.isAffiliate

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header del Programa */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Programa de Afiliados ToFit</h1>
          <p className="text-xl text-gray-300 mb-8">
            Únete a nuestra comunidad de creadores y monetiza tu pasión por la moda
          </p>
          
          {!isAffiliate ? (
            <Button 
              onClick={handleJoinProgram}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Unirse al Programa
            </Button>
          ) : (
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-green-400 mb-2">¡Eres Afiliado ToFit!</h3>
              <p className="text-gray-300">Bienvenido al programa. Empieza a compartir y ganar.</p>
            </div>
          )}
        </div>

        {isAffiliate && (
          /* Dashboard del Afiliado */
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Tu Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">{affiliateStats.referrals}</div>
                  <div className="text-gray-400">Referidos</div>
                </div>
              </Card>
              
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white">${affiliateStats.earnings}</div>
                  <div className="text-gray-400">Ganancias</div>
                </div>
              </Card>
              
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6 text-center">
                  <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{affiliateStats.rank}</div>
                  <div className="text-gray-400">Rango Actual</div>
                </div>
              </Card>
            </div>

            {/* Enlace de Referido */}
            <Card className="bg-gray-900 border-gray-700 mb-8">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Tu Enlace de Referido</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-300">
                    https://tofit.app/ref/{user?.id || 'USER_ID'}
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://tofit.app/ref/${user?.id || 'USER_ID'}`)
                      toast.success('Enlace copiado!')
                    }}
                  >
                    Copiar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Beneficios del Programa */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">¿Por qué ser Afiliado ToFit?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gray-800 ${benefit.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                        <p className="text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Sistema de Rangos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Sistema de Rangos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ranks.map((rank, index) => (
              <Card key={index} className={`border-2 ${
                affiliateStats.rank === rank.name ? 'border-yellow-500 bg-yellow-500/10' : 'bg-gray-900 border-gray-700'
              }`}>
                <div className="p-6 text-center">
                  <div className={`w-12 h-12 ${rank.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{rank.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{rank.minReferrals}+ referidos</p>
                  <p className="text-lg font-semibold text-green-400">{rank.commission}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ y Más Información */}
        <div className="text-center">
          <button
            onClick={() => navigate('/affiliates/faqs')}
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Ver Preguntas Frecuentes</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Afiliados