import { useEffect, useState } from "react"
import Box from "@mui/material/Box"

import CourseNavigation from "../components/layout/CourseNavigation"
import ContentsNavigation from "../components/layout/ContentsNavigation"
import LessonList from "./LessonList"
import Lecture from "./LecturePage"
import QuizPage from "./QuizPage"
// import { demoLessons } from "../library/demoLessons"

export default function CoursePage() {
    const [courses, setCourses] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState(null)

    const [course, setCourse] = useState(null)
    const [lessons, setLessons] = useState([])

    const [selectedLesson, setSelectedLesson] = useState(null)

    const [navMode, setNavMode] = useState("course") // "course" | "contents"
    const [viewMode, setViewMode] = useState("lessonList") // "lessonList" | "lecture"

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    // load courses list
    useEffect(() => {
        ; (async () => {
            try {
                setError("")
                const res = await fetch("http://127.0.0.1:5050/api/courses")
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                const data = await res.json()
                setCourses(data)

                // first course
                if (data.length > 0) setSelectedCourseId(data[0]._id)
            } catch (e) {
                setError(e.message)
            }
        })()
    }, [])

    //load selected course + lessons
    useEffect(() => {
        if (!selectedCourseId) return

            ; (async () => {
                try {
                    setIsLoading(true)
                    setError("")

                    const res = await fetch(`/api/courses/${selectedCourseId}/full`)
                    if (!res.ok) throw new Error(`HTTP ${res.status}`)
                    const data = await res.json()

                    setCourse(data.course)
                    setLessons(data.lessons)

                    // initialize if back to course
                    setSelectedLesson(null)
                    setNavMode("course")
                    setViewMode("lessonList")
                } catch (e) {
                    setError(e.message)
                    setCourse(null)
                    setLessons([])


                } finally {
                    setIsLoading(false)
                }
            })()
    }, [selectedCourseId])

    const handleOpenLesson = (lesson) => {
        setSelectedLesson(lesson)
        setNavMode("contents")
        setViewMode("lecture")
    }

    const handleBackToLessonList = () => {
        setSelectedLesson(null)
        setNavMode("course")
        setViewMode("lessonList")
    }

    const handleTakeQuiz = () => {
        setViewMode("quiz")
    }

    const handleBackToLecture = () => {
        setViewMode("lecture")
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

                {viewMode === "lessonList" && (
                    <>
                        {course && (
                            <Box sx={{ mb: 3 }}>
                                <h1 style={{ margin: 0 }}>{course.title}</h1>
                                <p style={{ marginTop: 8 }}>{course.description}</p>
                            </Box>
                        )}

                        <LessonList
                            lessons={lessons}
                            onOpenLesson={handleOpenLesson}
                        />
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

                {viewMode === "quiz" && selectedLesson && (
                    <QuizPage
                        lesson={selectedLesson}
                        onBack={handleBackToLecture}
                    />
                )}


            </Box>
        </Box>
    )
}