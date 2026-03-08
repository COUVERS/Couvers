import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Quiz from "../components/features/Quiz"
// import { quizQuestions } from "../services/quizData" //temporary

export default function QuizPage({ quizItems = [], onBack }) {
    const currentQuestion = quizItems[0]

    const handleSubmit = (selectedAnswer) => {
        console.log("selected:", selectedAnswer)
        console.log("current question:", currentQuestion)
    }

    return (
        <Box sx={{ p: 4 }}>
            {!currentQuestion ? (
                <p>No quiz found for this lesson.</p>
            ) : (
                <Quiz
                    question={currentQuestion}
                    questionNumber={1}
                    totalQuestions={quizItems.length}
                    onSubmit={handleSubmit}
                />
            )}
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
                <Button variant="text" onClick={onBack}>
                    Back to Lecture
                </Button>
            </Box>
        </Box>
    )
}