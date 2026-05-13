import { thresholds } from "@/lib/constants";

export function refreshRemainingCards() {
  return new Array(4).fill([1, 2, 3, 4, 5]);
}

export function weightedCardChoice(cards: number[]) {
  const thresholds = lookupThresholds(cards.length);
  const randomNumber = Math.ceil(Math.random() * 100);
  for (let i = 0; i < cards.length; i++) {
    if (randomNumber <= thresholds[i]) {
      return cards[i];
    }
  }
  return -1; // This should not happen
}

function lookupThresholds(numCards: number) {
  return thresholds[numCards];
}

export function doesCardScore(card: number, allCards: number[]) {
  return allCards.filter((c) => c === card).length === 1;
}

export function isGreatestScore(candidate: number, allScores: number[]) {
  const aboveOrTiedCandidate = allScores.filter((a) => a >= candidate);
  return aboveOrTiedCandidate.length === 1;
}

export function removeCards(playedCards: number[], remainingCards: number[][]) {
  // because jest doesn't like structuredClone
  const newRemainingCards = [
    remainingCards[0].slice(),
    remainingCards[1].slice(),
    remainingCards[2].slice(),
    remainingCards[3].slice(),
  ];
  for (let i = 0; i < playedCards.length; i++) {
    const playedCard = playedCards[i];
    const index = newRemainingCards[i].indexOf(playedCard);
    newRemainingCards[i].splice(index, 1);
  }
  return newRemainingCards;
}
