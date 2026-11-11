/**
 * Targets: MarketHeader
 *
 * What it does: Username, basket badge, stats (Basket Units, …), alert banner, tabs (Products / Basket / Orders), Add Product button.
 *
 * TODO(M5):
 *   - `export const MarketHeader = { … }` of `Target.the(…).located(…)` entries (and functions for parameterised ones).
 *   - Locator priority: role → label → #id → CSS. Icon-only buttons by their `title`.
 *
 * Rules:
 *   - Targets only. No clicks, no waits, no assertions.
 *
 * POM reference:
 *   - ../playwright-pom/src/pages/MarketPage.ts
 *
 * Guide: docs/TUTORIAL.md#5-ui-targets-and-interactions
 */
export {};
