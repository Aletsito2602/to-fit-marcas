import { useState } from 'react'
import { User, Mail, Phone, MapPin, Camera, Edit } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const MiCuenta = () => {
  const { user, updateUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })

  const handleSave = () => {
    updateUser(formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-text-primary">
          Mi Cuenta
        </h1>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? 'outline' : 'primary'}
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? 'Cancelar' : 'Editar'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Perfil */}
        <Card>
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-accent-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 bg-background-secondary border border-border-primary rounded-full p-2 hover:bg-background-tertiary transition-colors">
                <Camera className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
            
            <h2 className="text-xl font-semibold text-text-primary">
              {user?.name || 'Usuario'}
            </h2>
            <p className="text-text-secondary">
              {user?.email || 'usuario@tofit.com'}
            </p>
            
            <div className="mt-6 space-y-2">
              <div className="bg-accent-success/10 text-accent-success px-3 py-1 rounded-full text-sm">
                Cuenta Verificada
              </div>
              <div className="bg-accent-primary/10 text-accent-primary px-3 py-1 rounded-full text-sm">
                Miembro Premium
              </div>
            </div>
          </div>
        </Card>

        {/* Información personal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Card.Header>
              <Card.Title>Información Personal</Card.Title>
              <Card.Description>
                Gestiona tu información personal y de contacto
              </Card.Description>
            </Card.Header>
            
            <Card.Content>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre completo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  disabled={!isEditing}
                  leftIcon={<User className="w-4 h-4 text-text-muted" />}
                />
                
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  disabled={!isEditing}
                  leftIcon={<Mail className="w-4 h-4 text-text-muted" />}
                />
                
                <Input
                  label="Teléfono"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  leftIcon={<Phone className="w-4 h-4 text-text-muted" />}
                />
                
                <Input
                  label="Dirección"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  disabled={!isEditing}
                  leftIcon={<MapPin className="w-4 h-4 text-text-muted" />}
                />
              </div>
              
              {isEditing && (
                <div className="flex justify-end space-x-3 mt-6">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave}>
                    Guardar Cambios
                  </Button>
                </div>
              )}
            </Card.Content>
          </Card>

          {/* Estadísticas */}
          <Card>
            <Card.Header>
              <Card.Title>Estadísticas de Cuenta</Card.Title>
            </Card.Header>
            
            <Card.Content>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-text-primary">24</p>
                  <p className="text-sm text-text-secondary">Compras</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">1,250</p>
                  <p className="text-sm text-text-secondary">Puntos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-primary">15</p>
                  <p className="text-sm text-text-secondary">Reseñas</p>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MiCuenta 