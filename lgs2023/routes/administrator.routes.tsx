import { Dashboard } from "@mui/icons-material"
import FiberManualRecord from "@mui/icons-material/FiberManualRecord"
import { ISidebarGroup, ISidebarItems, ISidebarPage } from "types"

export const administrator : ISidebarItems[] = [
    { 
      name : 'Mi establecimiento' ,
      icon : () => <Dashboard/> ,
      path : '/system/administrator/sportcourts'
    },
    { 
      name : 'Reservas' ,
      icon : () => <FiberManualRecord/> ,
      path : '/system/administrator/reservations'
    },
] 

