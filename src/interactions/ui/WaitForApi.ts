/**
 * Interaction: WaitForApi
 *
 * What it does: `WaitForApi.response('POST', ENDPOINTS.basket).whilePerforming(Click.on(x))`: the UI re-renders after each fetch, so actions that trigger one wait for its response, and a non-2xx throws with method/path/status.
 *
 * TODO(M5):
 *   - Implement it with `Interaction.where(...)` and `BrowseTheWeb.as(actor)`.
 *   - Give it a readable `toString()` built from the Target name.
 *
 * Rules:
 *   - No hard waits, no `networkidle`.
 *
 * POM reference:
 *   - ../playwright-pom/src/pages/network.ts
 *
 * Guide: docs/TUTORIAL.md#5-ui-targets-and-interactions
 */
export {};
