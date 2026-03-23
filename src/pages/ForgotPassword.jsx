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

    const validateEmailFormat = (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    const trimmedEmail = email.trim()
    const isEmailFilled = trimmedEmail !== ""
    const isEmailValid = validateEmailFormat(trimmedEmail)
    const isSubmitDisabled = loading || !isEmailFilled || !isEmailValid

    const handleSubmit = async (e) => {
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
            display: "flex",
            width: "1440px",
            height: "1024px",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--5, 40px)",
            flexShrink: 0,
            mx: "auto",
            bgcolor: "var(--Color-Background-Default)",
        }}
        >
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
            display: "flex",
            width: "640px",
            height: "706px",
            padding: "var(--7, 56px) var(--5, 40px)",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--6, 48px)",
            flexShrink: 0,
            borderRadius: "var(--md, 8px)",
            bgcolor: "var(--Color-Background-Paper)",
            boxShadow:
                "0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.20)",
            }}
        >
        <Box
            component="img"
            src={LogoLarge}
            alt="TeTe"
            sx={{
                display: "flex",
                width: "207px",
                height: "91.747px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                flexShrink: 0,
                aspectRatio: "207 / 91.75",
                objectFit: "contain",
            }}
        />

        <Typography
            sx={{
                alignSelf: "stretch",
                color: "var(--Color-Text-Primary)",
                textAlign: "center",
                fontFamily: "var(--font-family)",
                fontSize: "var(--FontSize-Display-Medium)",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "var(--LineHeight-Display-Medium)",
                letterSpacing: "var(--LetterSpace-DisplayMedium)",
            }}
        >
        Forgot Password?
        </Typography>

        <Typography
            sx={{
                height: "47px",
                alignSelf: "stretch",
                color: "var(--Color-Text-Primary)",
                textAlign: "center",
                fontFamily: "var(--font-family)",
                fontSize: "var(--FontSize-Body1)",
                fontStyle: "normal",
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
                gap: "var(--6, 48px)",
                alignSelf: "stretch",
            }}
        >
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                mx:"auto",
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
                onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError("")
                }}
                InputLabelProps={{ shrink: true }}
                FormHelperTextProps={{
                    sx: {
                    pt: "3px",
                    mx: 0,
                    color: "var(--Color-Error-Main)",
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--FontSize-Caption)",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    letterSpacing: "0.1px",
                    },
                }}
                sx={{
                    alignSelf: "stretch",
                    "& .MuiInputLabel-root": {
                    color: "var(--Color-Text-Secondary)",
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--FontSize-Caption)",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                    transform: "translate(0, -1px) scale(1)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color:
                        emailError
                        ? "var(--Color-Error-Main)"
                        : "var(--Color-Text-Secondary)",
                    },
                    "& .MuiInputBase-root": {
                    mt: "18px",
                    width: "560px",
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--FontSize-Body1)",
                    color: "var(--Color-Text-Primary)",
                    },
                    "& .MuiInputBase-input": {
                    py: "10px",
                    },
                    "& .MuiInput-underline:before": {
                    borderBottom: `1px solid ${
                        emailError
                        ? "var(--Color-Error-Main)"
                        : "var(--Color-Border-Default)"
                    }`,
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: `1px solid ${
                        emailError
                        ? "var(--Color-Error-Main)"
                        : "var(--Color-Border-Default)"
                    }`,
                    },
                    "& .MuiInput-underline:after": {
                    borderBottom: `1px solid ${
                        emailError
                        ? "var(--Color-Error-Main)"
                        : "var(--Color-Border-Active)"
                    }`,
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
                borderRadius: "var(--borderRadius, 4px)",
                textTransform: "none",
                fontFamily: "var(--font-family)",
                fontSize: "15px",
                fontWeight: 500,
                lineHeight: "normal",
                letterSpacing: "0.2px",
                whiteSpace: "nowrap",
                backgroundColor: "var(--Color-Primary-Main)",
                color: "var(--Color-Primary-Contrast)",
                boxShadow:
                    "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
                "&:hover": {
                    backgroundColor: "var(--Color-Primary-Main)",
                },
                "&.Mui-disabled": {
                    backgroundColor: "var(--Color-Action-Disabled)",
                    color: "var(--Color-Text-Disabled)",
                    boxShadow: "none",
                    opacity: 1,
                },
            }}
        >
            {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "var(--md, 8px)",
            }}
        >
        <Typography
            sx={{
                color: "var(--Color-Text-Primary)",
                fontFamily: "var(--font-family)",
                fontSize: "var(--FontSize-Body1)",
                fontWeight: 400,
                lineHeight: "var(--LineHeight-Body1)",
                letterSpacing: "var(--LetterSpace-Body1)",
            }}
        >
        Back to
        </Typography>

        <Link
            component={RouterLink}
            to="/login"
            underline="always"
            sx={{
                color: "var(--Color-Info-Main)",
                fontFamily: "var(--font-family)",
                fontSize: "var(--FontSize-Body1)",
                fontWeight: 400,
                lineHeight: "var(--LineHeight-Body1)",
                letterSpacing: "var(--LetterSpace-Body1)",
                textDecorationColor: "var(--Color-Primary-_States-Outlined)",
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