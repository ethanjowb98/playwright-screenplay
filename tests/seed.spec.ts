// Market seed: SEED-E2E-* in docs/TEST_CASES.md#market-seed
// TODO(M5): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Market seed', { tag: [TAGS.e2e] }, () => {
  test.fixme(
    'SEED-E2E-01 should open the market when the user is authenticated',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a session (storageState)
      // When she opens the market
      // Then her username is shown and the grid, basket and orders are rendered
      // POM: ../playwright-pom/tests/seed.spec.ts:8
    },
  );
});
