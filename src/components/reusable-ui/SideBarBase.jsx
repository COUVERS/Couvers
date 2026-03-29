import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const drawerWidth = 240
export const shrunkWidth = 88

export const SidebarBase = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerCustomWidth'
})(({ theme, open, drawerCustomWidth }) => ({
    width: drawerCustomWidth || (open ? drawerWidth : shrunkWidth),
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--color-surface)',
    boxShadow: '0 6px 30px 5px rgba(0, 0, 0, 0.12)',
    padding: '40px 0',
    boxSizing: 'border-box',
    position: 'sticky',
    top: 0,
    alignSelf: 'flex-start',
}))

export default SidebarBase