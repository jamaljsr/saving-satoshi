import { defineConfig, devices } from '@playwright/test'

export default defineConfig<{ language: 'javascript' | 'python' }>({
  testDir: './e2e/tests',
  fullyParallel: false,
  workers: 1,

  // Headed locally, headless in CI.
  use: {
    headless: !!process.env.CI,
    baseURL: 'http://localhost:3000',
  },

  projects: [
    {
      name: 'javascript',
      use: {
        ...devices['Desktop Chrome'],
        language: 'javascript',
      },
    },
    {
      name: 'python',
      use: {
        ...devices['Desktop Chrome'],
        language: 'python',
      },
    },
  ],

  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
