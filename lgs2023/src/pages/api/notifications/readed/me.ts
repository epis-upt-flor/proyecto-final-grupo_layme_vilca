import { firestore } from "@/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { DateTime, Duration } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { Notification, NotificationResponse, SportCourt } from "types";

export default async function handler(req : NextApiRequest , res: NextApiResponse){


    const session = await getToken({req  , secret : 'soygotto'})
    const userId = String(session?.user.id)
    
    const collectionSportCourt = collection(firestore,"sportcourts")
    const collectionNotification = collection(firestore,"notifications")
    const queryUnreaded = query(collectionNotification,where("read","==",true),where("toUserId","==",userId))
    
    const querySnapshot = await getDocs(queryUnreaded)
    let list : Notification[] = []
    querySnapshot.forEach(document => list.push(document.data() as Notification))

    const rtf = new Intl.RelativeTimeFormat("es", {
        localeMatcher: "best fit", // other values: "lookup"
        numeric: "always", // other values: "auto"
        style: "long", // other values: "short" or "narrow"
    });

    let response : NotificationResponse[] = await Promise.all(list.map(async(notification) => {
        
        const durationDiff = DateTime.now().diff(DateTime.fromJSDate(notification.createdAt.toDate()) , "hours")
        const diffHours = Duration.fromObject(durationDiff.toObject()).as("hours")
    
        const sportCourt = (await getDoc(doc(collectionSportCourt,notification.sportCourtId))).data() as SportCourt
        let humanReadable = ""
        if(diffHours > 24){
            humanReadable = rtf.format( -1 * Math.ceil(durationDiff.shiftTo('days').as("days")) ,"days")
        }else{
            humanReadable = rtf.format( -1 * diffHours,"hours")
        }
        return Promise.resolve({ 
            createdAtHumanReadable : humanReadable,
            id : notification.id,
            fromUserId : notification.fromUserId,
            toUserId : notification.toUserId,
            read : notification.read,
            message : notification.message,
            sportCourtName : sportCourt.name
        })
    }))

    console.log({readeds : response})
    return res.status(200).json(response)
}