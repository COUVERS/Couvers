import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Quiz from "../components/features/Quiz"
import { API_BASE_URL } from "../config"
import DialogConfirm from "../components/reusable-ui/DialogConfirm"

export default function QuizPage({ courseId, lessonId, quizItems = [], onBack, onQuizSubmitted }) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState("")
  const [openDialog, setOpenDialog] = useState(false)

  const currentQuestion = quizItems[currentIndex]
  const isLastQuestion = currentIndex === quizItems.length - 1

  const handleSubmit = async (selectedAnswer, options = {}) => {
    const nextAnswers = [
      ...answers,
      {
        quizId: currentQuestion._id,
        selectedAnswer,
      },
    ]

    setAnswers(nextAnswers)

    if (options.isFinal) {
      await handleCheckResult(nextAnswers)
      return
    }

    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  async function handleCheckResult(finalAnswers = answers) {
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
          answers: finalAnswers,
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
        pb: 0,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
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