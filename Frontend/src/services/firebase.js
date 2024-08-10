// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2qKj4jD_J13GL5P7g8h7DHeZ_4kz1nm8",
    authDomain: "news-db-1ea0a.firebaseapp.com",
    databaseURL: "https://news-db-1ea0a-default-rtdb.firebaseio.com",
    projectId: "news-db-1ea0a",
    storageBucket: "news-db-1ea0a.appspot.com",
    messagingSenderId: "287387600367",
    appId: "1:287387600367:web:dcf1e82e6d132b1951221a",
    measurementId: "G-C3HXM0GCYL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the services to use them in your components
export { auth, db };
