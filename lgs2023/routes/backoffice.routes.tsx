import { Dashboard } from "@mui/icons-material"
import FiberManualRecord from "@mui/icons-material/FiberManualRecord"
import { ISidebarGroup, ISidebarItems, ISidebarPage } from "types"

export const backoffice : ISidebarItems[] = [
    { 
      title : 'Centros deportivos' ,
      icon : <FiberManualRecord/> ,
      pages : [
              { name : 'Lista' , path : '/system/backoffice/sportcenters'},
              { name : 'Materiales' , path : '/system/backoffice/materials'}
            ]
    },
    // {
    //   title : 'Reservas' ,
    //   icon : <FiberManualRecord/>,
    //   pages : [
    //     { name : 'Lista' , path : '/system/reservations'},
    //   ]
    // },
    // { 
    //   name : 'Canchas' ,
    //   path : '/system/administrator/sportcourts',
    //   icon : () => <Dashboard/>
    // },
]

