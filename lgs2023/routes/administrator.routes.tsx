import { Dashboard } from "@mui/icons-material"
import FiberManualRecord from "@mui/icons-material/FiberManualRecord"
import { ISidebarGroup, ISidebarItems, ISidebarPage } from "types"

export const administrator : ISidebarItems[] = [
    { 
      name : 'Mi establecimiento' ,
      icon : () => <FiberManualRecord/> ,
      path : '/system/administrator/sportcenters/me'
    },
    { 
      title : 'Reservas' ,
      icon : <FiberManualRecord/> ,
      pages : [
        { name : 'Lista' , path : '/system/reservations'},
      ]
    },
    { 
      name : 'Canchas' ,
      path : '/system/administrator/sportcourts',
      icon : () => <Dashboard/>
    },
] 

