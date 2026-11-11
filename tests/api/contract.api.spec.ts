// API contract: CON-API-* in docs/TEST_CASES.md#api-contract
// TODO(M4): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('API contract', { tag: [TAGS.api] }, () => {
  test.fixme('CON-API-01 should serve the product catalogue at the documented groceries path when it is called', () => {
    // Given Alice is authenticated
    // When she calls GET /api/groceries
    // Then she gets the catalogue
    // POM: ../playwright-pom/tests/api/contract.api.spec.ts:39
  });

  test.fixme(
    'CON-API-02 should add a basket item at the documented basket items path when it is called',
    {
      tag: [TAGS.stateful],
      annotation: {
        type: 'issue',
        description:
          'PRODUCT DEFECT: The documented Swagger path is not served (the UI uses another path).',
      },
    },
    () => {
      // Given Alice seeded a product
      // When she calls POST /api/basket/items
      // Then the item is in the basket
      // POM: ../playwright-pom/tests/api/contract.api.spec.ts:52
    },
  );

  test.fixme(
    'CON-API-03 should change the basket when the documented basket paths are used',
    {
      tag: [TAGS.stateful],
      annotation: {
        type: 'issue',
        description:
          'PRODUCT DEFECT: The documented Swagger path is not served (the UI uses another path).',
      },
    },
    () => {
      // Given Alice has an item in her basket
      // When she uses the documented path
      // Then the basket changes as documented
      // Cases (one test each, from a table): update item, remove item, clear basket
      // POM: ../playwright-pom/tests/api/contract.api.spec.ts:73
    },
  );
});
