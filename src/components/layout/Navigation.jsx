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
import LogoLarge from '../../assets/Logo_large_dark.svg'
import LogoSmall from '../../assets/Logo_small_dark.svg'
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
        { text: "Home", icon: <HomeIcon size={40} color="var(--Color-Primary-_States-Active)" />, pageKey: "home" },
        { text: "Course", icon: <CourseIcon size={40} color="var(--Color-Primary-_States-Active)" />, pageKey: "courses" },
    ]

    const bottomItems = [
        { text: "Account", icon: <ProfileIcon size={40} color="var(--Color-Primary-_States-Active)" />, pageKey: "account" },
        { text: "Sign Out", icon: <SignOutIcon size={40} color="var(--Color-Primary-_States-Active)" />, pageKey: "signout" },
    ]

    return (
        <SidebarBase
            sx={{
                pt: 10,
                pb: isExpanded ? 5 : 2,
            }}

            open={isExpanded}
            drawerCustomWidth={drawerCustomWidth}
        >
            <Box
                sx={{
                    width: isExpanded ? 115 : 48,
                    height: isExpanded ? 88 : 48,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexShrink: 0,
                    alignSelf: 'center',
                    // mb: isExpanded ? 0 : 1,
                }}
            >
                <Box
                    component="img"
                    src={isExpanded ? LogoLarge : LogoSmall}
                    alt="TeTe"
                    sx={{
                        width: isExpanded ? 115 : 48,
                        height: isExpanded ? 51 : 'auto',
                        display: 'block',
                        flexShrink: 0,
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
                    pt: 2,
                    pb: 1,
                    overflowY: 'auto',
                }}
            >
                <List sx={{
                    py: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isExpanded ? 6 : '24px',
                }}>
                    {navItems.map((item) => (
                        <ListItem key={item.text} disablePadding
                            sx={{
                                display: 'block',
                                width: isExpanded ? '100%' : '70px',
                                alignSelf: isExpanded ? 'stretch' : 'center',
                            }}>
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
                                    px: isExpanded ? 3 : 1,

                                    '&:hover': {
                                        backgroundColor: 'var(--Color-Action-Hover)',
                                    },

                                    '&:active': {
                                        backgroundColor: 'var(--Color-Primary-_States-FocusVisible)',
                                    },

                                    '&.Mui-selected': {
                                        backgroundColor: 'var(--Color-Primary-_States-Selected)',
                                    },

                                    '&.Mui-selected:hover': {
                                        backgroundColor: 'var(--Color-Primary-_States-Selected)',
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
                    gap: isExpanded ? '40px' : '24px',
                }}>
                    {bottomItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{
                            display: 'block',
                            width: isExpanded ? '100%' : '70px',
                            alignSelf: isExpanded ? 'stretch' : 'center',
                        }}>
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
                        // mt: 2
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