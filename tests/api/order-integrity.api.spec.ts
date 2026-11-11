// Order integrity API: INT-API-* in docs/TEST_CASES.md#order-integrity-api
// TODO(M4): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Order integrity API', { tag: [TAGS.api, TAGS.stateful] }, () => {
  test.fixme(
    'INT-API-01 should total the items, empty the basket and decrease stock when an order is placed',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a basket of two seeded products
      // When she places an order
      // Then total = Σ price × qty, the basket is empty and each stock went down by its quantity
      // POM: ../playwright-pom/tests/api/order-integrity.api.spec.ts:22
    },
  );

  test.fixme('INT-API-02 should restore stock when an order is cancelled', () => {
    // Given Alice placed an order
    // When she cancels it
    // Then each product's stock is back to where it started
    // POM: ../playwright-pom/tests/api/order-integrity.api.spec.ts:45
  });

  test.fixme('INT-API-03 should keep the product and the order intact when a product in an order is deleted', () => {
    // Given Alice placed an order for a product
    // When she tries to delete the product
    // Then the product and the order are both still there
    // POM: ../playwright-pom/tests/api/order-integrity.api.spec.ts:59
  });

  test.fixme(
    'INT-API-04 should answer 409 when a product in an order is deleted',
    {
      annotation: {
        type: 'issue',
        description:
          'PRODUCT DEFECT: Deleting a product that is in an order answers a misleading 404.',
      },
    },
    () => {
      // Given Alice placed an order for a product
      // When she deletes the product
      // Then the response is 409 Conflict
      // POM: ../playwright-pom/tests/api/order-integrity.api.spec.ts:83
    },
  );

  test.fixme(
    'INT-API-05 should reject the order and change nothing when stock fell below a basket quantity',
    {
      annotation: {
        type: 'issue',
        description:
          'PRODUCT DEFECT: Checkout succeeds when stock fell below a basket quantity (oversell).',
      },
    },
    () => {
      // Given Alice has a basket and the stock is then lowered below its quantity
      // When she places an order
      // Then the response is 400 and stock and basket are unchanged
      // POM: ../playwright-pom/tests/api/order-integrity.api.spec.ts:101
    },
  );
});
