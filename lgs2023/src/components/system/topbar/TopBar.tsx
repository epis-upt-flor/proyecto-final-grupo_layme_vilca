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
import { Divider } from '@mui/material';

export default function TopBar(){

    const { data : session } = useSession()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { setToggleSidebar } = useStoreSidebar()
    
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
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
            Photos
          </Typography>
            <div>
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
    )
}