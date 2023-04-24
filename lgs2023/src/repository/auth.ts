import { firestore } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import bcrypt from 'bcrypt'
import { User } from "next-auth";

export default async function login( { email , password } : {email : string , password : string})  {
    try {
        const queryUser = query(
                collection(firestore,"users"),
                where('email','==' ,email),
            )
        
        const querySnapshot = await getDocs(queryUser)
        if(querySnapshot.empty) return null
        
        const user = querySnapshot.docs[0].data() as User
        const matched = await bcrypt.compare(password,String(user.password))

        console.log({user,matched})
        if(matched){
            return user
        }
        return null
    } catch (error) {
        return null
    }
}