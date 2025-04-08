// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaGY0Vk8Rg7MsDiyYCFE4KDHanr2S44kc",
  authDomain: "ifmaker-cd284.firebaseapp.com",
  projectId: "ifmaker-cd284",
  storageBucket: "ifmaker-cd284.firebasestorage.app",
  messagingSenderId: "239728690015",
  appId: "1:239728690015:web:5eafd3abd34dc0d8732cea",
  measurementId: "G-09Q2HDPXL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);