'use client'
import { useStoreSidebar } from '@/stores/sidebar.store'
import { Box , List, ListSubheader} from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { useState } from 'react'
import { ISidebarGroup, ISidebarItems, ISidebarPage } from 'types'
import SidebarGroup from './SidebarGroup'
import SidebarPage from './SidebarPage'
import { useSession } from "next-auth/react";
import { administrator } from "routes/administrator.routes";
import { backoffice } from "routes/backoffice.routes";
import { RoleEnum } from "types";
import { getServerSession } from 'next-auth/next'

export default function Sidebar(){
    const { data , status } = useSession()
    
    const ROLE_BACKOFFICE : RoleEnum = "BackOffice"
    const [accordion , setAccordion] = useState<string>('')
    const { setToggleSidebar , isOpen } = useStoreSidebar()

    const isPage = (route : ISidebarPage | ISidebarGroup) : route is ISidebarPage => {
        return 'name' in (route as ISidebarPage)
    }

    const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as KeyboardEvent).key === 'Tab' ||
            (event as KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
  
        setToggleSidebar(open)
    }

    const handleChange = (panel: string) => {
        setAccordion(accordion === panel ? '' : panel);
    };

    // if(status != "authenticated"){
    //     return <>Cargando</>
    // }

    return (
        <Drawer
              anchor='left'
              open={isOpen}
              onClose={toggleDrawer(false)}>

              
        <Box
            sx={{ width : 250 , pt : 2 }}
            role="presentation"
            onKeyDown={(e) => toggleDrawer(false)}
        >
            <List
                subheader={
                    <ListSubheader
                        sx={{
                            px : 4.3 ,
                            py : 1 ,
                            textTransform : "uppercase" ,
                            lineHeight : "16px" ,
                            fontSize:"11px" ,
                            fontWeight : "700",
                            pl : 3.2,
                            color : "rgb(99, 115, 129)"
                        }}>
                        Mantenimiento
                    </ListSubheader>
                }
            >
                {
                    status == "authenticated" && ( String(data?.user?.role) == ROLE_BACKOFFICE ? backoffice : administrator).map(route => (
                        isPage(route) ?
                        <SidebarPage key={`SP-${route.path}`} icon={route.icon} name={route.name} path={route.path} />
                        : <SidebarGroup 
                            key={`SG-${route.title}`} 
                            title={route.title} 
                            icon={route.icon} 
                            pages={route.pages} 
                            expanded={accordion === route.title }
                            setExpanded={() => handleChange(route.title)}
                        />
                    ))
                }
            </List>
        </Box>
        </Drawer>
    )
}