// Orders API: ORD-API-* in docs/TEST_CASES.md#orders-api
// TODO(M4): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Orders API', { tag: [TAGS.api, TAGS.stateful] }, () => {
  test.fixme(
    'ORD-API-01 should place a pending order from the basket when the basket has items',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a seeded basket
      // When she places an order
      // Then the order is pending, holds the basket lines and has an order number
      // POM: ../playwright-pom/tests/api/orders.api.spec.ts:36
    },
  );

  test.fixme('ORD-API-02 should reject the order with 400 and create nothing when the basket is empty', () => {
    // Given Alice's basket is empty
    // When she places an order
    // Then the response is 400 and her order list is unchanged
    // POM: ../playwright-pom/tests/api/orders.api.spec.ts:60
  });

  test.fixme(
    'ORD-API-03 should return the order with its items when it is fetched by id',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice placed an order
      // When she fetches it by id
      // Then it has its items with product ids
      // POM: ../playwright-pom/tests/api/orders.api.spec.ts:76
    },
  );

  test.fixme('ORD-API-04 should list the order when it has been placed', () => {
    // Given Alice placed an order
    // When she lists her orders
    // Then the order is in the list
    // POM: ../playwright-pom/tests/api/orders.api.spec.ts:92
  });

  test.fixme('ORD-API-05 should move the order to the next status when the transition is allowed', () => {
    // Given Alice has an order in the starting status
    // When she updates the status
    // Then the order has the new status
    // Cases (one test each, from a table): pending→processing, processing→shipped, shipped→delivered, pending→cancelled, processing→cancelled, shipped→cancelled
    // POM: ../playwright-pom/tests/api/orders.api.spec.ts:110
  });

  test.fixme('ORD-API-06 should reject every status change with 400 when the order is final', () => {
    // Given Alice has a delivered or cancelled order
    // When she tries every other status
    // Then each answers 400 and the status is unchanged
    // Cases (one test each, from a table): delivered, cancelled
    // POM: ../playwright-pom/tests/api/orders.api.spec.ts:126
  });

  test.fixme('ORD-API-07 should save the notes when new notes are sent', () => {
    // Given Alice placed an order
    // When she updates its notes
    // Then the notes are saved
    // POM: ../playwright-pom/tests/api/orders.api.spec.ts:144
  });

  test.fixme('ORD-API-08 should reject the update with 400 when the status is not a known status', () => {
    // Given Alice placed an order
    // When she sets status "teleported"
    // Then the response is 400
    // POM: ../playwright-pom/tests/api/orders.api.spec.ts:160
  });

  test.fixme('ORD-API-09 should reject the update with 400 when no fields are sent', () => {
    // Given Alice placed an order
    // When she sends an empty update
    // Then the response is 400
    // POM: ../playwright-pom/tests/api/orders.api.spec.ts:175
  });

  test.fixme('ORD-API-10 should remove the order when it is deleted', { tag: [TAGS.smoke] }, () => {
    // Given Alice placed an order
    // When she deletes it
    // Then fetching it answers 404
    // POM: ../playwright-pom/tests/api/orders.api.spec.ts:188
  });

  test.fixme('ORD-API-11 should return 404 when an unknown order is used', () => {
    // Given Alice has an unknown order id
    // When she fetches, updates or deletes it
    // Then the response is 404
    // Cases (one test each, from a table): fetched, updated, deleted
    // POM: ../playwright-pom/tests/api/orders.api.spec.ts:203
  });
});
