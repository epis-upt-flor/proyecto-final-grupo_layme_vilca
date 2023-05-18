
import { collection , doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import * as dotenv from 'dotenv'
import { Material, User } from "../types/index";
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


    let materialCesped : Material = {
        id : "",
        name : "Cesped",
        
    }
    const collectionMaterial = collection(database,"materials")
    const refMaterial = doc(collectionMaterial);
    materialCesped.id = refMaterial.id
    await setDoc(refMaterial,materialCesped)

    
    let materialLoza : Material = {
        id : "",
        name : "Loza",
        
    }
    
    const refMaterial1 = doc(collectionMaterial);
    materialLoza.id = refMaterial1.id
    await setDoc(refMaterial1,materialLoza)
    
    
    let materialGrass : Material = {
        id : "",
        name : "Grass Sintetico",
        
    }
    
    const refMaterial2 = doc(collectionMaterial);
    materialGrass.id = refMaterial2.id
    await setDoc(refMaterial2,materialGrass)
}

seed()
    .then(() => console.log("Seed is OK :)"))
    .catch(error => {
        throw error
    })