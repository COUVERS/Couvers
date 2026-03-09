import { useState } from "react"
import LoginForm from "./pages/LoginForm"
import SignupForm from "./pages/SignupForm"
import Navigation from "./components/layout/Navigation"
import Course from "./pages/Course"
import Header from "./Header"

export default function App() {
  const [page, setPage] = useState("home")
  const [mode, setMode] = useState("login") // "login" | "signup"
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"))

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setMode("login")
    setPage("home")
  }

  if (!isLoggedIn) {
    return (
      <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
        {mode === "login" ? (
          <LoginForm
            onGoSignup={() => setMode("signup")}
            onLoginSuccess={() => setIsLoggedIn(true)}
          />
        ) : (
          <SignupForm onGoLogin={() => setMode("login")}/>
        )}
      </div>
    )
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Navigation
        page={page}
        setPage={setPage}
        forceCollapsed={page === "courses"}
        onSignOut={handleSignOut}
      />

      <main style={{ flex: 1, padding: page === "courses" ? 0 : 16 }}>
        {page !== "courses" && (
          <Header
            title="This is the Header"
            description="This is the description"
          />
        )}

        {page === "home" && <h1>Home</h1>}
        {page === "courses" && <Course />}
      </main>
    </div>
  )
}