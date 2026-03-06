import React, { useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Quiz from "../components/features/Quiz"

// we shoud change this to API
import { quizQuestions } from "../services/quizData"

export default function QuizPage() {
    const { courseId, lessonId } = useParams()
    const navigate = useNavigate()

    const questions = useMemo(() => quizQuestions, [])
    const [idx, setIdx] = useState(0)

    const current = questions[idx]

    const handleSubmit = (selected) => {
    // check the grade
    if (idx < questions.length - 1) setIdx((p) => p + 1)
    else {
      // if it is the last one -> go to the course page
        navigate(`/courses/${courseId}`)
    }
    }

    return (
    <Quiz
        question={current}
        questionNumber={idx + 1}
        totalQuestions={questions.length}
        onSubmit={handleSubmit}
    />
    )
}