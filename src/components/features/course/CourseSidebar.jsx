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
    forceCollapsed = false,
}) {


    if (navMode === "course") {
        return (
            <CourseNavigation
                courses={courses}
                selectedCourseId={selectedCourseId}
                onSelectCourse={onSelectCourse}
                forceCollapsed={forceCollapsed}
            />
        )
    }

    return (
        <ContentsNavigation
            lessons={lessons}
            selectedLesson={selectedLesson}
            onSelectLesson={onSelectLesson}
            onBack={onBack}
            forceCollapsed={forceCollapsed}
        />
    )
}