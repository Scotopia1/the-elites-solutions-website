import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Responsive Testing
 * Tests across 5 breakpoints: Small Mobile, Mobile, Tablet, Desktop, Large Desktop
 * Validates animations, performance, and accessibility
 */
export default defineConfig({
  testDir: './tests/e2e',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],

  /* Shared settings for all projects */
  use: {
    /* Base URL for navigation */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying failed tests */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers and devices */
  projects: [
    // =====================================
    // SMALL MOBILE (375px - iPhone SE)
    // =====================================
    {
      name: 'small-mobile-chromium',
      use: {
        ...devices['iPhone SE'],
        viewport: { width: 375, height: 667 },
      },
    },

    // =====================================
    // MOBILE (640px - iPhone 13)
    // =====================================
    {
      name: 'mobile-chromium',
      use: {
        ...devices['iPhone 13'],
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'mobile-webkit',
      use: {
        ...devices['iPhone 13'],
        viewport: { width: 390, height: 844 },
      },
    },

    // =====================================
    // TABLET (768px - iPad Mini)
    // =====================================
    {
      name: 'tablet-chromium',
      use: {
        ...devices['iPad Mini'],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'tablet-webkit',
      use: {
        ...devices['iPad Mini'],
        viewport: { width: 768, height: 1024 },
      },
    },

    // =====================================
    // DESKTOP (1024px - Laptop)
    // =====================================
    {
      name: 'desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'desktop-firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'desktop-webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },

    // =====================================
    // LARGE DESKTOP (1920px - Monitor)
    // =====================================
    {
      name: 'large-desktop-chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

  /* Run local dev server before starting tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
