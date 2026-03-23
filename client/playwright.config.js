import { defineConfig, devices } from '@playwright/test'

const BASE_URL = process.env.TEST_URL || 'http://localhost:5173'

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
