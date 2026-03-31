import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#6B63FF",
            contrastText: "#FFFFFF",
        },
        text: {
            primary: "#0F172A",
            secondary: "#64748B",
        },
        background: {
            default: "#F8FAFC",
            paper: "#FFFFFF",
        },
        divider: "#E2E8F0",
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
                        boxShadow: theme.shadows[2],

                        "&:hover": {
                            boxShadow: theme.shadows[4],
                            background: "var(--Color-Primary-Dark)",
                        },

                        "&:active": {
                            boxShadow: theme.shadows[6],
                            background: "var(--Color-Primary-Main)",
                        },

                        "&.Mui-focusVisible": {
                            boxShadow: theme.shadows[6],
                            outline: "3px solid var(--Color-Secondary-_States-FocusVisible)",
                            outlineOffset: 2,
                        },
                    },
                }),
            },

            variants: [
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
                {
                    props: { variant: "outlined" },
                    style: {
                        "--variant-outlinedBorder": "var(--Color-Secondary-_States-Outlined)",
                        color: "var(--Color-Secondary-Main)",
                    },
                },
                {
                    props: { variant: "text" },
                    style: {
                        color: "var(--Color-Primary-Main)",
                    },
                },
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
});

export default theme;