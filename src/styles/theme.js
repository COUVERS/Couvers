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
        fontFamily: '"IBM Plex Sans", system-ui, -apple-system, sans-serif',
        button: { textTransform: "none", fontWeight: 500 },
    },

    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: false,
            },

            styleOverrides: {
                root: ({ theme }) => ({
                    gap: 8,

                    "&.MuiButton-contained": {
                        boxShadow: theme.shadows[2], // Default

                        "&:hover": {
                            boxShadow: theme.shadows[4],
                            background: "var(--Color-Primary-Dark)"// Hover
                        },

                        "&:active": {
                            boxShadow: theme.shadows[6],
                            background: "var(--Color-Primary-Main)" // Press
                        },

                        "&.Mui-focusVisible": {
                            boxShadow: theme.shadows[6], // Focus shadow
                            outline: "3px solid var(--Color-Secondary-_States-FocusVisible)", // Focus ring
                            outlineOffset: 2,
                        },
                    },
                }),
            },

            variants: [
                //contained = Primary
                {
                    props: { variant: "contained" },
                    style: {
                        background: "var(--Color-Primary-Main)",
                        color: "var(--Color-Primary-Contrast)",

                        "&.Mui-disabled": {
                            background: "var(--Color-Action-Disabled)",
                            color: "var(--Color-Text-Disabled)",
                            boxShadow: "none",
                        },
                    },
                },

                //outlined = Secondary
                {
                    props: { variant: "outlined" },
                    style: {
                        "--variant-outlinedBorder": "var(--Color-Secondary-_States-Outlined)",
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
                        width: 160,
                        height: 48,
                        padding: "12px 22px",
                        fontSize: 15,

                    },
                },
                {
                    props: { size: "medium" },
                    style: {
                        padding: "6px 16px",
                        width: 120,
                        height: 32,
                        fontSize: 14,
                    },
                },
                {
                    props: { size: "small" },
                    style: {
                        padding: "4px 10px",
                        width: 59,
                        height: 28,
                        fontSize: 14,

                    },
                },

            ],
        },
    },
})

export default theme;