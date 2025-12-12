
import React from "react";
import TarotCard from "./TarotCard";
import { TarotCardData } from "../models";

interface SelectedCard extends TarotCardData {
  idx: number;
  reversed: boolean;
}

interface ReadingProps {
  selectedCards: SelectedCard[];
  positions: string[];
}

const Reading: React.FC<ReadingProps> = ({ selectedCards, positions }) => {
  return (
    <div className="w-full">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#d4af37] tracking-wider mb-2"
            style={{ fontFamily: "'Cinzel', serif", textShadow: '0 0 20px rgba(212,175,55,0.5)' }}>
          Your Reading
        </h2>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
      </div>
      
      {/* Cards display */}
      <div className="flex flex-row gap-6 justify-center items-start px-4 overflow-x-auto">
        {selectedCards.map((card, i) => (
          <div
            key={i}
            className="reading-card-reveal w-[200px] flex-shrink-0"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {/* Position label */}
            <div className="text-center mb-2">
              <span className="text-xs text-[#d4af37]/70 tracking-widest"
                    style={{ fontFamily: "'Cinzel', serif" }}>
                {positions[i]?.toUpperCase()}
              </span>
            </div>

            <TarotCard card={card} small={false} showMeaning={true} />
          </div>
        ))}
      </div>
      
      {/* Mystical divider */}
      <div className="flex items-center justify-center gap-4 my-8">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
        <span className="text-[#d4af37] text-xl">✦</span>
        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
      </div>
      
      {/* Interpretation hint */}
      <div className="text-center mt-6 px-4">
        <p className="text-[#e6d5b8]/70 text-sm italic max-w-2xl mx-auto"
           style={{ fontFamily: "'Crimson Pro', serif" }}>
          The cards have spoken. Reflect upon their wisdom and let their guidance illuminate your path forward.
        </p>
      </div>
    </div>
  );
};

export default Reading;
