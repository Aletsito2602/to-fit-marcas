import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

// Providers para autenticación social
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

class AuthService {
  // Login con email y password
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      // Obtener datos adicionales del usuario desde Firestore
      const userDoc = await this.getUserData(user.uid)
      
      return {
        success: true,
        user: {
          id: user.uid,
          email: user.email,
          name: user.displayName || userDoc?.name || 'Usuario ToFit',
          username: userDoc?.username || '',
          avatar: user.photoURL || userDoc?.avatar || null,
          role: userDoc?.role || 'user',
          emailVerified: user.emailVerified
        }
      }
    } catch (error) {
      console.error('Error en login:', error)
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      }
    }
  }

  // Registro con email y password
  async register(userData) {
    try {
      const { email, password, name, username } = userData
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Actualizar perfil con nombre
      await updateProfile(user, {
        displayName: name
      })

      // Guardar datos adicionales en Firestore
      await this.saveUserData(user.uid, {
        name,
        username,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
        avatar: null
      })

      return {
        success: true,
        user: {
          id: user.uid,
          email: user.email,
          name: name,
          username: username,
          avatar: null,
          role: 'user',
          emailVerified: user.emailVerified
        }
      }
    } catch (error) {
      console.error('Error en registro:', error)
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      }
    }
  }

  // Login con Google
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Verificar si es usuario nuevo y guardar datos
      const userDoc = await this.getUserData(user.uid)
      if (!userDoc) {
        await this.saveUserData(user.uid, {
          name: user.displayName,
          username: '',
          email: user.email,
          role: 'user',
          createdAt: new Date().toISOString(),
          avatar: user.photoURL,
          provider: 'google'
        })
      }

      return {
        success: true,
        user: {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          username: userDoc?.username || '',
          avatar: user.photoURL,
          role: userDoc?.role || 'user',
          emailVerified: user.emailVerified
        }
      }
    } catch (error) {
      console.error('Error en login con Google:', error)
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      }
    }
  }

  // Login con Facebook
  async loginWithFacebook() {
    try {
      const result = await signInWithPopup(auth, facebookProvider)
      const user = result.user

      // Verificar si es usuario nuevo y guardar datos
      const userDoc = await this.getUserData(user.uid)
      if (!userDoc) {
        await this.saveUserData(user.uid, {
          name: user.displayName,
          username: '',
          email: user.email,
          role: 'user',
          createdAt: new Date().toISOString(),
          avatar: user.photoURL,
          provider: 'facebook'
        })
      }

      return {
        success: true,
        user: {
          id: user.uid,
          email: user.email,
          name: user.displayName,
          username: userDoc?.username || '',
          avatar: user.photoURL,
          role: userDoc?.role || 'user',
          emailVerified: user.emailVerified
        }
      }
    } catch (error) {
      console.error('Error en login con Facebook:', error)
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      }
    }
  }

  // Logout
  async logout() {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      console.error('Error en logout:', error)
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      }
    }
  }

  // Restablecer contraseña
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (error) {
      console.error('Error al enviar email de restablecimiento:', error)
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      }
    }
  }

  // Obtener datos del usuario desde Firestore
  async getUserData(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      return userDoc.exists() ? userDoc.data() : null
    } catch (error) {
      console.error('Error obteniendo datos del usuario:', error)
      return null
    }
  }

  // Guardar datos del usuario en Firestore
  async saveUserData(uid, userData) {
    try {
      await setDoc(doc(db, 'users', uid), userData)
      return { success: true }
    } catch (error) {
      console.error('Error guardando datos del usuario:', error)
      return { success: false, error: error.message }
    }
  }

  // Actualizar datos del usuario
  async updateUserData(uid, userData) {
    try {
      await setDoc(doc(db, 'users', uid), userData, { merge: true })
      return { success: true }
    } catch (error) {
      console.error('Error actualizando datos del usuario:', error)
      return { success: false, error: error.message }
    }
  }

  // Observer de estado de autenticación
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback)
  }

  // Obtener usuario actual
  getCurrentUser() {
    return auth.currentUser
  }

  // Mapear códigos de error de Firebase a mensajes en español
  getErrorMessage(errorCode) {
    const errorMessages = {
      'auth/user-not-found': 'No existe una cuenta con este email',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'Ya existe una cuenta con este email',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
      'auth/invalid-credential': 'Credenciales inválidas',
      'auth/popup-closed-by-user': 'Proceso cancelado por el usuario',
      'auth/cancelled-popup-request': 'Solicitud cancelada',
      'auth/popup-blocked': 'Popup bloqueado por el navegador'
    }
    
    return errorMessages[errorCode] || 'Error desconocido. Intenta nuevamente'
  }
}

export default new AuthService() 