import { addDoc, collection, doc, getDoc, query, setDoc, updateDoc, where } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"
import {app, firestore}  from '@/firebase'
import { Reservation } from "types"
//Export funcion handler para manejar esta ruta
export default async function handler(req : NextApiRequest , res : NextApiResponse<any>) {
    const collectionNotifications = collection(firestore,"notifications")
    const docRef = doc(collectionNotifications,String(req.body.id))
    await updateDoc(docRef,{ read : Boolean(req.body.read) })
    res.status(200).json([]) //devuelve un status 200 actualizado
}