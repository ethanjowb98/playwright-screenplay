# API guide

How to build the API side of the suite the Screenplay way. It covers the endpoints you will call, the ability, interaction and question you will write, and how test data gets created and cleaned up.

The shapes below come from `src/api/types.ts` (copied from playwright-pom), and the paths come from `ENDPOINTS` in `src/config/constants.ts`. Swagger lives at `https://www.qacloud.dev/market/docs`, but it has no response schemas and some of its paths are wrong (see [Quirks](#8-quirks-to-design-around)).

## Contents

1. [Endpoint reference](#1-endpoint-reference)
2. [Authentication](#2-authentication)
3. [The CallAnApi ability](#3-the-callanapi-ability)
4. [Interactions: Send and request builders](#4-interactions-send-and-request-builders)
5. [Questions and the optional task layer](#5-questions-and-the-optional-task-layer)
6. [Test data and cleanup](#6-test-data-and-cleanup)
7. [Negative tests](#7-negative-tests)
8. [Quirks to design around](#8-quirks-to-design-around)
9. [What a finished API test reads like](#9-what-a-finished-api-test-reads-like)

## 1. Endpoint reference

Unless noted, every endpoint needs `Authorization: <api_key>` (the raw key, with no `Bearer`). Every 4xx returns `{ error: string }`.

| Method   | Path                     | Body                                             | 2xx response                        | Used by                |
| -------- | ------------------------ | ------------------------------------------------ | ----------------------------------- | ---------------------- |
| `POST`   | `/api/login`             | `{ username, password }`                         | `LoginResponse` + session cookie    | setup, AUTH-API-02/03  |
| `GET`    | `/api/profile`           | needs the **session cookie**, not the api key    | `Profile` (`api_key` inside)        | setup, AUTH-API-01/04  |
| `GET`    | `/api/products`          | query `sort=asc\|desc`                           | `{ products: Product[] }`           | PRD, SRCH              |
| `GET`    | `/api/products/:id`      |                                                  | `Product`                           | PRD                    |
| `POST`   | `/api/products`          | `ProductInput`                                   | `Product` (201)                     | PRD, seeding           |
| `PUT`    | `/api/products/:id`      | `Partial<ProductInput>`                          | `Product`                           | PRD                    |
| `DELETE` | `/api/products/:id`      |                                                  | `{ message }`                       | PRD, cleanup           |
| `GET`    | `/api/products/filter`   | query `category`, `temperature_zone`, `weighted` | `FilteredProduct[]` (bare array!)   | SRCH                   |
| `GET`    | `/api/basket`            |                                                  | `{ items: BasketItem[] }`           | BSK                    |
| `POST`   | `/api/basket`            | `{ product_id, quantity }` (adds to existing)    | `{ data: BasketLine }`              | BSK, seeding           |
| `PUT`    | `/api/basket`            | `{ product_id, quantity }` (sets)                | `{ data: BasketLine }`              | BSK                    |
| `DELETE` | `/api/basket/:productId` |                                                  | `{ message }`                       | BSK, cleanup           |
| `DELETE` | `/api/basket/clear`      |                                                  | `{ message }`                       | BSK                    |
| `GET`    | `/api/orders`            |                                                  | `{ orders: Order[] }`               | ORD                    |
| `GET`    | `/api/orders/:id`        |                                                  | `Order` (items with `product_id`)   | ORD                    |
| `POST`   | `/api/orders`            | `{ notes? }` (consumes the **whole** basket)     | `{ order: Order }` (201)            | ORD, INT, seeding      |
| `PUT`    | `/api/orders/:id`        | `OrderUpdate` (`status`, `notes`)                | `{ order: OrderRecord }` (no items) | ORD                    |
| `DELETE` | `/api/orders/:id`        |                                                  | `{ message }`                       | ORD, cleanup           |
| `POST`   | `/api/reset`             | wipes the **whole account**                      | `ResetResult`                       | not ported, never call |

Order status transitions: `pending → processing → shipped → delivered`, and `cancelled` from any of the first three. `delivered` and `cancelled` are final (`TERMINAL_ORDER_STATUSES`), so any change to them answers 400.

## 2. Authentication

```text
setup project (once per run)               every API test
──────────────────────────                 ───────────────
.auth/user.json still valid? ──yes──┐      fixture reads .auth/apikey.json
        │ no                        │      → actor "Alice" who can CallAnApi(context, apiKey)
POST /api/login (rate-limited)      │
        │                           │
GET /api/profile → api_key ◄────────┘
write .auth/user.json + .auth/apikey.json
```

- Login is limited to **10 requests per 15 minutes per IP**, and failed logins count too. Setup should reuse the saved session when `GET /api/profile` still answers. Only the `@login` cases log in on purpose.
- The api key is the only credential an API actor carries. Build its request context **without cookies**. In the `stateful` project the built-in `request` fixture inherits the browser's `storageState`, so a test could pass on the cookie while the api key is wrong.
- Mallory, the 401 actor, is an actor whose `CallAnApi` has `apiKey: null` (no header) or `TEST_DATA.invalidApiKey`.

## 3. The CallAnApi ability

This is the only place in the suite that sends HTTP (`../playwright-pom/src/api/ApiClient.ts` plays this role in POM).

Sketch of the shape to aim for (signatures only, the bodies are yours to write):

```ts
interface ApiRequest {
  method: HttpMethod;
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

interface ApiResponseSnapshot {
  method: HttpMethod;
  path: string;
  status: number;
  body: unknown; // parsed JSON, or text when it is not JSON
}

class CallAnApi implements Ability {
  static using(context: APIRequestContext, apiKey: string | null): CallAnApi;
  static as(actor: Actor): CallAnApi;
  send(request: ApiRequest): Promise<ApiResponseSnapshot>;
  get lastResponse(): ApiResponseSnapshot;
}
```

Design rules:

- **Record, don't throw.** `send` stores the snapshot and returns it for every status. Whether a 400 is a failure depends on the test, so the decision belongs to the test.
- **Attach, masked.** Attach the request and the response to the current step (`testInfo.attach`), with `password`, `api_key` and `Authorization` replaced by `***`.
- **Hide the call log.** When a request fails at the network level (timeout, reset), Playwright's error message includes a `Call log:` that lists every request header. Rethrow with only the first line. See `../playwright-pom/src/api/requestErrors.ts`.
- **Session variant.** `GET /api/profile` needs the cookie. Either give the ability a second factory (`CallAnApi.withSession(context)`) or write a small `UseTheSession` ability. Keep the two credential types apart.

## 4. Interactions: Send and request builders

```ts
// what a spec or task will write
Send.a(PostRequest.to(ENDPOINTS.products).with(buildProduct()));
Send.a(GetRequest.to(ENDPOINTS.products).withQuery({ sort: 'asc' }));
Send.a(DeleteRequest.to(`${ENDPOINTS.products}/${id}`));
```

- Make the builders immutable: `.with()` and `.withQuery()` return a new request.
- `toString()` returns `POST /api/products`, and that becomes the step title "Alice sends POST /api/products". Never put the body in it.
- `Send` is the only API Interaction you need. Everything else is a Task or a Question built around it.

## 5. Questions and the optional task layer

**Questions** (`src/questions/api`):

| Question                                       | Answers                                |
| ---------------------------------------------- | -------------------------------------- |
| `LastResponse.status()`                        | `number`                               |
| `LastResponse.body<T>()`                       | `T` (cast at the boundary, once)       |
| `LastResponse.error()`                         | the `error` string of a 4xx            |
| `TheProduct.withId(id)`                        | `Product`, from a fresh `GET`          |
| `TheCatalogue.names()` / `.filteredBy(filter)` | `string[]` / `FilteredProduct[]`       |
| `TheBasket.items()` / `.quantityOf(productId)` | `BasketItem[]` / `number \| undefined` |
| `TheOrder.withId(id)`, `TheOrders.list()`      | `Order` / `Order[]`                    |
| `TheProfile.ofTheSession()`                    | `Profile`                              |

A question may send a `GET`, because reading is not acting. It must never send `POST`, `PUT` or `DELETE`.

**Tasks** (`src/tasks/api`, optional but recommended): happy-path wrappers that read well and take care of bookkeeping:

```ts
CreateProduct.with(input); // Send + note the id + track it for cleanup
UpdateProduct.withId(id).setting({ price: 9.99 });
AddToTheBasket.theProduct(id, 2); // API flavour; the UI flavour lives in src/tasks/basket
PlaceAnOrder.withNotes('leave at door');
```

Rule of thumb: happy paths and Arrange steps use tasks. Negative and contract cases use raw `Send`, because the exact request is the point of the test.

## 6. Test data and cleanup

The POM `DataSeeder` did two jobs. In Screenplay they split:

| Job                      | Screenplay piece                                                         |
| ------------------------ | ------------------------------------------------------------------------ |
| Create data for the test | **Tasks** in `src/tasks/data`: `SeedProducts`, `SeedBasket`, `SeedOrder` |
| Remember and delete it   | **Ability** `ManageTestData` (implements `Discardable`)                  |

The rules carry over from POM unchanged:

1. **Every test owns its data.** Never rely on records that already exist. Names come from `uniqueName()` (`QA-<worker>-<id> <label>`), so parallel workers never collide.
2. **Track before anything can fail.** A product created through the UI is tracked by name _before_ Save is clicked. An order is tracked from the `POST /api/orders` response.
3. **Clean up in dependency order**: orders → basket items → products. A 404 counts as already gone. Any other failure, or a record still there afterwards, fails the test with a list of what is left.
4. **Teardown always runs.** The fixture calls `actor.dismiss()` after `use()`, even when the test failed.
5. **The basket is account-wide.** `SeedOrder` checks that the basket holds only its own lines before it places the order, because `POST /api/orders` takes everything. Tag every test that touches the basket `@stateful`.

DATA-API-01 and DATA-API-02 test this machinery directly. They are the exit tests for M3.

## 7. Negative tests

```ts
await alice.attemptsTo(Send.a(PostRequest.to(ENDPOINTS.products).with({ ...valid, price: 'abc' })));
expect(await alice.asks(LastResponse.status())).toBe(400);
expect(await alice.asks(TheCatalogue.names())).not.toContain(valid.product_name); // nothing created
```

- A rejection test also checks that **nothing changed** ("keep the product", "create nothing"). That is a second Question, asked after the request.
- When an invalid request might wrongly succeed (a product defect), track whatever it created, so the leak still gets cleaned up.
- Parameterised cases (`Cases:` in TEST_CASES.md) loop over a table, one `test()` per row:

```ts
const invalidPayloads = [
  { case: 'category missing', patch: { category: undefined } },
  { case: 'price not a number', patch: { price: 'abc' } },
  // ...
] as const;

for (const { case: name, patch } of invalidPayloads) {
  test(`PRD-API-03 should reject the product with 400 when ${name}`, async ({ actorCalled }) => {
    // ...
  });
}
```

## 8. Quirks to design around

| Quirk                                                                                                   | Consequence                                                                    |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `/api/products/filter` returns a bare array whose rows use `name`, not `product_name`                   | `TheCatalogue.filteredBy` returns the raw rows. SRCH-API-05 is a defect.       |
| Swagger documents `/api/groceries`, `/api/basket/items`, `DELETE /api/basket`; the UI calls other paths | Target what the UI calls. CON-API cases track the difference.                  |
| Envelopes differ per resource (`products`, `items`, `data`, `order`, `orders`, or none)                 | Unwrap them in Questions and Tasks, once.                                      |
| `POST /api/orders` consumes the whole basket                                                            | `@stateful`, one worker, and `SeedOrder` checks the basket first.              |
| `PUT /api/orders/:id` returns no `items`                                                                | Use `TheOrder.withId` when a test needs the items.                             |
| Login rate limit of 10 per 15 min per IP                                                                | Never log in per test. Tag `@login`, `retries: 0`, and never repeat-each them. |

## 9. What a finished API test reads like

This is the target, so you can check your design against it. The classes do not exist yet: you write them.

```ts
test('PRD-API-07 should change only the sent fields when a partial payload is sent', async ({
  actorCalled,
}) => {
  const alice = actorCalled('Alice');
  await alice.attemptsTo(SeedProducts.like({ price: 5 }));
  const product = await alice.asks(Note.of('product'));

  await alice.attemptsTo(UpdateProduct.withId(product.id).setting({ price: 7.5 }));

  expect(await alice.asks(TheProduct.withId(product.id))).toEqual({ ...product, price: 7.5 });
});
```

Compare it with `../playwright-pom/tests/api/products.api.spec.ts:156` once yours is green.
