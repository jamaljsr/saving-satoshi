// e2e/helpers/monaco.helper.ts
import { Page } from '@playwright/test'
import { MONACO_EDITOR, MONACO_TEXTAREA } from './selectors'

/**
 * Helper utilities for interacting with Monaco Editor.
 * Monaco doesn't expose accessible roles, so we use CSS selectors.
 */
export class MonacoHelper {
  constructor(private page: Page) {}

  /**
   * Wait for Monaco to fully initialize (async loading).
   */
  async waitForReady(): Promise<void> {
    // Wait for Monaco editor container.
    await this.page.waitForSelector(MONACO_EDITOR)
    // Wait for editor to be interactive (textarea is the input target).
    await this.page.waitForSelector(MONACO_TEXTAREA)
  }

  /**
   * Clear existing code and set new content.
   */
  async setCode(code: string): Promise<void> {
    await this.waitForReady()
    const editor = this.page.locator(MONACO_EDITOR)

    // Focus the editor.
    await editor.click()
    await this.page.waitForTimeout(500)

    // Select all and replace (Cmd+A on Mac, Ctrl+A on others).
    // const modifier = process.platform === 'darwin' ? 'Meta' : 'Control'
    // await this.page.keyboard.press(`${modifier}+a`)
    // await this.page.waitForTimeout(500)

    // Type new code (Monaco handles the replacement).
    // await this.page.keyboard.type(code, { delay: 5 })
    await this.page.evaluate((c) => {
      const editor = (window as any).monaco?.editor?.getEditors()[0]
      editor.setValue(c)
    }, code)
  }

  /**
   * Get current editor content.
   */
  async getCode(): Promise<string> {
    return await this.page.evaluate(() => {
      // Access Monaco's model through the global monaco instance.
      const editors = (window as any).monaco?.editor?.getEditors()
      return editors?.[0]?.getValue() || ''
    })
  }

  /**
   * Focus the editor.
   */
  async focus(): Promise<void> {
    await this.waitForReady()
    await this.page.locator(MONACO_EDITOR).click()
  }
}
