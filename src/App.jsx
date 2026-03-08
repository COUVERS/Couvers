import { useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Navigation from "./components/layout/Navigation"
import Course from "./pages/Course"
import Header from "./Header"
// import { demoLessons } from "./library/demoLessons"

export default function App() {
  const [page, setPage] = useState("home")

  // const [mode, setMode] = useState("login"); // "login" | "signup"

  return (
    <>
      {/* <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
        {mode === "login" ? (
          <LoginForm onGoSignup={() => setMode("signup")} />
        ) : (
          <SignupForm onGoLogin={() => setMode("login")} />
        )}
      </div> */}

      <div style={{ display: "flex", height: "100vh" }}>
        <Navigation
          page={page}
          setPage={setPage}
          forceCollapsed={page === "courses"}
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
    </>
  )
}
