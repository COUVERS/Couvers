import { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CourseNavigation from "../components/layout/CourseNavigation"
import ContentsNavigation from "../components/layout/ContentsNavigation"
import LessonList from "./LessonList"
import PageHeader from "../components/reusable-ui/PageHeader"
import Lecture from "./LecturePage"
import QuizPage from "./QuizPage"
import { API_BASE_URL } from "../config"

import LessonLinkButton from "../components/reusable-ui/LessonLinkButton"

export default function CoursePage({ continueCourseId, continueLessonId }) {
    const [courses, setCourses] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState(null)

    const [course, setCourse] = useState(null)
    const [lessons, setLessons] = useState([])

    const [selectedLesson, setSelectedLesson] = useState(null)
    const [startedLesson, setStartedLesson] = useState(null)

    const [navMode, setNavMode] = useState("course") // "course" | "contents"
    const [viewMode, setViewMode] = useState("lessonList") // "lessonList" | "lecture"

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [quizzes, setQuizzes] = useState([])

    const [nextLessonData, setNextLessonData] = useState(null)

    const hasAppliedContinue = useRef(false)

    const matchedQuizzes = quizzes.filter(
        q => String(q.lessonId) === String(selectedLesson?._id)
    )
    const handleTakeQuiz = () => {
        setViewMode("quiz")
    }

    // console.log("selectedLesson", selectedLesson)
    // console.log("quizzes", quizzes)
    // console.log("matchedQuizzes", matchedQuizzes)

    // load courses list
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

                console.log("/api/courses status:", res.status)

                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                console.log("/api/courses data:", data)
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

    //load selected course + lessons
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

                    // initialize if back to course
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
            setNavMode("contents")
            setViewMode("lecture")
        } catch (err) {
            console.error("Failed to mark lesson as started:", err)
        }
    }

    const handleBackToLessonList = () => {
        setSelectedLesson(null)
        setNavMode("course")
        setViewMode("lessonList")
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>

            {navMode === "course" ? (
                <CourseNavigation
                    courses={courses}
                    selectedCourseId={selectedCourseId}
                    onSelectCourse={setSelectedCourseId}
                />
            ) : (
                <ContentsNavigation
                    lessons={lessons}
                    selectedLesson={selectedLesson}
                    onSelectLesson={handleOpenLesson}
                    onBack={handleBackToLessonList}
                />
            )}

            <Box sx={{ flex: 1, pt: 0, px: 0, pb: 4 }}>
                {isLoading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}

                {course && (
    <PageHeader
        title={course.title}
        description={course.description}
    />
)}
                {viewMode === "lessonList" && (
                    <>
                        {course && (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                {nextLessonData?.lessonId && nextLessonData?.hasStartedLesson && (
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                        <Typography
                                            sx={{
                                                fontSize: "32px",
                                                fontWeight: 600,
                                                letterSpacing: "-0.2px",
                                            }}
                                        >
                                            Next Lesson
                                        </Typography>

                                        <LessonLinkButton
                                            courseName={nextLessonData.courseName}
                                            iconKey={nextLessonData.iconKey}
                                            lessonTitle={nextLessonData.lessonTitle}
                                            action="continue"
                                            onClick={() => {
                                                const lesson = lessons.find(
                                                    (l) => String(l._id) === String(nextLessonData.lessonId)
                                                )
                                                if (lesson) handleOpenLesson(lesson)
                                            }}
                                        />
                                    </Box>
                                )}

                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <Typography
                                        sx={{
                                            fontSize: "32px",
                                            fontWeight: 600,
                                            letterSpacing: "-0.2px",
                                        }}
                                    >
                                        Lesson List
                                    </Typography>

                                    <LessonList
                                        lessons={lessons}
                                        onOpenLesson={handleOpenLesson}
                                    />
                                </Box>
                            </Box>
                        )}
                    </>
                )}

                {viewMode === "lecture" && selectedLesson && (
                    <Lecture
                        lessons={lessons}
                        activeLessonId={selectedLesson._id}
                        onExit={handleBackToLessonList}
                        onTakeQuiz={handleTakeQuiz}
                    />
                )}

                {viewMode === "quiz" && matchedQuizzes.length > 0 && (
                    <QuizPage
                        lessonId={selectedLesson?._id}
                        quizItems={matchedQuizzes}
                        onBack={() => setViewMode("lecture")}
                    />
                )}

            </Box>
        </Box>
    )
}