import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
import "../auth.css"
import LogoLarge from "../assets/Logo_large_dark.png"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const validateEmailFormat = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEmailError("")

        if (!email.trim()) {
            setEmailError("Email is required.")
            return
        }

        if (!validateEmailFormat(email)) {
            setEmailError("Please enter a valid email address.")
            return
        }

        try {
            setLoading(true)

            const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to process forgot password request.")
            }

            navigate("/forgot-password/sent", {
                state: { email },
            })
        } catch (err) {
            setEmailError(err.message || "Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

return (
        <div className="auth-page">
            <div className="auth-card">
                <img src={LogoLarge} alt="TeTe" className="auth-logo" />

                <h1 className="auth-title">Forgot Password?</h1>

                <p className="auth-description" style={{ marginBottom: "40px" }}>
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field-group">
                        <label className={`auth-label ${emailError ? "auth-label-error" : ""}`}>
                            E-mail
                        </label>
                        <input
                            className={`auth-input ${emailError ? "auth-input-error" : ""}`}
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (emailError) setEmailError("")
                            }}
                        />
                        {emailError && <p className="auth-error-text">{emailError}</p>}
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={loading}
                        sx={{ height: "72px", width: "100%", }}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>

                    <div className="auth-footer">
                        <span>Back to</span>
                        <Link to="/login" className="auth-link">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}