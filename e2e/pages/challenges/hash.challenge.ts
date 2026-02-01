// e2e/pages/challenges/hash.challenge.ts
import { Page } from '@playwright/test'
import { BasePage } from '../base.page'
import { getInputField } from '../../helpers/selectors'

export class HashChallengePage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  /**
   * Enter text to be hashed.
   */
  async enterInput(text: string): Promise<void> {
    const input = getInputField(this.page)
    await input.fill(text)
  }

  /**
   * Wait for hash computation to complete.
   */
  async waitForHash(): Promise<void> {
    // Hash challenges typically show result immediately.
    await this.page.waitForTimeout(500)
  }

  /**
   * Enter input and solve.
   */
  async solveWith(answer: string): Promise<void> {
    await this.enterInput(answer)
    await this.waitForHash()
    await this.waitForSuccess()
  }
}
