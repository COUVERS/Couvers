import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Links from "../reusable-ui/Links"
//Icons
import VerifiedIcon from "@mui/icons-material/Verified"
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LectureIcon from "../../assets/icons/LectureIcon"
import QuizIcon from "../../assets/icons/QuizIcon"

function getStatusIcon(status) {
    switch (status) {
        case "locked":
            return <LockOutlinedIcon fontSize="small" />
        case "completed":
            return <VerifiedIcon fontSize="small" />
        default:
            return <CircleOutlinedIcon fontSize="small" />
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
    const isLocked = lesson.status === "locked"

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
            <Box sx={{ mt: "2px", display: "flex", alignItems: "flex-center" }}>
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
                        onClick={() => {
                            if (!isLocked) onLectureClick?.(lesson)
                        }}
                    >
                        Lecture
                    </Links>
                </Box>

                {/* Quiz */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <QuizIcon />
                    <Links
                        onClick={() => {
                            if (!isLocked) onQuizClick?.(lesson)
                        }}
                    >
                        Quiz
                    </Links>
                </Box>
            </Box>
        </Box>
    )
}