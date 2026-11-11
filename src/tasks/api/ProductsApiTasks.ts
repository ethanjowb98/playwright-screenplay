/**
 * Tasks (API resource layer, optional)
 *
 * What it does: Thin, intention-revealing wrappers over Send for the API suite: `CreateProduct.with(input)`, `UpdateProduct.withId(id).setting(patch)`, `DeleteProduct.withId(id)`, `FetchProduct.withId(id)`.
 *
 * TODO(M4):
 *   - Each is a Task around `Send.a(...)` that also notes the id and tracks it for cleanup.
 *   - Decide: keep raw `Send` in specs for negative/contract cases, tasks for the happy path (recommended).
 *   - Add sibling files for basket and orders when you reach them (BasketApiTasks.ts, OrdersApiTasks.ts).
 *
 * POM reference:
 *   - ../playwright-pom/src/api/ProductsApi.ts
 *   - ../playwright-pom/src/api/BasketApi.ts
 *   - ../playwright-pom/src/api/OrdersApi.ts
 *
 * Guide: docs/API_GUIDE.md#5-questions-and-the-optional-task-layer
 */
export {};
