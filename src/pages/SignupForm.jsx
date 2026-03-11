import { useState } from "react"
import "../auth.css"
import LogoLarge from "../assets/Logo_large_dark.png"
import Visibility from "../assets/icons/Visibility"
import VisibilityOff from "../assets/icons/VisibilityOff"

export default function SignupForm({ onGoLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const hasError = message.startsWith("❌")

    const handleSignup = async (e) => {
        e.preventDefault()
        setMessage("")
        setLoading(true)

        try {
            const res = await fetch("http://localhost:5050/auth/signup", {
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

            if (!res.ok) throw new Error(data.message || "Signup failed")

            setMessage(`✅ ${data.message} (${data.user.email})`)

            if (onGoLogin) {
                onGoLogin()
            }
        } catch (err) {
            setMessage(`❌ ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    const disabled = loading || !email.trim() || password.length < 6

    return (
        <div className="auth-page">
            <div className="auth-card">
                <img src={LogoLarge} alt="TeTe" className="auth-logo" />

                <h1 className="auth-title">Create Your Account</h1>

                <form className="auth-form" onSubmit={handleSignup}>
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

                    <button className="auth-btn" disabled={disabled}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>

                    <div className="auth-footer">
                        <span>Already have an account?</span>
                        <button type="button" className="auth-link" onClick={onGoLogin}>
                            Sign in
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