import { useState } from "react"
import { Button } from "@mui/material"
import "../auth.css"
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

    const validateEmailFormat = (value) => {
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

    const handleContinue = (e) => {
        e.preventDefault()

        if (validateEmailStep()) {
            setStep(2)
        }
    }

    const handleSignup = async (e) => {
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

    return (
        <div className="auth-page">
            <div className="auth-card">
                <img src={LogoLarge} alt="TeTe" className="auth-logo" />

                <h1 className="auth-title">Get started</h1>

                {step === 1 ? (
                    <form className="auth-form" onSubmit={handleContinue}>
                        <div className="auth-field-group">
                            <label className={`auth-label ${emailError ? "auth-label-error" : ""}`}>
                                E-mail
                            </label>
                            <input
                                className={`auth-input ${emailError ? "auth-input-error" : ""}`}
                                type="email"
                                value={email}
                                onChange={(e) => {
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
                            />
                            {emailError && (
                                <p className="auth-error-text">{emailError}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading || !email.trim() || !!emailError}
                            sx={{
                                width: "100%",
                                height: "72px",
                                borderRadius: "8px",
                                fontSize: "var(--FontSize-Headings-h3)",
                                fontWeight: 600,
                                textTransform: "none",
                            }}
                        >
                            Continue
                        </Button>

                        <div className="auth-footer">
                            <span>Already have an account?</span>
                            <button type="button" className="auth-link" onClick={onGoLogin}>
                                Sign In
                            </button>
                        </div>

                        <p className="auth-note">
                            This service requires a corporate license agreement.
                            Individual sign-ups are not available.
                        </p>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleSignup}>
                        <div className="auth-field-group">
                            <label className={`auth-label ${passwordError ? "auth-label-error" : ""}`}>
                                Password
                            </label>

                            <div className={`auth-password-wrap ${passwordError ? "auth-input-error" : ""}`}>
                                <input
                                    className="auth-input auth-password-input"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
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
                                />
                                <button
                                    type="button"
                                    className="auth-eye-btn"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <VisibilityOff size={20} color="#2E2A5F" />
                                    ) : (
                                        <Visibility size={20} color="#2E2A5F" />
                                    )}
                                </button>
                            </div>

                            {passwordError && (
                                <p className="auth-error-text">{passwordError}</p>
                            )}
                        </div>

                        <div className="auth-field-group">
                            <label className={`auth-label ${confirmPasswordError ? "auth-label-error" : ""}`}>
                                Confirm Password
                            </label>

                            <div className={`auth-password-wrap ${confirmPasswordError ? "auth-input-error" : ""}`}>
                                <input
                                    className="auth-input auth-password-input"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
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
                                />
                                <button
                                    type="button"
                                    className="auth-eye-btn"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? (
                                        <VisibilityOff size={20} color="#2E2A5F" />
                                    ) : (
                                        <Visibility size={20} color="#2E2A5F" />
                                    )}
                                </button>
                            </div>

                            {confirmPasswordError && (
                                <p className="auth-error-text">{confirmPasswordError}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={
                                loading ||
                                !password.trim() ||
                                !confirmPassword.trim() ||
                                password.length < 6 ||
                                confirmPassword !== password
                            }
                            sx={{
                                width: "100%",
                                height: "72px",
                                borderRadius: "8px",
                                fontSize: "var(--FontSize-Headings-h3)",
                                fontWeight: 600,
                                textTransform: "none",
                            }}
                        >
                            {loading ? "Creating Account..." : "Continue"}
                        </Button>

                        <div className="auth-footer">
                            <span>Already have an account?</span>
                            <button type="button" className="auth-link" onClick={onGoLogin}>
                                Sign In
                            </button>
                        </div>

                        <p className="auth-note">
                            This service requires a corporate license agreement.
                            Individual sign-ups are not available.
                        </p>
                    </form>
                )}
            </div>
        </div>
    )
}