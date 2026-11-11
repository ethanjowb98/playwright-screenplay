/**
 * Interaction: Enter
 *
 * What it does: `Enter.theValue(v).into(target)`: `fill`. For secrets use `EnterSecret` (no value in the title, no `fill`).
 *
 * TODO(M5):
 *   - Implement it with `Interaction.where(...)` and `BrowseTheWeb.as(actor)`.
 *   - Give it a readable `toString()` built from the Target name.
 *
 * Rules:
 *   - No hard waits, no `networkidle`.
 *
 * POM reference:
 *   - ../playwright-pom/src/pages/LoginPage.ts (password set with evaluate)
 *
 * Guide: docs/TUTORIAL.md#5-ui-targets-and-interactions
 */
export {};
