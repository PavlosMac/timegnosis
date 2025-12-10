// "use client";
// import React, { useState } from "react";

// import Reading from "@/app/tarot/components/Reading";
// import ShuffledDeck from "@/app/tarot/components/ShuffledDeck";
// import { TarotCardData } from "../models";

// interface SelectedCard extends TarotCardData {
//   idx: number;
//   reversed: boolean;
// }

// export default function TarotGame() {
//   const [numCards, setNumCards] = useState<number>(3);
//   // Deck state is now managed by ShuffledDeck
//   // const [shuffledDeck, setShuffledDeck] = useState<TarotCardData[]>([]);
//   const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
//   const [gameStarted, setGameStarted] = useState<boolean>(false);

//   const startGame = () => {
//     setSelectedCards([]);
//     setGameStarted(true);
//   };

//   // Selection now handled by ShuffledDeck
//   const handleSelectCard = (card: SelectedCard) => {
//     setSelectedCards((prev) => [...prev, card]);
//   };

//   return (
//     <div className="relative w-full mx-auto overflow-hidden bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-gray-700 shadow-2xl mt-8">
//       {/* Subtle background SVG (planet or tarot motif) */}
//       <div className="absolute inset-0 z-0 opacity-10 pointer-events-none select-none hidden md:block">
//         <img src="/planets/astro.svg" alt="Background" className="object-cover w-full h-full scale-200" />
//       </div>
//       <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-purple-500">
//         Tarot Reading
//       </h1>
//       {!gameStarted && (
//         <div className="flex flex-col items-center gap-4 mt-6">
//           <label className="text-lg">How many cards for your reading?</label>
//           <select
//             className="border rounded px-2 py-1"
//             value={numCards}
//             onChange={(e) => setNumCards(Number(e.target.value))}
//           >
//             {[1, 3, 5, 7, 10].map((n) => (
//               <option key={n} value={n}>{n}</option>
//             ))}
//           </select>
//           <button
//             className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all font-semibold"
//             onClick={startGame}
//           >
//             Shuffle & Start
//           </button>
//         </div>
//       )}
//       {gameStarted && (
//         <>
//           <div className="mb-4 text-center mt-2">
//             <span className="font-semibold">Select {numCards} card{numCards > 1 ? "s" : ""}:</span>
//           </div>
//           {/* Shuffled Deck at the top */}
//           <div className="flex justify-center">
//             <ShuffledDeck
//               numCards={numCards}
//               selectedCards={selectedCards}
//               onSelectCard={handleSelectCard}
//             />
//           </div>
//           {/* Reading component below the deck, showing selected cards as a small horizontal row */}
//           {selectedCards.length > 0 && (
//             <div className="mt-6 flex justify-center">
//               <Reading selectedCards={selectedCards} />
//             </div>
//           )}
//           {selectedCards.length === numCards && (
//             <button
//               className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-all font-semibold mx-auto block"
//               onClick={() => setGameStarted(false)}
//             >
//               New Reading
//             </button>
//           )}
//         </>
//       )}
//     </div>
//   );
// }


"use client";
import React, { useState } from "react";
import Reading from "@/app/tarot/components/Reading";
import ShuffledDeck from "@/app/tarot/components/ShuffledDeck";
import { TarotCardData } from "../models";

interface SelectedCard extends TarotCardData {
  idx: number;
  reversed: boolean;
}

export default function TarotGame() {
  const [numCards, setNumCards] = useState<number>(3);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const startGame = () => {
    setSelectedCards([]);
    setGameStarted(true);
  };

  const handleSelectCard = (card: SelectedCard) => {
    setSelectedCards((prev) => [...prev, card]);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl border-2 border-[#d4af37]/30 shadow-2xl"
         style={{
           background: 'linear-gradient(135deg, rgba(26,0,51,0.95) 0%, rgba(45,27,78,0.95) 100%)',
           backdropFilter: 'blur(10px)',
         }}>
      
      {/* Ornate corner decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#d4af37]/50 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#d4af37]/50 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-[#d4af37]/50 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#d4af37]/50 rounded-br-xl" />
      
      {/* Mystical glow effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
           style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15), transparent 70%)'
           }} />
      
      {/* Content */}
      <div className="relative z-10 p-6 sm:p-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-2 text-center text-[#d4af37] tracking-wider"
            style={{ fontFamily: "'Cinzel', serif", textShadow: '0 0 20px rgba(212,175,55,0.5)' }}>
          Tarot Reading
        </h1>
        
        <p className="text-center text-[#d4af37]/70 mb-8 text-sm sm:text-base tracking-wide"
           style={{ fontFamily: "'Crimson Pro', serif" }}>
          ✦ Unveil the Mysteries of Your Path ✦
        </p>
        
        {!gameStarted && (
          <div className="flex flex-col items-center gap-6 mt-8 py-8">
            <label className="text-xl text-[#e6d5b8] tracking-wide"
                   style={{ fontFamily: "'Crimson Pro', serif" }}>
              How many cards shall guide your reading?
            </label>
            
            <select
              className="border-2 border-[#d4af37]/50 rounded-lg px-6 py-3 bg-[#1a0033]/80 text-[#e6d5b8] text-lg backdrop-blur-sm
                         focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/30 transition-all cursor-pointer"
              style={{ fontFamily: "'Crimson Pro', serif" }}
              value={numCards}
              onChange={(e) => setNumCards(Number(e.target.value))}
            >
              {[1, 3, 5, 7, 10].map((n) => (
                <option key={n} value={n} className="bg-[#1a0033]">
                  {n} {n === 1 ? 'Card' : 'Cards'}
                </option>
              ))}
            </select>
            
            <button
              className="mt-6 px-10 py-4 bg-gradient-to-br from-[#d4af37] to-[#b8942f] text-[#1a0033] rounded-lg 
                         shadow-lg hover:shadow-[#d4af37]/50 transition-all duration-300 font-bold text-lg
                         hover:scale-105 active:scale-95 border border-[#d4af37]/50"
              style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.1em' }}
              onClick={startGame}
            >
              ✦ Begin Your Journey ✦
            </button>
          </div>
        )}
        
        {gameStarted && (
          <>
            <div className="mb-6 text-center">
              <span className="font-semibold text-[#e6d5b8] text-lg tracking-wide"
                    style={{ fontFamily: "'Crimson Pro', serif" }}>
                Select {numCards} card{numCards > 1 ? 's' : ''} from the sacred deck
              </span>
            </div>
            
            {/* Shuffled Deck */}
            <div className="flex justify-center mb-8">
              <ShuffledDeck
                numCards={numCards}
                selectedCards={selectedCards}
                onSelectCard={handleSelectCard}
              />
            </div>
            
            {/* Reading component */}
            {selectedCards.length > 0 && (
              <div className="mt-10 flex justify-center animate-fadeIn">
                <Reading selectedCards={selectedCards} />
              </div>
            )}
            
            {selectedCards.length === numCards && (
              <button
                className="mt-10 px-10 py-4 bg-gradient-to-br from-[#d4af37] to-[#b8942f] text-[#1a0033] rounded-lg 
                           shadow-lg hover:shadow-[#d4af37]/50 transition-all duration-300 font-bold text-lg
                           hover:scale-105 active:scale-95 mx-auto block border border-[#d4af37]/50"
                style={{ fontFamily: "'Cinzel', serif", letterSpacing: '0.1em' }}
                onClick={() => setGameStarted(false)}
              >
                ✦ New Reading ✦
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
