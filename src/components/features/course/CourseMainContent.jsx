import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Header from "../../../Header"
import LessonList from "../../../pages/LessonList"
import Lecture from "../../../pages/LecturePage"
import QuizPage from "../../../pages/QuizPage"
import LessonLinkButton from "../../reusable-ui/LessonLinkButton"

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
                <>
                    {course && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {nextLessonData?.lessonId && nextLessonData?.hasStartedLesson && (
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <Typography
                                        sx={{
                                            fontSize: "32px",
                                            fontWeight: 600,
                                            letterSpacing: "-0.2px",
                                        }}
                                    >
                                        Next Lesson
                                    </Typography>

                                    <LessonLinkButton
                                        courseName={nextLessonData.courseName}
                                        iconKey={nextLessonData.iconKey}
                                        lessonTitle={nextLessonData.lessonTitle}
                                        action="continue"
                                        onClick={() => {
                                            const lesson = lessons.find(
                                                (l) => String(l._id) === String(nextLessonData.lessonId)
                                            )
                                            if (lesson) onOpenLesson(lesson)
                                        }}
                                    />
                                </Box>
                            )}

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Typography
                                    sx={{
                                        fontSize: "32px",
                                        fontWeight: 600,
                                        letterSpacing: "-0.2px",
                                    }}
                                >
                                    Lesson List
                                </Typography>

                                <LessonList
                                    lessons={lessons}
                                    onOpenLesson={onOpenLesson}
                                />
                            </Box>
                        </Box>
                    )}
                </>
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