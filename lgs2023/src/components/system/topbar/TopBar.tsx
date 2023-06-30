'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { useStoreSidebar } from '@/stores/sidebar.store';
import { Stack } from '@mui/system';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, Button, Divider, List, ListItem } from '@mui/material';
import { NotificationAddOutlined, NotificationImportant } from '@mui/icons-material';
import { api } from '@/api';
import { DtoMarkAsReadNotification, NotificationResponse } from 'types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DialogSidebar from '@/components/DialogSidebar';
import TabsHorizontal from '@/components/TabsHorizontal';

export default function TopBar(){

    const { data : session } = useSession()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { setToggleSidebar } = useStoreSidebar()
    const [isOpen , setIsOpen] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const mutation = useMutation(api.notificationMarkAsRead,{
      onSuccess(data, variables, context) {
          queryClient.invalidateQueries(['/api/notifications/unreaded/me'])
          queryClient.invalidateQueries(['/api/notifications/readed/me'])
      },
      onError(error : any, variables, context) {
          console.error(error)
      },
  })
  

    const {data : notificationsUnreaded } = useQuery<NotificationResponse[]>({
      queryKey : ['/api/notifications/unreaded/me'],
      queryFn : api.getMyNotificationsUnreaded,
      initialData : []
  })
  const {data : notificationsReaded  } = useQuery<NotificationResponse[]>({
      queryKey : ['/api/notifications/readed/me'],
      queryFn : api.getMyNotificationsReaded,
      initialData : []
  })
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return
      }     
      setIsOpen(open)
  }

  const handleOnClickMarkAsRead = (notificationId : string) => {
    const dto : DtoMarkAsReadNotification = {
      id : notificationId,
      read : true
    }
    mutation.mutate(dto)
  }

  const ListUnreadedComponent = () => (
    <List>
          {
            notificationsUnreaded.map( notification => 
              <>
              <ListItem key={`N${notification}`}>
                <Avatar sx={{ mr : 2 }}>
                  <NotificationImportant/>
                </Avatar>
                <Stack direction="column">
                  <Typography variant='subtitle2'>{notification.message}</Typography>
                  <Typography variant='caption'>{notification.sportCourtName}</Typography>
                  <Typography variant='subtitle2'>{notification.createdAtHumanReadable}</Typography>
                  <Button 
                  sx={{ mt : 2 }} 
                  variant="outlined" 
                  size='small'
                  onClick={ () => handleOnClickMarkAsRead(notification.id)}
                  >Marcar como leído</Button>
                </Stack>
              </ListItem>
              <Divider />
              </>
            )
          }
        </List>
  )

  const ListReadedComponent = () => (
    <List>
          {
            notificationsReaded.map( notification => 
              <>
              <ListItem key={`N${notification}`}>
                <Avatar sx={{ mr : 2 }}>
                  <NotificationImportant/>
                </Avatar>
                <Stack direction="column">
                  <Typography variant='subtitle2'>{notification.message}</Typography>
                  <Typography variant='caption'>{notification.sportCourtName}</Typography>
                  <Typography variant='subtitle2'>{notification.createdAtHumanReadable}</Typography>
                </Stack>
              </ListItem>
              <Divider />
              </>
            )
          }
        </List>
  )

    const tabs = [
      {
        index : 0,
        title : "No leídos",
        Component : () => <ListUnreadedComponent/>
      },
      {
        index : 1,
        title : "Leídos",
        Component : () => <ListReadedComponent/>
      },
    ]
  

    return (<>
      <DialogSidebar isOpen={isOpen} anchor="right" toggleDrawer={toggleDrawer} width={480}>
        <Box px={2}>
          <Typography variant="h6">Notificaciones</Typography>
        </Box>
        <TabsHorizontal tabs={tabs}/>
      </DialogSidebar>
      
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setToggleSidebar(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema ThunderGol
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setIsOpen(true)}
                color="inherit"
              >
                <NotificationAddOutlined />
              </IconButton>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                elevation={1}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Stack width="100%">
                    <Box width="100%">
                      <Typography variant="body2">{session?.user.role}</Typography>
                    </Box>
                    <Box width="100%">
                      <Typography variant="caption">{session?.user.email}</Typography>
                    </Box>
                    
                  </Stack>
                </MenuItem>
                <Divider />
                {/* <hr style={{ borderStyle : "dashed" , borderWidth : '0.5px' }}/> */}
                <MenuItem onClick={() => {
                  handleClose()
                  signOut()
                }}>
                  <Typography variant="body2">Cerrar sesión</Typography>
                </MenuItem>
              </Menu>

            </div>


        </Toolbar>
      </AppBar>
      </Box>
    </>)
}