// e2e/pages/challenges/hashrate.challenge.ts
import { Page } from '@playwright/test'
import { BasePage } from '../base.page'
import { getStartButton } from '../../helpers/selectors'

export class HashRateChallengePage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  /**
   * Click the Start button to begin mining simulation.
   */
  async clickStart(): Promise<void> {
    const startBtn = getStartButton(this.page)
    await startBtn.click()
  }

  /**
   * Wait for the mining simulation to complete.
   */
  async waitForCompletion(timeout = 60000): Promise<void> {
    await this.waitForSuccess(timeout)
  }

  /**
   * Start and wait for completion.
   */
  async solve(): Promise<void> {
    await this.clickStart()
    await this.waitForCompletion()
  }
}
