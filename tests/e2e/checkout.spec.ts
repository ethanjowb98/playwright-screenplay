// Checkout UI: CHK-E2E-* in docs/TEST_CASES.md#checkout-ui
// TODO(M6): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Checkout UI', { tag: [TAGS.e2e, TAGS.stateful] }, () => {
  test.fixme(
    'CHK-E2E-01 should place the order, list it in Orders and empty the basket when the basket is checked out',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a seeded basket
      // When she places the order from the Basket tab
      // Then the success modal shows an order number, Orders lists it and the basket is empty
      // POM: ../playwright-pom/tests/e2e/checkout.spec.ts:13
    },
  );

  test.fixme('CHK-E2E-02 should offer no Place Order button when the basket is empty', () => {
    // Given Alice's basket is empty
    // When she opens the Basket tab
    // Then there is no Place Order button
    // POM: ../playwright-pom/tests/e2e/checkout.spec.ts:49
  });

  test.fixme('CHK-E2E-03 should show the reduced stock on the product card when an order has been placed', () => {
    // Given Alice checked out 2 units of a product
    // When she looks at its card
    // Then the stock went down by 2
    // POM: ../playwright-pom/tests/e2e/checkout.spec.ts:66
  });
});
