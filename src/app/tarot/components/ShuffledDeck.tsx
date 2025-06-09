import React, { useEffect, useState } from "react";
import { TarotCardData } from "../models";
import { TAROT_DECK } from "../utils/cards";

interface SelectedCard extends TarotCardData {
  idx: number;
  reversed: boolean;
}

interface ShuffledDeckProps {
  numCards: number;
  selectedCards: SelectedCard[];
  onSelectCard: (card: SelectedCard) => void;
}

const shuffleDeck = (deck: TarotCardData[]): TarotCardData[] => {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const ShuffledDeck: React.FC<ShuffledDeckProps> = ({ numCards, selectedCards, onSelectCard }) => {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCardData[]>([]);

  useEffect(() => {
    setShuffledDeck(shuffleDeck(TAROT_DECK));
  }, [numCards]);

  const handleSelect = (idx: number) => {
    if (selectedCards.length >= numCards) return;
    if (selectedCards.find((c) => c.idx === idx)) return;
    const reversed = Math.random() < 0.5;
    onSelectCard({ ...shuffledDeck[idx], idx, reversed });
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {shuffledDeck.slice(0, 12).map((card, idx) => {
        const isSelected = selectedCards.find((c) => c.idx === idx);
        return (
          <button
            key={idx}
            className={`w-36 h-[216px] min-w-[90px] min-h-[140px] border border-gray-700 rounded-lg shadow bg-gray-800/70 flex items-center justify-center relative transition-transform duration-200 ${isSelected ? "opacity-30 grayscale" : "hover:scale-105 hover:border-yellow-400"}`}
            onClick={() => handleSelect(idx)}
            disabled={!!isSelected || selectedCards.length >= numCards}
            aria-label="Pick card"
          >
            <span className="text-2xl">🃏</span>
          </button>
        );
      })}
    </div>
  );
};

export default ShuffledDeck;
