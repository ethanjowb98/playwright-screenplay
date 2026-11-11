# Screenplay tutorial

You already have a working POM suite for the Market app (`../playwright-pom`). This tutorial walks you through rebuilding it with the Screenplay pattern on plain `@playwright/test`, writing the core yourself. It explains the concepts and shows the shapes to aim for. **It does not contain the implementations**: each `src/` file has TODOs pointing back here.

Work through it alongside [ROADMAP.md](ROADMAP.md), one milestone at a time.

## Contents

1. [From POM to Screenplay](#1-from-pom-to-screenplay)
2. [The five building blocks](#2-the-five-building-blocks)
3. [Your first scenario](#3-your-first-scenario)
4. [Assertions and auto-retry](#4-assertions-and-auto-retry)
5. [UI: targets and interactions](#5-ui-targets-and-interactions)
6. [Reporting](#6-reporting)
7. [More than one actor](#7-more-than-one-actor)
8. [The workflow for each test case](#8-the-workflow-for-each-test-case)
9. [Traps](#9-traps)
10. [Further reading](#10-further-reading)

## 1. From POM to Screenplay

POM organises code around **pages**: one class knows where everything is _and_ how to do everything on that page. Screenplay organises code around **people and goals**: an _actor_ with _abilities_ performs _tasks_ made of _interactions_, and asks _questions_ about what they see.

| In playwright-pom                                | In playwright-screenplay                                                                           |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `MarketPage`, `ProductGrid` (locators + methods) | **Targets** in `src/ui` (locators only) + **Interactions** in `src/interactions/ui`                |
| `productGrid.addToBasket(name)` (intent method)  | **Task** `AddToBasket.theProduct(name)`                                                            |
| `ProductsApi.create(input)` (client method)      | **Interaction** `Send.a(PostRequest…)`, optionally wrapped in **Task** `CreateProduct.with(input)` |
| Getter + `expect` in the spec                    | **Question** `TheProductCard.of(name).price()`, then `expect` in the spec                          |
| Fixture-injected `page`, `productsApi`, `seeder` | **Abilities** `BrowseTheWeb`, `CallAnApi`, `ManageTestData` held by an **Actor**                   |
| `DataSeeder.seedProduct()` + teardown            | **Tasks** `SeedProducts…` + **Ability** `ManageTestData.discard()`                                 |
| `@step` decorator on methods                     | The Actor wraps every activity and question in a step                                              |

What you gain:

- **Composition over inheritance.** Tasks are small and reusable across pages, and a task like "place an order" can mix UI and API steps.
- **Specs read as behaviour.** `alice.attemptsTo(AddToBasket.theProduct(milk), PlaceTheOrder())`.
- **One mechanism for every layer.** The same Actor drives the API and the browser. Only the abilities change.

What it costs: more, smaller files and more indirection. The retrospective in M8 asks you to judge whether it was worth it for this suite.

## 2. The five building blocks

The type sketches below show the **shape only**. Writing the bodies is milestone M1 (`src/screenplay/*`).

### Actor

```ts
class Actor {
  static named(name: string): Actor;
  whoCan(...abilities: Ability[]): this;
  abilityTo<A extends Ability>(type: AbilityType<A>): A;
  attemptsTo(...activities: Activity[]): Promise<void>;
  asks<T>(question: Question<T>): Promise<T>;
  remember<K extends keyof Notes>(key: K, value: Notes[K]): void;
  recall<K extends keyof Notes>(key: K): Notes[K];
  dismiss(): Promise<void>;
}
```

The actor is the only object a spec talks to.

### Ability

```ts
interface Ability {}
type AbilityType<A extends Ability> = abstract new (...args: never[]) => A;
interface Discardable {
  discard(): Promise<void>;
}
```

An ability is a thin wrapper around a tool: `BrowseTheWeb` holds a `Page`, `CallAnApi` holds an `APIRequestContext` and an api key, and `ManageTestData` holds a registry of created ids. Convention: give each one `static as(actor)` so interactions can write `BrowseTheWeb.as(actor).page`.

### Activity: Interaction and Task

```ts
interface Activity {
  performAs(actor: Actor): Promise<void>;
  toString(): string; // the step title, in the actor's voice
}

const Interaction = { where(description: string, fn: (actor: Actor) => Promise<void>): Activity };
const Task = { where(description: string, ...activities: Activity[]): Activity };
```

|         | Interaction                             | Task                                        |
| ------- | --------------------------------------- | ------------------------------------------- |
| Level   | Technical: click, fill, send a request  | Business: log in, place an order            |
| Uses    | Exactly one Ability                     | Other activities only. **Never** an Ability |
| Example | `Click.on(ProductGrid.addButton(milk))` | `AddToBasket.theProduct(milk)`              |

ESLint enforces the "never an Ability" rule: importing `@abilities/*` in `src/tasks` is an error.

### Question

```ts
interface Question<T> {
  answeredBy(actor: Actor): Promise<T>;
  toString(): string;
}
const Question = { about<T>(description: string, fn: (actor: Actor) => Promise<T>): Question<T> };
```

A question reads state and **never changes it**. A `GET` request is fine. A click is not, even a click that only opens a panel to read it: that click is a Task the spec performs first.

### Notepad (actor memory)

Use it for what the actor learns along the way: the id of the product it just created, or the order number from checkout. Type it with a `Notes` interface, so `recall('orderNumber')` returns a `string` and not `unknown`.

## 3. Your first scenario

Work top-down: write the spec you _wish_ you had, let it fail typecheck, then build the pieces it needs.

**Milestone M1: core only, no app.** Start with `tests/core/screenplay.spec.ts`. Each CORE case uses a fake ability defined inside the spec, for example `class HoldANumber implements Ability { constructor(readonly value: number) {} }`. When CORE-01 to CORE-06 are green, the core works.

**Milestone M2: first real test, PRD-API-01.**

1. **Setup project** (`tests/setup/auth.setup.ts`): plain Playwright. Log in once and write `.auth/user.json` and `.auth/apikey.json`.
2. **Fixture** (`src/fixtures/index.ts`): an `actorCalled(name)` fixture that returns an actor who can `CallAnApi` with the stored api key.
3. **Ability, Interaction, Question**: `CallAnApi`, `Send` plus the request builders, and `LastResponse`.
4. **The spec**, which should read like this:

   ```ts
   test('PRD-API-01 should create a product when the payload is valid', async ({ actorCalled }) => {
     const alice = actorCalled('Alice');
     const input = buildProduct();

     await alice.attemptsTo(Send.a(PostRequest.to(ENDPOINTS.products).with(input)));

     expect(await alice.asks(LastResponse.status())).toBe(201);
     expect(await alice.asks(LastResponse.body<Product>())).toMatchObject(input);
   });
   ```

5. Run `npx playwright test -g PRD-API-01`, then open the HTML report (`npm run report`). The steps should read "Alice sends POST /api/products" and so on.

> Yes, this test leaves a product behind. M3 (`ManageTestData`) fixes that. Feeling that pain first is the point.

## 4. Assertions and auto-retry

This is the main design decision Screenplay brings to Playwright. Web-first assertions (`await expect(locator).toHaveText(...)`) retry until they pass. A Question that returns a plain value, such as `string`, is read once and does not retry.

Pick **one** strategy and use it everywhere:

| Option                             | Spec looks like                                                            | Trade-off                                                                                                   |
| ---------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **A. `expect.poll` (recommended)** | `await expect.poll(() => alice.asks(TheBasketBadge.count())).toBe(1)`      | Works the same for UI and API questions, and Playwright types stay out of questions. A little more verbose. |
| B. Questions return a `Locator`    | `await expect(await alice.asks(TheBasketBadge.element())).toHaveText('1')` | Full web-first matchers, but specs depend on Playwright types and the "question" is really a locator.       |
| C. An `Ensure` interaction         | `await alice.attemptsTo(Ensure.that(TheBasketBadge.count(), equals(1)))`   | The purest Screenplay, but you have to write your own matcher library.                                      |

API questions read a snapshot, so plain `expect(await alice.asks(...))` is fine there. Use `expect.poll` only where the state settles over time (the UI, or eventual-consistency checks).

## 5. UI: targets and interactions

**Targets** (`src/screenplay/Target.ts`, plus the files in `src/ui`) are named locators:

```ts
// shape only
export const ProductGrid = {
  card: (name: string) => Target.the(`card of ${name}`).located((page) => /* ... */),
  addButton: (name: string) => Target.the('ADD button').located(/* ... */).of(ProductGrid.card(name)),
};
```

- Find rows and cards by their **unique name or order number**, never by position, because other workers' data shares the page.
- Locator priority: role → label → `#id` → CSS. Icon-only buttons are found by their `title` (`View Details`, `Edit`, `Delete`).

**UI interactions** (`src/interactions/ui`): `Navigate`, `Click`, `Enter`, `Select`, `Check`, `Press`, `AnswerDialog`, `WaitForApi`. These are the Market app's specific needs:

- **The UI re-renders after every fetch.** An action that triggers a request should wait for that response (`WaitForApi.response('POST', ENDPOINTS.basket).whilePerforming(Click.on(...))`) and throw on a non-2xx with method, path and status. No sleeps, no `networkidle`. This is what `../playwright-pom/src/pages/network.ts` does.
- **Delete product, Clear basket** open a native `confirm()`. `AnswerDialog` listens only while its action runs and fails if no dialog opened.
- **Deleting an order and final statuses** use in-page modals, which are ordinary Targets.
- **Passwords**: never use `fill(password)`. Playwright titles the step `Fill "<password>"`. Write an `EnterSecret` interaction that sets the value with `locator.evaluate`.
- **The app never refreshes on its own.** Data seeded after the market opened needs a reload (`OpenTheMarket()` again).

**UI Tasks** compose those interactions: `OpenTheMarket`, `AddToBasket`, `PlaceTheOrder`, and so on (`src/tasks/*`).

A mixed scenario, Arrange through the API and Act and Assert through the UI, is where Screenplay shines:

```ts
await alice.attemptsTo(SeedProducts.like({ stock: 5 }), OpenTheMarket());
const { product_name } = alice.recall('product');
await alice.attemptsTo(AddToBasket.theProduct(product_name));
await expect.poll(() => alice.asks(TheBasketBadge.count())).toBe(1);
```

## 6. Reporting

The Actor wraps every `attemptsTo` activity and every `asks` question in `test.step(title, fn, { box: true })` (`src/screenplay/step.ts`):

- Nested tasks give nested steps, so the HTML report reads as the story of the test.
- `box: true` makes a failure point at the **spec line**, not deep inside an interaction. Use `return await` in the wrapper, or the location is lost.
- Title = `${actor.name} ${activity}`: "Alice adds QA-3-x1y2 Milk to the basket".
- **Never** build a title from a password or an api key. Every report prints titles.

Allure comes in M7. allure-playwright records `test.step`, so you get the same tree there for free.

## 7. More than one actor

There is one shared account, so the actors differ by **credentials**, not by data:

| Actor   | Abilities                                                                     | Used for                            |
| ------- | ----------------------------------------------------------------------------- | ----------------------------------- |
| Alice   | `CallAnApi(apiKey)`, `BrowseTheWeb(authenticated page)`, `ManageTestData`     | almost every case                   |
| Mallory | `CallAnApi(null)` or `CallAnApi('qac_live_invalid')`; an unauthenticated page | 401 tests, wrong-password login     |
| Guest   | `BrowseTheWeb(page without storageState)`                                     | redirect and empty-form login tests |

The fixture can expose `actorCalled(name)`, which builds Alice by default, plus a helper for the variants (for example `actorWithApiKey('Mallory', null)`).

## 8. The workflow for each test case

1. Pick a case ID from [TEST_CASES.md](TEST_CASES.md), say `BSK-API-04`.
2. In its spec, turn `test.fixme` into `test` and write the body **as actor sentences**, using classes that may not exist yet.
3. `npm run typecheck` lists what is missing. Build each missing Task, Interaction or Question, smallest first.
4. Run it: `npx playwright test -g BSK-API-04`. Check the steps in the report.
5. Run it three times to check stability: `npx playwright test -g BSK-API-04 --repeat-each=3`. Never do this for `@login` cases.
6. **Then** read the POM version (the `POM:` comment in the test body) and compare. Note anything worth bringing back.
7. Tick the case in TEST_CASES.md and the task in ROADMAP.md.

## 9. Traps

- **God-tasks.** `DoTheWholeCheckout` with eight parameters. Split it until each task does one thing a user would describe in one sentence.
- **Questions that act.** "Open the Basket tab and read the total" is a Task followed by a Question.
- **Playwright types leaking into specs.** If a spec imports `Page` or `Locator`, something is in the wrong layer. The ESLint rules on `tests/` catch the common cases.
- **Interactions that think.** An `if` in an Interaction usually means it is a Task.
- **Hidden waits.** `waitForTimeout` anywhere is a bug. Wait on a response or use a web-first condition.
- **Reaching for the Notepad when a return value would do.** It is for things learned during the scenario, not for passing arguments.
- **Seeding through the UI.** Arrange through the API, every time, unless the UI flow is the thing under test.

## 10. Further reading

- Antony Marcano, Andy Palmer, John Ferguson Smart, Jan Molak: _Beyond Page Objects: Next Generation Test Automation with Serenity and the Screenplay Pattern_ (the original article).
- Serenity/JS documentation, the Screenplay Pattern section. It is a full implementation of what you are building by hand, and worth reading _after_ M1 to compare designs.
- Playwright docs: [Fixtures](https://playwright.dev/docs/test-fixtures), [`test.step`](https://playwright.dev/docs/api/class-test#test-step), [API testing](https://playwright.dev/docs/api-testing), [Authentication](https://playwright.dev/docs/auth).
