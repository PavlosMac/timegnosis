import Image from "next/image";
import React from "react";

export interface TarotCardData {
  name: string;
  imageUrl: string;
  meaning: string;
  reversedMeaning?: string;
  reversed?: boolean;
}

interface TarotCardProps {
  card: TarotCardData;
  showMeaning?: boolean;
}

export default function TarotCard({ card, showMeaning = true }: TarotCardProps) {
  return (
    <div className="tarot-card flex flex-col items-center">
      <div className={`relative w-[120px] h-[210px] sm:w-[180px] sm:h-[315px] transition-transform ${card.reversed ? "rotate-180" : ""}`}> 
        <Image
          src={card.imageUrl}
          alt={card.name}
          fill
          className="rounded-lg shadow-md object-cover"
          sizes="(max-width: 640px) 120px, 180px"
        />
      </div>
      <h3 className="text-center text-xs sm:text-sm font-semibold mt-1">{card.name}</h3>
      {showMeaning && (
        <p className="text-center text-[10px] sm:text-xs mt-0.5 text-gray-600">
          {card.reversed && card.reversedMeaning ? card.reversedMeaning : card.meaning}
        </p>
      )}
    </div>
  );
}
