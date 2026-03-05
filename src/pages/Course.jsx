import { useState } from "react"
import Box from "@mui/material/Box"

import CourseNavigation from "../components/layout/CourseNavigation"
import LessonList from "./LessonList"
import { demoLessons } from "../library/demoLessons"

export default function CoursePage() {

    const [selectedCourseId, setSelectedCourseId] = useState(1)

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>

            <CourseNavigation onSelectCourse={setSelectedCourseId} />

            <Box sx={{ flex: 1, p: 4 }}>
                <LessonList lessons={demoLessons} />
            </Box>

        </Box>
    )
}