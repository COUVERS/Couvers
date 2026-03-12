import Box from "@mui/material/Box"
import LessonListItem from "../components/features/LessonListItem"

export default function LessonList({ lessons = [], onOpenLesson }) {
    console.log(
        lessons.map((lesson) => ({
            title: lesson.title,
            status: lesson.status,
        }))
    )
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {lessons.map((lesson) => {
                const badgeVariant =
                    lesson.status === "completed"
                        ? "completed"
                        : lesson.status === "locked"
                            ? "locked"
                            : "default"

                return (
                    <LessonListItem
                        key={lesson._id}
                        order={lesson.order}
                        title={lesson.title}
                        description={lesson.description || lesson.lessonDescription}
                        badgeVariant={badgeVariant}
                        completedAt={lesson.completedAt}
                        status={lesson.status}
                        onClick={() => {
                            if (lesson.status !== "locked") {
                                onOpenLesson?.(lesson)
                            }
                        }}
                    />
                )
            })}
        </Box>
    )
}