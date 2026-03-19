import Box from "@mui/material/Box"
import CourseOverview from "./CourseOverview"
import Header from "../../../Header"
import Lecture from "../../../pages/LecturePage"
import QuizPage from "../../../pages/QuizPage"

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
    return (
        <Box sx={{ flex: 1, p: 4 }}>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {course && (
                <Header
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
                    lessonId={selectedLesson?._id}
                    quizItems={matchedQuizzes}
                    onBack={onBackToLecture}
                />
            )}
        </Box>
    )
}