'use client';
import Sidebar from "@/components/system/sidebar/Sidebar"
import TopBar from "@/components/system/topbar/TopBar"
import CssBaseline from "@mui/material/CssBaseline"
import {  SessionProvider } from "next-auth/react"

export default function LayoutClient({children}:any){
    

    return (
        <>
        <CssBaseline/>
        <SessionProvider>
            <Sidebar/>
            <TopBar/>
            {children}
        </SessionProvider>
        </>
    )
}