// Importações necessárias
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDaGY0Vk8Rg7MsDiyYCFE4KDHanr2S44kc",
  authDomain: "ifmaker-cd284.firebaseapp.com",
  projectId: "ifmaker-cd284",
  storageBucket: "ifmaker-cd284.firebasestorage.app",
  messagingSenderId: "239728690015",
  appId: "1:239728690015:web:5eafd3abd34dc0d8732cea",
  measurementId: "G-09Q2HDPXL4"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 🔧 Inicializa os serviços de autenticação
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// Exporta os objetos
export { auth, googleProvider, db };
