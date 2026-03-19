import { useState } from "react"
import { API_BASE_URL } from "../../config"

export default function QuizSubmit() {
    const [quizId, setQuizId] = useState("")
    const [lessonId, setLessonId] = useState("")
    const [score, setScore] = useState("")
    const [message, setMessage] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const token = localStorage.getItem("token")

            const response = await fetch(`${API_BASE_URL}/api/quiz-attempts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    quizId,
                    lessonId,
                    score: Number(score),
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Submit failed")
            }

            setMessage("Quiz submitted successfully")
        } catch (error) {
            console.error(error)
            setMessage(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Quiz ID</label>
                <input
                    value={quizId}
                    onChange={(e) => setQuizId(e.target.value)}
                />
            </div>

            <div>
                <label>Lesson ID</label>
                <input
                    value={lessonId}
                    onChange={(e) => setLessonId(e.target.value)}
                />
            </div>

            <div>
                <label>Score</label>
                <input
                    type="number"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                />
            </div>

            <button type="submit">Submit Quiz</button>

            {message && <p>{message}</p>}
        </form>
    )
}