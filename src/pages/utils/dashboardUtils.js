export function getInProgressCourses(courses) {
    return courses.filter(
        (course) => Number(course.progress) > 0 && Number(course.progress) < 100
    )
}

export function getRecommendedCourse(courses) {
    const inProgressCourses = getInProgressCourses(courses)

    return (
        inProgressCourses.sort((a, b) => Number(b.progress) - Number(a.progress))[0] || null
    )
}