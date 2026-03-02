import { useState } from "react"
import CustomButton from './Reusable-Components/CustomButton'
import Navigation from './components/Navigation'
import CertificateTest from './pages/CertificateTest'
import Quiz from './components/Quiz'
import { quizQuestions } from './services/quizData'
import Course from './pages/Course'
import CourseNavigation from './components/CourseNavigation'

function App() {
  const [page, setPage] = useState("home")
  const currentQuestion = quizQuestions[0]
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      <Navigation
        page={page}
        setPage={setPage}
        forceCollapsed={page === "courses"}
      />

      {page === "courses" && <CourseNavigation />}

      <main style={{ flex: 1, padding: 16 }}>
        {page === "home" && <h1>Home</h1>}
        {page === "courses" && <Course />}
      </main>
      <Quiz
        question={currentQuestion}
        questionNumber={1}
        totalQuestions={quizQuestions.length}
      />

    </div>
  )
}

export default App
