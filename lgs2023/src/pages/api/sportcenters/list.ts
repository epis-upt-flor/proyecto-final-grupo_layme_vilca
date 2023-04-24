import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "prisma/db";
import { collection , getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebase'
export default async function handler(req : NextApiRequest,res : NextApiResponse){
    const ref = collection(firestore,"sportcenters")
    const querySnapshot = await getDocs(ref)
    let list : any = []
    querySnapshot.forEach(document => list.push(document.data()))
    return res.json(list)
}