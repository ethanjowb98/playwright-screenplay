/**
 * Interaction helpers: request builders
 *
 * What it does: Immutable descriptions of an HTTP request, consumed by `Send`.
 *
 * TODO(M2):
 *   - `GetRequest.to(path)`, `PostRequest.to(path).with(body)`, `PutRequest.to(path).with(body)`, `DeleteRequest.to(path)`.
 *   - `.withQuery(params)` for `GET /api/products?sort=asc` and `/api/products/filter`.
 *   - Paths come from `ENDPOINTS` (src/config/constants.ts): `ENDPOINTS.products + '/' + id`.
 *   - `toString()` → `POST /api/products` (used in step titles; never include the body).
 *
 * Guide: docs/API_GUIDE.md#4-interactions-send-and-request-builders
 */
export {};
