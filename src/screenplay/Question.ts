/**
 * Core: Question
 *
 * What it does: Reads state from the system under test (or from the actor's Notepad) and returns it. Questions never change anything.
 *
 * TODO(M1):
 *   - `interface Question<T> { answeredBy(actor: Actor): Promise<T>; toString(): string }`.
 *   - `Question.about<T>(description, (actor) => Promise<T>): Question<T>`.
 *   - (Optional) `.map(fn)` / `.as(fn)` to derive a question from another one.
 *   - Decide how UI questions keep auto-retry: return a Locator for web-first `expect`, or wrap with `expect.poll` (docs/TUTORIAL.md#4-assertions-and-auto-retry).
 *
 * Rules:
 *   - A Question never clicks, fills or sends a write request.
 *
 * Guide: docs/TUTORIAL.md#2-the-five-building-blocks
 */
export {};
