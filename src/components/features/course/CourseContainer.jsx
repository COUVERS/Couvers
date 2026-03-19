import { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import CourseSidebar from "./CourseSidebar"
import CourseMainContent from "./CourseMainContent"
import { API_BASE_URL } from "../../../config"

export default function CourseContainer({ continueCourseId, continueLessonId }) {
    const [courses, setCourses] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState(null)

    const [course, setCourse] = useState(null)
    const [lessons, setLessons] = useState([])

    const [selectedLesson, setSelectedLesson] = useState(null)
    const [startedLesson, setStartedLesson] = useState(null)

    const [viewMode, setViewMode] = useState("lessonList")
    const navMode = viewMode === "lessonList" ? "course" : "contents"

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [quizzes, setQuizzes] = useState([])
    const [nextLessonData, setNextLessonData] = useState(null)

    const hasAppliedContinue = useRef(false)

    const matchedQuizzes = quizzes.filter(
        (q) => String(q.lessonId) === String(selectedLesson?._id)
    )

    const handleTakeQuiz = () => {
        setViewMode("quiz")
    }

    useEffect(() => {
        ; (async () => {
            try {
                setError("")

                const token = localStorage.getItem("token")

                const res = await fetch(`${API_BASE_URL}/api/courses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                setCourses(data)

                if (data.length > 0) {
                    if (continueCourseId) {
                        setSelectedCourseId(continueCourseId)
                    } else {
                        setSelectedCourseId(data[0]._id)
                    }
                }
            } catch (e) {
                setError(e.message)
            }
        })()
    }, [])

    useEffect(() => {
        setSelectedLesson(null)
        setStartedLesson(null)
    }, [selectedCourseId])

    useEffect(() => {
        if (!selectedCourseId) return

            ; (async () => {
                try {
                    const token = localStorage.getItem("token")

                    const res = await fetch(`${API_BASE_URL}/api/dashboard/next-lesson`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })

                    if (!res.ok) throw new Error(`HTTP ${res.status}`)

                    const data = await res.json()

                    if (String(data.courseId) === String(selectedCourseId)) {
                        setNextLessonData(data)
                    } else {
                        setNextLessonData(null)
                    }
                } catch (e) {
                    console.error("load next lesson error:", e)
                    setNextLessonData(null)
                }
            })()
    }, [selectedCourseId])

    useEffect(() => {
        if (!selectedCourseId) return

            ; (async () => {
                try {
                    setIsLoading(true)
                    setError("")

                    const token = localStorage.getItem("token")

                    const res = await fetch(
                        `${API_BASE_URL}/api/courses/${selectedCourseId}/full`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )

                    if (!res.ok) throw new Error(`HTTP ${res.status}`)
                    const data = await res.json()

                    setCourse(data.course || null)
                    setLessons(data.lessons || [])
                    setQuizzes(data.quizzes || [])
                } catch (e) {
                    setError(e.message)
                    setCourse(null)
                    setLessons([])
                    setQuizzes([])
                } finally {
                    setIsLoading(false)
                }
            })()
    }, [selectedCourseId])

    useEffect(() => {
        if (!continueCourseId || hasAppliedContinue.current) return
        setSelectedCourseId(continueCourseId)
    }, [continueCourseId])

    useEffect(() => {
        if (!continueLessonId || lessons.length === 0 || hasAppliedContinue.current) return

        const lesson = lessons.find(
            (l) => String(l._id) === String(continueLessonId)
        )

        if (lesson) {
            handleOpenLesson(lesson)
            hasAppliedContinue.current = true
        }
    }, [continueLessonId, lessons])

    const handleOpenLesson = async (lesson) => {
        try {
            const token = localStorage.getItem("token")

            await fetch(`${API_BASE_URL}/api/lessons/${lesson._id}/start`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setSelectedLesson(lesson)
            setStartedLesson(lesson)
            setViewMode("lecture")
        } catch (err) {
            console.error("Failed to mark lesson as started:", err)
        }
    }

    const handleBackToLessonList = () => {
        setSelectedLesson(null)
        setViewMode("lessonList")
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <CourseSidebar
                navMode={navMode}
                courses={courses}
                selectedCourseId={selectedCourseId}
                lessons={lessons}
                selectedLesson={selectedLesson}
                onSelectCourse={setSelectedCourseId}
                onSelectLesson={handleOpenLesson}
                onBack={handleBackToLessonList}
            />

            <CourseMainContent
                isLoading={isLoading}
                error={error}
                course={course}
                viewMode={viewMode}
                lessons={lessons}
                selectedLesson={selectedLesson}
                nextLessonData={nextLessonData}
                matchedQuizzes={matchedQuizzes}
                onOpenLesson={handleOpenLesson}
                onTakeQuiz={handleTakeQuiz}
                onBackToLessonList={handleBackToLessonList}
                onBackToLecture={() => setViewMode("lecture")}
            />
        </Box>
    )
}