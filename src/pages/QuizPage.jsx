import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Quiz from "../components/features/Quiz"
import { quizQuestions } from "../services/quizData" //temporary

export default function QuizPage({ lesson, onBack }) {
    // console.log("lesson:", lesson)
    // console.log("lesson keys:", Object.keys(lesson || {}))
    // console.log("lesson full:", JSON.stringify(lesson, null, 2))
    const currentQuestion = quizQuestions[0]

    const handleSubmit = (selectedAnswer) => {
        console.log("selected:", selectedAnswer)
        console.log("correct:", currentQuestion.correctAnswer)
    }

    return (
        <Box sx={{ p: 4 }}>

            <Quiz
                question={currentQuestion}
                questionNumber={1}
                totalQuestions={quizQuestions.length}
                onSubmit={handleSubmit}
            />
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
                <Button variant="text" onClick={onBack}>
                    Back to Lecture
                </Button>
            </Box>
        </Box>
    )
}