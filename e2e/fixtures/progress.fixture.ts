import {
  ChapterInState,
  ChapterWithDifficulties,
  ChapterWithoutDifficulties,
  CourseProgress,
  LessonInState,
} from '../../types'
import {
  getChapter6Lessons,
  getLessonByKey,
  getLessonPath,
  getLessonsByChapter,
  LessonInfo,
} from '../data/lessons'

// This needs to be duplicated from progressState.ts to avoid importing the entire
// state management module into the e2e tests, which causes playwright to break.
export enum DifficultyLevel {
  NORMAL = 'NORMAL',
  HARD = 'HARD',
}

/**
 * Build a progress state object that marks all lessons up to (but not including)
 * a specific chapter as completed. This allows tests to start at any chapter.
 *
 * The progress state format matches the frontend CourseProgress type.
 */
export function buildProgressForChapter(targetChapter: number): CourseProgress {
  const chapters: CourseProgress['chapters'] = []

  for (let chapterId = 1; chapterId <= 10; chapterId++) {
    const isCompleted = chapterId < targetChapter

    if (chapterId === 6) {
      // Chapter 6 has difficulty levels.
      chapters.push(buildChapter6State(isCompleted))
    } else {
      chapters.push(buildRegularChapterState(chapterId, isCompleted))
    }
  }

  // Get the first lesson of the target chapter for currentLesson.
  const targetChapterLessons = getLessonsByChapter(targetChapter)
  const currentLesson = targetChapterLessons[0]?.key || 'CH1INT1'

  return {
    chapters,
    currentChapter: targetChapter,
    currentLesson,
  }
}

/**
 * Build state for a regular chapter (without difficulty levels).
 */
function buildRegularChapterState(
  chapterId: number,
  isCompleted: boolean
): ChapterWithoutDifficulties {
  const chapterLessons = getLessonsByChapter(chapterId)

  // Filter out difficulty-specific lessons for chapter 6 (handled separately).
  const lessons: LessonInState[] = chapterLessons
    .filter((l) => !l.key.includes('_NORMAL') && !l.key.includes('_HARD'))
    .map((lesson) => ({
      id: lesson.key,
      path: getLessonPath(lesson.chapter, lesson.slug),
      completed: isCompleted,
    }))

  return {
    id: chapterId,
    lessons,
    completed: isCompleted,
    hasDifficulty: false,
  }
}

/**
 * Build state for chapter 6 with difficulty levels.
 */
function buildChapter6State(isCompleted: boolean): ChapterWithDifficulties {
  const buildDifficultyLessons = (
    difficulty: DifficultyLevel
  ): LessonInState[] => {
    const lessons = getChapter6Lessons(difficulty)
    return lessons.map((lesson) => ({
      id: lesson.key,
      path: getLessonPath(lesson.chapter, lesson.slug),
      completed: isCompleted,
    }))
  }

  return {
    id: 6,
    difficulties: [
      {
        level: DifficultyLevel.NORMAL,
        lessons: buildDifficultyLessons(DifficultyLevel.NORMAL),
        completed: isCompleted,
      },
      {
        level: DifficultyLevel.HARD,
        lessons: buildDifficultyLessons(DifficultyLevel.HARD),
        completed: false, // Hard mode not completed by default.
      },
    ],
    completed: isCompleted,
    hasDifficulty: true,
    selectedDifficulty: DifficultyLevel.NORMAL,
  }
}

/**
 * Build progress state that has completed up to a specific lesson.
 * Useful for testing mid-chapter scenarios.
 */
export function buildProgressUpToLesson(lessonKey: string): CourseProgress {
  const targetLesson = getLessonByKey(lessonKey)

  if (!targetLesson) {
    throw new Error(`Lesson not found: ${lessonKey}`)
  }

  const chapters: ChapterInState[] = []

  for (let chapterId = 1; chapterId <= 10; chapterId++) {
    const isChapterCompleted = chapterId < targetLesson.chapter

    if (chapterId === 6) {
      chapters.push(
        buildChapter6StateUpToLesson(
          isChapterCompleted,
          chapterId === targetLesson.chapter ? targetLesson : null
        )
      )
    } else {
      chapters.push(
        buildRegularChapterStateUpToLesson(
          chapterId,
          isChapterCompleted,
          chapterId === targetLesson.chapter ? targetLesson : null
        )
      )
    }
  }

  return {
    chapters,
    currentChapter: targetLesson.chapter,
    currentLesson: lessonKey,
  }
}

/**
 * Build state for a regular chapter with partial completion.
 */
function buildRegularChapterStateUpToLesson(
  chapterId: number,
  isChapterCompleted: boolean,
  targetLesson: LessonInfo | null
): ChapterWithoutDifficulties {
  const chapterLessons = getLessonsByChapter(chapterId).filter(
    (l) => !l.key.includes('_NORMAL') && !l.key.includes('_HARD')
  )

  const lessons: LessonInState[] = chapterLessons.map((lesson) => {
    let completed = isChapterCompleted

    if (targetLesson && lesson.chapter === targetLesson.chapter) {
      // Find position of this lesson and target lesson.
      const lessonIndex = chapterLessons.findIndex((l) => l.key === lesson.key)
      const targetIndex = chapterLessons.findIndex(
        (l) => l.key === targetLesson.key
      )
      completed = lessonIndex < targetIndex
    }

    return {
      id: lesson.key,
      path: getLessonPath(lesson.chapter, lesson.slug),
      completed,
    }
  })

  return {
    id: chapterId,
    lessons,
    completed: isChapterCompleted,
    hasDifficulty: false,
  }
}

/**
 * Build state for chapter 6 with partial completion.
 */
function buildChapter6StateUpToLesson(
  isChapterCompleted: boolean,
  targetLesson: LessonInfo | null
): ChapterWithDifficulties {
  const buildDifficultyLessonsPartial = (
    difficulty: DifficultyLevel
  ): LessonInState[] => {
    const lessons = getChapter6Lessons(difficulty)
    return lessons.map((lesson) => {
      let completed = isChapterCompleted

      if (targetLesson && difficulty === DifficultyLevel.NORMAL) {
        const lessonIndex = lessons.findIndex((l) => l.key === lesson.key)
        const targetIndex = lessons.findIndex((l) => l.key === targetLesson.key)
        completed = targetIndex >= 0 ? lessonIndex < targetIndex : completed
      }

      return {
        id: lesson.key,
        path: getLessonPath(lesson.chapter, lesson.slug),
        completed,
      }
    })
  }

  return {
    id: 6,
    difficulties: [
      {
        level: DifficultyLevel.NORMAL,
        lessons: buildDifficultyLessonsPartial(DifficultyLevel.NORMAL),
        completed: isChapterCompleted,
      },
      {
        level: DifficultyLevel.HARD,
        lessons: buildDifficultyLessonsPartial(DifficultyLevel.HARD),
        completed: false,
      },
    ],
    completed: isChapterCompleted,
    hasDifficulty: true,
    selectedDifficulty: DifficultyLevel.NORMAL,
  }
}
