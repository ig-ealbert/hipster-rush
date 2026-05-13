"use client";

import React from "react";
import styles from "./page.module.css";
import { WIN_THRESHOLD } from "@/lib/constants";
import Card from "./components/card";
import {
  doesCardScore,
  isGreatestScore,
  refreshRemainingCards,
  removeCards,
  weightedCardChoice,
} from "@/lib/helpers";

export default function Home() {
  const [scores, setScores] = React.useState<number[]>([0, 0, 0, 0]);

  const [activeCards, setActiveCards] = React.useState<number[]>([0, 0, 0, 0]);

  const [remainingCards, setRemainingCards] = React.useState<number[][]>(
    refreshRemainingCards(),
  );
  React.useEffect(refillIfNoCardsAvailable, [remainingCards]);

  const [isScoring, setIsScoring] = React.useState<boolean>(false);

  const [message, setMessage] = React.useState<string>("");

  React.useEffect(initialize, []);

  function initialize() {
    setScores([0, 0, 0, 0]);
    setActiveCards([0, 0, 0, 0]);
    setRemainingCards(refreshRemainingCards());
    setIsScoring(false);
    setMessage("");
  }

  function refillIfNoCardsAvailable() {
    if (remainingCards[0].length === 0) {
      setRemainingCards(refreshRemainingCards());
    }
  }

  function handleCardSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedCard = parseInt(e.currentTarget.value);
    if (selectedCard !== 0) {
      const newActiveCards = activeCards.slice();
      newActiveCards[0] = selectedCard;
      setActiveCards(newActiveCards);
      setTimeout(() => takeAiTurn(selectedCard), 2 * 1000);
    }
  }

  function takeAiTurn(playerCard: number) {
    const allCards = aiChooseCards(playerCard);
    setIsScoring(true);
    setTimeout(() => scoreHand(allCards), 2 * 1000);
  }

  function aiChooseCards(playerCard: number) {
    const newActiveCards = [playerCard, 0, 0, 0];
    for (let player = 1; player < 4; player++) {
      newActiveCards[player] = weightedCardChoice(remainingCards[player]);
    }
    setActiveCards(newActiveCards);
    return newActiveCards;
  }

  function scoreHand(allCards: number[]) {
    const newScores = scores.slice();
    for (let player = 0; player < 4; player++) {
      if (doesCardScore(allCards[player], allCards)) {
        newScores[player] += allCards[player];
      }
    }
    setScores(newScores);
    checkForWin(newScores);
    setIsScoring(false);
    removePlayedCards(allCards);
    setActiveCards([0, 0, 0, 0]);
  }

  function removePlayedCards(playedCards: number[]) {
    const newRemainingCards = removeCards(playedCards, remainingCards);
    setRemainingCards(newRemainingCards);
    return newRemainingCards;
  }

  function checkForWin(scores: number[]) {
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] >= WIN_THRESHOLD) {
        if (isGreatestScore(scores[i], scores)) {
          const playerName = i === 0 ? "You" : `Player ${i + 1}`;
          setMessage(`${playerName} won!`);
          return;
        } else {
          setMessage(`Keep playing until one player breaks the tie!`);
        }
      }
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>HIPSTER RUSH</h1>
        <table id="gameBoard">
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>Player 3 - {scores[2]} points</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="cardHolder">
                <Card value={activeCards[2]} />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Player 2 - {scores[1]} points</td>
              <td className="cardHolder">
                <Card value={activeCards[1]} />
              </td>
              <td></td>
              <td className="cardHolder">
                <Card value={activeCards[3]} />
              </td>
              <td>Player 4 - {scores[3]} points</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="cardHolder">
                {isScoring && <Card value={activeCards[0]} />}
                {!isScoring && (
                  <select
                    defaultValue={0}
                    onChange={handleCardSelect}
                    disabled={message.includes("won")}
                  >
                    <option value={0}>Choose a card to play</option>
                    {remainingCards[0].map((card) => (
                      <option key={card} value={card}>
                        {card}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>You - {scores[0]} points</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div id="message">{message}</div>
        <button onClick={initialize}>RESET</button>
      </main>
    </div>
  );
}
