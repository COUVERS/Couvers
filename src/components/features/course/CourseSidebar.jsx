import CourseNavigation from "../../layout/CourseNavigation"
import ContentsNavigation from "../../layout/ContentsNavigation"

export default function CourseSidebar({
    navMode,
    courses,
    selectedCourseId,
    lessons,
    selectedLesson,
    onSelectCourse,
    onSelectLecture,
    onSelectQuiz,
    onBack,
    forceCollapsed = false,
    isMobileDrawer = false,
}) {


    if (navMode === "course") {
        return (
            <CourseNavigation
                courses={courses}
                selectedCourseId={selectedCourseId}
                onSelectCourse={onSelectCourse}
                forceCollapsed={forceCollapsed}
                isMobileDrawer={isMobileDrawer}
            />
        )
    }

    return (
        <ContentsNavigation
            lessons={lessons}
            selectedLesson={selectedLesson}
            onSelectLecture={onSelectLecture}
            onSelectQuiz={onSelectQuiz}
            onBack={onBack}
            forceCollapsed={forceCollapsed}
        />
    )
}