import CourseNavigation from "../../layout/CourseNavigation"
import ContentsNavigation from "../../layout/ContentsNavigation"

export default function CourseSidebar({
    navMode,
    courses,
    selectedCourseId,
    lessons,
    selectedLesson,
    onSelectCourse,
    onSelectLesson,
    onBack,
}) {
    if (navMode === "hidden") {
        return null
    }

    if (navMode === "course") {
        return (
            <CourseNavigation
                courses={courses}
                selectedCourseId={selectedCourseId}
                onSelectCourse={onSelectCourse}
            />
        )
    }

    return (
        <ContentsNavigation
            lessons={lessons}
            selectedLesson={selectedLesson}
            onSelectLesson={onSelectLesson}
            onBack={onBack}
        />
    )
}