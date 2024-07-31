// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChbmmJrNs4jXTJ1X0aN1lMcnVJCBGHHoo",
  authDomain: "pantryproject-82ec1.firebaseapp.com",
  projectId: "pantryproject-82ec1",
  storageBucket: "pantryproject-82ec1.appspot.com",
  messagingSenderId: "259971524080",
  appId: "1:259971524080:web:708c43c38598e6986a6935"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)