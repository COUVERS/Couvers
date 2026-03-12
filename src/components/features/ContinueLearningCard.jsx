import { Box, Typography, Button } from "@mui/material"

export default function ContinueLearningCard({
    title = "Continue Learning",
    description = "Ready to learn a new skill?",
    onStart,
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
                    fontSize: "32px",
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
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "24px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "16px",
                            lineHeight: "24px",
                            mt: 1,
                        }}
                    >
                        {description}
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={onStart}
                        sx={{
                            width: 126,
                            height: 44,
                        }}
                    >
                        Get Started
                    </Button>
                </Box>
            )}
        </Box>
    )
}