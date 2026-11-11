/**
 * Core: Task
 *
 * What it does: A business-level activity built from other activities ("place an order", "log in").
 *
 * TODO(M1):
 *   - A factory: `Task.where(description, ...activities): Activity`, performing them in order through `actor.attemptsTo`.
 *   - Nested tasks should show as nested steps in the report: check that in M1.
 *
 * Rules:
 *   - A Task never touches an Ability directly (ESLint blocks `@abilities/*` in src/tasks).
 *
 * Guide: docs/TUTORIAL.md#2-the-five-building-blocks
 */
export {};
