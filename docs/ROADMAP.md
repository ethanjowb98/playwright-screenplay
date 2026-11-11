# Roadmap: Screenplay rebuild of the Market suite

Status key: ⬜ not started · 🟡 in progress · ✅ done

Workflow: one branch per milestone (`feat/m<N>-<slug>`). Every milestone ends with an **Exit** check: do not start the next one until it passes. Test-case IDs refer to [TEST_CASES.md](TEST_CASES.md).

## Summary

| #   | Milestone                       | Status | Cases unlocked                            | Completed |
| --- | ------------------------------- | ------ | ----------------------------------------- | --------- |
| M0  | Foundation                      | 🟡     | none                                      |           |
| M1  | Screenplay core                 | ⬜     | CORE-01 to CORE-06                        |           |
| M2  | API ability, auth, first test   | ⬜     | PRD-API-01, AUTH-API-01                   |           |
| M3  | Test data and cleanup           | ⬜     | DATA-API-01, DATA-API-02                  |           |
| M4  | API suite                       | ⬜     | AUTH, PRD, SRCH, BSK, ORD, INT, CON (API) |           |
| M5  | Browser ability, targets, login | ⬜     | SEED-E2E-01, LOGIN-E2E-*                  |           |
| M6  | E2E suite                       | ⬜     | PRD, SRCH, BSK, CHK, ORD (E2E)            |           |
| M7  | Reporting (Allure)              | ⬜     | none                                      |           |
| M8  | CI, hardening, retrospective    | ⬜     | none                                      |           |

---

## M0: Foundation 🟡

The scaffold gives you this. Verify it on your machine.

- [x] Tooling: `package.json`, `tsconfig.json` (path aliases), `playwright.config.ts` (projects core / setup / api / stateful / e2e-chromium), ESLint with the layer rules, Prettier, EditorConfig
- [x] `src/config` (env, constants) and `src/api/types.ts`, copied from playwright-pom
- [x] `src/data` (`uniqueName`, `productFactory`), copied from playwright-pom
- [x] Skeleton: every `src/` placeholder, plus a `test.fixme` for every case
- [ ] `npm install` and `npx playwright install --with-deps chromium`
- [ ] `cp .env.example .env` and fill in `QACLOUD_USERNAME` and `QACLOUD_PASSWORD`
- [ ] `git init`, first commit
- [ ] **Exit:** `npm run check` passes and `npm run test:list` lists 112 tests

## M1: Screenplay core ⬜

