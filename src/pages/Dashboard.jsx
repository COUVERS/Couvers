import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import ContinueLearningCard from "../components/features/ContinueLearningCard"
import CourseCompletionCard from "../components/features/CourseCompletionCard"
import SkillDevelopmentRadarChart from "../components/reusable-ui/SkillDevelopmentRadarChart"
import LessonLinkButton from "../components/reusable-ui/LessonLinkButton"
import ReviewCourseCard from "../components/features/ReviewCourseCard"
import ReviewCourseLinkButton from "../components/reusable-ui/ReviewCourseLinkButton"
import CertificateCard from "../components/features/CertificateCard"
import { API_BASE_URL } from "../config"

export default function Dashboard({ onStartCourse }) {
    const [nextLesson, setNextLesson] = useState(null)
    const [error, setError] = useState("")
    const [reviewLesson, setReviewLesson] = useState(null)

    useEffect(() => {
        async function loadNextLesson() {
            try {
                setError("")

                const token = localStorage.getItem("token")

                const res = await fetch(`${API_BASE_URL}/api/dashboard/next-lesson`, {
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

    useEffect(() => {
        async function loadReviewLesson() {
            try {
                const token = localStorage.getItem("token")

                const res = await fetch(`${API_BASE_URL}/api/dashboard/review-lesson`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!res.ok) throw new Error(`HTTP ${res.status}`)

                const data = await res.json()
                setReviewLesson(data.reviewLesson)
            } catch (e) {
                console.error("review lesson error", e)
            }
        }

        loadReviewLesson()
    }, [])

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
                alignItems: "stretch",
            }}
        >
            <Box sx={{ gridColumn: { xs: "auto", md: "1 / -1" } }}>
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
            </Box>
            <Box>
                <SkillDevelopmentRadarChart />
            </Box>
            <Box>
                <CourseCompletionCard />
            </Box>
            <Box>
                <CertificateCard onTakeCourse={() => setPage("courses")} />
            </Box>
            <Box>
                <ReviewCourseCard>
                    {reviewLesson?.lessonId && (
                        <ReviewCourseLinkButton
                            courseName={reviewLesson.courseName}
                            reviewTitle={reviewLesson.lessonTitle}
                            iconKey={reviewLesson.iconKey}
                            onClick={() =>
                                onStartCourse({
                                    courseId: reviewLesson.courseId,
                                    lessonId: reviewLesson.lessonId,
                                })
                            }
                        />
                    )}
                </ReviewCourseCard>
            </Box>

            {error && <p style={{ color: "red" }}>{error}</p>}

        </Box>
    )
}