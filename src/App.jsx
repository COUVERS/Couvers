import { useEffect, useState } from "react"
import LoginForm from "./pages/LoginForm"
import SignupForm from "./pages/SignupForm"
import Navigation from "./components/layout/Navigation"
import Course from "./pages/Course"
import Header from "./Header"
import AccountSettings from "./components/features/AccountSettings"
import ChangePassword from "./components/features/ChangePassword"


export default function App() {
  const [page, setPage] = useState("home")
  const [mode, setMode] = useState("login") // "login" | "signup"
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"))
  const [authUser, setAuthUser] = useState(null) // account
  const [accountView, setAccountView] = useState("settings") // password

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setAuthUser(null)
    setMode("login")
    setPage("home")
    setAccountView("settings")
  }

    useEffect(() => {
  const token = localStorage.getItem("token")
  if (!token) return

  fetch("http://localhost:5050/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        setAuthUser(data.user)
        setIsLoggedIn(true)
      }
    })
    .catch(() => {
      localStorage.removeItem("token")
      setIsLoggedIn(false)
      setAuthUser(null)
    })
}, [])

  if (!isLoggedIn) {
    return (
      <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
        {mode === "login" ? (
          <LoginForm
            onGoSignup={() => setMode("signup")}
            onLoginSuccess={(data) => {
            setIsLoggedIn(true)
            setAuthUser(data.user)
            }}
          />
        ) : (
          <SignupForm onGoLogin={() => setMode("login")} />
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
            title={page === "account"
              ? accountView === "changePassword"
                ? "Change Password"
                : "Account Settings"
              : "This is the Header"
            }
            description={
              page === "account"
                ? accountView === "changePassword"
                  ? "For your security, we recommend changing your password periodically."
                  : "Manage your personal information, security preferences, and account details here."
                : "This is the description"
            }
      />
    )}

        {page === "home" && <h1>Home</h1>}
        {page === "courses" && <Course />}
        {page === "account" && accountView === "settings" && (
          <AccountSettings
            name={authUser?.email?.split("@")[0]}
            email={authUser?.email}
            onChangePassword={() => setAccountView("changePassword")}
          />
        )}

        {page === "account" && accountView === "changePassword" && (
          <ChangePassword onCancel={() => setAccountView("settings")} />
        )}
      </main>
    </div>
  )
}