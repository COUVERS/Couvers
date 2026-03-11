import { useEffect, useState } from "react"
import Box from "@mui/material/Box"

import CourseNavigation from "../components/layout/CourseNavigation"
import ContentsNavigation from "../components/layout/ContentsNavigation"
import LessonList from "./LessonList"
import Header from "../Header"
import Lecture from "./LecturePage"
import QuizPage from "./QuizPage"
// import { demoLessons } from "../library/demoLessons"


import LessonLinkButton from "../components/reusable-ui/LessonLinkButton"
import ContinueLearningCard from "../components/features/ContinueLearningCard"

export default function CoursePage() {
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

    const matchedQuizzes = quizzes.filter(
        q => String(q.lessonId) === String(selectedLesson?._id)
    )
    const handleTakeQuiz = () => {
        setViewMode("quiz")
    }

    console.log("selectedLesson", selectedLesson)
    console.log("quizzes", quizzes)
    console.log("matchedQuizzes", matchedQuizzes)

    // load courses list
    useEffect(() => {
        ; (async () => {
            try {
                setError("")

                const token = localStorage.getItem("token")

                const res = await fetch("http://127.0.0.1:5050/api/courses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                setCourses(data)

                if (data.length > 0) setSelectedCourseId(data[0]._id)

            } catch (e) {
                setError(e.message)
            }
        })()
    }, [])

    useEffect(() => {
        setSelectedLesson(null)
        setStartedLesson(null)
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
                        `http://127.0.0.1:5050/api/courses/${selectedCourseId}/full`,
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

    const handleOpenLesson = (lesson) => {
        setSelectedLesson(lesson)
        setStartedLesson(lesson)
        setNavMode("contents")
        setViewMode("lecture")
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

            <Box sx={{ flex: 1, p: 4 }}>
                {isLoading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}

                {course && (
                    <Header
                        title={course.title}
                        description={course.description}
                    />
                )}
                {viewMode === "lessonList" && (
                    <>
                        {course && (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                {startedLesson && (
                                    <LessonLinkButton
                                        courseName={course.title}
                                        iconKey={course.icon}
                                        lessonTitle={startedLesson.title}
                                        action="continue"
                                        onClick={() => handleOpenLesson(startedLesson)}
                                    />
                                )}

                                <LessonList
                                    lessons={lessons}
                                    onOpenLesson={handleOpenLesson}
                                />
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
        quizItems={matchedQuizzes}
        onBack={() => setViewMode("lecture")}
    />
)}

            </Box>
        </Box>
    )
}