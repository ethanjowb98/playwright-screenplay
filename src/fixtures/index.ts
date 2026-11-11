/**
 * Fixtures
 *
 * What it does: Wires actors into Playwright tests. Specs import `test` and `expect` from `@fixtures`.
 *
 * TODO(M2):
 *   - M2: `apiRequest` (cookie-less APIRequestContext) and `actorCalled(name)`: an actor who can CallAnApi with the api key from `.auth/apikey.json`.
 *   - M2: `actorWithApiKey(name, key | null)` for 401 tests (Mallory with a bad key).
 *   - M3: give every actor ManageTestData and call `actor.dismiss()` in teardown.
 *   - M5: actors in browser projects also get `BrowseTheWeb.using(page)`.
 *   - Export `test = base.extend<…>({ … })` and re-export `expect`.
 *
 * Rules:
 *   - Fixtures build actors and tear them down. No test logic.
 *
 * POM reference:
 *   - ../playwright-pom/src/fixtures/index.ts
 *
 * Guide: docs/TUTORIAL.md#3-your-first-scenario
 */
export {};
