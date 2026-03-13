import { useState } from "react"
import "../auth.css"
import LogoLarge from "../assets/Logo_large_dark.png"
import Visibility from "../assets/icons/Visibility"
import VisibilityOff from "../assets/icons/VisibilityOff"

export default function LoginForm({ onGoSignup, onLoginSuccess }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const hasError = message.startsWith("❌")

    const handleLogin = async (e) => {
        e.preventDefault()
        setMessage("")
        setLoading(true)

        try {
            const res = await fetch("https://covers-backend.onrender.com/auth/login", {
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

            if (!res.ok) throw new Error(data.message || "Invalid email or password.")

            if (data.token) {
                localStorage.setItem("token", data.token)
            }

            setMessage(`✅ ${data.message} (${data.user.email})`)

            if (onLoginSuccess) {
                onLoginSuccess(data)
            }
        } catch (err) {
            setMessage(`❌ ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    const disabled = loading || !email.trim() || !password

    return (
        <div className="auth-page">
            <div className="auth-card">
                <img src={LogoLarge} alt="TeTe" className="auth-logo" />

                <h1 className="auth-title">Welcome to Our Platform</h1>

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="auth-field-group">
                        <label className={`auth-label ${hasError ? "auth-label-error" : ""}`}>
                            E-mail
                        </label>
                        <input
                            className={`auth-input ${hasError ? "auth-input-error" : ""}`}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                        />
                    </div>

                    <div className="auth-field-group">
                        <label className={`auth-label ${hasError ? "auth-label-error" : ""}`}>
                            Password
                        </label>

                        <div className={`auth-password-wrap ${hasError ? "auth-input-error" : ""}`}>
                            <input
                                className="auth-input auth-password-input"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                        {hasError && (
                            <p className="auth-error-text">
                                {message.replace("❌ ", "")}
                            </p>
                        )}
                    </div>

                    <div className="auth-row">
                        <span>Forgot your password?</span>
                        <button
                            type="button"
                            className="auth-link"
                            onClick={() => setMessage("Password reset is not implemented yet.")}
                        >
                            Password Reset
                        </button>
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

                    {!hasError && message && (
                        <p className="auth-message">{message}</p>
                    )}
                </form>
            </div>
        </div>
    )
}