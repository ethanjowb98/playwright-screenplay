/**
 * Targets: ProductGrid
 *
 * What it does: `card(name)` found by its unique name (never by position), and per-card: price, stock, ADD, +, −, quantity, View Details, Edit, Delete, Out of Stock; empty state.
 *
 * TODO(M5):
 *   - `export const ProductGrid = { … }` of `Target.the(…).located(…)` entries (and functions for parameterised ones).
 *   - Locator priority: role → label → #id → CSS. Icon-only buttons by their `title`.
 *
 * Rules:
 *   - Targets only. No clicks, no waits, no assertions.
 *
 * POM reference:
 *   - ../playwright-pom/src/pages/components/ProductGrid.ts
 *
 * Guide: docs/TUTORIAL.md#5-ui-targets-and-interactions
 */
export {};
