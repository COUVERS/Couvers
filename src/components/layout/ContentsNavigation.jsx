import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

export default function ContentsNavigation({
    lessons = [],
    selectedLesson,
    onSelectLesson,
    onBack,
}) {
    return (
        <Box
        >
            {/* Back */}
            <Link
                component="button"
                onClick={onBack}
                underline="none"

            >
                ← Back to Course
            </Link>

            {/* Title */}
            <Typography
            >
                Contents
            </Typography>

            {/* Lesson list */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {lessons.map((lesson) => {
                    const isActive = selectedLesson?._id === lesson._id

                    return (
                        <Box
                            key={lesson._id}
                            onClick={() => onSelectLesson?.(lesson)}
                        >
                            <Typography
                            >
                                Lesson {lesson.order}
                            </Typography>

                            <Typography
                            >
                                {lesson.title}
                            </Typography>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}