import { addDoc, collection } from "firebase/firestore"
import { getStorage,ref, uploadBytesResumable } from "firebase/storage"
import { NextApiRequest, NextApiResponse } from "next"
import {app, firestore}  from '@/firebase'
import FormidableRequest from "@/utils/formidable"
import * as fs from 'node:fs'
export const config = {
    api: {
        bodyParser: false,
    },
}
//Export funcion handler para manejar esta ruta
export default async function handler(req : NextApiRequest , res : NextApiResponse){
    await FormidableRequest.parse(req)//tratar los datos del request  para obtener imagenes
    const refSportCourt = collection(firestore,"sportcourts")
    const storage = getStorage(app)// obtiene la storage de firebase
    const photo = req.body.photo // obtiene la imagen de la cancha
    const file = fs.readFileSync(photo.filepath) //obtine el contenido de la imagen
    
    const time = (new Date).getTime()
    const metadata = {
        contentType : photo.mimetype,//array que contine los 
    }
    //define nombre del archivo y obtinen referencia final del storage
    const outputFilename = `${time}.${getExtension(photo.originalFilename)}`
    const refPhotos = ref(storage,outputFilename)
    let url = await uploadBytesResumable(refPhotos,file,metadata)
    
    console.log({refPhotos , url})
    let data = {
        name : req.body.name,
        photo : outputFilename,
        description : req.body.description,
        price : req.body.price,
        businessHours : req.body.businessHours
    }
    // se agrega el documento a la coleccion sportcourts
    addDoc(refSportCourt,data)
    return res.json({status : 200}) //devuelve un status 200
}

function getExtension(filename: string): string {
    const fragments = filename.split('.');
    return fragments[fragments.length - 1];
}