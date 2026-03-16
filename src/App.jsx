import { useEffect, useState } from "react"
import LoginForm from "./pages/LoginForm"
import SignupForm from "./pages/SignupForm"
import Navigation from "./components/layout/Navigation"
import Course from "./pages/Course"
import Header from "./Header"
import AccountSettings from "./components/features/AccountSettings"
import ChangePassword from "./components/features/ChangePassword"
import Dashboard from "./pages/Dashboard"
import { API_BASE_URL } from "./config"

export default function App() {
  const [page, setPage] = useState("home")
  const [mode, setMode] = useState("login") // "login" | "signup"
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"))
  const [authUser, setAuthUser] = useState(null)
  const [accountView, setAccountView] = useState("settings")
  const [continueCourseId, setContinueCourseId] = useState(null)
  const [continueLessonId, setContinueLessonId] = useState(null)

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setAuthUser(null)
    setMode("login")
    setPage("home")
    setAccountView("settings")
    setContinueCourseId(null)
    setContinueLessonId(null)
  }

  const openCoursesOverview = () => {
    setContinueCourseId(null)
    setContinueLessonId(null)
    setPage("courses")
  }

  const openContinueLesson = (nextLesson) => {
    if (nextLesson) {
      setContinueCourseId(nextLesson.courseId)
      setContinueLessonId(nextLesson.lessonId)
    } else {
      setContinueCourseId(null)
      setContinueLessonId(null)
    }
    setPage("courses")
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch(`${API_BASE_URL}/auth/me`, {
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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navigation
        page={page}
        setPage={(nextPage) => {
          if (nextPage === "courses") {
            openCoursesOverview()
            return
          }

          setPage(nextPage)
        }}
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

        {page === "home" && (
          <Dashboard onStartCourse={openContinueLesson} />
          // <Dashboard
          //   onStartCourse={(nextLesson) => {
          //     if (nextLesson) {
          //       setContinueCourseId(nextLesson.courseId)
          //       setContinueLessonId(nextLesson.lessonId)
          //     } else {
          //       setContinueCourseId(null)
          //       setContinueLessonId(null)
          //     }
          //     setPage("courses")
          //   }}
          // />
        )}
        {page === "courses" && (
          <Course
            continueCourseId={continueCourseId}
            continueLessonId={continueLessonId}
          />
        )}

        {page === "account" && accountView === "settings" && (
          <AccountSettings
            name={authUser?.username}
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