import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG2LOB4_uj_SXT0qGZx8rFT-Ah5v1LozI",
  authDomain: "booksanta-e711a.firebaseapp.com",
  projectId: "booksanta-e711a",
  storageBucket: "booksanta-e711a.firebasestorage.app",
  messagingSenderId: "1029977645887",
  appId: "1:1029977645887:web:e39c50f3cda322b9f7a98a",
  measurementId: "G-ZFPHPBCMJ9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
