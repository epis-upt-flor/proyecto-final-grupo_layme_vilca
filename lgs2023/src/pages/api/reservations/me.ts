import { NextApiRequest, NextApiResponse } from "next";

import { collection , doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/firebase'
import { getToken } from "next-auth/jwt";
import { Reservation, ResponseReservation, SportCenter, SportCourt, User } from "types";
export default async function handler(req : NextApiRequest,res : NextApiResponse){
    const session = await getToken({req  , secret : 'soygotto'})
    const userId = String(session?.user.id)
    
    const collectionSportCourt = collection(firestore,"sportcourts")
    const collectionSportCenter = collection(firestore,"sportcenters")
    const collectionReservation = collection(firestore,"reservations")
    const querySportCenter = query(
        collectionSportCenter,
        where('adminId','==' ,userId),
    )

    const querySnapshotSportCenter = await getDocs(querySportCenter)
    
    
    const sportCenter  = querySnapshotSportCenter.docs[0].data() as SportCenter

    const querySportCourt = query(
        collectionSportCourt,
        where('sportCenterId','==' ,sportCenter.id)
    )
    
    const querySnapshotSportCourt = await getDocs(querySportCourt)
    let sportCourts : Array<SportCourt> = []
    querySnapshotSportCourt.forEach(document => sportCourts.push(document.data() as SportCourt))

    const sportCourtIds = sportCourts.map(court => court.id )

    const queryReservation = query(collectionReservation,where('sportCourtId','in',sportCourtIds))
    const snapshotReservation = await getDocs(queryReservation)

    let reservations : Array<Reservation> = []
    snapshotReservation.forEach(document => reservations.push(document.data() as Reservation))
    let response : Array<ResponseReservation> = []

    for(let reservation of reservations){
        const docRef = doc(firestore,"sportcourts",reservation.sportCourtId)
        const snapshotSportCourt = await getDoc(docRef)
        const sportCourt = snapshotSportCourt.data() as SportCourt
        response.push({ ...reservation , sportCourtName : sportCourt.name , userName : ""  })
    }

    return res.status(200).json(response)
}