// Products API: PRD-API-* in docs/TEST_CASES.md#products-api
// TODO(M2/M4): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Products API', { tag: [TAGS.api] }, () => {
  test.fixme(
    'PRD-API-01 should create a product when the payload is valid',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a valid product payload (factory)
      // When she sends POST /api/products
      // Then the response is 201 and the product matches the payload
      // POM: ../playwright-pom/tests/api/products.api.spec.ts:55
    },
  );

  test.fixme('PRD-API-02 should store the temperature zone and weighted flag when they are provided', () => {
    // Given Alice has a payload with a zone and a weighted flag
    // When she creates the product
    // Then both values are stored
    // Cases (one test each, from a table): Chilled + weighted, Dry + weighted, Frozen + not weighted, Room Temperature + not weighted
    // POM: ../playwright-pom/tests/api/products.api.spec.ts:75
  });

  test.fixme('PRD-API-03 should reject the product with 400 when the payload is invalid', () => {
    // Given Alice has a payload with one invalid field
    // When she sends POST /api/products
    // Then the response is 400 with an error and nothing was created
    // Cases (one test each, from a table): category missing, price missing, price not a number, product_name empty, product_name missing, stock negative, stock not a number, stock not an integer, temperature_zone unknown
    // POM: ../playwright-pom/tests/api/products.api.spec.ts:93
  });

  test.fixme(
    'PRD-API-04 should reject the product with 400 when price is negative',
    {
      annotation: {
        type: 'issue',
        description: 'PRODUCT DEFECT: A negative price is accepted on create (201).',
      },
    },
    () => {
      // Given Alice has a payload with price -1
      // When she sends POST /api/products
      // Then the response is 400
      // POM: ../playwright-pom/tests/api/products.api.spec.ts:106
    },
  );

  test.fixme(
    'PRD-API-05 should return the product when it is fetched by id',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice seeded a product
      // When she fetches it by id
      // Then she gets the same product
      // POM: ../playwright-pom/tests/api/products.api.spec.ts:128
    },
  );

  test.fixme('PRD-API-06 should include the product in the catalogue when it exists', () => {
    // Given Alice seeded a product
    // When she lists the catalogue
    // Then the product is in it
    // POM: ../playwright-pom/tests/api/products.api.spec.ts:141
  });

  test.fixme(
    'PRD-API-07 should change only the sent fields when a partial payload is sent',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice seeded a product
      // When she updates only its price
      // Then the price changed and every other field is the same
      // POM: ../playwright-pom/tests/api/products.api.spec.ts:156
    },
  );

  test.fixme('PRD-API-08 should reject the update with 400 and keep the product when a field is invalid', () => {
    // Given Alice seeded a product
    // When she updates it with one invalid field
    // Then the response is 400 and the product is unchanged
    // Cases (one test each, from a table): price not a number, stock negative, stock not a number, stock not an integer
    // POM: ../playwright-pom/tests/api/products.api.spec.ts:173
  });

  test.fixme(
    'PRD-API-09 should reject the update with 400 and keep the product when price is zero or negative',
    {
      annotation: {
        type: 'issue',
        description: 'PRODUCT DEFECT: A price of 0 or below is accepted on update.',
      },
    },
    () => {
      // Given Alice seeded a product
      // When she updates its price to 0 or -1
      // Then the response is 400 and the product is unchanged
      // Cases (one test each, from a table): zero, negative
      // POM: ../playwright-pom/tests/api/products.api.spec.ts:190
    },
  );

  test.fixme(
    'PRD-API-10 should remove the product when it is deleted',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice seeded a product
      // When she deletes it
      // Then fetching it answers 404
      // POM: ../playwright-pom/tests/api/products.api.spec.ts:214
    },
  );

  test.fixme('PRD-API-11 should return 404 when an unknown product is used', () => {
    // Given Alice has an id that never exists (TEST_DATA.unknownId)
    // When she fetches, updates or deletes it
    // Then the response is 404
    // Cases (one test each, from a table): fetched, updated, deleted
    // POM: ../playwright-pom/tests/api/products.api.spec.ts:230
  });
});
