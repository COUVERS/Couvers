import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ProgressBar from "../reusable-ui/ProgressBar";

export default function CourseCompletionProgress() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCourseProgress() {
            try {
                setError("");

                const token = localStorage.getItem("token");

                const res = await fetch("https://covers-backend.onrender.com/api/dashboard/courses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error(`Failed (${res.status})`);

                const data = await res.json();

                setItems(
                    data.courses.map((course) => ({
                        id: course.courseId,
                        title: course.title,
                        value: course.progress,
                    }))
                );
            } catch (e) {
                console.error("loadCourseProgress error:", e);
                setError(e.message || "Failed to load course progress");
            }
        }

        loadCourseProgress();
    }, []);

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

            {error && (
                <Typography sx={{ color: "var(--Color-Error-Main)" }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
                {items.map((item) => (
                    <ProgressBar key={item.id} title={item.title} value={item.value} />
                ))}
            </Box>
        </Box>
    );
}