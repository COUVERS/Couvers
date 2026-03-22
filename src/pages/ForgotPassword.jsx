import { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import {
    Box,
    Button,
    Link,
    TextField,
    Typography,
} from "@mui/material"
import LogoLarge from "../assets/Logo_large_dark.png"
import "../auth.css"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const validateEmailFormat = value =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    const trimmedEmail = email.trim()
    const isEmailFilled = trimmedEmail !== ""
    const isEmailValid = validateEmailFormat(trimmedEmail)
    const isSubmitDisabled = loading || !isEmailFilled || !isEmailValid

    const handleSubmit = async e => {
        e.preventDefault()
        setEmailError("")

        if (!trimmedEmail) {
        setEmailError("Email is required.")
        return
        }

        if (!validateEmailFormat(trimmedEmail)) {
        setEmailError("Please enter a valid email address.")
        return
        }

        if (!API_BASE_URL) {
        setEmailError("Something went wrong. Please try again later.")
        return
        }

        try {
        setLoading(true)

        const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: trimmedEmail }),
        })

        let data = {}
        try {
            data = await res.json()
        } catch {
            data = {}
        }

        if (!res.ok) {
            setEmailError(data.message || "Unable to send reset link. Please try again.")
            return
        }

        navigate("/forgot-password/sent", {
            state: { email: trimmedEmail },
        })
        } catch (err) {
        console.error("Forgot password error:", err)
        setEmailError("Something went wrong. Please try again later.")
        } finally {
        setLoading(false)
        }
    }

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
            component="form"
            onSubmit={handleSubmit}
            sx={{
            display: "flex",
            width: "640px",
            height: "706px",
            padding: "56px 40px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "48px",
            borderRadius: "8px",
            bgcolor: "#FFF",
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
                color: "#0F172A",
                textAlign: "center",
                fontFamily: "IBM Plex Sans",
                fontSize: "56px",
                fontWeight: 600,
                lineHeight: "60px",
                letterSpacing: "-0.56px",
            }}
            >
            Forgot Password?
            </Typography>

            <Typography
            sx={{
                height: "47px",
                alignSelf: "stretch",
                color: "#0F172A",
                textAlign: "center",
                fontFamily: "IBM Plex Sans",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "normal",
            }}
            >
            Enter your email address and we&apos;ll send you a link to reset your
            password.
            </Typography>

            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "32px",
                alignSelf: "stretch",
                width: "100%",
            }}
            >
            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                }}
            >
                <TextField
                fullWidth
                variant="standard"
                label="E-mail"
                type="email"
                value={email}
                error={Boolean(emailError)}
                helperText={emailError || " "}
                onChange={e => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError("")
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                FormHelperTextProps={{
                    sx: {
                    pt: "3px",
                    mx: 0,
                    color: "#EF4444",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "normal",
                    letterSpacing: "0.1px",
                    },
                }}
                sx={{
                    alignSelf: "stretch",
                    "& .MuiInputLabel-root": {
                    color: "#64748B",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "normal",
                    transform: "translate(0, -1px) scale(1)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: emailError ? "#EF4444" : "#64748B",
                    },
                    "& .MuiInputBase-root": {
                    mt: "18px",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "16px",
                    color: "#0F172A",
                    },
                    "& .MuiInputBase-input": {
                    py: "10px",
                    },
                    "& .MuiInput-underline:before": {
                    borderBottom: "1px solid #CBD5E1",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: `1px solid ${emailError ? "#EF4444" : "#CBD5E1"}`,
                    },
                    "& .MuiInput-underline:after": {
                    borderBottom: `1px solid ${emailError ? "#EF4444" : "#6B63FF"}`,
                    },
                }}
                />
            </Box>

            <Button
                type="submit"
                size="large"
                disabled={isSubmitDisabled}
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

                backgroundColor: "#6B63FF",
                color: "#FFF",
                boxShadow:
                "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",

                "&:hover": {
                backgroundColor: "#6B63FF",
                },

                "&.Mui-disabled": {
                backgroundColor: "#E2E8F0", // Color-Action-Disabled
                color: "#94A3B8",           // Text-Disabled
                boxShadow: "none",
                },
            }}
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                }}
            >
                <Typography
                sx={{
                    color: "#0F172A",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                }}
                >
                Back to
                </Typography>

                <Link
                component={RouterLink}
                to="/login"
                underline="always"
                sx={{
                    color: "#3B82F6",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    textDecorationColor: "rgba(59, 130, 246, 0.4)",
                    textUnderlineOffset: "3px",
                }}
                >
                Sign In
                </Link>
            </Box>
            </Box>
        </Box>
        </Box>
    )
}