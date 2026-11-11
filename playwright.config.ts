import { defineConfig, devices } from '@playwright/test';

import { AUTH, TAGS, TIMEOUTS } from './src/config/constants';
import { env } from './src/config/env';

/**
 * Authenticated desktop Chrome, shared by the UI projects.
 * `.auth/user.json` is written by tests/setup/auth.setup.ts (milestone M2).
 */
const browser = {
  ...devices['Desktop Chrome'],
  viewport: { width: 1920, height: 1080 },
  storageState: AUTH.storageState,
};

/**
 * Projects:
 *  - core          tests/core: unit-style specs for the Screenplay core (M1). No app, no auth.
 *  - setup         logs in once via API, writes .auth/ (session cookie + api key)
 *  - api           API specs (tests/api), fully parallel
 *  - stateful      API + UI specs tagged @stateful (the basket is account-wide): one worker
 *  - e2e-chromium  UI specs (tests/e2e) + seed, authenticated through storageState
 *
 * Same layout as playwright-pom, so both suites can be compared run for run.
 * Allure reporting is added in M7 (docs/ROADMAP.md).
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: env.isCI,
  retries: env.isCI ? 2 : 0,
  workers: env.isCI ? 4 : undefined,
  timeout: TIMEOUTS.test,
  expect: { timeout: TIMEOUTS.expect },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: env.baseURL,
    actionTimeout: TIMEOUTS.action,
    navigationTimeout: TIMEOUTS.navigation,
    // Off: a trace records every request header, including `Authorization: <api key>`.
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'core',
      testMatch: /core[\\/].+\.spec\.ts$/,
    },
    {
      // No retries: a retry spends another rate-limited login (10 per 15 min per IP).
      name: 'setup',
      testMatch: /setup[\\/].+\.setup\.ts$/,
      retries: 0,
    },
    {
      name: 'api',
      testMatch: /api[\\/].+\.api\.spec\.ts$/,
      grepInvert: new RegExp(TAGS.stateful),
      dependencies: ['setup'],
    },
    {
      name: 'stateful',
      testMatch: /(api[\\/].+\.api\.spec\.ts|e2e[\\/].+\.spec\.ts)$/,
      grep: new RegExp(TAGS.stateful),
      workers: 1,
      dependencies: ['setup'],
      use: browser,
    },
    {
      name: 'e2e-chromium',
      testMatch: /(e2e[\\/].+\.spec\.ts|seed\.spec\.ts)$/,
      grepInvert: new RegExp(TAGS.stateful),
      dependencies: ['setup'],
      use: browser,
    },
  ],
});
