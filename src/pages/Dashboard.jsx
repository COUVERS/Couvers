import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import ContinueLearningCard from "../components/features/ContinueLearningCard"
import CourseCompletionProgress from "../components/features/CourseCompletionBar"
import SkillDevelopmentRadarChart from "../components/reusable-ui/SkillDevelopmentRadarChart"
import LessonLinkButton from "../components/reusable-ui/LessonLinkButton"

export default function Dashboard({ onStartCourse }) {
    const [nextLesson, setNextLesson] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        async function loadNextLesson() {
            try {
                setError("")

                const token = localStorage.getItem("token")

                const res = await fetch("http://localhost:5050/api/dashboard/next-lesson", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!res.ok) throw new Error(`HTTP ${res.status}`)

                const data = await res.json()
                setNextLesson(data)
            } catch (e) {
                console.error("loadNextLesson error:", e)
                setError(e.message)
            }
        }

        loadNextLesson()
    }, [])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: 3,
            }}
        >
            <ContinueLearningCard onStart={() => onStartCourse(null)}>
                {nextLesson?.lessonId ? (
                    <LessonLinkButton
                        courseName={nextLesson.courseName}
                        lessonTitle={nextLesson.lessonTitle}
                        iconKey={nextLesson.iconKey}
                        action="continue"
                        onClick={() =>
                            onStartCourse({
                                courseId: nextLesson.courseId,
                                lessonId: nextLesson.lessonId,
                            })
                        }
                    />
                ) : null}
            </ContinueLearningCard>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <CourseCompletionProgress />
            <SkillDevelopmentRadarChart />
        </Box>
    )
}