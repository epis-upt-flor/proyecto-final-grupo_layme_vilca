import { NextApiRequest, NextApiResponse } from "next";
import { collection , getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase'
export default async function handler(req : NextApiRequest,res : NextApiResponse){
    const ref = collection(firestore,"sportcourts")
    const querySnapshot = await getDocs(ref)
    let list : any = []
    querySnapshot.forEach(document => list.push(document.data()))
    return res.status(200).json(list)
}