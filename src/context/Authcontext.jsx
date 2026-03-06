import { useState } from "react"
import "../auth.css"

export default function SignupForm({ onGoLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSignup = async (e) => {
        e.preventDefault()
        setMessage("")
        setLoading(true)

    try {
        const res = await fetch("http://localhost:5000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Signup failed")

        setMessage(`✅ ${data.message} (${data.user.email})`)
        onGoLogin()
        } catch (err) {
            setMessage(`❌ ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    const disabled = loading || !email.trim() || password.length < 6

    return (
        <div className="auth-shell">
            <h1 className="auth-title">Create Your Account</h1>

        <form className="auth-form" onSubmit={handleSignup}>
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
            Password (min 6 chars)
            <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            </label>

        <button className="auth-btn" disabled={disabled}>
            {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="auth-footer">
            <span>Already have an account?</span>
            <button type="button" className="auth-link" onClick={onGoLogin}>
                Sign in
            </button>
        </div>

            {message && <p className="auth-message">{message}</p>}
        </form>
    </div>
    )
}