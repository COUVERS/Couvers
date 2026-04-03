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

      if (!response.ok) {
        throw new Error(data.message || "Submit failed")
      }

      await onQuizSubmitted?.()

      navigate(`/courses/${courseId}/lessons/${lessonId}/result`, {
        state: { resultData: data },
      })
    } catch (err) {
      console.error(err)
      setError(err.message || "Failed to submit quiz")
    }
  }

  return (
    <Box
      sx={{
        pt: 0,
        px: 0,
        pb: { xs: 12, sm: 4 },
      }}
    >
      {!currentQuestion ? (
        <Typography color="var(--Color-Text-Primary)">
          No quiz found for this lesson.
        </Typography>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-end", sm: "flex-end" },
                alignItems: "center",
                mt: { xs: 0, sm: 4 },
                px: { xs: "24px", sm: "32px" },
                py: { xs: "16px", sm: 0 },
                boxSizing: "border-box",

                "@media (max-width:600px)": {
                  position: "fixed",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1200,
                  background: "var(--Color-Background-Paper)",
                  boxShadow:
                    "0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 4px -1px rgba(0, 0, 0, 0.20)",
                },
              }}
            >
              <Button
                variant="contained"
                onClick={handleCheckResult}
                sx={{
                  width: { xs: "fit-content", sm: "160px" },
                  minWidth: { xs: "160px", sm: "160px" },
                  height: "48px",
                  px: { xs: "24px", sm: "40px" },
                  py: "12px",
                  ml: "auto",
                  borderRadius: "4px",
                  backgroundColor: "var(--Color-Primary-Main)",
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
                  whiteSpace: "nowrap",

                  "&:hover": {
                    backgroundColor: "var(--Color-Primary-Dark)",
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