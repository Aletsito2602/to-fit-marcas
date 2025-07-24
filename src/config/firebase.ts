import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAcFn-pv2TQquSoBjainZ6kIfX4OSwxcK0",
  authDomain: "to-fit.firebaseapp.com",
  projectId: "to-fit",
  storageBucket: "to-fit.firebasestorage.app",
  messagingSenderId: "159172611530",
  appId: "1:159172611530:ios:4ccb54ba040ae3bc815333",
  databaseURL: "https://to-fit-default-rtdb.firebaseio.com"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;