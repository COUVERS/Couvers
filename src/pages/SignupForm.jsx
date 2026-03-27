import { useState } from "react"
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from "@mui/material"
import LogoLarge from "../assets/Logo_large_dark.png"
import Visibility from "../assets/icons/Visibility"
import VisibilityOff from "../assets/icons/VisibilityOff"
import { API_BASE_URL } from "../config"

    const inputSx = {
    alignSelf: "stretch",
    "& .MuiInputLabel-root": {
        color: "var(--Color-Text-Secondary, #64748B)",
        fontFamily: "IBM Plex Sans",
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "normal",
        transform: "translate(0, -1px) scale(1)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "var(--Color-Primary-Main, #6B63FF)",
    },
    "& .MuiInputLabel-root.Mui-error": {
        color: "var(--Color-Error-Main)",
    },
    "& .MuiInputBase-root": {
        mt: "18px",
        width: "100%",
        fontFamily: "IBM Plex Sans",
        fontSize: "var(--FontSize-Body1, 16px)",
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
        borderBottom: "2px solid var(--Color-Primary-Main, #6B63FF)",
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
    }

    const secondaryHelperTextSx = {
    pt: "3px",
    mx: 0,
    color: "var(--Color-Text-Secondary, #64748B)",
    fontFamily: "IBM Plex Sans",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "0.1px",
    }

    const errorHelperTextSx = {
    pt: "3px",
    mx: 0,
    color: "var(--Color-Error-Main)",
    fontFamily: "IBM Plex Sans",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "0.1px",
    }

    const primaryButtonSx = {
    display: "flex",
    width: "100%",
    height: "48px",
    mt: "48px",
    padding: "8px 24px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    alignSelf: "stretch",
    borderRadius: "var(--borderRadius, 4px)",
    textTransform: "none",
    fontFamily: "IBM Plex Sans",
    fontSize: "15px",
    fontStyle: "normal",
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
        color: "var(--Color-Text-Disabled, #94A3B8)",
        boxShadow: "none",
        opacity: 1,
    },
    }

    const bodyTextSx = {
    color: "var(--Color-Text-Primary)",
    fontFamily: "IBM Plex Sans",
    fontSize: "var(--FontSize-Body1, 16px)",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "var(--LetterSpace-Body1, 0.16px)",
    }

    const linkTextSx = {
    color: "var(--Color-Info-Main)",
    fontFamily: "IBM Plex Sans",
    fontSize: "var(--FontSize-Body1, 16px)",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "var(--LetterSpace-Body1, 0.16px)",
    textDecorationColor: "rgba(59, 130, 246, 0.4)",
    textUnderlineOffset: "3px",
    }

    const PASSWORD_HINT = "Minimum 6 characters required."

    export default function SignupForm({ onGoLogin }) {
    const [step, setStep] = useState(1)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [signupError, setSignupError] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const validateEmailFormat = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

    const validateEmailStep = () => {
        setEmailError("")
        setSignupError("")

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
    setSignupError("")

    if (!password.trim()) {
        setPasswordError("Password is required.")
        valid = false
    } else if (password.length < 6) {
        setPasswordError(PASSWORD_HINT)
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

    const handleContinue = (e) => {
        e.preventDefault()
        if (validateEmailStep()) setStep(2)
    }

    const handleSignup = async (e) => {
        e.preventDefault()

        if (!validatePasswordStep()) return

        setLoading(true)
        setSignupError("")

        try {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.message || "Signup failed.")
        }

        onGoLogin?.()
        } catch (err) {
        setSignupError(err.message || "Signup failed.")
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

    const isEmailStepDisabled = loading || !isEmailStepValid
    const isPasswordStepValid =
        !!password.trim() &&
        !!confirmPassword.trim() &&
        password.length >= 6 &&
        confirmPassword === password &&
        !passwordError &&
        !confirmPasswordError

    const isPasswordStepDisabled = !isPasswordStepValid || loading

    const corporateLicenseNotice = (
        <Typography
        sx={{
            alignSelf: "stretch",
            color: "var(--Color-Text-Primary)",
            textAlign: "center",
            fontFamily: "IBM Plex Sans",
            fontSize: "var(--FontSize-Body1, 16px)",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "24px",
            letterSpacing: "var(--LetterSpace-Body1, 0.16px)",
        }}
        >
        This service requires a corporate license agreement.
        <br />
        Individual sign-ups are not available.
        </Typography>
    )

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
            bgcolor: "var(--Color-Background-Default)",
        }}
        >
        <Box
            sx={{
            display: "flex",
            width: { xs: "430px", md: "640px" },
            height: { xs: "818px", md: "auto" },
            padding: "var(--7, 56px) var(--5, 40px)",
            boxSizing: "border-box",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--6, 48px)",
            flexShrink: 0,
            borderRadius: { xs: 0, md: "var(--md, 8px)" },
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
                gap: "10px",
                alignSelf: "stretch",
                boxSizing: "border-box",
            }}
            >
            <Typography
                component="h1"
                sx={{
                whiteSpace: "nowrap",
                alignSelf: "stretch",
                color: "var(--Color-Text-Primary, #0F172A)",
                textAlign: "center",
                fontFamily: "IBM Plex Sans",
                fontSize: "var(--FontSize-Display-Medium, 40px)",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "var(--LineHeight-Display-Medium, 48px)",
                letterSpacing: "var(--LetterSpace-DisplayMedium, -0.2px)",
                m: 0,
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
                width: { xs: "100%", md: "560px" },
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
                }}
                >
                <TextField
                    fullWidth
                    variant="standard"
                    label="E-mail"
                    type="email"
                    value={email}
                    error={Boolean(emailError || signupError)}
                    helperText={emailError || signupError || " "}
                    onChange={(e) => {
                    const value = e.target.value
                    setEmail(value)

                    if (!value.trim()) {
                        setEmailError("")
                        setSignupError("")
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

                    if (signupError) setSignupError("")
                    }}
                    InputLabelProps={{ shrink: true }}
                    FormHelperTextProps={{ sx: errorHelperTextSx }}
                    sx={inputSx}
                />

                <Button
                    type="submit"
                    size="large"
                    disabled={isEmailStepDisabled}
                    sx={{
                        ...primaryButtonSx,
                        mt: step === 1 ? "48px" : 0,
                    }}
                    >
                    {isEmailStepValid ? "Continue" : "Sign Up"}
                    </Button>
                </Box>

                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
                >
                <Typography sx={bodyTextSx}>
                    Already have an account?
                </Typography>

                <Link
                    component="button"
                    type="button"
                    onClick={onGoLogin}
                    underline="always"
                    sx={linkTextSx}
                >
                    Sign In
                </Link>
                </Box>

                {corporateLicenseNotice}
            </Box>
            ) : (
            <Box
                component="form"
                onSubmit={handleSignup}
                sx={{
                display: "flex",
                width: { xs: "100%", md: "560px" },
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
                    gap: "24px",
                }}
                >
                <TextField
                    fullWidth
                    variant="standard"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    error={Boolean(passwordError || signupError)}
                    helperText={
                        signupError
                        ? signupError
                        : passwordError && passwordError !== PASSWORD_HINT
                            ? passwordError
                            : PASSWORD_HINT
                    }
                    onChange={(e) => {
                        const value = e.target.value
                        setPassword(value)

                        if (!value.trim()) {
                        setPasswordError("")
                        } else if (value.length < 6) {
                        setPasswordError(PASSWORD_HINT)
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

                        if (signupError) setSignupError("")
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
                                color: "var(--Color-Secondary-Main)",
                            }}
                            >
                            {showPassword ? (
                                <VisibilityOff
                                size={20}
                                color="var(--Color-Secondary-Main)"
                                />
                            ) : (
                                <Visibility
                                size={20}
                                color="var(--Color-Secondary-Main)"
                                />
                            )}
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    FormHelperTextProps={{
                        sx:
                        signupError || (passwordError && passwordError !== PASSWORD_HINT)
                            ? errorHelperTextSx
                            : secondaryHelperTextSx,
                    }}
                    sx={inputSx}
                                />

                <TextField
                    fullWidth
                    variant="standard"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    error={Boolean(confirmPasswordError || signupError)}
                    helperText={confirmPasswordError || signupError || " "}
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

                    if (signupError) setSignupError("")
                    }}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            edge="end"
                            disableRipple
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            sx={{
                            p: 0,
                            color: "var(--Color-Secondary-Main)",
                            }}
                        >
                            {showConfirmPassword ? (
                            <VisibilityOff
                                size={20}
                                color="var(--Color-Secondary-Main)"
                            />
                            ) : (
                            <Visibility
                                size={20}
                                color="var(--Color-Secondary-Main)"
                            />
                            )}
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                    FormHelperTextProps={{ sx: errorHelperTextSx }}
                    sx={inputSx}
                />

                <Button
                    type="submit"
                    size="large"
                    disabled={isPasswordStepDisabled}
                    sx={{
                        ...primaryButtonSx,
                        mt: step === 1 ? "48px" : 0,
                    }}
                >
                    {isPasswordStepValid ? "Sign Up" : "Continue"}
                </Button>
                </Box>

                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
                >
                <Typography sx={bodyTextSx}>
                    Already have an account?
                </Typography>

                <Link
                    component="button"
                    type="button"
                    onClick={onGoLogin}
                    underline="always"
                    sx={linkTextSx}
                >
                    Sign In
                </Link>
                </Box>

                {corporateLicenseNotice}
            </Box>
            )}
        </Box>
        </Box>
    )
}