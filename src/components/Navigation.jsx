import '../global.css'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
    Box,
    Drawer as MuiDrawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton
} from '@mui/material'
import LogoLarge from '../assets/Logo_large_dark.png'
import LogoSmall from '../assets/Logo_small_dark.png'
import HomeIcon from '../assets/icons/HomeIcon'
import CourseIcon from '../assets/icons/CourseIcon'
import ProfileIcon from '../assets/icons/ProfileIcon'
import SignOutIcon from '../assets/icons/SignOutIcon'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'


//Convert Figma values into constants
const drawerWidth = 240
const shrunkWidth = 88

// Customize Drawer style
const Drawer = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: open ? drawerWidth : shrunkWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--color-surface)',
    boxShadow: '0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 8px 10px -5px rgba(0, 0, 0, 0.20)',
    padding: '40px 0',
    boxSizing: 'border-box',
}))

export default function Navigation({ page, setPage }) {
    const [isExpanded, setIsExpanded] = useState(true)
    const toggleDrawer = () => setIsExpanded(!isExpanded)

    const navItems = [
        { text: "Home", icon: <HomeIcon />, pageKey: "home" },
        { text: "Course", icon: <CourseIcon />, pageKey: "courses" },
    ]
    const bottomItems = [
        { text: "Account", icon: <ProfileIcon />, pageKey: "account" },
        { text: "Sign Out", icon: <SignOutIcon />, pageKey: "signout" },
    ]

    return (
        <>
            <Drawer open={isExpanded}>

                {/* Logo Area */}
                <Box sx={{
                    display: 'flex',
                    width: isExpanded ? '160px' : '58px',
                    height: isExpanded ? '123px' : '48px',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '10px',
                    flexShrink: 0,
                    aspectRatio: isExpanded ? '160 / 123' : '29/24',
                    mx: 'auto',
                }}>
                    <img src={isExpanded ? LogoLarge : LogoSmall}
                        alt="TeTe"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            transition: '0.3s'
                        }}
                    />
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: isExpanded ? 'flex-start' : 'center',
                    flex: '1 0 0',
                    alignSelf: 'stretch',
                    padding: '16px 0',
                    overflowY: 'auto',
                }}>
                    {/* Top Section */}
                    <List sx={{ flexGrow: 1, px: 1 }}>
                        {navItems.map((item) => (
                            <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 1 }}>
                                <ListItemButton
                                    onClick={() => setPage(item.pageKey)}
                                    sx={{
                                        minHeight: 48,
                                        flexDirection: isExpanded ? 'row' : 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        px: 1
                                    }}>
                                    {!isExpanded && (
                                        <ListItemIcon sx={{
                                            minWidth: 0, mb: 0.5,
                                            justifyContent: 'center',
                                            // color: 'inherit'
                                        }}>
                                            {item.icon}
                                        </ListItemIcon>
                                    )}
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontSize: isExpanded ? 'var(--fs-body1)' : 'var(--fs-caption)',
                                            lineHeight: isExpanded ? 'var(--lh-body1)' : 'var(--lh-caption)',
                                            fontWeight: isExpanded ? 'var(--fw-body1-bold)' : 'var(--fw-body1)',
                                            textAlign: 'center',
                                            color: 'var(--color-on-surface)',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    {/* Bottom Section */}
                    <Box sx={{ pb: 4, px: 1 }}>
                        <List>
                            {bottomItems.map((item) => (
                                <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            flexDirection: isExpanded ? 'row' : 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            px: 1
                                        }}>
                                        {!isExpanded && (
                                            <ListItemIcon sx={{
                                                minWidth: 0, mb: 0.5,
                                                justifyContent: 'center',
                                            }}>
                                                {item.icon}
                                            </ListItemIcon>
                                        )}
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                fontSize: isExpanded ? 'var(--fs-body1)' : 'var(--fs-caption)',
                                                lineHeight: isExpanded ? 'var(--lh-body1)' : 'var(--lh-caption)',
                                                fontWeight: isExpanded ? 'var(--fw-body1-bold)' : 'var(--fw-body1)',
                                                textAlign: 'center',
                                                color: 'var(--color-on-surface)',
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
                {/* Toggle Button */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2
                    }}>
                    <IconButton onClick={toggleDrawer}>
                        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Box>

            </Drawer>
        </>
    )
}