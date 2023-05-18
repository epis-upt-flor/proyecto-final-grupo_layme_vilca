import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { getDownloadURL, getStorage,ref, uploadBytesResumable } from "firebase/storage"
import { NextApiRequest, NextApiResponse } from "next"
import {app, firestore}  from '@/firebase'
import FormidableRequest from "@/utils/formidable"
import * as fs from 'node:fs'
import { SportCenter, SportCourt } from "types"
import { getToken } from "next-auth/jwt"
export const config = {
    api: {
        bodyParser: false,
    },
}
//Export funcion handler para manejar esta ruta
export default async function handler(req : NextApiRequest , res : NextApiResponse){
    await FormidableRequest.parse(req)//tratar los datos del request  para obtener imagenes

    const session = await getToken({req  , secret : 'soygotto'})
    const collectionSportCenter = collection(firestore,"sportcenters")
    const querySportCenter = query(
        collectionSportCenter,
        where('adminId','==' ,String(session?.user.id)),
    )
    const querySnapshotSportCenter = await getDocs(querySportCenter)
    const sportCenter  = querySnapshotSportCenter.docs[0].data() as SportCenter

    const collectionSportCourt = collection(firestore,"sportcourts")
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
    await uploadBytesResumable(refPhotos,file,metadata)
    const publicUrlPhoto = await getDownloadURL(refPhotos)
    
    
    let newSportCourt : SportCourt = {
        id : "",
        name : req.body.name,
        photo : publicUrlPhoto,
        description : req.body.description,
        price : Number(req.body.price),
        
        width : Number(req.body.width),
        long : Number(req.body.long),
        sportCenterId : String(sportCenter.id),
        materialId : req.body.materialId
    }

    const docNewSportCourt = doc(collectionSportCourt)
    newSportCourt.id = docNewSportCourt.id
    await setDoc(docNewSportCourt,newSportCourt)
    
    return res.json({status : 200}) //devuelve un status 200
}

function getExtension(filename: string): string {
    const fragments = filename.split('.');
    return fragments[fragments.length - 1];
}