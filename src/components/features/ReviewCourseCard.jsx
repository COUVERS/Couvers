import { Box, Typography } from "@mui/material"

export default function ReviewCourseCard({
    title = "Review Course",
    emptyTitle = "All Catch up",
    emptyDescription = "You have no courses needing review right now.",
    children,
}) {
    return (
        <Box
            sx={{
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                borderRadius: "8px",
                background: "var(--Color-Background-Paper, #FFF)",
            }}
        >
            <Typography
                sx={{
                    fontSize: "var(--FontSize-Headings-h2)",
                    fontWeight: 600,
                    letterSpacing: "-0.2px",
                }}
            >
                {title}
            </Typography>

            {children ? (
                children
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "16px",
                            fontWeight: 700,
                            lineHeight: 1.4,
                        }}
                    >
                        {emptyTitle}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "var(--Color-Text-Secondary)",
                        }}
                    >
                        {emptyDescription}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}