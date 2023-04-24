'use client'
import { List, ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Accordion } from "@mui/material";
import { ISidebarGroup } from "types";

import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from "@mui/material/AccordionDetails";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useStoreSidebar } from "@/stores/sidebar.store";
import { useRouter } from "next/navigation";

import Ecommerce from '@/svg/ic_ecommerce.svg'

type PropsSidebarGroup = {
   expanded : boolean
  setExpanded : (accordion : string) => void 
} & ISidebarGroup
export default function SidebarGroup({ icon , title , pages , expanded , setExpanded } : PropsSidebarGroup ){

  const { path , setCurrentPage } = useStoreSidebar()
  const router = useRouter()
  const handleClickSidebarPage = (path : string) => {
    router.push(path)
    setCurrentPage(path)
  }

  const isCurrentGroup = pages.find( p => p.path === path)

  return (
    <Accordion
      expanded={ expanded }
      onChange={ () => setExpanded(title)}
      sx={{ 
        my : "0 !important" ,
        px : 1 ,
        py : 0.5,
        '&::before' : {
          content :  '""',
          display : 'none'
        },
        boxShadow : 'none'
      }}
    >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${title}-content`}
          id={`${title}-header`}
          sx={{ 
            borderRadius : "10px" ,
            borderWidth : "1px" ,
            borderColor :"transparent",
            borderStyle : "solid",
            bgcolor :  isCurrentGroup ? "rgba(32, 101, 209, 0.08)" : 'inherit' ,
            color : isCurrentGroup ? 'rgb(32, 101, 209)' : 'inherit'
          }}
        >
          <Ecommerce/>
          <Typography fontSize={14} sx={{ ml : 2 ,lineHeight : 2 }}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p : 0  , m : 0 }}>
          <List disablePadding sx={{ mx : 0 , mb : 0, mt : 1 }}>
            {
              pages.map((page) =>(
                <ListItem key={`page-${page.path}`} disablePadding sx={{ mb : 1 , pl: 1 , borderRadius : "10px"}}>
                  <ListItemButton 
                    sx={{ py : 1 , borderColor : 'transparent' , borderRadius : '10px' }}
                    onClick={() => handleClickSidebarPage(page.path)}
                  >
                    <ListItemIcon sx={{ minWidth : 32 }} >
                      <FiberManualRecordIcon sx={{ 
                        fontSize : page.path === path ?'10px':'6px' ,
                        color : page.path === path ? "rgb(32, 101, 209)" : 'inherit'
                      }}/>
                    </ListItemIcon>
                    <ListItemText primary={
                      <Typography sx={{ fontWeight : page.path === path ? "bold" : 'inherit'}}>{page.name}</Typography>
                    }/>
                  </ListItemButton>
                </ListItem>     
              ))
            }      
          </List> 
        </AccordionDetails>
    </Accordion>

  )
}