import React, { useState } from 'react'
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton
} from '@mui/material'
import SidebarBase from '../reusable-ui/SideBarBase'

import LogoLarge from '../../assets/Logo_large_dark.png'
import LogoSmall from '../../assets/Logo_small_dark.png'
import HomeIcon from '../../assets/icons/HomeIcon'
import CourseIcon from '../../assets/icons/CourseIcon'
import ProfileIcon from '../../assets/icons/ProfileIcon'
import SignOutIcon from '../../assets/icons/SignOutIcon'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function Navigation({ page, setPage, forceCollapsed = false, onSignOut }) {
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
            <SidebarBase open={isExpanded}>

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
                                    selected={page === item.pageKey}
                                    onClick={() => setPage(item.pageKey)}
                                    sx={{
                                        minHeight: 48,
                                        flexDirection: isExpanded ? 'row' : 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        '&.Mui-selected': {
                                            backgroundColor: '#fff',
                                            color: '#1F2430',
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: '#fff',
                                        },
                                    }}

                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: isExpanded ? 2 : 0,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>

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
                                        onClick={() => {
                                        if (item.pageKey === "signout") {
                                            if (onSignOut) onSignOut()
                                        } else {
                                            setPage(item.pageKey)
                                        }
                                    }}
                                        sx={{
                                            minHeight: 48,
                                            flexDirection: isExpanded ? 'row' : 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: isExpanded ? 2 : 0,
                                                justifyContent: 'center',
                                        
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>

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

            </SidebarBase>
        </>
    )
}