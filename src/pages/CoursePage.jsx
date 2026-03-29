import { useLocation, useParams } from "react-router-dom"
import CourseContainer from "../components/features/course/CourseContainer"
import useMediaQuery from "@mui/material/useMediaQuery"

export default function CoursePage({
    continueCourseId,
    continueLessonId,
    courseResetSignal,
    mobileCourseNavOpen,
    setMobileCourseNavOpen,
    mobileContentsNavOpen,
    setMobileContentsNavOpen,
}) {
    const isMedium = useMediaQuery("(min-width:900px) and (max-width:1095px)")
    const isMobile = useMediaQuery("(max-width:899px)")
    const { courseId, lessonId } = useParams()
    const location = useLocation()

    const routeViewMode = location.pathname.endsWith("/result")
        ? "result"
        : location.pathname.endsWith("/quiz")
            ? "quiz"
            : location.pathname.endsWith("/lecture")
                ? "lecture"
                : "lessonList"

    const isQuizView = routeViewMode === "quiz"

    return (
        <CourseContainer
            continueCourseId={continueCourseId}
            continueLessonId={continueLessonId}
            courseResetSignal={courseResetSignal}
            routeCourseId={courseId || null}
            routeLessonId={lessonId || null}
            routeViewMode={routeViewMode}
            forceCollapsed={isMedium || isQuizView}
            isMobile={isMobile}
            mobileCourseNavOpen={mobileCourseNavOpen}
            setMobileCourseNavOpen={setMobileCourseNavOpen}
            mobileContentsNavOpen={mobileContentsNavOpen}
            setMobileContentsNavOpen={setMobileContentsNavOpen}
        />
    )
}