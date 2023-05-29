import { NextApiRequest, NextApiResponse } from "next";

import { collection , doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/firebase'
import { getToken } from "next-auth/jwt";
import { Reservation, ResponseReservation, ResponseReservationsBySportCourt, SportCenter, SportCourt, User } from "types";
export default async function handler(req : NextApiRequest,res : NextApiResponse){
    const collectionReservation = collection(firestore,"reservations")
    const queryReservation = query(collectionReservation,where('sportCourtId','==',req.query.id))
    const snapshotReservation = await getDocs(queryReservation)

    let reservations : Array<Reservation> = []
    snapshotReservation.forEach(document => reservations.push(document.data() as Reservation))
    let response : Array<ResponseReservationsBySportCourt> = []

    for(let reservation of reservations){
        response.push({ ...reservation })
    }

    return res.status(200).json(response)
}