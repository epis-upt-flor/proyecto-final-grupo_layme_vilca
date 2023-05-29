import { addDoc, collection, doc, getDoc, query, setDoc, where } from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"
import {app, firestore}  from '@/firebase'
import { Reservation } from "types"
//Export funcion handler para manejar esta ruta
export default async function handler(req : NextApiRequest , res : NextApiResponse<Reservation>) {
    
    const collectionReservation = collection(firestore,"reservations")    
    
    let newReservation : Reservation = {
        id : "",
        date : req.body.date,
        hourEnd : req.body.hourEnd,
        hourStart : req.body.hourStart,
        sportCourtId : req.body.sportCourtId,
        userId : "",
        total : Number(req.body.total),
        payed : true,
        methodPayment : "Efectivo"
    }

    const docNewReservation = doc(collectionReservation)
    newReservation.id = docNewReservation.id
    await setDoc(docNewReservation,newReservation)
    const snapshopReservation = await getDoc(docNewReservation)
    const reservation = snapshopReservation.data() as Reservation
    res.status(201).json(reservation) //devuelve un status 201 CREADO
}