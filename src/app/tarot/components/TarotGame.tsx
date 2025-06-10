"use client";
import React, { useState } from "react";

import Reading from "@/app/tarot/components/Reading";
import ShuffledDeck from "@/app/tarot/components/ShuffledDeck";
import { TarotCardData } from "../models";
import { TAROT_DECK } from "../utils/cards";


function shuffleDeck(deck: TarotCardData[]): TarotCardData[] {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface SelectedCard extends TarotCardData {
  idx: number;
  reversed: boolean;
}

export default function TarotGame() {
  const [numCards, setNumCards] = useState<number>(3);
  // Deck state is now managed by ShuffledDeck
  // const [shuffledDeck, setShuffledDeck] = useState<TarotCardData[]>([]);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const startGame = () => {
    setSelectedCards([]);
    setGameStarted(true);
  };

  // Selection now handled by ShuffledDeck
  const handleSelectCard = (card: SelectedCard) => {
    setSelectedCards((prev) => [...prev, card]);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-gray-700 shadow-2xl mt-8">
      {/* Subtle background SVG (planet or tarot motif) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none hidden md:block">
        <img src="/planets/astro.svg" alt="Background" className="object-cover w-full h-full scale-200" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-purple-500">
        Tarot Reading
      </h1>
      {!gameStarted && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <label className="text-lg">How many cards for your reading?</label>
          <select
            className="border rounded px-2 py-1"
            value={numCards}
            onChange={(e) => setNumCards(Number(e.target.value))}
          >
            {[1, 3, 5, 7, 10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <button
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all font-semibold"
            onClick={startGame}
          >
            Shuffle & Start
          </button>
        </div>
      )}
      {gameStarted && (
        <>
          <div className="mb-4 text-center mt-2">
            <span className="font-semibold">Select {numCards} card{numCards > 1 ? "s" : ""}:</span>
          </div>
          {/* Shuffled Deck at the top */}
          <div className="flex justify-center">
            <ShuffledDeck
              numCards={numCards}
              selectedCards={selectedCards}
              onSelectCard={handleSelectCard}
            />
          </div>
          {/* Reading component below the deck, showing selected cards as a small horizontal row */}
          {selectedCards.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Reading selectedCards={selectedCards} />
            </div>
          )}
          {selectedCards.length === numCards && (
            <button
              className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all font-semibold mx-auto block"
              onClick={() => setGameStarted(false)}
            >
              New Reading
            </button>
          )}
        </>
      )}
    </div>
  );
}
