import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import "../auth.css"
import LogoLarge from "../assets/Logo_large_dark.png"
import Visibility from "../assets/icons/Visibility"
import VisibilityOff from "../assets/icons/VisibilityOff"
import { API_BASE_URL } from "../config"

export default function ResetPassword() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [submitError, setSubmitError] = useState("")
    const [loading, setLoading] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate()

    const validate = () => {
        let valid = true
        setNewPasswordError("")
        setConfirmPasswordError("")
        setSubmitError("")

        if (!newPassword.trim()) {
            setNewPasswordError("New password is required.")
            valid = false
        } else if (newPassword.length < 6) {
            setNewPasswordError("Password must be at least 6 characters.")
            valid = false
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError("Please confirm your new password.")
            valid = false
        } else if (confirmPassword !== newPassword) {
            setConfirmPasswordError("Passwords must match.")
            valid = false
        }

        if (!token) {
            setSubmitError("Invalid or missing reset token.")
            valid = false
        }

        return valid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validate()) return

        try {
            setLoading(true)

            const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    newPassword,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to reset password.")
            }

            navigate("/login")
        } catch (err) {
            setSubmitError(err.message || "Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <img src={LogoLarge} alt="TeTe" className="auth-logo" />

                <h1 className="auth-title">Reset Password</h1>

                <p className="auth-description" style={{ marginBottom: "40px" }}>
                    Enter your new password below.
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field-group">
                        <label className={`auth-label ${newPasswordError ? "auth-label-error" : ""}`}>
                            New Password
                        </label>

                        <div className={`auth-password-wrap ${newPasswordError ? "auth-input-error" : ""}`}>
                            <input
                                className="auth-input auth-password-input"
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value)
                                    if (newPasswordError) setNewPasswordError("")
                                    if (submitError) setSubmitError("")
                                }}
                            />
                            <button
                                type="button"
                                className="auth-eye-btn"
                                onClick={() => setShowNewPassword((prev) => !prev)}
                            >
                                {showNewPassword ? (
                                    <VisibilityOff size={20} color="#2E2A5F" />
                                ) : (
                                    <Visibility size={20} color="#2E2A5F" />
                                )}
                            </button>
                        </div>
                        {newPasswordError && (
                            <p className="auth-error-text">{newPasswordError}</p>
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
                                    setConfirmPassword(e.target.value)
                                    if (confirmPasswordError) setConfirmPasswordError("")
                                    if (submitError) setSubmitError("")
                                }}
                            />
                            <button
                                type="button"
                                className="auth-eye-btn"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
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

                    {submitError && (
                        <p className="auth-error-text">{submitError}</p>
                    )}

                    <button className="auth-btn" type="submit" disabled={loading}>
                        {loading ? "Updating..." : "Set New Password"}
                    </button>

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