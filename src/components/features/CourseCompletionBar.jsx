import { Box, Typography } from "@mui/material";
import ProgressBar from "../reusable-ui/ProgressBar";

export default function CourseCompletionProgress({ items = [] }) {
    return (
        <Box
            sx={{
                display: "flex",
                width: "592px",
                padding: "40px 32px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "32px",
            }}
        >
            <Typography sx={{ fontSize: "var(--FontSize-Headings-h2)", fontWeight: 600 }}>
                Course Completion Progress
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                    width: "100%",
                }}
            >
                {items.map((item) => (
                    <ProgressBar
                        key={item.id ?? item.title}
                        title={item.title}
                        value={item.value}
                    />
                ))}
            </Box>
        </Box>
    )
}