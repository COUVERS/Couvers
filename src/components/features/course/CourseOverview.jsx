import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import LessonList from "../../../pages/LessonList"
import LessonLinkButton from "../../reusable-ui/LessonLinkButton"

export default function CourseOverview({
    course,
    lessons,
    nextLessonData,
    onOpenLesson,
}) {
    if (!course) return null

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5, mt: 5, }}>
            {nextLessonData?.lessonId && nextLessonData?.hasStartedLesson && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography
                        sx={{
                            color: "var(--Color-Secondary-Main)",
                            fontSize: "var(--FontSize-Headings-h2)",
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

            <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <Typography
                    sx={{
                        color: "var(--Color-Secondary-Main)",
                        fontSize: "var(--FontSize-Headings-h2)",
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
    )
}