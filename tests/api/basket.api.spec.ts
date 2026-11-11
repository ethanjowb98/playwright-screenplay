// Basket API: BSK-API-* in docs/TEST_CASES.md#basket-api
// TODO(M4): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Basket API', { tag: [TAGS.api, TAGS.stateful] }, () => {
  test.fixme(
    'BSK-API-01 should add a product to the basket when it is in stock',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice seeded a product in stock
      // When she adds it to her basket
      // Then the basket holds one line with that quantity
      // POM: ../playwright-pom/tests/api/basket.api.spec.ts:63
    },
  );

  test.fixme('BSK-API-02 should increase the quantity when the same product is added again', () => {
    // Given Alice has the product in her basket
    // When she adds it again
    // Then the line's quantity is the sum
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:84
  });

  test.fixme(
    'BSK-API-03 should set the quantity when a basket item is updated',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has the product in her basket
      // When she updates the quantity
      // Then the line holds the new quantity
      // POM: ../playwright-pom/tests/api/basket.api.spec.ts:98
    },
  );

  test.fixme(
    'BSK-API-04 should remove only that item when a basket item is removed',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has two products in her basket
      // When she removes one
      // Then only the other remains
      // POM: ../playwright-pom/tests/api/basket.api.spec.ts:115
    },
  );

  test.fixme('BSK-API-05 should empty the basket when it is cleared', () => {
    // Given Alice has items in her basket
    // When she clears it
    // Then the basket is empty
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:130
  });

  test.fixme('BSK-API-06 should drop the item from the basket when its product is deleted', () => {
    // Given Alice has a product in her basket
    // When she deletes the product
    // Then the basket no longer lists it
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:143
  });

  test.fixme('BSK-API-07 should reject the item with 400 when the quantity exceeds stock', () => {
    // Given Alice seeded a product with low stock
    // When she adds more than the stock
    // Then the response is 400 and the basket is unchanged
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:158
  });

  test.fixme('BSK-API-08 should reject the change with 400 and keep the quantity when it would exceed stock', () => {
    // Given Alice has a low-stock product in her basket
    // When she increments or updates it past the stock
    // Then the response is 400 and the quantity is unchanged
    // Cases (one test each, from a table): increment (add again), update
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:174
  });

  test.fixme('BSK-API-09 should reject the item with 400 when the quantity is not positive', () => {
    // Given Alice seeded a product
    // When she adds it with quantity 0 or -1
    // Then the response is 400
    // Cases (one test each, from a table): 0, -1
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:190
  });

  test.fixme('BSK-API-10 should reject the update with 400 and keep the quantity when the payload is invalid', () => {
    // Given Alice has a product in her basket
    // When she sends an invalid update
    // Then the response is 400 and the quantity is unchanged
    // Cases (one test each, from a table): product_id missing, quantity -1, quantity 0, quantity missing
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:205
  });

  test.fixme(
    'BSK-API-11 should reject the update with 400 and keep the quantity when the quantity is not an integer',
    {
      annotation: {
        type: 'issue',
        description:
          'PRODUCT DEFECT: A non-integer or non-numeric basket quantity returns 500, not 400.',
      },
    },
    () => {
      // Given Alice has a product in her basket
      // When she updates it with "abc" or 1.5
      // Then the response is 400 and the quantity is unchanged
      // Cases (one test each, from a table): not a number, not an integer
      // POM: ../playwright-pom/tests/api/basket.api.spec.ts:223
    },
  );

  test.fixme('BSK-API-12 should reject the item with 400 when product_id is missing', () => {
    // Given Alice is authenticated
    // When she adds an item without product_id
    // Then the response is 400
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:246
  });

  test.fixme('BSK-API-13 should return 404 when an unknown product is added', () => {
    // Given Alice has an unknown product id
    // When she adds it
    // Then the response is 404
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:256
  });

  test.fixme('BSK-API-14 should return 404 when a product that is not in the basket is updated', () => {
    // Given Alice seeded a product she did not add
    // When she updates its basket quantity
    // Then the response is 404
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:268
  });

  test.fixme('BSK-API-15 should return 404 when a product that is not in the basket is removed', () => {
    // Given Alice seeded a product she did not add
    // When she removes it from the basket
    // Then the response is 404
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:281
  });

  test.fixme('BSK-API-16 should keep one line with one of the requested quantities when updates race', () => {
    // Given Alice has a product in her basket
    // When she sends five updates at once (TEST_DATA.racingQuantities)
    // Then there is one line whose quantity is one of those sent
    // POM: ../playwright-pom/tests/api/basket.api.spec.ts:295
  });

  test.fixme(
    'BSK-API-17 should count every unit when the same product is added concurrently',
    {
      annotation: {
        type: 'issue',
        description:
          'PRODUCT DEFECT: Concurrent adds of the same product return 500s and lose units.',
      },
    },
    () => {
      // Given Alice seeded a product
      // When she adds it five times at once
      // Then the quantity is the sum of all adds
      // POM: ../playwright-pom/tests/api/basket.api.spec.ts:311
    },
  );
});
