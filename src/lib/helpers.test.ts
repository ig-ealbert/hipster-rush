import { describe, it } from "@jest/globals";
import assert from "node:assert";
import {
  doesCardScore,
  isGreatestScore,
  refreshRemainingCards,
  removeCards,
  weightedCardChoice,
} from "./helpers";

describe("Helper functions", () => {
  it("Refreshes remaining cards", () => {
    const refreshedHands = refreshRemainingCards();
    assert.deepStrictEqual(refreshedHands, [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ]);
  });

  it("Uses weights to not entirely randomly select a card", () => {
    const notQuiteRandomCard = weightedCardChoice([1, 2, 3, 4, 5]);
    assert.ok(notQuiteRandomCard !== -1);
  });

  it("Scores a card when none others match it", () => {
    const didScore = doesCardScore(4, [1, 2, 3, 4]);
    assert.strictEqual(didScore, true);
  });

  it("Does not score a card when others played the same card", () => {
    const didScore = doesCardScore(4, [4, 2, 3, 4]);
    assert.strictEqual(didScore, false);
  });

  it("Finds a winner", () => {
    const isWinner = isGreatestScore(52, [52, 51, 48, 30]);
    assert.strictEqual(isWinner, true);
  });

  it("Does not find a winner if there is a tie", () => {
    const isWinner = isGreatestScore(52, [52, 52, 48, 30]);
    assert.strictEqual(isWinner, false);
  });

  it("Does not find a winner if there is a higher score above threshold", () => {
    const isWinner = isGreatestScore(52, [52, 53, 48, 30]);
    assert.strictEqual(isWinner, false);
  });

  it("Removes played cards", () => {
    const newHands = removeCards([4, 4, 4, 4], refreshRemainingCards());
    const expected = new Array(4).fill([1, 2, 3, 5]);
    assert.deepStrictEqual(newHands, expected);
  });
});
