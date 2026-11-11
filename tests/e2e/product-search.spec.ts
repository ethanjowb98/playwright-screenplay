// Product search UI: SRCH-E2E-* in docs/TEST_CASES.md#product-search-ui
// TODO(M6): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Product search UI', { tag: [TAGS.e2e] }, () => {
  test.fixme(
    'SRCH-E2E-01 should show only the matching product when searching by its name',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has two seeded products
      // When she searches for one by its unique name
      // Then only that one is shown
      // POM: ../playwright-pom/tests/e2e/product-search.spec.ts:52
    },
  );

  test.fixme('SRCH-E2E-02 should find the product when searching by a detail value', () => {
    // Given Alice has a product with a unique detail value
    // When she searches for that value
    // Then the product is shown
    // POM: ../playwright-pom/tests/e2e/product-search.spec.ts:67
  });

  test.fixme('SRCH-E2E-03 should show the empty state when nothing matches the search', () => {
    // Given Alice is on the market
    // When she searches for text no product has
    // Then the empty state is shown
    // POM: ../playwright-pom/tests/e2e/product-search.spec.ts:82
  });

  test.fixme('SRCH-E2E-04 should list products in name order when sorted', () => {
    // Given Alice has seeded products with known names
    // When she sorts asc or desc
    // Then her products appear in that order
    // Cases (one test each, from a table): asc, desc
    // POM: ../playwright-pom/tests/e2e/product-search.spec.ts:97
  });

  test.fixme('SRCH-E2E-05 should show the match and hide the decoy when filtering', () => {
    // Given Alice has a matching product and a decoy
    // When she applies the filter
    // Then the match is shown and the decoy hidden
    // Cases (one test each, from a table): category, temperature zone, weighted, sold each
    // POM: ../playwright-pom/tests/e2e/product-search.spec.ts:117
  });

  test.fixme('SRCH-E2E-06 should show products of every checked category when several categories are checked', () => {
    // Given Alice has products in two categories
    // When she checks both
    // Then both are shown
    // POM: ../playwright-pom/tests/e2e/product-search.spec.ts:137
  });

  test.fixme('SRCH-E2E-07 should show every product again when the filters are cleared', () => {
    // Given Alice filtered the grid
    // When she clears the filters
    // Then the decoy is shown again
    // POM: ../playwright-pom/tests/e2e/product-search.spec.ts:158
  });
});
