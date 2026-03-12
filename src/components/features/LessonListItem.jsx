import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Links from "../reusable-ui/Links"
import LessonNumberBadge from "../reusable-ui/LessonNumberBadge"
import VerifiedIcon from "@mui/icons-material/Verified"
import ErrorIcon from "@mui/icons-material/Error"

function formatDate(dateString) {
    if (!dateString) return ""

    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}/${month}/${day}`
}

export default function LessonListItem({
    order,
    title,
    description,
    badgeVariant = "default",
    completedAt,
    status,
    onClick,
}) {
    const isLocked = status === "locked"
    const isCompleted = status === "completed"
    const isPending = status === "in_progress"

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 5,
                opacity: isLocked ? 0.7 : 1,
            }}
        >
            <LessonNumberBadge number={order} variant={badgeVariant} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <Links
                    component="button"
                    onClick={isLocked ? undefined : onClick}
                    underline="always"
                    sx={{
                        fontFamily: "IBM Plex Sans",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "normal",
                        color: isLocked ? "text.disabled" : undefined,
                        pointerEvents: isLocked ? "none" : "auto",
                        textAlign: "left",
                    }}
                >
                    {title}
                </Links>

                <Typography
                    sx={{
                        fontFamily: "IBM Plex Sans",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: isLocked ? "text.disabled" : "var(--Color-Text-Primary)",
                    }}
                >
                    {description}
                </Typography>

                {isCompleted && completedAt && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <VerifiedIcon fontSize="small" />
                        <Typography
                            sx={{
                                fontFamily: "IBM Plex Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "normal",
                                letterSpacing: "0.1px",
                                color: "var(--Color-Text-Primary)",
                            }}
                        >
                            {formatDate(completedAt)} completed!
                        </Typography>
                    </Box>
                )}

                {isPending && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <ErrorIcon fontSize="small" />
                        <Typography
                            sx={{
                                fontFamily: "IBM Plex Sans",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "normal",
                                letterSpacing: "0.1px",
                                color: "var(--Color-Text-Primary)",
                            }}
                        >
                            Quiz Pending!
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}