import CourseContainer from "../components/features/course/CourseContainer"

export default function CoursePage({ continueCourseId, continueLessonId }) {
    return (
        <CourseContainer
            continueCourseId={continueCourseId}
            continueLessonId={continueLessonId}
        />
    )
}