import { Box, Typography } from "@mui/material";
import LinearProgressBar from "./LinearProgress";

export default function ProgressBar({ title, value }) {
    const safe = Math.max(0, Math.min(100, Number(value) || 0));

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
                <Typography fontWeight={600}>{title}</Typography>
                <Typography fontWeight={600}>{safe}%</Typography>
            </Box>

            <LinearProgressBar value={safe} />
        </Box>
    )
}