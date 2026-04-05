import { Link as RouterLink, useLocation } from "react-router-dom"
import { Box, Button, Typography } from "@mui/material"
import LogoLarge from "../assets/Logo_large_dark.png"

export default function ForgotPasswordSent() {
    const location = useLocation()
    const email = location.state?.email || ""

    return (
        <Box
        sx={{
            display: "flex",
            width: "100%",
            minHeight: { xs: "100vh", md: "1024px" },
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
            bgcolor: "var(--Color-Background-Default, #F8FAFC)",
            overflowX: "hidden",
        }}
        >
        <Box
            sx={{
            display: "flex",
            width: { xs: "100%", md: "640px" },
            maxWidth: { xs: "430px", md: "640px" },
            height: { xs: "606px", md: "606px" },
            px: { xs: "40px", md: "40px" },
            py: { xs: "56px", md: "56px" },
            boxSizing: "border-box",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "48px",
            borderRadius: { xs: 0, md: "8px" },
            bgcolor: "var(--Color-Background-Paper, #FFF)",
            boxShadow: {
                xs: "none",
                md: "0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.20)",
            },
            overflow: "hidden",
            }}
        >
            <Box
            component="img"
            src={LogoLarge}
            alt="TeTe"
            sx={{
                width: "207px",
                height: "auto",
                objectFit: "contain",
            }}
            />

            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
                px: { xs: 0, md: "38px" },
                boxSizing: "border-box",
                gap: "40px",
            }}
            >
            <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
            >
            <Typography
                sx={{
                width: "300px",
                textAlign: "center",
                color: "var(--Color-Text-Primary, #0F172A)",
                fontFamily: "IBM Plex Sans",
                fontSize: { xs: "40px", md: "56px" },
                fontWeight: 600,
                lineHeight: { xs: "48px", md: "64px" },
                letterSpacing: { xs: "-0.2px", md: "-0.25px" },
                m: 0,
                }}
            >
                Check Your
                <br />
                Email
            </Typography>
            </Box>

            <Typography
                sx={{
                alignSelf: "stretch",
                color: "var(--Color-Text-Primary, #0F172A)",
                textAlign: "center",
                fontFamily: "IBM Plex Sans",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                letterSpacing: "0.16px",
                wordBreak: "break-word",
                }}
            >
                We sent a password reset link to{" "}
                <Box
                component="span"
                sx={{
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                }}
                >
                {email}
                </Box>
            </Typography>
            </Box>

            <Box
            sx={{
                width: "100%",
                maxWidth: "560px",
            }}
            >
            <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                size="large"
                sx={{
                display: "flex",
                width: "100%",
                height: "48px",
                px: "24px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px",
                textTransform: "none",
                fontFamily: "IBM Plex Sans",
                fontSize: "15px",
                fontWeight: 500,
                lineHeight: "normal",
                letterSpacing: "0.2px",
                whiteSpace: "nowrap",
                mx: "auto",
                backgroundColor: "var(--Color-Primary-Main, #6B63FF)",
                color: "var(--Color-Primary-Contrast, #FFF)",
                boxShadow:
                    "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
                "&:hover": {
                    backgroundColor: "var(--Color-Primary-Main, #6B63FF)",
                },
                }}
            >
                Back to Sign In
            </Button>
            </Box>
        </Box>
        </Box>
    )
}