Learn the pattern with no app in the way. Read [TUTORIAL §1–2](TUTORIAL.md#1-from-pom-to-screenplay).

- [ ] `Ability.ts`: `Ability`, `AbilityType`, `Discardable`
- [ ] `Activity.ts`, `Interaction.ts` (`Interaction.where`), `Task.ts` (`Task.where`)
- [ ] `Question.ts` (`Question.about`, optional `.map`)
- [ ] `Notepad.ts` (typed notes, clear error on a missing key)
- [ ] `step.ts`: boxed `test.step`, `return await`
- [ ] `Actor.ts`: `named`, `whoCan`, `abilityTo`, `attemptsTo`, `asks`, `remember` / `recall`, `dismiss`
- [ ] `index.ts` barrel, `@screenplay` imports work
- [ ] CORE-01 to CORE-06 implemented in `tests/core/screenplay.spec.ts`
- [ ] **Exit:** `npm run test:core` is green, and the HTML report shows nested steps in the actor's voice

## M2: API ability, auth, first test ⬜

Read [API_GUIDE §1–5](API_GUIDE.md) and [TUTORIAL §3](TUTORIAL.md#3-your-first-scenario).

- [ ] `tests/setup/auth.setup.ts`: reuse a valid session, else log in. Write `.auth/user.json` and `.auth/apikey.json`
- [ ] `CallAnApi`: cookie-less context, api key or none, records every response, masked attachments, call log stripped
- [ ] `requests.ts` (Get/Post/Put/Delete builders, `.with`, `.withQuery`) and `Send`
- [ ] `LastResponse` (`status`, `body`, `error`) and `TheProfile`
- [ ] `src/fixtures/index.ts`: `actorCalled(name)`, plus a way to build Mallory (`apiKey: null` or invalid)
- [ ] Specs import `test` / `expect` from `@fixtures`
- [ ] **Exit:** PRD-API-01 and AUTH-API-01 green. A second `npm run test:setup` reuses the session (no login spent)

## M3: Test data and cleanup ⬜

Read [API_GUIDE §6](API_GUIDE.md#6-test-data-and-cleanup).

- [ ] `ManageTestData`: `track`, `trackProductNamed`, `trackOrderWith`, `discard()` in dependency order, 404 = already gone, fails on leftovers
- [ ] Fixture gives every actor `ManageTestData` and calls `actor.dismiss()` in teardown
- [ ] Tasks `SeedProducts`, `SeedBasket`, `SeedOrder` (checks the basket holds only its own lines)
- [ ] PRD-API-01 now cleans up after itself
- [ ] DATA-API-01, DATA-API-02
- [ ] **Exit:** after a full run, `GET /api/products` returns no product whose name starts with `QA-<worker>-` from that run

## M4: API suite ⬜

- [ ] Questions: `TheProduct`, `TheCatalogue`, `TheBasket`, `TheOrder`
- [ ] Optional resource tasks (`src/tasks/api`): products, then basket, then orders
- [ ] AUTH-API-02 to 06 (02/03 are `@login`: run once)
- [ ] PRD-API-02 to 11
- [ ] SRCH-API-01 to 05
- [ ] BSK-API-01 to 17 (`@stateful`)
- [ ] ORD-API-01 to 11 (`@stateful`)
- [ ] INT-API-01 to 05 (`@stateful`)
- [ ] CON-API-01 to 03
- [ ] Every PRODUCT DEFECT case written with the correct assertion and parked as `test.fixme` with its annotation
- [ ] **Exit:** `npm run test:api` green, and `npx playwright test --project=api --repeat-each=3 --grep-invert @login` green

## M5: Browser ability, targets, login ⬜

Read [TUTORIAL §4–5](TUTORIAL.md#4-assertions-and-auto-retry). Decide your auto-retry strategy before writing any UI Question.

- [ ] `BrowseTheWeb`, `Target` (with `.of(parent)`)
- [ ] Interactions: `Navigate`, `Click`, `Enter` (+ `EnterSecret`), `Select`, `Check`, `Press`, `AnswerDialog`, `WaitForApi`
- [ ] Targets: `LoginForm`, `MarketHeader`
- [ ] Tasks: `LogIn`, `OpenTheMarket`, `OpenTab`
- [ ] Questions: `TheCurrentPage`, `TheValidationMessage`, `TheAlert`
- [ ] Fixture: browser projects give Alice `BrowseTheWeb`; Guest gets a page without storageState
- [ ] SEED-E2E-01, LOGIN-E2E-01 to 04 (01/02 are `@login`)
- [ ] **Exit:** seed and login green; no password appears anywhere in the HTML report

## M6: E2E suite ⬜

- [ ] Targets: `ProductGrid`, `ProductModal`, `ItemDetailsModal`, `FilterSidebar`, `BasketPanel`, `OrderSuccessModal`, `OrdersPanel`
- [ ] Tasks: products (Add / Edit / Delete / Search / Filter / Sort), basket (Add / ChangeQuantity / Remove / Clear), orders (Place / ChangeStatus / Delete)
- [ ] Questions: `TheProductCard`, `TheVisibleProducts`, `TheBasketBadge`, `TheBasketLines`, `TheOrderCard`
- [ ] PRD-E2E-01 to 13
- [ ] SRCH-E2E-01 to 07
- [ ] BSK-E2E-01 to 10 (`@stateful`)
- [ ] CHK-E2E-01 to 03 (`@stateful`)
- [ ] ORD-E2E-01 to 07 (`@stateful`)
- [ ] **Exit:** `npm run test:e2e` green, and `--repeat-each=3 --grep-invert @login` stable

## M7: Reporting ⬜

- [ ] Add `allure-playwright`, `allure-js-commons`, `allure`. Reporter entry in `playwright.config.ts`
- [ ] Labels per spec (epic `Market`, feature, story, severity), as in POM's `labels()` helper
- [ ] Check the Allure step tree matches the actor's story (activities and questions, nested)
- [ ] Known product defects grouped in their own category (`ALLURE.productDefectPrefix`)
- [ ] **Exit:** `allure generate` + `allure open` show every case, steps readable without opening code

## M8: CI, hardening, retrospective ⬜

- [ ] GitHub Actions: check job, then api / e2e / stateful jobs (secrets `QACLOUD_*`). `@login` cases nightly only
- [ ] ESLint: tighten the layer rules (no relative imports that dodge the alias rules, no `expect` in `src/`)
- [ ] Secrets check: run the suite, then search `playwright-report/` for the password and api key
- [ ] Optional: port `tests/maintenance` (reset) as an opt-in project
- [ ] `docs/RETROSPECTIVE.md`: POM vs Screenplay for this suite. Cover file count, lines per test, how easy a new test was, failure readability, and what you would bring back
- [ ] **Exit:** CI green on `main`; retrospective written

---

## Notes

Record design decisions here as you make them (auto-retry strategy, task naming, how UI and API flavours of a task are told apart, and so on).

-
