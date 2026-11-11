# Architecture

## Goals

- **Specs read as behaviour.** A spec is a sequence of actor sentences followed by assertions on Questions.
- **Each layer has one job.** Breaking a rule is a lint error where possible and a review comment otherwise.
- **Parallel-safe on a shared account.** Every test owns its data, and basket-touching tests run on one worker.

## Layers

```text
 tests/               specs: actors + expect, nothing else
   │
   │  @fixtures       builds actors (abilities in, dismiss() out)
   ▼
 Actor ──attemptsTo──► Tasks (src/tasks) ──compose──► Interactions (src/interactions)
   │                                                        │ use exactly one
   └──asks──► Questions (src/questions) ──read via──►  Abilities (src/abilities)
                    │                                       │
                    └──── Targets (src/ui) ◄── locate ──────┤
                                                            ▼
                                    BrowseTheWeb → Page    CallAnApi → /api/*    ManageTestData
 src/screenplay       the core (Actor, Ability, Activity, Task, Interaction, Question, Notepad, Target, step)
 src/config, src/data, src/api/types.ts   shared config, factories, JSON shapes
```

| Layer         | Folder                   | Responsibility                                       | Must not                                         |
| ------------- | ------------------------ | ---------------------------------------------------- | ------------------------------------------------ |
| Specs         | `tests/`                 | Arrange / Act / Assert one behaviour through actors  | Use `page.*`, `request.*`, `test.step`, locators |
| Fixtures      | `src/fixtures`           | Build actors with abilities; `dismiss()` in teardown | Contain test logic                               |
| Core          | `src/screenplay`         | The pattern itself, app-agnostic                     | Import app code (abilities, tasks, ui, api)      |
| Abilities     | `src/abilities`          | Wrap one tool; hold its state                        | Describe business steps                          |
| Interactions  | `src/interactions`       | One technical action, one ability                    | Branch on business logic, assert, hard-wait      |
| Tasks         | `src/tasks`              | Compose activities into business goals               | Import abilities, assert                         |
| Questions     | `src/questions`          | Read state (GET requests, page content, notepad)     | Perform activities or write requests             |
| Targets       | `src/ui`                 | Named locators                                       | Act, wait, assert                                |
| Config / data | `src/config`, `src/data` | Env, constants, factories, unique names              | Hold secrets                                     |

`eslint.config.mjs` enforces the core, tasks, questions, targets and specs rows (`no-restricted-imports` / `no-restricted-syntax`).

## Test projects

| Project        | Matches                                                          | Notes                                          |
| -------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| `core`         | `tests/core/**/*.spec.ts`                                        | No app, no auth: unit-style specs for the core |
| `setup`        | `tests/setup/*.setup.ts`                                         | One login at most, `retries: 0`                |
| `api`          | `tests/api/**/*.api.spec.ts` minus `@stateful`                   | Fully parallel                                 |
| `stateful`     | API + E2E specs tagged `@stateful`                               | `workers: 1`: the basket is account-wide       |
| `e2e-chromium` | `tests/e2e/**/*.spec.ts`, `tests/seed.spec.ts` minus `@stateful` | storageState from setup                        |

## Decisions

| Decision                                         | Why                                                                           |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| Hand-rolled core, no Serenity/JS                 | Learning the pattern is the goal; the core is small                           |
| Same app and cases as playwright-pom             | A case-by-case comparison of the two patterns                                 |
| `CallAnApi` records, never throws on status      | Negative tests are a third of the suite; the test decides what a status means |
| Seeding through API tasks, cleanup in an ability | Arrange stays fast; teardown runs even when a test fails                      |
| Steps from the Actor, boxed                      | One step mechanism; failures point at the spec line                           |

Add rows as you decide things (auto-retry strategy, UI vs API task naming, and so on).
