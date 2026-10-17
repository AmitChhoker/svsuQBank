// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // <-- Important for file upload

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD8MmKTQqaelpcOTNvbMtodko6IkINsl0",
  authDomain: "svsuqbank.firebaseapp.com",
  projectId: "svsuqbank",
  storageBucket: "svsuqbank.appspot.com", // ✅ FIXED: correct bucket URL
  messagingSenderId: "397081968655",
  appId: "1:397081968655:web:c3b2f4869af5dd4bab237a",
  measurementId: "G-J2M58WCKR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // ✅ This enables file upload

export { storage }; // ✅ Export it to use in UploadPDF.jsx
