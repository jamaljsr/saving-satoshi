// e2e/data/lessons.ts

export type ChallengeType =
  | 'input'
  | 'scripting'
  | 'hash'
  | 'hashrate'
  | 'terminal'
  | 'opcode'
  | 'transactions'
  | 'none' // for intros/outros and narrative-only lessons

export interface LessonInfo {
  key: string // e.g., 'CH1GEN1'
  slug: string // e.g., 'genesis-1'
  chapter: number
  challengeType: ChallengeType
  isIntro?: boolean
  isOutro?: boolean
}

export const LESSONS: LessonInfo[] = [
  // Chapter 1
  {
    key: 'CH1INT1',
    slug: 'intro-1',
    chapter: 1,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH1INT2',
    slug: 'intro-2',
    chapter: 1,
    challengeType: 'none',
    isIntro: true,
  },
  { key: 'CH1GEN1', slug: 'genesis-1', chapter: 1, challengeType: 'none' },
  { key: 'CH1GEN2', slug: 'genesis-2', chapter: 1, challengeType: 'input' },
  { key: 'CH1GEN3', slug: 'genesis-3', chapter: 1, challengeType: 'terminal' },
  { key: 'CH1GEN4', slug: 'genesis-4', chapter: 1, challengeType: 'none' },
  { key: 'CH1TRA1', slug: 'transacting-1', chapter: 1, challengeType: 'none' },
  { key: 'CH1TRA2', slug: 'transacting-2', chapter: 1, challengeType: 'input' },
  {
    key: 'CH1TRA3',
    slug: 'transacting-3',
    chapter: 1,
    challengeType: 'terminal',
  },
  {
    key: 'CH1OUT1',
    slug: 'outro-1',
    chapter: 1,
    challengeType: 'none',
    isOutro: true,
  },
  {
    key: 'CH1OUT2',
    slug: 'outro-2',
    chapter: 1,
    challengeType: 'none',
    isOutro: true,
  },

  // Chapter 2
  {
    key: 'CH2INT1',
    slug: 'intro-1',
    chapter: 2,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH2INT2',
    slug: 'intro-2',
    chapter: 2,
    challengeType: 'none',
    isIntro: true,
  },
  { key: 'CH2HSH1', slug: 'hashing-1', chapter: 2, challengeType: 'none' },
  { key: 'CH2HSH2', slug: 'hashing-2', chapter: 2, challengeType: 'hash' },
  { key: 'CH2HSH3', slug: 'hashing-3', chapter: 2, challengeType: 'none' },
  { key: 'CH2HSH4', slug: 'hashing-4', chapter: 2, challengeType: 'hash' },
  { key: 'CH2HSH5', slug: 'hashing-5', chapter: 2, challengeType: 'none' },
  { key: 'CH2HSH6', slug: 'hashing-6', chapter: 2, challengeType: 'hash' },
  { key: 'CH2SCR1', slug: 'scripting-1', chapter: 2, challengeType: 'none' },
  {
    key: 'CH2SCR2',
    slug: 'scripting-2',
    chapter: 2,
    challengeType: 'scripting',
  },
  { key: 'CH2MIN1', slug: 'mining-1', chapter: 2, challengeType: 'none' },
  {
    key: 'CH2OUT1',
    slug: 'outro-1',
    chapter: 2,
    challengeType: 'none',
    isOutro: true,
  },

  // Chapter 3
  {
    key: 'CH3INT1',
    slug: 'intro-1',
    chapter: 3,
    challengeType: 'none',
    isIntro: true,
  },
  { key: 'CH3SOL1', slug: 'solo-1', chapter: 3, challengeType: 'hashrate' },
  { key: 'CH3POL1', slug: 'pool-1', chapter: 3, challengeType: 'none' },
  { key: 'CH3POL2', slug: 'pool-2', chapter: 3, challengeType: 'hashrate' },
  { key: 'CH3COO1', slug: 'coop-1', chapter: 3, challengeType: 'none' },
  { key: 'CH3COO2', slug: 'coop-2', chapter: 3, challengeType: 'none' },
  { key: 'CH3COO3', slug: 'coop-3', chapter: 3, challengeType: 'hashrate' },
  { key: 'CH3SPL1', slug: 'split-1', chapter: 3, challengeType: 'none' },
  { key: 'CH3SPL2', slug: 'split-2', chapter: 3, challengeType: 'hashrate' },
  {
    key: 'CH3OUT1',
    slug: 'outro-1',
    chapter: 3,
    challengeType: 'none',
    isOutro: true,
  },

  // Chapter 4
  {
    key: 'CH4INT1',
    slug: 'intro-1',
    chapter: 4,
    challengeType: 'none',
    isIntro: true,
  },
  { key: 'CH4PKY1', slug: 'public-key-1', chapter: 4, challengeType: 'none' },
  { key: 'CH4PKY2', slug: 'public-key-2', chapter: 4, challengeType: 'none' },
  {
    key: 'CH4PKY3',
    slug: 'public-key-3',
    chapter: 4,
    challengeType: 'scripting',
  },
  {
    key: 'CH4PKY4',
    slug: 'public-key-4',
    chapter: 4,
    challengeType: 'scripting',
  },
  { key: 'CH4ADR1', slug: 'address-1', chapter: 4, challengeType: 'none' },
  { key: 'CH4ADR2', slug: 'address-2', chapter: 4, challengeType: 'scripting' },
  { key: 'CH4ADR3', slug: 'address-3', chapter: 4, challengeType: 'scripting' },
  {
    key: 'CH4TCC1',
    slug: 'tabconf-clue-1',
    chapter: 4,
    challengeType: 'none',
    isOutro: true,
  },
  {
    key: 'CH4OUT1',
    slug: 'outro-1',
    chapter: 4,
    challengeType: 'none',
    isOutro: true,
  },

  // Chapter 5
  {
    key: 'CH5INT1',
    slug: 'intro-1',
    chapter: 5,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH5INT2',
    slug: 'intro-2',
    chapter: 5,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH5INT3',
    slug: 'intro-3',
    chapter: 5,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH5DRM1',
    slug: 'derive-message-1',
    chapter: 5,
    challengeType: 'none',
  },
  {
    key: 'CH5DRM2',
    slug: 'derive-message-2',
    chapter: 5,
    challengeType: 'none',
  },
  {
    key: 'CH5DRM3',
    slug: 'derive-message-3',
    chapter: 5,
    challengeType: 'input',
  },
  {
    key: 'CH5DRM4',
    slug: 'derive-message-4',
    chapter: 5,
    challengeType: 'input',
  },
  {
    key: 'CH5DRM5',
    slug: 'derive-message-5',
    chapter: 5,
    challengeType: 'none',
  },
  {
    key: 'CH5DRM6',
    slug: 'derive-message-6',
    chapter: 5,
    challengeType: 'input',
  },
  {
    key: 'CH5DRM7',
    slug: 'derive-message-7',
    chapter: 5,
    challengeType: 'scripting',
  },
  {
    key: 'CH5VFS1',
    slug: 'verify-signature-1',
    chapter: 5,
    challengeType: 'none',
  },
  {
    key: 'CH5VFS2',
    slug: 'verify-signature-2',
    chapter: 5,
    challengeType: 'scripting',
  },
  {
    key: 'CH5VFS3',
    slug: 'verify-signature-3',
    chapter: 5,
    challengeType: 'input',
  },
  {
    key: 'CH5VFS4',
    slug: 'verify-signature-4',
    chapter: 5,
    challengeType: 'input',
  },
  {
    key: 'CH5VFS5',
    slug: 'verify-signature-5',
    chapter: 5,
    challengeType: 'scripting',
  },
  {
    key: 'CH5VLS1',
    slug: 'validate-signature-1',
    chapter: 5,
    challengeType: 'scripting',
  },
  {
    key: 'CH5VLS2',
    slug: 'validate-signature-2',
    chapter: 5,
    challengeType: 'scripting',
  },
  {
    key: 'CH5VLS3',
    slug: 'validate-signature-3',
    chapter: 5,
    challengeType: 'scripting',
  },
  {
    key: 'CH5VLS4',
    slug: 'validate-signature-4',
    chapter: 5,
    challengeType: 'scripting',
  },
  {
    key: 'CH5OUT1',
    slug: 'outro-1',
    chapter: 5,
    challengeType: 'none',
    isOutro: true,
  },

  // Chapter 6 (NORMAL difficulty path)
  // Note: Chapter 6 has difficulty levels (NORMAL/HARD).
  // This array includes all lessons. Use getDifficultyLessons() for specific paths.
  {
    key: 'CH6INT1',
    slug: 'intro-1',
    chapter: 6,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH6INT2',
    slug: 'intro-2',
    chapter: 6,
    challengeType: 'none',
    isIntro: true,
  },
  { key: 'CH6INO1', slug: 'in-out-1', chapter: 6, challengeType: 'scripting' },
  { key: 'CH6INO2', slug: 'in-out-2', chapter: 6, challengeType: 'none' },
  { key: 'CH6INO3', slug: 'in-out-3', chapter: 6, challengeType: 'none' },
  {
    key: 'CH6INO4_NORMAL',
    slug: 'in-out-4-normal',
    chapter: 6,
    challengeType: 'scripting',
  },
  {
    key: 'CH6INO4_HARD',
    slug: 'in-out-4-hard',
    chapter: 6,
    challengeType: 'scripting',
  },
  { key: 'CH6INO5', slug: 'in-out-5', chapter: 6, challengeType: 'scripting' },
  {
    key: 'CH6PUT1_NORMAL',
    slug: 'put-it-together-1-normal',
    chapter: 6,
    challengeType: 'scripting',
  },
  {
    key: 'CH6PUT1_HARD',
    slug: 'put-it-together-1-hard',
    chapter: 6,
    challengeType: 'scripting',
  },
  {
    key: 'CH6PUT2_NORMAL',
    slug: 'put-it-together-2-normal',
    chapter: 6,
    challengeType: 'scripting',
  },
  {
    key: 'CH6PUT2_HARD',
    slug: 'put-it-together-2-hard',
    chapter: 6,
    challengeType: 'scripting',
  },
  {
    key: 'CH6PUT3_NORMAL',
    slug: 'put-it-together-3-normal',
    chapter: 6,
    challengeType: 'scripting',
  },
  {
    key: 'CH6PUT3_HARD',
    slug: 'put-it-together-3-hard',
    chapter: 6,
    challengeType: 'scripting',
  },
  {
    key: 'CH6PUT4_HARD',
    slug: 'put-it-together-4-hard',
    chapter: 6,
    challengeType: 'scripting',
  },
  {
    key: 'CH6PUT5_HARD',
    slug: 'put-it-together-5-hard',
    chapter: 6,
    challengeType: 'scripting',
  },
  {
    key: 'CH6PUT6_HARD',
    slug: 'put-it-together-6-hard',
    chapter: 6,
    challengeType: 'scripting',
  },
  {
    key: 'CH6OUT1',
    slug: 'outro-1',
    chapter: 6,
    challengeType: 'none',
    isOutro: true,
  },

  // Chapter 7
  {
    key: 'CH7INT1',
    slug: 'intro-1',
    chapter: 7,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH7INT2',
    slug: 'intro-2',
    chapter: 7,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH7INT3',
    slug: 'intro-3',
    chapter: 7,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH7MPT1',
    slug: 'mempool-transaction-1',
    chapter: 7,
    challengeType: 'scripting',
  },
  {
    key: 'CH7OUT1',
    slug: 'outro-1',
    chapter: 7,
    challengeType: 'none',
    isOutro: true,
  },

  // Chapter 8
  {
    key: 'CH8INT1',
    slug: 'intro-1',
    chapter: 8,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH8INT2',
    slug: 'intro-2',
    chapter: 8,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH8INT3',
    slug: 'intro-3',
    chapter: 8,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH8BBK1',
    slug: 'building-blocks-1',
    chapter: 8,
    challengeType: 'none',
  },
  {
    key: 'CH8BBK2',
    slug: 'building-blocks-2',
    chapter: 8,
    challengeType: 'none',
  },
  {
    key: 'CH8BBK3',
    slug: 'building-blocks-3',
    chapter: 8,
    challengeType: 'scripting',
  },
  {
    key: 'CH8BBK4',
    slug: 'building-blocks-4',
    chapter: 8,
    challengeType: 'scripting',
  },
  {
    key: 'CH8BBK5',
    slug: 'building-blocks-5',
    chapter: 8,
    challengeType: 'scripting',
  },
  {
    key: 'CH8BBK6',
    slug: 'building-blocks-6',
    chapter: 8,
    challengeType: 'scripting',
  },
  {
    key: 'CH8BBK7',
    slug: 'building-blocks-7',
    chapter: 8,
    challengeType: 'scripting',
  },
  {
    key: 'CH8BBK8',
    slug: 'building-blocks-8',
    chapter: 8,
    challengeType: 'scripting',
  },
  {
    key: 'CH8OUT1',
    slug: 'outro-1',
    chapter: 8,
    challengeType: 'none',
    isOutro: true,
  },

  // Chapter 9
  {
    key: 'CH9INT1',
    slug: 'intro-1',
    chapter: 9,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH9INT2',
    slug: 'intro-2',
    chapter: 9,
    challengeType: 'none',
    isIntro: true,
  },
  { key: 'CH9OPC1', slug: 'opcodes-1', chapter: 9, challengeType: 'none' },
  { key: 'CH9OPC2', slug: 'opcodes-2', chapter: 9, challengeType: 'none' },
  { key: 'CH9OPC3', slug: 'opcodes-3', chapter: 9, challengeType: 'none' },
  { key: 'CH9OPC4', slug: 'opcodes-4', chapter: 9, challengeType: 'none' },
  { key: 'CH9OPC5', slug: 'opcodes-5', chapter: 9, challengeType: 'opcode' },
  { key: 'CH9OPC6', slug: 'opcodes-6', chapter: 9, challengeType: 'opcode' },
  { key: 'CH9OPC7', slug: 'opcodes-7', chapter: 9, challengeType: 'none' },
  { key: 'CH9OPC8', slug: 'opcodes-8', chapter: 9, challengeType: 'opcode' },
  { key: 'CH9OPC9', slug: 'opcodes-9', chapter: 9, challengeType: 'opcode' },
  { key: 'CH9OPC10', slug: 'opcodes-10', chapter: 9, challengeType: 'opcode' },
  { key: 'CH9PRP1', slug: 'proposal-1', chapter: 9, challengeType: 'none' },
  { key: 'CH9PRP2', slug: 'proposal-2', chapter: 9, challengeType: 'opcode' },
  { key: 'CH9PRP3', slug: 'proposal-3', chapter: 9, challengeType: 'opcode' },
  { key: 'CH9PRP4', slug: 'proposal-4', chapter: 9, challengeType: 'opcode' },
  {
    key: 'CH9OUT1',
    slug: 'outro-1',
    chapter: 9,
    challengeType: 'none',
    isOutro: true,
  },

  // Chapter 10
  {
    key: 'CH10INT1',
    slug: 'intro-1',
    chapter: 10,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH10INT2',
    slug: 'intro-2',
    chapter: 10,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH10INT3',
    slug: 'intro-3',
    chapter: 10,
    challengeType: 'none',
    isIntro: true,
  },
  {
    key: 'CH10OAC1',
    slug: 'opening-a-channel-1',
    chapter: 10,
    challengeType: 'transactions',
  },
  {
    key: 'CH10OAC2',
    slug: 'opening-a-channel-2',
    chapter: 10,
    challengeType: 'transactions',
  },
  {
    key: 'CH10OAC3',
    slug: 'opening-a-channel-3',
    chapter: 10,
    challengeType: 'none',
  },
  {
    key: 'CH10OAC4',
    slug: 'opening-a-channel-4',
    chapter: 10,
    challengeType: 'transactions',
  },
  {
    key: 'CH10OAC5',
    slug: 'opening-a-channel-5',
    chapter: 10,
    challengeType: 'none',
  },
  {
    key: 'CH10UTS1',
    slug: 'updating-the-state-1',
    chapter: 10,
    challengeType: 'transactions',
  },
  {
    key: 'CH10UTS2',
    slug: 'updating-the-state-2',
    chapter: 10,
    challengeType: 'none',
  },
  {
    key: 'CH10UTS3',
    slug: 'updating-the-state-3',
    chapter: 10,
    challengeType: 'transactions',
  },
  {
    key: 'CH10UTS4',
    slug: 'updating-the-state-4',
    chapter: 10,
    challengeType: 'none',
  },
  {
    key: 'CH10UTS5',
    slug: 'updating-the-state-5',
    chapter: 10,
    challengeType: 'transactions',
  },
  {
    key: 'CH10UTS6',
    slug: 'updating-the-state-6',
    chapter: 10,
    challengeType: 'none',
  },
  {
    key: 'CH10MAP1',
    slug: 'making-a-payment-1',
    chapter: 10,
    challengeType: 'none',
  },
  {
    key: 'CH10MAP2',
    slug: 'making-a-payment-2',
    chapter: 10,
    challengeType: 'transactions',
  },
  {
    key: 'CH10MAP3',
    slug: 'making-a-payment-3',
    chapter: 10,
    challengeType: 'none',
  },
  {
    key: 'CH10MAP4',
    slug: 'making-a-payment-4',
    chapter: 10,
    challengeType: 'none',
  },
  {
    key: 'CH10MAP5',
    slug: 'making-a-payment-5',
    chapter: 10,
    challengeType: 'transactions',
  },
  {
    key: 'CH10MAP6',
    slug: 'making-a-payment-6',
    chapter: 10,
    challengeType: 'transactions',
  },
  {
    key: 'CH10MAP7',
    slug: 'making-a-payment-7',
    chapter: 10,
    challengeType: 'none',
  },
  {
    key: 'CH10MAP8',
    slug: 'making-a-payment-8',
    chapter: 10,
    challengeType: 'transactions',
  },
  {
    key: 'CH10OUT1',
    slug: 'outro-1',
    chapter: 10,
    challengeType: 'none',
    isOutro: true,
  },
  {
    key: 'CH10OUT2',
    slug: 'outro-2',
    chapter: 10,
    challengeType: 'none',
    isOutro: true,
  },
  {
    key: 'CH10OUT3',
    slug: 'outro-3',
    chapter: 10,
    challengeType: 'none',
    isOutro: true,
  },
  {
    key: 'CH10OUT4',
    slug: 'outro-4',
    chapter: 10,
    challengeType: 'none',
    isOutro: true,
  },
  {
    key: 'CH10OUT5',
    slug: 'outro-5',
    chapter: 10,
    challengeType: 'none',
    isOutro: true,
  },
  {
    key: 'CH10OUT6',
    slug: 'outro-6',
    chapter: 10,
    challengeType: 'none',
    isOutro: true,
  },
]

