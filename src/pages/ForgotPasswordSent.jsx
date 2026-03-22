import { Link as RouterLink, useLocation } from "react-router-dom"
import { Box, Button, Link, Typography } from "@mui/material"
import LogoLarge from "../assets/Logo_large_dark.png"

export default function ForgotPasswordSent() {
    const location = useLocation()
    const email = location.state?.email || ""

    return (
        <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            bgcolor: "#F8FAFC",
        }}
        >
        <Box
            sx={{
            display: "flex",
            width: "640px",
            height: "606px",
            padding: "var(--7, 56px) var(--5, 40px)",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--6, 48px)",
            borderRadius: "var(--md, 8px)",
            bgcolor: "var(--Color-Background-Paper, #FFF)",
            boxShadow:
                "0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.20)",
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
                fontSize: "56px",
                fontWeight: 600,
                lineHeight: "60px",
                letterSpacing: "-0.56px",
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
                lineHeight: "normal",
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

        <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            size="large"
            sx={{
                display: "flex",
                width: "var(--Button-Dialog, 560px)",
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
    )
}