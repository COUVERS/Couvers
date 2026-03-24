import { LinearProgress } from "@mui/material";

export default function LinearProgressBar({ value }) {
    const safe = Math.max(0, Math.min(100, Number(value) || 0));
    const isComplete = safe === 100

    return (
        <LinearProgress
            variant="determinate"
            value={safe}
            sx={{
                width: "100%",
                height: 4,
                backgroundColor: "var(--Color-Primary-Light)",
                "& .MuiLinearProgress-bar": {
                    backgroundColor: isComplete
                        ? "var(--Color-Success-Main)"
                        : "var(--Color-Primary-Main)",
                },
            }}
        />
    )
}