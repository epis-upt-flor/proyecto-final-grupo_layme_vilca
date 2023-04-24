import { addDoc, collection , doc, setDoc   } from "firebase/firestore"
import { getDownloadURL, getStorage,ref, uploadBytesResumable } from "firebase/storage"
import { NextApiRequest, NextApiResponse } from "next"
import {app, firestore}  from '@/firebase'
import FormidableRequest from "@/utils/formidable"
import * as fs from 'node:fs'
import bcrypt from 'bcrypt'
import { DtoCreateSportCenter, SportCenter, User } from "types"
export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req : NextApiRequest , res : NextApiResponse){
    await FormidableRequest.parse(req)
    const collectionSportCenter = collection(firestore,"sportcenters")
    const collectionUser = collection(firestore,"users")
    const storage = getStorage(app)
    const photo = req.body.photo
    const file = fs.readFileSync(photo.filepath)
    
    const time = (new Date).getTime()
    const metadata = {
        contentType : photo.mimetype,
    }
    
    const outputFilename = `${time}.${getExtension(photo.originalFilename)}`
    const refPhotos = ref(storage,outputFilename)
    await uploadBytesResumable(refPhotos,file,metadata)
    const publicUrlPhoto = await getDownloadURL(refPhotos)

    const passwordHashed = await bcrypt.hash("12345678",10)
    let administratorCenter : User = {
        id : "",
        fullName : req.body.fullName,
        telephone :  req.body.telephone,
        email : req.body.email,
        password : passwordHashed,
        role : "Administrator"
    }

    const refDocAdmin = doc(collectionUser)
    administratorCenter.id = refDocAdmin.id
    await setDoc(refDocAdmin,administratorCenter)
    

   

    let sportCenter : SportCenter = {
        id : "",
        name : req.body.name,
        address : req.body.address,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        photo : publicUrlPhoto,
        adminId : administratorCenter.id
    }
    
    const refDocSportCenter = doc(collectionSportCenter);
    sportCenter.id = refDocSportCenter.id
    await setDoc(refDocSportCenter,sportCenter)
    
    return res.json({})
}

function getExtension(filename: string): string {
    const fragments = filename.split('.')
    return fragments[fragments.length - 1]
}