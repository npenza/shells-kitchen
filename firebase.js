import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhkdMyOrepESUO4Ko_ao66pwI79rMKiew",
    authDomain: "shells-kitchen.firebaseapp.com",
    databaseURL: "https://shells-kitchen-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shells-kitchen",
    storageBucket: "shells-kitchen.appspot.com",
    messagingSenderId: "695567411679",
    appId: "1:695567411679:web:e4de9302028c3fa926fc6a",
    measurementId: "G-C609X62M5Q"
};

const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)
const storage = getStorage(firebase);

export { db, firebase, storage }