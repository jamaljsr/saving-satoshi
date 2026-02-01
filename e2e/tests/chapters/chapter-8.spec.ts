// e2e/tests/chapters/chapter-8.spec.ts
import { expect, test } from '../../fixtures'
import { getAnswerFromFile } from '../../helpers/answer-loader'

/**
 * Chapter 8 E2E tests.
 *
 * Chapter 8 requires authentication and chapters 1-7 to be completed.
 * Tests use auth.skipToChapter(8) to skip directly to chapter 8.
 *
 * Chapter 8 is about building blocks and block validation. The user learns
 * about Bitcoin RPC calls, block headers, transaction fees, subsidies, and
 * how to validate blocks.
 *
 * Lessons (12 total):
 * - 3 intros (intro-1, intro-2, intro-3)
 * - 8 building blocks lessons (building-blocks-1 through building-blocks-8)
 *   - building-blocks-1: narrative (ChapterIntro)
 *   - building-blocks-2: narrative (Introduction)
 *   - building-blocks-3 to 8: scripting challenges (6 total)
 * - 1 outro (outro-1)
 */
test.describe('Chapter 8: Building Blocks', () => {
  test.describe.configure({ mode: 'serial' })

  test('complete chapter 8', async ({
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

    // Set progress to have chapters 1-7 completed via API.
    await auth.skipToChapter(8)

    // Navigate to chapters page and wait for chapter 8 to be unlocked.
    await page.goto('/en/chapters')
    await page.waitForLoadState('networkidle')

    // Wait for chapter 8 link to appear (indicates progress loaded).
    const chapter8Link = page.getByRole('link', {
      name: /start.*chapter.*8|continue.*chapter.*8/i,
    })
    await chapter8Link.waitFor({ timeout: 15000 })

    // Click on chapter 8 link.
    await chapter8Link.click()

    // --- INTRO-1 (narrative) ---
    await expect(page).toHaveURL(/chapter-8.*intro-1/)
    await lessonPage.clickProgressButton()

    // --- INTRO-2 (narrative) ---
    await expect(page).toHaveURL(/intro-2/)
    await lessonPage.clickProgressButton()

    // --- INTRO-3 (narrative) ---
    await expect(page).toHaveURL(/intro-3/)
    await lessonPage.clickProgressButton()

    // --- BUILDING-BLOCKS-1 (narrative with Next button) ---
    await expect(page).toHaveURL(/building-blocks-1/)
    await lessonPage.clickProgressButton()

    // --- BUILDING-BLOCKS-2 (narrative) ---
    await expect(page).toHaveURL(/building-blocks-2/)
    await lessonPage.clickProgressButton()

    // --- BUILDING-BLOCKS-3 (scripting challenge) ---
    await expect(page).toHaveURL(/building-blocks-3/)
    const bb3Code = getAnswerFromFile(8, 'building-blocks-3', language)
    await scriptingChallenge.solveWithLanguage(bb3Code, language)
    await lessonPage.clickProgressButton()

    // --- BUILDING-BLOCKS-4 (scripting challenge) ---
    await expect(page).toHaveURL(/building-blocks-4/)
    const bb4Code = getAnswerFromFile(8, 'building-blocks-4', language)
    await scriptingChallenge.solveWithLanguage(bb4Code, language)
    await lessonPage.clickProgressButton()

    // --- BUILDING-BLOCKS-5 (scripting challenge) ---
    await expect(page).toHaveURL(/building-blocks-5/)
    const bb5Code = getAnswerFromFile(8, 'building-blocks-5', language)
    await scriptingChallenge.solveWithLanguage(bb5Code, language)
    await lessonPage.clickProgressButton()

    // --- BUILDING-BLOCKS-6 (scripting challenge) ---
    await expect(page).toHaveURL(/building-blocks-6/)
    const bb6Code = getAnswerFromFile(8, 'building-blocks-6', language)
    await scriptingChallenge.solveWithLanguage(bb6Code, language)
    await lessonPage.clickProgressButton()

    // --- BUILDING-BLOCKS-7 (scripting challenge) ---
    await expect(page).toHaveURL(/building-blocks-7/)
    const bb7Code = getAnswerFromFile(8, 'building-blocks-7', language)
    await scriptingChallenge.solveWithLanguage(bb7Code, language)
    await lessonPage.clickProgressButton()

    // --- BUILDING-BLOCKS-8 (scripting challenge) ---
    await expect(page).toHaveURL(/building-blocks-8/)
    const bb8Code = getAnswerFromFile(8, 'building-blocks-8', language)
    await scriptingChallenge.solveWithLanguage(bb8Code, language)
    await lessonPage.clickProgressButton()

    // --- OUTRO-1 (completion screen) ---
    await expect(page).toHaveURL(/outro-1/)

    // Verify success screen heading is visible.
    await expect(
      page.getByRole('heading', { name: /we're doing it live!/i })
    ).toBeVisible({
      timeout: 10000,
    })

    // Click Continue to go to chapters page.
    await lessonPage.clickProgressButton()

    // Navigate to the chapters page to verify the lesson list.
    await page.goto('/en/chapters')

    // Verify we are on the chapters page.
    await expect(page).toHaveURL(/chapters/)

    // Click the Challenges tab in Chapter 8 section to see the lesson list.
    const chapter8 = chaptersPage.getChapterSection(8)
    await chapter8.clickChallenges()

    // Chapter 8 has 12 lessons total (3 intros + 8 building blocks + 1 outro).
    // After completion, each should show a checkmark icon.
    await expect(chapter8.checkIcons).toHaveCount(12)
  })
})
