'use client'
import { ListItemButton , ListItemIcon , ListItemText } from '@mui/material'
import { useStoreSidebar } from '@/stores/sidebar.store'
import { useRouter } from 'next/navigation'
import Invoice from '@/svg/ic_invoice.svg'
import { ISidebarPage } from 'types'


// type PropsSidebarPage = { name : string , path : string , IconComponent? : any }s
export default function SidebarPage({name , path , icon } : ISidebarPage){
    const { path : currentPath , setCurrentPage } = useStoreSidebar()
    const router = useRouter()

    const handleClickSidebarPage = (path : string) => {
        router.push(path)
        setCurrentPage(path)
    }
    return (
        <ListItemButton  sx={{ 
            mx : 1 ,
            my : 0.5,
            borderColor : 'transparent' ,
            borderRadius : '10px',
            backgroundColor : currentPath === path ? "rgba(32, 101, 209, 0.08)" : "inherit"
        }}
            onClick={() => handleClickSidebarPage(path)}
        >
            <ListItemIcon sx={{ minWidth : "41px" }}>
                { icon ? icon() : <Invoice/>}
                
            </ListItemIcon>
            <ListItemText primary={name} />
      </ListItemButton>
    )
}