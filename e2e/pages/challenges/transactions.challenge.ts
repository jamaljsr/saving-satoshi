// e2e/pages/challenges/transactions.challenge.ts
import { Page } from '@playwright/test'
import { BasePage } from '../base.page'

export class TransactionsChallengePage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  /**
   * Build a transaction by filling in required fields.
   * Transaction challenges vary, so this is a generic implementation.
   */
  async buildTransaction(fields: Record<string, string>): Promise<void> {
    for (const [label, value] of Object.entries(fields)) {
      const input = this.page.getByLabel(label)
      if (await input.isVisible()) {
        await input.fill(value)
      }
    }
  }

  /**
   * Broadcast the built transaction.
   */
  async broadcast(): Promise<void> {
    const broadcastBtn = this.page.getByRole('button', {
      name: /broadcast|submit/i,
    })
    await broadcastBtn.click()
  }

  /**
   * Build and broadcast transaction.
   */
  async solveWith(fields: Record<string, string>): Promise<void> {
    await this.buildTransaction(fields)
    await this.broadcast()
    await this.waitForSuccess()
  }
}
