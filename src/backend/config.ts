import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { useEffect } from "react";



const firebaseConfig = initializeApp({
    apiKey: "AIzaSyD9nWCe2LXWSKCq4yHAcuaDTCaxA7IdfwI",
    authDomain: "next-crud-21b21.firebaseapp.com",
    projectId: "next-crud-21b21",
    storageBucket: "next-crud-21b21.appspot.com",
    messagingSenderId: "726240335162",
    appId: "1:726240335162:web:52715ea81fcb719f5a6c03"
});


const db = getFirestore(firebaseConfig)



export default db