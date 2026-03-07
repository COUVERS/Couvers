import { useEffect, useState } from "react"
import Box from "@mui/material/Box"

import CourseNavigation from "../components/layout/CourseNavigation"
import LessonList from "./LessonList"
// import { demoLessons } from "../library/demoLessons"

export default function CoursePage() {
    const [courses, setCourses] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState(null)

    const [course, setCourse] = useState(null)
    const [lessons, setLessons] = useState([])

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const openLesson = (lessonId) => {
        setActiveLessonId(lessonId)
        setNavMode("contents")
        setViewMode("lecture")
    }

    const backToCourse = () => {
        setNavMode("course")
        setViewMode("lessonList")
        setActiveLessonId(null)
    }


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

    const courseNumber = [
        { },
    ]
    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <CourseNavigation
                courses={courses}
                selectedCourseId={selectedCourseId}
                onSelectCourse={setSelectedCourseId}
            />

            <Box sx={{ flex: 1, p: 4 }}>
                {isLoading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <ul>
                {courses.map((c) => (
                    <li key={c._id} style={{ marginBottom: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {}
                            <strong>{c.title}</strong>
                        </div>
                        <div>{c.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}