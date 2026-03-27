import { Box, Typography } from "@mui/material"; import { Link as RouterLink } from "react-router-dom";
import Links from "../reusable-ui/Links";
import LinearProgressBar from "./LinearProgress";

export default function ProgressBar({ title, value, courseId }) {
    const safe = Math.max(0, Math.min(100, Number(value) || 0))

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                }}
            >
                <Links
                    component={RouterLink}
                    to={`/courses/${courseId}`}
                    underline="always"
                    sx={{
                        fontSize: "var(--FontSize-Headings-h3)",
                        fontWeight: 600,
                        color: "var(--Color-Info-Main)",
                        textDecorationColor:
                            "var(--Color-Info-Main)",
                        "@media (max-width:650px)": {
                            fontSize: "18px",
                        },
                        "&:hover": {
                            textDecorationColor:
                                "color-mix(in srgb, var(--Color-Info-Main) 40%, transparent)",
                        },
                    }}
                >
                    {title}
                </Links>
                <Typography
                    fontWeight={500}
                    sx={{
                        color: "var(--Color-Info-Dark, #1E3A8A)",
                    }}
                >
                    {safe}%
                </Typography>
            </Box>

            <Box
                sx={{
                    pr: "50px",
                }}
            >
                <LinearProgressBar value={safe} />
            </Box>
        </Box>
    )
}