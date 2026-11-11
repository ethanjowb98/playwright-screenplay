# playwright-screenplay

The qacloud.dev [Market](https://www.qacloud.dev/market.html) test suite (API + E2E), rebuilt with the **Screenplay pattern** on plain `@playwright/test`. It is a sibling of [`../playwright-pom`](../playwright-pom), which covers the same app and the same cases with the Page Object Model, so the two can be compared case by case.

> **Status: skeleton.** Tooling works and every test case is a `test.fixme` placeholder. The Screenplay core and everything built on it are yours to write: follow the milestones.

## Start here

1. [docs/TUTORIAL.md](docs/TUTORIAL.md): concepts, the POM → Screenplay mapping, the shapes to aim for, traps
2. [docs/ROADMAP.md](docs/ROADMAP.md): milestones M0–M8, task checklists and exit criteria
3. [docs/TEST_CASES.md](docs/TEST_CASES.md): 111 cases, each with an ID, Given/When/Then and a POM reference
4. [docs/API_GUIDE.md](docs/API_GUIDE.md): endpoints, the `CallAnApi` / `Send` / `LastResponse` design, test data and cleanup
5. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): layers, the rules for each, test projects

## Requirements

| Tool    | Version                                                                      |
| ------- | ---------------------------------------------------------------------------- |
| Node.js | 22 LTS or newer                                                              |
| Account | A verified [qacloud.dev](https://www.qacloud.dev) user (username + password) |

## Setup

```bash
npm install
npx playwright install --with-deps chromium
cp .env.example .env          # set QACLOUD_USERNAME / QACLOUD_PASSWORD
npm run check                 # typecheck + lint + format
npm run test:list             # 112 placeholders = your to-do list
```

`.env` and `.auth/` are gitignored. Never commit them.

## Scripts

| Command              | What it runs                                                |
| -------------------- | ----------------------------------------------------------- |
| `npm test`           | Everything                                                  |
| `npm run test:core`  | Unit-style specs for your Screenplay core (M1)              |
| `npm run test:setup` | The auth setup project only                                 |
| `npm run test:api`   | API specs (`api` + `stateful` projects, `@api`)             |
| `npm run test:e2e`   | E2E specs in Chromium (`e2e-chromium` + `stateful`, `@e2e`) |
| `npm run test:smoke` | `@smoke` cases                                              |
| `npm run test:list`  | List all tests without running them                         |
| `npm run report`     | Open the last HTML report                                   |
| `npm run check`      | `typecheck` + `lint` + `format:check`                       |

Run one case: `npx playwright test -g PRD-API-01`.

`POST /api/login` is limited to 10 requests per 15 minutes per IP. Run `@login` cases once, never with `--repeat-each`.

## Project structure

```text
src/
  screenplay/     core: Actor, Ability, Activity, Interaction, Task, Question, Notepad, Target, step  (M1)
  abilities/      CallAnApi (M2) · ManageTestData (M3) · BrowseTheWeb (M5)
  interactions/
    api/          Send + request builders                                   (M2)
    ui/           Navigate, Click, Enter, Select, Check, Press, AnswerDialog, WaitForApi  (M5)
  tasks/
    data/         SeedProducts, SeedBasket, SeedOrder                       (M3)
    api/          optional resource tasks: CreateProduct, …                 (M4)
    auth/ navigation/ products/ basket/ orders/   UI business tasks         (M5–M6)
  questions/
    api/          LastResponse, TheProduct, TheCatalogue, TheBasket, TheOrder, TheProfile
    ui/           TheProductCard, TheBasketBadge, TheOrderCard, …           (M6)
  ui/             Targets per screen area: LoginForm, ProductGrid, BasketPanel, …  (M5–M6)
  fixtures/       actorCalled(name), teardown                               (M2)
  config/         env.ts, constants.ts           (copied from playwright-pom)
  api/types.ts    JSON shapes of the live API     (copied from playwright-pom)
  data/           uniqueName, productFactory      (copied from playwright-pom)
tests/
  core/           CORE-* (M1)
  setup/          auth.setup.ts (M2)
  api/            AUTH, PRD, SRCH, BSK, ORD, INT, CON, DATA (M2–M4)
  e2e/            LOGIN, PRD, SRCH, BSK, CHK, ORD (M5–M6)
  seed.spec.ts    SEED-E2E-01
docs/             TUTORIAL, ROADMAP, TEST_CASES, API_GUIDE, ARCHITECTURE
```

Every placeholder in `src/` explains what goes in it, lists its TODOs and milestone, and points to its POM equivalent and its section of the tutorial.
