import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDBR4ip_Q2aH-Do-kd45UB1J2Q4ku57K68",
  authDomain: "seneduca-5b45e.firebaseapp.com",
  projectId: "seneduca-5b45e",
  storageBucket: "seneduca-5b45e.firebasestorage.app",
  messagingSenderId: "914023471901",
  appId: "1:914023471901:web:c61a8657aa8a5986b1dff4",
  measurementId: "G-XR3X4Q3431"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);