import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Drawer from "@mui/material/Drawer"
import useMediaQuery from "@mui/material/useMediaQuery"
import Box from "@mui/material/Box"
import CourseSidebar from "./CourseSidebar"
import CourseMainContent from "./CourseMainContent"
import { API_BASE_URL } from "../../../config"

export default function CourseContainer({
    continueCourseId,
    continueLessonId,
    courseResetSignal,
    routeCourseId,
    routeLessonId,
    routeViewMode,
    forceCollapsed = false,
    isMobile = false,
    mobileCourseNavOpen,
    setMobileCourseNavOpen,
}) {
    const navigate = useNavigate()

    const [courses, setCourses] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState(null)

    const [course, setCourse] = useState(null)
    const [lessons, setLessons] = useState([])

    const [selectedLesson, setSelectedLesson] = useState(null)
    const [startedLesson, setStartedLesson] = useState(null)

    const [viewMode, setViewMode] = useState("lessonList")
    const navMode =
        viewMode === "lessonList" ? "course" : "contents"

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [quizzes, setQuizzes] = useState([])
    const [nextLessonData, setNextLessonData] = useState(null)

    const hasAppliedContinue = useRef(false)

    const matchedQuizzes = quizzes.filter(
        (q) => String(q.lessonId) === String(selectedLesson?._id)
    )

    const goToLessonQuiz = () => {
        if (!selectedCourseId || !selectedLesson?._id) return
        navigate(`/courses/${selectedCourseId}/lessons/${selectedLesson._id}/quiz`)
    }

    const loadCourseFull = async (courseId) => {
        if (!courseId) return

        try {
            setIsLoading(true)
            setError("")

            const token = localStorage.getItem("token")

            const res = await fetch(`${API_BASE_URL}/api/courses/${courseId}/full`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data = await res.json()

            const loadedCourse = data.course || null
            const loadedLessons = data.lessons || []
            const loadedQuizzes = data.quizzes || []

            setCourse(loadedCourse)
            setLessons(loadedLessons)
            setQuizzes(loadedQuizzes)

            const nextLesson = loadedLessons.find(
                (lesson) => lesson.status !== "completed" && lesson.status !== "locked"
            )

            const hasStartedLesson = loadedLessons.some(
                (lesson) => lesson.status === "completed"
            )

            if (nextLesson && hasStartedLesson) {
                setNextLessonData({
                    courseId,
                    courseName: loadedCourse?.title || "",
                    iconKey: loadedCourse?.iconKey || loadedCourse?.icon || "empathy",
                    lessonId: nextLesson._id,
                    lessonTitle: nextLesson.title,
                    hasStartedLesson: true,
                })
            } else {
                setNextLessonData(null)
            }

        } catch (e) {
            setError(e.message)
            setCourse(null)
            setLessons([])
            setQuizzes([])
            setNextLessonData(null)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setSelectedLesson(null)
        setViewMode("lessonList")
    }, [courseResetSignal])

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
                    if (routeCourseId) {
                        goToCourseById(routeCourseId)
                    } else if (continueCourseId) {
                        goToCourseById(continueCourseId)
                    } else {
                        goToCourseById(data[0]._id)
                    }
                }
            } catch (e) {
                setError(e.message)
            }
        })()
    }, [])

    useEffect(() => {
        if (!routeCourseId) return

        setSelectedCourseId(routeCourseId)
        setSelectedLesson(null)
        setViewMode("lessonList")
    }, [routeCourseId])

    useEffect(() => {
        setSelectedLesson(null)
        setStartedLesson(null)
    }, [selectedCourseId])

    useEffect(() => {
        if (!selectedCourseId) return
        loadCourseFull(selectedCourseId)
    }, [selectedCourseId])

    useEffect(() => {
        if (routeCourseId) return
        if (!continueCourseId || hasAppliedContinue.current) return
        goToCourseById(continueCourseId)
    }, [continueCourseId, routeCourseId])

    useEffect(() => {
        if (!continueLessonId || lessons.length === 0 || hasAppliedContinue.current) return

        const lesson = lessons.find(
            (l) => String(l._id) === String(continueLessonId)
        )

        if (lesson) {
            goToLessonLecture(lesson)
            hasAppliedContinue.current = true
        }
    }, [continueLessonId, lessons])

    useEffect(() => {
        if (!routeLessonId || lessons.length === 0) return

        const lesson = lessons.find(
            (l) => String(l._id) === String(routeLessonId)
        )

        if (!lesson) return

        setSelectedLesson(lesson)

        if (routeViewMode === "quiz") {
            setViewMode("quiz")
        } else if (routeViewMode === "result") {
            setViewMode("result")
        } else {
            setViewMode("lecture")
        }
    }, [routeLessonId, routeViewMode, lessons])

    useEffect(() => {
        if (!routeCourseId) return

        if (!routeLessonId) {
            setSelectedLesson(null)
            setViewMode("lessonList")
        }
    }, [routeCourseId, routeLessonId])

    const goToLessonLecture = async (lesson) => {
        try {
            const token = localStorage.getItem("token")

            await fetch(`${API_BASE_URL}/api/lessons/${lesson._id}/start`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            navigate(`/courses/${selectedCourseId}/lessons/${lesson._id}/lecture`)
        } catch (err) {
            console.error("Failed to mark lesson as started:", err)
        }
    }

    const goToCourseOverview = () => {
        if (!selectedCourseId) return
        navigate(`/courses/${selectedCourseId}`)
    }

    const goToCourseById = (courseId) => {
        navigate(`/courses/${courseId}`)
    }

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {!isMobile && (
                <CourseSidebar
                    navMode={navMode}
                    courses={courses}
                    selectedCourseId={selectedCourseId}
                    lessons={lessons}
                    selectedLesson={selectedLesson}
                    onSelectCourse={goToCourseById}
                    onSelectLecture={goToLessonLecture}
                    onSelectQuiz={(lesson) => {
                        if (!selectedCourseId || !lesson?._id) return
                        navigate(`/courses/${selectedCourseId}/lessons/${lesson._id}/quiz`)
                    }}
                    onBack={goToCourseOverview}
                    forceCollapsed={forceCollapsed}
                />
            )}

            <CourseMainContent
                isLoading={isLoading}
                error={error}
                course={course}
                viewMode={viewMode}
                lessons={lessons}
                selectedLesson={selectedLesson}
                nextLessonData={nextLessonData}
                matchedQuizzes={matchedQuizzes}
                onOpenLesson={goToLessonLecture}
                onTakeQuiz={goToLessonQuiz}
                onBackToLessonList={goToCourseOverview}
                onBackToLecture={() => {
                    if (!selectedCourseId || !selectedLesson?._id) return
                    navigate(`/courses/${selectedCourseId}/lessons/${selectedLesson._id}/lecture`)
                }}
                onQuizSubmitted={async () => {
                    await loadCourseFull(selectedCourseId)
                }}
            />

            {isMobile && (
                <Drawer
                    anchor="left"
                    open={mobileCourseNavOpen}
                    onClose={() => setMobileCourseNavOpen(false)}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: "240px",
                            maxWidth: "240px",
                            overflowX: "hidden",
                        },
                    }}
                >
                    <CourseSidebar
                        navMode={navMode}
                        courses={courses}
                        selectedCourseId={selectedCourseId}
                        lessons={lessons}
                        selectedLesson={selectedLesson}
                        onSelectCourse={(id) => {
                            setMobileCourseNavOpen(false)
                            goToCourseById(id)
                        }}
                        onSelectLecture={(lesson) => {
                            setMobileCourseNavOpen(false)
                            goToLessonLecture(lesson)
                        }}
                        onSelectQuiz={(lesson) => {
                            setMobileCourseNavOpen(false)
                            if (!selectedCourseId || !lesson?._id) return
                            navigate(`/courses/${selectedCourseId}/lessons/${lesson._id}/quiz`)
                        }}
                        onBack={() => {
                            setMobileCourseNavOpen(false)
                            goToCourseOverview()
                        }}
                        forceCollapsed={false}
                    />
                </Drawer>
            )}
        </Box>
    )
}