/**
 * Core: Interaction
 *
 * What it does: The lowest-level activity: one direct action that uses an Ability (click, fill, send a request).
 *
 * TODO(M1):
 *   - A factory: `Interaction.where(description, (actor) => Promise<void>): Activity`.
 *   - (Optional) a base class for interactions that need builder methods (`Send.a(request)`).
 *
 * Rules:
 *   - An Interaction uses exactly one Ability and does one thing.
 *
 * Guide: docs/TUTORIAL.md#2-the-five-building-blocks
 */
export {};
