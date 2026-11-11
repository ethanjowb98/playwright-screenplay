/**
 * Core: Actor
 *
 * What it does: The "who" of every scenario. An actor has a name, holds Abilities and a Notepad, performs Activities and answers Questions.
 *
 * TODO(M1):
 *   - `Actor.named(name)` (or `new Actor(name)`): the name is used in step titles ("Alice attempts to …").
 *   - `whoCan(...abilities): this`: register abilities, one per type (a second BrowseTheWeb replaces or throws: your call).
 *   - `abilityTo<A>(type: AbilityType<A>): A`: look one up; throw a clear error ("Alice can't CallAnApi") when missing.
 *   - `attemptsTo(...activities): Promise<void>`: perform them in order, each one inside a boxed step (see step.ts).
 *   - `asks<T>(question: Question<T>): Promise<T>`: answer a question, also inside a step.
 *   - `remember(key, value)` / `recall(key)`: delegate to the Notepad.
 *   - `dismiss(): Promise<void>`: call `discard()` on every Discardable ability (fixture teardown, M3).
 *
 * Rules:
 *   - No app knowledge here: no Market words, no locators, no endpoints.
 *
 * POM reference:
 *   - ../playwright-pom/src/fixtures/index.ts (how POM injects clients; abilities replace that)
 *
 * Guide: docs/TUTORIAL.md#2-the-five-building-blocks
 */
export {};
