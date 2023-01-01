// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "beyond-c30ac.firebaseapp.com",
  projectId: "beyond-c30ac",
  storageBucket: "beyond-c30ac.appspot.com",
  messagingSenderId: "63698578569",
  appId: "1:63698578569:web:3143c935ae440a2e2a6a58",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export default app
