/**
 * Ability: CallAnApi
 *
 * What it does: Lets an actor send HTTP requests to the Market API, with its api key, and remembers the last response.
 *
 * TODO(M2):
 *   - `CallAnApi.using(context: APIRequestContext, apiKey: string | null)`; `null` sends no Authorization header (401 tests).
 *   - Build the context cookie-less (`playwright.request.newContext({ baseURL })`), never from the built-in `request` fixture in a browser project (it carries the session cookie).
 *   - `send(req: ApiRequest): Promise<ApiResponseSnapshot>` where the snapshot is `{ method, path, status, headers, body }`. It records and does NOT throw on 4xx/5xx: the test decides.
 *   - `lastResponse` getter (throws if nothing was sent yet).
 *   - Attach request/response bodies to the step with secrets masked (`password`, `api_key`, `Authorization`).
 *   - Strip Playwright's "Call log:" from errors (it lists every request header).
 *
 * POM reference:
 *   - ../playwright-pom/src/api/ApiClient.ts
 *   - ../playwright-pom/src/api/requestErrors.ts
 *
 * Guide: docs/API_GUIDE.md#3-the-callanapi-ability
 */
export {};
