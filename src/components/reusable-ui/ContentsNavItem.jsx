import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Links from "../reusable-ui/Links"
//Icons
import VerifiedIcon from "../../assets/icons/VerifiedIcon"
import LockedIcon from "../../assets/icons/LockedIcon"
import CircleIcon from "../../assets/icons/CircleIcon"
import LectureIcon from "../../assets/icons/LectureIcon"
import QuizIcon from "../../assets/icons/QuizIcon"

function getStatusIcon(status) {
    switch (status) {
        case "locked":
            return <LockedIcon />
        case "completed":
            return <VerifiedIcon />
        default:
            return <CircleIcon />
    }
}

export default function ContentsNavItem({
    lesson,
    activeType, // "lecture" | "quiz" | null
    onLectureClick,
    onQuizClick,
}) {
    const isSelected = activeType === "lecture" || activeType === "quiz"
    const isLectureActive = activeType === "lecture"
    const isQuizActive = activeType === "quiz"

    const selectedTextColor = "var(--Color-Text-Primary, #0F172A)"
    const activeLinkColor = "var(--Color-Primary-Dark, #4F46E5)"
    const defaultTextColor = "#FFFFFF"

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                borderRadius: 2,
                p: isSelected ? 2 : 0,
                backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                color: isSelected ? selectedTextColor : defaultTextColor,
                transition: "0.2s",
            }}
        >
            {/* Left status icon */}
            <Box sx={{ mt: "2px", display: "flex", alignItems: "flex-start" }}>
                {getStatusIcon(lesson.status)}
            </Box>

            {/* Right content */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                    sx={{
                        fontSize: 16,
                        fontWeight: 500,
                        lineHeight: 1.4,
                        color: isSelected ? selectedTextColor : defaultTextColor,
                    }}
                >
                    {lesson.title}
                </Typography>

                {/* Lecture */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LectureIcon />
                    <Links
                        onClick={() => onLectureClick?.(lesson)}
                        sx={{
                            color: isSelected
                                ? (isLectureActive ? activeLinkColor : selectedTextColor)
                                : defaultTextColor,
                        }}
                    >
                        Lecture
                    </Links>
                </Box>

                {/* Quiz */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <QuizIcon />
                    <Links
                        onClick={() => onQuizClick?.(lesson)}
                        sx={{
                            color: isSelected
                                ? (isQuizActive ? activeLinkColor : selectedTextColor)
                                : defaultTextColor,
                        }}
                    >
                        Quiz
                    </Links>
                </Box>
            </Box>
        </Box>
    )
}