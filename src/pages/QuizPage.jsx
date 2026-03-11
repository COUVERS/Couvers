import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Quiz from "../components/features/Quiz"

export default function QuizPage({ quizItems = [], onBack }) {

  const [currentIndex, setCurrentIndex] = useState(0)

  const currentQuestion = quizItems[currentIndex]
  const isLastQuestion = currentIndex === quizItems.length - 1

 const handleSubmit = (selectedAnswer) => {

  console.log("selected:", selectedAnswer)

  if (!isLastQuestion) {
    setCurrentIndex((prev) => prev + 1)
  }

}

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
              <Button variant="contained">
                Check the Result
              </Button>
            </Box>
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