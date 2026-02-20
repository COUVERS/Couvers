import { useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

export default function App() {
  const [mode, setMode] = useState("login"); // "login" | "signup"

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      {mode === "login" ? (
        <LoginForm onGoSignup={() => setMode("signup")} />
      ) : (
        <SignupForm onGoLogin={() => setMode("login")} />
      )}
    </div>
  )
}