// Ordered list of all lesson slugs.
export const LESSON_ORDER = LESSONS.map((l) => l.slug)

// Helper to get lesson by slug.
export function getLessonBySlug(slug: string): LessonInfo | undefined {
  return LESSONS.find((l) => l.slug === slug)
}

// Helper to get lesson by key.
export function getLessonByKey(key: string): LessonInfo | undefined {
  return LESSONS.find((l) => l.key === key)
}

// Helper to get lessons by chapter.
export function getLessonsByChapter(chapter: number): LessonInfo[] {
  return LESSONS.filter((l) => l.chapter === chapter)
}

// Helper to get challenge lessons only (excludes intros/outros and narrative-only lessons).
export function getChallengeLessons(chapter?: number): LessonInfo[] {
  let lessons = LESSONS.filter((l) => l.challengeType !== 'none')
  if (chapter) lessons = lessons.filter((l) => l.chapter === chapter)
  return lessons
}

// Helper to get intro lessons.
export function getIntroLessons(chapter?: number): LessonInfo[] {
  let lessons = LESSONS.filter((l) => l.isIntro)
  if (chapter) lessons = lessons.filter((l) => l.chapter === chapter)
  return lessons
}

// Helper to get outro lessons.
export function getOutroLessons(chapter?: number): LessonInfo[] {
  let lessons = LESSONS.filter((l) => l.isOutro)
  if (chapter) lessons = lessons.filter((l) => l.chapter === chapter)
  return lessons
}

