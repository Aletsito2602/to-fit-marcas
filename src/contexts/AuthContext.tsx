import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

interface AuthContextType {
  user: any | null; // Permitir todos los campos de Firebase
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null); // Permitir campos adicionales de Firebase
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setFirebaseUser(firebaseUser);
        
        // Obtener datos adicionales del usuario desde Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('Usuario cargado desde Firestore:', userData);
            console.log('photo_url:', userData.photo_url);
            console.log('portada:', userData.portada);
            console.log('onboardingCompleted value:', userData.onboardingCompleted);
            
            // Agregar URLs por defecto si no existen
            const userWithDefaults = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              ...userData, // Esto incluye todos los campos existentes
              // Agregar URLs por defecto si no existen
              photo_url: userData.photo_url || 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face',
              portada: userData.portada || 'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop',
              // Si onboardingCompleted no existe, asumimos que ya completó el onboarding
              onboardingCompleted: userData.onboardingCompleted !== false,
              createdAt: userData.createdAt?.toDate ? userData.createdAt.toDate() : new Date(),
            };
            
            setUser(userWithDefaults);
            
            // Si no tiene photo_url o portada, actualizar el documento en Firebase
            if (!userData.photo_url || !userData.portada) {
              try {
                await setDoc(doc(db, 'users', firebaseUser.uid), {
                  ...userData,
                  photo_url: userData.photo_url || 'https://images.unsplash.com/photo-1494790108755-2616c0763a92?w=120&h=120&fit=crop&crop=face',
                  portada: userData.portada || 'https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?w=800&h=200&fit=crop',
                }, { merge: true });
                console.log('URLs de imagen por defecto agregadas al usuario');
              } catch (error) {
                console.error('Error actualizando URLs de imagen:', error);
              }
            }
          } else {
            console.log('Usuario no encontrado en Firestore, creando usuario básico');
            // Si no existe en Firestore, crear un usuario básico
            const basicUser = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              fullName: firebaseUser.displayName || 'Usuario',
              username: firebaseUser.email?.split('@')[0] || 'usuario',
              onboardingCompleted: true, // Asumir que usuarios existentes ya completaron onboarding
              createdAt: new Date(),
            } as User;
            setUser(basicUser);
            
            // Guardar el usuario básico en Firestore
            try {
              await setDoc(doc(db, 'users', firebaseUser.uid), {
                email: firebaseUser.email || '',
                fullName: firebaseUser.displayName || 'Usuario',
                username: firebaseUser.email?.split('@')[0] || 'usuario',
                onboardingCompleted: true,
                createdAt: Timestamp.now(),
              });
              console.log('Usuario básico guardado en Firestore');
            } catch (error) {
              console.error('Error guardando usuario básico:', error);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      console.log('Creando usuario en Firebase Auth...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user: firebaseUser } = userCredential;
      console.log('Usuario creado en Auth:', firebaseUser.uid);

      // Guardar datos adicionales en Firestore
      const newUser = {
        email: firebaseUser.email || '',
        fullName: userData.fullName || '',
        username: userData.username || '',
        hasStore: userData.hasStore || false,
        storeType: userData.storeType || null,
        productTypes: userData.productTypes || [],
        onboardingCompleted: userData.onboardingCompleted || false,
        createdAt: Timestamp.now(),
      };

      console.log('Guardando datos en Firestore:', newUser);
      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      console.log('Datos guardados exitosamente en Firestore');
    } catch (error) {
      console.error('Error en signUp:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    signIn,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};