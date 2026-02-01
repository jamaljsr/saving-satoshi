// e2e/fixtures/progress.fixture.ts
import { LESSONS, getLessonsByChapter, getLessonByKey } from '../data/lessons'

/**
 * Build a progress state object that marks all lessons up to (but not including)
 * a specific chapter as completed. This allows tests to start at any chapter.
 *
 * The progress state format matches what the backend expects.
 */
export function buildProgressForChapter(targetChapter: number): object {
  const completedLessons: Record<string, boolean> = {}

  // Mark all lessons in chapters before targetChapter as completed.
  for (let chapter = 1; chapter < targetChapter; chapter++) {
    const lessons = getLessonsByChapter(chapter)
    for (const lesson of lessons) {
      completedLessons[lesson.key] = true
    }
  }

  return {
    chapters: buildChaptersState(targetChapter),
    lessons: completedLessons,
  }
}

/**
 * Build chapter progress state.
 */
function buildChaptersState(
  targetChapter: number
): Record<string, { completed: boolean }> {
  const chapters: Record<string, { completed: boolean }> = {}

  for (let i = 1; i <= 10; i++) {
    chapters[`chapter-${i}`] = {
      completed: i < targetChapter,
    }
  }

  return chapters
}

/**
 * Build progress state that has completed up to a specific lesson.
 * Useful for testing mid-chapter scenarios.
 */
export function buildProgressUpToLesson(lessonKey: string): object {
  const completedLessons: Record<string, boolean> = {}
  const targetLesson = getLessonByKey(lessonKey)

  if (!targetLesson) {
    throw new Error(`Lesson not found: ${lessonKey}`)
  }

  for (const lesson of LESSONS) {
    if (lesson.chapter < targetLesson.chapter) {
      completedLessons[lesson.key] = true
    } else if (lesson.chapter === targetLesson.chapter) {
      // Stop when we hit the target lesson.
      if (lesson.key === lessonKey) {
        break
      }
      completedLessons[lesson.key] = true
    }
  }

  return {
    chapters: buildChaptersState(targetLesson.chapter),
    lessons: completedLessons,
  }
}
