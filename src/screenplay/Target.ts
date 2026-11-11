/**
 * Core: Target
 *
 * What it does: A named, lazily resolved locator: `Target.the('basket badge').located((page) => page.locator('#basket-count'))`.
 *
 * TODO(M5):
 *   - `Target.the(name).located(fn)` where `fn: (page: Page) => Locator`.
 *   - `.of(parent)` for nesting (a button inside one product card): `ProductGrid.addButton.of(ProductGrid.card(name))`.
 *   - `resolveFor(actor)` uses `BrowseTheWeb.as(actor).page`, which means Target needs the BrowseTheWeb type: keep the import type-only, or move Target to src/ui if you prefer the core to stay browser-free.
 *   - The name is what step titles show ("Alice clicks the ADD button of <product>").
 *
 * Guide: docs/TUTORIAL.md#5-ui-targets-and-interactions
 */
export {};
