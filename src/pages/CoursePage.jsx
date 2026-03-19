import { useParams } from "react-router-dom"
import CourseContainer from "../components/features/course/CourseContainer"

export default function CoursePage({
    continueCourseId,
    continueLessonId,
    courseResetSignal,
}) {
    const { courseId } = useParams()

    return (
        <CourseContainer
            continueCourseId={continueCourseId}
            continueLessonId={continueLessonId}
            courseResetSignal={courseResetSignal}
            routeCourseId={courseId || null}
        />
    )
}