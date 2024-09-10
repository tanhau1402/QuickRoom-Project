import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth,GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCX2dBFNLmU-lx5rd46jQRBirIwkuSfeRY",
    authDomain: "data-2e3ed.firebaseapp.com",
    projectId: "data-2e3ed",
    storageBucket: "data-2e3ed.appspot.com",
    messagingSenderId: "302137235457",
    appId: "1:302137235457:web:d79c09e4744ce3d9094800",
    measurementId: "G-L151HFN4SV"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
