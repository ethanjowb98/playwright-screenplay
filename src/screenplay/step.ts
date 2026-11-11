/**
 * Core: step helper
 *
 * What it does: Wraps every activity and question in a boxed Playwright step, so reports read as a story and failures point to the spec line.
 *
 * TODO(M1):
 *   - `inStep<T>(title: string, body: () => Promise<T>): Promise<T>` built on `test.step(title, body, { box: true })`.
 *   - Use `return await` inside the wrapper (Playwright needs it to place a boxed failure on the caller's line).
 *   - Title format: `${actor.name} ${activity}` ("Alice adds Milk to the basket").
 *
 * Rules:
 *   - Never build a title from a password or api key: titles are printed in every report.
 *
 * POM reference:
 *   - ../playwright-pom/src/utils/allure.ts (the @step decorator does the same job there)
 *
 * Guide: docs/TUTORIAL.md#6-reporting
 */
export {};
