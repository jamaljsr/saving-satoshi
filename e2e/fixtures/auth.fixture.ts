// e2e/fixtures/auth.fixture.ts
import { Page, APIRequestContext } from '@playwright/test'
import { buildProgressForChapter } from './progress.fixture'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export class AuthHelper {
  private token: string | null = null

  constructor(private page: Page, private request: APIRequestContext) {}

  /**
   * Generate random 64-char hex private key for test isolation.
   */
  private generatePrivateKey(): string {
    const bytes = new Uint8Array(32)
    crypto.getRandomValues(bytes)
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  }

  /**
   * Register and login a fresh test account.
   */
  async createTestAccount(): Promise<{ token: string; privateKey: string }> {
    const privateKey = this.generatePrivateKey()

    await this.request.post(`${API_URL}/v1/auth/register`, {
      data: { private_key: privateKey },
    })

    const loginRes = await this.request.post(`${API_URL}/v1/auth/login`, {
      data: { private_key: privateKey },
    })
    const { token } = await loginRes.json()
    this.token = token

    return { token, privateKey }
  }

  /**
   * Set progress to start of a specific chapter via API.
   */
  async skipToChapter(chapter: number): Promise<void> {
    if (!this.token) throw new Error('Must call createTestAccount first')

    const progressState = buildProgressForChapter(chapter)

    await this.request.put(`${API_URL}/v1/progress`, {
      headers: { Authorization: `Bearer ${this.token}` },
      data: { progress_state: progressState },
    })
  }

  /**
   * Inject auth token into browser localStorage.
   */
  async injectIntoBrowser(): Promise<void> {
    if (!this.token) throw new Error('Must call createTestAccount first')

    await this.page.evaluate((t) => {
      localStorage.setItem('saving-satoshi-token', t)
    }, this.token)
  }

  /**
   * Convenience: create account, skip to chapter, inject token.
   */
  async setupForChapter(chapter: number): Promise<void> {
    await this.createTestAccount()
    if (chapter > 1) {
      await this.skipToChapter(chapter)
    }
    await this.injectIntoBrowser()
  }

  /**
   * Get the current token.
   */
  getToken(): string | null {
    return this.token
  }
}
