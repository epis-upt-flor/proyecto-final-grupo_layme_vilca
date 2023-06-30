import { Box, Drawer, DrawerProps } from "@mui/material";

type PropsDialogSidebar = {
    anchor : "left" | "top" | "right" | "bottom"
    isOpen : boolean
    width : number
    toggleDrawer : (open: boolean) => (event: KeyboardEvent | MouseEvent) => void
    children : React.ReactNode
}
export default function DialogSidebar({anchor = 'right' , isOpen = false , toggleDrawer , width = 480,children } : PropsDialogSidebar){
    
    return (<>
        <Drawer
        anchor={anchor}
        open={isOpen}
        onClose={toggleDrawer(false)}
        >
            <Box
            sx={{ width : width , pt : 2 }}
            role="presentation"
            onKeyDown={(e) => toggleDrawer(false)}
        >
        {children}
        </Box>
        </Drawer>
    </>)
}