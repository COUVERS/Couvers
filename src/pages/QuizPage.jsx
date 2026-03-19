import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Quiz from "../components/features/Quiz"
// import ResultPage from "./ResultPage"
import { API_BASE_URL } from "../config"

export default function QuizPage({ courseId, lessonId, quizItems = [], onBack }) {

  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  // const [showResult, setShowResult] = useState(false)
  // const [resultData, setResultData] = useState(null)
  const [error, setError] = useState("")

  const currentQuestion = quizItems[currentIndex]
  const isLastQuestion = currentIndex === quizItems.length - 1

  const handleSubmit = (selectedAnswer) => {

    const quizId = currentQuestion?._id || currentQuestion?.id

    // console.log("currentQuestion:", currentQuestion)
    // console.log("quizId saved:", quizId)
    // console.log("selectedAnswer:", selectedAnswer)
    setAnswers((prev) => [
      ...prev,
      {
        quizId: currentQuestion._id,
        selectedAnswer,
      },
    ])

    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1)
    }
  }
  // const handleSubmit = (selectedAnswer) => {
  //   const correct = selectedAnswer === currentQuestion.answer
  //   setAnswers((prev) => [
  //     ...prev,
  //     {
  //       question: currentQuestion.question,
  //       userAnswer: selectedAnswer,
  //       correctAnswer: currentQuestion.answer,
  //       explanation: currentQuestion.review,
  //       correct
  //     }
  //   ])
  //   if (!isLastQuestion) {
  //     setCurrentIndex((prev) => prev + 1)
  //   }
  // }

  async function handleCheckResult() {
    try {
      setError("")

      const token = localStorage.getItem("token")

      const response = await fetch(`${API_BASE_URL}/api/lessons/${lessonId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answers,
        }),
      })

      const data = await response.json()

      console.log("submit result data:", data)

      if (!response.ok) {
        throw new Error(data.message || "Submit failed")
      }

      // setResultData(data)
      // setShowResult(true)
      navigate(`/courses/${courseId}/lessons/${lessonId}/result`, {
        state: { resultData: data },
      })
    } catch (err) {
      console.error(err)
      setError(err.message || "Failed to submit quiz")
    }
  }

  if (!courseId) {
    setError("Course ID is missing.")
    return
  }

  // if (showResult && resultData) {
  //   return (
  //     <ResultPage
  //       score={resultData.correctCount}
  //       total={resultData.totalQuestions}
  //       answers={resultData.results.map((item) => ({
  //         question: item.question,
  //         userAnswer: item.selectedAnswer,
  //         correctAnswer: item.correctAnswer,
  //         explanation: item.review,
  //         correct: item.isCorrect,
  //       }))}
  //       onRetry={() => {
  //         setCurrentIndex(0)
  //         setAnswers([])
  //         setShowResult(false)
  //         setResultData(null)
  //         setError("")
  //       }}
  //       onBack={onBack}
  //     />
  //   )
  // }

  return (
    <Box sx={{ p: 4 }}>
      {!currentQuestion ? (
        <p>No quiz found for this lesson.</p>
      ) : (
        <>
          <Quiz
            key={currentIndex}
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={quizItems.length}
            onSubmit={handleSubmit}
          />

          {isLastQuestion && (
            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleCheckResult}
                disabled={answers.length < quizItems.length}
              >
                Check the Result
              </Button>
            </Box>
          )}
          {error && (
            <Typography sx={{ mt: 2, color: "var(--Color-Error-Main)" }}>
              {error}
            </Typography>
          )}
        </>
      )}

      <Box sx={{ mt: 3 }}>
        <Button variant="text" onClick={onBack}>
          Back to Lecture
        </Button>
      </Box>

    </Box>
  )
}