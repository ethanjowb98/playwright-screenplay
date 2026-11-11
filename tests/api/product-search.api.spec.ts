// Product search API: SRCH-API-* in docs/TEST_CASES.md#product-search-api
// TODO(M4): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Product search API', { tag: [TAGS.api] }, () => {
  test.fixme('SRCH-API-01 should list products in name order when sorted', () => {
    // Given Alice seeded products with known names
    // When she lists the catalogue with sort=asc or desc
    // Then her products appear in that name order
    // Cases (one test each, from a table): asc, desc
    // POM: ../playwright-pom/tests/api/product-search.api.spec.ts:82
  });

  test.fixme('SRCH-API-02 should return only matching products when filtering', () => {
    // Given Alice seeded a matching product and a decoy
    // When she filters
    // Then the match is returned, the decoy is not, and every row matches the filter
    // Cases (one test each, from a table): category, temperature zone (Dry, Frozen, Chilled, Room Temperature), weighted, sold each, category + zone + weighted combined
    // POM: ../playwright-pom/tests/api/product-search.api.spec.ts:102
  });

  test.fixme('SRCH-API-03 should return products of every listed category when several categories are filtered', () => {
    // Given Alice seeded products in two categories
    // When she filters by both
    // Then both are returned
    // POM: ../playwright-pom/tests/api/product-search.api.spec.ts:122
  });

  test.fixme('SRCH-API-04 should reject the filter with 400 when a value is invalid', () => {
    // Given Alice is authenticated
    // When she filters with an invalid value
    // Then the response is 400
    // Cases (one test each, from a table): unknown temperature zone, weighted not true/false
    // POM: ../playwright-pom/tests/api/product-search.api.spec.ts:144
  });

  test.fixme(
    'SRCH-API-05 should return the same product fields as the catalogue when filtering',
    {
      annotation: {
        type: 'issue',
        description:
          'PRODUCT DEFECT: `GET /api/products/filter` rows use `name`, every other endpoint `product_name`.',
      },
    },
    () => {
      // Given Alice seeded a product
      // When she filters for it
      // Then the row has `product_name` like the catalogue
      // POM: ../playwright-pom/tests/api/product-search.api.spec.ts:155
    },
  );
});
