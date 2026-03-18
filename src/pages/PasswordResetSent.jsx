import { Link, useLocation } from "react-router-dom"
import "../auth.css"
import LogoLarge from "../assets/Logo_large_dark.png"

export default function PasswordResetSent() {
    const location = useLocation()
    const email = location.state?.email || "your email"

    return (
        <div className="auth-page">
            <div className="auth-card">
                <img src={LogoLarge} alt="TeTe" className="auth-logo" />

                <h1 className="auth-title">Check Your Email</h1>

                <p className="auth-inline-message" style={{ marginBottom: "40px" }}>
                    We sent a password reset link to {email}
                </p>

                <Link to="/login" style={{ textDecoration: "none" }}>
                    <button className="auth-btn" type="button">
                        Back to Sign In
                    </button>
                </Link>
            </div>
        </div>
    )
}