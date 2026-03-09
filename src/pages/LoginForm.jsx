import { useState } from "react"
import "../auth.css"
import LogoLarge from "../assets/Logo_large_dark.png"

export default function LoginForm({ onGoSignup, onLoginSuccess }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        setMessage("")
        setLoading(true)

        try {
            const res = await fetch("http://localhost:5050/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.message || "Login failed")

            if (data.token) {
                localStorage.setItem("token", data.token)
            }

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
                    <label className="auth-label">
                        E-mail
                        <input
                            className="auth-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className="auth-label">
                        Password
                        <input
                            className="auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

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

                    {message && <p className="auth-message">{message}</p>}
                </form>
            </div>
        </div>
    )
}