// Orders UI: ORD-E2E-* in docs/TEST_CASES.md#orders-ui
// TODO(M6): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Orders UI', { tag: [TAGS.e2e, TAGS.stateful] }, () => {
  test.fixme(
    'ORD-E2E-01 should list the order with its items and total when the Orders tab is opened',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a seeded order
      // When she opens the Orders tab
      // Then its card shows the items and the total
      // POM: ../playwright-pom/tests/e2e/orders.spec.ts:12
    },
  );

  test.fixme('ORD-E2E-02 should save the status when an open status is selected', () => {
    // Given Alice has a pending order
    // When she selects processing
    // Then the status is saved (API agrees)
    // POM: ../playwright-pom/tests/e2e/orders.spec.ts:34
  });

  test.fixme('ORD-E2E-03 should lock the order when a final status is confirmed', () => {
    // Given Alice has an open order
    // When she selects delivered or cancelled and confirms the warning
    // Then the status select is disabled
    // Cases (one test each, from a table): delivered, cancelled
    // POM: ../playwright-pom/tests/e2e/orders.spec.ts:51
  });

  test.fixme('ORD-E2E-04 should return the items to stock when the order is cancelled', () => {
    // Given Alice has an order for 2 units
    // When she cancels it
    // Then the product's stock is back up by 2
    // POM: ../playwright-pom/tests/e2e/orders.spec.ts:70
  });

  test.fixme('ORD-E2E-05 should keep the status when the final status warning is cancelled', () => {
    // Given Alice has an open order
    // When she selects delivered and cancels the warning
    // Then the status is unchanged
    // POM: ../playwright-pom/tests/e2e/orders.spec.ts:88
  });

  test.fixme('ORD-E2E-06 should remove the order when the delete is confirmed', () => {
    // Given Alice has a seeded order
    // When she deletes it and confirms
    // Then its card is gone
    // POM: ../playwright-pom/tests/e2e/orders.spec.ts:105
  });

  test.fixme('ORD-E2E-07 should keep the order when the delete is cancelled', () => {
    // Given Alice has a seeded order
    // When she deletes it and cancels
    // Then its card is still there
    // POM: ../playwright-pom/tests/e2e/orders.spec.ts:121
  });
});
