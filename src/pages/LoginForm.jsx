import { useState } from "react"
import { Link } from "react-router-dom"
import "../auth.css"
import LogoLarge from "../assets/Logo_large_dark.png"
import Visibility from "../assets/icons/Visibility"
import VisibilityOff from "../assets/icons/VisibilityOff"
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
        } catch (err) {
            setLoginError("Invalid email or password.")
        } finally {
            setLoading(false)
        }
    }

    const disabled = loading || !email.trim() || !password.trim()

    return (
        <div className="auth-page">
            <div className="auth-card">
                <img src={LogoLarge} alt="TeTe" className="auth-logo" />

                <h1 className="auth-title">Welcome to Our Platform</h1>

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="auth-field-group">
                        <label className={`auth-label ${emailError || loginError ? "auth-label-error" : ""}`}>
                            E-mail
                        </label>
                        <input
                            className={`auth-input ${emailError || loginError ? "auth-input-error" : ""}`}
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (emailError) setEmailError("")
                                if (loginError) setLoginError("")
                            }}
                            placeholder=""
                        />
                        {emailError && (
                            <p className="auth-error-text">{emailError}</p>
                        )}
                    </div>

                    <div className="auth-field-group">
                        <label className={`auth-label ${passwordError || loginError ? "auth-label-error" : ""}`}>
                            Password
                        </label>

                        <div className={`auth-password-wrap ${passwordError || loginError ? "auth-input-error" : ""}`}>
                            <input
                                className="auth-input auth-password-input"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    if (passwordError) setPasswordError("")
                                    if (loginError) setLoginError("")
                                }}
                                placeholder=""
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

                        {!passwordError && loginError && (
                            <p className="auth-error-text">{loginError}</p>
                        )}
                    </div>

                    <div className="auth-row">
                        <span>Forgot your password?</span>
                        <Link to="/forgot-password" className="auth-link">
                            Password Reset
                        </Link>
                    </div>

                    <button className="auth-btn" disabled={disabled}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                    <div className="auth-footer">
                        <span>No Account?</span>
                        <button type="button" className="auth-link" onClick={onGoSignup}>
                            Join Us
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}