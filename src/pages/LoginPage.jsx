import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/Authcontext"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

export default function LoginPage() {
    const [mode, setMode] = useState("login")
    const { login } = useAuth()
    const navigate = useNavigate()

  // LoginForm -> token 
    const handleLoginSuccess = (token) => {
    login(token)
    navigate("/", { replace: true })
    }

    return mode === "login" ? (
    <LoginForm
        onGoSignup={() => setMode("signup")}
        onLoginSuccess={handleLoginSuccess}
    />
    ) : (
    <SignupForm onGoLogin={() => setMode("login")} />
    )
}