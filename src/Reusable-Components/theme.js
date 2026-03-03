import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#6B63FF",
        },
        text: {
            primary: "#FFF",
        },
    },
    shape: { borderRadius: 4 },
    typography: {
        fontFamily: "IBM Plex Sans",
        button: { textTransform: "none", fontWeight: 500 },
    },

    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },

            styleOverrides: {
                root: {
                    gap: 8,
                    "&.Mui-focusVisible": {
                        outline: "3px solid var(--Color-Secondary-_States-FocusVisible)",
                        outlineOffset: 2,
                    },
                },
            },

            variants: [
                //contained = Primary
                {
                    props: { variant: "contained" },
                    style: {
                        background: "var(--Color-Primary-Main)",
                        color: "var(--Color-Primary-Contrast)"
                    },
                },

                //outlined = Secondary
                {
                    props: { variant: "outlined" },
                    style: {
                        border: "1.5px solid var(--Color-Border-Default)",
                        color: "var(--Color-Secondary-Main)"
                    },
                },

                //text = Tertiary
                {
                    props: { variant: "text" },
                    style: {
                        color: "var(--Color-Primary-Main)"
                    },
                },

                //Size
                {
                    props: { size: "large" },
                    style: {
                        width: "160px",
                        height: 48,
                        paddingInline: 18,
                        fontSize: 15,
                        fontWeight: 500,
                        lineHeight: "normal",
                        letterSpacing: "0.2px"
                    },
                },
                {
                    props: { size: "medium" },
                    style: { height: 40, paddingInline: 14, fontSize: 14 },
                },
                {
                    props: { size: "small" },
                    style: { height: 32, paddingInline: 12, fontSize: 13 },
                },

            ],
        },
    },
})

export default theme;