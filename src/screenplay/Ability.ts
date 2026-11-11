/**
 * Core: Ability
 *
 * What it does: What an actor *can* do: a thin wrapper around a tool (a Page, an APIRequestContext, a data registry).
 *
 * TODO(M1):
 *   - `interface Ability {}` (a marker), plus `type AbilityType<A extends Ability> = abstract new (...args: never[]) => A`.
 *   - `interface Discardable { discard(): Promise<void> }` for abilities that need teardown (ManageTestData).
 *   - Convention for concrete abilities: a static `as(actor)` helper, e.g. `BrowseTheWeb.as(actor).page`.
 *
 * Rules:
 *   - Abilities hold tools and state. They do not describe business steps.
 *
 * Guide: docs/TUTORIAL.md#2-the-five-building-blocks
 */
export {};
