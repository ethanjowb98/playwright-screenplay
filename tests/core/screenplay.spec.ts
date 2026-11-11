// Screenplay core: CORE-* in docs/TEST_CASES.md#screenplay-core
// TODO(M1): implement each case in Screenplay style and turn `test.fixme` into `test`.
// Cases marked PRODUCT DEFECT keep the correct assertion and stay `test.fixme` once written.
import { test } from '@playwright/test';

test.describe('Screenplay core', () => {
  test.fixme('CORE-01 should perform activities in the order they are given', () => {
    // Given an actor and three activities that record their names
    // When she attempts to perform them
    // Then they ran in that order
  });

  test.fixme('CORE-02 should name the actor and the ability when an ability is missing', () => {
    // Given Alice, who has no abilities
    // When she uses an Interaction that needs CallAnApi
    // Then the error says "Alice can't CallAnApi" (or similar)
  });

  test.fixme('CORE-03 should answer a question through an ability', () => {
    // Given Alice can use a fake ability that holds the value 42
    // When she asks a question that reads it
    // Then the answer is 42
  });

  test.fixme('CORE-04 should recall what the actor remembered and fail clearly on a missing note', () => {
    // Given Alice remembered `orderNumber`
    // When she recalls `orderNumber` and then `unknown`
    // Then the first returns the value, the second throws naming the key
  });

  test.fixme('CORE-05 should show nested tasks as nested steps', () => {
    // Given a Task made of a Task made of an Interaction
    // When Alice attempts it
    // Then the HTML report shows three nested steps titled in Alice's voice
  });

  test.fixme('CORE-06 should discard every discardable ability when the actor is dismissed', () => {
    // Given Alice has two Discardable fake abilities
    // When she is dismissed
    // Then both were discarded, even when the first one throws
  });
});
