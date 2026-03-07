import { useState } from "react"
import CustomButton from './Reusable-Components/CustomButton'
import Navigation from './components/Navigation'
import CertificateTest from './pages/CertificateTest'
import Quiz from './components/Quiz'
import { quizQuestions } from './services/quizData'

export default function App() {
  const [page, setPage] = useState("home")
  const currentQuestion = quizQuestions[0]

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

        {/* {page === "courses" && <CourseNavigation />} */}

        <main style={{ flex: 1, padding: page === "courses" ? 0 : 16 }}>
          {page === "home" && <h1>Home</h1>}
          {page === "courses" && <Course />}
          
          <div style={{ padding: "40px" }}>
            <h1>This is a set up</h1>
            <CustomButton />
          </div>

        </main>

        <Quiz
          question={currentQuestion}
          questionNumber={1}
          totalQuestions={quizQuestions.length}
        />

        <CertificateTest />

        {/* <LecturePage }
          lessons={lessons}
          activeLessonId={activeLessonId}
          onSelectLesson={setActiveLessonId}
          onExit={() => console.log("Exit lecture")}
          onTakeQuiz={(lessonId) => console.log("Take quiz for:", lessonId)}
        {/>  */}

      </div>
    </>
  )
}
