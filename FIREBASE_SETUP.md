# Configuración de Firebase

## Pasos para configurar Firebase en el proyecto

1. **Crear proyecto en Firebase Console:**
   - Ir a https://console.firebase.google.com/
   - Crear nuevo proyecto llamado "to-fit-marcas"
   - Habilitar Google Analytics (opcional)

2. **Configurar Authentication:**
   - En Firebase Console, ir a Authentication > Sign-in method
   - Habilitar "Email/Password"
   - Para el MVP, solo usaremos Email/Password

3. **Configurar Firestore Database:**
   - En Firebase Console, ir a Firestore Database
   - Crear base de datos en modo producción
   - Configurar reglas de seguridad iniciales

4. **Configurar Storage:**
   - En Firebase Console, ir a Storage
   - Activar Cloud Storage
   - Configurar reglas de seguridad para imágenes

5. **Obtener configuración del proyecto:**
   - En Project Settings > General
   - Agregar app (iOS/Android)
   - Copiar la configuración de Firebase

6. **Actualizar archivo de configuración:**
   - Editar `src/config/firebase.ts`
   - Reemplazar los valores placeholder con la configuración real

## Estructura de datos recomendada en Firestore

### Colección `users`
```
users/{userId}
- email: string
- fullName: string
- username: string
- hasStore: boolean
- storeType: 'online' | 'physical' | 'both'
- productTypes: string[]
- createdAt: timestamp
```

### Colección `products`
```
products/{productId}
- name: string
- description: string
- images: string[]
- price: number
- salePrice: number (opcional)
- collection: string
- category: string
- status: 'active' | 'inactive' | 'archived'
- variants: array
- totalStock: number
- userId: string (referencia al dueño)
- createdAt: timestamp
- updatedAt: timestamp
```

### Colección `orders`
```
orders/{orderId}
- customer: object
- items: array
- subtotal: number
- discount: number
- total: number
- status: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'
- paymentStatus: 'pending' | 'paid' | 'failed'
- userId: string (referencia al vendedor)
- createdAt: timestamp
- updatedAt: timestamp
```

## Reglas de seguridad recomendadas

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios solo pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Productos pertenecen al usuario autenticado
    match /products/{productId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
    
    // Órdenes pertenecen al usuario autenticado
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```