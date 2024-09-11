// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_KEY_FIREBASE,
  authDomain: "online-social-bafa3.firebaseapp.com",
  projectId: "online-social-bafa3",
  storageBucket: "online-social-bafa3.appspot.com",
  messagingSenderId: "35977158373",
  appId: "1:35977158373:web:5bccf1ccab4fc17d4b3e0c",
  measurementId: "G-G6S4C9SCJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
