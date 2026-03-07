import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ProgressBar from "../reusable-ui/ProgressBar";

export default function CourseCompletionProgress() {

    const [items, setItems] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadCourses() {
            try {
                setError("");
                const res = await fetch("/api/courses")
                if (!res.ok) throw new Error(`Failed (${res.status})`)
                const courses = await res.json()

                setItems(
                    courses.map((c) => ({
                        id: c._id,
                        title: c.title,
                        value: 0,
                    }))
                )
            } catch (e) {
                setError(e.message || "Failed to load courses");
            }
        }
        loadCourses()
    }, [])

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

            {error && <Typography sx={{ color: "var(--Color-Error-Main)" }}>{error}</Typography>}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
                {items.map((item) => (
                    <ProgressBar key={item.id} title={item.title} value={item.value} />
                ))}
            </Box>
        </Box>
    )
}