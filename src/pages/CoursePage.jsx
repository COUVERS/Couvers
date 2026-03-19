import { useLocation, useParams } from "react-router-dom"
import CourseContainer from "../components/features/course/CourseContainer"

export default function CoursePage({
    continueCourseId,
    continueLessonId,
    courseResetSignal,
}) {
    const { courseId, lessonId } = useParams()
    const location = useLocation()

    const routeViewMode = location.pathname.endsWith("/result")
        ? "result"
        : location.pathname.endsWith("/quiz")
            ? "quiz"
            : location.pathname.endsWith("/lecture")
                ? "lecture"
                : "lessonList"

    return (
        <CourseContainer
            continueCourseId={continueCourseId}
            continueLessonId={continueLessonId}
            courseResetSignal={courseResetSignal}
            routeCourseId={courseId || null}
            routeLessonId={lessonId || null}
            routeViewMode={routeViewMode}
        />
    )
}