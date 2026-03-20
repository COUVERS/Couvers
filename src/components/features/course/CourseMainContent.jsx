import { useLocation, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import CourseOverview from "./CourseOverview"
import PageHeader from "../../reusable-ui/PageHeader"
import Lecture from "../../../pages/LecturePage"
import QuizPage from "../../../pages/QuizPage"
import ResultPage from "../../../pages/ResultPage"

export default function CourseMainContent({
    isLoading,
    error,
    course,
    viewMode,
    lessons,
    selectedLesson,
    nextLessonData,
    matchedQuizzes,
    onOpenLesson,
    onTakeQuiz,
    onBackToLessonList,
    onBackToLecture,
}) {
    const navigate = useNavigate()
    const location = useLocation()
    const resultData = location.state?.resultData

    const resultAnswers =
        resultData?.results?.map((item) => ({
            question: item.question,
            userAnswer: item.selectedAnswer,
            correctAnswer: item.correctAnswer,
            explanation: item.review,
            correct: item.isCorrect,
        })) || []

    const resultScore = resultData?.correctCount ?? 0
    const resultTotal = resultData?.totalQuestions ?? 0

    const resultSkillProgress = resultData?.skillProgress ?? null

    return (
        <Box sx={{ flex: 1, pt: 0, px: 0, pb: 4 }}>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {course && (
                <PageHeader
                    title={course.title}
                    description={course.description}
                />
            )}

            {viewMode === "lessonList" && (
                <CourseOverview
                    course={course}
                    lessons={lessons}
                    nextLessonData={nextLessonData}
                    onOpenLesson={onOpenLesson}
                />
            )}

            {viewMode === "lecture" && selectedLesson && (
                <Lecture
                    lessons={lessons}
                    activeLessonId={selectedLesson._id}
                    onExit={onBackToLessonList}
                    onTakeQuiz={onTakeQuiz}
                />
            )}

            {viewMode === "quiz" && matchedQuizzes.length > 0 && (
                <QuizPage
                    courseId={course?._id}
                    lessonId={selectedLesson?._id}
                    quizItems={matchedQuizzes}
                    onBack={onBackToLecture}
                />
            )}

            {viewMode === "result" && (
                <ResultPage
                    score={resultScore}
                    total={resultTotal}
                    answers={resultAnswers}
                    skillProgress={resultSkillProgress}
                    onRetry={() => {
                        if (!selectedLesson?._id || !course?._id) return
                        navigate(`/courses/${course._id}/lessons/${selectedLesson._id}/quiz`)
                    }}
                    onBack={() => {
                        navigate("/")
                    }}
                />
            )}
        </Box>
    )
}