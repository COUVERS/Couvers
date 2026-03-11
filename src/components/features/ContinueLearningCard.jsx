import { Box, Typography, Button } from "@mui/material"

export default function ContinueLearningCard({ onStart }) {
    return (
        <Box
            sx={{
                height: 100,
                padding: "40px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "24px",
                borderRadius: "8px",
                background: "var(--Color-Background-Paper, #FFF)",
            }}
        >
            <Box>
                <Typography
                    sx={{
                        fontSize: "32px",
                        fontWeight: 600,
                        letterSpacing: "-0.2px",
                    }}
                >
                    Continue Learning
                </Typography>

                <Typography
                    sx={{
                        fontSize: "16px",
                        lineHeight: "24px",
                        mt: 1,
                    }}
                >
                    Ready to learn a new skill?
                </Typography>
            </Box>

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
    )
}