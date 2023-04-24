
import { collection , doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import * as dotenv from 'dotenv'
import { User } from "../types/index";
import * as bcrypt from 'bcrypt'

dotenv.config()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

async function seed(){
    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    const database = getFirestore(app)

    let administratorBackOffice : User = {
        id : "",
        fullName : "Van Vilca",
        email : "soythundergol@gmail.com",
        telephone : "987654321",
        password : await bcrypt.hash("soythundergol",10),
        role : "BackOffice"
    }
    const collectionUser = collection(database,"users")
    const refDocUser = doc(collectionUser);
    administratorBackOffice.id = refDocUser.id
    await setDoc(refDocUser,administratorBackOffice)
    
}

seed()
    .then(() => console.log("Seed is OK :)"))
    .catch(error => {
        throw error
    })