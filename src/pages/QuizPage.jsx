import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Quiz from "../components/features/Quiz"
// import ResultPage from "./ResultPage"
import { API_BASE_URL } from "../config"
import DialogConfirm from "../components/reusable-ui/DialogConfirm"


export default function QuizPage({ courseId, lessonId, quizItems = [], onBack, onQuizSubmitted }) {

  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  // const [showResult, setShowResult] = useState(false)
  // const [resultData, setResultData] = useState(null)
  const [error, setError] = useState("")
  const [openDialog, setOpenDialog] = useState(false)

  const currentQuestion = quizItems[currentIndex]
  const isLastQuestion = currentIndex === quizItems.length - 1

  const handleSubmit = (selectedAnswer) => {

    // const quizId = currentQuestion?._id || currentQuestion?.id

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

      if (!courseId) {
        throw new Error("Course ID is missing.")
      }

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

      // console.log("submit result data:", data)

      if (!response.ok) {
        throw new Error(data.message || "Submit failed")
      }
      await onQuizSubmitted?.()
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
  //       skillProgress={resultData.skillProgress}
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
    <Box sx={{ pt: 0, px: 0, pb: 4 }}>

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
            isLastQuestion={isLastQuestion}
            onBack={() => setOpenDialog(true)}
          />

          {isLastQuestion && answers.length === quizItems.length && (
            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", px: "110px" }}>
              <Button
                variant="contained"
                onClick={handleCheckResult}
                sx={{
                  width: "160px",
                  height: "48px",
                  px: "40px",
                  py: "12px",
                  borderRadius: "4px",
                  backgroundColor: "#6B63FF",
                  boxShadow:
                    "0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.20)",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "15px",
                  fontWeight: 500,
                  letterSpacing: "0.2px",
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "#5a52e0",
                  },
                }}
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


      <DialogConfirm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={() => {
          setOpenDialog(false)
          onBack()
        }}
      />
    </Box>
  )
}