import { NextApiRequest, NextApiResponse } from "next";

import { collection , getDoc, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/firebase'
import { getToken } from "next-auth/jwt";
import { SportCenter, User } from "types";
export default async function handler(req : NextApiRequest,res : NextApiResponse){
    const session = await getToken({req  , secret : 'soygotto'})
    const userId = String(session?.user.id)
    
    const collectionSportCourt= collection(firestore,"sportcourts")
    const collectionSportCenter = collection(firestore,"sportcenters")
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
    let list : any = []
    querySnapshotSportCourt.forEach(document => list.push(document.data()))
    return res.status(200).json(list)
}