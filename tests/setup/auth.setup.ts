// Auth setup project (TODO(M2)). Runs before api / stateful / e2e-chromium.
//
// 1. Reuse .auth/user.json when GET /api/profile still answers with that cookie (no login spent).
// 2. Otherwise POST /api/login with env.username / env.password (rate limit: 10 per 15 min per IP).
// 3. Write the cookies to AUTH.storageState and { apiKey } from GET /api/profile to AUTH.apiKeyFile.
//
// Plain Playwright is fine here: no actors exist yet. Never put the password in a step title.
// POM: ../playwright-pom/tests/setup/auth.setup.ts
import { test as setup } from '@playwright/test';

setup.fixme('should authenticate via API and persist session and api key', () => {
  // TODO(M2)
});
