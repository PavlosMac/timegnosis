// import React, { useEffect, useState } from "react";
// import { TarotCardData } from "../models";
// import { TAROT_DECK } from "../utils/cards";

// interface SelectedCard extends TarotCardData {
//   idx: number;
//   reversed: boolean;
// }

// interface ShuffledDeckProps {
//   numCards: number;
//   selectedCards: SelectedCard[];
//   onSelectCard: (card: SelectedCard) => void;
// }

// const shuffleDeck = (deck: TarotCardData[]): TarotCardData[] => {
//   const arr = [...deck];
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// };

// export default function ShuffledDeck({ numCards, selectedCards, onSelectCard }: ShuffledDeckProps) {
//   const [shuffledDeck, setShuffledDeck] = useState<TarotCardData[]>([]);

//   useEffect(() => {
//     setShuffledDeck(shuffleDeck(TAROT_DECK));
//   }, [numCards]);

//   const handleSelect = (idx: number) => {
//     if (selectedCards.length >= numCards) return;
//     if (selectedCards.find((c) => c.idx === idx)) return;
//     const reversed = Math.random() < 0.5;
//     onSelectCard({ ...shuffledDeck[idx], idx, reversed });
//   };

//   return (
//     <div className="grid grid-cols-6 sm:grid-cols-13 gap-1 overflow-x-auto">
//       {shuffledDeck.slice(0, 78).map((card, idx) => {
//         const isSelected = selectedCards.find((c) => c.idx === idx);
//         return (
//           <button
//             key={idx}
//             className={`w-12 h-20 min-w-[48px] min-h-[80px] border border-gray-700 rounded shadow bg-gray-800/70 flex items-center justify-center relative transition-transform duration-200 text-lg ${isSelected ? "opacity-30 grayscale" : "hover:scale-105 hover:border-yellow-400"}`}
//             onClick={() => handleSelect(idx)}
//             disabled={!!isSelected || selectedCards.length >= numCards}
//             aria-label="Pick card"
//           >
//             {/* Optionally use TarotCard here for visual consistency */}
//             <span className="text-2xl">🃏</span>
//           </button>
//         );
//       })}
//     </div>
//   );
// };


import React, { useEffect, useState } from "react";
import { TarotCardData } from "../models";
import { TAROT_DECK } from "../utils/cards";
import { secureShuffleArray, getSecureRandomBoolean } from "@/lib/crypto-random";

interface SelectedCard extends TarotCardData {
  idx: number;
  reversed: boolean;
}

interface ShuffledDeckProps {
  numCards: number;
  selectedCards: SelectedCard[];
  onSelectCard: (card: SelectedCard) => void;
}

export default function ShuffledDeck({ numCards, selectedCards, onSelectCard }: ShuffledDeckProps) {
  const [shuffledDeck, setShuffledDeck] = useState<TarotCardData[]>([]);

  useEffect(() => {
    setShuffledDeck(secureShuffleArray(TAROT_DECK));
  }, [numCards]);

  const handleSelect = (idx: number) => {
    if (selectedCards.length >= numCards) return;
    if (selectedCards.find((c) => c.idx === idx)) return;
    const reversed = getSecureRandomBoolean();
    onSelectCard({ ...shuffledDeck[idx], idx, reversed });
  };

  return (
    <div className="w-full overflow-x-auto pb-4 px-2">
      <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-13 gap-2 justify-items-center min-w-fit mx-auto">
        {shuffledDeck.slice(0, 78).map((card, idx) => {
          const isSelected = selectedCards.find((c) => c.idx === idx);
          return (
            <button
              key={idx}
              className={`relative group ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(idx)}
              disabled={!!isSelected || selectedCards.length >= numCards}
              aria-label={`Pick card ${idx + 1}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Card glow on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4af37] via-[#8a2be2] to-[#d4af37] 
                              rounded-lg opacity-0 group-hover:opacity-70 blur transition-all duration-300" />
              
              {/* Card face */}
              <div className="relative w-14 h-24 sm:w-16 sm:h-28 bg-gradient-to-br from-[#1a0033] to-[#2d1b4e] 
                              rounded-lg border-2 border-[#d4af37]/60 shadow-xl overflow-hidden
                              transition-all duration-300 group-hover:scale-110 group-hover:border-[#d4af37]">
                
                {/* Subtle border pattern */}
                <div className="absolute inset-0">
                  {/* Top/bottom decorative lines */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
                </div>
                
                {/* Central Ankh */}
                <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity">
                  <svg className="w-10 h-16 sm:w-12 sm:h-20" viewBox="0 0 40 64" fill="none">
                    {/* Ankh loop */}
                    <circle cx="20" cy="14" r="10" stroke="rgba(212,175,55,0.7)" strokeWidth="2.5" fill="none"/>
                    {/* Vertical line */}
                    <line x1="20" y1="24" x2="20" y2="60" stroke="rgba(212,175,55,0.7)" strokeWidth="3"/>
                    {/* Horizontal crossbar */}
                    <line x1="6" y1="32" x2="34" y2="32" stroke="rgba(212,175,55,0.7)" strokeWidth="3"/>
                    {/* Inner glow */}
                    <circle cx="20" cy="14" r="10" stroke="rgba(212,175,55,0.2)" strokeWidth="1" fill="rgba(212,175,55,0.05)"/>
                  </svg>
                </div>
                
                {/* Corner stars */}
                <div className="absolute top-2 left-2 text-[#d4af37]/40 text-xs">✦</div>
                <div className="absolute top-2 right-2 text-[#d4af37]/40 text-xs">✦</div>
                <div className="absolute bottom-2 left-2 text-[#d4af37]/40 text-xs">✦</div>
                <div className="absolute bottom-2 right-2 text-[#d4af37]/40 text-xs">✦</div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#d4af37]/10 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
