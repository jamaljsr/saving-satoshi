import { defineConfig, devices } from '@playwright/test'

interface ProjectOptions {
  language: 'javascript' | 'python'
}

export default defineConfig<ProjectOptions>({
  testDir: './e2e/tests',
  fullyParallel: true,

  use: {
    baseURL: 'http://localhost:3000',
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
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
