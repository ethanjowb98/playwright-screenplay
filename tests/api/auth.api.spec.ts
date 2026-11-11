// Auth API: AUTH-API-* in docs/TEST_CASES.md#auth-api
// TODO(M2/M4): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Auth API', { tag: [TAGS.api] }, () => {
  test.fixme(
    'AUTH-API-01 should return the account api key in the profile when the session is valid',
    { tag: [TAGS.smoke] },
    () => {
      // Given Alice has a valid session (setup project)
      // When she asks for her profile
      // Then it shows her username and an api key
      // POM: ../playwright-pom/tests/api/auth.api.spec.ts:100
    },
  );

  test.fixme(
    'AUTH-API-02 should reject the login with 401 when the password is wrong',
    { tag: [TAGS.login] },
    () => {
      // Given Mallory knows Alice's username
      // When she logs in with a wrong password
      // Then the response is 401 with an error
      // POM: ../playwright-pom/tests/api/auth.api.spec.ts:119
    },
  );

  test.fixme(
    'AUTH-API-03 should reject the login with 400 when the password is missing',
    { tag: [TAGS.login] },
    () => {
      // Given Mallory knows Alice's username
      // When she logs in without a password
      // Then the response is 400
      // POM: ../playwright-pom/tests/api/auth.api.spec.ts:119
    },
  );

  test.fixme('AUTH-API-04 should reject the profile request with 401 when there is no session', () => {
    // Given Guest has no session cookie
    // When she asks for the profile
    // Then the response is 401
    // POM: ../playwright-pom/tests/api/auth.api.spec.ts:131
  });

  test.fixme('AUTH-API-05 should return 401 on every api-key endpoint when the key is missing or invalid', () => {
    // Given Mallory can call the API with no key, or with an invalid one
    // When she calls the endpoint
    // Then the response is 401
    // Cases (one test each, from a table): missing key / invalid key × list products, create product, update product, delete product, list orders, read basket
    // POM: ../playwright-pom/tests/api/auth.api.spec.ts:71
  });

  test.fixme(
    'AUTH-API-06 should return 401 on account-wide calls when the key is missing or invalid',
    { tag: [TAGS.stateful] },
    () => {
      // Given Mallory can call the API with no key, or with an invalid one
      // When she calls the endpoint
      // Then the response is 401 and Alice's basket and orders are unchanged
      // Cases (one test each, from a table): missing key / invalid key × add basket item, update basket item, remove basket item, clear basket, place order, update order, delete order
      // POM: ../playwright-pom/tests/api/auth.api.spec.ts:71
    },
  );
});
