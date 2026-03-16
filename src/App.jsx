import { useEffect, useState } from "react"
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
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
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"))
  const [authUser, setAuthUser] = useState(null)
  const [continueCourseId, setContinueCourseId] = useState(null)
  const [continueLessonId, setContinueLessonId] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const page = location.pathname.startsWith("/courses")
    ? "courses"
    : location.pathname.startsWith("/account")
      ? "account"
      : "home"

  const accountView =
    location.pathname === "/account/change-password"
      ? "changePassword"
      : "settings"

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setAuthUser(null)
    setContinueCourseId(null)
    setContinueLessonId(null)
    navigate("/login")
  }

  const openCoursesOverview = () => {
    setContinueCourseId(null)
    setContinueLessonId(null)
    navigate("/courses")
  }

  const openContinueLesson = (nextLesson) => {
    if (nextLesson) {
      setContinueCourseId(nextLesson.courseId)
      setContinueLessonId(nextLesson.lessonId)
    } else {
      setContinueCourseId(null)
      setContinueLessonId(null)
    }
    navigate("/courses")
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setAuthUser(data.user)
          setIsLoggedIn(true)
        } else {
          localStorage.removeItem("token")
          setIsLoggedIn(false)
          setAuthUser(null)
          navigate("/login")
        }
      })
      .catch(() => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setAuthUser(null)
        navigate("/login")
      })
  }, [navigate])

  if (!isLoggedIn) {
    return (
      <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginForm
                onGoSignup={() => navigate("/signup")}
                onLoginSuccess={(data) => {
                  setIsLoggedIn(true)
                  setAuthUser(data.user)
                  navigate("/")
                }}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignupForm
                onGoLogin={() => navigate("/login")}
              />
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
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

          if (nextPage === "home") {
            navigate("/")
            return
          }

          if (nextPage === "account") {
            navigate("/account")
          }
        }}
        forceCollapsed={page === "courses"}
        onSignOut={handleSignOut}
      />

      <main style={{ flex: 1, padding: page === "courses" ? 0 : 16 }}>
        {page !== "courses" && (
          <Header
            title={
              page === "account"
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

        <Routes>
          <Route
            path="/"
            element={<Dashboard onStartCourse={openContinueLesson} />}
          />
          <Route
            path="/courses"
            element={
              <Course
                continueCourseId={continueCourseId}
                continueLessonId={continueLessonId}
              />
            }
          />
          <Route
            path="/account"
            element={
              <AccountSettings
                name={authUser?.username}
                email={authUser?.email}
                onChangePassword={() => navigate("/account/change-password")}
              />
            }
          />
          <Route
            path="/account/change-password"
            element={
              <ChangePassword onCancel={() => navigate("/account")} />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}