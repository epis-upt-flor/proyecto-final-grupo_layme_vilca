import { addDoc, collection, doc, getDoc, query, setDoc, updateDoc, where } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"
import {app, firestore}  from '@/firebase'
import { Reservation } from "types"
//Export funcion handler para manejar esta ruta
export default async function handler(req : NextApiRequest , res : NextApiResponse<any>) {
    
    const collectionReservation = collection(firestore,"reservations")    
    
    // let newReservation : Dto = {
    //     id : "",
    //     total : Number(req.body.total),
    //     isPayed : true,
    // }

    const docRef = doc(collectionReservation,String(req.body.id))
    try{
        await updateDoc(docRef,{ payed : true })
        res.status(200).json({message : "Pagado"}) //devuelve un status 200 
    }catch(e){
        console.error(e)
        res.status(500).json({message : "No Pagado"}) //devuelve un status 200    
    }
    
    
    
}