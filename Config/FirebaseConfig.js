// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYVHt61bd_49kn3HQzp5sZTlFaNf4frAs",
  authDomain: "renttracker-3c72f.firebaseapp.com",
  projectId: "renttracker-3c72f",
  storageBucket: "renttracker-3c72f.appspot.com",
  messagingSenderId: "126906390779",
  appId: "1:126906390779:web:e2bccee96984fb2210f85e",
  measurementId: "G-C9ZXNE9XQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//initialize firestore
const db = getFirestore(app);