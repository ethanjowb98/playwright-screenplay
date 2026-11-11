// Login UI: LOGIN-E2E-* in docs/TEST_CASES.md#login-ui
// TODO(M5): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Once src/fixtures exists, import `test` and `expect` from '@fixtures' instead.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

import { TAGS } from '@config/constants';

test.describe('Login UI', { tag: [TAGS.e2e] }, () => {
  test.fixme(
    'LOGIN-E2E-01 should land on the profile and open the market when the credentials are valid',
    { tag: [TAGS.smoke, TAGS.login] },
    () => {
      // Given Alice is on the home page without a session
      // When she logs in with valid credentials
      // Then she lands on the profile and can open the market
      // POM: ../playwright-pom/tests/e2e/login.spec.ts:24
    },
  );

  test.fixme(
    'LOGIN-E2E-02 should show an error and stay on the home page when the password is wrong',
    { tag: [TAGS.login] },
    () => {
      // Given Mallory is on the home page
      // When she logs in with a wrong password
      // Then an error is shown and she stays on the home page
      // POM: ../playwright-pom/tests/e2e/login.spec.ts:39
    },
  );

  test.fixme('LOGIN-E2E-03 should block the submit and stay on the home page when the login form is empty', () => {
    // Given Guest opens the login form
    // When she submits it empty
    // Then the browser blocks it (validationMessage) and no request is sent
    // POM: ../playwright-pom/tests/e2e/login.spec.ts:54
  });

  test.fixme('LOGIN-E2E-04 should redirect to the home page when the market is opened without a session', () => {
    // Given Guest has no session
    // When she opens /market.html
    // Then she is redirected to the home page
    // POM: ../playwright-pom/tests/e2e/login.spec.ts:69
  });
});
