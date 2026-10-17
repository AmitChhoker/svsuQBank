// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // ✅ Add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKHCl_eyKwaBLnXdEaCJ48Wz3m9Lrb7_A",
  authDomain: "svsu-visitor-counter.firebaseapp.com",
  projectId: "svsu-visitor-counter",
  storageBucket: "svsu-visitor-counter.firebasestorage.app",
  messagingSenderId: "407468943206",
  appId: "1:407468943206:web:4032d910b4c1beb79e8aa7",
  measurementId: "G-09CYHB4FHS",
  databaseURL: "https://svsu-visitor-counter-default-rtdb.firebaseio.com" // ✅ Must be added manually
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app); // ✅ Export the Realtime Database
