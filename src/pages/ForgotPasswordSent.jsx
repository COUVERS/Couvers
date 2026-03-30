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
            width: { xs: "100%", md: "1440px" },
            minHeight: { xs: "100vh", md: "1024px" },
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--5, 40px)",
            flexShrink: 0,
            mx: "auto",
            bgcolor: "#F8FAFC",
        }}
    >
    <Box
            sx={{
                display: "flex",
                width: { xs: "430px", md: "640px" },
                height: { xs: "606px", md: "606px" },
                padding: "56px 40px",
                boxSizing: "border-box",
                flexDirection: "column",
                justifyContent: { xs: "flex-start", md: "center" },
                alignItems: "center",
                gap: "48px",
                borderRadius: { xs: 0, md: "8px" },
                bgcolor: "var(--Color-Background-Paper, #FFF)",
                boxShadow: {
                xs: "none",
                md: "0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.20)",
                },
            }}
        >
        <Box
            component="img"
            src={LogoLarge}
            alt="TeTe"
            sx={{
                width: "207px",
                height: "91.747px",
                flexShrink: 0,
                objectFit: "contain",
            }}
        />

        <Typography
            sx={{
                alignSelf: "stretch",
                color: "var(--Color-Text-Primary, #0F172A)",
                textAlign: "center",
                fontFamily: "IBM Plex Sans",
                fontSize: { xs: "40px", md: "56px" },
                fontWeight: 600,
                lineHeight: { xs: "48px", md: "60px" },
                letterSpacing: { xs: "-0.2px", md: "-0.56px" },
            }}
        >
            Check Your Email
        </Typography>

        <Typography
            sx={{
                alignSelf: "stretch",
                color: "var(--Color-Text-Primary, #0F172A)",
                textAlign: "center",
                fontFamily: "IBM Plex Sans",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
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

        <Box
            sx={{
                width: { xs: "100%", md: "560px" },
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
                padding: "8px 24px",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                borderRadius: "4px",
                textTransform: "none",
                fontFamily: "IBM Plex Sans",
                fontSize: "15px",
                fontWeight: 500,
                lineHeight: "normal",
                letterSpacing: "0.2px",
                whiteSpace: "nowrap",
                mx: "auto",
                backgroundColor: "#6B63FF",
                color: "#FFF",
                boxShadow:
                    "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
                "&:hover": {
                    backgroundColor: "#6B63FF",
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