import { defineConfig, devices } from '@playwright/test'

export default defineConfig<{ language: 'javascript' | 'python' }>({
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
    command: 'if ! lsof -i:3000 | grep LISTEN; then yarn dev; fi',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
})
