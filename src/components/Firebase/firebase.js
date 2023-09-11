// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChsI0H07-JdHNtYJ9WL-8uEbFnuIlVRPw",
  authDomain: "marvel-quiz-b4199.firebaseapp.com",
  projectId: "marvel-quiz-b4199",
  storageBucket: "marvel-quiz-b4199.appspot.com",
  messagingSenderId: "396426678326",
  appId: "1:396426678326:web:9cacc5e16a191aa9a54897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)