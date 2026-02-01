import { expect, Page } from '@playwright/test'
import { getLessonBySlug, LessonInfo } from '../data/lessons'
import { BasePage } from './base.page'

export class LessonPage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  /**
   * Navigate from home to a chapter's first intro via click-through.
   * This is the preferred way to navigate in e2e tests.
   * @param chapter Chapter number (1-10)
   * @param lang Locale (default 'en')
   */
  async navigateToChapter(chapter: number, lang = 'en'): Promise<void> {
    await this.page.goto(`/${lang}`)
    await this.page.getByRole('link', { name: /start/i }).click()
    await this.page
      .getByRole('link', {
        name: new RegExp(`start.*${chapter}|chapter.*${chapter}`, 'i'),
      })
      .click()
    await expect(this.page).toHaveURL(new RegExp(`chapter-${chapter}`))
    await this.waitForPageLoad()
  }

  /**
   * Get the current lesson slug from the URL.
   */
  getCurrentSlug(): string {
    const url = this.page.url()
    const match = url.match(/chapter-\d+\/([^/?]+)/)
    return match?.[1] || ''
  }

  /**
   * Get lesson info for current page.
   */
  getCurrentLessonInfo(): LessonInfo | undefined {
    const slug = this.getCurrentSlug()
    return getLessonBySlug(slug)
  }

  /**
   * Check if the current lesson is a challenge (not intro/outro).
   */
  async isChallenge(): Promise<boolean> {
    const info = this.getCurrentLessonInfo()
    return info?.challengeType !== 'none'
  }

  /**
   * Check if the current lesson requires code (ScriptingChallenge).
   */
  async isScriptingChallenge(): Promise<boolean> {
    const info = this.getCurrentLessonInfo()
    return info?.challengeType === 'scripting'
  }

  /**
   * Proceed to the next lesson based on lesson type.
   * For challenges, waits for success first.
   */
  async proceedToNext(): Promise<void> {
    const info = this.getCurrentLessonInfo()
    if (info?.challengeType === 'none') {
      // Intro/outro: just click continue
      await this.clickContinue()
    } else {
      // Challenge: wait for success, then next
      await this.waitForSuccessAndProceed()
    }
  }
}
