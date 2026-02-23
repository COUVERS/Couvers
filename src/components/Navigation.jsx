import './Nav.css'
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Box,
    MuiDrawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Navigation() {
    return (
        <>
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