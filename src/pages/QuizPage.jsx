import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Quiz from "../components/features/Quiz"
import ResultPage from "./ResultPage"

export default function QuizPage({ quizItems = [], onBack }) {

  const [currentIndex, setCurrentIndex] = useState(0)

  const [answers, setAnswers] = useState([])
const [showResult, setShowResult] = useState(false)
  const currentQuestion = quizItems[currentIndex]
  const isLastQuestion = currentIndex === quizItems.length - 1
 const score = answers.filter(a => a.correct).length

 const handleSubmit = (selectedAnswer) => {

  const correct = selectedAnswer === currentQuestion.answer

  setAnswers((prev) => [
    ...prev,
    {
      question: currentQuestion.question,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestion.answer,
      explanation: currentQuestion.review,
      correct
    }
  ])

  if (!isLastQuestion) {
    setCurrentIndex((prev) => prev + 1)
  }

}

if (showResult) {
  return (
    <ResultPage
      score={score}
      total={quizItems.length}
      answers={answers}
      onRetry={() => {
        setCurrentIndex(0)
        setAnswers([])
        setShowResult(false)
      }}
      onBack={onBack}
    />
  )
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
              <Button
  variant="contained"
  onClick={() => setShowResult(true)}
>
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