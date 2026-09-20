import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWUNIegMz5m4_chHfdty30-2YPKGVzxf8",
  authDomain: "gradeup-60288.firebaseapp.com",
  projectId: "gradeup-60288",
  storageBucket: "gradeup-60288.firebasestorage.app",
  messagingSenderId: "896294449548",
  appId: "1:896294449548:web:ed40db3a7fba4016f426a9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);