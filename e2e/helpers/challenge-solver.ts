// e2e/helpers/challenge-solver.ts
import { Page } from '@playwright/test'
import { LessonInfo, ChallengeType, getLessonBySlug } from '../data/lessons'
import { LessonPage } from '../pages/lesson.page'
import { ScriptingChallengePage } from '../pages/challenges/scripting.challenge'
import { InputChallengePage } from '../pages/challenges/input.challenge'
import { HashChallengePage } from '../pages/challenges/hash.challenge'
import { HashRateChallengePage } from '../pages/challenges/hashrate.challenge'
import { TerminalChallengePage } from '../pages/challenges/terminal.challenge'
import { OpCodeChallengePage } from '../pages/challenges/opcode.challenge'
import { TransactionsChallengePage } from '../pages/challenges/transactions.challenge'
import {
  getAnswerFromSpoiler,
  getAnswerFromFile,
  hasAnswerFile,
} from './answer-loader'

export type Language = 'javascript' | 'python'

/**
 * Solve a challenge based on its type.
 * Tests should call the appropriate getAnswer* function before calling this.
 * See docs/e2e-testing.md Answer Source Reference for which function to use per lesson.
 */
export async function solveChallenge(
  page: Page,
  lesson: LessonInfo,
  language: Language
): Promise<void> {
  switch (lesson.challengeType) {
    case 'none':
      // Intro/outro - just click continue.
      await new LessonPage(page).clickContinue()
      break

    case 'input':
      await solveInputChallenge(page, lesson.chapter, lesson.slug)
      break

    case 'scripting':
      await solveScriptingChallenge(page, lesson.chapter, lesson.slug, language)
      break

    case 'hash':
      await solveHashChallenge(page, lesson.chapter, lesson.slug)
      break

    case 'hashrate':
      await solveHashRateChallenge(page)
      break

    case 'terminal':
      await solveTerminalChallenge(page, lesson.chapter, lesson.slug)
      break

    case 'opcode':
      await solveOpCodeChallenge(page, lesson.chapter, lesson.slug)
      break

    case 'transactions':
      await solveTransactionsChallenge(page, lesson.chapter, lesson.slug)
      break

    default:
      throw new Error(`Unknown challenge type: ${lesson.challengeType}`)
  }
}

/**
 * Solve an input challenge. Uses spoiler for chapter 1 (genesis-2, transacting-2), else file.
 */
async function solveInputChallenge(
  page: Page,
  chapter: number,
  slug: string
): Promise<void> {
  // Chapter 1 input challenges use spoilers.
  const answer =
    chapter === 1
      ? await getAnswerFromSpoiler(page)
      : getAnswerFromFile(chapter, slug)
  const inputChallenge = new InputChallengePage(page)
  await inputChallenge.solveWith(answer)
}

/**
 * Solve a scripting challenge. Uses spoiler for specific lessons, else file.
 * Spoiler lessons: scripting-2 (ch2), validate-signature-3 (ch5), in-out-4-hard/5,
 * put-it-together-* (ch6), building-blocks-4-8 (ch8).
 */
async function solveScriptingChallenge(
  page: Page,
  chapter: number,
  slug: string,
  language: Language
): Promise<void> {
  const scriptingChallenge = new ScriptingChallengePage(page)

  // Determine if this lesson uses spoilers.
  const usesSpoiler = isScriptingSpoilerLesson(chapter, slug)

  const code = usesSpoiler
    ? await getAnswerFromSpoiler(page)
    : getAnswerFromFile(chapter, slug, language)

  await scriptingChallenge.solveWithLanguage(code, language)
}

/**
 * Check if a scripting challenge lesson uses spoilers.
 */
function isScriptingSpoilerLesson(chapter: number, slug: string): boolean {
  if (chapter === 2 && slug === 'scripting-2') return true
  if (chapter === 5 && slug === 'validate-signature-3') return true
  if (chapter === 6) {
    if (slug === 'in-out-4-hard' || slug === 'in-out-5') return true
    if (slug.startsWith('put-it-together-')) return true
  }
  if (chapter === 8 && slug.startsWith('building-blocks-')) {
    const num = parseInt(slug.replace('building-blocks-', ''), 10)
    if (num >= 4 && num <= 8) return true
  }
  return false
}

/**
 * Solve a hash challenge. Uses spoiler for chapter 1, else file.
 */
async function solveHashChallenge(
  page: Page,
  chapter: number,
  slug: string
): Promise<void> {
  const answer =
    chapter === 1
      ? await getAnswerFromSpoiler(page)
      : getAnswerFromFile(chapter, slug)
  const hashChallenge = new HashChallengePage(page)
  await hashChallenge.solveWith(answer)
}

/**
 * Solve a hashrate challenge (just start and wait).
 */
async function solveHashRateChallenge(page: Page): Promise<void> {
  const hashRateChallenge = new HashRateChallengePage(page)
  await hashRateChallenge.solve()
}

/**
 * Solve a terminal challenge. Uses spoiler for chapter 1 (genesis-3, transacting-3), else file.
 */
async function solveTerminalChallenge(
  page: Page,
  chapter: number,
  slug: string
): Promise<void> {
  const answer =
    chapter === 1
      ? await getAnswerFromSpoiler(page)
      : getAnswerFromFile(chapter, slug)
  const terminalChallenge = new TerminalChallengePage(page)
  await terminalChallenge.solveWith(answer)
}

/**
 * Solve an opcode challenge using answer file.
 */
async function solveOpCodeChallenge(
  page: Page,
  chapter: number,
  slug: string
): Promise<void> {
  const answer = getAnswerFromFile(chapter, slug)
  const opCodeChallenge = new OpCodeChallengePage(page)
  // Opcode answers can be comma-separated for multiple stack values.
  const stack = answer.includes(',')
    ? answer.split(',').map((s) => s.trim())
    : [answer]
  await opCodeChallenge.solveWith(stack)
}

/**
 * Solve a transactions challenge using answer file.
 * Answer files for transactions should be JSON with field/value pairs.
 */
async function solveTransactionsChallenge(
  page: Page,
  chapter: number,
  slug: string
): Promise<void> {
  const transactionsChallenge = new TransactionsChallengePage(page)
  try {
    const answerText = getAnswerFromFile(chapter, slug)
    // Parse JSON answer file: { "field1": "value1", "field2": "value2" }
    const fields = JSON.parse(answerText) as Record<string, string>
    await transactionsChallenge.solveWith(fields)
  } catch {
    // Fallback: wait for success (challenge may auto-complete or need manual intervention).
    await transactionsChallenge.waitForSuccess()
  }
}

/**
 * Check if a challenge can be auto-solved.
 */
export function canSolveChallenge(
  lesson: LessonInfo,
  language: Language
): boolean {
  switch (lesson.challengeType) {
    case 'none':
    case 'hashrate':
      return true
    case 'input':
    case 'terminal':
    case 'hash':
      // Chapter 1 uses spoilers (always available), others need files.
      return lesson.chapter === 1 || hasAnswerFile(lesson.chapter, lesson.slug)
    case 'opcode':
    case 'transactions':
      return hasAnswerFile(lesson.chapter, lesson.slug)
    case 'scripting':
      // Check if this lesson uses spoilers or has answer file.
      return (
        isScriptingSpoilerLesson(lesson.chapter, lesson.slug) ||
        hasAnswerFile(lesson.chapter, lesson.slug, language)
      )
    default:
      return false
  }
}

/**
 * Get the challenge type for a lesson slug.
 */
export function getChallengeType(slug: string): ChallengeType | undefined {
  const lesson = getLessonBySlug(slug)
  return lesson?.challengeType
}
