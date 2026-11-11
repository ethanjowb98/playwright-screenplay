// Basket UI: BSK-E2E-* in docs/TEST_CASES.md#basket-ui
// TODO(M6): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Basket UI', { tag: [TAGS.e2e, TAGS.stateful] }, () => {
  test.fixme(
    'BSK-E2E-01 should put one unit in the basket when ADD is clicked',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a seeded product
      // When she clicks ADD on its card
      // Then the card shows quantity 1 and the badge 1
      // POM: ../playwright-pom/tests/e2e/basket.spec.ts:24
    },
  );

  test.fixme('BSK-E2E-02 should add one unit when + is clicked on the card', () => {
    // Given Alice has the product in her basket
    // When she clicks + on the card
    // Then the quantity goes up by one
    // POM: ../playwright-pom/tests/e2e/basket.spec.ts:43
  });

  test.fixme('BSK-E2E-03 should remove the item and show ADD again when - is clicked at quantity 1', () => {
    // Given Alice has 1 unit in her basket
    // When she clicks − on the card
    // Then ADD is shown again and the basket is empty
    // POM: ../playwright-pom/tests/e2e/basket.spec.ts:58
  });

  test.fixme('BSK-E2E-04 should disable + when the basket holds the whole stock', () => {
    // Given Alice has the whole stock in her basket
    // When she looks at the card
    // Then + is disabled
    // POM: ../playwright-pom/tests/e2e/basket.spec.ts:74
  });

  test.fixme(
    'BSK-E2E-05 should list every item with its subtotal and the basket total when the Basket tab is opened',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a seeded basket of two lines
      // When she opens the Basket tab
      // Then each line shows its subtotal and the total is right
      // POM: ../playwright-pom/tests/e2e/basket.spec.ts:91
    },
  );

  test.fixme('BSK-E2E-06 should change the quantity when + or - is clicked in the Basket tab', () => {
    // Given Alice has quantity 2 in her basket
    // When she clicks + or − in the Basket tab
    // Then the quantity is 3 or 1
    // Cases (one test each, from a table): + (2 → 3), − (2 → 1)
    // POM: ../playwright-pom/tests/e2e/basket.spec.ts:117
  });

  test.fixme(
    'BSK-E2E-07 should remove only that item when Remove is clicked',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has two lines in her basket
      // When she removes one
      // Then only the other remains
      // POM: ../playwright-pom/tests/e2e/basket.spec.ts:134
    },
  );

  test.fixme('BSK-E2E-08 should empty the basket when Clear All is confirmed', () => {
    // Given Alice has a seeded basket
    // When she clicks Clear All and confirms
    // Then the basket is empty
    // POM: ../playwright-pom/tests/e2e/basket.spec.ts:153
  });

  test.fixme('BSK-E2E-09 should keep every item when Clear All is dismissed', () => {
    // Given Alice has a seeded basket
    // When she clicks Clear All and dismisses
    // Then every line is still there
    // POM: ../playwright-pom/tests/e2e/basket.spec.ts:171
  });

  test.fixme('BSK-E2E-10 should show the API basket line count on the badge and its units in the stats when the basket holds several lines', () => {
    // Given Alice has a seeded basket of several lines and units
    // When she opens the market
    // Then the badge counts lines and Basket Units counts units
    // POM: ../playwright-pom/tests/e2e/basket.spec.ts:193
  });
});
