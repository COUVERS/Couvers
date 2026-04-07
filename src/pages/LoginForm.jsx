import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import LogoLarge from "../assets/Logo_large_dark.svg"
import { API_BASE_URL } from "../config"

export default function LoginForm({ onGoSignup, onLoginSuccess }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loginError, setLoginError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const validate = () => {
        let valid = true
        setEmailError("")
        setPasswordError("")
        setLoginError("")

        if (!email.trim()) {
        setEmailError("Email is required.")
        valid = false
        }

        if (!password.trim()) {
        setPasswordError("Password is required.")
        valid = false
        }

        return valid
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!validate()) return

        setLoading(true)
        setLoginError("")

        try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        const text = await res.text()

        let data
        try {
            data = JSON.parse(text)
        } catch {
            throw new Error("Server did not return valid JSON")
        }

        if (!res.ok) {
            throw new Error(data.message || "Invalid email or password.")
        }

        if (data.token) {
            localStorage.setItem("token", data.token)
        }

        if (onLoginSuccess) {
            onLoginSuccess(data)
        }
        } catch {
        setLoginError("Invalid email or password.")
        } finally {
        setLoading(false)
        }
    }

    const isSubmitDisabled = loading || !email.trim() || !password.trim()

    return (
        <Box
        sx={{
            display: "flex",
            width: "100%",
            minHeight: { xs: "100vh", md: "1024px" },
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
            bgcolor: "var(--Color-Background-Default)",
            overflowX: "hidden",
        }}
        >
        <Box
            sx={{
            display: "flex",
            width: { xs: "100%", md: "640px" },
            maxWidth: { xs: "430px", md: "640px" },
            minHeight: { xs: "100vh", md: "auto" },
            px: { xs: "40px", md: "40px" },
            py: { xs: "56px", md: "56px" },
            boxSizing: "border-box",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "48px",
            borderRadius: { xs: 0, md: "8px" },
            background: "var(--Color-Background-Paper)",
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
            }}
            >
            <Typography
                sx={{
                alignSelf: "stretch",
                color: "var(--Color-Text-Primary, #0F172A)",
                textAlign: "center",
                fontFamily: "IBM Plex Sans",
                fontSize: { xs: "40px", md: "56px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: { xs: "48px", md: "64px" },
                letterSpacing: { xs: "-0.2px", md: "-0.25px" },
                m: 0,
                }}
            >
                Welcome to
                <br />
                Our Platform
            </Typography>
            </Box>

            <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
                display: "flex",
                width: "100%",
                maxWidth: "560px",
                flexDirection: "column",
                alignItems: "center",
                gap: "48px",
            }}
            >
            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                minWidth: 0,
                }}
            >
                <TextField
                fullWidth
                variant="standard"
                label="E-mail"
                type="email"
                value={email}
                error={Boolean(emailError || loginError)}
                helperText={emailError || " "}
                onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError("")
                    if (loginError) setLoginError("")
                }}
                InputLabelProps={{ shrink: true }}
                FormHelperTextProps={{
                    sx: {
                    pt: "3px",
                    mx: 0,
                    color: "var(--Color-Error-Main)",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "var(--FontSize-Caption)",
                    fontWeight: 400,
                    lineHeight: "normal",
                    letterSpacing: "0.1px",
                    },
                }}
                sx={{
                    alignSelf: "stretch",
                    "& .MuiInputLabel-root": {
                    color: "var(--Color-Text-Secondary)",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "var(--FontSize-Caption)",
                    fontWeight: 500,
                    transform: "translate(0, -1px) scale(1)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--Color-Text-Secondary)",
                    },
                    "& .MuiInputLabel-root.Mui-error": {
                    color: "var(--Color-Error-Main)",
                    },
                    "& .MuiInputBase-root": {
                    mt: "18px",
                    width: "100%",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "var(--FontSize-Body1)",
                    color: "var(--Color-Text-Primary)",
                    },
                    "& .MuiInputBase-input": {
                    py: "10px",
                    },
                    "& .MuiInput-underline:before": {
                    borderBottom: "1px solid var(--Color-Border-Default)",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "1px solid var(--Color-Border-Default)",
                    },
                    "& .MuiInput-underline:after": {
                    borderBottom: "1px solid var(--Color-Border-Active)",
                    },
                    "& .MuiInput-underline.Mui-error:before": {
                    borderBottom: "1px solid var(--Color-Error-Main)",
                    },
                    "& .MuiInput-underline.Mui-error:hover:before": {
                    borderBottom: "1px solid var(--Color-Error-Main)",
                    },
                    "& .MuiInput-underline.Mui-error:after": {
                    borderBottom: "2px solid var(--Color-Error-Main)",
                    },
                }}
                />

                <TextField
                fullWidth
                variant="standard"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                error={Boolean(passwordError || loginError)}
                helperText={passwordError || (!passwordError && loginError) || " "}
                onChange={(e) => {
                    setPassword(e.target.value)
                    if (passwordError) setPasswordError("")
                    if (loginError) setLoginError("")
                }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        disableRipple
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        sx={{
                            p: 0,
                            color: "action.active",
                        }}
                        >
                        {showPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 20, color: "action.active" }} />
                        ) : (
                        <VisibilityIcon sx={{ fontSize: 20, color: "action.active" }} />
                        )}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                FormHelperTextProps={{
                    sx: {
                    pt: "3px",
                    mx: 0,
                    color: "var(--Color-Error-Main)",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "var(--FontSize-Caption)",
                    fontWeight: 400,
                    lineHeight: "normal",
                    letterSpacing: "0.1px",
                    },
                }}
                sx={{
                    alignSelf: "stretch",
                    "& .MuiInputLabel-root": {
                    color: "var(--Color-Text-Secondary)",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "var(--FontSize-Caption)",
                    fontWeight: 500,
                    transform: "translate(0, -1px) scale(1)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--Color-Text-Secondary)",
                    },
                    "& .MuiInputLabel-root.Mui-error": {
                    color: "var(--Color-Error-Main)",
                    },
                    "& .MuiInputBase-root": {
                    mt: "18px",
                    width: "100%",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "var(--FontSize-Body1)",
                    color: "var(--Color-Text-Primary)",
                    },
                    "& .MuiInputBase-input": {
                    py: "10px",
                    },
                    "& .MuiInput-underline:before": {
                    borderBottom: "1px solid var(--Color-Border-Default)",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "1px solid var(--Color-Border-Default)",
                    },
                    "& .MuiInput-underline:after": {
                    borderBottom: "1px solid var(--Color-Border-Active)",
                    },
                    "& .MuiInput-underline.Mui-error:before": {
                    borderBottom: "1px solid var(--Color-Error-Main)",
                    },
                    "& .MuiInput-underline.Mui-error:hover:before": {
                    borderBottom: "1px solid var(--Color-Error-Main)",
                    },
                    "& .MuiInput-underline.Mui-error:after": {
                    borderBottom: "2px solid var(--Color-Error-Main)",
                    },
                }}
                />

                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "stretch",
                    flexWrap: "wrap",
                }}
                >
                <Typography
                    sx={{
                    color: "#000",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "var(--FontSize-Body1, 16px)",
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: "var(--LetterSpace-Body1, 0.16px)",
                    }}
                >
                    Forgot your password?
                </Typography>

                <Link
                    component={RouterLink}
                    to="/forgot-password"
                    underline="always"
                    sx={{
                    color: "var(--Color-Info-Main)",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "var(--FontSize-Body1, 16px)",
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: "var(--LetterSpace-Body1, 0.16px)",
                    textDecorationColor: "rgba(59, 130, 246, 0.4)",
                    textUnderlineOffset: "3px",
                    }}
                >
                    Reset Password
                </Link>
                </Box>

                <Button
                type="submit"
                size="large"
                disabled={isSubmitDisabled}
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "48px",
                    mt: "48px",
                    px: "24px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "4px",
                    textTransform: "none",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "15px",
                    fontWeight: 500,
                    letterSpacing: "0.2px",
                    backgroundColor: "var(--Color-Primary-Main)",
                    color: "var(--Color-Primary-Contrast)",
                    boxShadow:
                    "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",
                    "&:hover": {
                    backgroundColor: "var(--Color-Primary-Main)",
                    },
                    "&.Mui-disabled": {
                    backgroundColor: "var(--Color-Action-Disabled)",
                    color: "var(--Color-Text-Disabled, #94A3B8)",
                    boxShadow: "none",
                    opacity: 1,
                    },
                }}
                >
                {loading ? "Signing In..." : "Sign In"}
                </Button>
            </Box>

            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "center",
                flexWrap: "wrap",
                }}
            >
                <Typography
                sx={{
                    color: "var(--Color-Text-Primary)",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "var(--FontSize-Body1)",
                    fontWeight: 400,
                    lineHeight: "var(--LineHeight-Body1)",
                    letterSpacing: "var(--LetterSpace-Body1)",
                }}
                >
                No Account?
                </Typography>

                <Link
                component="button"
                type="button"
                onClick={onGoSignup}
                underline="always"
                sx={{
                    color: "var(--Color-Info-Main)",
                    fontFamily: "IBM Plex Sans",
                    fontSize: "var(--FontSize-Body1)",
                    fontWeight: 400,
                    lineHeight: "var(--LineHeight-Body1)",
                    letterSpacing: "var(--LetterSpace-Body1)",
                    textDecorationColor: "rgba(59, 130, 246, 0.4)",
                    textUnderlineOffset: "3px",
                }}
                >
                Join Us
                </Link>
            </Box>
            </Box>
        </Box>
        </Box>
    )
}