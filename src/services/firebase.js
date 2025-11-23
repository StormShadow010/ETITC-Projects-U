import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9oxW1B9HJrc5HWnoJocTXJ8DLH9aZOIE",
  authDomain: "extensionkanban.firebaseapp.com",
  projectId: "extensionkanban",
  storageBucket: "extensionkanban.firebasestorage.app",
  messagingSenderId: "737270979991",
  appId: "1:737270979991:web:300d51c91d097b2760b8d2",
  measurementId: "G-H10TCK37N5",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
