// e2e/pages/challenges/opcode.challenge.ts
import { Page } from '@playwright/test'
import { BasePage } from '../base.page'
import { getInputField, getRunButton } from '../../helpers/selectors'

export class OpCodeChallengePage extends BasePage {
  constructor(page: Page) {
    super(page)
  }

  /**
   * Set the initial stack for the opcode challenge.
   */
  async setInitialStack(stack: string[]): Promise<void> {
    // OpCode challenges may have multiple input fields.
    const inputs = this.page.getByRole('textbox')
    const count = await inputs.count()
    for (let i = 0; i < Math.min(count, stack.length); i++) {
      await inputs.nth(i).fill(stack[i])
    }
  }

  /**
   * Execute the Bitcoin script.
   */
  async executeScript(): Promise<void> {
    const runBtn = getRunButton(this.page)
    await runBtn.click()
  }

  /**
   * Solve with given stack values.
   */
  async solveWith(stack: string[]): Promise<void> {
    await this.setInitialStack(stack)
    await this.executeScript()
    await this.waitForSuccess()
  }
}
