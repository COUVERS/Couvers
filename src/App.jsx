import { useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import LecturePage from "./pages/LecturePage"
// import CustomButton from "./components/reusable-ui/CustomButton"
import Navigation from "./components/layout/Navigation"
// import Quiz from "./components/features/Quiz"
import { quizQuestions } from "./services/quizData"
import Course from "./pages/Course"
import CourseNavigation from "./components/layout/CourseNavigation"
import { demoLessons } from "./library/demoLessons"
import LessonList from "./pages/LessonList"

// const demoLessons = [
//   {
//     _id: "l1",
//     order: 1,
//     title: "Empathy as an Instructional Skill",
//     lessonDescription:
//       "This lesson introduces empathy as an instructional skill that supports effective classroom management.",
//     sections: [
//       {
//         heading: "What Empathy Means in Teaching",
//         content: [
//           "Empathy means understanding learners’ experiences and responding intentionally to support learning.",
//           "Empathy helps instructors stay calm and choose responses that keep learning moving forward.",
//         ],
//       },
//     ],
//     keyTakeaways: [
//       "Empathy is a practical instructional skill",
//       "Empathy and clear expectations work best together",
//     ],
//   },
//   {
//     _id: "l4",
//     order: 4,
//     title: "Empathy-Based Communication in the Classroom",
//     lessonDescription:
//       "This lesson focuses on using language, tone, and structure to communicate empathy while maintaining authority.",
//     sections: [
//       {
//         heading: "Language Shapes Classroom Climate",
//         content: [
//           "Words influence classroom tone.",
//           "Empathy-based communication includes neutral language, clear expectations, calm tone, and concise explanations.",
//           "Communication should reduce defensiveness, not increase it.",
//         ],
//       },
//       {
//         heading: "Tone and Framing",
//         content: [
//           "Instead of “You’re not paying attention.” try “Let’s refocus on the main idea.”",
//           "Language shifts can prevent conflict.",
//         ],
//       },
//     ],
//     keyTakeaways: [
//       "Tone matters as much as content",
//       "Neutral phrasing reduces defensiveness",
//       "Clear communication supports classroom management",
//     ],
//   },
// ];

export default function App() {
  const [page, setPage] = useState("home")
  // const currentQuestion = quizQuestions[0]

  // const [lessons] = useState(demoLessons);
  // const [activeLessonId, setActiveLessonId] = useState(demoLessons[0]?._id);

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

        {/* {page === "courses" && <CourseNavigation />} */}

        <main style={{ flex: 1, padding: page === "courses" ? 0 : 16 }}>
          {page === "home" && <h1>Home</h1>}
          {page === "courses" && <Course />}

        </main>

        {/* <Quiz
          question={currentQuestion}
          questionNumber={1}
          totalQuestions={quizQuestions.length}
        /> */}


        {/* <LecturePage
          lessons={lessons}
          activeLessonId={activeLessonId}
          onSelectLesson={setActiveLessonId}
          onExit={() => console.log("Exit lecture")}
          onTakeQuiz={(lessonId) => console.log("Take quiz for:", lessonId)}
        /> */}
      </div>
    </>
  )
}
