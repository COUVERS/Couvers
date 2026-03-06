import { useState } from "react"
import "../auth.css"

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
        const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Login failed")

        setMessage(`✅ ${data.message} (${data.user.email})`)

      // JWT -> store
        const token = data.token || data.accessToken || data.jwt
        if (onLoginSuccess) onLoginSuccess(token)

    } catch (err) {
        setMessage(`❌ ${err.message}`)
    } finally {
        setLoading(false)
    }
    }

    const disabled = loading || !email.trim() || !password

    return (
    <div className="auth-shell">
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
            <span>No account?</span>
            <button type="button" className="auth-link" onClick={onGoSignup}>
            Join now
            </button>
        </div>

        {message && <p className="auth-message">{message}</p>}
        </form>
    </div>
    )
}