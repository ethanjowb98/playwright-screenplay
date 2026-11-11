/**
 * Targets: FilterSidebar
 *
 * What it does: Search box, sort select, category chips (`label[for=…]`), temperature zone, weighted / sold each, Clear filters.
 *
 * TODO(M5):
 *   - `export const FilterSidebar = { … }` of `Target.the(…).located(…)` entries (and functions for parameterised ones).
 *   - Locator priority: role → label → #id → CSS. Icon-only buttons by their `title`.
 *
 * Rules:
 *   - Targets only. No clicks, no waits, no assertions.
 *
 * POM reference:
 *   - ../playwright-pom/src/pages/components/FilterSidebar.ts
 *
 * Guide: docs/TUTORIAL.md#5-ui-targets-and-interactions
 */
export {};
