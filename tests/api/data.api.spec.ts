// Test data: DATA-API-* in docs/TEST_CASES.md#test-data
// TODO(M3): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Test data', { tag: [TAGS.api] }, () => {
  test.fixme(
    'DATA-API-01 should delete seeded products when the actor is dismissed',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice seeded two products
      // When she is dismissed (fixture teardown, called by hand here)
      // Then both products answer 404
      // POM: ../playwright-pom/tests/api/seeder.api.spec.ts:11
    },
  );

  test.fixme(
    'DATA-API-02 should leave no order, basket item or product behind when a seeded order is cleaned up',
    { tag: [TAGS.smoke, TAGS.stateful] },
    () => {
      // Given Alice seeded an order
      // When she is dismissed
      // Then the order, the basket lines and the products are all gone
      // POM: ../playwright-pom/tests/api/seeder.api.spec.ts:33
    },
  );
});
