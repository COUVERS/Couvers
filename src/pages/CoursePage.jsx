import CourseContainer from "../components/features/course/CourseContainer"

export default function CoursePage({
    continueCourseId,
    continueLessonId,
    courseResetSignal,
}) {
    return (
        <CourseContainer
            continueCourseId={continueCourseId}
            continueLessonId={continueLessonId}
            courseResetSignal={courseResetSignal}
        />
    )
}