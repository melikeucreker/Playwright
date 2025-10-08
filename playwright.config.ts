import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import environmentBaseUrl from './utils/environmentBaseUrl.js';


dotenv.config();

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },

    { name: 'chrome-tests', use: { baseURL: 'https://playwright.dev/', ...devices['Desktop Chrome'] } },
    { name: 'safari-tests', use: { baseURL: 'https://playwright.dev/', ...devices['Desktop Safari'] } },
    { name: 'firefox-tests', use: { baseURL: 'https://playwright.dev/', ...devices['Desktop Firefox'] } },

    { name: 'local', use: { baseURL: environmentBaseUrl.local.home } },

    {
      name: 'ci',
      use: { 
        baseURL: process.env.CI
          ? environmentBaseUrl.ci.prefix + process.env.GITHUB_REF_NAME + environmentBaseUrl.ci.suffix
          : environmentBaseUrl.staging.home,
      },
    },
  ],
});
