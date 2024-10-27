// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI0iVKZmPPBzpA3k2D3OBbBihypqEfN1g",
  authDomain: "new-task-7fdac.firebaseapp.com",
  projectId: "new-task-7fdac",
  storageBucket: "new-task-7fdac.appspot.com",
  messagingSenderId: "499461696505",
  appId: "1:499461696505:web:665db6c7ec950c6eb4eb28",
  measurementId: "G-DWM051P6MY"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app)

