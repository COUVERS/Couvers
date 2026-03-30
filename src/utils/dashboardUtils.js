export function buildRadarChart(skills, attempts) {
  const bestAttemptByLesson = new Map()

  for (const attempt of attempts) {
    const lessonId = attempt.lessonId?.toString?.() ?? attempt.lessonId
    if (!lessonId) continue

    const currentBest = bestAttemptByLesson.get(lessonId)
    const lessonScore = attempt.passed ? attempt.correctCount * 4 : 0

    if (!currentBest) {
      bestAttemptByLesson.set(lessonId, {
        attempt,
        lessonScore
      })
      continue
    }

    if (lessonScore > currentBest.lessonScore) {
      bestAttemptByLesson.set(lessonId, {
        attempt,
        lessonScore
      })
    }
  }

  const skillMap = new Map()

  for (const skill of skills) {
    const skillId = skill._id?.toString?.() ?? skill._id

    skillMap.set(skillId, {
      skillId: skill._id,
      skill: skill.name,
      score: 0,
      description: skill.description || '',
      passedLessons: 0,
      totalLessons: 5
    })
  }

  for (const { attempt, lessonScore } of bestAttemptByLesson.values()) {
    const skillId = attempt.skillId?.toString?.() ?? attempt.skillId
    if (!skillId || !skillMap.has(skillId)) continue

    const current = skillMap.get(skillId)
    current.score += lessonScore

    if (attempt.passed) {
      current.passedLessons += 1
    }
  }

  return Array.from(skillMap.values())
}