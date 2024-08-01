// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAutn02Vp7w8wmho-ewgbxqLrHH6_6OHsU",
  authDomain: "pantryproject-99c78.firebaseapp.com",
  projectId: "pantryproject-99c78",
  storageBucket: "pantryproject-99c78.appspot.com",
  messagingSenderId: "140145649100",
  appId: "1:140145649100:web:fab2d5c858f88999cfa969",
  measurementId: "G-ETRDX3LCLG"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)