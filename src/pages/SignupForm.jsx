import { useState } from "react"
import {
    Box,
    Button,
    Link,
    TextField,
    Typography,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import LogoLarge from "../assets/Logo_large_dark.png"
import Visibility from "../assets/icons/Visibility"
import VisibilityOff from "../assets/icons/VisibilityOff"
import { API_BASE_URL } from "../config"

export default function SignupForm({ onGoLogin }) {
    const [step, setStep] = useState(1)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const validateEmailFormat = value => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }

    const validateEmailStep = () => {
        setEmailError("")

        if (!email.trim()) {
        setEmailError("Email is required.")
        return false
        }

        if (!validateEmailFormat(email)) {
        setEmailError("Please enter a valid email address.")
        return false
        }

        if (
        !email.endsWith("@codyacademy.edu") &&
        !email.endsWith("@tete.edu")
        ) {
        setEmailError("This email domain is not registered for a corporate account.")
        return false
        }

        return true
    }

    const validatePasswordStep = () => {
        let valid = true
        setPasswordError("")
        setConfirmPasswordError("")

        if (!password.trim()) {
        setPasswordError("Password is required.")
        valid = false
        } else if (password.length < 6) {
        setPasswordError("Minimum 6 characters required.")
        valid = false
        }

        if (!confirmPassword.trim()) {
        setConfirmPasswordError("Please confirm your password.")
        valid = false
        } else if (confirmPassword !== password) {
        setConfirmPasswordError("Passwords must match.")
        valid = false
        }

        return valid
    }

    const handleContinue = e => {
        e.preventDefault()

        if (validateEmailStep()) {
        setStep(2)
        }
    }

    const handleSignup = async e => {
        e.preventDefault()

        if (!validatePasswordStep()) return

        setLoading(true)

        try {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.message || "Signup failed")
        }

        if (onGoLogin) {
            onGoLogin()
        }
        } catch (err) {
        setEmailError(err.message || "Signup failed.")
        setStep(1)
        } finally {
        setLoading(false)
        }
    }
    const trimmedEmail = email.trim()

    const isEmailStepValid =
        !!trimmedEmail &&
        validateEmailFormat(trimmedEmail) &&
        (trimmedEmail.endsWith("@codyacademy.edu") ||
            trimmedEmail.endsWith("@tete.edu")) &&
        !emailError

    const isSubmitDisabled = loading || !trimmedEmail || !!emailError

    const isPasswordStepValid =
        !!password.trim() &&
        !!confirmPassword.trim() &&
        password.length >= 6 &&
        confirmPassword === password &&
        !passwordError &&
        !confirmPasswordError

    const isPasswordSubmitDisabled = !isPasswordStepValid || loading

    return (
        <Box
            sx={{
                display: "flex",
                width: "1440px",
                height: "1024px",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
                flexShrink: 0,
                mx: "auto",
                bgcolor: "var(--Color-Background-Default)",
            }}
        >
        <Box
            sx={{
            display: "flex",
            width: "640px",
            height: "802px",
            padding: "56px 40px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--6, 48px)",
            flexShrink: 0,
            borderRadius: "8px",
            backgroundColor: "var(--Color-Background-Paper)",
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

        <Box
            sx={{
                display: "flex",
                height: "134px",
                padding: "0 38px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "var(--5, 40px)",
                alignSelf: "stretch",
            }}
        >
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
            Get started
        </Typography>
        </Box>

        {step === 1 ? (
        <Box
            component="form"
            onSubmit={handleContinue}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "48px",
                alignSelf: "stretch",
                width: "560px",
                mx: "auto",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
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
                    const value = e.target.value
                    setEmail(value)

                    if (!value.trim()) {
                        setEmailError("")
                        return
                    }

                    if (!validateEmailFormat(value)) {
                        setEmailError("Please enter a valid email address.")
                    } else if (
                        !value.endsWith("@codyacademy.edu") &&
                        !value.endsWith("@tete.edu")
                    ) {
                        setEmailError("This email domain is not registered for a corporate account.")
                    } else {
                        setEmailError("")
                    }
                    }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    FormHelperTextProps={{
                    sx: {
                        pt: "3px",
                        mx: 0,
                        color: "var(--Color-Error-Main)",
                        fontFamily: "var(--font-family)",
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
                        fontFamily: "var(--font-family)",
                        fontSize: "var(--FontSize-Caption)",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "normal",
                        transform: "translate(0, -1px) scale(1)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: emailError ? "#EF4444" : "#64748B",
                    },
                    "& .MuiInputBase-root": {
                        mt: "18px",
                        fontFamily: "var(--font-family)",
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
                    fontFamily: "var(--font-family)",
                    fontSize: "15px",
                    fontWeight: 500,
                    lineHeight: "normal",
                    letterSpacing: "0.2px",
                    whiteSpace: "nowrap",

                    mx: "auto", 

                    backgroundColor: "var(--Color-Primary-Main)",
                    color: "var(--Color-Primary-Contrast)",
                    boxShadow:
                    "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",

                    "&:hover": {
                    backgroundColor: "#6B63FF",
                    },

                    "&.Mui-disabled": {
                    backgroundColor: "var(--Color-Action-Disabled)",
                    color: "var(--Color-Text-Disabled)",
                    boxShadow: "none",
                    opacity: 1,
                    },
                }}
            >
                {isEmailStepValid ? "Continue" : "Sign Up"}
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
                    color: "var(--Color-Text-Primary)",
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--FontSize-Body1)",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: "0",
                    }}
                >
                    Already have an account?
                </Typography>

                <Link
                    component="button"
                    type="button"
                    onClick={onGoLogin}
                    underline="always"
                    sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    color: "var(--Color-Info-Main)",
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--FontSize-Body1)",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: "0",
                    textDecorationColor: "rgba(59, 130, 246, 0.4)",
                    textUnderlineOffset: "3px",
                    }}
                >
                    Sign In
                </Link>
                </Box>

                <Typography
                sx={{
                    alignSelf: "stretch",
                    color: "var(--Color-Text-Primary)",
                    textAlign: "center",
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--FontSize-Body1)",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: "0",
                }}
                >
                This service requires a corporate license agreement.
                <br />
                Individual sign-ups are not available.
                </Typography>
            </Box>
            ) : (
            <Box component="form" onSubmit={handleSignup}>
            </Box>
            )}

        {step === 2 ? (
            <Box
                component="form"
                onSubmit={handleSignup}
                sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "48px",
                alignSelf: "stretch",
                width: "560px",
                mx: "auto",
                }}
            >
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                }}
                >
                <TextField
                    fullWidth
                    variant="standard"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    error={Boolean(passwordError || confirmPasswordError)}
                    helperText={passwordError || ""}
                    onChange={(e) => {
                    const value = e.target.value
                    setPassword(value)

                    if (!value.trim()) {
                        setPasswordError("")
                    } else if (value.length < 6) {
                        setPasswordError("Minimum 6 characters required.")
                    } else {
                        setPasswordError("")
                    }

                    if (confirmPassword) {
                        if (confirmPassword !== value) {
                        setConfirmPasswordError("Passwords must match.")
                        } else {
                        setConfirmPasswordError("")
                        }
                    }
                    }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                    endAdornment: (
                        <Box
                        component="button"
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 0,
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                        {showPassword ? (
                            <VisibilityOff size={20} color="var(--Color-Primary-Main)" />
                        ) : (
                            <Visibility size={20} color="var(--Color-Primary-Main)" />
                        )}
                        </Box>
                    ),
                    }}
                    FormHelperTextProps={{
                    sx: {
                        pt: "3px",
                        mx: 0,
                        color: passwordError
                        ? "var(--Color-Error-Main)"
                        : "var(--Color-Text-Secondary)",
                        fontFamily: "var(--font-family)",
                        fontSize: "var(--FontSize-Caption)",
                        fontWeight: 400,
                        lineHeight: "normal",
                        letterSpacing: "0.1px",
                    },
                    }}
                    sx={{
                    "& .MuiInputLabel-root": {
                        color: "var(--Color-Text-Secondary)",
                        fontFamily: "var(--font-family)",
                        fontSize: "var(--FontSize-Caption)",
                        fontWeight: 500,
                        lineHeight: "normal",
                        transform: "translate(0, -1px) scale(1)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: passwordError
                        ? "var(--Color-Error-Main)"
                        : "var(--Color-Text-Secondary)",
                    },
                    "& .MuiInputBase-root": {
                        mt: "18px",
                        width: "560px",
                        mx: "auto",
                        fontFamily: "var(--font-family)",
                        fontSize: "var(--FontSize-Body1)",
                        color: "var(--Color-Text-Primary)",
                    },
                    "& .MuiInputBase-input": {
                        py: "10px",
                    },
                    "& .MuiInput-underline:before": {
                        borderBottom: `1px solid ${
                        passwordError || confirmPasswordError
                            ? "var(--Color-Error-Main)"
                            : "var(--Color-Border-Default)"
                        }`,
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottom: `1px solid ${
                        passwordError
                            ? "var(--Color-Error-Main)"
                            : "var(--Color-Border-Default)"
                        }`,
                    },
                    "& .MuiInput-underline:after": {
                        borderBottom: `1px solid ${
                        passwordError || confirmPasswordError
                            ? "var(--Color-Error-Main)"
                            : "var(--Color-Border-Active)"
                        }`,
                    },
                    }}
                />
                </Box>

                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "6px",
                    alignSelf: "stretch",
                }}
                >
                <TextField
                    fullWidth
                    variant="standard"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    error={Boolean(confirmPasswordError)}
                    helperText={confirmPasswordError || " "}
                    onChange={(e) => {
                    const value = e.target.value
                    setConfirmPassword(value)

                    if (!value.trim()) {
                        setConfirmPasswordError("")
                    } else if (value !== password) {
                        setConfirmPasswordError("Passwords must match.")
                    } else {
                        setConfirmPasswordError("")
                    }
                    }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                    endAdornment: (
                        <Box
                        component="button"
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 0,
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                        {showConfirmPassword ? (
                            <VisibilityOff size={20} color="var(--Color-Primary-Main)" />
                        ) : (
                            <Visibility size={20} color="var(--Color-Primary-Main)" />
                        )}
                        </Box>
                    ),
                    }}
                    FormHelperTextProps={{
                    sx: {
                        pt: "3px",
                        mx: 0,
                        color: "var(--Color-Error-Main)",
                        fontFamily: "var(--font-family)",
                        fontSize: "var(--FontSize-Caption)",
                        fontWeight: 400,
                        lineHeight: "normal",
                        letterSpacing: "0.1px",
                    },
                    }}
                    sx={{
                    "& .MuiInputLabel-root": {
                        color: "var(--Color-Text-Secondary)",
                        fontFamily: "var(--font-family)",
                        fontSize: "var(--FontSize-Caption)",
                        fontWeight: 500,
                        lineHeight: "normal",
                        transform: "translate(0, -1px) scale(1)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: confirmPasswordError
                        ? "var(--Color-Error-Main)"
                        : "var(--Color-Text-Secondary)",
                    },
                    "& .MuiInputBase-root": {
                        mt: "18px",
                        width: "560px",
                        mx: "auto",
                        fontFamily: "var(--font-family)",
                        fontSize: "var(--FontSize-Body1)",
                        color: "var(--Color-Text-Primary)",
                    },
                    "& .MuiInputBase-input": {
                        py: "10px",
                    },
                    "& .MuiInput-underline:before": {
                        borderBottom: `1px solid ${
                        confirmPasswordError
                            ? "var(--Color-Error-Main)"
                            : "var(--Color-Border-Default)"
                        }`,
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottom: `1px solid ${
                        confirmPasswordError
                            ? "var(--Color-Error-Main)"
                            : "var(--Color-Border-Default)"
                        }`,
                    },
                    "& .MuiInput-underline:after": {
                        borderBottom: `1px solid ${
                        confirmPasswordError
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
                disabled={isPasswordSubmitDisabled}
                sx={{
                    display: "flex",
                    width: "560px",
                    height: "48px",
                    padding: "8px 24px",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                    borderRadius: "4px",
                    textTransform: "none",
                    fontFamily: "var(--font-family)",
                    fontSize: "15px",
                    fontWeight: 500,
                    lineHeight: "normal",
                    letterSpacing: "0.2px",
                    whiteSpace: "nowrap",
                    mx: "auto",
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
                {isPasswordStepValid ? "Sign In" : "Continue"}
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
                    color: "var(--Color-Text-Primary)",
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--FontSize-Body1)",
                    fontWeight: 400,
                    lineHeight: "var(--LineHeight-Body1)",
                    letterSpacing: "var(--LetterSpace-Body1)",
                    }}
                >
                    Already have an account?
                </Typography>

                <Link
                    component="button"
                    type="button"
                    onClick={onGoLogin}
                    underline="always"
                    sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
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

                <Typography
                sx={{
                    alignSelf: "stretch",
                    color: "var(--Color-Text-Primary)",
                    textAlign: "center",
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--FontSize-Body1)",
                    fontWeight: 400,
                    lineHeight: "var(--LineHeight-Body1)",
                    letterSpacing: "var(--LetterSpace-Body1)",
                }}
                >
                This service requires a corporate license agreement.
                <br />
                Individual sign-ups are not available.
                </Typography>
            </Box>
            ) : null}
        </Box>
        </Box>
    )
}