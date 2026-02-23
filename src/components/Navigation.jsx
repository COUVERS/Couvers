import './Nav.css'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
    Box,
    MuiDrawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

//Convert Figma values into constants
const drawerWidth = 206;
const shrunkWidth = 72;

export default function Navigation() {

    const [isExpanded, setIsExpanded] = useState(true)
    const toggleDrawer = () => setIsExpanded(!isExpanded)

    const navItems = [
        { text: 'Home', icon: <HomeIcon /> },
        { text: 'Course', icon: <SchoolIcon /> },
    ]
    const bottomItems = [
        { text: 'Account', icon: <AccountCircleIcon /> },
        { text: 'Sign Out', icon: <ExitToAppIcon /> },
    ]

    return (
        <>
            <Drawer open={isExpanded}>
                {/* Logo Area */}
                <Box sx={{
                    height: 123,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isExpanded ? 'flex-start' : 'center',
                    mb: 4
                }}>
                    <img src={isExpanded ? "/logo_full.png" : "/logo_small.png"}
                        alt="TeTe"
                        style={{
                            maxWidth: isExpanded ? '160px' : '40px', transition: '0.3s'
                        }}
                    />
                </Box>

            </Drawer>
            <nav className="nav-menu">
                <img src="" alt="Logo" />
                <ul className="nav-ul">
                    <div className="div-list">
                        <ul className="div-ul-top-nav">
                            <li><a href="">Home</a></li>
                            <li><a href="">Course</a></li>
                        </ul>

                        <ul className="div-ul-bottom-nav">
                            <li><a href="">Account</a></li>
                            <li><a href="">Sign Out</a></li>
                        </ul>
                    </div>
                </ul>
            </nav>
        </>
    )
}