import { describe, it, expect } from 'vitest'
import { buildRadarChart } from './dashboardUtils.js'

describe('buildRadarChart', () => {
    it('uses the best lessonScore per lesson and sums scores by skill', () => {
        const skills = [
        {
            _id: 'skillA',
            name: 'Pacing',
            description: 'Keeps lessons at an effective speed'
        },
        {
            _id: 'skillB',
            name: 'Lesson Structure',
            description: 'Organizes lessons clearly'
        }
        ]

        const attempts = [
        {
            lessonId: 'lesson1',
            skillId: 'skillA',
            correctCount: 3,
            passed: false,
            submittedAt: '2026-03-12T03:35:56.873Z'
        },
        {
            lessonId: 'lesson1',
            skillId: 'skillA',
            correctCount: 4,
            passed: true,
            submittedAt: '2026-03-12T03:37:20.531Z'
        },
        {
            lessonId: 'lesson2',
            skillId: 'skillA',
            correctCount: 5,
            passed: true,
            submittedAt: '2026-03-12T03:50:00.000Z'
        },
        {
            lessonId: 'lesson3',
            skillId: 'skillB',
            correctCount: 2,
            passed: false,
            submittedAt: '2026-03-12T04:00:00.000Z'
        },
        {
            lessonId: 'lesson3',
            skillId: 'skillB',
            correctCount: 4,
            passed: true,
            submittedAt: '2026-03-12T04:05:00.000Z'
        }
        ]

        const result = buildRadarChart(skills, attempts)

        expect(result).toEqual([
        {
            skillId: 'skillA',
            skill: 'Pacing',
            score: 36,
            description: 'Keeps lessons at an effective speed',
            passedLessons: 2,
            totalLessons: 5
        },
        {
            skillId: 'skillB',
            skill: 'Lesson Structure',
            score: 16,
            description: 'Organizes lessons clearly',
            passedLessons: 1,
            totalLessons: 5
        }
        ])
    })

    it('returns all skills with zero scores when there are no attempts', () => {
        const skills = [
        { _id: 'skillA', name: 'Pacing', description: '' },
        { _id: 'skillB', name: 'Lesson Structure', description: '' }
        ]

        const result = buildRadarChart(skills, [])

        expect(result).toEqual([
        {
            skillId: 'skillA',
            skill: 'Pacing',
            score: 0,
            description: '',
            passedLessons: 0,
            totalLessons: 5
        },
        {
            skillId: 'skillB',
            skill: 'Lesson Structure',
            score: 0,
            description: '',
            passedLessons: 0,
            totalLessons: 5
        }
        ])
    })

    it('gives 0 lessonScore when attempt is not passed even if correctCount exists', () => {
        const skills = [
        { _id: 'skillA', name: 'Pacing', description: '' }
        ]

        const attempts = [
        {
            lessonId: 'lesson1',
            skillId: 'skillA',
            correctCount: 3,
            passed: false
        }
        ]

        const result = buildRadarChart(skills, attempts)

        expect(result[0].score).toBe(0)
        expect(result[0].passedLessons).toBe(0)
    })
})