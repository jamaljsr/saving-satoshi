// e2e/tests/chapters/chapter-7.spec.ts
import { expect, test } from '../../fixtures'
import { getAnswerFromFile } from '../../helpers/answer-loader'

/**
 * Chapter 7 E2E tests.
 *
 * Chapter 7 requires authentication and chapters 1-6 to be completed.
 * Tests use auth.skipToChapter(7) to skip directly to chapter 7.
 *
 * Chapter 7 is about building blocks from mempool transactions. The user must
 * implement a block assembly algorithm that maximizes fees while respecting
 * weight limits and transaction dependencies.
 *
 * Lessons (5 total):
 * - 3 intros (intro-1, intro-2, intro-3)
 * - 1 scripting challenge (mempool-transaction-1)
 * - 1 outro
 */
test.describe('Chapter 7: Offense is the Best Defense', () => {
  test.describe.configure({ mode: 'serial' })

  test('complete chapter 7', async ({
    page,
    auth,
    lessonPage,
    chaptersPage,
    scriptingChallenge,
    authModal,
    language,
  }) => {
    // Setup: authenticate via UI, then set progress via API.
    await page.goto('/en')
    await authModal.signUp()

    // Sync token from browser to auth helper for API calls.
    await page.waitForTimeout(1_000)
    await auth.syncFromBrowser()

    // Set progress to have chapters 1-6 completed via API.
    await auth.skipToChapter(7)

    // Navigate to chapters page and wait for chapter 7 to be unlocked.
    await page.goto('/en/chapters')
    await page.waitForLoadState('networkidle')

    // Wait for chapter 7 link to appear (indicates progress loaded).
    const chapter7Link = page.getByRole('link', {
      name: /start.*chapter.*7|continue.*chapter.*7/i,
    })
    await chapter7Link.waitFor({ timeout: 15000 })

    // Click on chapter 7 link.
    await chapter7Link.click()

    // --- INTRO-1 (narrative) ---
    await expect(page).toHaveURL(/chapter-7.*intro-1/)
    await lessonPage.clickProgressButton()

    // --- INTRO-2 (narrative) ---
    await expect(page).toHaveURL(/intro-2/)
    await lessonPage.clickProgressButton()

    // --- INTRO-3 (narrative) ---
    await expect(page).toHaveURL(/intro-3/)
    await lessonPage.clickProgressButton()

    // --- MEMPOOL-TRANSACTION-1 (scripting challenge) ---
    await expect(page).toHaveURL(/mempool-transaction-1/)
    const mempoolTx1Code = getAnswerFromFile(
      7,
      'mempool-transaction-1',
      language
    )
    await scriptingChallenge.solveWithLanguage(mempoolTx1Code, language)
    await lessonPage.clickProgressButton()

    // --- OUTRO-1 (completion screen) ---
    await expect(page).toHaveURL(/outro-1/)

    // Verify success screen heading is visible.
    await expect(
      page.getByRole('heading', { name: /you did it!/i })
    ).toBeVisible({
      timeout: 10000,
    })

    // Click Continue to go to chapters page.
    await lessonPage.clickProgressButton()

    // Navigate to the chapters page to verify the lesson list.
    await page.goto('/en/chapters')

    // Verify we are on the chapters page.
    await expect(page).toHaveURL(/chapters/)

    // Click the Challenges tab in Chapter 7 section to see the lesson list.
    const chapter7 = chaptersPage.getChapterSection(7)
    await chapter7.clickChallenges()

    // Chapter 7 has 5 lessons total (3 intros + 1 challenge + 1 outro).
    // After completion, each should show a checkmark icon.
    await expect(chapter7.checkIcons).toHaveCount(5)
  })
})
