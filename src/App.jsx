import { useEffect, useState } from "react"
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Drawer from "@mui/material/Drawer"
import MenuIcon from "./assets/icons/MenuIcon"
import LogoLarge from "./assets/Logo_large_dark.png"
import useMediaQuery from "@mui/material/useMediaQuery"
import LoginForm from "./pages/LoginForm"
import SignupForm from "./pages/SignupForm"
import ForgotPassword from "./pages/ForgotPassword"
import ForgotPasswordSent from "./pages/ForgotPasswordSent"
import PasswordResetSent from "./pages/PasswordResetSent"
import ResetPassword from "./pages/ResetPassword"
import SignOutDialog from "./components/features/auth/SignOutDialog"
import Navigation from "./components/layout/Navigation"
import CoursePage from "./pages/CoursePage"
import AccountSettings from "./components/features/AccountSettings"
import ChangePassword from "./components/features/ChangePassword"
import Dashboard from "./pages/Dashboard"
import { API_BASE_URL } from "./config"
import DashboardHeader from "./components/reusable-ui/DashboardHeader"
import PageHeader from "./components/reusable-ui/PageHeader"

export default function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery("(max-width:899px)")
  const isMedium = useMediaQuery("(min-width:900px) and (max-width:1095px)")
  const isDesktop = useMediaQuery("(min-width:1096px)")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"))
  const [authUser, setAuthUser] = useState(null)
  const [signOutOpen, setSignOutOpen] = useState(false)
  const [continueCourseId, setContinueCourseId] = useState(null)
  const [continueLessonId, setContinueLessonId] = useState(null)
  const [courseResetSignal, setCourseResetSignal] = useState(0)

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

  const handleOpenSignOutDialog = () => {
    setSignOutOpen(true)
  }

  const handleCloseSignOutDialog = () => {
    setSignOutOpen(false)
  }

  const handleConfirmSignOut = () => {
    setSignOutOpen(false)

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setIsLoggedIn(false)
    setAuthUser(null)
    setDashboardHeader(null)
    setContinueCourseId(null)
    setContinueLessonId(null)

    navigate("/login")
  }

  const openCoursesOverview = () => {
    setContinueCourseId(null)
    setContinueLessonId(null)
    setCourseResetSignal((prev) => prev + 1)
    navigate("/courses")
  }

  const [dashboardHeader, setDashboardHeader] = useState(null)
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



  const openRecommendedCourse = (courseId) => {
    setContinueCourseId(null)
    setContinueLessonId(null)
    setCourseResetSignal((prev) => prev + 1)

    if (courseId) {
      navigate(`/courses/${courseId}`)
      return
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
        console.log("auth/me data:", data)
        console.log("accountHeader from backend:", data.accountHeader)
        console.log("changePasswordHeader from backend:", data.changePasswordHeader)
        if (data.user) {
          setAuthUser(data.user)
          setDashboardHeader(data.dashboardHeader || null)

          setIsLoggedIn(true)
        } else {
          localStorage.removeItem("token")
          setIsLoggedIn(false)
          setAuthUser(null)
          setDashboardHeader(null)

          navigate("/login")
        }
      })
      .catch(() => {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setAuthUser(null)
        setDashboardHeader(null)

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
            element={<SignupForm onGoLogin={() => navigate("/login")} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-password/sent" element={<ForgotPasswordSent />} />
          <Route path="/forgot-password/sent" element={<PasswordResetSent />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {!isMobile && (
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
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
            forceCollapsed={page === "courses" || isMedium}
            onSignOut={handleOpenSignOutDialog}
          />
        </Box>
      )}


      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          p: isMobile ? 0 : page === "courses" || page === "account" ? 0 : 2,
        }}
      >
        {isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              px: 3,
              pt: 7,
              pb: 2,
              backgroundColor: "#fff",
              position: "sticky",
              boxShadow: "0 6px 30px 5px rgba(0, 0, 0, 0.12)", top: 0,
              zIndex: 1200,
            }}
          >
            <IconButton
              onClick={() => setMobileNavOpen(true)}
              sx={{
                p: 0,
                width: 40,
                height: 40,
              }}
            >
              <MenuIcon />
            </IconButton>

            <img
              src={LogoLarge}
              alt="TeTe"
              style={{
                width: 104,
                height: 80,
                objectFit: "contain",
                display: "block",
              }}
            />

            <Box sx={{ width: 40 }} />
          </Box>
        )}
        {page === "home" && (
          <DashboardHeader
            title={dashboardHeader?.title || (authUser ? `Hello ${authUser.username}` : "Hello")}
            description={dashboardHeader?.description || ""}
          />
        )}

        {location.pathname === "/account" && (
          <PageHeader
            title="Account Settings"
            description="Manage your personal information, security preferences, and account details here."
          />
        )}

        {location.pathname === "/account/change-password" && (
          <PageHeader
            title="Change Password"
            description="For your security, we recommend changing your password periodically."
          />
        )}



        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                onStartCourse={openContinueLesson}
                onOpenRecommendedCourse={openRecommendedCourse}
              />}
          />
          <Route
            path="/courses"
            element={
              <CoursePage
                continueCourseId={continueCourseId}
                continueLessonId={continueLessonId}
                courseResetSignal={courseResetSignal}
              />
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <CoursePage
                continueCourseId={continueCourseId}
                continueLessonId={continueLessonId}
                courseResetSignal={courseResetSignal}
              />
            }
          />
          <Route
            path="/courses/:courseId/lessons/:lessonId/lecture"
            element={
              <CoursePage
                continueCourseId={continueCourseId}
                continueLessonId={continueLessonId}
                courseResetSignal={courseResetSignal}
              />
            }
          />
          <Route
            path="/courses/:courseId/lessons/:lessonId/quiz"
            element={
              <CoursePage
                continueCourseId={continueCourseId}
                continueLessonId={continueLessonId}
                courseResetSignal={courseResetSignal}
              />
            }
          />
          <Route
            path="/courses/:courseId/lessons/:lessonId/result"
            element={
              <CoursePage
                continueCourseId={continueCourseId}
                continueLessonId={continueLessonId}
                courseResetSignal={courseResetSignal}
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
        {isMobile && (
          <Drawer
            anchor="left"
            open={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          >
            <Box sx={{ width: 240 }}>
              <Navigation
                page={page}
                setPage={(nextPage) => {
                  setMobileNavOpen(false)

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
                forceCollapsed={false}
                onSignOut={handleOpenSignOutDialog}
              />
            </Box>
          </Drawer>
        )}
        <SignOutDialog
          open={signOutOpen}
          onClose={handleCloseSignOutDialog}
          onConfirm={handleConfirmSignOut}
        />
      </Box>
    </Box>
  )
}