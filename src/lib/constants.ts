/* 
  This indicates how likely it is for a card to be played
  A random number from 1-100 will be chosen
  These are the ranges that card play choices fall into
  Ex. with 5 cards, the highest card will be played for 71-100
  Since the remaining cards are sorted lowest to highest,
  it will have a slightly higher chance of playing higher cards
*/
export const thresholds: Record<number, number[]> = {
  5: [10, 25, 45, 70, 100],
  4: [15, 35, 60, 100],
  3: [20, 55, 100],
  2: [40, 100],
  1: [100],
};

export const WIN_THRESHOLD = 50;

export const cardBackImage = "url(./CardBack.png)";
