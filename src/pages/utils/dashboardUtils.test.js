import { describe, it, expect } from 'vitest'
import { getInProgressCourses, getRecommendedCourse } from './dashboardUtils'

describe('getInProgressCourses', () => {
    it('returns only courses in progress', () => {
        const courses = [
            { courseId: 1, progress: 0 },
            { courseId: 2, progress: 45 },
            { courseId: 3, progress: 100 },
            { courseId: 4, progress: 80 }
        ]

        const result = getInProgressCourses(courses)

        expect(result).toHaveLength(2)
        expect(result.map(course => course.courseId)).toEqual([2, 4])
    })

    it('returns an empty array no course is in progress', () => {
        const courses = [
            { courseId: 1, progress: 0 },
            { courseId: 2, progress: 100 }
        ]

        const result = getInProgressCourses(courses)

        expect(result).toEqual([])
    })
})

describe('getRecommendedCourse', () => {
    it('returns course with the highest progress', () => {
        const courses = [
            { courseId: 1, progress: 20 },
            { courseId: 2, progress: 75 },
            { courseId: 3, progress: 40 }
        ]

        const result = getRecommendedCourse(courses)

        expect(result).toEqual({ courseId: 2, progress: 75 })
    })
})