// Helper to get lessons by challenge type.
export function getLessonsByChallengeType(
  challengeType: ChallengeType
): LessonInfo[] {
  return LESSONS.filter((l) => l.challengeType === challengeType)
}

// Chapter 6 has difficulty levels. Get lessons for a specific difficulty.
export type Difficulty = 'NORMAL' | 'HARD'

export function getChapter6Lessons(difficulty: Difficulty): LessonInfo[] {
  const sharedLessons = [
    'CH6INT1',
    'CH6INT2',
    'CH6INO1',
    'CH6INO2',
    'CH6INO3',
    'CH6INO5',
    'CH6OUT1',
  ]

  if (difficulty === 'NORMAL') {
    const normalSpecific = [
      'CH6INO4_NORMAL',
      'CH6PUT1_NORMAL',
      'CH6PUT2_NORMAL',
      'CH6PUT3_NORMAL',
    ]
    const normalOrder = [
      'CH6INT1',
      'CH6INT2',
      'CH6INO1',
      'CH6INO2',
      'CH6INO3',
      'CH6INO4_NORMAL',
      'CH6INO5',
      'CH6PUT1_NORMAL',
      'CH6PUT2_NORMAL',
      'CH6PUT3_NORMAL',
      'CH6OUT1',
    ]
    return normalOrder
      .map((key) => LESSONS.find((l) => l.key === key))
      .filter((l): l is LessonInfo => l !== undefined)
  } else {
    const hardOrder = [
      'CH6INT1',
      'CH6INT2',
      'CH6INO1',
      'CH6INO2',
      'CH6INO3',
      'CH6INO4_HARD',
      'CH6INO5',
      'CH6PUT1_HARD',
      'CH6PUT2_HARD',
      'CH6PUT3_HARD',
      'CH6PUT4_HARD',
      'CH6PUT5_HARD',
      'CH6PUT6_HARD',
      'CH6OUT1',
    ]
    return hardOrder
      .map((key) => LESSONS.find((l) => l.key === key))
      .filter((l): l is LessonInfo => l !== undefined)
  }
}

// Get the full lesson path for a given chapter and slug.
export function getLessonPath(chapter: number, slug: string): string {
  return `/chapter-${chapter}/${slug}`
}

// Get the full lesson path for a LessonInfo.
export function getLessonPathFromInfo(lesson: LessonInfo): string {
  return getLessonPath(lesson.chapter, lesson.slug)
}
