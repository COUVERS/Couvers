import { useEffect, useState } from 'react'
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
//Logo and Icons
import LogoLarge from '../../assets/Logo_large_dark.png'
import LogoSmall from '../../assets/Logo_small_dark.png'
import HomeIcon from '../../assets/icons/HomeIcon'
import CourseIcon from '../../assets/icons/CourseIcon'
import ProfileIcon from '../../assets/icons/ProfileIcon'
import SignOutIcon from '../../assets/icons/SignOutIcon'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function Navigation({
    page,
    setPage,
    forceCollapsed = false,
    onSignOut,
    drawerCustomWidth,
    isMobileDrawer = false,
}) {
    const [isExpanded, setIsExpanded] = useState(true)

    useEffect(() => {
        setIsExpanded(!forceCollapsed)
    }, [forceCollapsed])

    const toggleDrawer = () => {
        setIsExpanded((prev) => !prev)
    }

    const navItems = [
        { text: "Home", icon: <HomeIcon size={40} />, pageKey: "home" },
        { text: "Course", icon: <CourseIcon size={40} />, pageKey: "courses" },
    ]

    const bottomItems = [
        { text: "Account", icon: <ProfileIcon size={40} />, pageKey: "account" },
        { text: "Sign Out", icon: <SignOutIcon size={40} />, pageKey: "signout" },
    ]

    return (
        <SidebarBase
            sx={{
                py: 10,
            }}

            open={isExpanded}
            drawerCustomWidth={drawerCustomWidth}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: isExpanded ? '115px' : '48px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    mb: 4,
                }}
            >
                <img
                    src={isExpanded ? LogoLarge : LogoSmall}
                    alt="TeTe"
                    style={{
                        width: isExpanded ? '115px' : '48px',
                        height: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: '1 0 0',
                    alignSelf: 'stretch',
                    px: 2,
                    py: 1,
                    overflowY: 'auto',
                }}
            >
                <List sx={{
                    py: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                }}>
                    {navItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                selected={page === item.pageKey}
                                onClick={() => setPage(item.pageKey)}
                                sx={{
                                    minHeight: 48,
                                    flexDirection: isExpanded ? 'row' : 'column',
                                    justifyContent: isExpanded ? 'flex-start' : 'center',
                                    alignItems: 'center',
                                    alignSelf: 'stretch',
                                    color: 'var(--Color-Text-Primary)',
                                    borderRadius: '8px',
                                    px: isExpanded ? 3 : 1,

                                    '&:hover': {
                                        backgroundColor: 'var(--Color-Action-Hover)',
                                    },

                                    '&.Mui-selected': {
                                        backgroundColor: 'var(--Color-Secondary-Contrast)',
                                        color: 'var(--Color-Secondary-Dark)',
                                    },

                                    '&.Mui-selected:hover': {
                                        backgroundColor: 'var(--Color-Secondary-Contrast)',
                                    },

                                    '& .MuiListItemIcon-root': {
                                        color: 'inherit',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: isExpanded ? 2 : 0,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'inherit',
                                        flexShrink: 0,
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
                                        textAlign: 'left',
                                        color: 'inherit',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                {/* Bottom */}

                <List sx={{
                    py: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                }}>
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
                                    justifyContent: isExpanded ? 'flex-start' : 'center',
                                    alignItems: 'center',
                                    color: 'var(--Color-Text-Primary)',
                                    borderRadius: '8px',
                                    px: isExpanded ? 3 : 1,

                                    '&:hover': {
                                        backgroundColor: 'var(--Color-Action-Hover)',
                                    },

                                    '& .MuiListItemIcon-root': {
                                        color: 'inherit',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: isExpanded ? 2 : 0,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'inherit',
                                        flexShrink: 0,
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
                                        textAlign: 'left',
                                        color: 'inherit',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {!isMobileDrawer && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2
                    }}
                >
                    <IconButton
                        onClick={toggleDrawer}
                        sx={{
                            color: 'var(--Color-Text-Primary)',
                        }}
                    >
                        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Box>
            )}
        </SidebarBase>
    )
}