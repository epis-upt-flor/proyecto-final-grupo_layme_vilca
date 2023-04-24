
import React from "react"
import LayoutClient from "./layoutClient"
import { getServerSession } from "next-auth/next"
import authOptions from '@/pages/api/auth/[...nextauth]'
import { Session } from "next-auth"
type PropsLayout = {
    children : React.ReactNode
}

export default async function RootLayout({children } : PropsLayout){
    return (
        
        <body>
            <LayoutClient>
                {children}
            </LayoutClient>
        </body>
    )
}