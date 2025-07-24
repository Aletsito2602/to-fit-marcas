// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcSKcJ6-7d7QAKxbvIRf5UzXPcRndBbds",
  authDomain: "to-fit.firebaseapp.com",
  databaseURL: "https://to-fit-default-rtdb.firebaseio.com",
  projectId: "to-fit",
  storageBucket: "to-fit.firebasestorage.app",
  messagingSenderId: "159172611530",
  appId: "1:159172611530:web:e2f2c02140734eba815333",
  measurementId: "G-DT62916EXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app; 