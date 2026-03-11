import Box from "@mui/material/Box"
import LessonListItem from "../components/features/LessonListItem"

export default function LessonList({ lessons = [], onOpenLesson }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {lessons.map((lesson) => (
                <LessonListItem
                    key={lesson._id}
                    order={lesson.order}
                    title={lesson.title}
                    description={lesson.description}
                    badgeVariant="default"
                    onClick={() => onOpenLesson?.(lesson)}
                />
            ))}
        </Box>
    );
}