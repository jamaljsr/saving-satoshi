import { test as base } from '@playwright/test'
import { AuthModal } from '../pages/auth.modal'
import {
  HashChallengePage,
  HashRateChallengePage,
  InputChallengePage,
  OpCodeChallengePage,
  ScriptingChallengePage,
  TerminalChallengePage,
  TransactionsChallengePage,
} from '../pages/challenges'
import { ChaptersPage } from '../pages/chapters.page'
import { LessonPage } from '../pages/lesson.page'
import { AuthHelper } from './auth.fixture'

export type Language = 'javascript' | 'python'

type Fixtures = {
  language: Language
  auth: AuthHelper
  authModal: AuthModal
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

  // Auth modal POM for UI-based auth flows.
  authModal: async ({ page }, use) => {
    await use(new AuthModal(page))
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

// Re-export expect from Playwright test so tests can import both expect and test from
// this file.
export { expect } from '@playwright/test'
