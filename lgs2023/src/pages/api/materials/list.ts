import { firestore } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest , res: NextApiResponse){
    const ref = collection(firestore,"materials")
    const querySnapshot = await getDocs(ref)
    let list : any = []
    querySnapshot.forEach(document => list.push(document.data()))
    return res.status(200).json(list)
}