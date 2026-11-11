/**
 * Ability: ManageTestData
 *
 * What it does: Remembers every record the actor created (products, basket items, orders) and deletes them in teardown. Replaces the POM DataSeeder's cleanup half.
 *
 * TODO(M3):
 *   - Implements `Discardable`. `track(kind, id)` / `trackProductNamed(name)` / `trackOrderWith(productNames)`.
 *   - `discard()`: delete in dependency order (orders → basket items → products) through the actor's CallAnApi.
 *   - A 404 during cleanup counts as already deleted; anything else left behind fails the test with a list.
 *   - Runs even when the test failed (call it from the fixture teardown).
 *
 * POM reference:
 *   - ../playwright-pom/src/data/DataSeeder.ts
 *
 * Guide: docs/API_GUIDE.md#6-test-data-and-cleanup
 */
export {};
