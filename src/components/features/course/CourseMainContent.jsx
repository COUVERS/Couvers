import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import CourseOverview from "./CourseOverview"
import PageHeader from "../../reusable-ui/PageHeader"
import Lecture from "../../../pages/LecturePage"
import QuizPage from "../../../pages/QuizPage"
import ResultPage from "../../../pages/ResultPage"
import DialogConfirm from "../../reusable-ui/DialogConfirm"

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
    onQuizSubmitted,
}) {
    const navigate = useNavigate()
    const location = useLocation()
    const resultData = location.state?.resultData
    const [openExitLectureDialog, setOpenExitLectureDialog] = useState(false)

    const handleOpenExitLectureDialog = () => {
        setOpenExitLectureDialog(true)
    }

    const handleCloseExitLectureDialog = () => {
        setOpenExitLectureDialog(false)
    }

    const handleConfirmExitLecture = () => {
        setOpenExitLectureDialog(false)
        onBackToLessonList()
    }

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

    const isLessonView =
        viewMode === "lecture" ||
        viewMode === "quiz" ||
        viewMode === "result"

    const headerTitle =
        viewMode === "result"
            ? "Quiz Result"
            : isLessonView
                ? selectedLesson?.title || course?.title || ""
                : course?.title || ""

    const headerDescription =
        viewMode === "result"
            ? ""
            : isLessonView
                ? selectedLesson?.lessonDescription || selectedLesson?.description || course?.description || ""
                : course?.description || ""

    return (
        <Box sx={{
            flex: 1,
            pt: 0,
            px: 0,
            pb: viewMode === "lecture" ? 0 : 4,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
        }}>
            {isLoading && <p style={{ color: "var(--Color-Text-Primary)" }}>Loading...</p>}
            {error && <p style={{ color: "var(--Color-Error-Main)" }}>Error: {error}</p>}
            {(headerTitle || headerDescription) && (
                <PageHeader
                    title={headerTitle}
                    description={headerDescription}
                />
            )}

            <Box sx={{
                px: viewMode === "lecture" ? 0 : 4,
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
            }}>
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
                        onExit={handleOpenExitLectureDialog}
                        onTakeQuiz={onTakeQuiz}
                    />
                )}

                {viewMode === "quiz" && matchedQuizzes.length > 0 && (
                    <QuizPage
                        courseId={course?._id}
                        lessonId={selectedLesson?._id}
                        quizItems={matchedQuizzes}
                        onBack={onBackToLecture}
                        onQuizSubmitted={onQuizSubmitted}
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

                <DialogConfirm
                    open={openExitLectureDialog}
                    onClose={handleCloseExitLectureDialog}
                    onConfirm={handleConfirmExitLecture}
                    title="Leave This Lecture?"
                    description="If you leave now, your progress will not be saved. You will have to start over."
                />
            </Box>
        </Box>
    )
}