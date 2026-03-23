import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Links from "../reusable-ui/Links"
//Icons
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'; import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined"
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"
import CheckIcon from "@mui/icons-material/Check"
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"

function getStatusIcon(status, sx = {}) {
    switch (status) {
        case "locked":
            return <LockOutlinedIcon sx={{ fontSize: 24, ...sx }} />
        case "completed":
            return <VerifiedOutlinedIcon sx={{ fontSize: 24, ...sx }} />
        default:
            return <CircleOutlinedIcon sx={{ fontSize: 24, ...sx }} />
    }
}

export default function ContentsNavItem({
    lesson,
    activeType,
    onLectureClick,
    onQuizClick,
}) {
    const isSelected = activeType === "lecture" || activeType === "quiz"
    const isLectureActive = activeType === "lecture"
    const isQuizActive = activeType === "quiz"
    const isLocked = lesson.status === "locked"

    const showPendingQuizState =
        lesson.status === "in_progress" ||
        lesson.status === "not_started"

    const selectedTextColor = "var(--Color-Text-Primary)"
    const activeLinkColor = "var(--Color-Primary-Dark)"
    const defaultTextColor = "var(--Color-Secondary-Contrast)"

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                borderRadius: 2,
                p: isSelected ? 2 : 0,
                backgroundColor: isSelected ? "var(--Color-Secondary-Contrast)" : "transparent",
                color: isSelected ? selectedTextColor : defaultTextColor,
                transition: "0.2s",
            }}
        >
            {/* Left status icon */}
            <Box sx={{ mt: "2px", display: "flex", alignItems: "flex-center" }}>
                {getStatusIcon(lesson.status, {
                    color: isSelected ? "var(--Color-Secondary-Contrast)" : undefined,
                })}
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
                    {showPendingQuizState ? (
                        <CheckIcon sx={{ fontSize: 24 }} />
                    ) : (
                        <ArticleOutlinedIcon sx={{ fontSize: 24 }} />
                    )}
                    <Links
                        onClick={() => {
                            if (!isLocked) onLectureClick?.(lesson)
                        }}
                        sx={{
                            fontWeight: 400,
                            fontSize: "var(--FontSize-Body1)",

                            textDecoration: isLocked ? "none" : "underline",

                            color: isSelected
                                ? (isLectureActive ? activeLinkColor : selectedTextColor)
                                : defaultTextColor,

                            cursor: isLocked ? "default" : "pointer",
                        }}
                    >
                        Lecture
                    </Links>
                </Box>

                {/* Quiz */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {showPendingQuizState ? (
                        <WarningAmberRoundedIcon sx={{ fontSize: 24 }} />
                    ) : (
                        <QuizOutlinedIcon sx={{ fontSize: 24 }} />
                    )}
                    <Links
                        onClick={() => {
                            if (!isLocked) onQuizClick?.(lesson)
                        }}
                        sx={{
                            fontWeight: 400,
                            fontSize: "var(--FontSize-Body1)",

                            textDecoration: isLocked ? "none" : "underline",

                            color: isSelected
                                ? (isQuizActive ? activeLinkColor : selectedTextColor)
                                : defaultTextColor,

                            cursor: isLocked ? "default" : "pointer",
                        }}
                    >
                        Quiz
                    </Links>
                </Box>
            </Box>
        </Box>
    )
}