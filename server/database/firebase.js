// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqoZ_X7LCQ0RzhgFRPjEkdwwXKuO0w3us",
  authDomain: "ctec-snap.firebaseapp.com",
  databaseURL: "https://ctec-snap-default-rtdb.firebaseio.com",
  projectId: "ctec-snap",
  storageBucket: "ctec-snap.appspot.com",
  messagingSenderId: "878044447992",
  appId: "1:878044447992:web:dc5fdb40fec30183bea70d",
  measurementId: "G-H2ELGBJ36L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;