/**
 * Interaction: AnswerDialog
 *
 * What it does: `AnswerDialog.byAccepting().whilePerforming(Click.on(x))`: answers the native `confirm()` that delete / clear-basket open. Listens only during that action; fails if no dialog opened.
 *
 * TODO(M5):
 *   - Implement it with `Interaction.where(...)` and `BrowseTheWeb.as(actor)`.
 *   - Give it a readable `toString()` built from the Target name.
 *
 * Rules:
 *   - No hard waits, no `networkidle`.
 *
 * POM reference:
 *   - ../playwright-pom/src/pages/dialogs.ts
 *
 * Guide: docs/TUTORIAL.md#5-ui-targets-and-interactions
 */
export {};
