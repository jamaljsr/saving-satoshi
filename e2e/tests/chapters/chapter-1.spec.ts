// e2e/tests/chapters/chapter-1.spec.ts
import { expect, test } from '../../fixtures'
import { getAnswerFromSpoiler } from '../../helpers/answer-loader'

/**
 * Chapter 1 E2E tests.
 *
 * IMPORTANT: All navigation must be done via clicking links/buttons from the home page.
 * Never navigate directly to lesson URLs.
 */
test.describe('Chapter 1: Genesis', () => {
  test.describe.configure({ mode: 'serial' })

  test('complete chapter 1', async ({
    page,
    lessonPage,
    chaptersPage,
    inputChallenge,
    terminalChallenge,
  }) => {
    // Navigate to chapter 1 from home.
    await lessonPage.navigateToChapter(1)

    // --- INTRO-1 ---
    await expect(page).toHaveURL(/intro-1/)
    await lessonPage.clickProgressButton()

    // --- INTRO-2 ---
    await expect(page).toHaveURL(/intro-2/)
    await lessonPage.clickProgressButton()

    // --- GENESIS-1 (chapter intro with Start button) ---
    await expect(page).toHaveURL(/genesis-1/)
    await lessonPage.clickProgressButton()

    // --- GENESIS-2 (input challenge: paste SCRIPTSIG HEX) ---
    await expect(page).toHaveURL(/genesis-2/)
    await inputChallenge.solveWith(await getAnswerFromSpoiler(page))
    await lessonPage.clickProgressButton()

    // --- GENESIS-3 (terminal challenge: decode hex) ---
    await expect(page).toHaveURL(/genesis-3/)
    await terminalChallenge.solveWith(await getAnswerFromSpoiler(page))
    await lessonPage.clickProgressButton()

    // --- GENESIS-4 (narrative) ---
    await expect(page).toHaveURL(/genesis-4/)
    await lessonPage.clickProgressButton()

    // --- TRANSACTING-1 (chapter intro with Next button) ---
    await expect(page).toHaveURL(/transacting-1/)
    await lessonPage.clickProgressButton()

    // --- TRANSACTING-2 (input challenge: paste OP_RETURN HEX) ---
    await expect(page).toHaveURL(/transacting-2/)
    await inputChallenge.solveWith(await getAnswerFromSpoiler(page))
    await lessonPage.clickProgressButton()

    // --- TRANSACTING-3 (terminal challenge: decode hex) ---
    await expect(page).toHaveURL(/transacting-3/)
    await terminalChallenge.solveWith(await getAnswerFromSpoiler(page))
    await lessonPage.clickProgressButton()

    // --- OUTRO-1 ---
    await expect(page).toHaveURL(/outro-1/)
    await lessonPage.clickProgressButton()

    // --- OUTRO-2 / COMPLETION SCREEN ---
    await expect(page).toHaveURL(/outro-2/)

    // Verify success screen is visible.
    await expect(
      page.getByRole('heading', { name: /you did it/i })
    ).toBeVisible()

    // Save my progress
    await page.getByRole('button', { name: 'Save my progress' }).click()
    await page.getByRole('button', { name: 'Select avatar with red' }).click()
    await page.locator('.slider').click()
    await page.getByRole('button', { name: 'Done' }).click()

    // Verify we are on the chapters page
    await expect(page).toHaveURL(/chapters/)

    // Click the Challenges tab in Chapter 1 section to see the lesson list.
    const chapter1 = chaptersPage.getChapterSection(1)
    await chapter1.clickChallenges()

    // Chapter 1 has 11 lessons total (2 intros + 7 lessons + 2 outros).
    // After completion, each should show a checkmark icon.
    await expect(chapter1.checkIcons).toHaveCount(11)
  })
})
