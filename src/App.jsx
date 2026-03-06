import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Navigation from "./components/layout/Navigation"
import ProtectedRoute from "./routes/ProtectedRoute"

import LoginPage from "./pages/LoginPage"
import Course from "./pages/Course"
import LecturePage from "./pages/LecturePage"
import QuizPage from "./pages/QuizPage"

function AppLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Navigation />
      <main style={{ flex: 1, padding: 16 }}>{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <h1>Home</h1>
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Course Page */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Course />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Lecture Page */}
        <Route
          path="/courses/:courseId/lessons/:lessonId/lecture"
          element={
            <ProtectedRoute>
              <AppLayout>
                <LecturePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Quiz Page */}
        <Route
          path="/courses/:courseId/lessons/:lessonId/quiz"
          element={
            <ProtectedRoute>
              <AppLayout>
                <QuizPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* All other path -> Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}