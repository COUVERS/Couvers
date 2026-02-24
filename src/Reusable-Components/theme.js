import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5C67F2',
        },
        secondary: {
            main: '#2D2D39',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none', //prevent capitalized
                    fontWeight: 600,
                },
            },
        },
    },
})

export default theme;