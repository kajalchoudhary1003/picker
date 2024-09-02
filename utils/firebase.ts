// Import the functions you need from the SDKs you need
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBptf1_FgppqwmSOcA0_RNMD72oU_q_-eI",
  authDomain: "picker-3d24e.firebaseapp.com",
  projectId: "picker-3d24e",
  storageBucket: "picker-3d24e.appspot.com",
  messagingSenderId: "716807038981",
  appId: "1:716807038981:web:652fa072c780314a12946c",
  measurementId: "G-T69825P8JV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;