// e2e/fixtures/index.ts
import { test as base } from '@playwright/test'
import { AuthHelper } from './auth.fixture'
import { LessonPage } from '../pages/lesson.page'
import { ChaptersPage } from '../pages/chapters.page'
import {
  ScriptingChallengePage,
  InputChallengePage,
  HashChallengePage,
  HashRateChallengePage,
  TerminalChallengePage,
  OpCodeChallengePage,
  TransactionsChallengePage,
} from '../pages/challenges'

export type Language = 'javascript' | 'python'

type Fixtures = {
  language: Language
  auth: AuthHelper
  lessonPage: LessonPage
  chaptersPage: ChaptersPage
  scriptingChallenge: ScriptingChallengePage
  inputChallenge: InputChallengePage
  hashChallenge: HashChallengePage
  hashRateChallenge: HashRateChallengePage
  terminalChallenge: TerminalChallengePage
  opCodeChallenge: OpCodeChallengePage
  transactionsChallenge: TransactionsChallengePage
}

export const test = base.extend<Fixtures>({
  // Language comes from project config (javascript or python).
  language: ['javascript', { option: true }],

  // Auth helper - auto-instantiated for each test.
  auth: async ({ page, request }, use) => {
    const auth = new AuthHelper(page, request)
    await use(auth)
  },

  // Page Object Models - auto-instantiated for each test.
  lessonPage: async ({ page }, use) => {
    await use(new LessonPage(page))
  },

  chaptersPage: async ({ page }, use) => {
    await use(new ChaptersPage(page))
  },

  scriptingChallenge: async ({ page }, use) => {
    await use(new ScriptingChallengePage(page))
  },

  inputChallenge: async ({ page }, use) => {
    await use(new InputChallengePage(page))
  },

  hashChallenge: async ({ page }, use) => {
    await use(new HashChallengePage(page))
  },

  hashRateChallenge: async ({ page }, use) => {
    await use(new HashRateChallengePage(page))
  },

  terminalChallenge: async ({ page }, use) => {
    await use(new TerminalChallengePage(page))
  },

  opCodeChallenge: async ({ page }, use) => {
    await use(new OpCodeChallengePage(page))
  },

  transactionsChallenge: async ({ page }, use) => {
    await use(new TransactionsChallengePage(page))
  },
})

export { expect } from '@playwright/test'
export {
  buildProgressForChapter,
  buildProgressUpToLesson,
} from './progress.fixture'
export type { AuthHelper } from './auth.fixture'
