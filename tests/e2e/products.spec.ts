// Products UI: PRD-E2E-* in docs/TEST_CASES.md#products-ui
// TODO(M6): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Products UI', { tag: [TAGS.e2e] }, () => {
  test.fixme(
    'PRD-E2E-01 should create the product when the Add Product form is valid',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice is on the market
      // When she adds a product through the form
      // Then its card shows name, price and stock
      // POM: ../playwright-pom/tests/e2e/products.spec.ts:13
    },
  );

  test.fixme('PRD-E2E-02 should keep the modal open and create nothing when the category is missing', () => {
    // Given Alice opened Add Product
    // When she saves without a category
    // Then the modal stays open and no product exists by that name
    // POM: ../playwright-pom/tests/e2e/products.spec.ts:40
  });

  test.fixme('PRD-E2E-03 should create nothing when the Add Product modal is cancelled', () => {
    // Given Alice filled in Add Product
    // When she cancels
    // Then no product exists by that name
    // POM: ../playwright-pom/tests/e2e/products.spec.ts:61
  });

  test.fixme('PRD-E2E-04 should keep the product unchanged when the Edit Product modal is cancelled', () => {
    // Given Alice has a seeded product
    // When she edits it and cancels
    // Then the card and the API show the old values
    // POM: ../playwright-pom/tests/e2e/products.spec.ts:80
  });

  test.fixme(
    'PRD-E2E-05 should save the new price and stock when the product is edited',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a seeded product
      // When she edits price and stock and saves
      // Then the card shows the new values
      // POM: ../playwright-pom/tests/e2e/products.spec.ts:101
    },
  );

  test.fixme('PRD-E2E-06 should keep the modal open and the product unchanged when the name is cleared on edit', () => {
    // Given Alice has a seeded product
    // When she clears its name and saves
    // Then the modal stays open and the product is unchanged
    // POM: ../playwright-pom/tests/e2e/products.spec.ts:122
  });

  test.fixme('PRD-E2E-07 should keep the modal open and the product unchanged when the edited price is negative', () => {
    // Given Alice has a seeded product
    // When she sets price -1 and saves
    // Then the modal stays open and the product is unchanged
    // POM: ../playwright-pom/tests/e2e/products.spec.ts:143
  });

  test.fixme(
    'PRD-E2E-08 should show an error and keep the product unchanged when the edited price is zero',
    {
      annotation: {
        type: 'issue',
        description: 'PRODUCT DEFECT: A price of 0 or below is accepted on update.',
      },
    },
    () => {
      // Given Alice has a seeded product
      // When she sets price 0 and saves
      // Then an error shows and the product is unchanged
      // POM: ../playwright-pom/tests/e2e/products.spec.ts:163
    },
  );

  test.fixme(
    'PRD-E2E-09 should remove the product when the delete is confirmed',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a seeded product
      // When she deletes it and confirms
      // Then its card is gone
      // POM: ../playwright-pom/tests/e2e/products.spec.ts:191
    },
  );

  test.fixme('PRD-E2E-10 should keep the product when the delete is dismissed', () => {
    // Given Alice has a seeded product
    // When she deletes it and dismisses the dialog
    // Then its card is still there
    // POM: ../playwright-pom/tests/e2e/products.spec.ts:207
  });

  test.fixme('PRD-E2E-11 should show every field of the product when its details are viewed', () => {
    // Given Alice has a seeded product with details
    // When she opens View Details
    // Then every field is shown
    // POM: ../playwright-pom/tests/e2e/products.spec.ts:223
  });

  test.fixme('PRD-E2E-12 should show a disabled Out of Stock button and no ADD when the stock is zero', () => {
    // Given Alice has a seeded product with stock 0
    // When she looks at its card
    // Then Out of Stock is disabled and ADD is absent
    // POM: ../playwright-pom/tests/e2e/products.spec.ts:243
  });

  test.fixme(
    'PRD-E2E-13 should render the product name as plain text when it contains markup',
    {
      annotation: {
        type: 'issue',
        description: 'PRODUCT DEFECT: Product names are rendered unescaped (stored XSS).',
      },
    },
    () => {
      // Given Alice has a product named `<b>bold</b>`
      // When she looks at its card
      // Then the name is shown as literal text
      // POM: ../playwright-pom/tests/e2e/products.spec.ts:256
    },
  );
});
