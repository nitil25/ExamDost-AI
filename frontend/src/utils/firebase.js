// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "examdostauth.firebaseapp.com",
  projectId: "examdostauth",
  storageBucket: "examdostauth.firebasestorage.app",
  messagingSenderId: "250684512735",
  appId: "1:250684512735:web:eb3af745c816392f1c8c6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}